import OrderItem from './order-item'

export default class {
    constructor(id, customerID, orderItems) {
        this.id = id
        this.customerID = customerID
        this.orderItems = orderItems
    }
}