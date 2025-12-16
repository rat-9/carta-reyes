import './style.css'

// ==============================================
// 🎁 CONFIGURACIÓN DE TU CARTA
// ==============================================

// Tu mensaje personal (edita esto)
const cartaPersonal = {
  titulo: "Queridos Reyes Magos,",
  parrafos: [
    "Este año ha sido especial de muchas maneras. He intentado portarme lo mejor posible, aunque admito que no siempre ha sido fácil.",
    "Ha habido momentos difíciles, retos que superar, pero hemos seguido adelante con fuerza y esperanza. He aprendido, he crecido, y he tratado de ser mejor persona cada día.",
    "Este año he ayudado en casa, he sido responsable con mis estudios, y he intentado cuidar de las personas que quiero. Sé que no soy perfecto, pero prometo seguir mejorándome.",
    "Con todo el cariño del mundo, os dejo mi lista de deseos. Cualquier cosa que traigáis será recibida con inmensa ilusión y gratitud."
  ],
  firma: "Con amor, tu hijo ❤️"
};

// Tus regalos (edita esto)
const wishlist = [
  {
    name: "Brazo de Pared para Portátil",
    price: "59'99€",
    img: "./img/regalo1.jpg",
    link: "https://amzn.eu/d/f5IfOLn",
    descripcion: "Para jugar desde la tele en la cama"
  },
  {
    name: "Spotify Premium - 6 meses",
    price: "66€",
    img: "./img/regalo2.jpg",
    link: "https://www.game.es/SPOTIFY/MONEDERO-DIGITAL/PREPAGOS/CODIGO-SPOTIFY-DIGITAL-6-MESES/249057",
    descripcion: "Necesito mi musica sin anuncios en el coche"
  },
  {
    name: "Dinero Dinerete",
    price: "€€",
    img: "./img/regalo3.jpg",
    link: "",
    descripcion: "Siempre hace falta y nunca tengo"
  },
  {
    name: "Cartera Vulkit Negra",
    price: "24'99€",
    img: "./img/regalo4.jpg",
    link: "https://amzn.eu/d/gSd14av",
    descripcion: "Que la mia es la de mi ex y ya toca cambiar"
  },
  {
    name: "Vale por Silksong Edición Coleccionista",
    price: "75€-100€",
    img: "./img/regalo5.jpg",
    link: "https://www.fangamer.eu/collections/hollow-knight-silksong",
    descripcion: "Cuando salga lo necesito como loco (aún no disponible)"
  },
  {
    name: "Bombilla Inteligente",
    price: "14'99€",
    img: "./img/regalo6.jpg",
    link: "https://amzn.eu/d/4YgSpus",
    descripcion: "Apagar la luz en la cama o cuando me la dejen encendida"
  }
];

// ==============================================
// 🎬 SISTEMA DE ESCENAS
// ==============================================

let escenaActual = 'intro'; // 'intro' | 'transicion' | 'regalos'
let currentGiftIndex = 0;

// Referencias al DOM
const scenes = {
  intro: document.getElementById('intro-scene'),
  transicion: document.getElementById('transicion-scene'),
  regalos: document.getElementById('regalos-scene')
};

const ui = {
  cartaTitulo: document.getElementById('carta-titulo'),
  cartaContenido: document.getElementById('carta-contenido'),
  cartaFirma: document.getElementById('carta-firma'),
  btnComenzar: document.getElementById('btn-comenzar'),
  giftCard: document.getElementById('gift-card'),
  giftImg: document.getElementById('gift-img'),
  giftName: document.getElementById('gift-name'),
  giftPrice: document.getElementById('gift-price'),
  giftDesc: document.getElementById('gift-desc'),
  giftLink: document.getElementById('gift-link'),
  counter: document.getElementById('counter'),
  btnPrev: document.getElementById('btn-prev'),
  btnNext: document.getElementById('btn-next')
};

// ==============================================
// 🎭 FUNCIONES DE ESCENA
// ==============================================

function mostrarEscena(nombre) {
  Object.values(scenes).forEach(s => s.classList.add('hidden'));
  scenes[nombre].classList.remove('hidden');
  escenaActual = nombre;
}

function inicializarCarta() {
  // Renderizar la carta personal
  ui.cartaTitulo.textContent = cartaPersonal.titulo;
  ui.cartaContenido.innerHTML = cartaPersonal.parrafos
    .map(p => `<p class="mb-4 leading-relaxed">${p}</p>`)
    .join('');
  ui.cartaFirma.textContent = cartaPersonal.firma;
}

function iniciarTransicion() {
  mostrarEscena('transicion');
  crearParticulasMagicas();
  
  // Después de 3 segundos, ir a los regalos
  setTimeout(() => {
    mostrarEscena('regalos');
    cargarRegalo(0);
  }, 3000);
}

// ==============================================
// ✨ PARTÍCULAS MÁGICAS (TRANSICIÓN)
// ==============================================

