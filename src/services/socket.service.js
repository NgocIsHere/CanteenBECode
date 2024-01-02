import { io } from "../app.js";

class SocketService {
  // Register new handlers here
  static handlersMessage = {
    order: SocketService.receiveOrder,
    disconnect: SocketService.disconnect,
  };

  //   Start connection socket
  static startConnection(socket) {
    console.log("user is connected: ", socket.id);

    for (let handlerMessage in SocketService.handlersMessage) {
      socket.on(handlerMessage, SocketService.handlersMessage[handlerMessage]);
    }
  }

  //Add new handlers below

  static receiveOrder(msg) {
    io.emit("order", msg);
  }

  static disconnect(socket) {
    console.log("user disconnected: ", socket.id);
  }
}

export default SocketService;
