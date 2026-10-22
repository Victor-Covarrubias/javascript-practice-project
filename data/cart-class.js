//we use pascal case for things that generate objects
class Cart {
    //property and value, cartItems = undefined;
    cartItems;
    //to make a property private we just add a hash instead of typing private
    #localStorageKey;

    //to add the contructor of the class
    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        //moved all the cart loading from the local storage to a function
        this.#loadFromStorage();
    }

    //we can also make a private method
    #loadFromStorage(){
        //instead of using cart.cartItems we use this so there is no problem in case the name of the object changes
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

        //the JSON parse will give a null if its empty so we give a default value
        if (!this.cartItems){
            this.cartItems = [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 2,
                deliveryOptionId: '2'
            }];
        }
    }

    saveToStorage(){
        //convert the cart into a string to save it in the local storage
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId){
        let matchingItem;
            
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId){
                matchingItem = cartItem;
            }
        });

        
        //we get the select
        const quantitySelector = document.querySelector(
            `.js-quantity-selector-${productId}`
        );

        //we get the selected value in the select
        //const quantity = quantitySelector.value; but we need it as a number
        const quantity = Number(quantitySelector.value);

        
        if (matchingItem){
            matchingItem.quantity += quantity;
        } else{
            this.cartItems.push({
                productId,
                quantity,
                deliveryOptionId: '1'
            });
        }
    
        this.saveToStorage();
    }

    removeFromCart(productId){
        const newCart = [];

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId){
                newCart.push(cartItem);
            }
        });

        this.cartItems = newCart;

        this.saveToStorage();
    }

    calculateCartQuantity(){
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem) => {
            cartQuantity +=cartItem.quantity;
        });

        return cartQuantity;
    }

    updateDeliveryOption(productId, deliveryOptionId){
        let matchingItem;
            
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId){
                matchingItem = cartItem;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();
    }
}

//creating instances of the class, the contructor gets the parameters
export const cart = new Cart('cart');

//to practice adding more steps in promises
export function loadCart(fun){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();
}