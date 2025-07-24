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
import { createCourseLecturer, deleteCourseLecturer, fetchCourse, fetchCourseLecturer, fetchLecturer, updateCourseLecturer } from "@/lib/api";
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
import CourseLecturerFormModal from "./CourseLecturerFormModal";

interface Course {
  id: number;
  name: string;
}

interface Lecturer {
  id: number;
  name: string;
}
interface CourseLecturer {
  id: number;
  course_id: string;
  lecturer_id: string;
  role: string;
  course: { name: string };
  lecturer: { name: string };
}

export default function CourseLecturerList() {
  const [courseLecturer, setCourseLecturer] = useState<CourseLecturer[]>([]);
  const [course, setCourse] = useState<Course[]>([]);
  const [lecturer, setLecturer] = useState<Lecturer[]>([]);

  useEffect(() => {
    loadData();
    fetchCourseLecturer().then(setCourseLecturer);
  }, []);

  const loadData = async () => {
    try {
      const token = localStorage.getItem("token");
      // Ambil semua data secara paralel untuk efisiensi
      const [fetchedCourseLecturer, fetchedCourse, fetchedLecturer] = await Promise.all([
        fetchCourseLecturer(token),
        fetchCourse(token),
        fetchLecturer(token),
      ]);
      setCourseLecturer(fetchedCourseLecturer);
      setCourse(fetchedCourse);
      setLecturer(fetchedLecturer);
    } catch (error) {
      toast.error("Gagal memuat data dari server.");
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      await deleteCourseLecturer(id, token);
      setCourseLecturer((prev) => prev.filter((u) => u.id !== id));
      loadData();
      toast.success("Dosen mata kuliah berhasil dihapus");
    } catch (err) {
      toast.error("Gagal menghapus dosen mata kuliah");
    }
  };

  const handleUpdate = async (data: any) => {
    const token = localStorage.getItem("token");
    try {
      await updateCourseLecturer(data.id, data, token);
      const updatedCourseLecturers = await fetchCourseLecturer();
      setCourseLecturer(updatedCourseLecturers);
      loadData();
      toast.success("Dosen mata kuliah berhasil diupdate");
    } catch (err) {
      toast.error("Gagal mengupdate dosen mata kuliah");
    }
  };

  const handleCreate = async (data: any) => {
    const token = localStorage.getItem("token");
    try {
      await createCourseLecturer(data, token);
      const updated = await fetchCourseLecturer();
      setCourseLecturer(updated);
      loadData();
      toast.success("Dosen mata kuliah berhasil ditambahkan");
    } catch (err) {
      toast.error("Gagal menambahkan dosen mata kuliah");
    }
  };


  return (
    <div className="rounded-md border p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Daftar Dosen Mata Kuliah</h2>
        <CourseLecturerFormModal
          onSubmit={handleCreate}
          course={course}
          lecturer={lecturer}
          trigger={<Button>+ Tambah</Button>}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Nama Mata Kuliah</TableHead>
            <TableHead>Nama Dosen</TableHead>
            <TableHead>Peran</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courseLecturer.map((cl, index) => (
            <TableRow key={cl.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{cl.course?.name || ""}</TableCell>
              <TableCell>{cl.lecturer?.name || ""}</TableCell>
              <TableCell>{cl.role || ""}</TableCell>
              <TableCell className="text-right space-x-2">
                <CourseLecturerFormModal
                  courseLecturer={cl}
                  onSubmit={handleUpdate}
                  course={course}
                  lecturer={lecturer}
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