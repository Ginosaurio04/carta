// Elementos principales de la carta y el sobre
const envelope = document.querySelector("#envelope");
const letterScene = document.querySelector(".letter-scene");
const letter = document.querySelector("#letter");
const hint = document.querySelector("#hint");
const status = document.querySelector("#status");
const closeLetterBtn = document.querySelector("#closeLetterBtn");

// Contenedor de las rosas flotantes en el fondo
const rosesStream = document.querySelector("#rosesStream");

// Verificacion inicial de elementos requeridos
if (!envelope || !letterScene || !letter || !hint || !status) {
    throw new Error("No se encontraron todos los elementos esenciales de la carta.");
}

/* =========================================================
   CONTROL DE APERTURA Y CIERRE DE LA CARTA
   ========================================================= */

function toggleLetter(openState) {
    const shouldOpen = typeof openState === "boolean"
        ? openState
        : !letterScene.classList.contains("is-open");

    letterScene.classList.toggle("is-open", shouldOpen);

    // Actualiza accesibilidad y textos informativos
    envelope.setAttribute("aria-expanded", String(shouldOpen));
    envelope.setAttribute("aria-label", shouldOpen ? "Cerrar la carta" : "Abrir la carta");
    letter.setAttribute("aria-hidden", String(!shouldOpen));

    hint.textContent = shouldOpen
        ? "Pulsa el sobre o el botón ✕ para cerrar la carta"
        : "Pulsa el sobre para abrir la carta";

    status.textContent = shouldOpen
        ? "La carta está abierta."
        : "La carta está cerrada.";
}

envelope.addEventListener("click", () => toggleLetter());

if (closeLetterBtn) {
    closeLetterBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleLetter(false);
    });
}

// Al pulsar el mensaje guía cuando la carta está abierta, también se puede cerrar
hint.addEventListener("click", () => {
    if (letterScene.classList.contains("is-open")) {
        toggleLetter(false);
    }
});

/* =========================================================
   FONDO CON ROSAS BLANCAS, AZULES Y NEGRAS
   ========================================================= */

function initRosesStream() {
    if (!rosesStream) return;

    // Colores disponibles de rosas
    const roseColors = ["white", "blue", "black"];
    const totalItems = 20; // Cantidad balanceada para un efecto fluido y elegante

    for (let i = 0; i < totalItems; i++) {
        const color = roseColors[i % roseColors.length];
        const isPetal = i % 3 === 2; // Algunas seran petalos individuales y otras rosas completas

        const elem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const use = document.createElementNS("http://www.w3.org/2000/svg", "use");

        if (isPetal) {
            elem.setAttribute("viewBox", "0 0 50 50");
            elem.classList.add("floating-petal");
            use.setAttribute("href", "#rose-petal-shape");
            use.classList.add(`petal-unit--${color}`);
        } else {
            elem.setAttribute("viewBox", "0 0 100 100");
            elem.classList.add("floating-flower");
            use.setAttribute("href", "#rose-full");
            use.classList.add("rose-flower", `rose-flower--${color}`);
        }

        elem.appendChild(use);

        // Variables aleatorias para movimiento natural
        const size = isPetal
            ? (20 + Math.random() * 22)
            : (38 + Math.random() * 42);
        const leftPercent = Math.random() * 94; // Entre 0% y 94% del ancho de la pantalla
        const duration = 12 + Math.random() * 16; // Duracion entre 12s y 28s
        const negativeDelay = -(Math.random() * duration); // Inicia en pleno vuelo
        const swayX = (Math.random() * 90 - 45) + "px"; // Balanceo horizontal
        const rotEnd = (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360) + "deg";
        const maxOpacity = 0.65 + Math.random() * 0.3;
        const scale = 0.7 + Math.random() * 0.5;

        elem.style.width = `${size}px`;
        elem.style.height = `${size}px`;
        elem.style.left = `${leftPercent}%`;
        elem.style.animationDuration = `${duration}s`;
        elem.style.animationDelay = `${negativeDelay}s`;
        elem.style.setProperty("--sway-x", swayX);
        elem.style.setProperty("--rot-end", rotEnd);
        elem.style.setProperty("--max-opacity", maxOpacity);
        elem.style.setProperty("--scale", scale);

        rosesStream.appendChild(elem);
    }
}

// Iniciar el generador de fondo
initRosesStream();
