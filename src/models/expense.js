class Expense {
    id = uuid()
    date = new Date().toISOString().slice(0, 10)
    constructor(
        _category = "", 
        _description = "",
        _amount = 0, 
        _currency = "USD",
        _payment_method = "Cash",
    ) {
        this.category = _category;
        this.description = _description;
        this.amount = _amount?.toFixed(2);
        this.currency = _currency;
        this.payment_method = _payment_method;
    }
}

export default Expense;