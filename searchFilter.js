// searchFilter.js
export function searchFilterView() {
  // 🔹 Contenedor principal de la vista
  const containerView = document.createElement("div");
  containerView.innerHTML = `
    <h2>Entity List (ej: Projects, Tasks, etc.)</h2>
    
    <!-- Input para buscar por nombre -->
    <input type="text" id="searchInput" placeholder="Search by name..." />
    
    <!-- Select para filtrar por estado -->
    <select id="statusFilter">
      <option value="all">All</option>
      <option value="Pending">Pending</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
    </select>
    
    <!-- Lista donde se renderizan las entidades -->
    <ul id="entityList"></ul>
  `;

  // 🔹 Referencias a los elementos del DOM
  const entityList = containerView.querySelector("#entityList"); // lista donde se pintan los items
  const searchInput = containerView.querySelector("#searchInput"); // input de búsqueda
  const statusFilter = containerView.querySelector("#statusFilter"); // select de filtro

  // 🔹 Variable global para guardar entidades cargadas desde el servidor
  let entitiesData = []; // aquí se guardan los datos (ej: proyectos, tareas, usuarios)

  // 🔹 READ: cargar entidades desde JSON Server
  async function loadEntities() {
    // ⚠️ IMPORTANTE: cambia la URL según tu recurso (ej: /projects, /tasks, /users)
    const res = await fetch("http://localhost:3000/projects");
    entitiesData = await res.json(); // guardamos todos los registros en memoria
    renderEntities(); // renderizamos con los filtros aplicados
  }

  // 🔹 Función para renderizar entidades aplicando buscador + filtro
  function renderEntities()
