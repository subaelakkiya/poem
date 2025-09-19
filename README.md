# Tamil Poetry Portfolio with Firebase

A beautiful Tamil poetry collection website with Google Firebase authentication and Firestore database integration.

## Features

- **Google Authentication**: Secure sign-in with Google accounts
- **Poetry Collection**: Browse Tamil poems with English translations
- **Reviews & Ratings**: Leave reviews and ratings for poems (stored in Firestore)
- **Real-time Data**: Reviews are stored and retrieved from Firebase Firestore
- **Responsive Design**: Beautiful UI that works on all devices
- **Bilingual Support**: Tamil and English content

## Firebase Setup

To set up Firebase for this project:

1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project"
   - Follow the setup wizard

2. **Enable Authentication**:
   - In your Firebase project, go to Authentication
   - Click "Get started"
   - Go to "Sign-in method" tab
   - Enable "Google" as a sign-in provider
   - Add your domain to authorized domains

3. **Set up Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Choose "Start in test mode" (for development)
   - Select a location for your database

4. **Get Firebase Configuration**:
   - Go to Project Settings (gear icon)
   - Scroll down to "Your apps"
   - Click "Web" icon to add a web app
   - Register your app and copy the config object

5. **Update Firebase Configuration**:
   - Open `src/config/firebase.ts`
   - Replace the placeholder values with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## Database Structure

The app uses the following Firestore collections:

### Users Collection (`users`)
```
{
  id: string (user UID),
  name: string,
  email: string,
  avatar?: string,
  joinedDate: string (ISO date)
}
```

### Reviews Collection (`reviews`)
```
{
  id: string (auto-generated),
  poemId: string,
  userId: string,
  userName: string,
  userAvatar?: string,
  rating: number (1-5),
  comment: string,
  createdAt: Timestamp,
  likes: number,
  isLiked: boolean
}
```

## Security Rules

For development, you can use these Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Anyone can read reviews, authenticated users can write
    match /reviews/{reviewId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the local development URL

## Deployment

Before deploying to production:

1. Update Firestore security rules for production
2. Configure proper authentication domains
3. Set up proper environment variables for Firebase config
4. Test all authentication and database operations

## Technologies Used

- **React 18** with TypeScript
- **Firebase 10** (Authentication & Firestore)
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.