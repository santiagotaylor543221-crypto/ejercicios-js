// hotelDashboard.js
export function hotelDashboardView() {
  const containerView = document.createElement("div");
  containerView.innerHTML = `
    <h2>Hotel Dashboard</h2>
    <div id="stats"></div>
    <div id="reservationList"></div>
  `;

  const statsDiv = containerView.querySelector("#stats");
  const reservationList = containerView.querySelector("#reservationList");

  const session = JSON.parse(localStorage.getItem("session"));
  const userRole = session.role;
  const userId = session.id;

  async function loadReservations() {
    const res = await fetch("http://localhost:3000/reservations");
    const reservations = await res.json();

    // 🔹 Manager sees all, collaborator sees only own
    const visibleReservations =
      userRole === "manager"
        ? reservations
        : reservations.filter(r => r.guestId === userId);

    renderStats(visibleReservations);
    renderReservations(visibleReservations);
  }

  // 🔹 Stats
  function renderStats(reservations) {
    const total = reservations.length;
    const reserved = reservations.filter(r => r.status === "Reserved").length;
    const checkedIn = reservations.filter(r => r.status === "Checked-in").length;
    const completed = reservations.filter(r => r.status === "Completed").length;

    statsDiv.innerHTML = `
      <p>Total Reservations: ${total}</p>
      <p>Reserved: ${reserved}</p>
      <p>Checked-in: ${checkedIn}</p>
      <p>Completed: ${completed}</p>
    `;
  }

  // 🔹 Reservation list
  function renderReservations(reservations) {
    reservationList.innerHTML = "";
    reservations.forEach(r => {
      const card = document.createElement("div");
      card.innerHTML = `
        <strong>Room ${r.roomNumber}</strong> - Guest: ${r.guestName} [${r.status}]
      `;

      if (userRole === "manager") {
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => alert("Edit reservation logic here");

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = () => alert("Delete reservation logic here");

        card.appendChild(editBtn);
        card.appendChild(delBtn);
      } else if (userRole === "collaborator" && r.guestId === userId) {
        const statusBtn = document.createElement("button");
        statusBtn.textContent = "Change Status";
        statusBtn.onclick = () => alert("Change status logic here");
        card.appendChild(statusBtn);
      }

      reservationList.appendChild(card);
    });
  }

  loadReservations();
  return containerView;
}
