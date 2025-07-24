"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { createEnrollment, deleteEnrollment, fetchStudent, fetchEnrollment, fetchCourse, updateEnrollment} from "@/lib/api";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import EnrollmentFormModal from "./EnrollmentFormModal";

interface Student {
  id: number;
  name: string;
}

interface Course {
  id: number;
  name: string;
}
interface Enrollment {
  id: number;
  student_id: string; 
  course_id: string;
  grade: string;
  attendance: number;
  status: string;
  student: { name: string };
  course: { name: string };
}

export default function EnrollmentList() {
  const [enrollment, setEnrollment] = useState<Enrollment[]>([]);
  const [student, setStudent] = useState<Student[]>([]);
  const [course, setCourse] = useState<Course[]>([]);

  useEffect(() => {
    loadData();
    fetchEnrollment().then(setEnrollment);
  }, []);

  const loadData = async () => {
    try {
      const token = localStorage.getItem("token");
      // Ambil semua data secara paralel untuk efisiensi
      const [fetchedEnrollment, fetchedStudent, fetchedCourse] = await Promise.all([
        fetchEnrollment(token),
        fetchStudent(token),
        fetchCourse(token),
      ]);
      setEnrollment(fetchedEnrollment);
      setStudent(fetchedStudent);
      setCourse(fetchedCourse);
    } catch (error) {
      toast.error("Gagal memuat data dari server.");
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      await deleteEnrollment(id, token);
      setEnrollment((prev) => prev.filter((u) => u.id !== id));
      loadData();
      toast.success("Pendaftar mata kuliah berhasil dihapus");
    } catch (err) {
      toast.error("Gagal menghapus Pendaftar mata kuliah");
    }
  };

  const handleUpdate = async (data: any) => {
    const token = localStorage.getItem("token");
    try {
      await updateEnrollment(data.id, data, token);
      const updatedEnrollment = await fetchEnrollment();
      setEnrollment(updatedEnrollment);
      loadData();
      toast.success("Pendaftar mata kuliah berhasil diupdate");
    } catch (err) {
      toast.error("Gagal mengupdate Pendaftar mata kuliah");
    }
  };

  const handleCreate = async (data: any) => {
    const token = localStorage.getItem("token");
    try {
      await createEnrollment(data, token);
      const updated = await fetchEnrollment();
      setEnrollment(updated);
      loadData();
      toast.success("Pendaftar mata kuliah berhasil ditambahkan");
    } catch (err) {
      toast.error("Gagal menambahkan pendaftar mata kuliah");
    }
  };


  return (
    <div className="rounded-md border p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Pendaftar Mata Kuliah</h2>
        <EnrollmentFormModal
          onSubmit={handleCreate}
          student={student}
          course={course}
          trigger={<Button>+ Tambah</Button>}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>ID Mahasiswa</TableHead>
            <TableHead>ID Mata Kuliah</TableHead>
            <TableHead>Nilai Akhir</TableHead>
            <TableHead>Presentase Kehadiran</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enrollment.map((cl, index) => (
            <TableRow key={cl.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{cl.student?.name || ""}</TableCell>
              <TableCell>{cl.course?.name || ""}</TableCell>
              <TableCell>{cl.grade || ""}</TableCell>
              <TableCell>{cl.attendance || ""}</TableCell>
              <TableCell>{cl.status || ""}</TableCell>
              <TableCell className="text-right space-x-2">
                <EnrollmentFormModal
                  enrollment={cl}
                  onSubmit={handleUpdate}
                  student={student}
                  course={course}
                  trigger={
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  }
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      Hapus
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Yakin ingin menghapus data ini?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Tindakan ini tidak bisa dibatalkan. Data akan hilang
                        permanen.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(cl.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Ya, Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}