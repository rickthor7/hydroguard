import { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext({
  activeRole: 'pemerintah', // 'pemerintah' | 'warga'
  setActiveRole: () => {},
});

export function RoleProvider({ children }) {
  const [activeRole, setActiveRole] = useState(() => {
    try {
      return localStorage.getItem('hg-role') || 'pemerintah';
    } catch {
      return 'pemerintah';
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
