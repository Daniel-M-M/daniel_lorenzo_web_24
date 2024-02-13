"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
const express_1 = __importDefault(require("express"));
const auth_router_1 = __importDefault(require("./routers/auth-router"));
const admin_router_1 = __importDefault(require("./routers/admin-router"));
const booking_router_1 = __importDefault(require("./routers/booking-router"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(auth_router_1.default);
app.use(admin_router_1.default);
app.use(booking_router_1.default);
app.use((0, connect_history_api_fallback_1.default)());
app.use(express_1.default.static("dist-frontend"));
app.use((_, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.status(404).send("Ops... Pagina non trovata");
});
const port = 3000;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
