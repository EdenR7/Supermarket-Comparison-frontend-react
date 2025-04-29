// Authentication service for login, registration, etc.

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      // API call to authenticate user
      return {
        token: "sample-jwt-token",
        user: { id: "user-id", email },
      };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      // API call to register user
      return {
        token: "sample-jwt-token",
        user: { id: "new-user-id", email: userData.email },
      };
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    // Clear token from storage, etc.
  },
};
