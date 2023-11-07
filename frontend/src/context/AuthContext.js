import jwt_decode from 'jwt-decode';
import axios from '../api/axios';

import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(`/api/token/`, {
                email: e.target.email.value,
                password: e.target.password.value,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const data = response.data;
    
            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwt_decode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
                navigate('/');
            } else if (response.status === 400 || response.status === 401) {
                setError('Email e/ou senha inválido(s)');
            } else {
                setError('Erro ao fazer login');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            setError('Erro ao fazer login');
        }
    };

    const handleLogout = async () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    }

    const updateToken = async () => {
        try {
            const response = await axios.post(`/api/token/refresh/`, {
                refresh: authTokens?.refresh,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const data = response.data;
    
            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwt_decode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            
        } finally {
            if (loading) {
                setLoading(false);
            }
        }
    };
    

    const contextData = {
        user:user,
        handleLogin:handleLogin,
        authTokens:authTokens,
        handleLogout:handleLogout,
        error:error,
        setError:setError
    }

    useEffect(()=> {
        if(loading){
            updateToken()
        }

        const fourMinutes = 1000 * 60 * 4

        const interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
  }

