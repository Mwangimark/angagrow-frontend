// utils/auth.js

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
export const logout = async () => {
    try {
        const refreshToken = getRefreshToken();
        const accessToken = getAccessToken();
        
        console.log('🔐 Starting logout process...');
        
        // Only call logout API if we have tokens
        if (refreshToken && accessToken) {
            try {
                const response = await fetch('http://localhost:8000/accounts/logout/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({ refresh: refreshToken }),
                });
            } catch (apiError) {
                console.warn('⚠️ Logout API call failed, but continuing with local logout:', apiError);
                // Continue with local logout even if API fails
            }
        }
    } catch (error) {
        console.error('❌ Logout error:', error);
    } finally {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        localStorage.removeItem('remember_me');
        
        // Redirect to login page
        console.log('🔀 Redirecting to login...');
        window.location.href = '/login';
    }
};

// Token refresh function (optional)
export const refreshAccessToken = async () => {
    try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            logout();
            return null;
        }

        const response = await fetch('http://localhost:8000/accounts/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) {
            logout();
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
        
        logout();
        return null;
    } catch (error) {
        console.error('Token refresh error:', error);
        logout();
        return null;
    }
};

