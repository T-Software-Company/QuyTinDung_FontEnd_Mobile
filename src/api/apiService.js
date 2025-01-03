import { getAccessToken } from '../../tokenStorage';

const API_BASE_URL = 'http://localhost:8080/realms/MyAppRealm/protocol/openid-connect';

export const fetchProtectedData = async (endpoint) => {
  try {
    const token = await getAccessToken();
    if (!token) {
      console.error('No access token found. User may need to re-authenticate.');
      return null;
    }
    console.log('Access token:', token);
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('API Response:', response);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('API Error:', response.status, await response.text());
      if (response.status === 401) {
        console.warn('Access token expired. Handle token refresh here.');
        // Optionally, handle token refresh logic here.
      }
      return null;
    }
  } catch (error) {
    console.error('Error fetching protected data:', error);
    return null;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.token;
    }
    return null;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};
