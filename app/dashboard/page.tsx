'use client'

import { useEffect } from 'react'
import { Header } from '@/components/layout/sidebar'
import { StatsCard } from '@/components/dashboard/stats-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/store/app-store'
import { FileCheck, FileX, Clock, TrendingUp, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export default function DashboardPage() {
  const { documents, stats } = useAppStore()

  const recentDocuments = documents.slice(0, 10)

  return (
    <>
      <Header title="Dashboard" />
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Dokumen"
            value={stats.totalDocuments.toLocaleString()}
            description="Total dokumen yang diproses"
            icon={FileText}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Verified"
            value={stats.verified.toLocaleString()}
            description="Dokumen terverifikasi"
            icon={FileCheck}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Failed"
            value={stats.failed.toLocaleString()}
            description="Dokumen gagal"
            icon={FileX}
            trend={{ value: 3, isPositive: false }}
          />
          <StatsCard
            title="Pending"
            value={stats.pending.toLocaleString()}
            description="Menunggu verifikasi"
            icon={Clock}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Akurasi Sistem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Rata-rata Akurasi</span>
                <span className="text-2xl font-bold">{stats.accuracy.toFixed(1)}%</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all" 
                  style={{ width: `${stats.accuracy}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Berdasarkan {stats.totalDocuments} dokumen
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dokumen Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            {recentDocuments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Belum ada dokumen. Upload dokumen untuk memulai verifikasi.
              </p>
            ) : (
              <div className="space-y-2">
                {recentDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(doc.uploadedAt), 'dd MMMM yyyy, HH:mm', { locale: id })}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        doc.status === 'verified'
                          ? 'success'
                          : doc.status === 'failed'
                          ? 'destructive'
                          : doc.status === 'processing'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {doc.status === 'verified'
                        ? 'Verified'
                        : doc.status === 'failed'
                        ? 'Failed'
                        : doc.status === 'processing'
                        ? 'Processing'
                        : 'Pending'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  )
}
