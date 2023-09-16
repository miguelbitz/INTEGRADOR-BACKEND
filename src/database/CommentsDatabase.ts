import { CommentsDB } from "../models/Comments";
import { BaseDatabase } from "./BaseDatabase";

export class CommentsDatabase extends BaseDatabase {
  public static TABLE_COMMENTS = "comments";

  public async getCommentsForPost(postId: string): Promise<CommentsDB[]> {
    const commentsDB: CommentsDB[] = await BaseDatabase
      .connection(CommentsDatabase.TABLE_COMMENTS)
      .where("post_id", postId);

    return commentsDB;
  }

  public async findCommentById(id: string): Promise<CommentsDB | undefined> {
    const [commentDB]: CommentsDB[] | undefined[] = await BaseDatabase
      .connection(CommentsDatabase.TABLE_COMMENTS)
      .where({ id });

    return commentDB;
  }

  public async insertComment(newCommentDB: CommentsDB): Promise<void> {
    await BaseDatabase
      .connection(CommentsDatabase.TABLE_COMMENTS)
      .insert(newCommentDB);
  }

  public async updateComment(comment: CommentsDB): Promise<void> {
    await BaseDatabase
      .connection(CommentsDatabase.TABLE_COMMENTS)
      .where("id", comment.id)
      .update({ content: comment.content });
  }


  public async deleteComment(id: string): Promise<void> {
    await BaseDatabase
      .connection(CommentsDatabase.TABLE_COMMENTS)
      .where("id", id)
      .del();
  }
}
