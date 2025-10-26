'use client'

import { Header } from '@/components/layout/sidebar'
import { FileUpload } from '@/components/upload/file-upload'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { InfoIcon } from 'lucide-react'

export default function UploadPage() {
  return (
    <>
      <Header title="Upload Dokumen" />
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            Dokumen akan diverifikasi secara otomatis dalam 3.2 detik setelah upload. 
            Format yang didukung: PDF, JPG, PNG (Maksimal 10MB per file).
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="single">Upload Single</TabsTrigger>
            <TabsTrigger value="batch">Upload Batch</TabsTrigger>
          </TabsList>
          
          <TabsContent value="single" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Dokumen</CardTitle>
                <CardDescription>
                  Upload satu atau beberapa dokumen untuk diverifikasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="batch" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Batch</CardTitle>
                <CardDescription>
                  Upload banyak dokumen sekaligus (hingga 10,000 dokumen per jam)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload />
                <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    <strong>Batch Processing:</strong> Sistem akan memproses dokumen secara paralel 
                    dengan kecepatan 2.1 detik per dokumen. Anda akan menerima notifikasi setelah 
                    semua dokumen selesai diverifikasi.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Panduan Upload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-medium text-sm mb-1">Format File</h4>
              <p className="text-sm text-muted-foreground">
                • PDF (portable document format)<br />
                • JPG/JPEG (gambar)<br />
                • PNG (gambar)<br />
                • Maksimal 10MB per file
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-1">Tips untuk Hasil Terbaik</h4>
              <p className="text-sm text-muted-foreground">
                • Pastikan dokumen tidak buram atau terpotong<br />
                • Resolusi minimal 300 DPI<br />
                • Hindari bayangan atau pantulan pada dokumen<br />
                • Pastikan dokumen terlihat jelas dan lengkap
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-1">Proses Verifikasi</h4>
              <p className="text-sm text-muted-foreground">
                1. Upload dokumen<br />
                2. Sistem melakukan OCR otomatis<br />
                3. AI menganalisis keaslian dokumen<br />
                4. Validasi data antar dokumen<br />
                5. Hasil verifikasi ditampilkan dalam 3.2 detik
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  )
}
