"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface Student {
  id?: number
  NIM: string
  email: string
  password: string
  enrollment_year: string
  major: string
  name: string
}

interface Props {
  student?: Student
  trigger: React.ReactNode
  onSubmit: (data: Student) => void
}

export default function StudentFormModal({ student, trigger, onSubmit }: Props) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(
    student?.enrollment_year ? new Date(student.enrollment_year) : new Date()
  )

  const [form, setForm] = useState<Student>({
    NIM: student?.NIM || "",
    email: student?.email || "",
    password: "",
    enrollment_year: student?.enrollment_year || format(new Date(), "yyyy-MM-dd"),
    major: student?.major || "",
    name: student?.name || "",
    id: student?.id, // id tetap optional, tidak perlu default 0
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleDateChange = (selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate)
      setForm({
        ...form,
        enrollment_year: format(selectedDate, "yyyy-MM-dd"),
      })
    }
  }

  const handleSubmit = () => {
    onSubmit(form)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{student ? "Edit Student" : "Tambah Student"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <Input
            name="NIM"
            placeholder="NIM"
            value={form.NIM}
            onChange={handleChange}
          />
          <Input
            name="name"
            placeholder="Nama"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          <Input
            name="major"
            placeholder="Program Studi"
            value={form.major}
            onChange={handleChange}
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "yyyy-MM-dd") : "Pilih Tahun Masuk"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>
            {student ? "Simpan Perubahan" : "Tambah"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
