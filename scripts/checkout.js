import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary} from "./checkout/paymentSummary.js";
import '../data/cart-oop.js';

//to be able to render all the html each time we update something
renderOrderSummary();
renderPaymentSummary();