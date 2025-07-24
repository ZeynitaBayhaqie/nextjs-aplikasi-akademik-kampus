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

interface Lecturer {
  id?: number 
  name: string
  NIP: string
  department: string
  email: string
}

interface Props {
  lecturer?: Lecturer
  trigger: React.ReactNode
  onSubmit: (data: Lecturer) => void
}

export default function LecturerFormModal({ lecturer, trigger, onSubmit }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Lecturer>({
    name: lecturer?.name || "",
    NIP: lecturer?.NIP || "",
    department: lecturer?.department || "",
    email: lecturer?.email || "",
    id: lecturer?.id || "",
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
          <DialogTitle>{lecturer ? "Edit Lecturer" : "Tambah Lecturer"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">

          <Input
            name="name"
            placeholder="Nama Dosen"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            name="NIP"
            placeholder="Nomor Induk Pegawai"
            value={form.NIP}
            onChange={handleChange}
          />
          <Input
            name="department"
            placeholder="Program Studi"
            value={form.department}
            onChange={handleChange}
          />
          <Input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>
            {lecturer ? "Simpan Perubahan" : "Tambah"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}