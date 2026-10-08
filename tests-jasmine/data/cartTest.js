import {addToCart, cart, loadFromStorage} from "../../data/cart.js";

describe('test suite: addToCart', () => {
    //had to add this select cuz i had added a way to add more items to the cart before using the selected quantity in amazon.html
    document.body.innerHTML += `
        <select class = "js-quantity-selector-bc2847e9-5323-403f-b7cf-57fde044a955">
            <option selected value="1">1</option>
            <option value="2">2</option>
        </select>
    `;

    it('adds an existing product to the cart', () => {
        //we also have to mock setItem so because its just for this tets
        spyOn(localStorage, 'setItem');

        //to replace the local storage with a fake with an empty []
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'bc2847e9-5323-403f-b7cf-57fde044a955',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        //we load from storage again with the local storage being the empty array now
        loadFromStorage();
        addToCart('bc2847e9-5323-403f-b7cf-57fde044a955');
        expect(cart.length).toEqual(1);
        //to check how many times the function setItem was called above
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        //more expects to practice
        expect(cart[0].productId).toEqual('bc2847e9-5323-403f-b7cf-57fde044a955');
        expect(cart[0].quantity).toEqual(2);
    });


    //had to add this select cuz i had added a way to add more items to the cart before using the selected quantity in amazon.html
    document.body.innerHTML += `
        <select class = "js-quantity-selector-bc2847e9-5323-403f-b7cf-57fde044a955">
            <option selected value="1">1</option>
            <option value="2">2</option>
        </select>
    `;
    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'setItem');

        //to replace the local storage with a fake with an empty []
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        //we load from storage again with the local storage being the empty array now
        loadFromStorage();
        addToCart('bc2847e9-5323-403f-b7cf-57fde044a955');
        expect(cart.length).toEqual(1);
        //to check how many times the function setItem was called above
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        //more expects to practice
        expect(cart[0].productId).toEqual('bc2847e9-5323-403f-b7cf-57fde044a955');
        expect(cart[0].quantity).toEqual(1);
    });
});


