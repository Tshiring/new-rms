import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useRole = create(
  persist(
    (set, get) => ({
      roles:[],
      setRoles: (roles) => set({ roles }),
      
      clearRoles: () => set({ roles: [] }),
    }),
    {
      name: 'role-storage', // This is the key in localStorage
    }
  )
);

export const hasRole = (targetrole) => {
  const { roles } = useRole.getState();
  return roles.includes(targetrole);
};

export default useRole;
