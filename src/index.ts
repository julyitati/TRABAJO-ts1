// Importar prompt-sync usando CommonJS
const promptSync = require("prompt-sync");
const prompt = promptSync();

// -------------------------------
// Constantes válidas
// -------------------------------
const ESTADOS_VALIDOS: string[] = ["Pendiente", "En curso", "Terminada", "Cancelada"];
const DIFICULTADES_VALIDAS: string[] = ["Fácil", "Medio", "Difícil"];

// -------------------------------
// Tipos de datos (estructurado, sin OOP)
// -------------------------------
type Tarea = {
  id: number;
  titulo: string;
  descripcion: string;
  estado: string;
  dificultad: string;
  fechaCreacion: Date;
  ultimaEdicion: Date;
  vencimiento: Date | null;
};
