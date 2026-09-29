// ============================================================
// HYDROGUARD - Data Khusus Portal Siaga Warga & Masyarakat
// ============================================================

export const cuacaWarga = {
  kota: 'DKI Jakarta & Sekitarnya (DAS Ciliwung)',
  suhu: 26,
  kondisi: 'Hujan Lebat Disertai Petir',
  ikon: 'CloudLightning',
  kelembapan: 92,
  angin: '24 km/jam — Barat Daya',
  indeksUV: 'Rendah (1)',
  jarakPandang: '3.5 km',
  peringatanBMKG:
    'PERINGATAN DINI CUACA EKSTREM: Potensi hujan intensitas lebat hingga sangat lebat berdurasi >2 jam di wilayah hulu (Bogor/Puncak) dan Jakarta Timur-Selatan. Waspada peningkatan debit sungai.',
  prakiraanJam: [
    { jam: '16:00', cuaca: 'Hujan Sedang', suhu: 26, peluangHujan: 75, mm: 18 },
    { jam: '17:00', cuaca: 'Hujan Lebat', suhu: 25, peluangHujan: 90, mm: 35 },
    { jam: '18:00', cuaca: 'Hujan Petir', suhu: 24, peluangHujan: 95, mm: 48 },
    { jam: '19:00', cuaca: 'Hujan Lebat', suhu: 24, peluangHujan: 85, mm: 32 },
    { jam: '20:00', cuaca: 'Hujan Ringan', suhu: 25, peluangHujan: 60, mm: 14 },
    { jam: '21:00', cuaca: 'Berawan Tebal', suhu: 25, peluangHujan: 35, mm: 4 },
  ],
};

export const daftarWilayahWarga = [
  {
    id: 'w-01',
    nama: 'Kampung Melayu',
    kecamatan: 'Jatinegara',
    kota: 'Jakarta Timur',
    tingkatRisiko: 'Bahaya',
    probabilitasBanjir: 88,
    estimasiGenangan: '90 - 150 cm',
    etaAirTiba: '1 Jam 45 Menit',
    statusSiaga: 'SIAGA 1 (KRITIS)',
    rekomendasi: 'Segera evakuasi warga kelompok rentan (lansia & anak) ke GOR Gelanggang Remaja Otista.',
    poskoRujukan: 'GOR Otista Jatinegara',
    kapasitasPosko: '850 jiwa (Terisi 120)',
    kontakPosko: '0812-9988-1122',
    titikWarga: [-6.2275, 106.8625],
    poskoKoordinat: [-6.2330, 106.8710],
  },
  {
    id: 'w-02',
    nama: 'Bidara Cina',
    kecamatan: 'Jatinegara',
    kota: 'Jakarta Timur',
    tingkatRisiko: 'Bahaya',
    probabilitasBanjir: 82,
    estimasiGenangan: '70 - 120 cm',
    etaAirTiba: '2 Jam 10 Menit',
    statusSiaga: 'SIAGA 1 (KRITIS)',
    rekomendasi: 'Amankan dokumen berharga, matikan MCB meteran listrik, bergerak ke Masjid Al-Falah Jl. Baiduri.',
    poskoRujukan: 'Masjid Jami Al-Falah & Aula Kelurahan',
    kapasitasPosko: '450 jiwa (Terisi 45)',
    kontakPosko: '0813-1122-3344',
    titikWarga: [-6.2415, 106.8665],
    poskoKoordinat: [-6.2450, 106.8730],
  },
  {
    id: 'w-03',
    nama: 'Bukit Duri',
    kecamatan: 'Tebet',
    kota: 'Jakarta Selatan',
    tingkatRisiko: 'Bahaya',
    probabilitasBanjir: 79,
    estimasiGenangan: '60 - 110 cm',
    etaAirTiba: '2 Jam 30 Menit',
    statusSiaga: 'SIAGA 2 (WASPADA TINGGI)',
    rekomendasi: 'Simak instruksi pengeras suara masjid & tim siaga bencana RW. Siapkan tas darurat.',
    poskoRujukan: 'SMPN 115 Jakarta Selatan',
    kapasitasPosko: '600 jiwa (Terisi 80)',
    kontakPosko: '0812-3344-5566',
    titikWarga: [-6.2195, 106.8570],
    poskoKoordinat: [-6.2240, 106.8510],
  },
  {
    id: 'w-04',
    nama: 'Rawajati',
    kecamatan: 'Pancoran',
    kota: 'Jakarta Selatan',
    tingkatRisiko: 'Waspada',
    probabilitasBanjir: 65,
    estimasiGenangan: '40 - 80 cm',
    etaAirTiba: '3 Jam 15 Menit',
    statusSiaga: 'SIAGA 2 (WASPADA)',
    rekomendasi: 'Pindahkan kendaraan roda dua dan empat ke pelataran Stasiun Duren Kalibata.',
    poskoRujukan: 'Puskesmas Rawajati & Aula Warga RW 07',
    kapasitasPosko: '300 jiwa (Terisi 10)',
    kontakPosko: '0815-4455-6677',
    titikWarga: [-6.2570, 106.8560],
    poskoKoordinat: [-6.2590, 106.8520],
  },
  {
    id: 'w-05',
    nama: 'Cengkareng Barat',
    kecamatan: 'Cengkareng',
    kota: 'Jakarta Barat',
    tingkatRisiko: 'Waspada',
    probabilitasBanjir: 58,
    estimasiGenangan: '30 - 60 cm',
    etaAirTiba: '4 Jam',
    statusSiaga: 'SIAGA 3 (WASPADA)',
    rekomendasi: 'Pantau debit Kali Angke. Bersihkan sumbatan parit di depan tempat tinggal.',
    poskoRujukan: 'RPTRA Rawa Buaya',
    kapasitasPosko: '400 jiwa (Terisi 0)',
    kontakPosko: '0817-8899-0011',
    titikWarga: [-6.1520, 106.7260],
    poskoKoordinat: [-6.1560, 106.7320],
  },
  {
    id: 'w-06',
    nama: 'Kebon Baru',
    kecamatan: 'Tebet',
    kota: 'Jakarta Selatan',
    tingkatRisiko: 'Aman',
    probabilitasBanjir: 24,
    estimasiGenangan: '< 20 cm',
    etaAirTiba: 'Tidak Ada Ancaman',
    statusSiaga: 'NORMAL / AMAN',
    rekomendasi: 'Wilayah terpantau kondusif. Tetap waspada terhadap genangan lokal jika hujan berlanjut.',
    poskoRujukan: 'Kantor Kelurahan Kebon Baru',
    kapasitasPosko: '250 jiwa',
    kontakPosko: '0818-7766-5544',
    titikWarga: [-6.2340, 106.8590],
    poskoKoordinat: [-6.2360, 106.8550],
  },
];

