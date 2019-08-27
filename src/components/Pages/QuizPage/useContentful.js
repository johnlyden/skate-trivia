import { useEffect, useState } from 'react';
import initializeClient from './client';

const CONTENT_TYPE = 'round';

function useContentful() {
  const [isFetching, setIsFetching] = useState(false);
  const [content, setContent] = useState();

  const client = initializeClient();

  useEffect(() => {
    setIsFetching(true);
    client.getEntries({ content_type: CONTENT_TYPE }).then(response => {
      const [round] = response.items;
      setContent(round);
      setIsFetching(false);
    });
  }, []);
  return {
    isFetching,
    content
  };
}

export default useContentful;
