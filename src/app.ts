import  express, {Application, urlencoded}  from "express";
import cors from 'cors';
import morgan from 'morgan'
import helmet from "helmet";
import instaInfoRouter from "./routes/instaInfo.router";

import 'dotenv/config';
require('dotenv').config()

export class App{
    private app: Application;

    constructor(private port? : number | string){
        this.app = express();
        this.Settings();
        this.Middlewares();
        this.Routers();
    }

    Settings(){
        this.app.set('port', this.port || process.env.PORT_API_INSTA_SCRAP)
    }

    Middlewares(){
        
        this.app.use(morgan(String(process.env.LOGINLEVEL)));
        this.app.use(urlencoded({extended: false}));
        this.app.use(express.json(), express.text());
        this.app.use(helmet());

        this.app.use(cors({
            origin: process.env.DOMAIN,
            methods: ['GET']
        }))
    }

    Routers(){
        this.app.use(instaInfoRouter);
    }

    async listen(){
        this.app.listen(this.app.get('port'));
        console.log("Server up, port ", this.app.get('port'));
    }

}
