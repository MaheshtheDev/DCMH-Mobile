import { create } from "zustand";

// Define the user state
interface UserState {
  user: any;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  setUser: (user: any) => void;
  signIn: (email: string, password: string) => Promise<boolean>;
  reset: () => void;
}

const initialState: any = {
  user: null,
  isAdmin: false,
};

export const useUserStore = create<UserState>()((set) => ({
  ...initialState,
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  signIn: async (email: string, password: string) => {
    try {
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
  setUser: (user) => {
    set({ user });
  },
  setPrivileges: (user) => {
    set({
      user: user,
      isAdmin: user.userType == "admin",
    });
  },
  reset: () => set(initialState),
}));
