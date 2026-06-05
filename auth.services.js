// guardian.js
export function guardian(currentRoute) {
  // Get session from localStorage
  const sessionData = localStorage.getItem("session");

  // 🔹 If there is NO session → only allow login route
  if (!sessionData) {
    console.warn("No session found. Redirecting to login...");
    window.location.hash = "#/login";
    return false;
  }

  // Parse session data
  const userSession = JSON.parse(sessionData);
  const userRole = userSession.role;

  // 🔹 Manager rules
  if (userRole === "manager") {
    // Manager can access everything
    console.log("Manager access granted.");
    return true;
  }

  // 🔹 Collaborator rules
  if (userRole === "collaborator") {
    // Collaborator can only access dashboard and projects
    if (currentRoute === "#/dashboard" || currentRoute === "#/projects" || currentRoute === "#/profile") {
      console.log("Collaborator access granted.");
      return true;
    } else {
      console.warn("Collaborator tried to access restricted route.");
      window.location.hash = "#/dashboard"; // redirect to safe route
      return false;
    }
  }

  // 🔹 Default: block access
  console.warn("Unknown role or invalid route.");
  window.location.hash = "#/login";
  return false;
}
