import { BaseDatabase } from "./BaseDatabase";
import { PostDB } from "../models/Post";
import { PostDatabase } from "./PostDatabase";
import { LikeDislikeDB } from "../models/LikeDislike";

export class LikeDislikeDatabase extends BaseDatabase {
    public static TABLE_LIKE_DISLIKE = "likes_dislikes"
    public static TABLE_POSTS = "posts"

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

    /*   public async findInteractionByUserAndPost(
        userId: string,
        postId: string
      ): Promise<{ like: number } | undefined> {
        const result = await BaseDatabase.connection(LikeDislikeDatabase.TABLE_LIKE_DISLIKE)
          .select("like")
          .where("user_id", userId)
          .where("post_id", postId)
          .first();
    
        return result;
      }
    
      public async deleteInteraction(interactionId: string): Promise<void> {
        await BaseDatabase.connection(LikeDislikeDatabase.TABLE_LIKE_DISLIKE)
          .where("id", interactionId)
          .del();
      }
    
      public async addInteraction(userId: string, postId: string, like: number): Promise<void> {
        await BaseDatabase.connection(LikeDislikeDatabase.TABLE_LIKE_DISLIKE)
          .insert({
            user_id: userId,
            post_id: postId,
            like: like ? 1 : 0
          });
      } */

}
