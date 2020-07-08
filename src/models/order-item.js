import CartItem from './cart-item'

export default class {
    /**
     * 
     * @param {string} id 
     * @param {string} vendorID 
     * @param {cartItem} cartItems 
     */
    constructor(id, vendorID, cartItems) {
        this.id = id
        this.vendorID = vendorID
        this.cartItems = cartItems
    }
}