//import {cart, calculateCartQuantity} from '../../data/cart.js';
import {cart} from '../../data/cart-class.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import { addOrder } from '../../data/orders.js';

//all the code will be inside one function so I can regenerate it again
export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.cartItems.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
        
    });

    const totalbeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalbeforeTaxCents * 0.1;
    const totalCents = totalbeforeTaxCents + taxCents;

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${cart.calculateCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalbeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
            Place your order
        </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

    document.querySelector('.js-place-order')
        .addEventListener('click', async () => {
            try{
                //async await so that it waits for the fetch to get a response from the backend
                //if we want to use another type of request instead of get we use the second paramether an object with the request info 
                const response = await fetch('https://supersimplebackend.dev/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    //we cant send an object so we transform it into JSON
                    body: JSON.stringify({
                        cart: cart
                    })
                });
                //this is also a promise so we can use await here too
                //remember that we use .json to get the data from the response
                const order = await response.json()
                addOrder(order);//we add the order

            }catch(error){
                console.log('Unexpected error. Try again later.');
            }

            //an especial object provided by javascript and it lets us control the url at the top of the browser
            window.location.href = 'orders.html';
        });
}