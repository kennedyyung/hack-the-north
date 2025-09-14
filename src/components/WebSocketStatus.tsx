"use client";

import { useWebSocketContext } from '../contexts/WebSocketContext';

export default function WebSocketStatus() {
  const { isConnected } = useWebSocketContext();

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className="flex items-center space-x-2">
        {/* Connection Status */}
        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-sm text-gray-600">
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
    </div>
  );
}