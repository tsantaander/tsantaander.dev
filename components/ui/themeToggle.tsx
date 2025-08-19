"use client"
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import styles from '@/styles/themeToggle.module.css';
import { useResponsive } from '@/context/ResponsiveContext';

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const { isMobile } = useResponsive();
  const [mounted, setMounted] = useState(false);

  const handleThemeChange = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button onClick={handleThemeChange} className={`${styles.themeToggle} ${isMobile ? styles.themeToggleMobile : ''} ${styles.stSunMoonThemeToggleBtn} cursor-pointer ${resolvedTheme === 'dark' ? 'text-[#F1F5F9]' : 'text-[#1D293D]'}`}>
      <input 
        type="checkbox" 
        id="themeToggle" 
        checked={resolvedTheme === 'dark'} 
        readOnly
        className={styles.themeToggleInput} />
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="currentColor"
        stroke="none"
        className="flex items-center justify-center"
      >
        <mask id="moon-mask">
          <rect x="0" y="0" width="20" height="20" fill="white"></rect>
          <circle cx="11" cy="3" r="8" fill="black"></circle>
        </mask>
        <circle
          className={styles.sunMoon}
          cx="10"
          cy="10"
          r="8"
          mask="url(#moon-mask)"
        ></circle>
        <g>
          <circle className={`${styles.sunRay} ${styles.sunRay1}`} cx="18" cy="10" r="1.5"></circle>
          <circle className={`${styles.sunRay} ${styles.sunRay2}`} cx="14" cy="16.928" r="1.5"></circle>
          <circle className={`${styles.sunRay} ${styles.sunRay3}`} cx="6" cy="16.928" r="1.5"></circle>
          <circle className={`${styles.sunRay} ${styles.sunRay4}`} cx="2" cy="10" r="1.5"></circle>
          <circle className={`${styles.sunRay} ${styles.sunRay5}`} cx="6" cy="3.1718" r="1.5"></circle>
          <circle className={`${styles.sunRay} ${styles.sunRay6}`} cx="14" cy="3.1718" r="1.5"></circle>
        </g>
      </svg>
    </button>
  );
};

export default ThemeToggle;