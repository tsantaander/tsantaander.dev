"use client";

import { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { useTheme } from 'next-themes';
import styles from '@/styles/themeToggle.module.css';
import { useResponsive } from '@/context/ResponsiveContext';

type AnimatedThemeTogglerProps = {
  className?: string;
};

export const AnimatedThemeToggler = ({ className }: AnimatedThemeTogglerProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { isMobile } = useResponsive();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeTheme = async () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    // Usar la API de View Transitions si está disponible
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
    });

    try {
      await transition.ready;

      if (!buttonRef.current) return;
      
      const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
      const y = top + height / 2;
      const x = left + width / 2;

      const right = window.innerWidth - left;
      const bottom = window.innerHeight - top;
      const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRad}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    } catch (e) {
      console.warn('La animación de transición falló:', e);
      setTheme(newTheme);
    }
  };

  if (!mounted) {
    return (
      <button 
        className={`${styles.themeToggle} ${isMobile ? styles.themeToggleMobile : ''} ${styles.stSunMoonThemeToggleBtn} cursor-pointer ${resolvedTheme === 'dark' ? 'text-[#F1F5F9]' : 'text-[#1D293D]'}`}
      >
        <input 
          type="checkbox" 
          className={styles.themeToggleInput} 
          readOnly 
          checked={resolvedTheme === 'dark'}
        />
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
        </svg>
      </button>
    );
  }

  return (
    <button 
      onClick={changeTheme} 
      className={`${styles.themeToggle} ${isMobile ? styles.themeToggleMobile : ''} ${styles.stSunMoonThemeToggleBtn} cursor-pointer ${resolvedTheme === 'dark' ? 'text-[#F1F5F9]' : 'text-[#1D293D]'}`}
      ref={buttonRef}
    >
      <input 
        type="checkbox" 
        id="themeToggle" 
        checked={resolvedTheme === 'dark'} 
        readOnly
        className={styles.themeToggleInput} 
      />
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
          <circle cx={resolvedTheme === 'dark' ? '30' : '11'} cy="3" r="8" fill="black"></circle>
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
          <circle className={`${styles.sunRay} ${styles.sunRay5}`} cx="6" cy="3.172" r="1.5"></circle>
          <circle className={`${styles.sunRay} ${styles.sunRay6}`} cx="14" cy="3.172" r="1.5"></circle>
        </g>
      </svg>
    </button>
  );
};

