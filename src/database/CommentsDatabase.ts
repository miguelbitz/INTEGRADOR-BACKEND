import { CommentsDB } from "../models/Comments";
import { BaseDatabase } from "./BaseDatabase";

export class CommentsDatabase extends BaseDatabase {
  public static TABLE_COMMENTS = "comments";

  public async getCommentsFromPost(postId: string | undefined): Promise<CommentsDB[]> {
    const commentsDB: CommentsDB[] = await BaseDatabase
      .connection(CommentsDatabase.TABLE_COMMENTS)
      .where("post_id", "LIKE", `%${postId}%`);

    return commentsDB;
  }

  public async getCommentById(id: string | undefined): Promise<CommentsDB> {
    const [result] = await BaseDatabase
        .connection(CommentsDatabase.TABLE_COMMENTS)
        .where({id})

    return result;
}

  public async insertComment(newCommentDB: CommentsDB): Promise<void> {
    await BaseDatabase
      .connection(CommentsDatabase.TABLE_COMMENTS)
      .insert(newCommentDB);
  }

  public async editComment(
    id: string, newContent: string, updateTime: string
  ): Promise<void> {
    await BaseDatabase
      .connection(CommentsDatabase.TABLE_COMMENTS)
      .update({ content: newContent, updated_at: updateTime})
      .where({ id })
  }


  public async deleteComment(id: string): Promise<void> {
    await BaseDatabase
      .connection(CommentsDatabase.TABLE_COMMENTS)
      .where("id", id)
      .del();
  }
}
