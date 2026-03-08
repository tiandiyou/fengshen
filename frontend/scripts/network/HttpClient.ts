export interface ApiResponse<T = any> {
    code: number;
    message: string;
    data: T;
}

export class HttpClient {
    private baseUrl: string;
    private token: string | null = null;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.loadToken();
    }

    setToken(token: string) {
        this.token = token;
        this.saveToken();
    }

    getToken(): string | null {
        return this.token;
    }

    clearToken() {
        this.token = null;
        this.removeToken();
    }

    async get<T = any>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
        const fullUrl = this.buildUrl(url, params);
        return this.request<T>('GET', fullUrl);
    }

    async post<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
        const fullUrl = this.baseUrl + url;
        return this.request<T>('POST', fullUrl, data);
    }

    async put<T = any>(url: string, data?: any): Promise<ApiResponse<T>> {
        const fullUrl = this.baseUrl + url;
        return this.request<T>('PUT', fullUrl, data);
    }

    async delete<T = any>(url: string): Promise<ApiResponse<T>> {
        const fullUrl = this.baseUrl + url;
        return this.request<T>('DELETE', fullUrl);
    }

    private async request<T>(method: string, url: string, data?: any): Promise<ApiResponse<T>> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const options: RequestInit = {
            method,
            headers,
        };

        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            return result as ApiResponse<T>;
        } catch (error) {
            console.error('HTTP request error:', error);
            return {
                code: 500,
                message: '网络请求失败',
                data: null as T,
            };
        }
    }

    private buildUrl(url: string, params?: Record<string, any>): string {
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

    private loadToken() {
        if (typeof wx !== 'undefined') {
            this.token = wx.getStorageSync('auth_token') || null;
        } else {
            this.token = localStorage.getItem('auth_token');
        }
    }

    private saveToken() {
        if (typeof wx !== 'undefined') {
            wx.setStorageSync('auth_token', this.token);
        } else if (this.token) {
            localStorage.setItem('auth_token', this.token);
        }
    }

    private removeToken() {
        if (typeof wx !== 'undefined') {
            wx.removeStorageSync('auth_token');
        } else {
            localStorage.removeItem('auth_token');
        }
    }
}

export const httpClient = new HttpClient('http://localhost:8081/api');
