document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del DOM
    const cartButton = document.querySelector('.container-icon'); // Botón de carrito en la barra de navegación
    const cartList = document.getElementById('cart-list'); // Contenedor de la lista de productos en el carrito
    const cartItems = document.getElementById('cart-items'); // Lista de elementos individuales del carrito
    const purchaseForm = document.querySelector('.purchase-form'); // Formulario de compra en la página de pago
    const purchaseList = document.getElementById('purchase-list'); // Lista de productos seleccionados para la compra
    const totalPriceElement = document.getElementById('total-price'); // Elemento que muestra el precio total
    const redirectButton = document.getElementById('redirect-button'); // Botón de redirección

    // Ocultar la lista de carrito al cargar la página
    if (cartList) {
        cartList.style.display = 'none';
    }

    // Ocultar el botón de redirección al cargar la página
    if (redirectButton) {
        redirectButton.style.display = 'none';
    }

    // Cargar el carrito almacenado en localStorage al iniciar la página
    loadCart();

    // Mostrar u ocultar la lista de carrito al hacer clic en el botón de carrito
    if (cartButton) {
        cartButton.addEventListener('click', () => {
            if (cartList) {
                cartList.style.display = cartList.style.display === 'block' ? 'none' : 'block';
            }
        });
    }

    // Manejar el envío del formulario de compra
    if (purchaseForm) {
        purchaseForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Obtener valores del formulario de compra
            const nombre = document.getElementById('nombre').value; // Nombre del comprador
            const telefono = document.getElementById('telefono').value; // Teléfono del comprador
            const correo = document.getElementById('correo').value; // Correo electrónico del comprador
            const tarjeta = document.getElementById('tarjeta').value; // Número de tarjeta del comprador

            // Obtener y mostrar los productos añadidos al carrito
            const cartItemsArray = JSON.parse(localStorage.getItem('cart')) || [];

            // Limpiar la lista de productos previos en el formulario de compra
            if (purchaseList) {
                purchaseList.innerHTML = '';
                cartItemsArray.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = `${item.quantity} x ${item.productName} - $${item.price}`;
                    purchaseList.appendChild(li);
                });
            }

            // Mostrar los detalles completos de la compra realizada
            const purchaseDetails = document.getElementById('purchase-details');
            if (purchaseDetails) {
                purchaseDetails.innerHTML = `
                    <h2>Detalles de la Compra</h2>
                    <p>Nombre: ${nombre}</p>
                    <p>Teléfono: ${telefono}</p>
                    <p>Correo electrónico: ${correo}</p>
                    <p>Número de tarjeta: ${tarjeta}</p>
                    <h3>Productos:</h3>
                    <ul>${purchaseList.innerHTML}</ul>
                    <p>Total: $${calculateTotalPrice(cartItemsArray)}</p>
                `;
            }

            // Mostrar la lista de carrito después de realizar la compra
            if (cartList) {
                cartList.style.display = 'block';
            }

            // Limpiar el carrito almacenado en localStorage después de la compra
            localStorage.removeItem('cart');
            if (cartItems) {
                cartItems.innerHTML = ''; // Limpiar visualmente la lista de carrito
            }

            if (totalPriceElement) {
                totalPriceElement.textContent = `Total: $${calculateTotalPrice(cartItemsArray)}`;
            }
        });
    }

    // Función para cargar los productos del carrito desde localStorage
    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const cartItemsArray = JSON.parse(savedCart);
            cartItemsArray.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.quantity} x ${item.productName} - $${item.price}`;
                if (cartItems) {
                    cartItems.appendChild(li); // Mostrar visualmente los productos del carrito
                }
            });
            if (totalPriceElement) {
                totalPriceElement.textContent = `Total: $${calculateTotalPrice(cartItemsArray)}`;
            }
        }
    }

    // Función para calcular el precio total del carrito
    function calculateTotalPrice(cartItemsArray) {
        return cartItemsArray.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2);
    }

    // Función para guardar el carrito actualizado en localStorage
    function saveCart() {
        const items = [];
        cartItems.querySelectorAll('li').forEach(item => {
            const [quantity, productNameWithPrice] = item.textContent.split(' x ');
            const [productName, price] = productNameWithPrice.split(' - $');
            items.push({
                quantity: parseInt(quantity),
                productName: productName.trim(),
                price: parseFloat(price)
            });
        });
        localStorage.setItem('cart', JSON.stringify(items));
    }
});
