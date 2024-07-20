document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');

    const productos = [
        {
            nombre: 'Squeare Up-Album-BLACKPINK',
            descripcion: 'Square Up Album completo, incluye photocards.',
            precio: 's/250.00',
            imagen: 'images/producto1.jpg',
            enlace: 'productos/producto1.html'
        },
        {
            nombre: 'Lightick BLACKPINK vr.2',
            descripcion: 'Lightick BLACKPINK vr.2 bluetooth conexion.',
            precio: 's/250.00',
            imagen: 'images/producto2.jpg',
            enlace: 'productos/producto2.html'
        },
        {
            nombre: 'BLACKPINK - THE GAME OST THE GIRLS',
            descripcion: 'BLACKPINK - THE GAME OST THE GIRLS ver. STELLA',
            precio: 's/250.00',
            imagen: 'images/producto3.jpg',
            enlace: 'productos/producto3.html'
        },
        {
            nombre: 'BLACKPINK - Cereal',
            descripcion: 'BLACKPINK - DEBUT ANNIVERSARY CEREAL DECO KIT 2023',
            precio: 's/250.00',
            imagen: 'images/producto4.jpg',
            enlace: 'productos/producto4.html'
        },
        {
            nombre: "(G)I-DLE Lightick",
            descripcion: "(G)I-DLE Lightick incluye photocards.",
            precio: "s/250.00",
            imagen: "images/Gproducto1.jpg",
            enlace: "productos/Gproducto1.html"
        },
        {
            nombre: "(G)I-DLE - YUQI Album",
            descripcion: "(G)I-DLE - YUQI - YUQ1 ver. Special",
            precio: "s/120.00",
            imagen: "images/Gproducto2.jpg",
            enlace: "productos/Gproducto2.html"
        },
        {
            nombre: "(G)I-DLE - I love",
            descripcion: "(G)I-DLE - I love - Album",
            precio: "S/95.00",
            imagen: "images/Gproducto3.jpg",
            enlace: "productos/Gproducto3.html"
        },
        {
            nombre: "(G)I-DLE Photocards",
            descripcion: "(G)I-DLE Paquete de fotos 55 piezas Gidle",
            precio: "s/32.00",
            imagen: "images/Gproducto4.jpg",
            enlace: "productos/Gproducto4.html"
        },
        {
            nombre: "TWICE - Lightick",
            descripcion: "TWICE - Lightstick CANDYBONG INFINITY",
            precio: "s/299.00",
            imagen: "images/Tproducto1.jpg",
            enlace: "productos/Tproducto1.html"
        },
        {
            nombre: "TWICE NEWS ROOM",
            descripcion: "TWICE SEASON’S GREETINGS (TWICE NEWS ROOM) 2024",
            precio: "s/249.00",
            imagen: "images/Tproducto2.jpg",
            enlace: "productos/Tproducto2.html"
        },
        {
            nombre: "TWICE - WHAT IS LOVE?",
            descripcion: "TWICE - WHAT IS LOVE? - Album",
            precio: "s/119.00",
            imagen: "images/Tproducto3.jpg",
            enlace: "productos/Tproducto3.html"
        },
        {
            nombre: "IM NAYEON - Album",
            descripcion: "TWICE: NAYEON - IM NAYEON",
            precio: "s/120.00",
            imagen: "images/Tproducto4.jpg",
            enlace: "productos/Tproducto4.html"
        }
    ];

    const params = new URLSearchParams(window.location.search);
    const query = params.get('query')?.toLowerCase();

    const resultados = productos.filter(producto => producto.nombre.toLowerCase().includes(query));

    resultados.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('product');

        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
            <h2 class="product-title">${producto.nombre}</h2>
            <p class="product-description">${producto.descripcion}</p>
            <p class="product-price">${producto.precio}</p>
            <a href="${producto.enlace}" class="product-link">Ver más</a>
        `;

        productList.appendChild(productoDiv);
    });
});
