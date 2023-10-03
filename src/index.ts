import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { userRouter } from './router/userRouter'
import { postRouter } from './router/postRouter'
import { likeDislikePostRouter } from './router/likeDislikePostRouter'
import { commentsRouter } from './router/commentsRouter'
import { likeDislikeCommentRouter } from './router/likeDislikeCommentRouter'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(Number(process.env.PORT) || 3003, () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`)
})

app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/posts", likeDislikePostRouter)
app.use("/comments", likeDislikeCommentRouter)
app.use("/comments", commentsRouter)
