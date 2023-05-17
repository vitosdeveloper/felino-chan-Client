import { getPassword, setStoragePassword } from '@/utils/handleLocalStorage';
import { useEffect, useState } from 'react';

const usePassword = () => {
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    const localStoragePassword = getPassword('felinoChanPassword');
    if (!localStoragePassword) {
      const newGeneratedPassword = String(Math.floor(Math.random() * 100000));
      setStoragePassword('felinoChanPassword', String(newGeneratedPassword));
      setPassword(newGeneratedPassword);
    } else {
      setPassword(localStoragePassword as string);
    }
  }, []);

  return { password, setPassword };
};

export default usePassword;
