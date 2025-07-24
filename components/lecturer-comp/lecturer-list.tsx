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
import { createLecturer, deleteLecturer, fetchLecturer, updateLecturer } from "@/lib/api";
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
import LecturerFormModal from "./LecturerFormModal";
import { toast } from "sonner";

interface Lecturer {
  id: number;
  name: string;
  NIP: string;
  department: string;
  email: string;
}

export default function LecturerList() {
  const [lecturer, setLecturer] = useState<Lecturer[]>([]);

  useEffect(() => {
    fetchLecturer().then(setLecturer);
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      await deleteLecturer(id, token);
      setLecturer((prev) => prev.filter((u) => u.id !== id));
      toast.success("Lecturer berhasil dihapus");
    } catch (err) {
      toast.error("Gagal menghapus data Lecturer");
    }
  };

  const handleUpdate = async (data: any) => {
    const token = localStorage.getItem("token");
    try {
      await updateLecturer(data.id, data, token);
      const updatedLecturer = await fetchLecturer();
      setLecturer(updatedLecturer);

      toast.success("Lecturer berhasil diupdate");
    } catch (err) {
      toast.error("Gagal mengupdate Lecturer");
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
      await createLecturer(data, token);
      const updated = await fetchLecturer();
      setLecturer(updated);
      toast.success("Lecturer berhasil ditambahkan");
    } catch (err) {
      toast.error("Gagal menambahkan Lecturer");
    }
  };

  return (
    <div className="rounded-md border p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Dosen</h2>
        <LecturerFormModal
          onSubmit={handleCreate}
          trigger={<Button>+ Tambah</Button>}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>Nama Dosen</TableHead>
            <TableHead>NIP</TableHead>
            <TableHead>Dapartement Dosen</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lecturer.map((lecturer, index) => (
            <TableRow key={lecturer.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{lecturer.name}</TableCell>
              <TableCell>{lecturer.NIP}</TableCell>
              <TableCell>{lecturer.department}</TableCell>
              <TableCell>{lecturer.email}</TableCell>
              <TableCell className="text-right space-x-2">
                <LecturerFormModal
                  lecturer={lecturer}
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
                        onClick={() => handleDelete(lecturer.id)}
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
