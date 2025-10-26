'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAppStore } from '@/store/app-store'
import { getAnalytics } from '@/lib/api'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function AnalyticsPage() {
  const { stats } = useAppStore()
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week')
  const [chartData, setChartData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const data = await getAnalytics(period)
      setChartData(data)
      setLoading(false)
    }
    fetchData()
  }, [period])

  const pieData = [
    { name: 'Verified', value: stats.verified, color: '#22c55e' },
    { name: 'Failed', value: stats.failed, color: '#ef4444' },
    { name: 'Pending', value: stats.pending, color: '#f59e0b' },
  ]

  const performanceData = [
    { category: 'Akurasi OCR', value: 95, target: 95 },
    { category: 'Deteksi Dokumen Palsu', value: 96, target: 95 },
    { category: 'Kualitas Dokumen', value: 89, target: 90 },
    { category: 'Waktu Verifikasi', value: 98, target: 95 },
  ]

  return (
    <>
      <Header title="Analytics" />
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
            <p className="text-muted-foreground">
              Monitor performa dan statistik verifikasi dokumen
            </p>
          </div>
          <Select value={period} onValueChange={(v) => setPeriod(v as any)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">7 Hari Terakhir</SelectItem>
              <SelectItem value="month">30 Hari Terakhir</SelectItem>
              <SelectItem value="year">12 Bulan Terakhir</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Distribusi Status</CardTitle>
              <CardDescription>Perbandingan status dokumen</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performa Sistem</CardTitle>
              <CardDescription>Target vs Aktual</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" name="Aktual" />
                  <Bar dataKey="target" fill="#94a3b8" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Trend Verifikasi</CardTitle>
            <CardDescription>
              Jumlah dokumen yang diverifikasi dalam {period === 'week' ? '7 hari' : period === 'month' ? '30 hari' : '12 bulan'} terakhir
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Loading data...</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="verified" stroke="#22c55e" strokeWidth={2} name="Verified" />
                  <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} name="Failed" />
                  <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} name="Pending" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Waktu Verifikasi Rata-rata</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3.2 detik</div>
              <p className="text-sm text-muted-foreground mt-1">
                Single document
              </p>
              <div className="text-2xl font-bold mt-3">2.1 detik</div>
              <p className="text-sm text-muted-foreground mt-1">
                Batch processing
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Throughput Harian</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">10,000</div>
              <p className="text-sm text-muted-foreground mt-1">
                Dokumen per jam
              </p>
              <div className="text-2xl font-bold mt-3">240,000</div>
              <p className="text-sm text-muted-foreground mt-1">
                Dokumen per hari
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Penghematan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">70%</div>
              <p className="text-sm text-muted-foreground mt-1">
                Pengurangan SDM manual
              </p>
              <div className="text-2xl font-bold mt-3">Rp 15.5M</div>
              <p className="text-sm text-muted-foreground mt-1">
                Penghematan per tahun
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
