<!-- 2 Oktober -->

# Authentikasi dan autorisasi

<!-- Authentikasi -->

**memberikan akses ke pada orang yang di kenali**

<!-- Authorisasi -->

**memberikan Token kepada orang yang mengakses ke API**

- Jika berhasil Login
- maka akan di buat /generate token
- mengakses API dengan Token tersebut

---

- cek username | jika ada maka akan melakukan pengecekan password / jika tidak throw error
- generate token

---

**Menggunakan JSON WEB TOKEN**

- Setelah berhasil Login Lalu Menggenerate Token JWT| dengan Username Sebagai Payload
- Jika Ingin Get Data, Lakukan Pengecekan dengan TOKEN Authorizationya
