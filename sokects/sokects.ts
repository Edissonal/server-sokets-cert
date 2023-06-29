
import { Socket } from 'socket.io';
import socketIO from 'socket.io';
let nombre: any;

export const desconectar = (cliente: Socket) => {


    cliente.on('disconnect', () => {
        console.log('cliente desconectado');
    });
}



//escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('mensaje', (data: { usuario: string, pass: string }, callback: Function) => {

        console.log('Mensaje recibido', data);
        nombre = data;

        if (data) {
            callback({
                ok: true,
                code: 200,
                mensaje: data
            });
        }
        else {
            callback({
                ok: true,
                code: 404,
                mensaje: 'falla trasaccion'
            });
        }


        // io.emit('mensaje-nuevo',payload);

    });
}


export const datau = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('datauser', () => {
        console.log('cliente desconectado');
        // io.emit('mensaje-nuevo',nombre);
        console.log('prueba de envio', nombre);
        io.in(cliente.id).emit('mensaje-nuevo', nombre);
    });
}
