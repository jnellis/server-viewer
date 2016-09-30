class WebSocketSupport {

  webSocket;

  webSocketPath;
  onMessage;
  onOpen;
  onClose;

  /**
   * Takes a
   * @param onMessage
   * @param webSocketPath
   * @param onOpen
   * @param onClose
   */
  constructor(onMessage = this.defaultOnMessage,
              webSocketPath = "ws://127.0.0.1:80/ws",
              onOpen = WebSocketSupport.defaultOnOpen,
              onClose = WebSocketSupport.defaultOnClose) {
    this.onMessage = onMessage;
    this.webSocketPath = webSocketPath;
    this.onOpen = onOpen;
    this.onClose = onClose;
    this.initializeWebSocket();
  }


  initializeWebSocket() {
    if (this.webSocket &&
        this.webSocket.readyState < WebSocket.CLOSING) {
      return; // existing web socket is still open
    }

    this.webSocket = new WebSocket(this.webSocketPath);
    this.webSocket.onmessage = this.onMessage;
    this.webSocket.onopen = this.onOpen;
    this.webSocket.onclose = this.onClose;

  }

  static defaultOnOpen(event) {
    console.log("WebSocket opened.");
  }

  static defaultOnClose(event) {
    console.log("WebSocket closed");
  }

  defaultOnMessage(event) {
    let queryResultJson = event.data;
    if (this.webWorker) {
      // we are in web worker
      queryResultJson = queryResultJson.queryResult;
    }
    let queryResult = JSON.parse(queryResultJson);
    this.serverData.addQueryResult(queryResult);
  }

  submitQuery(payload) {
    if (!!payload) {
      if (this.webSocket.readyState == WebSocket.OPEN) {
        this.webSocket.send( payload );
        console.log("sent websocket query:" + payload);
      }
      else {
        console.log("The socket is not open.");
      }
    }
  }

}

export default WebSocketSupport;