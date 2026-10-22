import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
//import {loadFromStorage, cart} from "../../data/cart.js";
import {cart} from '../../data/cart-class.js';
import { loadProducts, loadProductsFetch } from '../../data/products.js';

describe('test suite: renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    //done is another function provided by jasmine
    beforeAll((done) => {
        loadProductsFetch().then(() => {
            done();
        });
    });

    //to create a hook to run soemthing in each test in this case its before each of the its
    beforeEach(() => {
        //to mock the way we modify the local storage so the test doesnt affect the real storage
        spyOn(localStorage, 'setItem');
        //this part adds a container with the classes that the tested parts use so the jasmin test can acces them
        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-return-to-home-link"></div>
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
        `;

        //to replace the local storage with a fake with an empty []
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: productId2,
                quantity: 2,
                deliveryOptionId: '2'
            }]);
        });
        //we load from storage again with the local storage being the empty array now
        //cart.loadFromStorage();

        renderOrderSummary();
    });

    afterEach(() => {
        //to remove the html used for the test
        document.querySelector('.js-test-container').innerHTML = '';
    });

    

    it('removes a product', () => {
        //to click an element using code we can just get it using the dom and then use the method click
        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
        //to check the opposite we use not
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
        expect(cart.cartItems.length).toEqual(1);
        //to check if the first product in the cart is the second one since the first one was deleted
        expect(cart.cartItems[0].productId).toEqual(productId2);
    });
});