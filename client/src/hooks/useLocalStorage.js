import { useState, useEffect, useRef } from "react";

export function useLocalStorage(key) {
  const [value, setValue] = useState([]);
  useEffect(() => {
    const stored = localStorage.getItem(key);
    setValue(stored ? stored : []);
  }, []);

  useEffect(() => {
    localStorage.setItem(key, [...value]);
  }, [key, value]);

  return [value, setValue];
}

/*
    LocalStorage hook to access... local storage. I think it works. The issue was that
    the storage wasn't persisting on a redirect.
*/
