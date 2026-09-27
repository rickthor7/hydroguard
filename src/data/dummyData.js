// ============================================================
// HYDROGUARD - Dummy / Static Data
// ============================================================

export const sensorData = [
  { id: 'S-001', nama: 'Bendung Katulampa (Ciliwung Hulu)', lokasi: 'Bogor Timur', wilayah: 'Bogor', lat: -6.6322, lng: 106.8378, koordinat: { x: 28, y: 18 }, level: 'tinggi', ketinggian: 3.8, curahHujan: 72 },
  { id: 'S-002', nama: 'Pos Pantau Depok (Ciliwung Tengah)', lokasi: 'Grand Depok City', wilayah: 'Depok', lat: -6.4025, lng: 106.8315, koordinat: { x: 18, y: 42 }, level: 'sedang', ketinggian: 2.1, curahHujan: 41 },
  { id: 'S-003', nama: 'Ciliwung Bidara Cina / MT Haryono', lokasi: 'Jatinegara', wilayah: 'Jakarta Timur', lat: -6.2422, lng: 106.8647, koordinat: { x: 48, y: 58 }, level: 'sedang', ketinggian: 2.3, curahHujan: 45 },
  { id: 'S-004', nama: 'Pintu Air Manggarai (Ciliwung Utama)', lokasi: 'Tebet / Menteng', wilayah: 'Jakarta Selatan', lat: -6.2088, lng: 106.8488, koordinat: { x: 35, y: 35 }, level: 'tinggi', ketinggian: 3.9, curahHujan: 65 },
  { id: 'S-005', nama: 'Ciliwung Istiqlal / Pasar Baru', lokasi: 'Sawah Besar', wilayah: 'Jakarta Pusat', lat: -6.1685, lng: 106.8316, koordinat: { x: 62, y: 28 }, level: 'rendah', ketinggian: 1.2, curahHujan: 18 },
  { id: 'S-006', nama: 'Waduk Pluit / Muara Ciliwung', lokasi: 'Penjaringan', wilayah: 'Jakarta Utara', lat: -6.1172, lng: 106.7978, koordinat: { x: 72, y: 48 }, level: 'sedang', ketinggian: 2.1, curahHujan: 41 },
  { id: 'S-007', nama: 'Kali Pesanggrahan (Kedoya)', lokasi: 'Kebon Jeruk', wilayah: 'Jakarta Barat', lat: -6.1950, lng: 106.7620, koordinat: { x: 55, y: 70 }, level: 'rendah', ketinggian: 0.9, curahHujan: 18 },
  { id: 'S-008', nama: 'Kali Angke (Cengkareng)', lokasi: 'Rawa Buaya', wilayah: 'Jakarta Barat', lat: -6.1550, lng: 106.7320, koordinat: { x: 80, y: 22 }, level: 'tinggi', ketinggian: 4.2, curahHujan: 88 },
  { id: 'S-009', nama: 'Sungai Krukut (Mampang)', lokasi: 'Mampang Prapatan', wilayah: 'Jakarta Selatan', lat: -6.2480, lng: 106.8180, koordinat: { x: 12, y: 65 }, level: 'rendah', ketinggian: 0.8, curahHujan: 15 },
  { id: 'S-010', nama: 'Banjir Kanal Timur (Cipinang)', lokasi: 'Duren Sawit', wilayah: 'Jakarta Timur', lat: -6.2250, lng: 106.9150, koordinat: { x: 88, y: 72 }, level: 'sedang', ketinggian: 1.9, curahHujan: 38 },
];

export const ciliwungRiverCoordinates = [
  [-6.6450, 106.8450],
  [-6.6322, 106.8378], // Katulampa
  [-6.5890, 106.8150], // Bogor Utara
  [-6.5200, 106.8450], // Bojong Gede
  [-6.4450, 106.8380], // Depok Selatan
  [-6.4025, 106.8315], // Pos Pemantau Depok
  [-6.3550, 106.8350], // UI / Lenteng Agung
  [-6.3050, 106.8520], // Pasar Rebo
  [-6.2820, 106.8600], // Condet
  [-6.2550, 106.8580], // Kalibata
  [-6.2422, 106.8647], // Bidara Cina / MT Haryono
  [-6.2250, 106.8600], // Kampung Melayu
  [-6.2088, 106.8488], // Pintu Air Manggarai
  [-6.1950, 106.8420], // Cikini / Raden Saleh
  [-6.1820, 106.8380], // Gambir
  [-6.1685, 106.8316], // Istiqlal / Pasar Baru
  [-6.1480, 106.8280], // Mangga Dua
  [-6.1280, 106.8150], // Kota Tua
  [-6.1172, 106.7978], // Waduk Pluit / Teluk Jakarta
];

