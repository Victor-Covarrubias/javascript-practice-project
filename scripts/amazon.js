//import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import {cart} from '../data/cart-class.js';
//import * as cartModule from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

//to load the products, i added a render function so it renders the html after we receive the response
loadProducts(renderProductsGrid);

function renderProductsGrid(){
	let productsHTML = '';

	products.forEach((product) => {
		productsHTML += `
			<div class="product-container">
				<div class="product-image-container">
					<img
						class="product-image"
						src="${product.image}"
					/>
				</div>

				<div class="product-name limit-text-to-2-lines">
					${product.name}
				</div>

				<div class="product-rating-container">
					<img
						class="product-rating-stars"
						src="${product.getStarsUrl()}"
					/>
					<div class="product-rating-count link-primary">${product.rating.count}</div>
				</div>

				<div class="product-price">${product.getPrice()}</div>

				<div class="product-quantity-container">
					<select class = "js-quantity-selector-${product.id}">
						<option selected value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
						<option value="10">10</option>
					</select>
				</div>

				<!-- Example of polymorphism (using a method without knowing the class)-->
				${product.extraInfoHTML()}

				<div class="product-spacer"></div>

				<div class="added-to-cart">
					<img src="images/icons/checkmark.png" />
					Added
				</div>

				<button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}">Add to Cart</button>
			</div>
		`;
	})

	//we insert the list of divs inside the grid of products
	document.querySelector('.js-products-grid').innerHTML = productsHTML;

	function updateCartQuantity(){
		document.querySelector('.js-cart-quantity').innerHTML = cart.calculateCartQuantity();
	}

	document.querySelectorAll('.js-add-to-cart').forEach((button) => {
		button.addEventListener('click', () => {
			//we used a data atribute to identify the product inside the button
			const productId =  button.dataset.productId;

			cart.addToCart(productId);
			updateCartQuantity();
		});
	})
}