import { baseURL } from "../baseUrlConfig";

const postData = (url, token, userData) => {
    const data = await fetch(baseURL + url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
          },
        body: JSON.stringify(userData)
    });
    if(data){
        const jsonData = await data.json();
        return jsonData;
    }
    else{
        console.error("No data");
    }
}

export default postData;