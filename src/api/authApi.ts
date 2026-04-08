import type { LoginPayload, RegisterPayload, User } from '../types/auth';

export async function loginUser(payload: LoginPayload): Promise<User> {
  return Promise.resolve({
    id: 'user-1',
    name: 'Demo User',
    email: payload.email,
  });
}

export async function registerUser(payload: RegisterPayload): Promise<User> {
  return Promise.resolve({
    id: 'user-1',
    name: payload.name,
    email: payload.email,
  });
}