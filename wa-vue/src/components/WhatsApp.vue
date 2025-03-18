<template>
  <div class="container">
    <h2>WhatsApp Web API</h2>

    <!-- Menampilkan QR Code -->
    <div v-if="!whatsappReady">
      <p>Scan QR Code untuk Login:</p>
      <img v-if="qrCode" :src="qrCode" alt="QR Code" class="qr-code" />
    </div>
    <p v-else class="success-text">✅ WhatsApp Siap Digunakan!</p>

    <hr />

    <!-- Form Kirim Pesan -->
    <div>
      <h3>Kirim Pesan</h3>
      <input v-model="number" type="text" placeholder="Nomor WhatsApp (62xxx)" />
      <textarea v-model="message" placeholder="Tulis pesan..."></textarea>
      <button @click="sendMessage">Kirim Pesan</button>
    </div>

    <hr />

    <!-- Form Kirim Media -->
    <div>
      <h3>Kirim Media</h3>
      <input v-model="number" type="text" placeholder="Nomor WhatsApp (62xxx)" />
      <input type="file" @change="handleFileUpload" />
      <button @click="sendMedia">Kirim Media</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { io, Socket } from "socket.io-client";
import axios from "axios";

// State
const qrCode = ref<string | null>(null);
const whatsappReady = ref<boolean>(false);
const number = ref<string>("");
const message = ref<string>("");
const file = ref<File | null>(null);

// WebSocket Client
let socket: Socket;

onMounted(() => {
  socket = io("http://localhost:3000");

  socket.on("qr", (qr: string) => {
    qrCode.value = qr;
    whatsappReady.value = false;
  });

  socket.on("ready", () => {
    qrCode.value = null;
    whatsappReady.value = true;
  });
});

onUnmounted(() => {
  socket.disconnect();
});

// Fungsi Kirim Pesan
const sendMessage = async () => {
  if (!number.value || !message.value) {
    alert("Nomor dan pesan harus diisi!");
    return;
  }

  try {
    await axios.post("http://localhost:3000/send-message", {
      number: number.value,
      message: message.value,
    });
    alert("Pesan berhasil dikirim!");
  } catch (error) {
    console.error(error);
    alert("Gagal mengirim pesan!");
  }
};

// Fungsi Upload File
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    file.value = target.files[0];
  }
};

// Fungsi Kirim Media
const sendMedia = async () => {
  if (!number.value || !file.value) {
    alert("Nomor dan file harus diisi!");
    return;
  }
  
  const formData = new FormData();
  formData.append("number", number.value);
  formData.append("file", file.value);

  try {
    await axios.post("http://localhost:3000/send-media", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Media berhasil dikirim!");
  } catch (error) {
    console.error(error);
    alert("Gagal mengirim media!");
  }
};
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
}
.qr-code {
  width: 250px;
  height: 250px;
  margin: 20px auto;
}
.success-text {
  font-size: 18px;
  color: green;
}
input, textarea {
  width: 80%;
  margin: 10px;
  padding: 8px;
}
button {
  padding: 10px 20px;
  background: #25D366;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
