"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Input } from "../ui/input";

interface Course {
  id: number;
  name: string;
}

interface Lecturer {
  id: number;
  name: string;
}

interface CourseLecturer {
  id: number
  course_id: string
  lecturer_id: string
  role: string
}

interface Props {
  courseLecturer?: CourseLecturer
  trigger: React.ReactNode
  onSubmit: (data: CourseLecturer) => void
  course: Course []
  lecturer: Lecturer[]
}

export default function CourseLecturerFormModal({ courseLecturer, course, lecturer, trigger, onSubmit }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<CourseLecturer>({
    course_id: courseLecturer?.course_id || "",
    lecturer_id: courseLecturer?.lecturer_id || "",
    role: courseLecturer?.role || "",
    id: courseLecturer?.id || 0,
  })

  const handleChange = (name: 'course_id' | 'lecturer_id' | 'role', value: string) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = () => {
    // Kirim data tanpa ID jika itu yang diharapkan oleh fungsi create
    const { id, ...dataToSubmit } = form;
    if (courseLecturer) {
      // Jika edit, sertakan ID
      onSubmit({id, ...dataToSubmit});
    } else {
      // Jika create, kirim tanpa ID
      onSubmit(dataToSubmit);
    }
    setOpen(false);
  };

  // useEffect untuk mereset form saat modal ditutup atau properti berubah
  useEffect(() => {
    if (open) {
      setForm({
        id: courseLecturer?.id || 0,
        course_id: courseLecturer?.course_id || "",
        lecturer_id: courseLecturer?.lecturer_id || "",
        role: courseLecturer?.role || "",
      });
    }
  }, [open, courseLecturer]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{courseLecturer ? "Edit Dosen Mata Kuliah" : "Tambah Dosen Mata Kuliah"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <Select
            name="course_id"
            value={form.course_id}
            onValueChange={(value) => handleChange('course_id', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih Mata Kuliah" />
            </SelectTrigger>
            <SelectContent>
              {course.map((course) => (
                <SelectItem key={course.id} value={String(course.id)}>
                  {course.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            name="lecturer_id"
            value={form.lecturer_id}
            onValueChange={(value) => handleChange('lecturer_id', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih Nama Dosen" />
            </SelectTrigger>
            <SelectContent>
              {lecturer.map((lecturer) => (
                <SelectItem key={lecturer.id} value={String(lecturer.id)}>
                  {lecturer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Peran (e.g., Dosen Pengampu, Asisten)"
            value={form.role}
            onChange={(e) => handleChange('role', e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>
            {courseLecturer ? "Simpan Perubahan" : "Tambah"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}