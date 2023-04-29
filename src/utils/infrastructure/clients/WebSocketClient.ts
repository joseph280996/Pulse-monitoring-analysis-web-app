import { WSMessageType } from '../../types';
import WebSocketMessageHandlerFactory from '../factory/WebSocketMessageHandlerFactory';
import IWebsocketClient from './interfaces/IWebsocketClient';
import { OnRecordedDataWSMessageConfigType } from '../onRecordedDataWSMessage';

export type WebSocketClientConstructorParamsType = {
  onOpen: () => void;
  onError: (error: Event) => void;
};

class WebSocketClient implements IWebsocketClient {
  private wsClient: WebSocket;

  get status(): number {
    return this.wsClient.readyState;
  }

  constructor({ onOpen, onError }: WebSocketClientConstructorParamsType) {
    this.wsClient = new WebSocket(
      process.env.NODE_ENV === 'development'
        ? 'ws://localhost:8000'
        : 'ws://192.168.50.251:8000'
    );
    this.wsClient.onopen = onOpen;
    this.wsClient.onerror = onError;
    this.wsClient.onclose = (event: CloseEvent) => {
      console.log('Websocket is closing!!!');
      console.table({ reason: event.reason, code: event.code });
    };
  }

  setMessageHandler(
    onMessageHandlerFactoryProps: OnRecordedDataWSMessageConfigType
  ) {
    this.wsClient.onmessage = WebSocketClient.getOnMessageHandler(
      onMessageHandlerFactoryProps
    );
  }

  sendMessage(message: string) {
    if (this.wsClient.readyState !== WebSocket.CLOSED) {
      this.wsClient.send(message);
    }
  }

  closeConnection() {
    this.wsClient.close();
  }

  private static getOnMessageHandler(
    onMessageHandlerFactoryExtraProps: OnRecordedDataWSMessageConfigType
  ) {
    return (message: MessageEvent) => {
      const parsedMessage: WSMessageType = JSON.parse(message.data);
      const handler = WebSocketMessageHandlerFactory.getHandler(
        parsedMessage.type
      );
      handler(parsedMessage, onMessageHandlerFactoryExtraProps);
    };
  }

}

export default WebSocketClient;
