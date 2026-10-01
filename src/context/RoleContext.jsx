import { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext({
  activeRole: 'warga', // 'warga' | 'pemerintah'
  setActiveRole: () => {},
});

export function RoleProvider({ children }) {
  const [activeRole, setActiveRole] = useState(() => {
    try {
      return localStorage.getItem('hg-role') || 'warga';
    } catch {
      return 'warga';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('hg-role', activeRole);
    } catch {}
  }, [activeRole]);

  return (
    <RoleContext.Provider value={{ activeRole, setActiveRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
