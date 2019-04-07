import { useState, useEffect } from 'react';

const getSize = () => ({
  innerHeight: window.innerHeight,
  innerWidth: window.innerWidth,
  outerHeight: window.outerHeight,
  outerWidth: window.outerWidth
});

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getSize());

  const handleResize = () => {
    setWindowSize(getSize());
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};
