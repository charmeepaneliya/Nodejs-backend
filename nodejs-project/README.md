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
<img width="892" height="847" alt="Screenshot 2026-05-21 112158" src="https://github.com/user-attachments/assets/a961592a-01eb-4a4f-830f-13b67f2841dc" />

<img width="1337" height="861" alt="Screenshot 2026-05-21 112402" src="https://github.com/user-attachments/assets/a85d36fd-f449-4a2b-a6ab-cc9ddf44b4c1" />


### Get All Employees API

![Get All Employees]
<img width="940" height="889" alt="Screenshot 2026-05-21 112649" src="https://github.com/user-attachments/assets/00e9d77a-405e-4f1f-aac5-ac5f51c4e398" />


### Update Employee API

<img width="896" height="826" alt="Screenshot 2026-05-21 120055" src="https://github.com/user-attachments/assets/3816ea30-c696-43c1-ac9c-1aedc37251a7" />


### Delete Employee API

![Delete Employee]
<img width="911" height="803" alt="Screenshot 2026-05-21 112731" src="https://github.com/user-attachments/assets/6ae540a5-851d-4778-a935-5945f3a6f631" />


### Delete All Employee API

![Delete Employee]
<img width="897" height="813" alt="Screenshot 2026-05-21 112816" src="https://github.com/user-attachments/assets/d77ce671-3dab-4082-911a-be53e98ae705" />

<img width="1337" height="703" alt="Screenshot 2026-05-21 112834" src="https://github.com/user-attachments/assets/882c3140-2c0f-4ac2-a8c5-c9bd5949c9e4" />





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
