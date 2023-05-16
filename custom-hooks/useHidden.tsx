import {
  addItemToStorage,
  getStorage,
  removeItemFromStorage,
} from '@/utils/handleLocalStorage';
import { useEffect, useState } from 'react';

const useHidden = (
  _id: string,
  randomIdGeneratedByMe: number,
  storageName: string
) => {
  const [show, setShowPost] = useState<boolean>(true);

  const handleShowState = () => {
    if (show) {
      setShowPost(false);
      addItemToStorage(randomIdGeneratedByMe, storageName);
    } else {
      setShowPost(true);
      removeItemFromStorage(randomIdGeneratedByMe, storageName);
    }
  };

  useEffect(() => {
    if (getStorage(storageName).includes(randomIdGeneratedByMe)) {
      setShowPost(false);
    } else setShowPost(true);
  }, [randomIdGeneratedByMe, storageName]);
  return { handleShowState, show };
};

export default useHidden;
