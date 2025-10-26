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

export const useAppStore = create<AppState>((set, get) => ({
  documents: [],
  stats: {
    totalDocuments: 0,
    verified: 0,
    failed: 0,
    pending: 0,
    accuracy: 0,
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
