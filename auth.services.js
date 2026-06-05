// guardian.js
export function guardian(route) {
  const session = localStorage.getItem("session"); // check if user is logged in
  if (!session) {
    // No session → only allow login
    return route === "#/login";
  }

  const user = JSON.parse(session);

  // 🔹 Manager can access everything
  if (user.role === "manager") {
    return true;
  }

  // 🔹 Collaborator rules
  if (user.role === "collaborator") {
    if (route === "#/dashboard" || route === "#/projects") {
      return true;
    }
    // Collaborator cannot access admin routes
    return false;
  }

  // Default: block access
  return false;
}
