import { PostDB } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  public static TABLE_POSTS = "posts"

  public async findPost(
    q: string | undefined
  ): Promise<PostDB[]> {
    if (q) {
      const result: PostDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .where("id", "LIKE", `%${q}%`)

      return result

    } else {
      const result: PostDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)

      return result
    }
  }

  public async findPostById(
    id: string
  ): Promise<PostDB | undefined> {
    const [postDB]: PostDB[] | undefined[] = await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .where({ id })

    return postDB
  }

  public async insertPost(
    newPostDB: PostDB
  ): Promise<void> {
    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .insert(newPostDB)
  }

  public async editPost(
    id: string, newContent: string, updateTime: string
  ): Promise<void> {
    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .update({ content: newContent, updated_at: updateTime})
      .where({ id })
  }

  public async deletePost(id: string): Promise<void> {
    await BaseDatabase
      .connection(PostDatabase.TABLE_POSTS)
      .del()
      .where({ id })
  }

}
