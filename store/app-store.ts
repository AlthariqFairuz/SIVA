import { create } from 'zustand'

export interface Document {
  id: string
  name: string
  type: string
  size: number
  uploadedAt: string
  status: 'pending' | 'processing' | 'verified' | 'failed'
  verificationResult?: VerificationResult
}

export interface VerificationResult {
  accuracy: number
  isAuthentic: boolean
  issues: string[]
  qualityScore: number
  ocrConfidence: number
  extractedData: Record<string, any>
}

export interface Stats {
  totalDocuments: number
  verified: number
  failed: number
  pending: number
  accuracy: number
}

interface AppState {
  documents: Document[]
  stats: Stats
  isUploading: boolean
  addDocument: (doc: Omit<Document, 'id' | 'uploadedAt' | 'status'>) => void
  updateDocument: (id: string, updates: Partial<Document>) => void
  setUploading: (isUploading: boolean) => void
  refreshStats: () => void
}

// Dummy verification data
const dummyDocuments: Document[] = [
  {
    id: 'doc-1',
    name: 'KTP_Randy_Router.pdf',
    type: 'application/pdf',
    size: 2048576,
    uploadedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    status: 'verified',
    verificationResult: {
      accuracy: 98,
      isAuthentic: true,
      issues: [],
      qualityScore: 95,
      ocrConfidence: 97,
      extractedData: {
        nik: '3273012301950001',
        nama: 'Randy Router',
        tempatLahir: 'Jakarta',
        tanggalLahir: '23-01-1995',
        jenisKelamin: 'LAKI-LAKI',
        alamat: 'JL. MERDEKA NO. 123',
        agama: 'ISLAM',
        statusPerkawinan: 'BELUM KAWIN',
        pekerjaan: 'PEGAWAI NEGERI SIPIL',
      }
    }
  },
  {
    id: 'doc-2',
    name: 'Ijazah_S1_Mulyono.jpg',
    type: 'image/jpeg',
    size: 3145728,
    uploadedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    status: 'verified',
    verificationResult: {
      accuracy: 96,
      isAuthentic: true,
      issues: ['Kualitas gambar sedikit buram di bagian kanan bawah'],
      qualityScore: 88,
      ocrConfidence: 94,
      extractedData: {
        nomorIjazah: 'IJ-2018-001234',
        nama: 'Mulyono',
        nim: '12345678',
        program: 'S1 Teknik Informatika',
        universitas: 'Universitas Indonesia',
        tahunLulus: '2018',
        ipk: '3.75',
      }
    }
  },
  {
    id: 'doc-3',
    name: 'Transkrip_Nilai_Ahmad.pdf',
    type: 'application/pdf',
    size: 1572864,
    uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    status: 'failed',
    verificationResult: {
      accuracy: 45,
      isAuthentic: false,
      issues: [
        'Tanda tangan digital tidak valid',
        'Watermark tidak terdeteksi',
        'Format dokumen tidak sesuai standar',
        'Inkonsistensi data dengan database universitas'
      ],
      qualityScore: 62,
      ocrConfidence: 78,
      extractedData: {
        nim: '87654321',
        nama: 'Ahmad Susanto',
        program: 'S1 Manajemen',
        universitas: 'Universitas Negeri Jakarta',
        semester: '8',
        ipk: '3.45',
      }
    }
  },
  {
    id: 'doc-4',
    name: 'Surat_Keterangan_Kerja.pdf',
    type: 'application/pdf',
    size: 1048576,
    uploadedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    status: 'verified',
    verificationResult: {
      accuracy: 92,
      isAuthentic: true,
      issues: ['Stempel perusahaan sedikit pudar'],
      qualityScore: 90,
      ocrConfidence: 93,
      extractedData: {
        nomorSurat: 'SKK/2024/001',
        nama: 'Budi Santoso',
        nik: '3273045607890002',
        jabatan: 'Senior Analyst',
        perusahaan: 'PT. Indonesia Maju',
        masaKerja: '5 Tahun 3 Bulan',
        tanggalSurat: '15-01-2024',
      }
    }
  },
  {
    id: 'doc-5',
    name: 'KK_Keluarga_Wijaya.jpg',
    type: 'image/jpeg',
    size: 2621440,
    uploadedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    status: 'verified',
    verificationResult: {
      accuracy: 97,
      isAuthentic: true,
      issues: [],
      qualityScore: 94,
      ocrConfidence: 96,
      extractedData: {
        nomorKK: '3273012301950001',
        kepalaKeluarga: 'Wijaya Kusuma',
        alamat: 'JL. SUDIRMAN NO. 45',
        rt: '003',
        rw: '005',
        kelurahan: 'MENTENG',
        kecamatan: 'MENTENG',
        kabupatenKota: 'JAKARTA PUSAT',
        provinsi: 'DKI JAKARTA',
      }
    }
  },
  {
    id: 'doc-6',
    name: 'SKCK_Polisi.pdf',
    type: 'application/pdf',
    size: 1835008,
    uploadedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    status: 'verified',
    verificationResult: {
      accuracy: 99,
      isAuthentic: true,
      issues: [],
      qualityScore: 98,
      ocrConfidence: 99,
      extractedData: {
        nomorSKCK: 'SKCK/2024/001234',
        nama: 'Dewi Lestari',
        nik: '3273015604920003',
        tempatLahir: 'Bandung',
        tanggalLahir: '16-04-1992',
        pekerjaan: 'GURU',
        alamat: 'JL. GATOT SUBROTO NO. 78',
        keperluan: 'CPNS',
        berlakuHingga: '15-07-2024',
      }
    }
  },
  {
    id: 'doc-7',
    name: 'Sertifikat_Pelatihan_Fake.pdf',
    type: 'application/pdf',
    size: 2097152,
    uploadedAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
    status: 'failed',
    verificationResult: {
      accuracy: 38,
      isAuthentic: false,
      issues: [
        'QR Code tidak valid atau tidak dapat dipindai',
        'Logo institusi tidak sesuai dengan database',
        'Nomor sertifikat tidak terdaftar',
        'Font dan layout tidak sesuai template resmi',
        'Metadata file menunjukkan tanggal pembuatan yang mencurigakan'
      ],
      qualityScore: 55,
      ocrConfidence: 82,
      extractedData: {
        nomorSertifikat: 'CERT-2024-9999',
        nama: 'Indra Gunawan',
        namaProgram: 'Pelatihan Leadership',
        penyelenggara: 'Lembaga Pelatihan Nasional',
        tanggal: '20-12-2023',
        durasi: '40 Jam',
      }
    }
  },
  {
    id: 'doc-8',
    name: 'Paspor_Maria.jpg',
    type: 'image/jpeg',
    size: 3670016,
    uploadedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    status: 'verified',
    verificationResult: {
      accuracy: 95,
      isAuthentic: true,
      issues: ['Refleksi cahaya pada halaman foto'],
      qualityScore: 89,
      ocrConfidence: 94,
      extractedData: {
        nomorPaspor: 'X1234567',
        nama: 'Maria Angelina',
        tempatLahir: 'Surabaya',
        tanggalLahir: '12-08-1988',
        jenisKelamin: 'PEREMPUAN',
        kewarganegaraan: 'INDONESIA',
        tanggalTerbit: '05-01-2022',
        tanggalBerlaku: '05-01-2027',
      }
    }
  },
]

