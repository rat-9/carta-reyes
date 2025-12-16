import './style.css'

// --- 🎁 TUS REGALOS (Edita esto) 🎁 ---
// Las imagenes deben estar en la carpeta /public/img/
const wishlist = [
  {
    name: "Brazo de Pared para Portatil",
    price: "59'99€",
    img: "/img/regalo1.jpg", // Asegúrate de que el nombre coincide con tu archivo
    link: "https://amzn.eu/d/f5IfOLn"
  },
  {
    name: "Spotify Premium - 6 meses",
    price: "66€",
    img: "/img/regalo2.jpg",
    link: "https://www.game.es/SPOTIFY/MONEDERO-DIGITAL/PREPAGOS/CODIGO-SPOTIFY-DIGITAL-6-MESES/249057"
  },
  {
    name: "Dinero Dinerete",
    price: "€€",
    img: "/img/regalo3.jpg",
    link: ""
  },
  {
    name: "Cartera Vulkit Negra",
    price: "24'99€",
    img: "/img/regalo4.jpg",
    link: "https://amzn.eu/d/gSd14av"
  },
  {
    name: "Vale por Silksong edicion coleccionista (aun no ha salido)",
    price: "75€-100€",
    img: "/img/regalo5.jpg",
    link: "https://www.fangamer.eu/collections/hollow-knight-silksong"
  },
  {
    name: "Bombilla Inteligente",
    price: "14'99€",
    img: "/img/regalo6.jpg",
    link: "https://amzn.eu/d/4YgSpus"
  },
  // Añade más...
];

let currentIndex = 0;
const card = document.getElementById('gift-card');

// Referencias al DOM
const ui = {
    img: document.getElementById('gift-img'),
    name: document.getElementById('gift-name'),
    price: document.getElementById('gift-price'),
    link: document.getElementById('gift-link'),
    counter: document.getElementById('counter')
};

// Cargar datos
function loadGift(index) {
    const gift = wishlist[index];
    ui.name.innerText = gift.name;
    ui.price.innerText = gift.price;
    ui.img.src = gift.img;
    ui.link.href = gift.link;
    ui.counter.innerText = `${index + 1} / ${wishlist.length}`;
}

// --- LOGICA DE SWIPE (DESLIZAR) ---
let startX = 0;
let currentX = 0;
let isDragging = false;
const threshold = 100; // Cuánto hay que arrastrar para cambiar

card.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    card.style.transition = 'none'; // Quitar animación para que siga el dedo
});

card.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    
    // Mover y rotar la carta con el dedo
    const rotation = diff / 20;
    card.style.transform = `translateX(${diff}px) rotate(${rotation}deg)`;
});

const endSwipe = () => {
    if (!isDragging) return;
    isDragging = false;
    card.style.transition = 'transform 0.3s ease-out';
    
    const diff = currentX - startX;

    if (Math.abs(diff) > threshold) {
        // Swipe completado
        const direction = diff > 0 ? -1 : 1; // Izquierda o Derecha
        
        // Animación de salida
        card.style.transform = `translateX(${diff > 0 ? 1000 : -1000}px) rotate(${diff > 0 ? 45 : -45}deg)`;
        
        setTimeout(() => {
            // Cambiar índice
            if (direction === 1) { // Siguiente
                currentIndex = (currentIndex + 1) % wishlist.length;
            } else { // Anterior
                currentIndex = (currentIndex - 1 + wishlist.length) % wishlist.length;
            }
            
            loadGift(currentIndex);
            
            // Resetear posición instantáneamente y animar entrada
            card.style.transition = 'none';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                card.style.transform = 'scale(1) translateX(0) rotate(0)';
            }, 50);
        }, 300);

    } else {
        // Swipe cancelado (vuelve al centro)
        card.style.transform = 'translateX(0) rotate(0)';
    }
    // Reset coords
    startX = 0;
    currentX = 0;
};

card.addEventListener('touchend', endSwipe);

// --- NIEVE DE FONDO ---
function createSnow() {
    const snowContainer = document.getElementById('snow-container');
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerText = Math.random() > 0.5 ? '❅' : '❆';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.opacity = Math.random();
    
    snowContainer.appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}
setInterval(createSnow, 300);

// Iniciar
loadGift(0);