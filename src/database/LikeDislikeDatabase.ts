import { BaseDatabase } from "./BaseDatabase";
import { PostDB } from "../models/Post";
import { CommentsDB } from "../models/Comments";
import { PostDatabase } from "./PostDatabase";
import { CommentsDatabase } from "./CommentsDatabase";
import { LikeDislikeDB } from "../models/LikeDislikePost";
import { LikeDislikeCommentDB } from "../models/LikeDislikeComment";

export class LikeDislikeDatabase extends BaseDatabase {
    public static TABLE_LIKE_DISLIKE = "likes_dislikes"
    public static TABLE_LIKE_DISLIKE_COMMENT = "likes_dislikes_comment"
    public static TABLE_POSTS = "posts"
    public static TABLE_COMMENTS = "comments"

    //like dislike POST
    public async findPostById(
        id: string
    ): Promise<PostDB | undefined> {
        const [postDB]: PostDB[] | undefined[] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .where({ id })

        return postDB
    }

    public insertLikeDislike = async (LikeDislike: LikeDislikeDB): Promise<void> => {
        await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_LIKE_DISLIKE)
            .insert(LikeDislike)
    }

    public updateLikeDislike = async (LikeDislike: LikeDislikeDB): Promise<void> => {
        await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_LIKE_DISLIKE)
            .update({ like: LikeDislike.like })
            .where({ user_id: LikeDislike.user_id })
            .andWhere({ post_id: LikeDislike.post_id })
    }

    public deleteLikeDislike = async (PostId: string, UserId: string): Promise<void> => {
        await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_LIKE_DISLIKE)
            .del()
            .where({ post_id: PostId })
            .andWhere({ user_id: UserId })
    }

    public postIncreaseLike = async (id: string): Promise<void> => {
        await BaseDatabase
        .connection(LikeDislikeDatabase.TABLE_POSTS)
        .where({id})
        .increment("likes")
    }

    public postDecreaseLike = async (id: string): Promise<void> => {
        await BaseDatabase
        .connection(LikeDislikeDatabase.TABLE_POSTS)
        .where({id})
        .decrement("likes")
    }

    public postIncreaseDislike = async (id: string): Promise<void> => {
        await BaseDatabase
        .connection(LikeDislikeDatabase.TABLE_POSTS)
        .where({id})
        .increment("dislikes")
    }

    public postDecreaseDislike = async (id: string): Promise<void> => {
        await BaseDatabase
        .connection(LikeDislikeDatabase.TABLE_POSTS)
        .where({id})
        .decrement("dislikes")
    }

    public postReverseLikeDislike = async (id: string, like: number): Promise<void>=>{
        if(like === 1){
            await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_POSTS)
            .where({id})
            .decrement("dislikes")
            .increment("likes")
        }else{
            await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_POSTS)
            .where({id})
            .decrement("likes")
            .increment("dislikes")
        }
    }

    public findLikeDislike = async (PostId: string, UserId: string): Promise<LikeDislikeDB> => {
        const [resultDB]: LikeDislikeDB[] = await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_LIKE_DISLIKE)
            .where({ post_id: PostId })
            .andWhere({ user_id: UserId })

            return resultDB
    }

    //like dislike COMMENT

    public async findCommentById(
        id: string
    ): Promise<CommentsDB | undefined> {
        const [commentsDB]: CommentsDB[] | undefined[] = await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS)
            .where({ id })

        return commentsDB
    }

    public insertLikeDislikeComment = async (LikeDislike: LikeDislikeCommentDB): Promise<void> => {
        await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_LIKE_DISLIKE_COMMENT)
            .insert(LikeDislike)
    }

    public updateLikeDislikeComment = async (LikeDislike: LikeDislikeCommentDB): Promise<void> => {
        await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_LIKE_DISLIKE_COMMENT)
            .update({ like: LikeDislike.like })
            .where({ user_id: LikeDislike.user_id })
            .andWhere({ comment_id: LikeDislike.comment_id })
    }

    public deleteLikeDislikeComment = async (CommentId: string, UserId: string): Promise<void> => {
        await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_LIKE_DISLIKE_COMMENT)
            .del()
            .where({ comment_id: CommentId })
            .andWhere({ user_id: UserId })
    }

    public commentIncreaseLike = async (id: string): Promise<void> => {
        await BaseDatabase
        .connection(LikeDislikeDatabase.TABLE_COMMENTS)
        .where({id})
        .increment("likes")
    }

    public commentDecreaseLike = async (id: string): Promise<void> => {
        await BaseDatabase
        .connection(LikeDislikeDatabase.TABLE_COMMENTS)
        .where({id})
        .decrement("likes")
    }

    public commentIncreaseDislike = async (id: string): Promise<void> => {
        await BaseDatabase
        .connection(LikeDislikeDatabase.TABLE_COMMENTS)
        .where({id})
        .increment("dislikes")
    }

    public commentDecreaseDislike = async (id: string): Promise<void> => {
        await BaseDatabase
        .connection(LikeDislikeDatabase.TABLE_COMMENTS)
        .where({id})
        .decrement("dislikes")
    }

    public commentReverseLikeDislike = async (id: string, like: number): Promise<void>=>{
        if(like === 1){
            await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_COMMENTS)
            .where({id})
            .decrement("dislikes")
            .increment("likes")
        }else{
            await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_COMMENTS)
            .where({id})
            .decrement("likes")
            .increment("dislikes")
        }
    }

    public findLikeDislikeComment = async (CommentId: string, UserId: string): Promise<LikeDislikeCommentDB> => {
        const [resultDB]: LikeDislikeCommentDB[] = await BaseDatabase
            .connection(LikeDislikeDatabase.TABLE_LIKE_DISLIKE_COMMENT)
            .where({ comment_id: CommentId })
            .andWhere({ user_id: UserId })

            return resultDB
    }

}
