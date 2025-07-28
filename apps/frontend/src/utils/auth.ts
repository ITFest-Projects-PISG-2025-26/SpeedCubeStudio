// Mock auth utilities for build - replace with actual implementation
export async function loginUser(email: string, password: string): Promise<boolean> {
  console.log('Login attempt:', { email, password });
  // Mock login for now
  return true;
}

export async function registerUser(name: string, email: string, password: string): Promise<boolean> {
  console.log('Register attempt:', { name, email, password });
  // Mock register for now  
  return true;
}

export function logout(): void {
  console.log('Logout');
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
