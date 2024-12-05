import dotenv from "dotenv";
import express, {Express, Request, Response} from "express";
import cors from "cors";
import {usersRoutes} from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.use("/users",usersRoutes);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});