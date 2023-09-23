export interface LikeDislikeCommentDB {
    user_id: string,
    comment_id: string,
    like: number
}

export interface LikeDislikeCommentModel {
    userId: string,
    commentId: string,
    like: number
}

export class LikeDislikeComment {
    constructor(
        private userId: string,
        private commentId: string,
        private like: number
    ) {}

    public getUserId(): string {
        return this.userId
    }

    public setUserId(value: string): void {
        this.userId = value
    }

    public getLike(): number {
        return this.like
    }

    public setLike(value: number): void {
        this.like = value;
    }

    public toDBModel(): LikeDislikeCommentDB {
        return {
            user_id: this.userId,
            comment_id: this.commentId,
            like: this.like
        }
    }

    public toBusinessModel(): LikeDislikeCommentModel {
        return {
            userId: this.userId,
            commentId: this.commentId,
            like: this.like
        }
    }
}
