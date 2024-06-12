import {createContext, useState} from 'react'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [result, setResult] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    return (
        <AuthContext.Provider value={{
            loading,
            setLoading,
            error,
            setError,
            result,
            setResult,
            formData,
            setFormData
        }}>
            {children}
        </AuthContext.Provider>
    )
}