import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import history from "connect-history-api-fallback"
import express from "express"

import authRouter from "./routers/auth-router"
import adminRouter from "./routers/admin-router"
import bookingRouter from "./routers/booking-router";

const app = express()

app.use(bodyParser.json())
app.use(cookieParser())

app.use(authRouter)
app.use(adminRouter)
app.use(bookingRouter)

app.use(history())
app.use(express.static("dist-frontend"))

app.use((_, res) => {
    res.setHeader("Content-Type", "text/plain")
    res.status(404).send("Ops... Pagina non trovata")
})

const port = 3000
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
