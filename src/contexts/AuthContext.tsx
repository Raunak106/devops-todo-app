import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthContextType, User } from "@/types/auth";
import {
  validateCredentials,
  createSession,
  getSession,
  clearSession,
  findUserByEmail,
  saveUser,
  generateId,
} from "@/lib/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);

  useEffect(() => {
    const session = getSession();
    if (session) {
      setUser(session);
    }
  }, []);

  const login = (email: string, password: string) => {
    const validUser = validateCredentials(email, password);
    if (validUser) {
      createSession(validUser);
      setUser({ id: validUser.id, name: validUser.name, email: validUser.email });
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const signup = (name: string, email: string, password: string) => {
    if (findUserByEmail(email)) {
      return { success: false, error: "Email already registered" };
    }

    const newUser: User = {
      id: generateId(),
      name,
      email,
      password,
    };

    saveUser(newUser);
    createSession(newUser);
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    return { success: true };
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
