"use client";

import { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { useTheme } from 'next-themes';
import styles from '@/styles/themeToggle.module.css';
import { useResponsive } from '@/context/ResponsiveContext';


export const AnimatedThemeToggler = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const { isMobile } = useResponsive();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLLabelElement>(null);

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

      if (!containerRef.current) return;

      const { top, left, width, height } = containerRef.current.getBoundingClientRect();
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
          easing: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
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
      <div
        className={`${styles.container} ${isMobile ? styles.themeToggleMobile : ''} ${resolvedTheme === 'dark' ? 'text-[#F1F5F9]' : 'text-[#1D293D]'}`}
      >
        <svg viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg" className={styles.moon}><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" /></svg>
      </div>
    );
  }

  return (
    <label
      ref={containerRef}
      className={`${styles.container} ${isMobile ? styles.themeToggleMobile : ''} ${resolvedTheme === 'dark' ? 'text-[#F1F5F9]' : 'text-[#1D293D]'}`}
    >
      <input
        type="checkbox"
        checked={resolvedTheme === 'dark'}
        onChange={changeTheme}
        className={styles.input}
      />
      <svg viewBox="0 0 384 512" height="0.8em" xmlns="http://www.w3.org/2000/svg" className={styles.moon}><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" /></svg>
      <svg viewBox="0 0 512 512" height="0.8em" xmlns="http://www.w3.org/2000/svg" className={styles.sun}><path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" /></svg>
    </label>
  );
};
export default AnimatedThemeToggler;
