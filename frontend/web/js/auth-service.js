class AuthService {
    async register(username, password) {
        const response = await httpClient.post('/auth/register', {
            username,
            password,
        });
        return response;
    }

    async login(username, password) {
        const response = await httpClient.post('/auth/login', {
            username,
            password,
        });

        if (response.code === 200 && response.data && response.data.token) {
            httpClient.setToken(response.data.token);
        }

        return response;
    }

    async getUserInfo() {
        return await httpClient.get('/auth/info');
    }

    logout() {
        httpClient.clearToken();
    }

    isLoggedIn() {
        return httpClient.getToken() !== null;
    }
}

const authService = new AuthService();
