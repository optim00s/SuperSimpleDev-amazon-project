let productsHTML = '';

// accumulator pattern
products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <!-- toFixed() convert a number into a string --->
          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
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

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}"
          >
            Add to Cart
          </button>
        </div>    
    `;
});

const productsGridElement = document.querySelector('.js-products-grid');
productsGridElement.innerHTML = productsHTML; 

//initialize timeout storage for unique productId and timeoutId property-value pair
const addedMessageTimeouts = {};

document.querySelectorAll('.js-add-to-cart')
    .forEach((buttonElement) => {
        buttonElement.addEventListener('click', () => {
            // destructure the productId 
            const { productId } = buttonElement.dataset;

            let matchingItem;

            // get select element value associated with this productId and convert value to a number
            const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
            const quantity = Number(quantitySelector.value);  

            // check if the product already exists 
            cart.forEach((item) => {
                if (productId === item.productId) {
                    // if a matching item is found, assign it to matchingItem
                    matchingItem = item;
                }
            });

            // if the item is already in the cart update its quantity
            if (matchingItem) {
                matchingItem.quantity += quantity;
            } else {
                // create new item object in cart array
                cart.push({
                  productId,
                  quantity 
                });    
            }

            let cartQuantity = 0;

            cart.forEach((item) => {
                cartQuantity += item.quantity;
            });

            document.querySelector('.js-cart-quantity')
                .innerHTML = cartQuantity;

            // show 'added' message
            const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
            addedMessage.classList.add('show-added-message');

            // check previous timeout is aviable and if there is we delete 
            const previousTimeoutId = addedMessageTimeouts[productId];
            if(previousTimeoutId) {
              clearTimeout(previousTimeoutId);
            }

            const timeoutId = addedMessageTimeouts[productId] = setTimeout(() => {
              addedMessage.classList.remove('show-added-message');
            }, 2000);

            // save productId property with timeoutId value
            addedMessageTimeouts[productId] = timeoutId;     
        });
    });