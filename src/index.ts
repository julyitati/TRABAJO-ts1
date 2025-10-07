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
// -------------------------------
// Utilidades (abstracción de operaciones repetidas)
// -------------------------------
function formatDateES(fecha: Date | null): string {
  if (!fecha) return "Sin datos";
  try {
    return fecha.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "Sin datos";
  }
}

function parseFecha(input: string): Date | null {
  if (!input) return null;
  const f = new Date(input);
  return isNaN(f.getTime()) ? null : f;
}

function normalizarEstado(input: string): string | null {
  const buscado = input.trim().toLowerCase();
  return ESTADOS_VALIDOS.find((s) => s.toLowerCase() === buscado) || null;
}

function normalizarDificultad(input: string): string | null {
  const buscado = input.trim().toLowerCase();
  return (
    DIFICULTADES_VALIDAS.find((d) => d.toLowerCase() === buscado) ||
    (buscado === "facil" ? "Fácil" : null)
  );
}
// -------------------------------
// Variables globales
// -------------------------------
let tareas: Tarea[] = [];
let salir = false;
let idTarea = 1;

// -------------------------------
// Funciones principales (modularización)
// -------------------------------
function crearTarea(
  titulo: string,
  descripcion: string,
  dificultad: string,
  vencimiento: string,
  estado: string
): Tarea {
  return {
    id: idTarea++,
    titulo: titulo.trim().substring(0, 100) || "Sin título",
    descripcion: descripcion.substring(0, 500),
    estado: normalizarEstado(estado) || "Pendiente",
    dificultad: normalizarDificultad(dificultad) || "Fácil",
    fechaCreacion: new Date(),
    ultimaEdicion: new Date(),
    vencimiento: parseFecha(vencimiento),
  };
}
function mostrarTarea(t: Tarea): void {
  console.log("\n--- Detalles de la Tarea ---");
  console.log(`ID: ${t.id}`);
  console.log(`Título: ${t.titulo}`);
  console.log(`Descripción: ${t.descripcion || "Sin descripción"}`);
  console.log(`Estado: ${t.estado}`);
  console.log(`Dificultad: ${t.dificultad}`);
  console.log(`Vencimiento: ${formatDateES(t.vencimiento)}`);
  console.log(`Creación: ${formatDateES(t.fechaCreacion)}`);
  console.log(`Última edición: ${formatDateES(t.ultimaEdicion)}`);
  console.log("------------------------------\n");
}

function agregarTarea(): void {
  console.log("\n--- Agregar Nueva Tarea ---");
  const titulo = prompt("Título: ") || "";
  console.log("DEBUG título:", titulo);
  const descripcion = prompt("Descripción (opcional): ") || "";
  const dificultad = prompt("Dificultad (Fácil/Medio/Difícil): ") || "Fácil";
  const vencimiento = prompt("Fecha de vecimiento (AAAA-MM-DD, opcional): ") || "";
  console.log(`Estados válidos: ${ESTADOS_VALIDOS.join(" / ")}`);
  const estado = prompt("Estado inicial (default Pendiente): ") || "Pendiente";

  const nueva = crearTarea(titulo, descripcion, dificultad, vencimiento, estado);
  tareas.push(nueva);

  console.log("✅ Tarea agregada correctamente.\n");
}

function listarTareas(filtro: string | null = null): void {
  console.log("\n--- Listado de Tareas ---");
  let lista = tareas;

  if (filtro) {
    lista = tareas.filter((t) => t.estado.toLowerCase() === filtro.toLowerCase());
  }

  if (lista.length === 0) {
    console.log("⚠ No hay tareas para mostrar.\n");
    return;
  }

 lista.forEach((t) => {
   console.log(`[${t.id}] ${t.titulo} - Estado: ${t.estado}`);
  })

  const id = Number(prompt("Ingrese el ID para ver detalles (0 para volver): "));
  if (id > 0) {
    const tarea = tareas.find((t) => t.id === id);
    if (tarea) mostrarTarea(tarea);
  }
}

function menuVerTareas(): void {
  console.log("\n--- Ver Mis Tareas ---");
  console.log("[1] Todas");
  console.log("[2] Pendientes");
  console.log("[3] En curso");
  console.log("[4] Terminadas");
  console.log("[5] Canceladas");
  console.log("[0] Volver");
  const opcion = (prompt("Elige una opción: ") || "").trim();

  switch (opcion) {
    case "1": listarTareas(null); break;
    case "2": listarTareas("Pendiente"); break;
    case "3": listarTareas("En curso"); break;
    case "4": listarTareas("Terminada"); break;
    case "5": listarTareas("Cancelada"); break;
    case "0": return;
    default: console.log("⚠ Opción inválida.");
  }
}

function menuPrincipal(): void {
  console.log("===== TO DO LIST =====");
  console.log("[1] Ver mis tareas");
  console.log("[2] Agregar una tarea");
  console.log("[0] Salir");
  const opcion = (prompt("Elige una opción: ") || "").trim();

  switch (opcion) {
    case "1": menuVerTareas(); break;
    case "2": agregarTarea(); break;
    case "0": salir = true; console.log("¡Hasta luego!"); break;
    default: console.log("⚠ Opción inválida.");
  }
}

// -------------------------------
// MAIN LOOP
// -------------------------------
function main(): void {
  console.log("¡Bienvenido a tu lista de tareas!");
  while (!salir) {
    menuPrincipal();
  }
}

// Arranque
main();