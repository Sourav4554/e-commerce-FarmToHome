# 🌾 FarmToHome - HyperLocal Farmer first agricultural marketplace

## 📌 Overview

FarmToHome is a full-fledged multi-role e-commerce platform that directly connects local farmers (vendors) with customers. It provides a seamless shopping experience with features like JWT & Google OAuth 2.0 authentication, vendor approval workflows, product management, secure payments, shopping cart, location-based vendor discovery, and real-time order tracking.

---

## 🚀 Features

- 🛒 **Product Listings** — Browse fresh farm products with pagination and category filtering.
- 🔍 **Search & Filtering** — Find products and vendors by district, panchayath, and ward.
- 📍 **Nearby Vendor Discovery** — Location-aware vendor listing based on district/panchayath/ward.
- 🏢 **Multi-Role System** — Separate dashboards for Customers, Vendors (Farmers), and Admins.
- 🔐 **JWT Authentication** — Secure, HTTP-only cookie-based JWT auth for all roles.
- 🌐 **Google OAuth 2.0** — Sign up/login using Google with a guided profile completion flow.
- ✅ **Vendor Approval Workflow** — Vendors register and await admin approval before listing products.
- 🛕 **Shopping Cart & Checkout** — Add, update, and remove items with real-time quantity control.
- 💳 **Payment Integration** — Cash on Delivery and secure online payments via Razorpay.
- 🔏 **Signature-based Payment Verification** — HMAC SHA-256 verification for Razorpay transactions.
- 📦 **Order Management** — Customers track orders through a multi-stage status pipeline.
- 🧾 **Vendor Order View** — Vendors see only their own items within aggregated orders.
- 🚫 **Admin Controls** — Block/unblock customers, approve/disable vendor accounts, manage all orders.
- 🖼️ **Cloudinary Signed URL Uploads** — Secure, server-signed image uploads directly to Cloudinary.
- 🗃️ **Stock Management** — Product stock is automatically decremented on successful orders.
- 🛡️ **Input Validation & Rate Limiting** — express-validator + express-rate-limit for security.
- 📱 **Responsive Design** — Fully responsive UI built with Tailwind CSS for all screen sizes.

---

## 🧰 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js (Vite) | UI framework |
| Tailwind CSS v4 | Styling |
| React Router DOM v7 | Navigation & routing |
| Axios | API requests |
| Lucide React | Icons |
| React Hot Toast | Notifications |
| React Icons | Icon library |
| Browser Image Compression | Client-side image optimization |

### Backend (Node.js & Express.js)
| Technology | Purpose |
|---|---|
| Express.js v5 | Server framework |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Token (JWT) | Authentication |
| Passport.js + Google OAuth 2.0 | Google authentication |
| Razorpay | Payment processing |
| Cloudinary | Image storage & signed URL generation |
| Bcrypt | Password hashing |
| express-validator | Input validation |
| express-rate-limit | API rate limiting |
| Cookie Parser | HTTP-only cookie management |
| Dotenv | Environment variable management |

---

## 🗂️ Project Structure

```
e-commerce-FarmToHome/
├── Frontend/
│   └── src/
│       ├── admin/              # Admin pages & components
│       ├── customer/           # Customer pages & components
│       ├── vendor/             # Vendor pages & components
│       ├── context/            # React Context (Auth, Cart, Order, Product)
│       ├── hooks/              # Custom hooks per role
│       ├── layouts/            # Route layout wrappers
│       ├── routes/             # Protected & role-based routes
│       ├── services/           # Axios API service functions
│       └── utilities/          # Cloudinary upload, image validation
│
└── Server/
    ├── Config/                 # DB, Cloudinary, Passport, Razorpay config
    ├── Controllers/            # Route handler controllers
    ├── Middlewares/
    │   └── Validators/         # express-validator schemas
    ├── Models/                 # Mongoose schemas (User, Product, Cart, Order)
    ├── Routes/                 # Express routers
    ├── Services/               # Business logic layer
    └── Utilities/              # AppError class, JWT helper
```

---

## ⚙️ API Endpoints

### 🔑 Authentication — `/api/v1/auth`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | User login |
| POST | `/logout` | Logout (clears cookie) |
| GET | `/google` | Initiate Google OAuth |
| GET | `/google/callback` | Google OAuth callback |
| PATCH | `/completeprofile` | Complete profile after Google sign-in |

### 👤 User — `/api/v1/user`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/me` | Fetch current logged-in user | Auth |
| PATCH | `/update` | Update profile | Auth |
| DELETE | `/delete` | Delete account | Auth |
| GET | `/fetch` | Fetch all customers | Admin |
| GET | `/fetch-vendor` | Fetch nearby vendors by location | Auth |

### 🌾 Vendor — `/api/v1/vendor`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/fetch` | Fetch all approved vendors |
| GET | `/fetch-filters` | Fetch distinct districts, panchayaths & wards |
| GET | `/filter` | Filter vendors by location |
| GET | `/fetchvendor-details/:id` | Fetch individual vendor details |

