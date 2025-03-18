const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const port = 3000;

// Enable CORS
app.use(cors({ origin: '*' }));

// Configure Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

// Middleware JSON
app.use(express.json());

// Konfigurasi WhatsApp Client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

io.on('connection', (socket) => {
    console.log('Client terhubung ke WebSocket');
});

client.on('qr', async (qr) => {
    console.log('Mengirim QR Code ke frontend...');
    const qrImage = await qrcode.toDataURL(qr);
    io.emit('qr', qrImage);
});

client.on('ready', () => {
    console.log('WhatsApp Client Siap!');
    io.emit('ready');
});

client.initialize();

// **Konfigurasi Multer untuk Menyimpan File dengan Nama Asli**
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        cb(null, originalName); // Simpan file dengan nama aslinya
    }
});
const upload = multer({ storage });

// **Endpoint Kirim Pesan Teks**
app.post('/send-message', async (req, res) => {
    const { number, message } = req.body;
    const chatId = number + '@c.us';

    try {
        await client.sendMessage(chatId, message);
        res.json({ status: 'success', message: 'Pesan Terkirim!' });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

// **Endpoint Kirim Media (Gambar, Video, Dokumen)**
app.post('/send-media', upload.single('file'), async (req, res) => {
    const { number } = req.body;
    if (!req.file) {
        return res.status(400).json({ status: 'error', error: 'File tidak ditemukan' });
    }

    const chatId = number + '@c.us';
    const filePath = req.file.path;
    const fileName = req.file.filename; // Ambil nama asli file

    try {
        const media = MessageMedia.fromFilePath(filePath);
        await client.sendMessage(chatId, media);
        fs.unlinkSync(filePath); // Hapus file setelah dikirim

        res.json({ status: 'success', message: 'Media Terkirim!', fileName: fileName });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

// **Jalankan Server**
server.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
