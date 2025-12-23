export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface AuthContextType {
  user: Omit<User, "password"> | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}
