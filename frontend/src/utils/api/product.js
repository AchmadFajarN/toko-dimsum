import { API_URL } from ".";

const productUrl = `${ API_URL }/products`;

/**
 * 
 * mendapatkan product
 */
export const getProducts = async() => {
    const resppnse = await fetch(productUrl, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await resppnse.json();
    return result;
}

export const getProductById = async(id) => {
    const response = await fetch(`${productUrl}/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    return result;
}