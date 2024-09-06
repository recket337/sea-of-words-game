import { useState, useEffect } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const local = JSON.parse(localStorage.getItem(key));
    if (local) return local;

    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  const getPingedValue = () => JSON.parse(localStorage.getItem(key))

  return [value, setValue, getPingedValue];
};

export default useLocalStorage;