document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del DOM
    const cartButton = document.querySelector('.container-icon'); // Botón de carrito en la barra de navegación
    const cartList = document.getElementById('cart-list'); // Contenedor de la lista de productos en el carrito
    const cartItems = document.getElementById('cart-items'); // Lista de elementos individuales del carrito
    const proceedButton = document.getElementById('proceed-button'); // Botón de proceder al pago

    // Ocultar la lista de carrito al cargar la página
    if (cartList) {
        cartList.style.display = 'none';
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

    // Manejar la adición de productos al carrito desde el formulario de compra
    const purchaseForm = document.querySelector('.purchase-form');
    if (purchaseForm) {
        purchaseForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Obtener información del producto desde el formulario
            const productNameElement = document.querySelector('.product-info h2'); // Nombre del producto
            const quantityElement = document.getElementById('quantity'); // Cantidad seleccionada
            const priceElement = document.getElementById('product-price'); // Precio del producto

            if (productNameElement && quantityElement && priceElement) {
                const productName = productNameElement.textContent; // Nombre del producto
                const quantity = parseInt(quantityElement.value, 10); // Cantidad seleccionada
                const price = parseFloat(priceElement.getAttribute('data-price')); // Precio del producto

                // Crear texto descriptivo del artículo y agregarlo al carrito visualmente
                const itemText = `${quantity} x ${productName} - $${price}`;
                const li = createCartItem(itemText, quantity, price);
                if (cartItems) {
                    cartItems.appendChild(li); // Agregar el artículo al carrito visualmente
                }

                // Guardar el carrito en localStorage
                saveCart();

                // Mostrar la lista de carrito después de añadir un producto
                if (cartList) {
                    cartList.style.display = 'block';
                }
            }
        });
    }

    // Manejar el clic en el botón "Proceder al pago"
    if (proceedButton) {
        proceedButton.addEventListener('click', (event) => {
            if (cartItems.children.length === 0) {
                event.preventDefault();
                alert('No hay productos en el carrito. Añade productos antes de proceder al pago.');
            } else {
                window.location.href = 'productos/comprar.html';
                window.location.href = '../productos/comprar.html';
            }
        });
    }

    // Función para guardar el carrito se mantenga en diferentes paginas
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

    // Función para cargar el carrito desde localStorage
    function loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const cartItemsArray = JSON.parse(savedCart);
            cartItemsArray.forEach(item => {
                // Crear texto descriptivo del artículo y agregarlo al carrito visualmente
                const itemText = `${item.quantity} x ${item.productName} - $${item.price}`;
                const li = createCartItem(itemText, item.quantity, item.price);
                if (cartItems) {
                    cartItems.appendChild(li); // Agregar el artículo al carrito visualmente
                }
            });
        }
    }

    // Función para crear un elemento de carrito con botón de eliminar
    function createCartItem(itemText, quantity, price) {
        const li = document.createElement('li');
        li.textContent = itemText; // Texto descriptivo del artículo

        // Crear el botón "Eliminar"
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            li.remove(); // Eliminar el elemento del carrito visual
            saveCart(); // Actualizar el carrito en localStorage
        });

        // Agregar el botón "Eliminar" al elemento de lista de carrito
        li.appendChild(deleteButton);

        return li;
    }
});
