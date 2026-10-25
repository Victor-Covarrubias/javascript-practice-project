//if there is nothing in local storage it'll be an empty array
export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    //unshift is used to add something to the front of the array instead of the back
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}