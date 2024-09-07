# Camping Shop

This project is a full-stack application for an online camping shop built with React, TypeScript, and Vite. It features a user-friendly interface, robust product management, and a seamless shopping experience.

## Live link
## Live link
[https://camping-frontend-nine.vercel.app](https://camping-frontend-nine.vercel.app) 


## Features

- **Product Listing:** Browse a wide range of camping gear, including tents, sleeping bags, backpacks, and more.
- **Product Details:** View detailed information about each product, including images, descriptions, and reviews.
- **Shopping Cart:** Add items to your cart, adjust quantities, and proceed to checkout.
- **Wishlist:** Save items you like for later purchase.
- **User Authentication:** Create an account or log in to manage your orders, wishlist, and profile.
- **Order Tracking:** Track the status of your orders.
- **Product Management:** Admin users can add, edit, and delete products, manage categories, and update inventory.

## Technologies Used

- **Frontend:**
    - React
    - TypeScript
    - Vite
    - Tailwind CSS
    - React Router DOM
    - Redux Toolkit
    - React Hook Form
    - Zod
    - Lucide Icons
    - Radix UI
    - Framer Motion
    - React Image Magnify
    - React Modal Video
    - React Rating
    - React Dropzone
    - Embla Carousel
- **Backend:**
    - Node.js
    - Express
    - MongoDB
    - Mongoose

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/camping-shop.git
   ```

2. **Install dependencies:**
   ```bash
   cd camping-shop
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open [http://localhost:5173/](http://localhost:5173/) in your browser.

## Project Structure

camping-shop/
├── src/
│ ├── components/
│ │ ├── AboutUs/
│ │ │ ├── Contact.tsx
│ │ │ └── Mission.tsx
│ │ ├── Home/
│ │ │ ├── Testimonials.tsx
│ │ │ └── Hero.tsx
│ │ ├── Product/
│ │ │ ├── ProductCard.tsx
│ │ │ ├── ProductDetails.tsx
│ │ │ └── ProductSlider.tsx
│ │ ├── Cart/
│ │ │ ├── CartItem.tsx
│ │ │ └── CartPage.tsx
│ │ ├── Wishlist/
│ │ │ ├── WishListDropdown.tsx
│ │ │ └── WishListItem.tsx
│ │ ├── Navigation/
│ │ │ ├── MobileNavbar.tsx
│ │ │ └── Navbar.tsx
│ │ ├── UI/
│ │ │ ├── button.tsx
│ │ │ ├── navigation-menu.tsx
│ │ │ └── input.tsx
│ │ ├── ProductManagement/
│ │ │ ├── UpdateForm.tsx
│ │ │ └── CreateForm.tsx
│ │ └── ReloadModal.tsx
│ ├── redux/
│ │ ├── store.ts
│ │ ├── api/
│ │ │ ├── baseApi.ts
│ │ │ └── authApi.ts
│ │ ├── slices/
│ │ │ ├── cartSlice.ts
│ │ │ └── authSlice.ts
│ ├── router/
│ │ └── index.tsx
│ ├── App.css
│ ├── index.css
│ ├── main.tsx
│ ├── assets/
│ │ ├── tent.png
│ │ └── react.svg
│ ├── types/
│ │ └── type.ts
│ ├── lib/
│ │ └── utils.ts
│ ├── tailwind.config.js
│ ├── postcss.config.js
│ ├── vite.config.ts
│ └── tsconfig.json
├── package.json
├── .gitignore
├── public/
│ └── vite.svg
├── components.json
├── test.txt
└── package-lock.json


## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.