// Data Panduan Rute Evakuasi Interaktif (Contoh Kampung Melayu -> GOR Otista)
export const simulasiRuteEvakuasi = {
  titikAwal: {
    nama: 'Pemukiman Warga (RW 03 Kampung Melayu)',
    koordinat: [-6.2275, 106.8625],
    elevasi: 'Elevasi +11m (Rendah / Cekungan Bantaran Kali)',
  },
  titikTujuan: {
    nama: 'Posko Pengungsian GOR Gelanggang Remaja Otista',
    koordinat: [-6.2345, 106.8715],
    elevasi: 'Elevasi +22m (Dataran Tinggi Bebas Banjir)',
    kapasitas: '850 Pengungsi (Dilengkapi Posko Medis PMI & Dapur Umum BPBD)',
  },
  ruteAman: [
    [-6.2275, 106.8625], // Titik Rumah Warga
    [-6.2285, 106.8640], // Gang Warga RW 03
    [-6.2295, 106.8655], // Menuju Jl. Kebon Pala
    [-6.2305, 106.8675], // Belok Menuju Jl. Otista Raya (Jalur Bebas Genangan)
    [-6.2325, 106.8695], // Melintasi Halte TransJakarta Bidara Cina
    [-6.2345, 106.8715], // Tiba di Gerbang Utama GOR Otista
  ],
  zonaGenanganBanjir: [
    // Area poligon bantaran ciliwung yang terendam air luapan
    [-6.2250, 106.8600],
    [-6.2290, 106.8610],
    [-6.2315, 106.8630],
    [-6.2280, 106.8645],
    [-6.2245, 106.8620],
  ],
  titikBahaya: [
    {
      id: 'db-1',
      nama: 'Kolong Flyover Kampung Melayu (BAHAYA: Genangan 130cm, Arus Deras)',
      koordinat: [-6.2260, 106.8635],
      tipe: 'arus-deras',
    },
    {
      id: 'db-2',
      nama: 'Bantaran Ciliwung Gang Arus (BAHAYA: Luapan Air Meluap Cepat)',
      koordinat: [-6.2295, 106.8615],
      tipe: 'kedalaman-ekstrem',
    },
    {
      id: 'db-3',
      nama: 'Gardu Trafo Listrik Terendam (BAHAYA: Risiko Sengatan Listrik)',
      koordinat: [-6.2270, 106.8605],
      tipe: 'bahaya-listrik',
    },
  ],
  langkahNavigasi: [
    {
      langkah: 1,
      jarak: '120 m',
      waktu: '2 menit',
      instruksi: 'Segera keluar dari gang pemukiman warga RW 03 ke arah Timur menuju Jl. Kebon Pala.',
      peringatan: 'Bawa Tas Siaga Bencana di punggung. Gandeng tangan anak dan lansia.',
      status: 'aman',
    },
    {
      langkah: 2,
      jarak: '250 m',
      waktu: '4 menit',
      instruksi: 'HINDARI belok ke kiri menuju kolong flyover karena air sudah mencapai 130 cm. Tetap lurus ke Jl. Kebon Pala.',
      peringatan: 'JANGAN menerobos genangan air cokelat yang arusnya terlihat berputar.',
      status: 'waspada',
    },
    {
      langkah: 3,
      jarak: '350 m',
      waktu: '5 menit',
      instruksi: 'Belok kanan naik ke Jl. Otto Iskandardinata (Otista Raya). Jalur ini berada di kontur tanah tinggi (+20m dpl).',
      peringatan: 'Jalur trotoar kering dan penerangan jalan menyala dengan suplai genset darurat.',
      status: 'aman',
    },
    {
      langkah: 4,
      jarak: '200 m',
      waktu: '3 menit',
      instruksi: 'Lurus sejauh 200m hingga menemukan plang biru POSKO EVAKUASI GOR OTISTA di sebelah kiri jalan.',
      peringatan: 'Lapor ke meja registrasi BPBD untuk pendataan logistik, selimut, dan pemeriksaan medis darurat.',
      status: 'selesai',
    },
  ],
};

