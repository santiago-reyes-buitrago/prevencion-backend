import {DBConnection} from "../database";
import {Request,Response} from "express";
import dotenv from "dotenv";
import {DBData} from "../Interface";

dotenv.config();

const user:DBData = {
    user: process.env.DBUSER ?? "",
    password: process.env.DBPASSWORD ?? "",
    host: process.env.DBHOST ?? "localhost",
    port: process.env.DBPORT ?? "5432",
    database: process.env.DBNAME ?? "prueba",
}


export const getUsers = async (req: Request, res: Response) => {
    try {
        const pool = new DBConnection(user).Pool;
        const {rows} = await pool.query("Select * from usuarios");
        res.status(200).json({
            msg: "Consulta Exitosa",
            data: rows,
            err: 0
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Fallo del servidor",
            data: [],
            err: 0
        });
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
        const pool = new DBConnection(user).Pool;
        const {id} = req.params;
        const {rows} = await pool.query("Select * from usuarios where id = $1",[id]);
        res.status(200).json({
            msg: "Consulta Exitosa",
            data: rows,
            err: 0
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Fallo del servidor",
            data: [],
            err: 0
        });
    }
}

export const postUser = async (req: Request, res: Response) => {
    const pool = new DBConnection(user).Pool;
    try {
        const {body} = req;
        const {name,correo,edad} = body;
        const data: [string,string,number] = [name,correo,edad];
        await pool.query("BEGIN")
        const {rows} = await pool.query("insert into usuarios(nombre,correo,edad) VALUES ($1,$2,$3)",data)
        await pool.query("COMMIT")
        res.status(200).json({
            msg: "Creacion Exitosa",
            data: rows,
            err: 0
        });
    } catch (error) {
        console.log(error);
        await pool.query("ROLLBACK")
        res.status(500).json({
            msg: "Fallo del servidor",
            data: [],
            err: 0
        });
    }
}

export const putUser = async (req: Request, res: Response) => {
    const pool = new DBConnection(user).Pool;
    try {
        const {body} = req;
        const {id} = req.params;
        const {name,correo,edad} = body;
        const data: [string,string,number,string] = [name,correo,edad,id];
        await pool.query("BEGIN")
        const {rows} = await pool.query("update usuarios set nombre=$1,correo=$2,edad=$3 where id=$4",data)
        await pool.query("COMMIT")
        res.status(200).json({
            msg: "Actualizacion Exitosa",
            data: rows,
            err: 0
        });
    } catch (error) {
        console.log(error);
        await pool.query("ROLLBACK")
        res.status(500).json({
            msg: "Fallo del servidor",
            data: [],
            err: 0
        });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const pool = new DBConnection(user).Pool;
    try {
        const {id} = req.params;
        await pool.query("BEGIN")
        const {rows} = await pool.query("delete from usuarios where id=$1",[id])
        await pool.query("COMMIT")
        res.status(200).json({
            msg: "Eliminacion Exitosa",
            data: rows,
            err: 0
        });
    } catch (error) {
        console.log(error);
        await pool.query("ROLLBACK")
        res.status(500).json({
            msg: "Fallo del servidor",
            data: [],
            err: 0
        });
    }
}