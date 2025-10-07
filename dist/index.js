"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
// -------------------------------
// Constantes válidas
// -------------------------------
const ESTADOS_VALIDOS = ["Pendiente", "En curso", "Terminada", "Cancelada"];
const DIFICULTADES_VALIDAS = ["Fácil", "Medio", "Difícil"];
//# sourceMappingURL=index.js.map