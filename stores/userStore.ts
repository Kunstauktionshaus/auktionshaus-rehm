import { create } from "zustand";

interface User {
  name: string;
  email: string;
  bidderNumber: number;
}

interface UserStore {
  user: User | null;
  updateUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  updateUser: (user) => set(() => ({ user })),
}));
