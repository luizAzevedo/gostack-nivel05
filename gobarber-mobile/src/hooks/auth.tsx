import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredenctials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  loading: boolean;
  // quando transforma o metod em "async", ele passa a retornar uma "Promise<void>"
  signIn(credencials: SignInCredenctials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  // #region Não é possivel utilizar async para autenticação vai utilizar o useEffect
  //   () => {
  //   const token = localStorage.getItem('@GoBarber:token');
  //   const user = localStorage.getItem('@GoBarber:user');

  //   if (token && user) {
  //     return { token, user: JSON.parse(user) };
  //   }

  //   return {} as AuthState;
  // }); // O estado é melhor lugar para armazenar informações
  // #endregion

  const [loading, setLoading] = useState(true);

  /** Disparar uma funçao que ira no storage para então preencher o data */
  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
      setLoading(false);
    }
    loadStoragedData();
  }, []);

  // método assíncrono
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}

export { AuthProvider, useAuth };
