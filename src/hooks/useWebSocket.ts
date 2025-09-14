import { useEffect, useRef, useCallback } from 'react';
import { createWebSocketClient, NotificationManager, WebSocketMessage } from '../lib/websocket';

interface UseWebSocketOptions {
  url: string;
  onRefresh?: (message: any) => void;
  enableNotifications?: boolean;
  autoReconnect?: boolean;
}

export function useWebSocket(options: UseWebSocketOptions) {
  const clientRef = useRef<ReturnType<typeof createWebSocketClient> | null>(null);
  const notificationManager = useRef(NotificationManager.getInstance());

  const handleMessage = useCallback((message: WebSocketMessage) => {
    console.log('📨 WebSocket message received:', message);
    
    // Show notification for data changes
    if (options.enableNotifications && message.event) {
      const eventType = message.event.toLowerCase();
      const title = `Data ${eventType}d`;
      const body = `A record has been ${eventType}d in the database`;
      
      notificationManager.current.showNotification(title, {
        body,
        tag: `data-${eventType}`,
      });
    }

    // Trigger refresh callback with message
    if (options.onRefresh) {
      options.onRefresh(message);
    }
  }, [options.enableNotifications, options.onRefresh]);

  const connect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.disconnect();
    }

    clientRef.current = createWebSocketClient({
      url: options.url,
      onMessage: handleMessage,
      onError: (error) => {
        console.error('WebSocket error:', error);
      },
      onClose: (event) => {
        console.log('WebSocket closed:', event.code, event.reason);
      },
      onOpen: () => {
        console.log('WebSocket connected');
      },
      autoReconnect: options.autoReconnect ?? true,
    });

    clientRef.current.connect();
  }, [options.url, handleMessage, options.autoReconnect]);

  const disconnect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.disconnect();
      clientRef.current = null;
    }
  }, []);

  const send = useCallback((data: any) => {
    if (clientRef.current) {
      clientRef.current.send(data);
    }
  }, []);

  // Request notification permission on mount
  useEffect(() => {
    if (options.enableNotifications) {
      notificationManager.current.requestPermission();
    }
  }, [options.enableNotifications]);

  // Connect on mount, disconnect on unmount
  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    connect,
    disconnect,
    send,
    readyState: clientRef.current?.readyState ?? WebSocket.CLOSED,
  };
}