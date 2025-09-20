# 🎮 Game Club Management System

A full-stack web application for managing a gaming club with member management, game catalog, and transaction tracking.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Available-brightgreen)](https://your-demo-url.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/YOUR_USERNAME/game-club-management)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🚀 Features

- **Member Management**: Add, edit, and manage club members
- **Game Catalog**: Browse and manage available games
- **Admin Dashboard**: Complete administrative control
- **Customer Portal**: User-friendly interface for members
- **Authentication**: Login and signup functionality
- **Real-time API Testing**: Built-in API testing interface

## 🛠️ Tech Stack

### Backend
- **Java 21**
- **Spring Boot 3.3.4**
- **MongoDB** (Cloud Atlas)
- **Maven** for dependency management

### Frontend
- **React 19.1.1**
- **TypeScript**
- **Vite** for build tooling
- **React Router** for navigation
- **Axios** for API calls

## 📋 Prerequisites

- Java 21 or higher
- Node.js 18 or higher
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

## 🚀 Quick Start

### Option 1: Use the provided batch files (Windows)

1. **Start both servers at once:**
   ```bash
   start-both.bat
   ```

2. **Or start them individually:**
   ```bash
   start-backend.bat
   start-frontend.bat
   ```

### Option 2: Manual setup

#### Backend Setup
```bash
cd server/GameAPI
./mvnw spring-boot:run
```

#### Frontend Setup
```bash
cd React_client/client
npm install
npm run dev
```

## 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **API Test Page**: http://localhost:5173/test

## 🔐 Demo Credentials

### Admin Access
- **Username**: `admin`
- **Password**: `password`

### Customer Access
- **Username**: `customer`
- **Password**: `password`

## 📚 API Endpoints

### Members API
- `GET /members` - Get all members
- `POST /members` - Create a new member
- `GET /members/{id}` - Get member by ID
- `PUT /members/{id}` - Update member
- `DELETE /members/{id}` - Delete member

### Games API
- `GET /admin/games` - Get all games
- `POST /admin/games` - Create a new game
- `GET /admin/games/{id}` - Get game by ID
- `PUT /admin/games/{id}` - Update game
- `DELETE /admin/games/{id}` - Delete game

## 🎯 Features Overview

### Home Page
- Welcome interface with navigation
- Quick access to all features
- System status indicators

### Login/Signup
- Secure authentication
- Form validation
- Error handling
- Demo credentials display

### Admin Dashboard
- **Games Management**: Add, edit, delete games
- **Members Management**: Manage club members
- **Tabbed Interface**: Easy navigation between features
- **Real-time Updates**: Immediate feedback on actions

### Customer Dashboard
- **Game Browser**: View available games
- **Profile Management**: View account information
- **Account Balance**: Track member balance
- **Future Features**: Recharge and transaction history

### API Test Page
- **Connection Testing**: Verify backend connectivity
- **CRUD Operations**: Test all API endpoints
- **Real-time Results**: Live feedback on API calls
- **Data Display**: View current database state

## 🔧 Configuration

### Backend Configuration
The backend is configured in `server/GameAPI/src/main/resources/application.properties`:

```properties
# MongoDB connection
spring.data.mongodb.uri=mongodb+srv://sandesh:sandesh@cluster0.tdwyfua.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
spring.data.mongodb.database=gameapp

# Server configuration
server.port=8080

# CORS configuration
spring.web.cors.allowed-origins=http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173
```

### Frontend Configuration
The frontend API base URL is configured in `React_client/client/src/api/axios.ts`:

```typescript
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
```

## 🗂️ Project Structure

```
gameapp/
├── server/
│   └── GameAPI/
│       ├── src/main/java/com/sandesh/game_app_sdp/
│       │   ├── controller/     # REST controllers
│       │   ├── modal/         # Data models
│       │   ├── repository/    # Data repositories
│       │   ├── services/      # Business logic
│       │   ├── config/        # Configuration classes
│       │   └── exceptions/    # Custom exceptions
│       └── src/main/resources/
│           └── application.properties
├── React_client/
│   └── client/
│       ├── src/
│       │   ├── api/           # API service files
│       │   ├── component/     # React components
│       │   └── App.tsx        # Main app component
│       └── package.json
├── start-backend.bat          # Backend startup script
├── start-frontend.bat         # Frontend startup script
├── start-both.bat            # Both servers startup script
└── README.md
```

## 🧪 Testing

### API Testing
1. Navigate to http://localhost:5173/test
2. Use the test buttons to verify API connectivity
3. Check the results panel for detailed feedback

### Manual Testing
1. **Login Flow**: Test with demo credentials
2. **Admin Features**: Create/edit games and members
3. **Customer Features**: Browse games and view profile
4. **Navigation**: Test all routing and navigation

## 🐛 Troubleshooting

### Common Issues

1. **Backend won't start**:
   - Ensure Java 21 is installed
   - Check if port 8080 is available
   - Verify MongoDB connection

2. **Frontend won't start**:
   - Run `npm install` in the client directory
   - Check if port 5173 is available
   - Verify Node.js version

3. **API connection fails**:
   - Ensure backend is running on port 8080
   - Check CORS configuration
   - Use the test page to diagnose issues

4. **MongoDB connection issues**:
   - Verify MongoDB Atlas credentials
   - Check network connectivity
   - Ensure database permissions

## 🔮 Future Enhancements

- [ ] User authentication with JWT tokens
- [ ] Payment integration for game purchases
- [ ] Transaction history and reporting
- [ ] Email notifications
- [ ] Mobile responsive design improvements
- [ ] Real-time notifications
- [ ] Game rating and review system
- [ ] Inventory management
- [ ] Analytics dashboard

## 📝 Development Notes

- The application uses localStorage for demo authentication
- MongoDB Atlas is used for cloud database storage
- CORS is configured to allow frontend-backend communication
- All API endpoints include proper error handling
- The frontend includes comprehensive form validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational and demonstration purposes.

---

**Happy Gaming! 🎮**