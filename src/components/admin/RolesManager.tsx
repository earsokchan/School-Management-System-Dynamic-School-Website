"use client";

import { useState } from "react";
import { Plus, X, Shield, Pencil, Trash2, CheckCircle2 } from "lucide-react";
import { useAdminLocale } from "@/components/admin/AdminShell";

const PERMISSION_GROUPS = [
  {
    id: "content",
    label: { en: "Content Management", km: "គ្រប់គ្រងមាតិកា" },
    permissions: [
      { id: "manage_news", label: { en: "Manage News", km: "គ្រប់គ្រងព័ត៌មាន" } },
      { id: "manage_events", label: { en: "Manage Events", km: "គ្រប់គ្រងព្រឹត្តិការណ៍" } },
      { id: "manage_gallery", label: { en: "Manage Gallery", km: "គ្រប់គ្រងវិចិត្រសាល" } },
      { id: "manage_pages", label: { en: "Manage Pages", km: "គ្រប់គ្រងទំព័រ" } },
    ]
  },
  {
    id: "academic",
    label: { en: "Academic & People", km: "ការសិក្សា និងបុគ្គលិក" },
    permissions: [
      { id: "manage_classes", label: { en: "Manage Classes & Subjects", km: "គ្រប់គ្រងថ្នាក់និងមុខវិជ្ជា" } },
      { id: "manage_teachers", label: { en: "Manage Teachers", km: "គ្រប់គ្រងគ្រូបង្រៀន" } },
      { id: "manage_students", label: { en: "Manage Students", km: "គ្រប់គ្រងសិស្ស" } },
      { id: "manage_timetable", label: { en: "Manage Timetable", km: "គ្រប់គ្រងកាលវិភាគ" } },
      { id: "manage_results", label: { en: "Manage Results", km: "គ្រប់គ្រងលទ្ធផលសិក្សា" } },
    ]
  },
  {
    id: "system",
    label: { en: "System", km: "ប្រព័ន្ធ" },
    permissions: [
      { id: "manage_settings", label: { en: "Manage Settings", km: "ការកំណត់ប្រព័ន្ធ" } },
      { id: "manage_roles", label: { en: "Manage Roles & Permissions", km: "គ្រប់គ្រងតួនាទីសិទ្ធិ" } },
    ]
  }
];

interface Role {
  id: string;
  name: string;
  description: string;
  isSystem: boolean; // Cannot be deleted
  usersCount: number;
  permissions: string[];
}

const mockRoles: Role[] = [
  {
    id: "owner",
    name: "Owner",
    description: "Has full access to all system features.",
    isSystem: true,
    usersCount: 1,
    permissions: PERMISSION_GROUPS.flatMap(g => g.permissions.map(p => p.id))
  },
  {
    id: "admin",
    name: "Admin",
    description: "Can manage academic records, content, and people.",
    isSystem: false,
    usersCount: 3,
    permissions: [
      "manage_news", "manage_events", "manage_gallery", "manage_pages",
      "manage_classes", "manage_teachers", "manage_students", "manage_timetable", "manage_results"
    ]
  },
  {
    id: "teacher",
    name: "Teacher",
    description: "Can view schedules, manage student results, and view news.",
    isSystem: false,
    usersCount: 45,
    permissions: [
      "manage_results", "manage_timetable"
    ]
  }
];

