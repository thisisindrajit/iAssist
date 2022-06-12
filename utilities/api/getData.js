import { baseURL } from "../baseUrlConfig";

const getData = async (url, token) => {
    const data = await fetch(baseURL + url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
              },
        });
    if(data){
        const jsonData = await data.json();
        return jsonData;
    }
    else{
        console.error("No data");
    }
}

export default getData;