export const waterLevelData = [
  { jam: '00:00', ciliwung: 1.2, pluit: 0.8, angke: 1.5, kanal: 1.0 },
  { jam: '01:00', ciliwung: 1.3, pluit: 0.9, angke: 1.6, kanal: 1.1 },
  { jam: '02:00', ciliwung: 1.5, pluit: 1.0, angke: 1.8, kanal: 1.2 },
  { jam: '03:00', ciliwung: 1.8, pluit: 1.2, angke: 2.1, kanal: 1.4 },
  { jam: '04:00', ciliwung: 2.2, pluit: 1.5, angke: 2.5, kanal: 1.7 },
  { jam: '05:00', ciliwung: 2.8, pluit: 1.8, angke: 3.0, kanal: 2.1 },
  { jam: '06:00', ciliwung: 3.1, pluit: 1.9, angke: 3.4, kanal: 2.3 },
  { jam: '07:00', ciliwung: 3.4, pluit: 2.0, angke: 3.8, kanal: 2.4 },
  { jam: '08:00', ciliwung: 3.6, pluit: 2.1, angke: 4.1, kanal: 2.3 },
  { jam: '09:00', ciliwung: 3.7, pluit: 2.1, angke: 4.2, kanal: 2.2 },
  { jam: '10:00', ciliwung: 3.8, pluit: 2.1, angke: 4.2, kanal: 2.1 },
  { jam: '11:00', ciliwung: 3.6, pluit: 2.0, angke: 4.0, kanal: 2.0 },
  { jam: '12:00', ciliwung: 3.4, pluit: 1.9, angke: 3.8, kanal: 1.9 },
  { jam: '13:00', ciliwung: 3.2, pluit: 1.8, angke: 3.5, kanal: 1.8 },
  { jam: '14:00', ciliwung: 3.0, pluit: 1.7, angke: 3.3, kanal: 1.7 },
  { jam: '15:00', ciliwung: 3.2, pluit: 1.8, angke: 3.5, kanal: 1.8 },
  { jam: '16:00', ciliwung: 3.5, pluit: 2.0, angke: 3.9, kanal: 2.0 },
  { jam: '17:00', ciliwung: 3.7, pluit: 2.1, angke: 4.1, kanal: 2.2 },
  { jam: '18:00', ciliwung: 3.8, pluit: 2.1, angke: 4.2, kanal: 2.3 },
  { jam: '19:00', ciliwung: 3.9, pluit: 2.2, angke: 4.3, kanal: 2.4 },
  { jam: '20:00', ciliwung: 3.8, pluit: 2.1, angke: 4.2, kanal: 2.3 },
  { jam: '21:00', ciliwung: 3.6, pluit: 2.0, angke: 4.0, kanal: 2.2 },
  { jam: '22:00', ciliwung: 3.4, pluit: 1.9, angke: 3.8, kanal: 2.0 },
  { jam: '23:00', ciliwung: 3.2, pluit: 1.8, angke: 3.6, kanal: 1.9 },
];

export const rainfallData = [
  { jam: '00:00', curah: 12, prediksi: 15 },
  { jam: '01:00', curah: 18, prediksi: 20 },
  { jam: '02:00', curah: 35, prediksi: 30 },
  { jam: '03:00', curah: 58, prediksi: 55 },
  { jam: '04:00', curah: 72, prediksi: 68 },
  { jam: '05:00', curah: 85, prediksi: 80 },
  { jam: '06:00', curah: 78, prediksi: 82 },
  { jam: '07:00', curah: 65, prediksi: 70 },
  { jam: '08:00', curah: 50, prediksi: 55 },
  { jam: '09:00', curah: 42, prediksi: 45 },
  { jam: '10:00', curah: 30, prediksi: 35 },
  { jam: '11:00', curah: 22, prediksi: 25 },
  { jam: '12:00', curah: 18, prediksi: 20 },
  { jam: '13:00', curah: 15, prediksi: 18 },
  { jam: '14:00', curah: 20, prediksi: 22 },
  { jam: '15:00', curah: 35, prediksi: 32 },
  { jam: '16:00', curah: 55, prediksi: 52 },
  { jam: '17:00', curah: 68, prediksi: 65 },
  { jam: '18:00', curah: 75, prediksi: 78 },
  { jam: '19:00', curah: 80, prediksi: 82 },
  { jam: '20:00', curah: 72, prediksi: 75 },
  { jam: '21:00', curah: 58, prediksi: 60 },
  { jam: '22:00', curah: 40, prediksi: 42 },
  { jam: '23:00', curah: 28, prediksi: 30 },
];

