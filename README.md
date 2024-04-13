# Chat Application with MongoDB, Express.js, and React

This is a simple chat application built using MongoDB, Express.js, and React. It allows users to register, login, search for other users, and engage in real-time chat. The application also displays whether users are online or offline.

## Features

- User registration and authentication
- User login/logout functionality
- Real-time chat functionality
- User search functionality
- Seen/ Not seen message functionality
- User can upload images 
- Online/Offline status indication

## Technologies Used

- MongoDB: A NoSQL database used for storing user data and chat messages.
- Express.js: A web application framework for Node.js used for building the backend server.
- React: A JavaScript library for building user interfaces used for the frontend.
- Socket.io: A library for real-time web applications enabling bidirectional communication between web clients and servers.

## Installation

1. Clone the repository:

```
git clone https://github.com/mohkh833/chatapp.git
```

2. Navigate to the project directory:

```
cd chat-app
```

3. Install dependencies for both backend and frontend:

```
cd backend
npm install

cd ../frontend
npm install
```

4. Configure environment variables:

   - Create a `.env` file in the `backend` directory.
   - Define the following environment variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Run the backend server:

```
cd backend
npm start
```

6. Run the frontend:

```
cd frontend
npm start
```

7. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

1. Register for a new account or log in if you already have an account.
2. Once logged in, you can search for other users by their username.
3. Click on a user's name to start a conversation.
4. Chat with the selected user in real-time.
5. Users' online/offline status is indicated beside their username.
6. Users Message status is indicated beside message

## Future Improvements

- Implement user profile management functionality.
- Add support for multimedia messages (videos).
- Enhance the user interface and user experience.
- Implement typing indicators in chat.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to Socket.io for providing real-time communication capabilities.
- Thanks to the creators of MongoDB, Express.js, and React for their amazing technologies.
