// Dummy API functions that simulate backend calls
// In production, these would make actual HTTP requests to the backend

import type { Document, VerificationResult } from '@/store/app-store'

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Dummy verification function
export async function verifyDocument(file: File): Promise<VerificationResult> {
  await delay(3200) // Simulate 3.2 second processing time
  
  // Randomly generate verification results for demo
  const accuracy = Math.random() * 0.15 + 0.85 // 85-100%
  const qualityScore = Math.random() * 0.2 + 0.8 // 80-100%
  const ocrConfidence = Math.random() * 0.1 + 0.9 // 90-100%
  const isAuthentic = Math.random() > 0.1 // 90% chance authentic
  
  const possibleIssues = [
    'Dokumen sedikit buram',
    'Resolusi rendah pada bagian bawah',
    'Watermark tidak terdeteksi',
    'Format tanggal tidak standar',
    'Tanda tangan tidak jelas',
  ]
  
  const issues = isAuthentic 
    ? (Math.random() > 0.7 ? [possibleIssues[Math.floor(Math.random() * possibleIssues.length)]] : [])
    : ['Dokumen tidak sesuai dengan template resmi', 'Tanda-tanda manipulasi terdeteksi']
  
  return {
    accuracy: Math.round(accuracy * 100),
    isAuthentic,
    issues,
    qualityScore: Math.round(qualityScore * 100),
    ocrConfidence: Math.round(ocrConfidence * 100),
    extractedData: {
      nama: 'John Doe',
      nik: '1234567890123456',
      tempatLahir: 'Jakarta',
      tanggalLahir: '01-01-1990',
      jenisKelamin: 'Laki-laki',
      alamat: 'Jl. Contoh No. 123',
      agama: 'Islam',
      statusPerkawinan: 'Belum Kawin',
      pekerjaan: 'Pegawai Swasta',
    },
  }
}

// Batch verification
export async function verifyDocumentsBatch(files: File[]): Promise<VerificationResult[]> {
  // Simulate batch processing (2.1 seconds per document)
  await delay(2100 * files.length)
  
  return Promise.all(files.map(() => verifyDocument(new File([], 'dummy'))))
}

// Upload document
export async function uploadDocument(file: File): Promise<Document> {
  await delay(1000)
  
  return {
    id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: file.name,
    type: file.type,
    size: file.size,
    uploadedAt: new Date().toISOString(),
    status: 'pending',
  }
}

// Get analytics data
export async function getAnalytics(period: 'week' | 'month' | 'year') {
  await delay(500)
  
  const dataPoints = period === 'week' ? 7 : period === 'month' ? 30 : 12
  const data = []
  
  for (let i = 0; i < dataPoints; i++) {
    data.push({
      date: new Date(Date.now() - (dataPoints - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      verified: Math.floor(Math.random() * 1000) + 500,
      failed: Math.floor(Math.random() * 100) + 20,
      pending: Math.floor(Math.random() * 200) + 50,
    })
  }
  
  return data
}

// Get recent documents
export async function getRecentDocuments(limit: number = 10): Promise<Document[]> {
  await delay(300)
  
  // Return dummy data
  return []
}
