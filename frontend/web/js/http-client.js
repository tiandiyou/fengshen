const API_BASE_URL = 'http://localhost:8081/api';

class HttpClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.token = this.loadToken();
    }

    setToken(token) {
        this.token = token;
        this.saveToken();
    }

    getToken() {
        return this.token;
    }

    clearToken() {
        this.token = null;
        localStorage.removeItem('auth_token');
    }

    async get(url, params) {
        const fullUrl = this.buildUrl(url, params);
        return this.request('GET', fullUrl);
    }

    async post(url, data) {
        const fullUrl = this.baseUrl + url;
        return this.request('POST', fullUrl, data);
    }

    async put(url, data) {
        const fullUrl = this.baseUrl + url;
        return this.request('PUT', fullUrl, data);
    }

    async delete(url) {
        const fullUrl = this.baseUrl + url;
        return this.request('DELETE', fullUrl);
    }

    async request(method, url, data) {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const options = {
            method,
            headers,
        };

        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('HTTP request error:', error);
            return {
                code: 500,
                message: '网络请求失败',
                data: null,
            };
        }
    }

    buildUrl(url, params) {
        let fullUrl = this.baseUrl + url;
        if (params) {
            const query = Object.entries(params)
                .filter(([_, value]) => value !== undefined && value !== null)
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                .join('&');
            if (query) {
                fullUrl += `?${query}`;
            }
        }
        return fullUrl;
    }

    loadToken() {
        return localStorage.getItem('auth_token');
    }

    saveToken() {
        if (this.token) {
            localStorage.setItem('auth_token', this.token);
        }
    }
}

const httpClient = new HttpClient(API_BASE_URL);