function crearParticulasMagicas() {
  const container = document.getElementById('particulas-container');
  container.innerHTML = ''; // Limpiar
  
  const emojis = ['⭐', '✨', '🎁', '🌟', '💫', '🎄', '❄️'];
  
  for (let i = 0; i < 50; i++) {
    const particula = document.createElement('div');
    particula.className = 'particula';
    particula.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particula.style.left = Math.random() * 100 + 'vw';
    particula.style.top = Math.random() * 100 + 'vh';
    particula.style.animationDelay = Math.random() * 2 + 's';
    particula.style.animationDuration = (Math.random() * 2 + 3) + 's';
    container.appendChild(particula);
  }
}

// ==============================================
// 🎁 SISTEMA DE REGALOS
// ==============================================

function cargarRegalo(index) {
  const gift = wishlist[index];
  currentGiftIndex = index;
  
  ui.giftName.textContent = gift.name;
  ui.giftPrice.textContent = gift.price;
  ui.giftDesc.textContent = gift.descripcion;
  ui.giftImg.src = gift.img;
  ui.giftLink.href = gift.link || '#';
  ui.counter.textContent = `${index + 1} / ${wishlist.length}`;
  
  // Efecto de entrada
  ui.giftCard.classList.remove('card-enter');
  setTimeout(() => ui.giftCard.classList.add('card-enter'), 10);
}

function siguienteRegalo() {
  currentGiftIndex = (currentGiftIndex + 1) % wishlist.length;
  cargarRegalo(currentGiftIndex);
}

function regaloAnterior() {
  currentGiftIndex = (currentGiftIndex - 1 + wishlist.length) % wishlist.length;
  cargarRegalo(currentGiftIndex);
}

// ==============================================
// 👆 SISTEMA DE SWIPE (TÁCTIL)
// ==============================================

let startX = 0, currentX = 0, isDragging = false;
const threshold = 100;

ui.giftCard.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
  ui.giftCard.style.transition = 'none';
});

ui.giftCard.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
  const diff = currentX - startX;
  const rotation = diff / 20;
  ui.giftCard.style.transform = `translateX(${diff}px) rotate(${rotation}deg)`;
});

const endSwipe = () => {
  if (!isDragging) return;
  isDragging = false;
  ui.giftCard.style.transition = 'transform 0.3s ease-out';
  
  const diff = currentX - startX;

  if (Math.abs(diff) > threshold) {
    const direction = diff > 0 ? -1 : 1;
    ui.giftCard.style.transform = `translateX(${diff > 0 ? 1000 : -1000}px) rotate(${diff > 0 ? 45 : -45}deg)`;
    
    setTimeout(() => {
      if (direction === 1) siguienteRegalo();
      else regaloAnterior();
      
      ui.giftCard.style.transition = 'none';
      ui.giftCard.style.transform = 'scale(0.8)';
      setTimeout(() => {
        ui.giftCard.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        ui.giftCard.style.transform = 'scale(1) translateX(0) rotate(0)';
      }, 50);
    }, 300);
  } else {
    ui.giftCard.style.transform = 'translateX(0) rotate(0)';
  }
  
  startX = 0;
  currentX = 0;
};

ui.giftCard.addEventListener('touchend', endSwipe);

// ==============================================
// ❄️ EFECTO DE NIEVE
// ==============================================

function crearNieve() {
  const snowContainer = document.getElementById('snow-container');
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  snowflake.textContent = Math.random() > 0.5 ? '❅' : '❆';
  snowflake.style.left = Math.random() * 100 + 'vw';
  snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
  snowflake.style.opacity = Math.random() * 0.6 + 0.4;
  
  snowContainer.appendChild(snowflake);
  
  setTimeout(() => snowflake.remove(), 5000);
}

// ==============================================
// 🎵 MÚSICA DE FONDO (OPCIONAL)
// ==============================================

function iniciarMusica() {
  // Puedes agregar un archivo de audio navideño aquí
  // const audio = new Audio('./music/navidad.mp3');
  // audio.loop = true;
  // audio.volume = 0.3;
  // audio.play().catch(e => console.log('Audio bloqueado por el navegador'));
}

// ==============================================
// 🚀 INICIALIZACIÓN
// ==============================================

document.addEventListener('DOMContentLoaded', () => {
  inicializarCarta();
  mostrarEscena('intro');
  setInterval(crearNieve, 300);
  
  // Event listeners
  ui.btnComenzar.addEventListener('click', () => {
    iniciarTransicion();
    iniciarMusica();
  });
  
  ui.btnNext.addEventListener('click', siguienteRegalo);
  ui.btnPrev.addEventListener('click', regaloAnterior);
  
  // Teclado
  document.addEventListener('keydown', (e) => {
    if (escenaActual !== 'regalos') return;
    if (e.key === 'ArrowRight') siguienteRegalo();
    if (e.key === 'ArrowLeft') regaloAnterior();
  });
});