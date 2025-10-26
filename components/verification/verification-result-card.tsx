'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import type { VerificationResult } from '@/store/app-store'

interface VerificationResultCardProps {
  result: VerificationResult
  documentName: string
}

export function VerificationResultCard({ result, documentName }: VerificationResultCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{documentName}</CardTitle>
          <Badge variant={result.isAuthentic ? 'success' : 'destructive'}>
            {result.isAuthentic ? (
              <>
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Verified
              </>
            ) : (
              <>
                <XCircle className="mr-1 h-3 w-3" />
                Failed
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Akurasi</p>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={result.accuracy} className="flex-1" />
              <span className="text-sm font-medium">{result.accuracy}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Kualitas</p>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={result.qualityScore} className="flex-1" />
              <span className="text-sm font-medium">{result.qualityScore}%</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">OCR Confidence</p>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={result.ocrConfidence} className="flex-1" />
              <span className="text-sm font-medium">{result.ocrConfidence}%</span>
            </div>
          </div>
        </div>

        {result.issues.length > 0 && (
          <div className="rounded-lg bg-yellow-50 dark:bg-yellow-950 p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                  Masalah Terdeteksi
                </p>
                <ul className="mt-2 space-y-1">
                  {result.issues.map((issue, index) => (
                    <li key={index} className="text-sm text-yellow-800 dark:text-yellow-200">
                      • {issue}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div>
          <p className="text-sm font-medium mb-2">Data yang Diekstrak</p>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(result.extractedData).map(([key, value]) => (
              <div key={key} className="rounded-lg border p-2">
                <p className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                <p className="text-sm font-medium mt-1">{value as string}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
