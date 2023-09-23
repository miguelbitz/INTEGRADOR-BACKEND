import { BaseDatabase } from "../../src/database/BaseDatabase";
import { PostDB } from "../../src/models/Post";
import { LikeDislikeDB } from "../../src/models/LikeDislike";

const likeDislikeMock: LikeDislikeDB[] = [{
    user_id: "id-mock-gica",
    post_id: "id-post-mock-miguel",
    like: 0
}];

const postsMock: PostDB[] = [
    {
        id: "id-post-mock-miguel",
        creator_id: "id-mock-miguel",
        content: "content-miguel",
        likes: 0,
        dislikes: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    }
];

export class LikeDislikeDatabaseMock extends BaseDatabase {
    public static TABLE_LIKE_DISLIKE = "likes_dislikes";
    public static TABLE_POSTS = "posts";

    public async findPostById(id: string): Promise<PostDB | undefined> {
        return postsMock.find(post => post.id === id);
    }

    public insertLikeDislike = async (likeDislike: LikeDislikeDB): Promise<void> => {
        likeDislikeMock.push(likeDislike);
    }

    public updateLikeDislike = async (likeDislike: LikeDislikeDB): Promise<void> => {
        const index = likeDislikeMock.findIndex(ld => ld.post_id === likeDislike.post_id && ld.user_id === likeDislike.user_id);
        if (index > -1) {
            likeDislikeMock[index] = likeDislike;
        }
    }

    public deleteLikeDislike = async (postId: string, userId: string): Promise<void> => {
        const index = likeDislikeMock.findIndex(ld => ld.post_id === postId && ld.user_id === userId);
        if (index > -1) {
            likeDislikeMock.splice(index, 1);
        }
    }

    public postIncreaseLike = async (id: string): Promise<void> => {
        const post = postsMock.find(p => p.id === id);
        if (post) {
            post.likes++;
        }
    }

    public postDecreaseLike = async (id: string): Promise<void> => {
        const post = postsMock.find(p => p.id === id);
        if (post) {
            post.likes--;
        }
    }

    public postIncreaseDislike = async (id: string): Promise<void> => {
        const post = postsMock.find(p => p.id === id);
        if (post) {
            post.dislikes++;
        }
    }

    public postDecreaseDislike = async (id: string): Promise<void> => {
        const post = postsMock.find(p => p.id === id);
        if (post) {
            post.dislikes--;
        }
    }

    public postReverseLikeDislike = async (id: string, like: number): Promise<void> => {
        const post = postsMock.find(p => p.id === id);
        if (post) {
            if (like === 1) {
                post.likes++;
                post.dislikes--;
            } else {
                post.likes--;
                post.dislikes++;
            }
        }
    }

    public findLikeDislike = async (PostId: string, UserId: string): Promise<LikeDislikeDB> => {
        const foundLikeDislike = likeDislikeMock.find(like => like.post_id === PostId && like.user_id === UserId);
        if (!foundLikeDislike) {
            //throw new Error("LikeDislike not found");
            return {
                user_id: UserId,
                post_id: PostId,
                like: 0
            };
        }
        return foundLikeDislike;
    }
}