export const mitigasiTutorials = {
  praBencana: {
    judul: 'Fase 1: Kesiapsiagaan Pra-Bencana (Sebelum Banjir)',
    deskripsi: 'Langkah preventif yang wajib dilakukan warga saat peringatan dini cuaca ekstrem diumumkan.',
    checklist: [
      { id: 'pra-1', label: 'Kemasi Tas Siaga Bencana (P3K, senter, peluit, baterai cadangan)' },
      { id: 'pra-2', label: 'Bungkus dokumen penting (KK, KTP, Ijazah, Sertifikat) dalam map plastik kedap air' },
      { id: 'pra-3', label: 'Naikkan perabotan elektronik dan kasur ke lantai 2 atau rak setinggi minimal 1.5 meter' },
      { id: 'pra-4', label: 'Simpan cadangan air bersih minum minimal 5 liter per anggota keluarga' },
      { id: 'pra-5', label: 'Isi penuh baterai handphone dan powerbank untuk komunikasi darurat' },
      { id: 'pra-6', label: 'Ketahui lokasi titik kumpul & posko pengungsian terdekat di RT/RW Anda' },
    ],
  },
  saatBencana: {
    judul: 'Fase 2: Tanggap Darurat (Ketika Air Mulai Masuk ke Rumah)',
    deskripsi: 'Tindakan penyelamatan jiwa mandiri saat debit air sungai mulai meluap ke lingkungan perumahan.',
    checklist: [
      { id: 'saat-1', label: 'Matikan saklar MCB listrik utama PLN dan cabut seluruh colokan dari stopkontak' },
      { id: 'saat-2', label: 'Lepas selang regulator tabung gas LPG dan posisikan tabung di tempat tinggi' },
      { id: 'saat-3', label: 'Prioritaskan evakuasi kelompok rentan: balita, ibu hamil, lansia, dan disabilitas' },
      { id: 'saat-4', label: 'Gunakan alas kaki anti selip (sepatu bot / sepatu karet) untuk menghindari pecahan kaca/paku' },
      { id: 'saat-5', label: 'JANGAN berjalan atau berenang di air deras lebih dari 30 cm (dapat menyeret orang dewasa)' },
      { id: 'saat-6', label: 'Gunakan tongkat/kayu saat melangkah untuk mengecek lubang got/saluran air terbuka' },
    ],
  },
  pascaBencana: {
    judul: 'Fase 3: Pemulihan Pasca-Bencana (Setelah Air Surut)',
    deskripsi: 'Protokol keselamatan kesehatan dan keamanan sebelum kembali masuk ke dalam rumah.',
    checklist: [
      { id: 'pasca-1', label: 'Pastikan instalasi listrik sudah diperiksa PLN atau teknisi sebelum dinyalakan kembali' },
      { id: 'pasca-2', label: 'Waspadai hewan berbahaya (ular, kalajengking, kelabang) yang berlindung di sela perabotan' },
      { id: 'pasca-3', label: 'Bersihkan dan semprot disinfektan pada lantai serta dinding untuk cegah bakteri leptospirosis' },
      { id: 'pasca-4', label: 'Buang bahan makanan dan obat-obatan yang sempat terendam air banjir' },
      { id: 'pasca-5', label: 'Periksa kualitas air sumur bor sebelum digunakan untuk mandi atau mencuci' },
      { id: 'pasca-6', label: 'Segera periksakan diri ke posko kesehatan jika mengalami luka robek atau demam' },
    ],
  },
};

export const kontakDarurat = [
  { nama: 'Panggilan Darurat Terpadu', nomor: '112', instansi: 'BPBD DKI Jakarta / Layanan Siaga Bencana', warna: '#ef4444' },
  { nama: 'Basarnas (Pencarian & Penyelamatan)', nomor: '115', instansi: 'Evakuasi Perahu Karet & SAR', warna: '#f59e0b' },
  { nama: 'Ambulans Gawat Darurat', nomor: '118 / 119', instansi: 'Dinas Kesehatan & PMI', warna: '#10b981' },
  { nama: 'Pemadam Kebakaran & Evakuasi', nomor: '113', instansi: 'Damkar DKI Jakarta', warna: '#f97316' },
  { nama: 'Posko Siaga PLN (Pemadaman Darurat)', nomor: '123', instansi: 'PLN Distribusi Jakarta', warna: '#0ea5e9' },
];
