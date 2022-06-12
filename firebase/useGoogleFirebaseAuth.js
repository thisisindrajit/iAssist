import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { firebase } from "./firebaseConfig";
import Swal from "sweetalert2";

const formatAuthUser = (user, userType, uid, email, getIdToken) => ({
  uid: uid,
  email: email,
  name: user.name,
  userType: userType,
  getIdToken: getIdToken,
});

export const useGoogleFirebaseAuth = () => {
  const router = useRouter();

  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
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

    let userDetails;

    const selectedUserType = localStorage.getItem("selectedUserType");

    let isUserStudent;
    let isUserMentor;

    // Check if user is already a student
    isUserStudent = await fetch(`/api/student/${authState.uid}/getUser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    // Check if user is already a mentor
    isUserMentor = await fetch(`/api/mentor/${authState.uid}/getUser`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    // if user does not exist in database, ask for details based on user type
    if (isUserStudent.status === 404 && isUserMentor.status === 404) {
      let currentUserDetails = {
        email: authState.email,
        name: authState.displayName,
      };

      if (selectedUserType === "student") {
        const { value: designation } = await Swal.fire({
          title: "Your designation",
          input: "text",
          inputLabel: "Enter your designation (for students only)",
          showCancelButton: false,
          customClass: "swal-custom",
          inputValidator: (value) => {
            if (!value) {
              return "Enter designation!";
            }
          },
        });

        currentUserDetails.designation = designation;
      } else {
        const { value: specialization } = await Swal.fire({
          title: "Your Specialization",
          input: "text",
          inputLabel:
            "Enter the field that you are specialized in (for mentors only)",
          showCancelButton: false,
          customClass: "swal-custom",
          inputValidator: (value) => {
            if (!value) {
              return "Enter specialization!";
            }
          },
        });

        currentUserDetails.specialization = specialization;
        currentUserDetails.reputation_points = 10;
      }

      // add user details to database
      userDetails = await fetch(
        `/api/${selectedUserType}/${authState.uid}/createUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify(currentUserDetails),
        }
      );

      userDetails = currentUserDetails;
    } else {
      // Changing user type automatically if the user has chosen wrong user type
      if (isUserStudent.status === 200) {
        userDetails = await isUserStudent.json();
        selectedUserType = "student";
      }

      if (isUserMentor.status === 200) {
        userDetails = await isUserMentor.json();
        selectedUserType = "mentor";
      }
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
      selectedUserType,
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
