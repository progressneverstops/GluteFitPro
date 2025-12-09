// Theme utility for light/dark mode toggle

export const getTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light') {
    return saved;
  }
  // Check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const setTheme = (theme: 'light' | 'dark') => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
};

export const toggleTheme = (): 'light' | 'dark' => {
  const current = getTheme();
  const newTheme = current === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  return newTheme;
};

// Initialize theme on load
if (typeof window !== 'undefined') {
  const theme = getTheme();
  setTheme(theme);
}

