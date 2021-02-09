import express from "express"
import userSessionsRouter from "./api/v1/userSessionsRouter.js"
import usersRouter from "./api/v1/usersRouter.js"
import clientRouter from "./clientRouter.js"
import players3rdPartyRouter from "./api/v1/players3rdPartyRouter.js"
import stats3rdPartyRouter from "./api/v1/stats3rdPartyRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/", clientRouter)

rootRouter.use("/api/v1/user-sessions", userSessionsRouter)
rootRouter.use("/api/v1/users", usersRouter)
rootRouter.use("/api/v1/players3rdParty", players3rdPartyRouter)
rootRouter.use("/api/v1/stats3rdParty", stats3rdPartyRouter)

export default rootRouter
