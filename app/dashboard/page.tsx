"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/dashboard/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { columns } from "@/components/dashboard/columns"
import { DashboardBarChart } from "@/components/dashboard/dashboard-bar-chart"
import { fetchDashboardSummary, fetchRecentStudents, DashboardSummary, Student } from "@/lib/api"

export default function Page() {
  const [summaryData, setSummaryData] = React.useState<DashboardSummary | null>(null)
  const [recentStudents, setRecentStudents] = React.useState<Student[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function loadDashboardData() {
      setIsLoading(true);
      try {
        const [summary, students] = await Promise.all([
          fetchDashboardSummary(),
          fetchRecentStudents(),
        ]);
        setSummaryData(summary);
        setRecentStudents(students);
      } catch (err: any) {
        setError(err.message || "Gagal memuat data dashboard.");
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {isLoading ? (
                <div className="px-4 text-center text-muted-foreground lg:px-6">Memuat data dashboard...</div>
              ) : error ? (
                <div className="px-4 text-center text-red-500 lg:px-6">Error: {error}</div>
              ) : (
                <>
                  <SectionCards data={summaryData} />
                  <div className="px-4 lg:px-6">
                    <DashboardBarChart data={summaryData} />
                  </div>
                  <div className="px-4 lg:px-6">
                    <h2 className="text-xl font-semibold mb-4">Mahasiswa Baru Terdaftar</h2>
                    <DataTable columns={columns} data={recentStudents} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}