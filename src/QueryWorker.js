import WebSocketSupport from "./WebSocketSupport";
import {computed } from "mobx";

self.serverResponseHandler = ((onMessageEvent)=>{
  // This function handles the server responses to queries sent in the
  // onmessage function below.

  // data format should still be stringified JSON coming from query server.
  let queryResult = onMessageEvent.data;

  postMessage(queryResult);

});

self.webSocketSupport = new WebSocketSupport( self.serverResponseHandler);

onmessage = function (event) {
  var message = JSON.parse(event.data);
  console.log("QUERYWORKER: received :" + JSON.stringify(message));

  // data is expected to be stringified JSON so send straight to query server.
  var query = event.data;

  this.webSocketSupport.submitQuery(query);

  // log query sent back to UI for a spinner?
  // postMessage(JSON.stringify("sampleResponse"));
};

