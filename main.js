// crud.js
export function crudView() {
  // Main container for this view
  const containerView = document.createElement("div");
  containerView.innerHTML = `
    <h2>Entity CRUD (example: Projects, Tasks, Users)</h2>
    <form id="createForm">
      <input type="text" id="name" placeholder="Name" required />
      <input type="text" id="description" placeholder="Description" required />
      <select id="status">
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Create</button>
    </form>
    <ul id="entityList"></ul>
  `;

  const entityList = containerView.querySelector("#entityList");
  const createForm = containerView.querySelector("#createForm");

  // Data array (change name if needed: projectsData, tasksData, etc.)
  let entitiesData = [];

  // 🔹 READ: load entities from JSON Server
  async function loadEntities() {
    // ⚠️ IMPORTANT: change the URL depending on your resource
    const res = await fetch("http://localhost:3000/projects");
    entitiesData = await res.json();
    renderEntities();
  }

  // 🔹 Render entities in list
  function renderEntities() {
    entityList.innerHTML = "";
    entitiesData.forEach(entity => {
      const li = document.createElement("li");
      li.textContent = `${entity.name} - ${entity.description} [${entity.status}]`;

      // 🔹 UPDATE: edit button
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = async () => {
        const newName = prompt("New name:", entity.name);
        const newDesc = prompt("New description:", entity.description);
        const newStatus = prompt("New status (Pending/In Progress/Completed):", entity.status);
        if (newName && newDesc && newStatus) {
          await fetch(`http://localhost:3000/projects/${entity.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...entity, name: newName, description: newDesc, status: newStatus })
          });
          loadEntities();
        }
      };

      // 🔹 DELETE: delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.onclick = async () => {
        await fetch(`http://localhost:3000/projects/${entity.id}`, { method: "DELETE" });
        loadEntities();
      };

      li.appendChild(editBtn);
      li.appendChild(delBtn);
      entityList.appendChild(li);
    });
  }

  // 🔹 CREATE: form submit
  createForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = containerView.querySelector("#name").value.trim();
    const description = containerView.querySelector("#description").value.trim();
    const status = containerView.querySelector("#status").value;

    if (!name || !description) {
      alert("Name and description required!");
      return;
    }

    await fetch("http://localhost:3000/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, status })
    });

    e.target.reset();
    loadEntities();
  });

  loadEntities();
  return containerView;
}
