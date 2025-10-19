# **Mini E-Commerce Website**

## **Overview**
This is a mini e-commerce website built using **JavaScript**, **EJS**, and **CSS**.  
It includes both an **Admin side** and a **User side**, with user authentication and a simple shopping experience.

## **Features**
- **Authentication**
  - User **Signup** and **Login**
  
- **Admin Side**
  - Add, edit, and delete products  
  - Manage product details stored in MongoDB  

- **User Side**
  - Browse available products  
  - Add products to cart  
  - View and manage cart items  

- **Database**
  - Data stored and managed using **MongoDB Compass**  

## **Tech Stack**
- **Frontend:** EJS, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Compass)  

## **Setup Instructions**
1. Clone the repository  
   ```
   git clone https://github.com/chitrabhanub/mini-ecommerce.git
   ```
2. Navigate to the project folder  
   ```
   cd mini-ecommerce
   ```
3. Install dependencies  
   ```
   npm install
   ```
4. Add your **.env** file with MongoDB connection string and JWT secret (example below):  
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
5. Start the server  
   ```
   npm start
   ```
6. Open your browser and visit  
   ```
   http://localhost:5000
   ```

## **Project Structure**
```
mini-ecommerce/
│
├── models/          # Mongoose models (User, Product, etc.)
├── routes/          # Express routes for users & admins
├── views/           # EJS templates
├── public/          # CSS and assets
├── app.js           # Main server file
├── package.json     
└── .env             # Environment variables (not pushed to GitHub)
```

## **Demo**
A screen recording of the working project is available on YouTube:  
👉 [Watch the Demo](https://youtu.be/uMGwoHKr-GE)


## **Future Enhancements**
- Add product search and filtering  
- Integrate payment gateway  
- Improve admin analytics dashboard  

## **Author**
Developed by **Chitrabhanu**
