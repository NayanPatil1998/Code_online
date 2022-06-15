import {io, ManagerOptions, SocketOptions} from 'socket.io-client'
export const initSocket = async () => {
    const option : Partial<ManagerOptions & SocketOptions>= {
        forceNew : true,
        reconnectionAttempts: 10000,
        timeout : 10000,
        transports: ['websocket']
    }
    return io(process.env.NEXT_APP_BACKEND_URL as string, option)
}