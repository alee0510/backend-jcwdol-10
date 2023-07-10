import { ValidationError } from "yup";
import { Ticket } from "../../models/ticket.js";
import { TicketValidationSchema } from "./validation.js"
import { BAD_REQUEST } from "../../middlewares/error.handler.js"

// @create ticket
export const createTicket = async (req, res, next) => {
    try {
        const { title, description, date, location, price, stock } = req.body;

        // @validate request body
        await TicketValidationSchema.validate(req.body);

        // @check if ticket exists
        const ticketExists = await Ticket?.findOne({ where : { title } });
        if (ticketExists) throw ({ status : 400, message : "Ticket already exists" });
        
        // @archive ticket's data
        const ticket = await Ticket?.create({ title, description, date, location, price, stock });

        // @send response
        res.status(201).json({ type: "success", message: "Ticket created", data: ticket });
    } catch (error) {
        // @check if error from validation
        if (error instanceof ValidationError) {
            return next({ status: 400, message: error?.errors?.[0] })
        }
        next(error)
    }
}

// @upload ticket's poster
export const uploadPoster = async (req, res, next) => {
    try {
        const { id } = req.params;

        // @check if poster is uploaded
        if (!req.file) {
            throw new ({ status: 400, message: "Please upload an image." })
        }

        // @check if ticket exists
        const ticket = await Ticket?.findOne({ where : { id } });
        if (!ticket) throw ({ status : 400, message : BAD_REQUEST });

        // @update ticket's poster
        await Ticket?.update({ poster : req?.file?.path }, { where : { id } });

        // @send response
        res.status(200).json({ 
            type: "success", 
            message: "Ticket's poster updated", 
            imageUrl: req.file?.path 
        });
    } catch (error) {
        next(error)
    }
}

// @get all tickets
export const getAllTickets = async (req, res, next) => {
    try {
        // @get query params
        const { page, limit } = req.query;

        // @build query options
        const options = {
            offset: page > 1 ? parseInt(page - 1) * parseInt(limit) : 0,
            limit: limit ? parseInt(limit) : 10,
        }

        // @get all tickets with pagination
        const tickets = await Ticket?.findAll({ ...options });

        // @get total tickets
        const total = await Ticket?.count();

        // @get total pages
        const pages = Math.ceil(total / options.limit);

        // @send response
        res.status(200).json({ 
            type: "success", 
            message: "Tickets fetched", 
            data: {
                tickets,
                total_elements: total,
                current_page: page,
                next_page : page < pages ? parseInt(page) + 1 : null,
                total_pages : pages,
            } 
        });
    } catch (error) {
        next(error)
    }
}

// @get ticket by id
export const getTicketById = async (req, res, next) => {
    try {
        const { id } = req.params;

        // @get ticket by id
        const ticket = await Ticket?.findOne({ where : { id } });

        // @send response
        res.status(200).json({ type: "success", message: "Ticket fetched", data: ticket });
    } catch (error) {
        next(error)
    }
}

// @update ticket by id
// @update ticket's status
// @delete ticket by id