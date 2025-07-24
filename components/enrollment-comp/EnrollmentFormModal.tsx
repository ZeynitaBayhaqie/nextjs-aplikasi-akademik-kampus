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

interface Student {
  id: number;
  name: string;
}

interface Course {
  id: number;
  name: string;
}

interface Enrollment {
  id: number
  student_id: string
  course_id: string
  grade: string
  attendance: number
  status: string
}

interface Props {
  enrollment?: Enrollment
  trigger: React.ReactNode
  onSubmit: (data: Enrollment) => void
  student: Student []
  course: Course[]
}

export default function EnrollmentFormModal({ enrollment, student, course, trigger, onSubmit }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Enrollment>({
    student_id: enrollment?.student_id || "",
    course_id: enrollment?.course_id || "",
    grade: enrollment?.grade || "",
    attendance: enrollment?.attendance || "",
    status: enrollment?.status || "",
    id: enrollment?.id || 0,
  })

  const handleChange = (name: 'student_id' | 'course_id' | 'grade' | 'attendance' | 'status', value: string) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = () => {
    // Kirim data tanpa ID jika itu yang diharapkan oleh fungsi create
    const { id, ...dataToSubmit } = form;
    if (enrollment) {
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
        student_id: enrollment?.student_id || "",
        course_id: enrollment?.course_id || "",
        grade: enrollment?.grade || "",
        attendance: enrollment?.attendance || "",
        status: enrollment?.status || "",
        id: enrollment?.id || 0,
      });
    }
  }, [open, enrollment]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{enrollment ? "Edit Pendaftar Mata Kuliah" : "Tambah Pendaftar Mata Kuliah"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <Select
            name="student_id"
            value={form.student_id}
            onValueChange={(value) => handleChange('student_id', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih Mahasiswa" />
            </SelectTrigger>
            <SelectContent>
              {student.map((student) => (
                <SelectItem key={student.id} value={String(student.id)}>
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            name="course_id"
            value={form.course_id}
            onValueChange={(value) => handleChange('course_id', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih Nama Mata Kuliah" />
            </SelectTrigger>
            <SelectContent>
              {course.map((course) => (
                <SelectItem key={course.id} value={String(course.id)}>
                  {course.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Nilai Akhir"
            value={form.grade}
            onChange={(e) => handleChange('grade', e.target.value)}
          />
          <Input
            placeholder="Presentasi Kehadiran"
            value={form.attendance}
            onChange={(e) => handleChange('attendance', e.target.value)}
          />
          <Input
            placeholder="Status Pengambilan Matkul"
            value={form.status}
            onChange={(e) => handleChange('status', e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>
            {enrollment ? "Simpan Perubahan" : "Tambah"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}