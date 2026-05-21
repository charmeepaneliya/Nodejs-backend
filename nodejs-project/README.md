# Employee Management System

An Employee Management System built using **Node.js, Express.js, and MongoDB**. This project performs **CRUD operations (Create, Read, Update, Delete)** to manage employee records efficiently.

---

## Features

✅ Add New Employee  
✅ Get All Employees Data  
✅ Get Employee By ID  
✅ Update Employee Details  
✅ Delete Employee Data    
✅ MongoDB Database Integration  

---

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Tools
- Postman (API Testing)
- MongoDB Compass
- VS Code

---

## Project Structure

```txt
employee-management-system/
│── controller/
│   └── employeeController.js
│── model/
│   └── Employee.js
│── routes/
│   └── employeeRoutes.js
│── config/
│   └── db.js
│── 
│── server.js
│── package.json
│── README.md
```

---

## Installation

### 1. Clone Repository

```bash
git clone your-repository-link
```

### 2. Move to Project Folder

```bash
cd employee-management-system
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create Environment Variables

Create a `.env` file in the root folder and add:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
```

### 5. Run the Server

For Production:

```bash
npm start
```

For Development:

```bash
npm run dev
```

---

## API Endpoints

### 1. Add Employee

**Method:** `POST`

```http
POST /api/employees/add
```

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "mobileNumber": 9876543210
}
```

---

### 2. Get All Employees

**Method:** `GET`

```http
GET /api/employees/getAllEmployees
```

---

### 3. Get Employee By ID

**Method:** `GET`

```http
GET /api/employees/:id
```

---

### 4. Update Employee

**Method:** `PATCH`

```http
PATCH /api/employees/:id
```

### Request Body

```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

---

### 5. Delete Employee

**Method:** `DELETE`

```http
DELETE /api/employees/:id
```

---

## Employee Schema

```js
{
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobileNumber: {
    type: Number,
    required: true
  }
}
```

---

## Postman API Testing

### Add Employee API

![Add Employee]
(c:\Users\CHARMEE PANELIYA\Pictures\Screenshots\Screenshot 2026-05-21 112158.png),
c:\Users\CHARMEE PANELIYA\Pictures\Screenshots\Screenshot 2026-05-21 112402.png

### Get All Employees API

![Get All Employees]
(c:\Users\CHARMEE PANELIYA\Pictures\Screenshots\Screenshot 2026-05-21 112649.png)

### Update Employee API

![Update Employee](./images/update-employee.png)

### Delete Employee API

![Delete Employee]
(c:\Users\CHARMEE PANELIYA\Pictures\Screenshots\Screenshot 2026-05-21 112731.png)

### Delete All Employee API

![Delete Employee]
(c:\Users\CHARMEE PANELIYA\Pictures\Screenshots\Screenshot 2026-05-21 112816.png)



---

## Future Improvements

- Employee Search Feature  
- Pagination  
- Authentication & Authorization  
- Frontend Integration  

---

## Author

**Charmee Paneliya**

GitHub:[ your-github-link](https://github.com/charmeepaneliya)