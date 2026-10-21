import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary} from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
//import '../data/backend-practice.js';

//ill just add a anonymous function
loadProducts(() => {
    //to be able to render all the html each time we update something
    renderOrderSummary();
    renderPaymentSummary();
});
