import { CONFIG } from '@/config'

export const apiGetAttendance = async (token:string) => {
    try {

        const url = `${CONFIG.API_BASE}/api/attendances`;

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
export const getMembersByEvent = async (id:number, keyword:string, token:string) => {
    try {

        let url = `${CONFIG.API_BASE}/api/attendance/${id}/members`;

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

interface UpdateAttendanceRequest {
    is_present: boolean;
    event_id: number;
    member_id: number;
}


export const apiUpdateAttendance = async (id:number, request:UpdateAttendanceRequest , token:string) => {
    try {
        const param = await request;
        const response = await fetch(`${CONFIG.API_BASE}/api/attendance/${id}/upsert`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            // body: param,
            body: JSON.stringify(param),
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
