
import { BadRequestError } from "../errors/BadRequestError"
import { TokenManager } from "../services/TokenManager"
import { NotFoundError } from "../errors/NotFoundError"
import { LikeDislikeInputDTO, LikeDislikeOutputDTO } from "../dtos/likeDislike/likeDislike.dto"
import { LikeDislikeDatabase } from "../database/LikeDislikeDatabase"
import { LikeDislikeDB } from "../models/LikeDislikePost"
import { LikeDislikeCommentDB } from "../models/LikeDislikeComment"

export class LikeDislikeBusiness {
  constructor(
    private likeDislikeDatabase: LikeDislikeDatabase,
    private tokenManager: TokenManager
  ) { }

  public likeDislikePost = async (
    input: LikeDislikeInputDTO
  ): Promise<LikeDislikeOutputDTO> => {
    const { id: PostId, like, token } = input

    const likeVal: number = like ? 1 : 0

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const postDB = await this.likeDislikeDatabase.findPostById(PostId);

    if (!postDB) {
      throw new NotFoundError("Post não encontrado");
    }

    if (postDB.creator_id === payload.id) {
      throw new BadRequestError("Você não pode interagir com seu próprio post");
    }

    const {id: UserId} = payload

    const postLikeDislike: LikeDislikeDB = {
      user_id: UserId,
      post_id: PostId,
      like: likeVal
    }

    const likeDislikeDB: LikeDislikeDB = await this.likeDislikeDatabase.findLikeDislike(PostId, UserId)

    if(likeDislikeDB === undefined){
      await this.likeDislikeDatabase.insertLikeDislike(postLikeDislike)
      if(likeVal === 1){
        await this.likeDislikeDatabase.postIncreaseLike(PostId)
      }else{
        await this.likeDislikeDatabase.postIncreaseDislike(PostId)
      }
    } else{
      if(likeVal == likeDislikeDB.like){
        await this.likeDislikeDatabase.deleteLikeDislike(PostId, UserId)
        if(likeVal === 1){
          await this.likeDislikeDatabase.postDecreaseLike(PostId)
        }else{
          await this.likeDislikeDatabase.postDecreaseDislike(PostId)
        }
      }else{
        await this.likeDislikeDatabase.updateLikeDislike(postLikeDislike)
        await this.likeDislikeDatabase.postReverseLikeDislike(PostId, likeVal)
      }
    }

    const output: LikeDislikeOutputDTO = {
      message: "Interação registrada com sucesso"
    };

    return output; 
  }

  public likeDislikeComment = async (
    input: LikeDislikeInputDTO
  ): Promise<LikeDislikeOutputDTO> => {
    const { id: CommentId, like, token } = input

    const likeVal: number = like ? 1 : 0

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    const commentDB = await this.likeDislikeDatabase.findCommentById(CommentId);

    if (!commentDB) {
      throw new NotFoundError("Commentario não encontrado");
    }

    if (commentDB.user_id === payload.id) {
      throw new BadRequestError("Você não pode interagir com seu próprio comentario");
    }

    const {id: UserId} = payload

    const commentLikeDislike: LikeDislikeCommentDB = {
      user_id: UserId,
      comment_id: CommentId,
      like: likeVal
    }

    const likeDislikeDB: LikeDislikeCommentDB = await this.likeDislikeDatabase.findLikeDislikeComment(CommentId, UserId)

    if(likeDislikeDB === undefined){
      await this.likeDislikeDatabase.insertLikeDislikeComment(commentLikeDislike)
      if(likeVal === 1){
        await this.likeDislikeDatabase.postIncreaseLikeComment(CommentId)
      }else{
        await this.likeDislikeDatabase.postIncreaseDislikeComment(CommentId)
      }
    } else{
      if(likeVal == likeDislikeDB.like){
        await this.likeDislikeDatabase.deleteLikeDislikeComment(CommentId, UserId)
        if(likeVal === 1){
          await this.likeDislikeDatabase.postDecreaseLikeComment(CommentId)
        }else{
          await this.likeDislikeDatabase.postDecreaseDislikeComment(CommentId)
        }
      }else{
        await this.likeDislikeDatabase.updateLikeDislikeComment(commentLikeDislike)
        await this.likeDislikeDatabase.postReverseLikeDislikeComment(CommentId, likeVal)
      }
    }

    const output: LikeDislikeOutputDTO = {
      message: "Interação registrada com sucesso"
    };

    return output; 
  }

}