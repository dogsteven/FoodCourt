export default class {
    /**
     * @param {string} id 
     * @param {string} vendorID 
     * @param {string} name 
     * @param {number} price 
     * @param {number} quantity 
     * @param {string[]} state 
     * @param {string} description 
     * @param {string} photo 
     * @param {number} rating
     * @param {number} ratingTimes
     */
    constructor(id, vendorID, name, price, quantity, state, description, photo, rating, ratingTimes) {
        this.id = id
        this.vendorID = vendorID
        this.name = name
        this.price = price
        this.quantity = quantity
        this.state = state
        this.description = description
        this.photo = photo
        this.rating = rating
        this.ratingTimes = ratingTimes
    }
}