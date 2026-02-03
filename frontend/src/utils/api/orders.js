import { API_URL } from ".";

const orderUrl = `${API_URL}/orders`;

export const getOrdersUsers = async() => {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${orderUrl}/user`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const result = await response.json();
    return result;
}

export const checkout = async(data) => {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(orderUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`
        }, body: JSON.stringify(data)
    });

    const result = await response.json();
    return result;
}