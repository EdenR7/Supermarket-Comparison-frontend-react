import api from "@/lib/api";
import { LoginFormValues as LoginCredentials } from "@/pages/login-page";
import { RegisterFormValues } from "@/pages/register-page";
import { AxiosResponse } from "axios";
// import { LoggedInUserI } from "@/types/users/user.types";

type RegisterCredentials = Omit<RegisterFormValues, "confirmPassword">;
// export type RegisterData = Omit<LoggedInUserI, "mainCart"> & {
//   token: string;
// };

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AxiosResponse> => {
    try {
      const response = await api.post("/auth/login", credentials);
      return response;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  register: async (userData: RegisterCredentials): Promise<AxiosResponse> => {
    try {
      const response = await api.post("/auth/register", userData);
      return response;
    } catch (error) {
      console.error("Error registering:", error);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    // Clear token from storage, etc.
  },
};
