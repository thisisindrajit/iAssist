import { useGoogleAuth } from "../../context/GoogleAuthContext";

const PostData = (url, userData) => {
    let baseURL = "http://localhost:3000/api/";
    const {authUser} = useGoogleAuth();
    const token = await authUser.getIdToken();

    return new Promise((resolve, reject) => {
        return fetch(baseURL + url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
              },
            body: JSON.stringify(userData)
        })
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export default PostData;