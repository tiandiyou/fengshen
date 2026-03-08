export type MessageHandler = (data: any) => void;

export interface WebSocketMessage {
    type: string;
    timestamp: number;
    data: any;
}

export class WebSocketClient {
    private url: string;
    private ws: WebSocket | null = null;
    private handlers: Map<string, MessageHandler[]> = new Map();
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 3000;
    private heartbeatInterval: any = null;

    constructor(url: string) {
        this.url = url;
    }

    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.ws = new WebSocket(this.url);

                this.ws.onopen = () => {
                    console.log('WebSocket connected');
                    this.reconnectAttempts = 0;
                    this.startHeartbeat();
                    resolve();
                };

                this.ws.onmessage = (event) => {
                    try {
                        const message: WebSocketMessage = JSON.parse(event.data);
                        this.handleMessage(message);
                    } catch (error) {
                        console.error('Failed to parse message:', error);
                    }
                };

                this.ws.onerror = (error) => {
                    console.error('WebSocket error:', error);
                    reject(error);
                };

                this.ws.onclose = () => {
                    console.log('WebSocket closed');
                    this.stopHeartbeat();
                    this.attemptReconnect();
                };
            } catch (error) {
                reject(error);
            }
        });
    }

    disconnect() {
        this.stopHeartbeat();
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    send(type: string, data: any) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            console.error('WebSocket is not connected');
            return false;
        }

        const message: WebSocketMessage = {
            type,
            timestamp: Date.now(),
            data,
        };

        try {
            this.ws.send(JSON.stringify(message));
            return true;
        } catch (error) {
            console.error('Failed to send message:', error);
            return false;
        }
    }

    on(type: string, handler: MessageHandler) {
        if (!this.handlers.has(type)) {
            this.handlers.set(type, []);
        }
        this.handlers.get(type)!.push(handler);
    }

    off(type: string, handler?: MessageHandler) {
        if (!handler) {
            this.handlers.delete(type);
        } else {
            const handlers = this.handlers.get(type);
            if (handlers) {
                const index = handlers.indexOf(handler);
                if (index > -1) {
                    handlers.splice(index, 1);
                }
            }
        }
    }

    private handleMessage(message: WebSocketMessage) {
        const handlers = this.handlers.get(message.type);
        if (handlers) {
            handlers.forEach(handler => handler(message.data));
        }

        const allHandlers = this.handlers.get('*');
        if (allHandlers) {
            allHandlers.forEach(handler => handler(message));
        }
    }

    private startHeartbeat() {
        this.heartbeatInterval = setInterval(() => {
            this.send('heartbeat', { timestamp: Date.now() });
        }, 30000);
    }

    private stopHeartbeat() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
    }

    private attemptReconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('Max reconnect attempts reached');
            return;
        }

        this.reconnectAttempts++;
        const delay = this.reconnectDelay * this.reconnectAttempts;

        console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

        setTimeout(() => {
            this.connect().catch(error => {
                console.error('Reconnect failed:', error);
            });
        }, delay);
    }

    get isConnected(): boolean {
        return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
    }
}
