import express from "express";
import { SERVER_PORT } from "../global/enviroment";
import socketIO from 'socket.io';
import  http from 'http';

import * as sokect from '../sokects/sokects';


export default class Server {

    private static _instance:Server;

    public app: express.Application;
    public port: number;
    private httpserver:http.Server
    public io:socketIO.Server;



private constructor(){

    this.app = express();
    this.port = SERVER_PORT;

    this.httpserver = new http.Server(this.app);
    this.io =  new socketIO.Server(this.httpserver);

    this.escucharSokets();
}

public  static get instance(){
    return this._instance || (this._instance = new this())
}

private escucharSokets(){

    console.log('escuchando conecxiones');
    this.io.on('connection',cliente =>{
    
        console.log('cliente conectado');

//mensajes

sokect.mensaje(cliente,this.io);
sokect.datau(cliente,this.io);

  //desconectar 
   sokect.desconectar(cliente);
    

    });    
}

start( callback: any ) {
    this.httpserver.listen( this.port,callback)
}

}