# Chat Screen React Native Application

A cross-platform mobile chat application built with React Native that replicates the UI design shown in the assignment. The app features infinite scrolling, real-time chat interface, and works seamlessly on both Android and iOS devices.

## 📱 Screencast

![Chat Screen](./ScreenCast.gif)

The screencast demonstrates:
- App launching on device
- Chat interface with messages
- Infinite scrolling functionality
- Smooth animations and transitions

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/chat-app-react-native.git
   cd chat-app-react-native
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

## 🏃‍♂️ Running the Application

### Android
```bash
# Start Metro bundler
npx react-native start

# Run on Android (in a new terminal)
npx react-native run-android
```

### iOS (macOS only)
```bash
# Start Metro bundler
npx react-native start

# Run on iOS (in a new terminal)
npx react-native run-ios
```

## 📡 API Integration

The application uses the following API endpoint to fetch chat messages:

```
GET https://qa.corider.in/assignment/chat?page=0
```

### API Parameters
- `page`: Page number for pagination (starts from 0)



## 🎯 Key Implementation Details

### Infinite Scrolling
- Implemented using `FlatList` with `onEndReached` prop
- Automatically loads older messages when scrolled to the top
- Includes loading indicators for better UX

### Chat UI Components
- **ChatHeader**: Displays trip information and member details
- **ChatMessage**: Individual message component with avatar and timestamp
- **MessageInput**: Bottom input field for typing messages

### State Management
- Uses React hooks (`useState`, `useEffect`) for local state management
- Manages chat messages, loading states, and pagination

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

## 📦 Building for Production

### Android APK
```bash
cd android
./gradlew assembleRelease
```

### iOS Archive (macOS only)
```bash
npx react-native run-ios --configuration Release
```


## 📧 Contact

Project Link: [https://github.com/yash2974/coRider-Assignment](https://github.com/yash2974/coRider-Assignment)


**Note**: This application was developed as part of a technical assignment.