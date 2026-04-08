import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { loginUser, registerUser } from '../../api/authApi';
import type { LoginPayload, RegisterPayload, User } from '../../types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'shop-user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!savedUser) return;

    try {
      setUser(JSON.parse(savedUser));
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, []);

  const login = async (payload: LoginPayload) => {
    const loggedInUser = await loginUser(payload);
    setUser(loggedInUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedInUser));
  };

  const register = async (payload: RegisterPayload) => {
    const newUser = await registerUser(payload);
    setUser(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}