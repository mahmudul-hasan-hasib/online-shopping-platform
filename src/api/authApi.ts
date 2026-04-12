const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AUTH_BASE_URL = `${API_BASE_URL}/api/auth`;

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export async function registerUser(payload: RegisterPayload) {
  const response = await fetch(`${AUTH_BASE_URL}/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}

export async function loginUser(payload: LoginPayload) {
  const response = await fetch(`${AUTH_BASE_URL}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}

export async function getMe(accessToken: string) {
  const response = await fetch(`${AUTH_BASE_URL}/me/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}