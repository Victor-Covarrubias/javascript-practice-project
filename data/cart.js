//we need to export the variable so that a module can access it
export const cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 2
}];

export function addToCart(productId){
	let matchingItem;
		
	cart.forEach((cartItem) => {
		if(productId === cartItem.productId){
			matchingItem = cartItem;
		}
	});

	//we get the select
	const quantitySelector = document.querySelector(
		`.js-quantity-selector-${productId}`
	);

	console.log(quantitySelector);
	//we get the selected value in the select
	//const quantity = quantitySelector.value; but we need it as a number
	const quantity = Number(quantitySelector.value);

	if (matchingItem){
		matchingItem.quantity += quantity;
	} else{
		cart.push({
			productId,
			quantity
		});
	}
}