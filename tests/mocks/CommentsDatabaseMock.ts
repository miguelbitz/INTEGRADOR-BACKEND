import { BaseDatabase } from "../../src/database/BaseDatabase";
import { CommentsDB } from "../../src/models/Comments";

const commentsMock: CommentsDB[] = [
  {
    id: "id-comment-mock-miguel",
    post_id: "id-post-mock-miguel",
    user_id: "id-mock-miguel",
    content: "content-comment",
    likes: 0,
    dislikes: 0,
    created_at: new Date().toISOString()
  }
];

export class CommentsDatabaseMock extends BaseDatabase {
  public static TABLE_COMMENTS = "comments";

  public async getCommentsFromPost(postId: string | undefined): Promise<CommentsDB[]> {
    if (postId) {
      return commentsMock.filter(comment =>
        comment.post_id.toLocaleLowerCase().includes(postId.toLocaleLowerCase()));
    } else {
      return commentsMock;
    }
  }

  public async getCommentById(id: string): Promise<CommentsDB | undefined> {
    return  commentsMock.find(comment => comment.id === id);
  }

  public async insertComment(newCommentDB: CommentsDB): Promise<void> {
    commentsMock.push(newCommentDB);
  }

  public async editComment(id: string, newContent: string, updateTime: string): Promise<void> {
    const comment = commentsMock.find(comment => comment.id === id);
    if (comment) {
      comment.content = newContent;
      comment.created_at = updateTime;
    }
  }

  public async deleteComment(id: string): Promise<void> {
    const index = commentsMock.findIndex(comment => comment.id === id);
    if (index > -1) {
      commentsMock.splice(index, 1);
    }
  }
}
