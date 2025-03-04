import { CONFIG } from '@/config'

export const apiGetUsers = async (token:string, keyword:string) => {
    try {

        let url = `${CONFIG.API_BASE}/api/users`;

        if (keyword) {
            url += `?search_keyword=${keyword}`;
        }
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });


        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data; // Assuming the API response has a `data` field
    } catch (error) {
        console.error('Error verifying username', error);
        throw error;
    }
};


export const apiCreateUser = async (request: any, token:string) => {
    try {
        const param = await request;
        const response = await fetch(`${CONFIG.API_BASE}/api/users`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                // "Content-Type": "application/json",
            },
            body: param,
            // body: JSON.stringify(param),
        });


        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data; // Assuming the API response has a `data` field
    } catch (error) {
        console.error('Error verifying username', error);
        throw error;
    }
};

export const apiGetUser = async (id:number, token:string) => {
    try {


        const response = await fetch(`${CONFIG.API_BASE}/api/user/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });


        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data; // Assuming the API response has a `data` field
    } catch (error) {
        console.error('Error verifying username', error);
        throw error;
    }
};
