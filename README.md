# PlaySphere

A comprehensive cross-platform mobile gaming discovery and management application built with React Native. PlaySphere serves as a personal gaming library where users can discover, track, and organize their favorite games with advanced filtering, search capabilities, and personalized collections.

## 📱 Project Description

PlaySphere is a feature-rich mobile application that allows gamers to:

- **Discover Games**: Browse popular, trending, and new game releases with comprehensive game details
- **Manage Library**: Track and organize personal game collections with custom status tracking
- **Create Collections**: Build personalized game collections with full CRUD functionality
- **Advanced Search**: Filter games by platforms, genres, ratings, and release dates
- **Rich Media**: View high-quality screenshots, video trailers, and detailed game information
- **User Authentication**: Secure login and registration with personalized user profiles

## 🖼️ Images

| Login Scree | Home Screen | Drawer | Game Details | Game Details |
| --- | --- | --- | --- | --- |
| <img src="https://github.com/AkshatGKMit/PlaySphere/blob/main/screenshots/login.jpg?raw=true" alt="Login Screen" height="300"> | <img src="https://github.com/AkshatGKMit/PlaySphere/blob/main/screenshots/home-screen.jpg?raw=true" alt="Home Screen" height="300" width="135"> | <img src="https://github.com/AkshatGKMit/PlaySphere/blob/main/screenshots/drawer.jpg?raw=true" alt="Drawer" height="300" width="135"> | <img src="https://github.com/AkshatGKMit/PlaySphere/blob/main/screenshots/game-details.jpg?raw=true" alt="Game Details" height="300" width="135"> | <img src="https://github.com/AkshatGKMit/PlaySphere/blob/main/screenshots/game-details-video.jpg?raw=true" alt="Game Details Screen" height="300" width="135"> |

| Collections | Collection Details |
| --- | --- |
| <img src="https://github.com/AkshatGKMit/PlaySphere/blob/main/screenshots/collections.jpg?raw=true" alt="Collections Screen" height="300" width="135"> | <img src="https://github.com/AkshatGKMit/PlaySphere/blob/main/screenshots/collection-details.jpg?raw=true" alt="Collection Details" height="300" width="135"> |

## 🏗️ Architecture

PlaySphere follows a modern, scalable architecture pattern:

### **State Management Architecture**

- **Redux Toolkit**: Global application state management for user data, authentication, and UI state
- **TanStack React Query**: Server state management, data caching, and synchronization with the RAWG.io API
- **Async Storage/MMKV**: Local data persistence for offline support and user preferences

### **Navigation Architecture**

- **React Navigation 6**: Native stack navigation for seamless screen transitions and deep linking support

### **Code Organization**

- **Component-Based Architecture**: Modular React components with clear separation of concerns
- **Type-Safe Development**: Comprehensive TypeScript implementation for type safety
- **Custom API Abstraction Layer**: Centralized API communication with error handling

### **Platform Architecture**

- **Cross-Platform**: Single codebase for iOS and Android using React Native
- **Native Modules**: Platform-specific optimizations for iOS (CocoaPods) and Android (Gradle)

## 📚 Libraries Used

### **Core Framework**

- **React Native 0.76.5** - Cross-platform mobile development framework
- **React 18.3.1** - UI library for building component-based interfaces
- **TypeScript 5.0.4** - Type-safe development language

### **State Management**

- **Redux Toolkit 2.4.0** - Global state management
- **TanStack React Query 5.62.3** - Server state management, caching, and data synchronization
- **Async Storage** - Local data persistence
- **MMKV 3.2.0** - Fast key-value storage
- **TanStack Query Persist** - Query result caching

### **Navigation**

- **React Navigation 6** - Native stack navigation for screen transitions

### **Networking**

- **Axios 1.7.7** - HTTP client for RESTful API communication

### **UI/UX Libraries**

- **React Native Reanimated 3.16.1** - Smooth animations and transitions
- **React Native Fast Image 8.6.3** - Optimized image loading and caching
- **React Native Linear Gradient 2.8.3** - Beautiful gradient effects
- **React Native Vector Icons 10.2.0** - Comprehensive icon library
- **React Native Blur** - Visual blur effects
- **React Native Video 6.8.2** - Video playback for game trailers

### **Development Tools**

- **Jest & React Testing Library** - Unit and integration testing
- **ESLint & Prettier** - Code quality and formatting
- **Babel** - JavaScript transpilation
- **Metro Bundler** - React Native bundler

### **Styling & Theming**

- Custom theming system with light/dark mode support
- Responsive design with safe area context
- Platform-specific styling adaptations

## 🔌 API Used

### **RAWG.io API**

PlaySphere integrates with the **RAWG.io API** (https://rawg.io/apidocs) to provide:

- **Game Database**: Access to a vast database of games across multiple platforms
- **Game Details**: Comprehensive game information including:
  - Game metadata (title, description, release date, ratings)
  - Screenshots and artwork
  - Video trailers
  - Platform availability (PC, PlayStation, Xbox, Nintendo, etc.)
  - Genres, tags, and categories
- **Search & Filtering**: Advanced search capabilities with filtering by:
  - Platforms (PC, PlayStation, Xbox, Nintendo, etc.)
  - Genres and tags
  - Ratings and release dates
  - Popularity and trending games
- **Game Discovery**: Access to popular, trending, and newly released games

### **API Integration Features**

- Custom API abstraction layer with centralized error handling
- Efficient data fetching with React Query caching
- Offline support with local data persistence
- Optimized network requests with Axios

## 🚀 Features

- ✅ **Game Discovery & Search**: Browse and search games with advanced filtering
- ✅ **Personal Gaming Library**: Manage and track your game collection
- ✅ **Custom Collections**: Create, edit, and organize personalized game collections
- ✅ **User Authentication**: Secure login and registration system
- ✅ **Rich Media Experience**: View screenshots, trailers, and detailed game information
- ✅ **Advanced Filtering**: Filter by platforms, genres, ratings, and release dates
- ✅ **Offline Support**: Local caching and persistence for offline access
- ✅ **Dark/Light Mode**: Theme support for user preferences
- ✅ **Cross-Platform**: Works on both iOS and Android

## 🛠️ Installation

<!-- Add installation instructions here -->
<!-- Example: -->
<!-- 1. Clone the repository -->
<!-- 2. Install dependencies: `npm install` -->
<!-- 3. Run on iOS: `npx react-native run-ios` -->
<!-- 4. Run on Android: `npx react-native run-android` -->

## 📄 License

<!-- Add your license here -->

## 👤 Author

<!-- Add your name and contact information here -->

---

**Note**: This project demonstrates proficiency in full-stack mobile development, modern React patterns, state management, API integration, and best practices in software engineering.
