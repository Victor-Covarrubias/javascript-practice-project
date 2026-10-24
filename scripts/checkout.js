import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary} from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart-class.js";
//import '../data/backend-practice.js';

//another way to make a function wait, async makes a function return a promise
async function loadPage(){
    //try/catch can be used with synchronous code aswell
    try{
        //we can create errors ourselfs with throw
        //throw 'error1';

        /*
        runing a function that returns a promise
        await lets us write asynchronous code like normal code
        we can only use await inside a async function
        it also can just be used with promises so u cant use it with callbacks
        */
        await loadProductsFetch();

        //by using await we dont need to use then to go to the next step
        await new Promise((resolve, reject) => {
            //we can also create errors inside promises like this
            //throw 'error2';
            loadCart(() => {
                //we can also create an error asynchronously in the future (after the function in the promises ends) unlike with throw
                //reject('error3');
                resolve();
            });
        });

    }catch(error){
        console.log('Unexpected error. Please try again later.');
    }

    renderOrderSummary();
    renderPaymentSummary();

    //we can pass parameters to the next step aswell
    //return 'value2';
}
//because it returns a promise we can add mroe steps
//loadPage().then((value) => {
//    console.log('next step');
//    console.log(value);
//});
loadPage();

/*
//better way to wait for asynchronous code
Promise.all([
    //we use use the function as it is since its already a promise
    loadProductsFetch(),
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
*/

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
