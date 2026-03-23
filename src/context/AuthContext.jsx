import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    const { data } = await api.post('/auth/refresh');
                    localStorage.setItem('accessToken', data.accessToken);
                    setUser(data);
                    return;
                }

                const { data } = await api.get('/auth/profile');
                setUser((prev) => prev ?? data);
            } catch (error) {
                localStorage.removeItem('accessToken');
                setUser(null);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const login = async (identifier, password) => {
        try {
            const value = String(identifier || '').trim();
            const payload = value.includes('@')
                ? { email: value.toLowerCase(), password }
                : { mobile: value, password };

            const { data } = await api.post('/auth/login', payload);
            localStorage.setItem('accessToken', data.accessToken);
            setUser(data);
            toast.success('Login successful!');
            return true;
        } catch (error) {
            console.error('Login Error:', error);
            const message = error.response?.data?.message || error.message || 'Login failed';
            toast.error(message);
            return false;
        }
    };

    const register = async (email, password, additionalData) => {
        try {
            const { data } = await api.post('/auth/register', {
                email,
                password,
                ...additionalData
            });
            localStorage.setItem('accessToken', data.accessToken);
            setUser(data);
            toast.success('Registration successful!');
            return true;
        } catch (error) {
             console.error('Registration Error:', error);
            const message = error.response?.data?.message || error.message || 'Registration failed';
            toast.error(message);
            return false;
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
            localStorage.removeItem('accessToken');
            setUser(null);
            toast.success('Logged out');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const changePassword = async (currentPassword, newPassword) => {
        try {
            await api.put('/user/change-password', {
                oldPassword: currentPassword,
                newPassword
            });
            toast.success('Password updated successfully');
            return true;
        } catch (error) {
            console.error('Password Update Error:', error);
            const message = error.response?.data?.message || error.message || 'Failed to update password';
            toast.error(message);
            return false;
        }
    };

    const updateWalletBalance = (newBalance) => {
        setUser(prev => prev ? { ...prev, walletBalance: newBalance } : null);
    };

    const hasCapability = (capability) => {
        return user?.capabilities?.includes(capability) || false;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, hasCapability, changePassword, updateWalletBalance }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
