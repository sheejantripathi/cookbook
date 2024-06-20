Cookbook Web Application
Welcome to the Cookbook Web Application! This is a full-stack web application built using PHP (Laravel) for the backend, React for the frontend, and MySQL as the database. The application allows users to create, view, edit, and delete recipes, along with a powerful search feature based on ingredients.

Features
User Authentication: Secure login system using Google OAuth.
Recipe Listing: Display all recipes posted by users on the homepage.
Search Functionality: Search recipes based on a specific ingredient.
CRUD Operations:
Create: Add new recipes.
Read: List all recipes.
Update: Edit existing recipes.
Delete: Remove recipes.
Technologies Used
Backend: PHP (Laravel)
Frontend: React
Database: MySQL
OAuth: Google OAuth for user authentication
Installation and Setup
Prerequisites
Before you begin, ensure you have met the following requirements:

PHP >= 7.3
Composer
Node.js and npm
MySQL
Git
Ngrok (for local tunneling)
Backend Setup
Clone the repository

sh
Copy code
git clone https://github.com/yourusername/cookbook-app.git
cd cookbook-app
Install dependencies

sh
Copy code
composer install
Environment setup

Copy .env.example to .env and configure your database and other environment variables.

sh
Copy code
cp .env.example .env
Generate application key

sh
Copy code
php artisan key:generate
Run migrations

sh
Copy code
php artisan migrate
Start the backend server

sh
Copy code
php artisan serve
Frontend Setup
Navigate to the frontend directory

sh
Copy code
cd frontend
Install dependencies

sh
Copy code
npm install
Start the frontend server

sh
Copy code
npm start
Setting Up Ngrok
Install Ngrok

Follow the instructions on the Ngrok website to download and install Ngrok.

Start Ngrok

sh
Copy code
ngrok http 8000
Update your .env file

Set the APP_URL to the forwarding address provided by Ngrok.

env
Copy code
APP_URL=http://your-ngrok-url
Usage
User Authentication
Users can log in using their Google accounts. This feature is implemented using Google OAuth.

Managing Recipes
Users can add, view, edit, and delete recipes. Recipes can also be searched by ingredients.

Image Handling
Images for recipes are stored in the /storage/images directory. Ensure that the public/storage directory is properly linked to the storage/app/public directory.
