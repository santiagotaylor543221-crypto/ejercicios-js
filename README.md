
---

```markdown
# 🏗️ Single Page Application (SPA)

## 📖 Project Overview
This project is a **Single Page Application (SPA)** built with **Vite**.  
It simulates a backend using **JSON Server** and manages session data with **LocalStorage**.  
The app includes **CRUD operations** (Create, Read, Update, Delete), authentication, and role-based access (Manager vs User).

---

## ⚙️ Technologies Used
- **Vite** → fast development server and bundler.  
- **JSON Server** → fake REST API for testing.  
- **LocalStorage** → session persistence.  
- **Vanilla JavaScript (ES6)** → logic and routing.  
- **HTML + CSS** → base structure and styles (already provided).

---

## 🚀 Installation
```bash
# Clone repository
git clone <repo-url>
cd project-folder

# Install dependencies
npm install

# Run Vite dev server
npm run dev
```

---

## 🗄️ JSON Server Setup
Install JSON Server globally:
```bash
npm install -g json-server
```

Create a `db.json` file in the root:
```json
{
  "users": [
    { "id": 1, "name": "Manager", "email": "manager@test.com", "password": "123456", "role": "manager" },
    { "id": 2, "name": "Guest", "email": "guest@test.com", "password": "123456", "role": "collaborator" }
  ],
  "reservations": [
    { "id": 1, "roomNumber": "101", "guestName": "Guest", "status": "Reserved", "guestId": 2 }
  ]
}
```

Run server:
```bash
json-server --watch db.json --port 3000
```

---

## 📂 SPA Structure
- `index.html` → only contains `<div id="app"></div>`.  
- `router.js` → controls navigation with hash routes.  
- `guardian.js` → protects routes based on session and role.  
- `views/` → contains `login.js`, `dashboard.js`, `crud.js`, `profile.js`.  

---

## 🔑 Authentication
- Login form validates email and password.  
- On success, user data is saved in **LocalStorage**.  
- Session persists after refresh.  
- Guardian checks session before allowing access to routes.

---

## 👥 Role-Based Access
- **Manager** → full CRUD (create, edit, delete), sees all records.  
- **Collaborator/User** → limited access, sees only own records, can update status.  
- Guardian enforces restrictions automatically.

---

## 🛠️ CRUD Operations
- **Create** → form to add new records.  
- **Read** → list of records fetched from JSON Server.  
- **Update** → edit or change status depending on role.  
- **Delete** → only manager can delete records.

---

## 💾 LocalStorage Usage
- Stores session object (`{id, name, email, role}`).  
- Used by guardian to check permissions.  
- Ensures persistence even after page reload.

---

## ▶️ How to Run
1. Start JSON Server:  
   ```bash
   json-server --watch db.json --port 3000
   ```
2. Start Vite:  
   ```bash
   npm run dev
   ```
3. Open browser at `http://localhost:5173`.  
4. Login with test credentials.  
5. Navigate through dashboard, CRUD, and profile views.

---

## ✅ Notes
- This README is generic and can be adapted to **any theme** (hotel, projects, tasks).  
- Just change the entity name in `db.json` and in CRUD views.  
- Structure and logic remain the same.
```

---

👉 Mano, con este README ya tienes un machete **uniforme y de 10 puntos** para cualquier proyecto. ¿Quieres que te prepare también un **README corto en español pelao para sustentación oral** para que lo defiendas rápido frente al jurado?
