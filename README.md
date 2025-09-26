# Hot Chips Delivery App

A full-stack food delivery application for hot chips with user authentication, cart management, and order tracking.

## Features

### Frontend (React)
- User authentication (login/register)
- Menu browsing with different chip sizes
- Shopping cart with real-time updates
- Order history tracking
- Responsive mobile-first design
- User profile management

### Backend (Node.js + Express + MongoDB)
- JWT-based authentication
- RESTful API endpoints
- MongoDB data persistence
- Cart synchronization across devices
- Order management system
- User profile management

## Technology Stack

### Frontend
- React 18
- Tailwind CSS
- Local state management (no localStorage dependency)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. **Create backend directory and install dependencies:**
```bash
mkdir hotchips-backend
cd hotchips-backend
npm init -y
npm install express mongoose cors bcryptjs jsonwebtoken dotenv
npm install -D nodemon
```

2. **Create the server files:**
- Copy the `server.js` code into your backend directory
- Copy the `package.json` for backend dependencies

3. **Environment Configuration:**
- Create a `.env` file in the backend root directory
- Copy contents from `.env.example` and update values:
```env
MONGODB_URI=mongodb://localhost:27017/hotchips
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
NODE_ENV=development
```

4. **Start MongoDB:**
- For local MongoDB: `mongod`
- For MongoDB Atlas: Use your connection string in MONGODB_URI

5. **Run the backend server:**
```bash
npm run dev  # for development with nodemon
# or
npm start    # for production
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Update your existing React app:**
- Replace your current `HotChipsApp.js` with the updated version
- Create `component/AuthComponent.js` with the authentication component
- Update your `Header.js` component

2. **Install additional dependencies (if needed):**
```bash
npm install  # if you need to install any missing dependencies
```

3. **Update API endpoints:**
Make sure your frontend is pointing to the correct backend URL (http://localhost:5000)

4. **Start the React development server:**
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Cart Management
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Update user's cart
- `DELETE /api/cart` - Clear user's cart

### Orders
- `POST /api/orders` - Place new order
- `GET /api/orders` - Get user's order history
- `GET /api/orders/:orderId` - Get specific order details

### User Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile

### Admin (Optional)
- `PUT /api/admin/orders/:orderId/status` - Update order status

## Database Schema

### Users Collection
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  phone: String (required),
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Carts Collection
```javascript
{
  userId: ObjectId (ref: User),
  items: [{
    id: String,
    name: String,
    size: String,
    price: Number,
    quantity: Number
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection
```javascript
{
  userId: ObjectId (ref: User),
  items: [CartItem],
  total: Number,
  status: String (enum: pending, confirmed, preparing, ready, delivered, cancelled),
  deliveryAddress: Object,
  paymentMethod: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Key Changes from Original App

### Frontend Changes
1. **Authentication System:** Added login/register functionality
2. **User State Management:** Tracks user login state
3. **API Integration:** All data operations now use backend APIs
4. **Cart Persistence:** Cart data is saved to database instead of localStorage
5. **Order History:** New tab to view past orders
6. **User Profile:** Header shows user info with logout option

### Backend Features
1. **User Management:** Registration, login, and profile management
2. **JWT Authentication:** Secure token-based authentication
3. **Cart Synchronization:** Cart data syncs across devices
4. **Order Processing:** Complete order management system
5. **Data Validation:** Input validation and error handling
6. **Security:** Password hashing and CORS protection

## Security Considerations

- Passwords are hashed using bcrypt with 12 salt rounds
- JWT tokens expire after 7 days
- CORS is properly configured
- Input validation on all endpoints
- Error messages don't expose sensitive information

## Testing the Application

1. **Register a new user** through the authentication form
2. **Browse the menu** and add items to cart
3. **View cart** and modify quantities
4. **Place an order** and check order history
5. **Test logout** and login with existing credentials

## Production Deployment

### Backend Deployment
1. Set production environment variables
2. Use a production MongoDB database (MongoDB Atlas recommended)
3. Generate a strong JWT secret
4. Enable HTTPS
5. Set up proper logging and monitoring

### Frontend Deployment
1. Update API endpoints to production URLs
2. Build the React app: `npm run build`
3. Deploy to hosting service (Vercel, Netlify, etc.)

## Troubleshooting

### Common Issues
1. **CORS errors:** Ensure backend CORS is properly configured
2. **MongoDB connection:** Check MongoDB is running and connection string is correct
3. **JWT errors:** Verify JWT secret is set and tokens are being sent properly
4. **Port conflicts:** Ensure ports 3000 (frontend) and 5000 (backend) are available

### Development Tips
- Use browser developer tools to monitor API calls
- Check backend console for error messages
- Verify MongoDB data using MongoDB Compass or mongo shell
- Test API endpoints using Postman or similar tools