"use client"

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

interface Course {
  id?: number 
  credits: string
  semester: string
  name: string
  code: string
}

interface Props {
  course?: Course
  trigger: React.ReactNode
  onSubmit: (data: Course) => void
}

export default function CourseFormModal({ course, trigger, onSubmit }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Course>({
    credits: course?.credits || "",
    semester: course?.semester || "",
    name: course?.name || "",
    code: course?.code || "",
    id: course?.id || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
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
          <DialogTitle>{course ? "Edit Course" : "Tambah Course"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">

          <Input
            name="credits"
            placeholder="Jumlah SKS"
            value={form.credits}
            onChange={handleChange}
          />
          <Input
            name="semester"
            placeholder="Semester"
            value={form.semester}
            onChange={handleChange}
          />
          <Input
            name="name"
            placeholder="Nama Matakuliah"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            name="code"
            placeholder="Kode Matkul"
            value={form.code}
            onChange={handleChange}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>
            {course ? "Simpan Perubahan" : "Tambah"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}