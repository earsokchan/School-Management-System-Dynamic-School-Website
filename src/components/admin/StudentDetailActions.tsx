"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { StudentFormSheet, type StudentClassOption } from "@/components/admin/StudentFormSheet";
import { useCollection } from "@/hooks/use-collection";
import type { Student } from "@/lib/student-types";

export function StudentDetailActions({
  student,
  availableClasses,
}: {
  student: Student;
  availableClasses: StudentClassOption[];
}) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { update, remove } = useCollection<Student>("admin-students", [], { loadOnMount: false });

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${student.name}? This cannot be undone.`)) return;
    setIsDeleting(true);
    try {
      await remove(student.id);
      router.push("/admin/students");
      router.refresh();
    } catch (requestError) {
      window.alert(requestError instanceof Error ? requestError.message : "Unable to delete student");
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button type="button" onClick={() => setIsEditing(true)} className="apple-btn apple-btn-primary">
        <Pencil className="h-4 w-4" aria-hidden="true" />
        Edit
      </button>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="apple-btn apple-btn-danger disabled:opacity-60"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
        {isDeleting ? "Deleting…" : "Delete"}
      </button>

      <StudentFormSheet
        open={isEditing}
        student={student}
        availableClasses={availableClasses}
        onClose={() => setIsEditing(false)}
        onSubmit={async (values) => {
          await update(student.id, values);
          router.refresh();
        }}
      />
    </>
  );
}
