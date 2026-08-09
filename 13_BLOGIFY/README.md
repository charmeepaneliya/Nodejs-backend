# BLOGIFY – Blog Management REST API

BLOGIFY is a secure and scalable Blog Management REST API built with
Node.js, Express.js, MongoDB, and Mongoose.

The project provides JWT authentication, Bcrypt password encryption,
Role-Based Access Control (RBAC), Joi validation, Blog CRUD operations,
Multer file uploads, Cloudinary image management, logout functionality,
and custom error handling.

---

## 🚀 Features

- User Registration & Login
- JWT Authentication
- Bcrypt Password Hashing
- Protected Routes
- Role-Based Access Control (User/Admin)
- User Account Management
- Blog CRUD Operations
- Blog Ownership Authorization
- Joi Input Validation
- Multer Image Upload
- Cloudinary Image Storage
- Logout
- Logout From All Devices
- Custom Error Handling

---

## 🛠️ Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt.js
- Joi
- Multer
- Cloudinary
- Postman

---

## 📁 Project Structure

```text
BLOGIFY/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routers/
├── validations/
├── screenshots/
├── .env
├── package.json
└── server.js
```
# 🔐 Authentication & User Management

User Registration

Creates a new user account with validated data and encrypted password.

POST /user/add

![user add](./postman_api_test_screenshots/add-user.png)

----

User Login

Authenticates the user and generates a JWT token.

![user login](./postman_api_test_screenshots/user-login.png)

----

Auth Login

Checks the currently authenticated user using the JWT Bearer token.

![auth login](./postman_api_test_screenshots/auth-login.png)

----

Update Own Account

A logged-in user can update their allowed account information.

![update user acc](./postman_api_test_screenshots/update-acc-by-user.png)

----

Delete Own Account

A logged-in user can delete their own account.

![delete acc](./postman_api_test_screenshots/delete-acc-by-user.png)

----

# 🚪 Logout

Logout From Current Device

Removes the current JWT token while keeping other active sessions.

![logout](./postman_api_test_screenshots/user-logout.png)

----

Logout From All Devices

Removes all stored JWT tokens and logs the user out from all devices.

![logout from all device](./postman_api_test_screenshots/user-logout-from-all-device.png)

----

# 📝 Blog Management

Add Blog
--

Authenticated users can create blog posts with an optional image.

![blog add](./postman_api_test_screenshots/add-blog.png)

Supports:

Title
Description
Category
Image Upload
Automatic Author Assignment

----

Get All Blogs
--

Fetches all available blogs with author information.

![getAllBlogs](./postman_api_test_screenshots/get-all-blog.png)

----

Get Blog By ID
--

Fetches a specific blog using its ID.

![GET /blog/blog/:id](./postman_api_test_screenshots/get-blog-by-id.png)

----

Update Blog
--

A user can update only their own blog.

![PATCH /blog/blog/:id](./postman_api_test_screenshots/update-blog.png)

----

Delete Blog
--

A user can delete only their own blog. The associated Cloudinary image is also removed.

![DELETE /blog/blog/:id](./postman_api_test_screenshots/delete-blog.png)

----

# 👑 Role-Based Access Control

BLOGIFY supports two roles:

   - user
   - admin

User

   - Manage own account
   - Create blogs
   - Update own blogs
   - Delete own blogs
   - Cannot access restricted admin operations

Admin

   - Manage user accounts
   - Update users
   - Delete users
   - Access administrative operations

----

Admin – Get All Users

get all user by admin

![GET /user/allUsers](./postman_api_test_screenshots/get-all-users-by-admin.png)


get-all-user-by-user

![GET /user/allUsers](./postman_api_test_screenshots/getAllUser-by-user.png)

----

Admin – Update User

user-update-by-admin

![PATCH /user/update/:id](./postman_api_test_screenshots/user-update-by-admin.png)


admin-update-by-user

![admin-update-by-user](./postman_api_test_screenshots/admin-update-by-user.png)

----

Admin – Delete User

delete-admin-acc-by-user

![DELETE /user/admin/deleteUser/:id](./postman_api_test_screenshots/delete-admin-acc-by-user.png)

delete-user-acc-by-admin

![DELETE /user/admin/deleteUser/:id](./postman_api_test_screenshots/delete-user-acc-by-admin.png)

----

# 🚫 RBAC – Forbidden Access

Unauthorized users are prevented from accessing restricted operations.

Response: 403 Forbidden

---

# ✅ Joi Validation

Joi validates incoming request data and returns meaningful validation
errors for invalid input.

----

# 🖼️ Cloudinary Image Management

Multer handles image uploads and Cloudinary provides cloud-based image
storage.

Image management is implemented for:

   - User Profile Images
   - Blog Images
   - Image Update
   - Image Delete

# 🔒 Security

BLOGIFY implements:

   - JWT-based authentication
   - Bcrypt password encryption
   - Bearer token authorization
   - Role-Based Access Control
   - Joi request validation
   - Protected API routes
   - Custom error handling
   - Logout from current device
   - Logout from all devices

---


# 🧪 API Testing

All major API functionalities were tested using Postman, including:

   - Authentication
   - User Management
   - Blog CRUD
   - RBAC
   - 403 Forbidden Access
   - Joi Validation
   - Image Upload
   - Cloudinary Integration
   - Logout
   - Logout From All Devices

---

# 👩‍💻 Developer

Charmee Paneliya

Full Stack Developer in Training

