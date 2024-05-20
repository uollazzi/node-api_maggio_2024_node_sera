import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import morgan from "morgan";
import * as db from "./db";

const app = express();
const port = Number(process.env.PORT) || 3000;

// middlewares
app.use(morgan("dev"));

app.get("/", async (req: Request, res: Response) => {
    let posts = await db.getPosts();
    res.json(posts);
});

app.listen(port, () => console.log(`Server in ascolto su http://localhost:${port}`));
