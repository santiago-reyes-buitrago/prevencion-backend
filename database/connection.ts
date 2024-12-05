import pg, {Pool} from 'pg'
import dotenv from "dotenv";
import {DBData} from "../Interface";

dotenv.config()



export class DBConnection{
    static instance:DBConnection;
    private pool!:Pool;
    constructor( 
        private user:DBData
    ) {
        if (!!DBConnection.instance){
            return DBConnection.instance;
        }
        DBConnection.instance = this;
        this.pool = new Pool({
            host: this.user.host,
            user: this.user.user,
            password: this.user.password,
            database: this.user.database,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
          })
    }

    public get Pool(){
        return this.pool;
    }

}


 