export function RolesManager() {
  const locale = useAdminLocale();
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    permissions: string[];
  }>({
    name: "",
    description: "",
    permissions: []
  });

  const openAddModal = () => {
    setFormData({ name: "", description: "", permissions: [] });
    setEditingRole(null);
    setIsModalOpen(true);
  };

  const openEditModal = (role: Role) => {
    setFormData({ name: role.name, description: role.description, permissions: [...role.permissions] });
    setEditingRole(role);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this role?")) {
      setRoles(roles.filter(r => r.id !== id));
    }
  };

  const togglePermission = (permId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permId)
        ? prev.permissions.filter(p => p !== permId)
        : [...prev.permissions, permId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRole) {
      setRoles(roles.map(r => r.id === editingRole.id ? { ...r, ...formData } : r));
    } else {
      setRoles([...roles, {
        id: formData.name.toLowerCase().replace(/\s+/g, '_'),
        name: formData.name,
        description: formData.description,
        permissions: formData.permissions,
        isSystem: false,
        usersCount: 0
      }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl font-bold text-foreground">
            {locale === "km" ? "តួនាទីអ្នកប្រើប្រាស់" : "User Roles"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {locale === "km" ? "គ្រប់គ្រងតួនាទី និងសិទ្ធិចូលប្រើប្រាស់ប្រព័ន្ធ" : "Manage system roles and access permissions"}
          </p>
        </div>
        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          {locale === "km" ? "បន្ថែមតួនាទីថ្មី" : "Create New Role"}
        </button>
      </div>

      {/* Grid of Roles */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {roles.map(role => (
          <div key={role.id} className="rounded-2xl border border-border bg-white p-6 shadow-sm flex flex-col transition-all hover:shadow-md">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${role.isSystem ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'}`}>
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
                    {role.name}
                    {role.isSystem && (
                      <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">System</span>
                    )}
                  </h3>
                  <p className="text-xs text-muted-foreground font-semibold">{role.usersCount} assigned users</p>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6 flex-1">{role.description}</p>
            
            <div className="flex gap-2 mt-auto pt-4 border-t border-slate-100">
              <button 
                onClick={() => openEditModal(role)}
                className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-semibold py-2 rounded-xl transition-colors text-center"
              >
                Edit Role
              </button>
              {!role.isSystem && (
                <button 
                  onClick={() => handleDelete(role.id)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl transition-colors"
                  aria-label="Delete Role"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Slide-over Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-2xl h-full bg-white p-8 shadow-2xl relative animate-in slide-in-from-right duration-300 flex flex-col overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {editingRole ? "Edit Role" : "Create New Role"}
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Configure role details and specify which modules this role can access.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8 flex flex-col flex-1">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="col-span-2 md:col-span-1">
                  <label className="mb-1.5 block text-sm font-semibold text-foreground">Role Name</label>
                  <input
                    type="text"
                    required
                    disabled={editingRole?.isSystem}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black disabled:bg-slate-50 disabled:text-slate-500"
                    placeholder="e.g. Accountant"
                  />
                </div>
                <div className="col-span-2">
                  <label className="mb-1.5 block text-sm font-semibold text-foreground">Description</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full rounded-xl border border-border px-4 py-2.5 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black resize-none"
                    placeholder="Briefly describe what users with this role can do..."
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">Permissions</h3>
                <div className="space-y-6">
                  {PERMISSION_GROUPS.map(group => (
                    <div key={group.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                      <h4 className="font-bold text-sm text-foreground mb-4 border-b border-slate-200 pb-2">
                        {locale === "km" ? group.label.km : group.label.en}
                      </h4>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {group.permissions.map(perm => {
                          const isChecked = formData.permissions.includes(perm.id);
                          return (
                            <label 
                              key={perm.id} 
                              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                                isChecked ? 'border-black bg-black text-white shadow-md' : 'border-border bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              <div className="flex items-center justify-center h-5 w-5">
                                {isChecked ? <CheckCircle2 className="h-5 w-5 text-white" /> : <div className="h-4 w-4 rounded border border-slate-300" />}
                              </div>
                              <span className={`text-sm font-semibold ${isChecked ? 'text-white' : 'text-foreground'}`}>
                                {locale === "km" ? perm.label.km : perm.label.en}
                              </span>
                              <input 
                                type="checkbox" 
                                className="hidden"
                                checked={isChecked}
                                onChange={() => togglePermission(perm.id)}
                              />
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-8 flex justify-end gap-3 sticky bottom-0 bg-white py-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-black px-8 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  {editingRole ? "Save Role" : "Create Role"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
