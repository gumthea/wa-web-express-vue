# WhatsApp Web Messaging App

This project consists of a **Vue 3 frontend** and an **Express.js backend** that integrates with `whatsapp-web.js` to send messages and media through WhatsApp Web.

## Features

✅ Send text messages via WhatsApp  
✅ Send media (images, videos, documents)  
✅ Generate and serve QR codes for authentication  
✅ WebSocket support for real-time QR updates  

---

## 🛠 Backend (Express.js)

The backend handles authentication, message sending, and file uploads using `whatsapp-web.js`.

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/whatsapp-web-messaging.git
   cd whatsapp-web-messaging/backend
2. Install dependencies:
   ```sh
   npm install
3. Run the server:
   ```sh
   node server.js
The server runs at http://localhost:3000.

## 🌐 Frontend (Vue 3)
The frontend provides a user interface for sending messages and uploading media.

### Installation
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
2. Install dependencies:
   ```sh
   npm install
3. Run the Vue development server:
   ```sh
   npm run dev
The app runs at http://localhost:5173.

### Usage
- Scan the QR code from WhatsApp Web to log in.
- Enter a phone number and message to send text.
- Upload an image or document to send media.
  
## 📌 Technologies Used
### Backend:
  - Node.js
  - Express.js
  - whatsapp-web.js
  - Multer (file uploads)
  - Socket.IO (real-time QR updates)

### Frontend:
  - Vue 3
  - Axios (API requests)
  - WebSocket (real-time updates)

## 📜 License
This project is licensed under the MIT License.
