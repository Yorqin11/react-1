document.addEventListener('DOMContentLoaded', function() {
  // Initialize storage for favorites
  if (!localStorage.getItem('favorites')) {
      localStorage.setItem('favorites', JSON.stringify([]));
  }
  if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
  }

  // Handle favorite buttons
  const heartButtons = document.querySelectorAll('.heart-button');
  heartButtons.forEach(button => {
      const productCard = button.closest('div[class*="rounded-xl"]');
      const productName = productCard.querySelector('h2').textContent;
      const favorites = JSON.parse(localStorage.getItem('favorites'));

      // Check if product is already favorited
      if (favorites.includes(productName)) {
          button.classList.add('active');
          button.querySelector('svg').setAttribute('fill', '#EF4444');
          button.querySelector('svg').classList.remove('text-gray-400');
          button.querySelector('svg').classList.add('text-red-500');
      }

      // Add click event
      button.addEventListener('click', function() {
          const favorites = JSON.parse(localStorage.getItem('favorites'));
          const svg = this.querySelector('svg');
          
          if (this.classList.contains('active')) {
              // Remove from favorites
              const index = favorites.indexOf(productName);
              if (index > -1) {
                  favorites.splice(index, 1);
              }
              this.classList.remove('active');
              svg.setAttribute('fill', 'none');
              svg.classList.remove('text-red-500');
              svg.classList.add('text-gray-400');
          } else {
              // Add to favorites
              favorites.push(productName);
              this.classList.add('active');
              svg.setAttribute('fill', '#EF4444');
              svg.classList.remove('text-gray-400');
              svg.classList.add('text-red-500');
          }
          
          localStorage.setItem('favorites', JSON.stringify(favorites));
      });
  });

  // Handle add to cart buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
          const productCard = this.closest('div[class*="rounded-xl"]');
          const productName = productCard.querySelector('h2').textContent;
          const productPrice = productCard.querySelector('p.text-sm').textContent;
          const productImage = productCard.querySelector('img').src;
          
          // Get the button's background color
          const buttonBgColor = window.getComputedStyle(this).backgroundColor;
          
          // Create product object
          const product = {
              name: productName,
              price: productPrice,
              image: productImage,
              buttonColor: buttonBgColor,
              quantity: 1
          };
          
          // Add to cart
          addToCart(product);
          
          // Visual feedback
          const originalText = this.innerHTML;
          this.innerHTML = 'Added!';
          this.style.backgroundColor = '#10B981';
          
          setTimeout(() => {
              this.innerHTML = originalText;
              this.style.backgroundColor = buttonBgColor;
          }, 1000);
      });
  });
});

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('cart'));
  
  // Check if product already exists in cart
  const existingProductIndex = cart.findIndex(p => p.name === product.name);
  
  if (existingProductIndex !== -1) {
      // If product exists, increase quantity
      cart[existingProductIndex].quantity += 1;
  } else {
      // If product doesn't exist, add it to cart
      cart.push(product);
  }
  
  // Save updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}