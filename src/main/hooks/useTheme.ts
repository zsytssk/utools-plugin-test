import { Theme, storage } from '@common/storage';
import { useEffect, useRef, useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>();
  const themeRef = useRef<Theme>();

  useEffect(() => {
    let theme = storage.get('theme');
    if (!theme) {
      theme = 'dark';
    }
    themeRef.current = theme;
    setTheme(theme);
  }, []);

  useEffect(() => {
    if (theme === themeRef.current) {
      return;
    }
    themeRef.current = theme;
    storage.save('theme', theme);
  }, [theme]);

  return [theme, setTheme] as const;
}
