import { getPassword, setStoragePassword } from '@/utils/handleLocalStorage';
import { useEffect, useState } from 'react';

const usePassword = () => {
  const [password, setPassword] = useState<string>('');
  useEffect(() => {
    if (!password) {
      const storagePassword = getPassword('felinoChanPassword');
      if (!storagePassword) {
        const newGeneratedPassword = String(Math.floor(Math.random() * 100000));
        setStoragePassword('felinoChanPassword', String(newGeneratedPassword));
        setPassword(newGeneratedPassword);
      } else {
        setPassword(storagePassword as string);
      }
    }
  }, [password]);
  return { password, setPassword };
};

export default usePassword;
