Magnus
Magnus is a full-stack web application built with Next.js, MongoDB, and Prisma. This project was developed as a task-based real-world application, implementing complete CRUD operations and additional functional modules.

🚀 Getting Started
Clone the repository and install dependencies:

bash
Copy
Edit
git clone https://github.com/webkhal/magnus.git
cd magnus
npm install
Run the development server:

bash
Copy
Edit
npm run dev
Open http://localhost:3000 in your browser to see the application.

🛠️ Tech Stack
Frontend: Next.js (App Router), React

Backend: API Routes, Prisma ORM

Database: MongoDB

Auth: NextAuth.js (Email/Password, Google OAuth)

Styling: CSS Modules / Inline Styling (as per project need)

Hosting: Vercel

✨ Features
✅ Core Functionalities
🔐 User Authentication (Register, Login, Forgot/Reset Password with OTP)

📋 Employee Management System:

Create, Read, Update, Delete employee records

Form validation and error handling

🗂️ Master Data Management:

Predefined Country, State, and City dropdowns using seeded data via Prisma

🔎 Employee Search with filters

🛒 Simple Cart System (for extended modules)

🖼️ Image Uploading using Prisma and MongoDB

🎨 Typing animation and responsive UI for greeting page

🧪 Sample Pages
/employee/create – Create Employee Form

/employee/search – Search and filter employees

/reset-password – Reset password via OTP

/login and /register – Authentication pages

/dashboard – Protected area post-login

📦 Deployment
This project is deployed on Vercel. To deploy your own:

Push your code to GitHub

Go to vercel.com and import your repo

Set up environment variables (MongoDB URI, Auth secrets, etc.)

Deploy 🚀

📚 Learn More
Next.js Documentation

Prisma Documentation

MongoDB Docs

Vercel Deployment

🙌 Acknowledgements
This project was built as part of a real-time development task to showcase full-stack development skills with real-world scenarios.

