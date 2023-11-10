import { useEffect, useState } from 'react';

function getSessionStorageOrDefault(key, defaultValue) {

  try {
    const stored = sessionStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
    return defaultValue;

  } catch (err) {
    console.error(err);
    return defaultValue;
  }
}

/**
 * Example token will look like:
  JG-token = {
    userId:"",
    userRole:"",
    userName:""
  }
 */
export default function useSessionStorage(key, defaultValue) {

  const [session, setSession] = useState(getSessionStorageOrDefault(key, defaultValue));

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(session));
  }, [key, session]);

  return [session, setSession]
}