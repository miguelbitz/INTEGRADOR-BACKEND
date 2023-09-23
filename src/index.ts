import express from 'express'
import cors from 'cors'
import { userRouter } from './router/userRouter'
import { postRouter } from './router/postRouter'
import { likeDislikePostRouter } from './router/likeDislikePostRouter'
import { commentsRouter } from './router/commentsRouter'
import { likeDislikeCommentRouter } from './router/likeDislikeCommentRouter'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/posts", likeDislikePostRouter)
app.use("/comments", likeDislikeCommentRouter)
app.use("/comments", commentsRouter)
