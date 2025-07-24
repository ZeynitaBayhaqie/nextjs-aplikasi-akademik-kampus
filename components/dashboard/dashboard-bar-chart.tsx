"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DashboardSummary } from "@/lib/api"

// Konfigurasi ini tetap berguna untuk tooltip
const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function DashboardBarChart({ data }: { data: DashboardSummary | null }) {
  const chartData = React.useMemo(() => {
    if (!data) return []
    return [
      { name: 'Mahasiswa', total: data.total_students },
      { name: 'Dosen', total: data.total_lecturers },
      { name: 'Mata Kuliah', total: data.total_courses },
    ]
  }, [data])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perbandingan Jumlah Entitas</CardTitle>
        <CardDescription>Perbandingan jumlah mahasiswa, dosen, dan mata kuliah.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart data={chartData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            {/* PERBAIKAN DI SINI: Langsung gunakan warna --primary */}
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}