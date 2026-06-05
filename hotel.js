// hotelCrud.js
export function hotelCrudView() {
  const containerView = document.createElement("div");
  containerView.innerHTML = `
    <h2>Hotel Reservations CRUD</h2>
    <form id="createReservationForm">
      <input type="text" id="roomNumber" placeholder="Room Number" required />
      <input type="text" id="guestName" placeholder="Guest Name" required />
      <select id="status">
        <option value="Reserved">Reserved</option>
        <option value="Checked-in">Checked-in</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Create Reservation</button>
    </form>
    <ul id="reservationList"></ul>
  `;

  const reservationList = containerView.querySelector("#reservationList");
  const createForm = containerView.querySelector("#createReservationForm");

  let reservationsData = [];

  // 🔹 READ: load reservations
  async function loadReservations() {
    const res = await fetch("http://localhost:3000/reservations");
    reservationsData = await res.json();
    renderReservations();
  }

  // 🔹 Render reservations
  function renderReservations() {
    reservationList.innerHTML = "";
    reservationsData.forEach(r => {
      const li = document.createElement("li");
      li.textContent = `Room ${r.roomNumber} - Guest: ${r.guestName} [${r.status}]`;

      // Manager can edit/delete, guest can only change status of own reservation
      const session = JSON.parse(localStorage.getItem("session"));
      if (session.role === "manager") {
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => alert("Edit reservation logic here");

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = () => alert("Delete reservation logic here");

        li.appendChild(editBtn);
        li.appendChild(delBtn);
      } else if (session.role === "collaborator" && r.guestId === session.id) {
        const statusBtn = document.createElement("button");
        statusBtn.textContent = "Change Status";
        statusBtn.onclick = () => alert("Change status logic here");
        li.appendChild(statusBtn);
      }

      reservationList.appendChild(li);
    });
  }

  // 🔹 CREATE: form submit
  createForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const roomNumber = containerView.querySelector("#roomNumber").value.trim();
    const guestName = containerView.querySelector("#guestName").value.trim();
    const status = containerView.querySelector("#status").value;

    await fetch("http://localhost:3000/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomNumber, guestName, status })
    });

    e.target.reset();
    loadReservations();
  });

  loadReservations();
  return containerView;
}
