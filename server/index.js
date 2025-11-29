const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3001 });

wss.on("connection", (ws) => {
    console.log("Клиент подключился");

    ws.on("message", (message) => {
        console.log("Получено:", message.toString());

        // рассылаем ВСЕМ
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
});

console.log("✅ WebSocket сервер запущен на 3001");