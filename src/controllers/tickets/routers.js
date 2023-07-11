import { Router } from "express"
import { createUploader, createCloudinaryStorage } from "../../helpers/uploader.js"
import { verifyAdmin } from "../../middlewares/index.js"

// @import controllers
import * as TicketController from "./index.js"

// @define router
const routes = new Router()

// @setup uploader
const storage = createCloudinaryStorage("tickets")
const uploader = createUploader(storage)

// @routes
routes.post("/", verifyAdmin, TicketController.createTicket)
routes.patch("/:id/upload", verifyAdmin, uploader.single("file"), TicketController.uploadPoster)
routes.get("/", verifyAdmin, TicketController.getAllTickets)
routes.get("/:id", verifyAdmin, TicketController.getTicketById)
routes.post("/create-with-poster", uploader.single("data"), TicketController.createTicketWithPoster)

// @export router
export default routes