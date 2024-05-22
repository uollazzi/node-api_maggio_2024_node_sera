import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import indexRouter from "./routes/index";
import blogRouter from "./routes/blog";

const app = express();
const port = Number(process.env.PORT) || 3000;

// middlewares
app.use(cors());
app.use(morgan("dev"));

// middleware che converte in json il body di tutte le richieste che hanno
// Content-Type: application/json
app.use(express.json());

app.use("/", indexRouter);
app.use("/api/blog", blogRouter);

// errore 500
app.use((err: Error, req: Request, res: Response) => {
    console.error(err);
    res.status(500).json({ message: "Qualcosa è andato storto" });
});

app.listen(port, () => console.log(`Server in ascolto su http://localhost:${port}`));
