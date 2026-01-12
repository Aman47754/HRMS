# 🏢 HRMS – Human Resource Management System (Backend + API)

A **production-style HRMS backend application** built with **Node.js, Express, and MongoDB**, implementing real-world HR workflows such as **authentication, employee management, attendance, leave management, payroll processing, payslip generation (PDF), and email notifications**.

The system is **fully functional** and is tested using **Postman API collections**.  
A React frontend is planned to consume these APIs.

---

## 📌 Project Overview

This HRMS backend provides a **role-based REST API system** where:

- **HR**
  - Creates employees and user accounts
  - Approves / rejects leaves
  - Processes monthly payroll
  - Sends payslips via email (PDF)
- **Employee**
  - Logs in securely
  - Marks attendance
  - Applies for leave
  - Views payroll details
- **Manager** (optional role)
  - Views payrolls and leave requests

### Key Highlights
- JWT-based authentication
- Role-based access control
- Secure payroll processing
- Payslip PDF generation
- Email notifications with attachments
- Clean modular architecture

---

## 🧰 Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**

### Authentication & Security
- **JWT (jsonwebtoken)**
- **bcryptjs**

### Utilities
- **Nodemailer** – email notifications
- **PDFKit** – payslip PDF generation
- **dotenv** – environment variables
- **cors** – cross-origin requests

### Testing
- **Postman** – API testing & demonstration

---

## ✨ Features Implemented

### 🔐 Authentication & Authorization
- User login and registration
- JWT-based authentication
- Role-based access control (HR, EMPLOYEE, MANAGER)

### 👥 Employee Management (HR)
- Create employee profiles
- Link employee with login credentials
- Maintain salary structure

### 🕒 Attendance Management (Employee)
- Mark daily attendance
- Attendance data used in payroll calculation

### 🏖️ Leave Management
- Employees apply for leave
- HR/Manager approves or rejects leave
- Email notification on leave status update

### 💰 Payroll Processing (HR)
- Salary calculation using:
  - Attendance
  - Approved leaves
  - Overtime
  - Allowances
- Mock statutory deductions:
  - Provident Fund (PF)
  - Employee State Insurance (ESI)
  - Tax Deducted at Source (TDS)
- Prevents duplicate payroll for the same month

### 📄 Payslip Generation
- Generates monthly payslip as PDF
- Stores PDF securely on the server
- Sends payslip as **email attachment**

### ✉️ Email Notifications
- Account credentials email
- Leave approval / rejection email
- Payroll email with payslip PDF attached

---

## Project Flowchart

![Flowchart](assets/Readables/Flowchart%20HRMS.png)

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Aman47754/HRMS.git
cd backend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
```bash
PORT=4000
MONGO_URL=your_mongodb_atlas_url
JWT_SECRET=your_jwt_secret

MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_email_app_password
```

### 4️⃣ Run the Server
```bash
npm start
```

