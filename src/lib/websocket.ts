interface WebSocketMessage {
  event: 'MODIFY' | 'INSERT' | 'REMOVE';
  new?: any;
  old?: any;
}

interface WebSocketClientOptions {
  url: string;
  onMessage?: (message: WebSocketMessage) => void;
  onError?: (error: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onOpen?: (event: Event) => void;
  autoReconnect?: boolean;
  reconnectInterval?: number;
}

class WebSocketClient {
  private ws: WebSocket | null = null;
  private options: WebSocketClientOptions;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private isConnecting = false;

  constructor(options: WebSocketClientOptions) {
    this.options = {
      autoReconnect: true,
      reconnectInterval: 5000,
      ...options
    };
  }

  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN || this.isConnecting) {
      return;
    }

    this.isConnecting = true;
    console.log('🔌 Connecting to WebSocket:', this.options.url);

    try {
      this.ws = new WebSocket(this.options.url);

      this.ws.onopen = (event) => {
        console.log('✅ Connected to WebSocket');
        this.isConnecting = false;
        this.options.onOpen?.(event);
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          console.log('📨 Message from server:', message);
          this.options.onMessage?.(message);
        } catch (error) {
          console.error('❌ Failed to parse message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('⚠️ WebSocket error:', error);
        this.isConnecting = false;
        this.options.onError?.(error);
      };

      this.ws.onclose = (event) => {
        console.log('❌ Connection closed:', event.code, event.reason);
        this.isConnecting = false;
        this.options.onClose?.(event);

        if (this.options.autoReconnect && event.code !== 1000) {
          this.scheduleReconnect();
        }
      };
    } catch (error) {
      console.error('❌ Failed to create WebSocket connection:', error);
      this.isConnecting = false;
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    this.reconnectTimeout = setTimeout(() => {
      console.log('🔄 Attempting to reconnect...');
      this.connect();
    }, this.options.reconnectInterval);
  }

  disconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.ws) {
      this.ws.close(1000, 'Client disconnect');
      this.ws = null;
    }
  }

  send(data: any): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn('⚠️ WebSocket is not connected');
    }
  }

  get readyState(): number {
    return this.ws?.readyState ?? WebSocket.CLOSED;
  }
}

// Notification utilities
class NotificationManager {
  private static instance: NotificationManager;
  private permission: NotificationPermission = 'default';

  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }
    return NotificationManager.instance;
  }

  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

    if (this.permission === 'granted') {
      return true;
    }

    this.permission = await Notification.requestPermission();
    return this.permission === 'granted';
  }

  showNotification(title: string, options?: NotificationOptions): void {
    if (this.permission !== 'granted') {
      console.warn('Notification permission not granted');
      return;
    }

    const notification = new Notification(title, {
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      ...options
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    // Auto close after 5 seconds
    setTimeout(() => {
      notification.close();
    }, 5000);
  }
}


// Export the main websocket client factory
export function createWebSocketClient(options: WebSocketClientOptions): WebSocketClient {
  return new WebSocketClient(options);
}

// Export utilities
export { NotificationManager };
export type { WebSocketMessage, WebSocketClientOptions };