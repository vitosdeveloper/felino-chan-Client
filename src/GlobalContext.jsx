import React, { useContext, useEffect, useState } from 'react';

const GlobalContext = React.createContext();
export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalProvider({ children }) {
  const fetchData = async () => {
    const data = await fetch(dbData.serverUrl + '/api');
    const dataJson = await data.json();
    setDbData((prev) => {
      return {
        ...prev,
        data: dataJson,
        dataInvertida: dataJson.reverse(),
      };
    });
    console.log('fetchadolol');
    return dbData;
  };

  const [dbData, setDbData] = useState({
    data: [],
    dataInvertida: [],
    fetchData: fetchData,
    //  url sem barra no final
    serverUrl: 'https://felino-chan-server.onrender.com',
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <GlobalContext.Provider value={dbData}>{children}</GlobalContext.Provider>
  );
}
