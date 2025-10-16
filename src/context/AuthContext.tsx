import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import {
  signIn,
  signOut,
  getCurrentUser,
  fetchAuthSession,
} from "aws-amplify/auth";
import type { UserCredentials } from "@models";

type AuthContextType = {
  user: UserCredentials | undefined;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | undefined>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserCredentials | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const { isSignedIn } = await signIn({ username, password });
      if (isSignedIn) {
        const currentUser = await getCurrentUser();
        setUser({
          username: currentUser.username,
          userId: currentUser.userId,
        });
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    setLoading(true);
    await signOut();
    setUser(undefined);
    setLoading(false);
  }, []);

  const getToken = useCallback(async (): Promise<string | undefined> => {
    const session = await fetchAuthSession();
    return session.tokens?.idToken?.toString();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const currentUser = await getCurrentUser();
        setUser({
          username: currentUser.username,
          userId: currentUser.userId,
        });
      } catch {
        setUser(undefined);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside an AuthProvider");
  return context;
};
