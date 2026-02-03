import { API_URL } from ".";

const authUrl = `${API_URL}/auth`;
/**
 * fetch register
 * @param {object} { username, password, email }
 */
export const register = async ({ username, password, email }) => {
  const result = await fetch(`${authUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      email,
    }),
  });

  const response = await result.json();
  return response;
};

export const login = async ({ username, password }) => {
  const result = await fetch(`${authUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const response = await result.json();
  return response;
};
