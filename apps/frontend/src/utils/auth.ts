import { authAPI } from '../lib/api';

export async function loginUser(email: string, password: string): Promise<boolean> {
  try {
    const response = await authAPI.login({ username: email, password });
    const { token, user } = response.data;
    
    if (token) {
      setToken(token);
      // You might want to store user data as well
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
}

export async function registerUser(name: string, email: string, password: string): Promise<boolean> {
  try {
    const response = await authAPI.signup({ 
      name, 
      email, 
      username: email, // Using email as username for simplicity
      password 
    });
    const { token, user } = response.data;
    
    if (token) {
      setToken(token);
      // You might want to store user data as well
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error('Registration error:', error);
    return false;
  }
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  console.log('User logged out');
}

export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

export function setToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
}

export function getCurrentUser(): any {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