### 🥬 Product — `/api/v1/product`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/signed-url` | Generate Cloudinary signed upload URL | Vendor |
| POST | `/addproduct` | Add a new product | Vendor |
| GET | `/fetch-product` | Fetch vendor's own products | Vendor |
| DELETE | `/delete-product/:id` | Delete a product | Vendor |
| PATCH | `/update-product/:id` | Update product details | Vendor |
| GET | `/fetch-products` | Fetch paginated products for customers | Public |
| GET | `/product-display/:id` | Fetch single product details | Public |
| GET | `/search-product/:id` | Search product by ID | Customer |
| GET | `/count-stock` | Get vendor stock count | Vendor |
| GET | `/vendor-products/:id` | Fetch products by vendor | Public |

### 🛒 Cart — `/api/v1/cart`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/addcart` | Add item to cart | Customer |
| DELETE | `/removecart` | Remove item from cart | Customer |
| GET | `/fetch` | Fetch cart contents | Customer |
| DELETE | `/clear` | Clear entire cart | Customer |

### 📦 Order — `/api/v1/order`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/cod` | Place a Cash on Delivery order | Customer |
| POST | `/online` | Place an online Razorpay order | Customer |
| POST | `/verify-payment` | Verify Razorpay payment signature | Customer |
| GET | `/customer-order` | Fetch customer's orders | Customer |
| GET | `/vendor-order` | Fetch vendor's order items | Vendor |

### 🛡️ Admin — `/api/v1/admin`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/pending-request` | Fetch pending vendor approval requests |
| PATCH | `/approve-request/:id` | Approve a vendor |
| PATCH | `/disable-account/:id` | Disable a vendor account |
| PATCH | `/block-customer/:id` | Block a customer |
| PATCH | `/unblock-customer/:id` | Unblock a customer |
| GET | `/fetch-vendors` | Fetch all vendors |
| GET | `/fetch-orders` | Fetch all orders |
| PATCH | `/update-status/:id` | Update order delivery status |

**Total Endpoints — 37**

---

## 📊 Order Status Pipeline

```
placed → confirmed → collecting → packed → out_for_delivery → delivered
                                                             ↘ cancelled
```

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/e-commerce-FarmToHome.git
cd e-commerce-FarmToHome
```

### 2️⃣ Backend Setup
```bash
cd Server
npm install
npm run dev
```

Create a `.env` file inside the `Server/` folder:
```env
PORT=3000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTENDURL=http://localhost:5173

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

NODE_ENV=development
```

### 3️⃣ Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

Create a `.env` file inside the `Frontend/` folder:
```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

## 🔐 Authentication Flow

### Local Auth
1. User registers with name, email, and password → password hashed with Bcrypt → stored in MongoDB.
2. On login, JWT is generated and sent as an **HTTP-only cookie** (secure in production).
3. All protected routes verify the cookie via `authMiddleware`.

### Google OAuth 2.0
1. User initiates Google login → redirected to Google consent screen.
2. On callback, Passport.js authenticates the user and returns a JWT cookie.
3. If the profile is incomplete (new Google users), the user is redirected to `/complete-profile`.
4. After completing their profile (including selecting a role), a refreshed JWT is issued.

---

## 👥 Role-Based Access

| Feature | Customer | Vendor | Admin |
|---|:---:|:---:|:---:|
| Browse & search products | ✅ | ✅ | ✅ |
| Add to cart & checkout | ✅ | ❌ | ❌ |
| Place COD & online orders | ✅ | ❌ | ❌ |
| View own orders | ✅ | ❌ | ❌ |
| View vendor's order items | ❌ | ✅ | ❌ |
| Add / edit / delete products | ❌ | ✅ | ❌ |
| Upload product images | ❌ | ✅ | ❌ |
| Approve / disable vendors | ❌ | ❌ | ✅ |
| Block / unblock customers | ❌ | ❌ | ✅ |
| Manage all orders | ❌ | ❌ | ✅ |

> ⚠️ Vendors must be **approved by an admin** before they can list products.

---

## 📚 References & Documentation

| Topic | Resource |
|---|---|
| JWT Authentication | [JWT Explained — dev.to](https://dev.to/jaypmedia/jwt-explained-in-4-minutes-with-visuals-g3n) |
| Razorpay Payment Integration | [Razorpay in MERN — dev.to](https://dev.to/alimalim77/integrating-payment-gateways-in-mern-applications-482k) |
| Google OAuth with MERN | [Google OAuth Guide — medium.com](https://medium.com/@dugar_rishab/how-to-use-google-oauth-with-mern-stack-a988947e64f4) |
| Cloudinary Image Uploads | [Multer + Cloudinary — medium.com](https://medium.com/@joeeasy_/uploading-images-to-cloudinary-using-multer-and-expressjs-f0b9a4e14c54) |

---

## 📄 License

This project is licensed under the **ISC License**.