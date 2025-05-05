// User service for handling user-related operations

import api from "@/lib/api";
import { LoggedInUserI } from "@/types/users/user.types";
import { AxiosResponse } from "axios";

export const userService = {
  getUser: async (): Promise<LoggedInUserI | undefined> => {
    try {
      const response: AxiosResponse<LoggedInUserI> = await api.get("/users/me");
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.error("Invalid token, logging out");
      } else if (error.response?.status === 404) {
        console.error("User not found, logging out");
      } else {
        console.error("Error fetching user data:", error);
      }
    }
  },
};
