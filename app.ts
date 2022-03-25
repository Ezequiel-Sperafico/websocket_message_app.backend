import { Application, Request, Response} from "express";
import { createServer } from "http"
import { Server } from "socket.io"
import express = require("express");

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
    "/",
    async (req: Request, res: Response) : Promise<Response> => {
        return res.status(200).send({
            message: "hello world"
        })
    }
)

const httpServer = createServer(app)
const io = new Server(httpServer)

io.on("connection", (socket) => {
    io.send(socket)
})

try {
    httpServer.listen(3000, () : void => {
        console.log('Started server succesfully on port 3000')
    })
} catch(error: any) {
    console.log('An error occurred while starting the server\nError message: ')
    console.log(error.message)
}