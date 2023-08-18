# E-commerce Admin Dashboard & Store

## Introduction

Welcome to my full-fledged e-commerce application with both an admin dashboard and store. This project is a simple yet powerful e-commerce platform designed to scale to many e-commerce stores. With a user-friendly interface and robust functionality, this e-commerce application is built to display the power of a tech stack centered around Next.js.

## Key Features

- **Store Management**: Create, edit, and delete individual e-commerce stores with ease. Be able to have an indefinite amount of stores, each with their own set of products to sell.

- **Product Management**: Create, edit, and delete products sold from your store. Gain the ability to add descriptors to your products such as category, color, and size.

- **E-commerce Storefront**: Have your products on display to be sold digitally leveraging the power of Stripe checkout. A sleek interface based on good UX principles will wow your customers.

- **Authentication**: Have your admin dashboard and API routes be authenticated and authorized using the power of Clerk and Next.js using a RESTful interface.

- **Image Uploading**: Create, edit, and delete images of your products with ease using the power of Cloudinary.

- **Store Analytics**: Gain insights into the productivity of your store with a small yet extensible set of intuitive charts and statistics. Track your progress and optimize your selling needs.

## Repositories

- [E-commerce Admin Dashboard Repository](https://github.com/neilgebhard/ecommerce-admin)
- [E-commerce Store Repository](https://github.com/neilgebhard/ecommerce-store)

## Demos

- [E-commerce Store](https://ecommerce-store-nine-eosin.vercel.app/)
- [E-commerce Admin Dashboard](https://ecommerce-admin-kappa-indol.vercel.app/)

## How to Use

1. **Signup/Login**: Create a new account and log in to the admin dashboard.

2. **Create a Store**: Click on "Create Store" in the navigation bar. Give your store a name.

3. **Create Products**: Click on the "Add New" button on the Products page. Provide product details, such as a name, images, price, category, size, and color.

4. **Create a Storefront**: Create an e-commerce storefront using the API routes found in your admin dashboard. Stripe configuration may be required. Use the e-commerce store repository as a blueprint.

## Technologies Used

- **Frontend**: HTML, CSS, TypeScript, React.js, Next.js, Tailwind CSS
- **Backend**: Node.js, Prisma, PlanetScale (MySQL)
- **Hosting**: Vercel
- **Payment Processing**: Stripe
- **Image Uploading**: Cloudinary
- **Authentication**: Clerk
- **Data Visualization**: Recharts

## Running Locally

1. Clone GitHub repository
2. Install dependencies
3. Run the development server

```bash
$ git clone https://github.com/neilgebhard/ecommerce-admin
$ cd ecommerce-admin
$ npm i
$ npm run dev
```

4. Create a .env.local file similar to .env.example with the required environment variables
