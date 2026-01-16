import { CONFIG } from '@/config'

export const apiGetTimeKeepingLogs = async (token:string, date:any) => {
    try {

        const url = `${CONFIG.API_BASE}/api/timekeepings?date=${date}`;

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

export const apiCreateTimeKeepingLog = async (request: any, token:string) => {
    try {
        const param = await request;
        const response = await fetch(`${CONFIG.API_BASE}/api/timekeeping`, {
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

export const apiGetTimeKeepingLogsList = async (token:string) => {
    try {

        const url = `${CONFIG.API_BASE}/api/timekeepings/list`;

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