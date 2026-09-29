// ============================================================
// HYDROGUARD - AI Pattern Matching & Personalized Alert Data
// ============================================================

export const historicalDatasets = [
  {
    id: 'ds-2020',
    nama: 'Banjir Jabodetabek (1 Jan 2020)',
    matchScore: 94.8,
    curahHujanPuncak: '377 mm/hari',
    karakteristik: 'Kombinasi hujan konvektif lokal ekstrem + luapan hulu Katulampa dalam tempo <3 jam.',
    statusKesesuaian: 'SANGAT TINGGI (Pola Identik)',
    warna: '#ef4444',
  },
  {
    id: 'ds-2013',
    nama: 'Banjir Jakarta (17 Jan 2013)',
    matchScore: 78.4,
    curahHujanPuncak: '250 mm/hari',
    karakteristik: 'Limpasan air hulu tertahan pasang air laut tinggi di Teluk Jakarta (Backwater Effect).',
    statusKesesuaian: 'SEDANG (Sebagian Mirip)',
    warna: '#f59e0b',
  },
  {
    id: 'ds-2007',
    nama: 'Banjir Siklonik (Februari 2007)',
    matchScore: 61.2,
    curahHujanPuncak: '340 mm/hari',
    karakteristik: 'Durasi hujan terus-menerus >72 jam akibat anomali siklon tropis Samudra Hindia.',
    statusKesesuaian: 'RENDAH (Pola Berbeda)',
    warna: '#3b82f6',
  },
];

// Data Kurva Komparasi AI: Telemetri IoT Aktual vs Pola Dataset Historis 2020 & 2013
export const patternComparisonData = [
  { jam: '00:00', iotAktual: 1.2, pola2020: 1.3, pola2013: 1.1, ambangBatas: 3.5 },
  { jam: '02:00', iotAktual: 1.5, pola2020: 1.6, pola2013: 1.3, ambangBatas: 3.5 },
  { jam: '04:00', iotAktual: 2.2, pola2020: 2.1, pola2013: 1.7, ambangBatas: 3.5 },
  { jam: '06:00', iotAktual: 3.1, pola2020: 2.9, pola2013: 2.2, ambangBatas: 3.5 },
  { jam: '08:00', iotAktual: 3.6, pola2020: 3.5, pola2013: 2.7, ambangBatas: 3.5 },
  { jam: '10:00', iotAktual: 3.8, pola2020: 3.9, pola2013: 3.1, ambangBatas: 3.5 },
  { jam: '12:00', iotAktual: 3.4, pola2020: 3.6, pola2013: 3.3, ambangBatas: 3.5 },
  { jam: '14:00', iotAktual: 3.1, pola2020: 3.2, pola2013: 3.2, ambangBatas: 3.5 },
  { jam: '16:00', iotAktual: 3.7, pola2020: 3.8, pola2013: 3.4, ambangBatas: 3.5 },
  { jam: '18:00', iotAktual: 3.9, pola2020: 4.1, pola2013: 3.6, ambangBatas: 3.5 },
  { jam: '20:00', iotAktual: 3.8, pola2020: 4.0, pola2013: 3.5, ambangBatas: 3.5 },
  { jam: '22:00', iotAktual: 3.4, pola2020: 3.5, pola2013: 3.2, ambangBatas: 3.5 },
];

export const aiPersonalizedTemplates = {
  warga: {
    judul: 'Warga Masyarakat & Kelompok Rentan',
    badge: 'Masyarakat Umum',
    warna: '#ef4444',
    pesan:
      '🚨 PERINGATAN DINI RESMI BPBD (AI HYDROGUARD) 🚨\nKetinggian air Sungai Ciliwung terdeteksi 3.9 meter (SIAGA 1). Pola aliran 94.8% identik banjir 2020. Air diprediksi menggenangi RW 01-04 Kelurahan Kampung Melayu setinggi 90-140 cm dalam tempo 1-2 jam ke depan.\n\nINSTRUKSI SEGERA:\n1. Matikan MCB meteran listrik PLN & cabut tabung gas!\n2. Evakuasi lansia dan anak menuju POSKO GOR OTISTA JATINEGARA.\n3. Hubungi Call Center 112 jika butuh perahu karet evakuasi.',
  },
  timSar: {
    judul: 'Tim Reaksi Cepat (TRC) BPBD & BASARNAS',
    badge: 'Petugas Lapangan',
    warna: '#f59e0b',
    pesan:
      '📢 OPERATIONAL DIRECTIVE #TRC-082\nAI Matching Model mengonfirmasi risiko jebol tanggul di Bidara Cina & Kampung Melayu. Debit limpasan hulu hulu Katulampa 540 m³/s.\n\nTINDAKAN TAKTIS:\n- Deploy 4 unit LCR (perahu karet) ke dermaga darurat RW 03.\n- Buka tenda posko medis di pelataran GOR Otista.\n- Koordinasikan pengamanan jalur evakuasi bersama Satpol PP.',
  },
  pintuAir: {
    judul: 'Operator Pintu Air & Pompa Pengendali',
    badge: 'Infrastruktur SDA',
    warna: '#0ea5e9',
    pesan:
      '⚙️ MANDAT SISTEM PENGATURAN AIR OTOMATIS\nPrediksi puncak luapan tiba di Manggarai pukul 18:45 WIB. Kondisi pasang laut di Waduk Pluit tercatat 1.85m dpl.\n\nINSTRUKSI TEKNIS:\n- Buka pintu air Banjir Kanal Barat (BKB) bertahap hingga 50%.\n- Aktifkan 4 pompa stasioner Waduk Pluit untuk menurunkan muka air laut.\n- Monitor terus sensor ultrasonik S-004 secara berkala.',
  },
};

export const recentBroadcastLogs = [
  {
    id: 'BC-9921',
    waktu: '10 menit lalu (16:40 WIB)',
    wilayah: 'DAS Ciliwung Hulu — Jatinegara',
    kanal: 'WhatsApp Blast + Sirine Posko + Push Notification',
    penerima: '14.820 Warga',
    status: 'Terkirim 99.4%',
    aiTrigger: 'Matching Pola 2020 >90%',
  },
  {
    id: 'BC-9920',
    waktu: '45 menit lalu (16:05 WIB)',
    wilayah: 'Kali Angke — Cengkareng Barat',
    kanal: 'WhatsApp Blast + SMS Kominfo',
    penerima: '8.450 Warga',
    status: 'Terkirim 98.9%',
    aiTrigger: 'Debit Kali Angke Meluap 4.2m',
  },
  {
    id: 'BC-9919',
    waktu: '2 jam lalu (14:50 WIB)',
    wilayah: 'Waduk Pluit & Penjaringan',
    kanal: 'Internal Radio BPBD & Pompa SDA',
    penerima: '320 Personel',
    status: 'Terkirim 100%',
    aiTrigger: 'Prediksi Pasang Air Laut Pukul 15:00',
  },
];
