// User service for handling user-related operations

interface User {
  id: string;
  name: string;
  email: string;
}

interface UpdateUserData {
  name?: string;
  email?: string;
}

export const userService = {
  getProfile: async (userId: string): Promise<User> => {
    try {
      // API call to fetch user profile
      return { id: userId, name: "User Name", email: "user@example.com" };
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },

  updateProfile: async (
    userId: string,
    userData: UpdateUserData
  ): Promise<User> => {
    try {
      // API call to update user profile
      return {
        id: userId,
        name: "Updated Name",
        email: "user@example.com",
        ...userData,
      };
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },
};
