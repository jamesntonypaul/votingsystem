import React, { createContext, useContext, useState } from 'react';

const ElectionContext = createContext();

export function useElectionContext() {
  return useContext(ElectionContext);
}

export function ElectionContextProvider({ children }) {
  const [eid, setEid] = useState(null);

  return (
    <ElectionContext.Provider value={{ eid, setEid }}>
      {children}
    </ElectionContext.Provider>
  );
}
