import React, { useContext, useEffect, useState } from 'react';

const GlobalContext = React.createContext();
export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalProvider({ children }) {
  const fetchData = async () => {
    const data = await fetch(dbData.serverUrl + '/api');
    const dataJson = await data.json();
    //transformação de texto mt importante
    dataJson.forEach((item, index) => {
      dataJson[index].postContent = item.postContent
        .replace(/(^>{1}[^>])(\S+)?/gm, '<span class="quote">$1$2</span>')
        .replace(/(^>{2}[^>])(\S+)?/gm, '<span class="quotin">$1$2</span>')
        .replace(/(^>{3}[^>])(\S+)?/gm, '<span class="pinkText">$1$2</span>');
    });
    setDbData((prev) => {
      return {
        ...prev,
        data: dataJson,
        dataInvertida: dataJson.reverse(),
      };
    });
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
