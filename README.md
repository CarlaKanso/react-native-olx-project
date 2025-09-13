# OLX Classifieds - React Native App

A React Native application that replicates key features of the OLX classifieds platform, built as a technical assessment project.

## Features

### Core Functionality
- **Login/Logout System**: Optional authentication with demo credentials
- **Home Screen**: Categories, featured ads, and recent listings
- **Search Screen**: Advanced filtering by title, price, location, and category
- **Ad Details Screen**: Complete ad information with seller contact options
- **Internationalization**: Support for English and Arabic languages

### Technical Features
- **React Navigation**: Stack and tab navigation
- **Static Data**: Promise-based data loading with simulated delays
- **Responsive Design**: OLX-inspired UI with proper styling
- **TypeScript**: Type-safe implementation
- **Context API**: User authentication and language management

## Architecture

### Project Structure
```
src/
├── components/         # Reusable UI components
│   ├── AdCard.tsx
│   ├── CategoryCard.tsx
│   └── LanguageSwitcher.tsx
├── screens/           # Screen components
│   ├── HomeScreen.tsx
│   ├── SearchScreen.tsx
│   ├── LoginScreen.tsx
│   ├── AdDetailsScreen.tsx
│   └── ProfileScreen.tsx
├── data/              # Static data and API simulation
│   └── staticData.ts
├── types/             # TypeScript type definitions
│   └── index.ts
├── utils/             # Context providers and utilities
│   ├── AuthContext.tsx
│   └── LanguageContext.tsx
├── i18n/              # Internationalization
│   ├── index.ts
│   └── locales/
│       ├── en.json
│       └── ar.json
└── App.tsx           # Main application component
```

### Key Technologies
- **React Native**: 0.72.6
- **React Navigation**: v6 (Stack & Bottom Tabs)
- **TypeScript**: Type safety and better development experience
- **i18next**: Internationalization with English and Arabic support
- **Context API**: State management for authentication and language

## Demo Data

### Login Credentials
- Username: `olx_usr1`
- Password: `olx_pass`

### Categories
- Mobile Phones
- Cars
- Apartments
- Electronics
- Furniture
- Fashion

### Locations
- Beirut
- Tripoli
- Sidon
- Tyre
- Jounieh
- Zahle

### Sample Ads
The app includes 10+ sample ads across different categories including:
- iPhone 14 Pro Max
- BMW X5 2020
- Samsung Galaxy S23 Ultra
- Toyota Camry 2019
- Apartments in Achrafieh and Hamra
- Electronics and more

## Features Implementation

### Authentication
- Optional login system (app works without authentication)
- Demo credentials provided
- Context-based state management
- Persistent login state during app session

### Home Screen
- Search bar with navigation to search screen
- Horizontal category carousel
- Featured ads section
- Recent ads grid layout
- Pull-to-refresh functionality

### Search Screen
- Real-time text search across titles, descriptions, categories, and locations
- Advanced filtering modal with:
  - Category selection
  - Location filtering
  - Price range inputs
  - Sort options (newest, price low-to-high, price high-to-low)
- Results counter and clear filters option

### Ad Details Screen
- Image gallery with pagination indicator
- Complete ad information (price, title, description, location, category)
- Seller contact information
- Call and WhatsApp integration
- Share functionality
- Safety tips section
- Featured badge for promoted ads

### Internationalization
- English and Arabic language support
- Language switcher in profile screen
- RTL layout support for Arabic
- Translated static content
- Dynamic ad content in both languages

### Design
- OLX-inspired color scheme (#002f34 primary)
- Consistent spacing and typography
- Shadow effects and modern card layouts
- Responsive design for different screen sizes
- Loading states and empty states

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd olx-classifieds
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the application**
   
   For Android:
   ```bash
   npm run android
   ```
   
   For iOS:
   ```bash
   npm run ios
   ```

## Development

### Start Metro bundler
```bash
npm start
```

### Run tests
```bash
npm test
```

### Lint code
```bash
npm run lint
```

## Implementation Notes

### Data Loading
- All data is static and loaded via JavaScript Promises
- Simulated loading delays for realistic UX
- Error handling for failed data loads

### Navigation
- Stack navigator for main screens
- Bottom tab navigator for primary sections
- Proper parameter passing between screens

### State Management
- React Context for authentication state
- React Context for language preferences
- Local component state for UI interactions

### Styling
- StyleSheet API for performance
- Consistent design tokens
- Responsive layouts
- Platform-specific adjustments where needed

## Assessment Criteria Addressed

### Code Organization
- Clear folder structure with separation of concerns
- Reusable components for consistent UI
- Proper abstraction of data and business logic

### Readability
- TypeScript for type safety
- Consistent naming conventions
- Clear component interfaces
- Comprehensive commenting where needed

### Architectural Decisions
- Context API for global state management
- Component composition for reusability
- Proper separation between presentation and business logic
- Scalable folder structure

### Technologies Used
- Modern React Native with functional components and hooks
- React Navigation for industry-standard navigation
- TypeScript for better development experience
- i18next for professional internationalization

## Future Enhancements

If this were a production application, potential improvements could include:

- Real API integration
- Image caching and optimization
- Push notifications
- Offline support
- User registration and profile management
- Ad posting functionality
- Favorites and saved searches
- Chat/messaging system
- Payment integration
- Location-based services
- Advanced search with filters
- Performance optimizations

## License

This project is created for technical assessment purposes.