
import { create } from 'zustand';

const useRole = create((set) => ({
  role: null,
  setRole: (role) => set({ role }),
  clearUser: () => set({ role: null}),
}));

export default useRole;
