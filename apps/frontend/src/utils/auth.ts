import { authAPI } from '../lib/api';

export async function loginUser(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await authAPI.login({ username: email, password });
    const { token, user } = response.data;
    
    if (token) {
      setToken(token);
      // You might want to store user data as well
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return { success: true };
    }
    return { success: false, error: 'No token received from server' };
  } catch (error: any) {
    console.error('Login error:', error);
    
    let errorMessage = 'Login failed. Please try again.';
    
    if (error.response?.status === 404) {
      errorMessage = 'User not found. Please check your email.';
    } else if (error.response?.status === 401) {
      errorMessage = 'Invalid password. Please try again.';
    } else if (error.response?.status === 400) {
      errorMessage = error.response.data?.message || 'Please check your input and try again.';
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return { success: false, error: errorMessage };
  }
}

export async function registerUser(name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> {
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
      return { success: true };
    }
    return { success: false, error: 'No token received from server' };
  } catch (error: any) {
    console.error('Registration error:', error);
    
    let errorMessage = 'Registration failed. Please try again.';
    
    if (error.response?.status === 409) {
      errorMessage = 'An account with this email already exists.';
    } else if (error.response?.status === 400) {
      errorMessage = error.response.data?.message || 'Please check your input and try again.';
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return { success: false, error: errorMessage };
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
