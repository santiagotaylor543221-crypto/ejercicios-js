// searchFilter.js
export function searchFilterView() {
  // Main container for this view
  const containerView = document.createElement("div");
  containerView.innerHTML = `
    <h2>Entity List (example: Projects, Tasks, Users)</h2>
    
    <!-- Input for search by name -->
    <input type="text" id="searchInput" placeholder="Search by name..." />
    
    <!-- Select for filter by status -->
    <select id="statusFilter">
      <option value="all">All</option>
      <option value="Pending">Pending</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
    </select>
    
    <!-- List where items will be rendered -->
    <ul id="entityList"></ul>
  `;

  // References to DOM elements
  const entityList = containerView.querySelector("#entityList"); // list container
  const searchInput = containerView.querySelector("#searchInput"); // search input
  const statusFilter = containerView.querySelector("#statusFilter"); // filter select

  // Data array (change name if needed: projectsData, tasksData, etc.)
  let entitiesData = [];

  // Load entities from JSON Server
  async function loadEntities() {
    // ⚠️ IMPORTANT: change the URL depending on your resource
    // Example: /projects, /tasks, /users
    const res = await fetch("http://localhost:3000/projects");
    entitiesData = await res.json(); // save all records in memory
    renderEntities(); // show them with filters applied
  }

  // Render entities with search + filter
  function renderEntities() {
    const searchTerm = searchInput.value.toLowerCase(); // text from search input
    const filterStatus = statusFilter.value; // selected status

    entityList.innerHTML = ""; // clear list before rendering again

    // Filter entities by search and status
    entitiesData
      .filter(entity => 
        entity.name.toLowerCase().includes(searchTerm) && // search by name
        (filterStatus === "all" || entity.status === filterStatus) // filter by status
      )
      .forEach(entity => {
        // Create <li> for each entity that matches filters
        const li = document.createElement("li");
        li.textContent = `${entity.name} - ${entity.description} [${entity.status}]`;
        entityList.appendChild(li);
      });
  }

  // Events: update list when typing or changing filter
  searchInput.addEventListener("input", renderEntities);
  statusFilter.addEventListener("change", renderEntities);

  // Load entities when view starts
  loadEntities();

  // Return container so router can inject it in #app
  return containerView;
}
