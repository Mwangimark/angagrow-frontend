// utils/auth.js

// Don't import useNavigate here - it should be used in components only
// import { useNavigate } from "react-router-dom";

// Get access token from localStorage
export const getAccessToken = () => {
    try {
        const token = localStorage.getItem('access_token');
        return token;
    } catch (error) {
        console.error('Error getting access token:', error);
        return null;
    }
};

// Get refresh token from localStorage
export const getRefreshToken = () => {
    try {
        return localStorage.getItem('refresh_token');
    } catch (error) {
        console.error('Error getting refresh token:', error);
        return null;
    }
};

// Get user data from localStorage
export const getUser = () => {
    try {
        const userStr = localStorage.getItem('user');
        if (!userStr) return null;
        const user = JSON.parse(userStr);
        return user;
    } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
    }
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!getAccessToken();
};

// Logout function - calls API and clears local storage
// Updated to accept navigate as a parameter
export const logout = async (navigate = null) => {
    try {
        const refreshToken = getRefreshToken();
        const accessToken = getAccessToken();
        
        console.log('🔐 Starting logout process...');
        
        // Only call logout API if we have tokens
        if (refreshToken && accessToken) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/accounts/logout/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ refresh: refreshToken }),
                });
                
                // You could handle the response if needed
                if (response.ok) {
                    console.log('✅ Successfully logged out from server');
                }
            } catch (apiError) {
                console.warn('⚠️ Logout API call failed, but continuing with local logout:', apiError);
            }
        }
    } catch (error) {
        console.error('❌ Logout error:', error);
    } finally {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        localStorage.removeItem('remember_me');
        
        // Redirect to login page if navigate function is provided
        console.log('🔀 Redirecting to login...');
        if (navigate && typeof navigate === 'function') {
            navigate('/login');
        } else {
            // Fallback: redirect by changing window location
            window.location.href = '/login';
        }
    }
};

// Token refresh function (optional)
export const refreshAccessToken = async () => {
    try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            // You need to pass navigate or handle redirection differently
            await logout(); // This will use the fallback redirect
            return null;
        }

        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/accounts/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) {
            await logout(); // This will use the fallback redirect
            return null;
        }

        const data = await response.json();
        if (data.tokens && data.tokens.access) {
            localStorage.setItem('access_token', data.tokens.access);
            if (data.tokens.refresh) {
                localStorage.setItem('refresh_token', data.tokens.refresh);
            }
            return data.tokens.access;
        }
        
        await logout(); // This will use the fallback redirect
        return null;
    } catch (error) {
        console.error('Token refresh error:', error);
        await logout(); // This will use the fallback redirect
        return null;
    }
};