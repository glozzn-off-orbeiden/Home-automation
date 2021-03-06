import {Alert} from 'react-native'
import socket from 'socket.io-client'
import {url} from "../config"
const io = socket(url, { forceNew: true })

function alertHandler() {
    io.on("alert", function (data) {
        console.log(data.title,":",data.message);
        Alert.alert(
          data.title,
          data.message
        );
        alert(data.title+ ":" + data.message)
      });
}

export default alertHandler;