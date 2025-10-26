'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Upload, 
  CheckCircle2, 
  BarChart3,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Upload Dokumen', href: '/dashboard/upload', icon: Upload },
  { name: 'Verifikasi', href: '/dashboard/verification', icon: CheckCircle2 },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <FileText className="h-8 w-8 text-primary" />
        <span className="ml-2 text-xl font-bold">SIVA</span>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      
      <div className="border-t p-4">
        <Button variant="ghost" className="w-full justify-start gap-3">
          <Settings className="h-5 w-5" />
          Pengaturan
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3 text-destructive">
          <LogOut className="h-5 w-5" />
          Keluar
        </Button>
      </div>
    </div>
  )
}

export function Header({ title }: { title: string }) {
  return (
    <header className="h-16 border-b bg-card px-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground">
          Badan Kepegawaian Negara
        </div>
      </div>
    </header>
  )
}
