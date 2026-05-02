import { getOneStorage, setOneStorage } from '@/utils/handleLocalStorage';
import { useEffect, useState } from 'react';

const usePassword = () => {
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    const localStoragePassword = getOneStorage('felinoChanPassword');
    if (!localStoragePassword) {
      // Generate only once
      const newGeneratedPassword = String(Math.floor(100000 + Math.random() * 900000));
      setOneStorage('felinoChanPassword', newGeneratedPassword);
      setPassword(newGeneratedPassword);
    } else {
      setPassword(localStoragePassword as string);
    }
  }, []);

  // Update localStorage whenever state changes manually
  const updatePassword = (newVal: string) => {
    setPassword(newVal);
    setOneStorage('felinoChanPassword', newVal);
  };

  return { password, setPassword: updatePassword };
};

export default usePassword;
