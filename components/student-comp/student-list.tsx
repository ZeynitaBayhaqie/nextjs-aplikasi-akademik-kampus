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
import { createStudent, deleteStudent, fetchStudent, updateStudent } from "@/lib/api";
import { Button } from "../ui/button";
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
import StudentFormModal from "./StudentFormModal";
import { toast } from "sonner";

interface Student {
  id: number;
  NIM: string;
  email: string;
  password: string;
  enrollment_year: string;
  major: string;
  name: string;
}

export default function StudentList() {
  const [student, setStudent] = useState<Student[]>([]);

  useEffect(() => {
    fetchStudent().then(setStudent);
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      await deleteStudent(id, token);
      setStudent((prev) => prev.filter((u) => u.id !== id));
      toast.success("Student berhasil dihapus");
    } catch (err) {
      toast.error("Gagal menghapus data Student");
    }
  };

  const handleUpdate = async (data: any) => {
    const token = localStorage.getItem("token");
    try {
      await updateStudent(data.id, data, token);
      const updatedStudent = await fetchStudent();
      setStudent(updatedStudent);

      toast.success("Student berhasil diupdate");
    } catch (err) {
      toast.error("Gagal mengupdate Student");
    }
  };

// const formatRupiah = (angka: number) =>
//   new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0,
//   }).format(angka);

  const handleCreate = async (data: any) => {
    const token = localStorage.getItem("token");
    try {
      await createStudent(data, token);
      const updated = await fetchStudent();
      setStudent(updated);
      toast.success("Student berhasil ditambahkan");
    } catch (err) {
      toast.error("Gagal menambahkan Student");
    }
  };

  return (
    <div className="rounded-md border p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Mahasiswa</h2>
        <StudentFormModal
          onSubmit={handleCreate}
          trigger={<Button>+ Tambah</Button>}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Nim</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Program Studi</TableHead>
            <TableHead>Tahun Masuk Kuliah</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {student.map((student, index) => (
            <TableRow key={student.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{student.NIM}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.major}</TableCell>
              <TableCell>{student.enrollment_year}</TableCell>
              <TableCell className="text-right space-x-2">
                <StudentFormModal
                  student={student}
                  onSubmit={handleUpdate}
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
                        Yakin ingin menghapus user ini?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Tindakan ini tidak bisa dibatalkan. Data akan hilang
                        permanen.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(student.id)}
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
