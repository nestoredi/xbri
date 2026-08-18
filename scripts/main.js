document.addEventListener("DOMContentLoaded", () => {
  // Inicializar Carrusel 3D en Home si existe
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".carousel-dot");
  
  if (slides.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove("active"));
      dots.forEach(dot => dot.classList.remove("active"));
      
      slides[index].classList.add("active");
      dots[index].classList.add("active");
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    }

    let slideInterval = setInterval(nextSlide, 6000);

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        clearInterval(slideInterval);
        currentSlide = index;
        showSlide(currentSlide);
        slideInterval = setInterval(nextSlide, 6000);
      });
    });
  }

  // Carga y renderizado dinámico de productos desde JSON
  const productsGrid = document.getElementById("products-grid");
  if (productsGrid) {
    fetch("scripts/productos.json")
      .then(response => response.json())
      .then(data => {
        renderProducts(data.productos);
        
        // Configurar filtros
        const filterBtns = document.querySelectorAll(".filter-btn");
        filterBtns.forEach(btn => {
          btn.addEventListener("click", (e) => {
            filterBtns.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            
            const category = e.target.getAttribute("data-filter");
            if (category === "todos") {
              renderProducts(data.productos);
            } else {
              const filtered = data.productos.filter(p => p.categoria === category);
              renderProducts(filtered);
            }
          });
        });
      })
      .catch(error => console.error("Error al cargar el JSON de productos:", error));
  }

  function renderProducts(productos) {
    if (!productsGrid) return;
    productsGrid.innerHTML = "";
    
    productos.forEach(producto => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div>
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <h4>${producto.nombre}</h4>
          <p class="specs">Medida: ${producto.medida}</p>
          <p>${producto.descripcion}</p>
        </div>
        <div>
          <div class="price">${producto.precio}</div>
          <a href="contacto.html" class="btn" style="padding: 8px 16px; font-size: 0.85rem; width: 100%; text-align: center;">Consultar Stock</a>
        </div>
      `;
      productsGrid.appendChild(card);
    });
  }
});