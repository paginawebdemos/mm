const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const chatContainer = document.getElementById("chat-container");
const chatBtn = document.getElementById("chat-btn");

const welcomeMessage = "¡Hola! Soy el asistente virtual de TecnoLandia. ¿En qué puedo ayudarte?";
const optionsMessage = "Por favor, selecciona una opción:";

const mainOptions = [
    "Horarios",
    "Ubicación",
    "Contacto"
];

function addMessage(content, sender = "bot", scrollToBottom = true) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
    messageDiv.innerHTML = content;
    chatBox.appendChild(messageDiv);

    if (scrollToBottom) {
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function showMainOptions() {
    addMessage(optionsMessage, "bot", false);

    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options-container");

    mainOptions.forEach(option => {
        const optionButton = document.createElement("button");
        optionButton.classList.add("option-button");
        optionButton.innerText = option;
        optionButton.onclick = function() {
            processOption(option);
        };
        optionsContainer.appendChild(optionButton);
    });

    chatBox.appendChild(optionsContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function processOption(option) {
    addMessage(`Has seleccionado: "${option}"`, "user");

    let response = '';
    switch (option) {
        case "Horarios":
            response = "Nuestros horarios de atención son de lunes a sábado de 9:00 am a 2:00 pm y de 5:00 pm a 8:00 pm. Cerramos los domingos.";
            break;
        case "Ubicación":
            response = "Estamos ubicados en la Carretera J, a pocos metros del automercado Aime, frente a la Farmacia Luz";
            break;
        case "Contacto":
            response = "Puedes contactarnos al número <strong>+584121259478</strong>.";
            break;
        default:
            response = "Opción no válida, por favor selecciona una opción del menú.";
    }

    addMessage(response, "bot");
    askIfWantMore();
}

function askIfWantMore() {
    addMessage("¿Deseas saber algo más? Si es así, responde solo 'Si'. Si no, siempre estaré aquí para ayudarte.", "bot", true);
}

function processUserResponse(response) {
    const lowerResponse = response.toLowerCase();

    // Detecta agradecimientos comunes
    if (lowerResponse.includes("gracias") || lowerResponse.includes("muy amable") || lowerResponse.includes("te agradezco")) {
        addMessage("¡De nada! Estoy aquí si necesitas algo más.", "bot");
    } else if (lowerResponse === "si") {
        showMainOptions();
    } else {
        addMessage("¡Gracias por visitar TecnoLandia! Si necesitas algo más, siempre estaré aquí.", "bot");
    }
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message !== "") {
        addMessage(message, "user");
        userInput.value = "";
        processUserResponse(message);
    }
}

function toggleChat() {
    if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
        chatContainer.style.display = "flex";  // Muestra el chat
        chatBtn.style.display = "none";  // Oculta el botón flotante
    } else {
        chatContainer.style.display = "none";  // Oculta el chat
        chatBtn.style.display = "block";  // Muestra el botón flotante
    }
}

document.addEventListener("DOMContentLoaded", () => {
    addMessage(welcomeMessage, "bot", false);
    showMainOptions();
});

document.getElementById("send-btn").onclick = sendMessage;
