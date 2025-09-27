# Space Application

**Space Application** adalah proyek website group chat sederhana yang dapat digunakan untuk berkomunikasi dengan teman dan dapat membuat note atau catatan yang dapat diakses oleh anggota yang ada didalam group. 

## 🔧 Tech Stack

- **Website**: Next.js + TailwindCSS
- **Database**: PostgreSQL (Supabase)
- **Penyimpanan Gambar**: Storage (Supabase)
- **Deployment**: Vercel

## 🚀 Fitur yang Telah Dibuat

Berikut adalah daftar fitur halaman dan komponen utama yang telah dikembangkan, meskipun sebagian besar belum 100% responsif:

### Halaman Auth 

Disini pengguna mendapatkan 2 halaman, yaitu sign in dan sign up, pengguna harus login dan register ketika ingin menggunakan aplikasi ini. Sign up digunakan untuk pengguna mendaftarkan diri pada aplikasi.

1. **Sign In** – Pengguna harus menuliskan username, email dan password yang telah dibuat sebelumnya
2. **Sign Up** – Pengguna harus menuliskan name, username, email, nomor telepon, password

### Halaman Pengguna
Setelah pengguna sign in/log in pengguna akan diarahkan ke halaman utama yang memiliki sidebar disertai 3 menu yaitu space, profile, dan logout

1. **Spaces** – Akan membuka halaman list space/group dari akun yang didaftarkan pengguna, bila belum ada grup maka tampilan akan kosong. Terdapat button add space yang nantinya jika diklik akan muncul popup yang mana harus pengguna isi nama kelompok yang ingin dibuat. 
2. **Profile** – Ketika pengguna mengeklik Button ini, maka akan terlihat profile dari pengguna seperti foto yang jika belum di perbarui maka akan ada inisial dari nama pengguna, dan jika sudah diperbarui maka akan tampak foto profil pengguna. selain foto ada juga username yang hanya bisa diganti 7 hari sekali. lalu ada nama, email, dan nomor telepon. 
3. **Message/pesan** – Ketika pengguna sudah membuat Space/group, pengguna dapat mengirimkan pesan ke dalam grup ini, selain itu pengguna juga dapat melihat pesan dari orang lain yang juga tergabung didalam space ini
4. **Notes** – Jika pengguna merupakan admin didalam grup/orang yang telah membuat grup sebelumnya, maka dapat menambahkan note dan mengedit note. namun jika hanya pengguna biasa, hanya dapat melihat note tanpa bisa mengedit dan membuat. Pada admin, terdapat button add note yang jika di klik akan muncul pop up untuk memberikan nama pada note.
5. **Note Edit** – Setelah menambahkan note, admin dapat mengedit dari note tersebut, seperti mengganti nama note atau menambahkan konten didalamnya.
6. **Detail** – Disini semua pengguna dapat melihat detail informasi dari space/group yang dibuat seperti nama grup, foto grup, perizinan grup apakah grup ini itu private atau public, kemudian ada member grup, selain itu ada button share link, yang mana ketika diklik akan muncul alert dari website beserta token yan dibuat. pengguna hanya perlu mencopy dan membukanya di browser lain dengan akun lain, ketika grup ini bersifat private, maka harus ada persetujuan admin, yang dimunculkan di halaman detail khusus admin, namun jika publik pengguna akan langsung masuk. selain itu pada admin juga ada button edit namun di pengguna biasa tidak ada
7. **Detail Edit** – admin dapat mengedit dari detail grup tersebut, seperti mengganti nama grup atau menambahkan deskripsi, foto grup, mengubah permission didalamnya.
8. **Profile Edit** – Semua pengguna dapat mengedit profil masing-masing, namun untuk username hanya dapat diganti 7 hari sekali, ketika selesai diganti maka inputan akan langsung didisable. Pengguna juga dapat mengupload foto profil masing-masing.

## 🛠️ Cara Menjalankan Proyek

### 1. Clone & Install Dependencies


```bash
git clone https://github.com/your-username/react-js-ecobazar.git
cd heywebsite
npm install
npm run dev
```
#### a. Setup Environtment Variabel

Note: Sebelum menjalankan, pastikan sudah ada file .env yang berisi mengenai :

- NEXT_PUBLIC_BASE_URL=http://localhost:3000

Buat projek supabase, lalu ambil bagian supabase url dan anon key, dan paste/tempel pada bagian dibawah ini

- NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
- NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

buka menu supabase, kemudian klik tabel editor dan cari button connect. cari bagian tab ORMs, copy lalu paste pada variabel dibawah ini

- DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME
- DIRECT_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME

Buat string random contoh 37M9ifzCKnNJhfteTLSDWwewrsSD1pfJ8

- JWT_SECRET

#### b. Setup Database (Prisma + Supabase)
```bash
npx prisma migrate dev
npx prisma studio
```

### 2. Dapat diakses pada website

```bash
https://heywebsite-six.vercel.app
```

Pengguna dapat login secara mandiri dengan mendaftarkan diri/sign up atau dapat langsung mengakses halaman login dengan beberapa akun berikut : 

```bash
User 1 : 
    Username: daniprt
    Email: dani.pratama@example.com
    Password: 12121212
User 2 : 
    Username: sitiauliabru
    Email: siti.aulia@example.com
    Password: 12121212
User 3 : 
    Username: rizkiwnf
    Email: rizkiwnf@example.com
    Password: 12121212
```

### 3. Menjalankan pada website

Aplikasi sudah live di:  
👉 https://heywebsite-six.vercel.app/sign-in 

#### 📋 Alur Penggunaan
1. Login dengan akun demo yang tersedia atau daftar akun baru.
2. Klik menu **Space** pada sidebar.
3. Klik **Add Space**, masukkan nama grup/space.
4. Kirim pesan dalam grup/space yang sudah dibuat.
5. **(Sebagai pembuat space/admin)**:
   - Klik **Add Note** untuk membuat catatan baru → isi judul note.
   - Klik **Edit Note** untuk menambahkan/ubah konten note.
6. Klik note yang sudah dibuat → akan tampil judul & isi note.
7. Klik **Detail** pada header halaman chat → tampil informasi grup/space:
   - Nama grup, deskripsi, foto grup, member, permission (private/public).
   - Tombol **Share Link** untuk mengundang pengguna lain.
8. **(Sebagai admin)**: bisa mengedit nama, deskripsi, foto, dan permission grup.
9. Jika pengguna lain membuka link:
   - Jika **Private** → admin akan melihat permintaan join di halaman detail.
   - Jika **Public** → pengguna langsung bergabung ke grup.
10. Klik menu **Profile** di sidebar → lihat detail profil (foto, username, email, no telp).
11. Klik **Edit Profile**:
    - Ganti **username** (hanya 1x per 7 hari).
    - Ganti nama, email, nomor telepon, dan foto profil.

