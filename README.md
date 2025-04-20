# EcomDash - Ecommerce Dashboard

EcomDash is a modern and responsive ecommerce dashboard built with React, Vite, and TailwindCSS. It provides a seamless shopping experience with features like product browsing, cart management, user authentication, and more.

## Features

- **Product Management**: Browse products with filtering, sorting, and search functionality.
- **Product Details**: View detailed information about each product, including ratings, stock, and descriptions.
- **Cart Management**: Add, update, and remove items from the cart with real-time price calculations.
- **User Authentication**: Log in and sign up with mock authentication.
- **Responsive Design**: Fully responsive layout for desktop and mobile devices.
- **Modern UI**: Built with TailwindCSS for a clean and modern design.

## Tech Stack

- **Frontend**: React, React Router
- **Styling**: TailwindCSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **State Management**: Context API (AuthContext, CartContext)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ecommerce-dashboard.git
   cd ecommerce-dashboard
   ```
2. Install dependencies:
    npm install

3. Start the development server:
    npm run dev

4. Open your browser and navigate to:
    http://localhost:5173

## Project Structure
```
ecommerce-dashboard/
├── src/
│   ├── components/       # Reusable components (Navbar, Footer, ProductCard, etc.)
│   ├── context/          # Context API for Auth and Cart
│   ├── data/             # Mock data for products
│   ├── pages/            # Application pages (HomePage, ProductsPage, etc.)
│   ├── styles/           # Global styles
│   ├── [App.jsx](http://_vscodecontentref_/1)           # Main application component
│   ├── [main.jsx](http://_vscodecontentref_/2)          # Entry point
├── public/               # Static assets
├── [package.json](http://_vscodecontentref_/3)          # Project dependencies and scripts
├── [vite.config.js](http://_vscodecontentref_/4)        # Vite configuration
└── [README.md](http://_vscodecontentref_/5)             # Project documentation
```