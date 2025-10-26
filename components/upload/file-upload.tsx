'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useAppStore } from '@/store/app-store'
import { verifyDocument } from '@/lib/api'
import { useToast } from '@/components/ui/use-toast'

export function FileUpload() {
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const { addDocument, updateDocument, setUploading } = useAppStore()
  const { toast } = useToast()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setUploading(true)
    
    for (const file of files) {
      try {
        // Add document to store
        addDocument({
          name: file.name,
          type: file.type,
          size: file.size,
        })

        // Simulate upload progress
        const docId = `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        for (let i = 0; i <= 100; i += 10) {
          setUploadProgress((prev) => ({ ...prev, [file.name]: i }))
          await new Promise((resolve) => setTimeout(resolve, 100))
        }

        // Verify document
        const result = await verifyDocument(file)
        
        // Update document with verification result
        updateDocument(docId, {
          status: result.isAuthentic ? 'verified' : 'failed',
          verificationResult: result,
        })

        toast({
          title: 'Verifikasi Selesai',
          description: `${file.name} ${result.isAuthentic ? 'berhasil diverifikasi' : 'gagal verifikasi'}`,
        })
      } catch (error) {
        toast({
          title: 'Error',
          description: `Gagal memproses ${file.name}`,
          variant: 'destructive',
        })
      }
    }

    setFiles([])
    setUploadProgress({})
    setUploading(false)
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        {isDragActive ? (
          <p className="text-lg font-medium">Drop file di sini...</p>
        ) : (
          <>
            <p className="text-lg font-medium mb-2">
              Drag & drop file atau klik untuk upload
            </p>
            <p className="text-sm text-muted-foreground">
              PDF, JPG, PNG (Maks. 10MB)
            </p>
          </>
        )}
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">File yang akan diupload ({files.length})</h3>
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3 flex-1">
                <File className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  {uploadProgress[file.name] !== undefined && (
                    <Progress value={uploadProgress[file.name]} className="mt-2" />
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFile(index)}
                disabled={uploadProgress[file.name] !== undefined}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="flex gap-2">
          <Button onClick={handleUpload} disabled={uploadProgress[files[0]?.name] !== undefined}>
            {uploadProgress[files[0]?.name] !== undefined ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              'Upload & Verifikasi'
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setFiles([])
              setUploadProgress({})
            }}
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  )
}
