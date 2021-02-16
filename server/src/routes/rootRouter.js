import express from "express"
import userSessionsRouter from "./api/v1/userSessionsRouter.js"
import usersRouter from "./api/v1/usersRouter.js"
import clientRouter from "./clientRouter.js"
import playersRouter from "./api/v1/playersRouter.js"
import statsRouter from "./api/v1/statsRouter.js"
import tablesRouter from "./api/v1/tablesRouter.js"
import statsListRouter from "./api/v1/statsListRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/", clientRouter)

rootRouter.use("/api/v1/user-sessions", userSessionsRouter)
rootRouter.use("/api/v1/users", usersRouter)
rootRouter.use("/api/v1/players", playersRouter)
rootRouter.use("/api/v1/stats", statsRouter)
rootRouter.use("/api/v1/tables", tablesRouter)
rootRouter.use("/api/v1/statsList", statsListRouter)

export default rootRouter