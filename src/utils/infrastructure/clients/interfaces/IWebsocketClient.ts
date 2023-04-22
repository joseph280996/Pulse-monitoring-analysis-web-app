import { OnRecordedDataWSMessageConfigType } from "../onRecordedDataWSMessage";

export default interface IWebsocketClient {
    setMessageHandler(onMessageHandlerFactoryProps: OnRecordedDataWSMessageConfigType): void
    sendMessage(message: string): void
    closeConnection(): void
}
