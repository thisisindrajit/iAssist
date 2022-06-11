import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { firebase } from "./firebaseConfig";

const formatAuthUser = (user, uid, email, getIdToken) => ({
  uid: uid,
  email: email,
  name: user.name,
  userType: user.userType,
  getIdToken: getIdToken,
});

export const useGoogleFirebaseAuth = () => {
  const router = useRouter();

  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    console.log(authState);

    // No user is signed in.
    if (!authState) {
      console.log("No user signed in!");
      setAuthUser(null);
      setLoading(false);
      localStorage.setItem("user", "");
      return;
    }

    setLoading(true);

    // getting user from DB
    const idToken = await authState.getIdToken();

    // initially setting userDetails to be the current authState
    let userDetails = authState;

    const selectedUserType = localStorage.getItem("selectedUserType");

    // Check if user is already present in database
    const doesUserExist = await fetch(
      `/api/${selectedUserType}/${authState.uid}/getUser`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    // if user does not exist in database
    if (doesUserExist.status === 404) {
      const currentUserDetails = {
        email: authState.email,
        name: authState.displayName,
        photoURL: authState.photoURL,
      };

      // add user details to database
      userDetails = await fetch(
        `/api/${selectedUserType}/${authState.uid}/setUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify(currentUserDetails),
        }
      );

      userDetails = await userDetails.json();

      console.log("User details from firebase", userDetails);
    } else {
      userDetails = await doesUserExist.json();
      console.log("User exists in database", userDetails);
    }

    // If some error occurs, push back to error page
    if (!userDetails || !userDetails.name) {
      console.log("Some error occurred while logging in!");
      setAuthUser(null);
      setLoading(false);
      router.push("/error/error-login");
      return;
    }

    var formattedUser = formatAuthUser(
      userDetails,
      authState.uid,
      authState.email,
      () => authState.getIdToken()
    );

    console.log("Formatted user", formattedUser);

    // setting user details to local storage
    localStorage.setItem("user", JSON.stringify(formattedUser));
    setAuthUser(formattedUser);
    setLoading(false);
  };

  // listen for Firebase state changes
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authState) => {
      // getting auth user from local storage
      if (
        authState &&
        localStorage.getItem("user") &&
        localStorage.getItem("user") !== ""
      ) {
        console.log("User details available in local storage!");
        let cachedUser = JSON.parse(localStorage.getItem("user"));
        // NOTE: While storing in local storage, the function is not stored, so we add it explicitly while getting the user details from cache
        cachedUser.getIdToken = () => authState.getIdToken();
        setAuthUser(cachedUser);
        setLoading(false);
        return;
      }

      console.log("User details not available in local storage!");

      authStateChanged(authState);
    });
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    setAuthUser,
  };
};
