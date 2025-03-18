# WhatsApp Frontend (Vite - Vue 3 - Typescript)

This is the frontend application for sending messages and media through WhatsApp using whatsapp-web.js.

Features

Send text messages to WhatsApp numbers

Send media files (images, videos, documents)

WebSocket integration for real-time QR code updates

Prerequisites

Node.js (LTS version recommended)

Vue 3 with Vite

Axios for HTTP requests

Installation

Clone the repository:

git clone https://github.com/your-username/vue-whatsapp-frontend.git
cd vue-whatsapp-frontend

Install dependencies:

npm install

Configuration

Make sure your backend server (Node.js with whatsapp-web.js) is running on http://localhost:3000.

Usage

Start the Development Server

npm run dev

Send Message Example

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const number = ref('');
const message = ref('');

const sendMessage = async () => {
  if (!number.value || !message.value) {
    alert('Nomor dan pesan harus diisi!');
    return;
  }
  try {
    await axios.post('http://localhost:3000/send-message', {
      number: number.value,
      message: message.value,
    });
    alert('Pesan berhasil dikirim!');
  } catch (error) {
    console.error(error);
    alert('Gagal mengirim pesan!');
  }
};
</script>

Send Media Example

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const number = ref('');
const file = ref(null);

const sendMedia = async () => {
  if (!number.value || !file.value) {
    alert('Nomor dan file harus diisi!');
    return;
  }
  const formData = new FormData();
  formData.append('number', number.value);
  formData.append('file', file.value);
  try {
    await axios.post('http://localhost:3000/send-media', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    alert('Media berhasil dikirim!');
  } catch (error) {
    console.error(error);
    alert('Gagal mengirim media!');
  }
};
</script>

Handling QR Code with WebSocket

<script setup>
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';

const qrCode = ref('');
const socket = io('http://localhost:3000');

onMounted(() => {
  socket.on('qr', (data) => {
    qrCode.value = data;
  });
  socket.on('ready', () => {
    alert('WhatsApp Client is Ready!');
  });
});
</script>

Build for Production

npm run build

License

MIT License

