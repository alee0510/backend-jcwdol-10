import * as Yup from 'yup';

const expenseValidator = Yup.object({
    category: Yup.string().required("category is required"),
    description: Yup.string().required("description is required"),
    amount: Yup.number().min(1, "amount minimal 0").required("amount is required"),
    currency: Yup.string().required("currency is required"),
    payment_method: Yup.string().required("payment_method is required"),
})

export default expenseValidator;