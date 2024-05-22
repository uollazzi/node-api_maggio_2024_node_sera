import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";
import { PostAddDTO } from "./models/blog";

//#region Models
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: Date, default: Date.now },
    hidden: { type: Boolean, default: true },
});

export type IPost = HydratedDocument<InferSchemaType<typeof postSchema>>;
const PostModel = mongoose.model("Post", postSchema, "posts");
//#endregion

const connectionString = process.env.MONGODB_CONNECTION_STRING;

export const addPost = async (post: PostAddDTO) => {

    try {
        await mongoose.connect(connectionString!, { dbName: "blog" });

        const nuovoPost = new PostModel();
        nuovoPost.title = post.title;
        nuovoPost.body = post.body;
        nuovoPost.author = post.author;
        nuovoPost.hidden = post.hidden;

        return await nuovoPost.save();
    } catch (error) {
        console.log(error);
        throw error;
    }
    finally {
        await mongoose.disconnect();
    }
}

export const getPosts = async () => {

    try {
        await mongoose.connect(connectionString!, { dbName: "blog" });

        return await PostModel.find();
    } catch (error) {
        console.log(error);
        throw error;
    }
    finally {
        await mongoose.disconnect();
    }
}

export const deletePost = async (id: string) => {

    try {
        await mongoose.connect(connectionString!, { dbName: "blog" });

        return await PostModel.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
    }
    finally {
        await mongoose.disconnect();
    }
}

export const updatePost = async (
    id: string,
    title: string | undefined,
    author?: string,
    body?: string,
    hidden?: boolean,
) => {

    try {
        await mongoose.connect(connectionString!, { dbName: "blog" });

        const post = await PostModel.findById(id);

        if (!post) {
            throw new Error("Post non trovato.");
        }

        if (title) post.title = title;
        if (author) post.author = author;
        if (body) post.body = body;
        if (hidden) post.hidden = hidden;

        return await post.save();
    } catch (error) {
        console.log(error);
    }
    finally {
        await mongoose.disconnect();
    }
}