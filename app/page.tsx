import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileText, Zap, Shield, BarChart } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">SIVA</span>
          </div>
          <Link href="/dashboard">
            <Button>Masuk ke Dashboard</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl font-bold tracking-tight">
            Sistem Intelligens Verifikasi Administrasi
          </h1>
          <p className="text-xl text-muted-foreground">
            Solusi AI untuk verifikasi dokumen CASN yang cepat, akurat, dan transparan
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg">Mulai Sekarang</Button>
            </Link>
            <Button size="lg" variant="outline">
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold">Verifikasi Cepat</h3>
            <p className="text-sm text-muted-foreground">
              Verifikasi dokumen dalam 3.2 detik
            </p>
          </div>

          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold">Akurasi Tinggi</h3>
            <p className="text-sm text-muted-foreground">
              Akurasi hingga 97% dengan AI
            </p>
          </div>

          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <BarChart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold">Analytics Real-time</h3>
            <p className="text-sm text-muted-foreground">
              Dashboard monitoring lengkap
            </p>
          </div>

          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold">Batch Processing</h3>
            <p className="text-sm text-muted-foreground">
              10,000 dokumen per jam
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
