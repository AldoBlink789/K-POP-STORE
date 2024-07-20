document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById('search-input');
    const searchForm = document.getElementById('search-form');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío del formulario

        const query = searchInput.value.trim();
        if (query) {
            // Redirige a la página de resultados con la consulta en la URL
            window.location.href = `resultados.html?query=${encodeURIComponent(query)}`;
        }
    });
});
