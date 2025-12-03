# 🏥 TCAI Hospital

## 📋 Overview

TCAI Hospital is a hospital information system developed with Angular, specifically designed for educational purposes for nursing students and web application development. This project simulates a real hospital environment where patients, auxiliary staff, rooms, and medical records can be managed through a modern, responsive front-end interface.

It demostrates Angular concepts such as components, services, routing, forms, and HTTP communication with API's, providing a hands-on learninng experience for students and developers.

---

## 🚀 Installation Requirements

Before starting, make sure the following tools are installed:

### 1. **Node.js**
Angular requires Node.js to function.
- Download and install from: https://nodejs.org/
- Verify the installation:
  ```
  node -v
  npm -v
  ```

### 2. **TypeScript**
Angular is built on TypeScript, although Angular CLI already includes its compiler.
- Install globally (optional but recommended):
  ```
  npm install -g typescript
  ```
- Verify installation:
  ```
  tsc -v
  ```

### 3. **Angular CLI**
The official tool for creating, compiling, and running Angular projects.

Install:
```
npm install -g @angular/cli
```

Verify installation:
```
ng version
```

---

## 📥 Clone the Repository
To download the project to your machine:

```
git clone https://github.com/Stucom-Pelai/MP0616_Angular_Hospital_TCAI.git
```

Enter the project directory:
```
cd MP0616_Angular_Hospital_TCAI
```

Install project dependencies:
```
npm install
```

---

## ▶️ Run the Project
To start the development server, run:

```
ng serve -o
```

The **-o** parameter will automatically open the browser.

The application will typically be available at:
```
http://localhost:4200/
```

---

## 🗂️ Project Structure
Below is an overview of the main structure of the Angular project:

```
MP0616_Angular_Hospital_TCAI/
│
├── src/
│   ├── app/                # Main application code
│   │   ├── components/     # Reusable components (forms, views...)
│   │   ├── services/       # Business logic and HTTP service calls
│   │   ├── models/         # Data models and interfaces
│   │   ├── pages/          # Complete system pages or views
│   │   ├── app.module.ts   # Main application module
│   │   └── app.component.* # Root component
│   │
│   ├── assets/             # Images, icons, and static files
│   ├── environments/       # Environment configurations (dev and prod)
│   ├── index.html          # Main HTML file
│   └── main.ts             # Application entry point
│
├── package.json            # NPM dependencies and scripts
├── angular.json            # Global Angular project configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 📌 Final Notes
- Always run dependency installation after cloning the project.
- You can generate new components with:
  ```
  ng generate component name
  ```
- If you modify the backend or API, check the routes defined in your services.
