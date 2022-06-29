import { useCallback } from 'react';


export const useAdvancedValueSetter = (setValues) => {
  const valueSetter = (current) => {
    setValues((prevState) => ({
      ...prevState,
      ...current,
    }));
  };

  return useCallback((key, value) => {
    const obj = {};
    obj[key] = value;
    valueSetter(obj);
  }, []);
};
