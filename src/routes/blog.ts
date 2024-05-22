import { Request, Response, Router } from "express";
import * as db from "../db";
import { PostAddDTO, convertToPost } from "../models/blog";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const posts = await db.getPosts();
        res.json(posts.map(p => convertToPost(p)));
    } catch (error) {
        res.status(500).json({ message: "Qualcosa è andato storto" });
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const post: PostAddDTO = req.body;
        const r = await db.addPost(post);

        res.json(convertToPost(r));
    } catch (error) {
        res.status(500).json({ message: "Qualcosa è andato storto" });
    }
});

export default router;