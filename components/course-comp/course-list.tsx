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
import { createCourse, deleteCourse, fetchCourse, updateCourse } from "@/lib/api";
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
import CourseFormModal from "./CourseFormModal";
import { toast } from "sonner";

interface Course {
  id: number;
  credits: string;
  semester: string;
  name: string;
  code: string;
}

export default function CourseList() {
  const [course, setCourse] = useState<Course[]>([]);

  useEffect(() => {
    fetchCourse().then(setCourse);
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      await deleteCourse(id, token);
      setCourse((prev) => prev.filter((u) => u.id !== id));
      toast.success("Course berhasil dihapus");
    } catch (err) {
      toast.error("Gagal menghapus data Course");
    }
  };

  const handleUpdate = async (data: any) => {
    const token = localStorage.getItem("token");
    try {
      await updateCourse(data.id, data, token);
      const updatedCourse = await fetchCourse();
      setCourse(updatedCourse);

      toast.success("Course berhasil diupdate");
    } catch (err) {
      toast.error("Gagal mengupdate Course");
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
      await createCourse(data, token);
      const updated = await fetchCourse();
      setCourse(updated);
      toast.success("Course berhasil ditambahkan");
    } catch (err) {
      toast.error("Gagal menambahkan Course");
    }
  };

  return (
    <div className="rounded-md border p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Course</h2>
        <CourseFormModal
          onSubmit={handleCreate}
          trigger={<Button>+ Tambah</Button>}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Credits</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {course.map((course, index) => (
            <TableRow key={course.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{course.credits}</TableCell>
              <TableCell>{course.semester}</TableCell>
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.code}</TableCell>
              <TableCell className="text-right space-x-2">
                <CourseFormModal
                  course={course}
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
                        onClick={() => handleDelete(course.id)}
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
