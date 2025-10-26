# SIVA Frontend

Sistem Intelligens Verifikasi Administrasi - Frontend Next.js untuk verifikasi dokumen CASN dengan AI.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **UI Library**: shadcn/ui
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **State Management**: Zustand
- **Charts**: Recharts
- **File Upload**: React Dropzone

## Fitur Utama

✅ **Dashboard** - Statistik dan monitoring real-time  
✅ **Upload Dokumen** - Drag & drop dengan preview  
✅ **Verifikasi Real-time** - Hasil dalam 3.2 detik  
✅ **Analytics** - Charts dan visualisasi data  
✅ **Batch Processing** - Upload banyak file sekaligus  
✅ **Responsive Design** - Mobile, tablet, dan desktop  

## Instalasi

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Struktur Folder

```
siva-frontend/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard page
│   ├── upload/            # Upload page
│   ├── verification/      # Verification results page
│   ├── analytics/         # Analytics page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Landing page
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components (sidebar, header)
│   ├── dashboard/        # Dashboard-specific components
│   ├── upload/           # Upload-specific components
│   └── verification/     # Verification-specific components
├── lib/                  # Utility functions
│   ├── utils.ts         # Helper functions
│   └── api.ts           # API stubs (dummy backend)
├── store/               # Zustand store
│   └── app-store.ts    # Global application state
└── package.json        # Dependencies
```

## Backend (Dummy API)

Frontend ini menggunakan **dummy API** di `lib/api.ts` untuk simulasi. Semua fungsi backend adalah stub dengan data dummy:

- `verifyDocument()` - Simulasi verifikasi dokumen (3.2 detik)
- `verifyDocumentsBatch()` - Simulasi batch processing (2.1 detik/dokumen)
- `uploadDocument()` - Simulasi upload
- `getAnalytics()` - Generate data analytics dummy

**Untuk production**, ganti semua fungsi di `lib/api.ts` dengan HTTP requests ke backend sebenarnya:

```typescript
// Contoh untuk production
export async function verifyDocument(file: File): Promise<VerificationResult> {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await fetch('/api/verify', {
    method: 'POST',
    body: formData,
  })
  
  return response.json()
}
```

## Integrasi Backend

1. Update `lib/api.ts` dengan URL backend yang sebenarnya
2. Tambahkan authentication (JWT, OAuth, dll)
3. Handle error states dengan proper error handling
4. Tambahkan loading states untuk UX yang lebih baik
