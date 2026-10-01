"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { StudentFormSheet, type StudentClassOption } from "@/components/admin/StudentFormSheet";
import { useCollection } from "@/hooks/use-collection";
import type { Student } from "@/components/admin/StudentManager";

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
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-slate-50"
      >
        <Pencil className="h-4 w-4" aria-hidden="true" />
        Edit
      </button>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
        {isDeleting ? "Deleting..." : "Delete"}
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
