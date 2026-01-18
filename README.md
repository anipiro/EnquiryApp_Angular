
---

# 🚀 Enquiry Management System

**Angular 19 + ASP.NET Core Web API + SQL Server**

A full-stack enquiry management application built with **Angular 19** on the frontend and **ASP.NET Core Web API** on the backend.
The system allows users to create and manage enquiries with dynamic enquiry types and statuses fetched from the API.

This project demonstrates real-world full-stack development including API integration, database persistence, CORS configuration, and clean coding practices.

---

## ✨ Features

* ✔️ Create new enquiries
* ✔️ Dynamic enquiry types loaded from API
* ✔️ Dynamic enquiry status list
* ✔️ SQL Server database persistence
* ✔️ RESTful API architecture
* ✔️ Swagger API documentation
* ✔️ CORS enabled for frontend communication

---

## 🧩 Tech Stack

**Frontend**

* Angular 19 (Standalone Components)
* RxJS
* TypeScript
* HTML / CSS

**Backend**

* ASP.NET Core Web API
* Entity Framework Core
* SQL Server
* Swagger

---

## ⚙️ Prerequisites

Make sure you have installed:

* Node.js (LTS recommended)
* Angular CLI
* .NET SDK (6 or newer)
* SQL Server / SQL Server Express
* Git

---

## 🛠️ Backend Setup

1. Open the backend project in **Visual Studio**.
2. Update the connection string in `appsettings.json`:

   ```json
   "ConnectionStrings": {
     "EnquiryCon": "YOUR_SQL_CONNECTION_STRING"
   }
   ```
3. Run the API using **Run (F5)**.
4. Swagger will open automatically:

   ```
   https://localhost:7116/swagger
   ```

Test endpoints:

* `/api/EnquiryMaster/GetAllTypes`
* `/api/EnquiryMaster/GetAllStatus`
* `/api/EnquiryMaster/CreateEnquiry`

---

## 🌐 Frontend Setup

1. Open terminal in the project folder.
2. Install dependencies (first time only):

   ```bash
   npm install
   ```
3. Run the Angular application:

   ```bash
   npx ng serve --open
   ```
4. The application will open automatically:

   ```
   http://localhost:4200
   ```

---

## ▶️ Running the Application

Both backend and frontend must be running simultaneously:

* **Backend:** Run from Visual Studio (Swagger must be open)
* **Frontend:** Run using `npx ng serve --open`

---

## 📡 API Endpoints

| Method | Endpoint                               |
| ------ | -------------------------------------- |
| GET    | `/api/EnquiryMaster/GetAllTypes`       |
| GET    | `/api/EnquiryMaster/GetAllStatus`      |
| GET    | `/api/EnquiryMaster/GetAllEnquiries`   |
| POST   | `/api/EnquiryMaster/CreateEnquiry`     |
| PUT    | `/api/EnquiryMaster/UpdateEnquiry`     |
| DELETE | `/api/EnquiryMaster/DeleteEnquiryById` |

---

## 🧪 Notes

* Backend must be running before frontend loads data.
* CORS is configured for local development.
* Database schema must match model definitions.
* Swagger can be used to test API endpoints.

---

## 👩‍💻 Author

**Ani Pirosmanashvili**
Computer Science Student | Aspiring Full-Stack Developer
Angular • .NET • SQL • UI/UX

---


