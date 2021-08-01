import { createContext, useContext } from 'react';
import { useCallback, useState, useEffect } from 'react';

let loggoutTimer;

const AuthContext = createContext();

export function AuthProvider(props) {
    const [ token, setToken ] = useState(null);
    const [ uid, setUid ] = useState(null);
    const [ tokenExpirationDate, setTokenExpirationDate ] = useState();
    
    const login = useCallback((uid, token, expDate) => {
        setUid(uid);
        setToken(token);
        const tokenExpDate = expDate || new Date(new Date().getTime() + 1000 *60 *60);
        setTokenExpirationDate(tokenExpDate);
        localStorage.setItem('userData', JSON.stringify({userId: uid, token: token, tokenExpDate: tokenExpDate.toISOString()}));
      }, []);

      const logout = useCallback(() => {
        setUid(null);
        setToken(null);
        setTokenExpirationDate(null);
        localStorage.removeItem('userData');
      }, []);

      useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem("userData"));
        if (
          localStorageData &&
          localStorageData.token &&
          new Date(localStorageData.tokenExpDate) > new Date()
        ) {
          login(localStorageData.userId, localStorageData.token, new Date(localStorageData.tokenExpDate));
        }
      }, [login]); 

      useEffect(()=>{
        if (token && tokenExpirationDate) {
          const remaingTimeToExp = tokenExpirationDate.getTime() - new Date().getTime();
          loggoutTimer = setTimeout(logout, remaingTimeToExp);
        } else {
          clearTimeout(loggoutTimer);
        }
      }, [token, logout, tokenExpirationDate]);

      const value = {
          uid,
          token, 
          login,
          logout
      }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}




