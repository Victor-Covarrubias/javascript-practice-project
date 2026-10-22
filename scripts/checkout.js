import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary} from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart-class.js";
//import '../data/backend-practice.js';

//better way to wait for asynchronous code
Promise.all([
    new Promise((resolve) => {
        //this inner function runs immediately
        loadProducts(() => {
            //resolve controls when to go to the next step
            resolve('value1');
        });
    }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve('value2');
        });
    })

]).then((values) => {
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
});

/*
//to practice promises, the inner function has a parameter resolve which is a function like done from jasmines
new Promise((resolve) => {
    //this inner function runs immediately
    loadProducts(() => {
        //resolve controls when to go to the next step
        resolve('value1');
    });

}).then((value) => {
    console.log(value);
    //console.log('next step');
    //to make a new resolve function so therer is a wait in the next step
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

    //we can keep adding more steps with then and this helsp to avoid nesting callback functions
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
//Ill just add a anonymous function
loadProducts(() => {
    //to be able to render all the html each time we update something
    renderOrderSummary();
    renderPaymentSummary();
});
*/
