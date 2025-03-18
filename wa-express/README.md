# WhatsApp API with Node.js, Express, and Multer

This project is a simple WhatsApp API implementation using whatsapp-web.js, express, multer, and socket.io to send messages and media files via WhatsApp.

Features

Generate and display a WhatsApp Web QR Code for authentication.

Send text messages to WhatsApp numbers.

Upload and send media files (images, videos, PDFs, etc.) via WhatsApp.

Uses multer for file uploads while preserving the original file name.

Uses WebSocket (socket.io) to send real-time updates (QR code, status, etc.).

Installation

Prerequisites

Ensure you have the following installed on your system:

Node.js (v16 or later recommended)

npm (comes with Node.js)

Clone the Repository

git clone https://github.com/your-username/whatsapp-api.git
cd whatsapp-api

Install Dependencies

npm install

Configuration

Update .env (Optional)

You can create a .env file to store configuration values if needed.

Running the Server

Start the server with the following command:

node server.js

The server will run on http://localhost:3000

API Endpoints

1. Get WhatsApp QR Code

The QR code is automatically sent to all WebSocket-connected clients. You can listen for the qr event on the frontend.

2. Send Text Message

Endpoint: POST /send-message

Request Body (JSON):

{
  "number": "1234567890",
  "message": "Hello from API!"
}

Example cURL Request:

curl -X POST http://localhost:3000/send-message \
  -H "Content-Type: application/json" \
  -d '{"number": "1234567890", "message": "Hello!"}'

3. Send Media File

Endpoint: POST /send-media

Request Parameters:

number (String) - WhatsApp number (including country code)

file (File) - Media file to be sent

Example Request (Using Postman or Frontend Form):

Set request type to multipart/form-data

Upload a file with the field name file

Add number as a form field

Backend Implementation:

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Preserve the original file name
    }
});
const upload = multer({ storage: storage });

Example Response:

{
  "status": "success",
  "message": "Media Terkirim!",
  "fileName": "example.pdf"
}

WebSocket Events

The server emits the following WebSocket events:

qr - Sends QR code data to frontend for authentication.

ready - Notifies when the WhatsApp client is ready.

Dependencies

express - Web framework for Node.js

whatsapp-web.js - WhatsApp automation library

socket.io - WebSocket communication

multer - File upload handling

cors - Cross-Origin Resource Sharing

qrcode - Generate QR codes

License

This project is licensed under the MIT License.

Author

Gumthea - GitHub