
# BookShelf - Where true reading happens

## Overview

BookShelf is a full-stack book review application built using **React** for the frontend and **Node.js with Express** for the backend. The application allows users to browse books, read reviews, submit their own reviews, and manage user profiles.

## Features

### Frontend (React)

-   **Home Page:** Displays featured books.
-   **Book Listing Page:** Search and filter functionality for books.
-   **Individual Book Page:** Displays detailed book information along with user reviews.
-   **User Profile Page:** Users can view and update their profiles.
-   **Review Submission Form:** Users can submit book reviews.
-   **State Management:** Implemented using React Context.
-   **Navigation:** Handled using React Router.
-   **API Integration:** Fetches and sends data to the backend API.
-   **Error Handling:** Displays meaningful error messages and loading states.

### Backend (Node.js, Express, SQL/MongoDB)

-   **RESTful API with the following endpoints:**
    -   `GET /books` - Retrieve all books 
    -   `GET /books/:id` - Retrieve details of a specific book
    -   `POST /books` - Add a new book (Admin only)
    -   `GET /reviews` - Retrieve reviews for a book
    -   `POST /reviews` - Submit a new review
    -   `GET /users/:id` - Retrieve user profile
    -   `PUT /users/:id` - Update user profile
    - 
-   **Data Validation:** Ensures valid data input for security and consistency.
-   **Error Handling:** Implements proper error messages and status codes.
-   **Database:** Uses SQL (PostgreSQL/MySQL) or MongoDB for storing book and review data.

## Setup Instructions

### Prerequisites

-   **Node.js** (latest stable version)
-   **npm** or **yarn**
-   **MongoDB/PostgreSQL** (for database storage)
-   **Git** (optional, for cloning the repository)

### Backend Setup

1.  Clone the repository:
    
    ```sh
    https://github.com/Anilcodes01/Shelf.git
    cd shelf/backend
    
    ```
    
2.  Install dependencies:
    
    ```sh
    npm install
    
    ```
    
3.  Configure environment variables:
    -   Create a `.env` file in the backend directory.
    -   Add the following variables:
        
        ```env
        PORT=5000
        MONGODB_URI=mongodb://localhost:27017/bookreviewapp (if using MongoDB)
        JWT_SECRET=your_secret_key
        
        ```
        
4.  Start the backend server:
    
    ```sh
    node src/app.js
    
    ```
    

### Frontend Setup

1.  Navigate to the frontend directory:
    
    ```sh
    cd ../frontend
    
    ```
    
2.  Install dependencies:
    
    ```sh
    npm install
    
    ```
    
3.  Start the React application:
    
    ```sh
    npm run dev
    
    ```
    
4.  Open [http://localhost:5173](http://localhost:3000/) in your browser to view the app.

## Additional Notes

-   Ensure that MongoDB/PostgreSQL is running before starting the backend.
-   Use **Postman** or **Insomnia** to test API endpoints.
-   Implement authentication for admin routes if required.

## License

This project is open-source and available under the **MIT License**.

----------

Happy Coding! 🚀
