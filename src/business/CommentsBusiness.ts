import { CommentsDatabase } from "../database/CommentsDatabase";
import { Comments } from "../models/Comments";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { CreateCommentInputDTO, CreateCommentOutputDTO } from "../dtos/comments/createComment.dto";
import { EditCommentInputDTO, EditCommentOutputDTO } from "../dtos/comments/editComment.dto";
import { DeleteCommentInputDTO, DeleteCommentOutputDTO } from "../dtos/comments/deleteComment.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { GetCommentsFromPostInputDTO, GetCommentsFromPostOutputDTO } from "../dtos/comments/getCommentsFromPost.dto";
import { UserDatabase } from "../database/UserDatabase";
import { GetCommentsByIdInputDTO, GetCommentsByIdOutputDTO } from "../dtos/comments/getCommentsById.dto";

export class CommentsBusiness {
    constructor(
        private commentsDatabase: CommentsDatabase,
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public getCommentsFromPost = async (
        input: GetCommentsFromPostInputDTO
    ): Promise<GetCommentsFromPostOutputDTO> => {
        const { postId, token } = input;

        const payload = this.tokenManager.getPayload(token);

        if (!payload) {
            throw new BadRequestError("Token inválido");
        }

        const commentsDB = await this.commentsDatabase.getCommentsFromPost(postId);

        const comments = await Promise.all(commentsDB.map(async (commentDB) => {
            const comment = new Comments(
                commentDB.id,
                commentDB.post_id,
                commentDB.user_id,
                commentDB.content,
                commentDB.likes,
                commentDB.dislikes,
                commentDB.created_at
            );

            const findNickname = await this.userDatabase.findUserById(commentDB.user_id)

            const creatorName = findNickname?.nickname ?? "Nome Desconhecido";
            return comment.toCommentDetails(creatorName);
        }));

        const output: GetCommentsFromPostOutputDTO = comments;

        return output
    };

    public getCommentsById = async (
        input: GetCommentsByIdInputDTO
    ): Promise<GetCommentsByIdOutputDTO> => {
        const { id, token } = input;
        const payload = this.tokenManager.getPayload(token);

        if (!payload) {
            throw new BadRequestError("Token inválido");
        }

        const commentDB = await this.commentsDatabase.getCommentById(id);

        console.log(commentDB)

        if (!commentDB) {
            throw new NotFoundError("Comentário não encontrado");
        }

        const comment = new Comments(
            commentDB.id,
            commentDB.post_id,
            commentDB.user_id,
            commentDB.content,
            commentDB.likes,
            commentDB.dislikes,
            commentDB.created_at
        );

        const findNickname = await this.userDatabase.findUserById(commentDB.user_id);

        const creatorName = findNickname?.nickname ?? "Nome Desconhecido";

        const output: GetCommentsByIdOutputDTO = [comment.toCommentDetails(creatorName)];

        return output;
    }


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
        const { commentId, newContent, token } = input

        const payload = this.tokenManager.getPayload(token);

        if (!payload) {
            throw new BadRequestError("Token inválido");
        }

        const commentDB = await this.commentsDatabase.getCommentById(commentId);

        if (!commentDB) {
            throw new NotFoundError("Commentario não encontrado");
        }

        if (commentDB.user_id !== payload.id) {
            throw new BadRequestError("Você não tem permissão para editar este commentario");
        }

        const updateTime = new Date().toISOString()

        await this.commentsDatabase.editComment(commentId, newContent, updateTime)

        const output: EditCommentOutputDTO = {
            message: "Comentário editado com sucesso",
            newContent: newContent,
        };

        return output;
    }

    public deleteComment = async (
        input: DeleteCommentInputDTO
    ): Promise<DeleteCommentOutputDTO> => {
        const { commentId, token } = input

        const payload = this.tokenManager.getPayload(token);

        if (!payload) {
            throw new BadRequestError("Token inválido");
        }

        const commentDB = await this.commentsDatabase.getCommentById(commentId);

        if (!commentDB) {
            throw new NotFoundError("Comentario não encontrado");
        }

        if (commentDB.user_id !== payload.id) {
            throw new BadRequestError("Você não tem permissão para Deletar este comentario");
        }

        await this.commentsDatabase.deleteComment(commentId);


        const output: DeleteCommentOutputDTO = {
            message: "Comentário excluído com sucesso",
        };

        return output
    };

}


