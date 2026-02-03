import { createConnection } from "../model/connectionDb.js";
import { nanoid } from 'nanoid';

/**
 * 
 * @param { object { username, password, email } }
 * @returns object - { id, username, email }
 */
export const userRegister = async ({ username, password, email }) => {
    const connection = await createConnection()
    const id = `user-${ nanoid(16) }`;
    const query = 'INSERT INTO users (id, username, password, email) VALUES (?, ?, ?, ?)'
    const values = [id, username, password, email];
    const [result] = await connection.execute(query, values);
    console.log(result);
    return { id, username, email }
}

/**
 * mengecek apakah user exist
 * @param {object { username }} 
 * @returns object - { id, username, password, role }
 */
export const checkUserIsExist = async ({ username }) => {
    const connection = await createConnection();
    const query = 'SELECT id, username, password, role FROM users WHERE username = ?';
    const value = [username];
    const [rows] = await connection.execute(query, value);
    return rows.length > 0 ? rows[0] : null;
}