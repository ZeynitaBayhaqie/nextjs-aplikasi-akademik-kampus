import axios from "axios";

// Ganti dengan URL backend Laravel kamu
const BASE_URL = "http://127.0.0.1:8000/api";

const getToken = () => localStorage.getItem("token"); // atau dari cookies

export const login = async (NIM: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/login`, {
    NIM,
    password,
  });
  return response.data;
};

export const logout = async (token: string | null) => {
  if (!token) throw new Error("Token tidak ditemukan");

  const res = await axios.post(
    `${BASE_URL}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};



//api course
export async function fetchCourse() {
  const res = await fetch(`${BASE_URL}/course`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) throw new Error("Gagal fetch course");
  const json = await res.json(); 
  return json;
}
export async function createCourse(data: {
  id?: number;
  credits: string;
  semester: string;
  name: string;
  code: string;
}) {
  const res = await fetch(`${BASE_URL}/course`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function updateCourse(id: string, data: any) {
  const token = getToken();
  if (!token) throw new Error("Token tidak ditemukan");

  const res = await fetch(`${BASE_URL}/course/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Gagal update:", errText);
    throw new Error("Update gagal: " + errText);
  }

  return res.json();
}
export async function deleteCourse(id: number) {
  const res = await fetch(`${BASE_URL}/course/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
}



//api student
export async function fetchStudent() {
  const res = await fetch(`${BASE_URL}/student`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) throw new Error("Gagal fetch student");
  const json = await res.json(); 
  return json;
}
export async function createStudent(data: {
  id?: number;
  NIM: string;
  email: string;
  password: string;
  enrollment_year: string;
  major: string;
  name: string;

}) {
  const res = await fetch(`${BASE_URL}/student`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function updateStudent(id: string, data: any) {
  const token = getToken();
  if (!token) throw new Error("Token tidak ditemukan");

  const res = await fetch(`${BASE_URL}/student/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Gagal update:", errText);
    throw new Error("Update gagal: " + errText);
  }

  return res.json();
}
export async function deleteStudent(id: number) {
  const res = await fetch(`${BASE_URL}/student/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
}



//api lecturer
export async function fetchLecturer() {
  const res = await fetch(`${BASE_URL}/lecturer`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) throw new Error("Gagal fetch lecturer");
  const json = await res.json(); 
  return json;
}
export async function createLecturer(data: {
  id?: number;
  NIM: string;
  email: string;
  password: string;
  enrollment_year: string;
  major: string;
  name: string;

}) {
  const res = await fetch(`${BASE_URL}/lecturer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function updateLecturer(id: string, data: any) {
  const token = getToken();
  if (!token) throw new Error("Token tidak ditemukan");

  const res = await fetch(`${BASE_URL}/lecturer/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Gagal update:", errText);
    throw new Error("Update gagal: " + errText);
  }

  return res.json();
}
export async function deleteLecturer(id: number) {
  const res = await fetch(`${BASE_URL}/lecturer/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
}



//api CourseLecturer
export async function fetchCourseLecturer() {
  const res = await fetch(`${BASE_URL}/course_lecturers`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) throw new Error("Gagal fetch courselecturer");
  const json = await res.json(); 
  return json;
}
export async function createCourseLecturer(data: {
  id?: number;
  course_id: string;
  lecturer_id: string;
  role: string;
}) {
  const res = await fetch(`${BASE_URL}/course_lecturers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function updateCourseLecturer(id: string, data: any) {
  const token = getToken();
  if (!token) throw new Error("Token tidak ditemukan");

  const res = await fetch(`${BASE_URL}/course_lecturers/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Gagal update:", errText);
    throw new Error("Update gagal: " + errText);
  }

  return res.json();
}
export async function deleteCourseLecturer(id: number) {
  const res = await fetch(`${BASE_URL}/course_lecturers/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
}



//api Enrollment
export async function fetchEnrollment() {
  const res = await fetch(`${BASE_URL}/enrollment`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
}
export async function createEnrollment(data: {
  student_id: string; 
  course_id: string;
  grade: string;
  attendance: number;
  status: string;
}) {
  const res = await fetch(`${BASE_URL}/enrollment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw err;
  }

  return res.json();
}
export async function updateEnrollment(id: number, data: any) {
  const token = getToken();
  if (!token) throw new Error("Token tidak ditemukan");

  const res = await fetch(`${BASE_URL}/enrollment/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Gagal update:", errText);
    throw new Error("Update gagal: " + errText);
  }

  return res.json();
}
export async function deleteEnrollment(id: number) {
  const res = await fetch(`${BASE_URL}/enrollment/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return res.json();
}


// Definisikan tipe data untuk respons agar lebih mudah digunakan
export interface DashboardSummary {
  total_students: number;
  total_lecturers: number;
  total_courses: number;
  total_enrollments: number;
}

export interface Student {
  id: number;
  name: string;
  NIM: string;
  major: string;
  created_at: string; // Tanggal dalam format string ISO
}


/**
 * Mengambil data ringkasan dari backend untuk ditampilkan di dashboard.
 */
export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  const res = await fetch(`${BASE_URL}/dashboard/summary`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Gagal mengambil data dashboard");
  }

  return res.json();
}

/**
 * Mengambil daftar mahasiswa terbaru dari backend.
 */
export async function fetchRecentStudents(): Promise<Student[]> {
  // Pastikan backend Anda mendukung parameter ?sort=desc&limit=5
  const res = await fetch(`${BASE_URL}/student`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Gagal mengambil data mahasiswa");
  }
  
  const responseData = await res.json();
  // Sesuaikan jika data mahasiswa ada di dalam properti tertentu, misal: responseData.data
  return Array.isArray(responseData) ? responseData : responseData.data || [];
}