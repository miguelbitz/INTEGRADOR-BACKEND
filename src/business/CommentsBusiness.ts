import { CommentsDatabase } from "../database/CommentsDatabase"; // Importe a classe CommentDatabase apropriada
import { Comments } from "../models/Comments";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { CreateCommentInputDTO, CreateCommentOutputDTO } from "../dtos/comments/createComment.dto";
import { EditCommentInputDTO, EditCommentOutputDTO } from "../dtos/comments/editComment.dto";
import { DeleteCommentInputDTO, DeleteCommentOutputDTO } from "../dtos/comments/deleteComment.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { GetCommentsForPostInputDTO, GetCommentsForPostOutputDTO } from "../dtos/comments/getCommentsDorPost.dto";

export class CommentsBusiness {
    constructor(
        private commentsDatabase: CommentsDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public getCommentsForPost = async (
        input: GetCommentsForPostInputDTO
    ): Promise<GetCommentsForPostOutputDTO[]> => {
        const { postId, token } = input;
    
        const payload = this.tokenManager.getPayload(token);
    
        if (!payload) {
            throw new BadRequestError("Token inválido");
        }
    
        // if (payload.role !== USER_ROLES.ADMIN) {
        //     throw new BadRequestError("Somente admins podem acessar esse recurso");
        // }
    
        const postExists = await this.commentsDatabase.findCommentById(postId);
    
        if (!postExists) {
            throw new NotFoundError("Post não encontrado");
        }
    
        // Obtenha os comentários para o post
        const comments = await this.commentsDatabase.getCommentsForPost(postId);
    
        // Mapeie os comentários para o formato de saída desejado
        const output: GetCommentsForPostOutputDTO[] = comments.map((comment) => ({
            postId: comment.post_id,
            content: comment.content,
        }));
    
        return output;
    };
    

    public createComment = async (
        input: CreateCommentInputDTO
    ): Promise<CreateCommentOutputDTO> => {
        const { postId, content, token } = input;
        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token inválido");
        }

        const commentId = this.idGenerator.generate();

        const userId = payload.id ?? "Id Desconhecido";

        const newComment = new Comments(
            commentId,
            postId,
            userId,
            content,
            0,
            0,
            new Date().toISOString()
        );

        await this.commentsDatabase.insertComment(newComment.toDBModel());

        const output: CreateCommentOutputDTO = {
            message: "Comentário publicado com sucesso",
            content: content,
        };

        return output;
    };

    public editComment = async (
        input: EditCommentInputDTO
    ): Promise<EditCommentOutputDTO> => {
        const { commentId, newContent, token } = input;

        const existingComment = await this.commentsDatabase.findCommentById(commentId);

        if (!existingComment) {
            throw new NotFoundError("Comentário não encontrado");
        }

        existingComment.content = newContent;
        await this.commentsDatabase.updateComment(existingComment);

        const output: EditCommentOutputDTO = {
            message: "Comentário editado com sucesso",
            newContent: newContent,
        };

        return output;
    };

    public deleteComment = async (
        input: DeleteCommentInputDTO
    ): Promise<DeleteCommentOutputDTO> => {
        const { commentId, token } = input

        const existingComment = await this.commentsDatabase.findCommentById(commentId);

        if (!existingComment) {
            throw new NotFoundError("Comentário não encontrado")
        }


        const output: DeleteCommentOutputDTO = {
            message: "Comentário excluído com sucesso",
        };

        return output
    };

}


