"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datau = exports.mensaje = exports.desconectar = void 0;
let nombre;
const desconectar = (cliente) => {
    cliente.on('disconnect', () => {
        console.log('cliente desconectado');
    });
};
exports.desconectar = desconectar;
//escuchar mensajes
const mensaje = (cliente, io) => {
    cliente.on('mensaje', (data, callback) => {
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
};
exports.mensaje = mensaje;
const datau = (cliente, io) => {
    cliente.on('datauser', () => {
        console.log('cliente desconectado');
        // io.emit('mensaje-nuevo',nombre);
        console.log('prueba de envio', nombre);
        io.in(cliente.id).emit('mensaje-nuevo', nombre);
    });
};
exports.datau = datau;
