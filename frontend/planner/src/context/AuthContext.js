import { createContext, useState, useContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
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
        
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'email':  e.target.email.value, 'password': e.target.password.value})
        })
        const data = await response.json();
        
        
        if(response.status === 200){
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate('/');
        } else if (response.status === 400 || response.status === 401) {
            setError('Email e/ou senha inválido(s)');
        } else {
            setError('Erro ao fazer login');
        }
    }

    const handleLogout = async () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    }

    const updateToken = async ()=> {
        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        const data = await response.json()
        
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }

        if(loading){
            setLoading(false)
        }
    }
    

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

