// router.js
import { loginView } from "./views/login.js";
import { dashboardView } from "./views/dashboard.js";
import { crudView } from "./views/crud.js";
import { guardian } from "./auth/guardian.js";

// Router function: decides which view to render
export function router() {
  const appContainer = document.getElementById("app"); // main div in index.html
  appContainer.innerHTML = ""; // clear before rendering

  const route = window.location.hash; // example: #/login, #/dashboard, #/projects

  // 🔹 Guardian checks if user can access this route
  if (!guardian(route)) {
    appContainer.appendChild(loginView());
    return;
  }

  // 🔹 Render view depending on route
  switch (route) {
    case "#/login":
      appContainer.appendChild(loginView());
      break;
    case "#/dashboard":
      appContainer.appendChild(dashboardView());
      break;
    case "#/projects":
      appContainer.appendChild(crudView());
      break;
    default:
      appContainer.appendChild(loginView()); // default route
  }
}

// Listen to hash changes (SPA navigation)
window.addEventListener("hashchange", router);
window.addEventListener("load", router);
