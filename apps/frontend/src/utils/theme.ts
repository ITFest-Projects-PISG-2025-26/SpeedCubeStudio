export function setTheme(theme: 'light' | 'dark') {
  if (typeof window !== 'undefined') {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }
}

export function getStoredTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
}
