import * as Yup from "yup"

export const TicketValidationSchema = Yup.object({
    title : Yup.string().required("Title is required"),
    description : Yup.string(),
    date : Yup.date().required("Date is required"),
    location : Yup.string().required("Location is required"),
    price : Yup.number().required("Price is required"),
    stock : Yup.number().required("Stock is required"),
})