export const activeAlerts = [
  {
    id: 'ALT-001',
    wilayah: 'Kali Angke — Cengkareng',
    level: 'tinggi',
    pesan: 'Ketinggian air mencapai 4.2m, melebihi ambang batas kritis. Evakuasi segera disarankan.',
    waktu: '10 menit lalu',
    timestamp: '21:15 WIB',
  },
  {
    id: 'ALT-002',
    wilayah: 'Ciliwung Hulu — Bogor',
    level: 'tinggi',
    pesan: 'Curah hujan ekstrem 88mm/jam terdeteksi. Prediksi banjir 2-3 jam ke depan.',
    waktu: '18 menit lalu',
    timestamp: '21:07 WIB',
  },
  {
    id: 'ALT-003',
    wilayah: 'Banjir Kanal Barat — Tomang',
    level: 'sedang',
    pesan: 'Debit air meningkat 40% dalam 1 jam. Pantau situasi secara berkala.',
    waktu: '32 menit lalu',
    timestamp: '20:53 WIB',
  },
  {
    id: 'ALT-004',
    wilayah: 'Waduk Pluit — Penjaringan',
    level: 'sedang',
    pesan: 'Volume waduk mencapai 78% kapasitas. Pintu air dibuka 40%.',
    waktu: '45 menit lalu',
    timestamp: '20:40 WIB',
  },
  {
    id: 'ALT-005',
    wilayah: 'Cisadane Cabang — Tangerang',
    level: 'tinggi',
    pesan: 'Aliran dari hulu meningkat drastis akibat hujan deras di Puncak.',
    waktu: '1 jam lalu',
    timestamp: '20:25 WIB',
  },
];

export const statsData = [
  { label: 'Wilayah Terlindungi', nilai: 248, satuan: 'Kelurahan', ikon: 'shield' },
  { label: 'Sensor Aktif', nilai: 10, satuan: 'Titik Pantau', ikon: 'activity' },
  { label: 'Kecepatan Deteksi', nilai: 3, satuan: 'Menit', ikon: 'zap' },
  { label: 'Akurasi Prediksi', nilai: 94, satuan: '%', ikon: 'target' },
  { label: 'Peringatan Terkirim', nilai: 1842, satuan: 'Notifikasi', ikon: 'bell' },
  { label: 'Jiwa Terlindungi', nilai: 3200000, satuan: 'Penduduk', ikon: 'users' },
];

export const fiturUnggulan = [
  {
    ikon: 'brain-circuit',
    judul: 'Prediksi AI Mutakhir',
    deskripsi: 'Model machine learning (LSTM + Random Forest) yang dilatih dengan data historis 10 tahun untuk prediksi banjir hingga 6 jam ke depan.',
    warna: 'from-blue-500 to-cyan-400',
  },
  {
    ikon: 'bell-ring',
    judul: 'Peringatan Multi-Kanal',
    deskripsi: 'Notifikasi otomatis via WhatsApp, SMS, sirine lapangan, dan aplikasi mobile dalam hitungan detik saat risiko terdeteksi.',
    warna: 'from-amber-500 to-orange-400',
  },
  {
    ikon: 'map-pin',
    judul: 'Pemetaan Risiko Dinamis',
    deskripsi: 'Visualisasi peta risiko real-time yang diperbarui setiap 5 menit berdasarkan kondisi sensor dan prakiraan cuaca.',
    warna: 'from-teal-500 to-emerald-400',
  },
  {
    ikon: 'gauge',
    judul: 'Dashboard Operasional',
    deskripsi: 'Antarmuka terpadu untuk operator BPBD dan instansi terkait dalam memantau seluruh titik sensor secara bersamaan.',
    warna: 'from-purple-500 to-pink-400',
  },
  {
    ikon: 'cloud-rain',
    judul: 'Integrasi Data Cuaca',
    deskripsi: 'Menggabungkan data BMKG, satelit, dan sensor lapangan untuk konteks prediksi yang lebih akurat dan komprehensif.',
    warna: 'from-sky-500 to-blue-400',
  },
  {
    ikon: 'shield-check',
    judul: 'Protokol Mitigasi Otomatis',
    deskripsi: 'Rekomendasi tindakan terstruktur dan eskalasi otomatis ke pihak berwenang sesuai level risiko yang terdeteksi.',
    warna: 'from-green-500 to-teal-400',
  },
];
