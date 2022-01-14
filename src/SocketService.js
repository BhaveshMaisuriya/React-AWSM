import store from "./store/index";
const URL_CONNECTION = process.env.REACT_APP_SOCKET_END_POINT
let webSocket = null;
import { getWebsocketMessageSuccess } from "./store/orderBank/actions"
async function initWebsocket() {
  return new Promise((resolve, reject) => {
    webSocket = new WebSocket(URL_CONNECTION);
    webSocket.onmessage = (event) => {
      if (event.data) {
        const msg = JSON.parse(event.data);
        store.dispatch(getWebsocketMessageSuccess(msg))
      }
    }
    webSocket.onopen = () => {
      resolve(webSocket);
    }
    webSocket.onerror = (err) => {
      reject(err)
    }
  })
}
function sendMessage(message) {
  if (webSocket && webSocket.readyState === 1) {
    webSocket.send(message);
  } else {
    if (webSocket.readyState === 0) {
      setTimeout(() => {
        sendMessage(message)
      }, 1000)
    } else {
      initWebsocket().then(() => {
        sendMessage(message)
      })
    }
  }
}
export {
  initWebsocket,
  sendMessage
}
