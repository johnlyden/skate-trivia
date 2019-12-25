import { useState, useEffect } from 'react';

function useMediaQuery(query) {
  console.log({ query });
  const mediaQuery = window.matchMedia(query);

  const [isMatching, setIsMatching] = useState(mediaQuery.matches);

  const checkIfIsMatching = () => {
    setIsMatching(mediaQuery.matches);
  };

  useEffect(() => {
    mediaQuery.addListener(checkIfIsMatching);
    console.log('added');
    return () => {
      mediaQuery.removeListener(checkIfIsMatching);
    };
  }, []);

  return isMatching;
}

export default useMediaQuery;
