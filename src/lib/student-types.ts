export type StudentType = "Technology" | "Society";

export interface Student {
  id: string;
  photo: string;
  studentId: string;
  name: string;
  phone: string;
  className: string;
  grade: string;
  type: StudentType;
  gender: string;
  addressCountry?: string;
  addressCity?: string;
  addressProvince?: string;
  addressVillage?: string;
  previousSchool?: string;
}