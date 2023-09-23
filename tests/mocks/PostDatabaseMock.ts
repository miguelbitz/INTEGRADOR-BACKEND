import { BaseDatabase } from "../../src/database/BaseDatabase";
import { PostDB } from "../../src/models/Post";

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
]

export class PostDatabaseMock extends BaseDatabase {
  public static TABLE_POSTS = "posts"

  public async findPost(
    q: string | undefined
  ): Promise<PostDB[]> {
    if (q) {
      return postsMock.filter(post =>
        post.id.toLocaleLowerCase()
          .includes(q.toLocaleLowerCase()))

    } else {
      return postsMock
    }
  }

  public async findPostById(
    id: string
  ): Promise<PostDB | undefined> {
    return postsMock.find(post => post.id === id)
  }


  public async insertPost(
    newPostDB: PostDB
  ): Promise<void> {

  }

  public async editPost(
    id: string, newContent: string, updateTime: string
  ): Promise<void> {

  }

  public async deletePost(
    id: string
  ): Promise<void> {

  }
}