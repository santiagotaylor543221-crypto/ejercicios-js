// profile.js
export function profileView() {
  const containerView = document.createElement("div");
  containerView.innerHTML = `
    <h2>User Profile</h2>
    <div id="profileInfo"></div>
  `;

  const profileInfo = containerView.querySelector("#profileInfo");
  const session = JSON.parse(localStorage.getItem("session"));
  const userRole = session.role;

  // 🔹 Show different info depending on role
  if (userRole === "manager") {
    profileInfo.innerHTML = `
      <p><strong>Name:</strong> ${session.name}</p>
      <p><strong>Email:</strong> ${session.email}</p>
      <p><strong>Role:</strong> Manager</p>
      <p>You can manage all projects and users.</p>
    `;
  } else {
    profileInfo.innerHTML = `
      <p><strong>Name:</strong> ${session.name}</p>
      <p><strong>Email:</strong> ${session.email}</p>
      <p><strong>Role:</strong> Collaborator</p>
      <p>You can see and update your assigned projects.</p>
    `;
  }

  return containerView;
}
