"use client";

import { useState } from "react";
import { Plus, X, Pencil, Trash2, Key, Shield } from "lucide-react";
import { useAdminLocale } from "@/components/admin/AdminShell";
import { useCollection } from "@/hooks/use-collection";
import Image from "next/image";

const AVAILABLE_TEACHERS = [
  { id: "T1", name: "នន ប៊ុណ្ណារិទ្ធ", code: "M1", photo: "https://i.pravatar.cc/150?img=11" },
  { id: "T2", name: "សុខ សាន", code: "P1", photo: "https://i.pravatar.cc/150?img=12" },
  { id: "T3", name: "អូន ហេង", code: "K1", photo: "https://i.pravatar.cc/150?img=13" },
  { id: "T4", name: "ចាន់ តារា", code: "C1", photo: "https://i.pravatar.cc/150?img=14" },
  { id: "T5", name: "មាស សុខា", code: "H1", photo: "https://i.pravatar.cc/150?img=15" },
];

const AVAILABLE_ROLES = ["Owner", "Admin", "Teacher"];

export interface SystemUser {
  id: string;
  teacherId: string;
  name: string;
  photo: string;
  username: string;
  role: string;
  status: "Active" | "Inactive";
}

const mockUsers: SystemUser[] = [
  {
    id: "U1",
    teacherId: "T1",
    name: "នន ប៊ុណ្ណារិទ្ធ",
    photo: "https://i.pravatar.cc/150?img=11",
    username: "bunnarith.n",
    role: "Owner",
    status: "Active"
  },
  {
    id: "U2",
    teacherId: "T3",
    name: "អូន ហេង",
    photo: "https://i.pravatar.cc/150?img=13",
    username: "heng.o",
    role: "Teacher",
    status: "Active"
  }
];

export function UserManager({ initialData = mockUsers }: { initialData?: SystemUser[] }) {
  const locale = useAdminLocale();
  const { items: users, create, update, remove } = useCollection<SystemUser>(
    "users",
    initialData,
    { loadOnMount: false },
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null);

  const [formData, setFormData] = useState({
    teacherId: "",
    role: "Teacher",
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [passwordError, setPasswordError] = useState("");

  const openAddModal = () => {
    setFormData({ teacherId: "", role: "Teacher", username: "", password: "", confirmPassword: "" });
    setEditingUser(null);
    setPasswordError("");
    setIsModalOpen(true);
  };

  const openEditModal = (user: SystemUser) => {
    setFormData({ teacherId: user.teacherId, role: user.role, username: user.username, password: "", confirmPassword: "" });
    setEditingUser(user);
    setPasswordError("");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this user's access?")) {
      try {
        await remove(id);
      } catch (requestError) {
        window.alert(requestError instanceof Error ? requestError.message : "Unable to delete user");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!editingUser || formData.password) && formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }
    setPasswordError("");

    const selectedTeacher = AVAILABLE_TEACHERS.find((teacher) => teacher.id === formData.teacherId);
    if (!selectedTeacher) return;

    const value = {
      teacherId: formData.teacherId,
      name: selectedTeacher.name,
      photo: selectedTeacher.photo,
      username: formData.username,
      role: formData.role,
      ...(editingUser ? {} : { status: "Active" as const }),
    };

    try {
      if (editingUser) {
        await update(editingUser.id, value);
      } else {
        await create(value);
      }
      setIsModalOpen(false);
    } catch (requestError) {
      window.alert(requestError instanceof Error ? requestError.message : "Unable to save user");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl font-bold text-foreground">
            {locale === "km" ? "អ្នកប្រើប្រាស់ប្រព័ន្ធ" : "System Users"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {locale === "km" ? "គ្រប់គ្រងគណនីបុគ្គលិកនិងគ្រូបង្រៀន" : "Manage login accounts for staff and teachers"}
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          {locale === "km" ? "បង្កើតគណនីថ្មី" : "Create User"}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-slate-50">
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs">Profile</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs">Username</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs">Role</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs">Status</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-muted-foreground text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map(user => (
              <tr key={user.id} className="transition-colors hover:bg-slate-50/60">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border">
                      <Image src={user.photo} alt={user.name} fill sizes="40px" className="object-cover" />
                    </div>
                    <span className="font-semibold text-foreground">{user.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 font-mono text-slate-600">{user.username}</td>
                <td className="px-5 py-3.5">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                    user.role === "Owner" ? "bg-amber-100 text-amber-700" :
                    user.role === "Admin" ? "bg-purple-100 text-purple-700" :
                    "bg-blue-100 text-blue-700"
                  }`}>
                    {user.role === "Owner" ? <Key className="h-3 w-3" /> : <Shield className="h-3 w-3" />}
                    {user.role}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-600">
                    {user.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEditModal(user)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-black"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No users found.
          </div>
        )}
      </div>

      {/* Slide-over Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md h-full bg-white p-8 shadow-2xl relative animate-in slide-in-from-right duration-300 flex flex-col overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold text-foreground mb-6">
              {editingUser ? "Edit User Account" : "Create New User"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 flex flex-col flex-1">
              
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-foreground">Select Teacher Profile</label>
                <select
                  required
                  value={formData.teacherId}
                  onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                  className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black bg-white"
                >
                  <option value="" disabled>-- Select a Teacher --</option>
                  {AVAILABLE_TEACHERS.map(t => (
                    <option key={t.id} value={t.id}>{t.code} • {t.name}</option>
                  ))}
                </select>
                <p className="mt-1.5 text-xs text-muted-foreground">Link this account to an existing teacher record.</p>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-foreground">Role</label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black bg-white"
                >
                  {AVAILABLE_ROLES.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <label className="mb-1.5 block text-sm font-semibold text-foreground">Username</label>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                  placeholder="e.g. sokchan.t"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-foreground">Password {editingUser && <span className="text-muted-foreground font-normal">(Leave blank to keep current)</span>}</label>
                <input
                  type="password"
                  required={!editingUser}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-xl border border-border px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                  placeholder="Enter secure password"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-foreground">Confirm Password</label>
                <input
                  type="password"
                  required={!editingUser || formData.password.length > 0}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-1 ${
                    passwordError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-border focus:border-black focus:ring-black'
                  }`}
                  placeholder="Re-type password"
                />
                {passwordError && <p className="mt-1 text-xs font-semibold text-red-500">{passwordError}</p>}
              </div>

              <div className="mt-auto pt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  {editingUser ? "Save Changes" : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
