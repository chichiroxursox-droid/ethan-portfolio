import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useSectionTheme = () => {
  const location = useLocation();

  useEffect(() => {
    const body = document.body;
    
    // Remove all theme classes
    body.classList.remove('theme-engineering', 'theme-athletics', 'theme-music', 'theme-activism');
    
    // Add appropriate theme class based on route
    if (location.pathname === '/engineering') {
      body.classList.add('theme-engineering');
    } else if (location.pathname === '/athletics') {
      body.classList.add('theme-athletics');
    } else if (location.pathname === '/chat') {
      body.classList.add('theme-music');
    } else if (location.pathname === '/contact') {
      body.classList.add('theme-activism');
    }
  }, [location.pathname]);

  return location.pathname;
};
