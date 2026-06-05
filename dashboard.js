// dashboard.js
export function dashboardView() {
  // Main container for dashboard
  const containerView = document.createElement("div");
  containerView.innerHTML = `
    <h2>Dashboard</h2>
    <div id="stats"></div>
    <div id="projectsList"></div>
  `;

  const statsDiv = containerView.querySelector("#stats");
  const projectsList = containerView.querySelector("#projectsList");

  // Get user session from localStorage
  const session = JSON.parse(localStorage.getItem("session"));
  const userRole = session.role;
  const userId = session.id;

  // Load projects from JSON Server
  async function loadProjects() {
    const res = await fetch("http://localhost:3000/projects");
    const projects = await res.json();

    // 🔹 Filter projects depending on role
    const visibleProjects =
      userRole === "manager"
        ? projects // manager sees all
        : projects.filter(p => p.assignedTo === userId); // collaborator sees only assigned

    renderStats(visibleProjects);
    renderProjects(visibleProjects);
  }

  // 🔹 Show statistics
  function renderStats(projects) {
    const total = projects.length;
    const active = projects.filter(p => p.status === "In Progress").length;
    const completed = projects.filter(p => p.status === "Completed").length;

    statsDiv.innerHTML = `
      <p>Total Projects: ${total}</p>
      <p>Active Projects: ${active}</p>
      <p>Completed Projects: ${completed}</p>
    `;
  }

  // 🔹 Show project list
  function renderProjects(projects) {
    projectsList.innerHTML = "";
    projects.forEach(p => {
      const card = document.createElement("div");
      card.innerHTML = `
        <strong>${p.name}</strong> - ${p.description} [${p.status}]
      `;

      // Manager can edit/delete, collaborator can only change status
      if (userRole === "manager") {
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => alert("Edit project logic here");

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = () => alert("Delete project logic here");

        card.appendChild(editBtn);
        card.appendChild(delBtn);
      } else if (userRole === "collaborator") {
        const statusBtn = document.createElement("button");
        statusBtn.textContent = "Change Status";
        statusBtn.onclick = () => alert("Change status logic here");
        card.appendChild(statusBtn);
      }

      projectsList.appendChild(card);
    });
  }

  loadProjects();
  return containerView;
}