export const useAppStore = create<AppState>((set, get) => ({
  documents: dummyDocuments,
  stats: {
    totalDocuments: dummyDocuments.length,
    verified: dummyDocuments.filter(d => d.status === 'verified').length,
    failed: dummyDocuments.filter(d => d.status === 'failed').length,
    pending: dummyDocuments.filter(d => d.status === 'pending' || d.status === 'processing').length,
    accuracy: dummyDocuments.reduce((sum, d) => sum + (d.verificationResult?.accuracy || 0), 0) / dummyDocuments.length,
  },
  isUploading: false,
  
  addDocument: (doc) => {
    const newDoc: Document = {
      ...doc,
      id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      uploadedAt: new Date().toISOString(),
      status: 'pending',
    }
    set((state) => ({
      documents: [newDoc, ...state.documents],
    }))
    get().refreshStats()
  },
  
  updateDocument: (id, updates) => {
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === id ? { ...doc, ...updates } : doc
      ),
    }))
    get().refreshStats()
  },
  
  setUploading: (isUploading) => set({ isUploading }),
  
  refreshStats: () => {
    const { documents } = get()
    const verified = documents.filter((d) => d.status === 'verified').length
    const failed = documents.filter((d) => d.status === 'failed').length
    const pending = documents.filter((d) => d.status === 'pending' || d.status === 'processing').length
    const totalDocuments = documents.length
    
    const accuracySum = documents
      .filter((d) => d.verificationResult)
      .reduce((sum, d) => sum + (d.verificationResult?.accuracy || 0), 0)
    const accuracy = documents.filter((d) => d.verificationResult).length > 0
      ? accuracySum / documents.filter((d) => d.verificationResult).length
      : 0
    
    set({
      stats: {
        totalDocuments,
        verified,
        failed,
        pending,
        accuracy,
      },
    })
  },
}))
