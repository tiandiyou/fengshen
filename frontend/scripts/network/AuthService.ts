import { httpClient, ApiResponse } from './HttpClient';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface UserInfo {
    id: number;
    username: string;
    avatarUrl: string | null;
    email: string | null;
    phone: string | null;
    status: number;
    createdAt: string;
    updatedAt: string;
    lastLogin: string | null;
}

export class AuthService {
    async register(username: string, password: string): Promise<ApiResponse<{ userId: number; username: string }>> {
        const response = await httpClient.post<{ userId: number; username: string }>('/auth/register', {
            username,
            password,
        });
        return response;
    }

    async login(username: string, password: string): Promise<ApiResponse<LoginResponse>> {
        const response = await httpClient.post<LoginResponse>('/auth/login', {
            username,
            password,
        });

        if (response.code === 200 && response.data.token) {
            httpClient.setToken(response.data.token);
        }

        return response;
    }

    async getUserInfo(): Promise<ApiResponse<UserInfo>> {
        return await httpClient.get<UserInfo>('/auth/info');
    }

    logout() {
        httpClient.clearToken();
    }

    isLoggedIn(): boolean {
        return httpClient.getToken() !== null;
    }
}

export const authService = new AuthService();
