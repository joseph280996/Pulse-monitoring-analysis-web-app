import { useEffect, useState } from "react";
import WebSocketClient from "../infrastructure/clients/WebSocketClient";
import { type OnRecordedDataWSMessageConfigType } from "../../handlers/onRecordedDataWSMessage";

let wsController: WebSocketClient | null = null;

interface UseWebsocketReturnType {
  error?: ErrorEvent;
  readyState?: number;
  wsController: WebSocketClient | null;
}

type UseWebSocketType = (
  messageHandlerFactoryProps: OnRecordedDataWSMessageConfigType &
    OnRecordIDWsMessageConfigType
) => UseWebsocketReturnType;

const useWebSocket: UseWebSocketType = (
  messageHandlerFactoryProps
): UseWebsocketReturnType => {
  const [error, setError] = useState<ErrorEvent | undefined>();
  const [readyState, setReadyState] = useState<number | undefined>(
    WebSocket.CLOSED
  );
  useEffect(() => {
    if (!wsController || wsController.status === WebSocket.CLOSED) {
      wsController = new WebSocketClient({
        onOpen: () => {
          setReadyState(wsController?.status);
          console.log("WebSocket connection established");
        },
        onError: (err: Event): void => {
          setError(err as ErrorEvent);
          wsController?.closeConnection();
        },
      });
    }
    return () => {
      wsController?.closeConnection();
    };
  }, []);

  useEffect(() => {
    if (wsController) {
      wsController.setMessageHandler(messageHandlerFactoryProps);
    }
  });

  return { error, readyState, wsController };
};

export default useWebSocket;
