"use client"

import { IconUsers, IconBriefcase, IconBook, IconPencilPlus } from "@tabler/icons-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardSummary } from "@/lib/api"

export function SectionCards({ data }: { data: DashboardSummary | null }) {
  if (!data) return null; // Tidak merender apa-apa jika data belum ada

  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:px-6 @5xl/main:grid-cols-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription>Total Mahasiswa</CardDescription>
            <IconUsers className="size-5 text-muted-foreground" />
          </div>
          <CardTitle className="text-3xl font-semibold">{data.total_students}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
           <div className="flex items-center justify-between">
            <CardDescription>Total Dosen</CardDescription>
            <IconBriefcase className="size-5 text-muted-foreground" />
          </div>
          <CardTitle className="text-3xl font-semibold">{data.total_lecturers}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription>Total Mata Kuliah</CardDescription>
            <IconBook className="size-5 text-muted-foreground" />
          </div>
          <CardTitle className="text-3xl font-semibold">{data.total_courses}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription>Total Pendaftaran</CardDescription>
            <IconPencilPlus className="size-5 text-muted-foreground" />
          </div>
          <CardTitle className="text-3xl font-semibold">{data.total_enrollments}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}