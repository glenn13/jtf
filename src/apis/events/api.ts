import { CONFIG } from '@/config'

export const apiGetEvents = async (token:string) => {
    try {

        const url = `${CONFIG.API_BASE}/api/events`;

        // if (keyword) {
        //     url += `?search_keyword=${keyword}`;
        // }
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
export const apiGetEventLists = async (keyword:string, token:string) => {
    try {

        let url = `${CONFIG.API_BASE}/api/events-list`;

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

// interface CreateEventRequest {
//     name: string;
//     start_date: string;
//     end_datedate: string;
//     color: string;
//     // Add other fields as necessary
// }
export const apiCreateEvent = async (request: any, token:string) => {
    try {
        const param = await request;
        const response = await fetch(`${CONFIG.API_BASE}/api/event`, {
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


export const apiUpdateEvent = async (id: any, request: any, token:string) => {
    try {
        const param = await request;
        const response = await fetch(`${CONFIG.API_BASE}/api/event/${id}/update`, {
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