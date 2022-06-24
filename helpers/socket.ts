import toast from 'react-hot-toast';
import {io, ManagerOptions, Socket, SocketOptions} from 'socket.io-client'

export const initSocket = async () => {


    const option : Partial<ManagerOptions & SocketOptions>= {
        forceNew : true,
        reconnectionAttempts: 10000,
        timeout : 10000,
        transports: ['websocket']
    }
    return io("https://codeonline-server.herokuapp.com/" as string, option)
}


