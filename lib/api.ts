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