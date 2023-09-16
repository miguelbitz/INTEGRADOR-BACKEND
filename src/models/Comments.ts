export interface CommentsDB {
    id: string,
    post_id: string,
    user_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
}

export interface CommentsModel {
    id: string,
    postId: string,
    userId: string,
    content: string,
    likes: number,
    dislikes: number,
    createdAt: string,
}

export interface CommentsDetails {
    id: string;
    content: string;
    likes: number;
    dislikes: number;
    createdAt: string;
    user: {
        id: string;
        name: string;
    };
}

export class Comments {
    constructor(
        private id: string,
        private postId: string,
        private userId: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string
    ) {}

    public getId(): string {
        return this.id;
    }

    public setId(value: string): void {
        this.id = value;
    }

    public getPostId(): string {
        return this.postId;
    }

    public setPostId(value: string): void {
        this.postId = value;
    }

    public getUserId(): string {
        return this.userId;
    }

    public setUserId(value: string): void {
        this.userId = value;
    }

    public getContent(): string {
        return this.content;
    }

    public setContent(value: string): void {
        this.content = value;
    }

    public getLikes(): number {
        return this.likes;
    }

    public setLikes(value: number): void {
        this.likes = value;
    }

    public getDislikes(): number {
        return this.dislikes;
    }

    public setDislikes(value: number): void {
        this.dislikes = value;
    }

    public getCreatedAt(): string {
        return this.createdAt;
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value;
    }

    public toDBModel(): CommentsDB {
        return {
            id: this.id,
            post_id: this.postId,
            user_id: this.userId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
        };
    }

    public toBusinessModel(): CommentsModel {
        return {
            id: this.id,
            postId: this.postId,
            userId: this.userId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
        };
    }

    public toCommentDetails(userName: string): CommentsDetails {
        return {
            id: this.id,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            user: {
                id: this.userId,
                name: userName
            },
        };
    }
}