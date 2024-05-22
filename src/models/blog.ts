import { IPost } from "../db";


export interface PostAddDTO {
    title: string,
    body: string,
    author: string,
    hidden: boolean
}

export interface Post {
    id: string,
    title: string,
    body: string,
    author: string,
    hidden: boolean,
    date: number
}


// converte (il tipo) il post del database nel post che vogliamo tornare al client
export const convertToPost = (post: IPost): Post => {
    const p: Post = {
        id: post.id,
        title: post.title,
        body: post.body,
        author: post.author,
        hidden: post.hidden,
        date: post.date.getTime()
    }

    return p;
}

