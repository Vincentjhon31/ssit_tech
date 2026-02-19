"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  UserCircle,
  ShieldCheck,
  KeyRound,
  Info,
  LogOut,
  Loader2,
  Mail,
  CheckCircle2,
  Globe,
  Database,
  Server,
  Tag,
  Trash2,
  Pencil,
  Check,
  X,
  Lock,
  Calendar,
  Clock,
  Building2,
  Phone,
  MapPin,
  Store,
  Package,
  Image,
  CreditCard,
  Bell,
  BellRing,
  AlertTriangle,
  Users,
  UserCheck,
  Timer,
  FileText,
  Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  getCategoriesAction,
  addCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
} from "@/app/admin/products/actions";
import type { CategoryEntry } from "@/lib/products";

interface AdminSettingsContentProps {
  email: string | null;
  createdAt: string | null;
  lastSignIn: string | null;
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

// ─── Section Card ─────────────────────────────────────────────────────────────
function SectionCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="flex items-center gap-2.5 border-b border-border bg-muted/30 px-4 py-3 lg:px-3 lg:py-2.5">
        <Icon className="h-4 w-4 shrink-0 text-muted-foreground lg:h-3.5 lg:w-3.5" />
        <h2 className="text-sm font-semibold text-foreground lg:text-xs">{title}</h2>
      </div>
      <div className="p-4 sm:p-5 lg:p-4">{children}</div>
    </div>
  );
}

// ─── Info Row ─────────────────────────────────────────────────────────────────
function InfoRow({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5 py-3.5 first:pt-0 last:pb-0 lg:py-2.5 lg:gap-1">
      <div className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-muted-foreground lg:h-3 lg:w-3" />
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground lg:text-[10px]">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

// ─── Password Change Form ─────────────────────────────────────────────────────
function ChangePasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isValid = newPassword.length >= 8 && newPassword === confirm;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    setSuccess(false);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast.success("Password updated successfully.");
      setSuccess(true);
      setNewPassword("");
      setConfirm("");
    } catch (err) {
      toast.error("Failed to update password.", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground lg:text-xs" htmlFor="new-password">
          New password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="new-password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            value={newPassword}
            onChange={(e) => { setNewPassword(e.target.value); setSuccess(false); }}
            className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-3 text-sm lg:text-xs lg:py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 transition-colors"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground lg:text-xs" htmlFor="confirm-password">
          Confirm new password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter new password"
            value={confirm}
            onChange={(e) => { setConfirm(e.target.value); setSuccess(false); }}
            className={`w-full rounded-lg border bg-background py-2.5 pl-10 pr-3 text-sm lg:text-xs lg:py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 disabled:opacity-50 transition-colors ${
              confirm.length > 0 && newPassword !== confirm
                ? "border-destructive focus:ring-destructive/30"
                : "border-input focus:ring-ring"
            }`}
          />
        </div>
        {confirm.length > 0 && newPassword !== confirm && (
          <p className="flex items-center gap-1 text-xs text-destructive">
            <X className="h-3 w-3" /> Passwords do not match.
          </p>
        )}
      </div>

      {success && (
        <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-700 dark:text-green-300 text-sm">
            Password updated successfully.
          </AlertDescription>
        </Alert>
      )}

      <Button type="submit" disabled={!isValid || loading} className="w-full sm:w-auto">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Update password
      </Button>
    </form>
  );
}

// ─── Sign-out All Sessions ────────────────────────────────────────────────────
function SignOutAllSection() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignOutAll = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut({ scope: "global" });
      if (error) throw error;
      toast.success("Signed out from all devices.");
      router.push("/credentials/admin/login");
    } catch (err) {
      toast.error("Failed to sign out all sessions.", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-4">
      <div className="space-y-0.5">
        <p className="text-sm font-semibold text-destructive lg:text-xs">Danger zone</p>
        <p className="text-xs text-muted-foreground lg:text-[11px]">
          Immediately revokes all active sessions across every device.
        </p>
      </div>
      <Button
        variant="destructive"
        size="sm"
        disabled={loading}
        onClick={handleSignOutAll}
        className="w-full shrink-0 sm:w-auto"
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <LogOut className="mr-2 h-4 w-4" />
        )}
        Sign out everywhere
      </Button>
    </div>
  );
}

// ─── Manage Categories ────────────────────────────────────────────────────────
function ManageCategoriesSection() {
  const [categories, setCategories] = useState<CategoryEntry[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [adding, setAdding] = useState(false);
  const [deletingName, setDeletingName] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [saving, setSaving] = useState(false);

  const startEdit = (cat: CategoryEntry) => {
    setEditingName(cat.name);
    setEditLabel(cat.label);
  };

  const cancelEdit = () => {
    setEditingName(null);
    setEditLabel("");
  };

  const handleSaveEdit = async (cat: CategoryEntry) => {
    if (!editLabel.trim() || editLabel.trim() === cat.label) { cancelEdit(); return; }
    setSaving(true);
    const { error } = await updateCategoryAction(cat.name, editLabel);
    setSaving(false);
    if (error) {
      toast.error("Failed to update category", { description: error });
      return;
    }
    setCategories((prev) =>
      prev.map((c) => c.name === cat.name ? { ...c, label: editLabel.trim() } : c)
    );
    toast.success(`Category renamed to "${editLabel.trim()}".`);
    cancelEdit();
  };

  useEffect(() => {
    getCategoriesAction().then(({ data, error }) => {
      setLoadingCats(false);
      if (!error) setCategories(data);
    });
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;
    setAdding(true);
    const { data, error } = await addCategoryAction(categoryName, categoryName);
    setAdding(false);
    if (error) {
      toast.error("Failed to add category", { description: error });
      return;
    }
    if (data) setCategories((prev) => [...prev, data]);
    toast.success(`Category "${categoryName.trim()}" added.`);
    setCategoryName("");
  };

  const handleDelete = async (cat: CategoryEntry) => {
    setDeletingName(cat.name);
    const { error } = await deleteCategoryAction(cat.name);
    setDeletingName(null);
    if (error) {
      toast.error("Cannot delete", { description: error });
      return;
    }
    setCategories((prev) => prev.filter((c) => c.name !== cat.name));
    toast.success(`Category "${cat.label}" removed.`);
  };

  return (
    <div className="space-y-4">
      {/* Add category form */}
      <form onSubmit={handleAdd} className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="cat-name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="New category name"
            className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-3 text-sm lg:text-xs lg:py-2 placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          />
        </div>
        <Button
          type="submit"
          disabled={!categoryName.trim() || adding}
          className="w-full shrink-0 sm:w-auto"
        >
          {adding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Category
        </Button>
      </form>

      <Separator />

      {/* Category list */}
      {loadingCats ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-7 w-7 rounded-md" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex gap-1.5">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Tag className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">No categories yet</p>
          <p className="text-xs text-muted-foreground/70">Add a category using the form above.</p>
        </div>
      ) : (
        <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
          {categories.map((cat) => {
            const isDeleting = deletingName === cat.name;
            const isEditing = editingName === cat.name;
            return (
              <li
                key={cat.name}
                className="flex items-center justify-between gap-3 bg-card px-4 py-3 transition-colors hover:bg-muted/30"
              >
                {isEditing ? (
                  <>
                    <input
                      autoFocus
                      title="Category label"
                      value={editLabel}
                      onChange={(e) => setEditLabel(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveEdit(cat);
                        if (e.key === "Escape") cancelEdit();
                      }}
                      className="min-w-0 flex-1 rounded-lg border border-input bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                    />
                    <div className="flex shrink-0 items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={saving || !editLabel.trim()}
                        onClick={() => handleSaveEdit(cat)}
                        className="h-8 w-8 p-0 text-green-600 hover:bg-green-50 hover:text-green-700 dark:hover:bg-green-950"
                        aria-label="Save edit"
                      >
                        {saving ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={cancelEdit}
                        disabled={saving}
                        className="h-8 w-8 p-0 text-muted-foreground hover:bg-muted"
                        aria-label="Cancel edit"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted">
                        <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <span className="truncate text-sm font-medium text-foreground lg:text-xs">
                        {cat.label}
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={isDeleting || !!editingName}
                        onClick={() => startEdit(cat)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:bg-muted hover:text-foreground"
                        aria-label={`Edit ${cat.label}`}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={isDeleting || !!editingName}
                        onClick={() => handleDelete(cat)}
                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        aria-label={`Delete ${cat.label}`}
                      >
                        {isDeleting ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ─── Editable Setting Row ─────────────────────────────────────────────────────
function SettingField({
  label,
  icon: Icon,
  value,
  placeholder,
  type = "text",
  disabled = false,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
}) {
  const [val, setVal] = useState(value);
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground lg:text-xs">{label}</label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type={type}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-3 text-sm lg:text-xs lg:py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 transition-colors"
        />
      </div>
    </div>
  );
}

// ─── Toggle Setting Row ──────────────────────────────────────────────────────
function ToggleSetting({
  label,
  description,
  icon: Icon,
  defaultChecked = false,
}: {
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultChecked?: boolean;
}) {
  const [enabled, setEnabled] = useState(defaultChecked);
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-border/60 bg-muted/20 p-3.5 transition-colors">
      <div className="flex items-start gap-3 min-w-0">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="min-w-0 space-y-0.5">
          <p className="text-sm font-medium text-foreground lg:text-xs">{label}</p>
          <p className="text-xs text-muted-foreground lg:text-[11px]">{description}</p>
        </div>
      </div>
      <label className="relative mt-0.5 inline-flex h-6 w-11 shrink-0 cursor-pointer items-center">
        <input
          type="checkbox"
          checked={enabled}
          title={label}
          onChange={() => { setEnabled(!enabled); toast.info(`${label} ${!enabled ? "enabled" : "disabled"} (placeholder).`); }}
          className="peer sr-only"
        />
        <span className={`absolute inset-0 rounded-full transition-colors ${enabled ? "bg-primary" : "bg-input"}`} />
        <span className={`pointer-events-none absolute block h-4 w-4 rounded-full bg-background shadow-sm transition-transform ${
          enabled ? "translate-x-5" : "translate-x-0.5"
        }`} />
      </label>
    </div>
  );
}

// ─── Business Profile Section ─────────────────────────────────────────────────
function BusinessProfileSection() {
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Placeholder: save business info to DB
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Business profile updated (placeholder).");
    setSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <SettingField label="Business name" icon={Building2} value="SSIT Tech" placeholder="Your business name" />
      <div className="grid gap-4 sm:grid-cols-2">
        <SettingField label="Contact email" icon={Mail} value="benjfrancis2@gmail.com" placeholder="contact@example.com" type="email" />
        <SettingField label="Phone number" icon={Phone} value="+63 927 685 7896" placeholder="+63 XXX XXX XXXX" />
      </div>
      <SettingField label="Address" icon={MapPin} value="Instruccion Street, Sampaloc, Manila" placeholder="Full business address" />
      <div className="grid gap-4 sm:grid-cols-2">
        <SettingField label="Map latitude" icon={Globe} value="14.6157" placeholder="e.g. 14.6157" />
        <SettingField label="Map longitude" icon={Globe} value="120.9952" placeholder="e.g. 120.9952" />
      </div>
      <Separator />
      <Button type="submit" disabled={saving} className="w-full sm:w-auto">
        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save changes
      </Button>
    </form>
  );
}

// ─── Store & Product Settings ─────────────────────────────────────────────────
function StoreSettingsSection() {
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Store settings updated (placeholder).");
    setSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <SettingField label="Currency symbol" icon={CreditCard} value="₱" placeholder="₱" />
        <SettingField label="Low stock threshold" icon={AlertTriangle} value="10" placeholder="e.g. 10" type="number" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <SettingField label="Products per page (manage)" icon={Package} value="5" placeholder="e.g. 5" type="number" />
        <SettingField label="Max image width (px)" icon={Image} value="800" placeholder="e.g. 800" type="number" />
      </div>
      <Separator />
      <div className="space-y-3">
        <ToggleSetting
          label="Show out-of-stock products"
          description="Display products with zero stock on the public catalog and client portal."
          icon={Package}
          defaultChecked={true}
        />
        <ToggleSetting
          label="Enable public catalog"
          description="Allow unauthenticated visitors to browse products on the landing page."
          icon={Store}
          defaultChecked={true}
        />
      </div>
      <Separator />
      <Button type="submit" disabled={saving} className="w-full sm:w-auto">
        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save changes
      </Button>
    </form>
  );
}

// ─── Notification Settings ────────────────────────────────────────────────────
function NotificationSettingsSection() {
  return (
    <div className="space-y-3">
      <ToggleSetting
        label="New client signup alerts"
        description="Receive a notification when a new client registers an account."
        icon={Users}
        defaultChecked={true}
      />
      <ToggleSetting
        label="Low stock alerts"
        description="Get alerted when a product falls below the low stock threshold."
        icon={AlertTriangle}
        defaultChecked={true}
      />
      <ToggleSetting
        label="Contact form submissions"
        description="Receive notifications for new messages submitted through the landing page."
        icon={Mail}
        defaultChecked={false}
      />
      <ToggleSetting
        label="Client verification requests"
        description="Alert when a client requests account verification or document review."
        icon={UserCheck}
        defaultChecked={true}
      />
      <ToggleSetting
        label="Weekly summary email"
        description="Receive a weekly digest of store activity, new signups, and sales data."
        icon={FileText}
        defaultChecked={false}
      />
    </div>
  );
}

// ─── Client Management Settings ───────────────────────────────────────────────
function ClientManagementSection() {
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Client settings updated (placeholder).");
    setSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground lg:text-xs">Default client type</label>
          <div className="relative">
            <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              defaultValue="retailer"
              title="Default client type"
              className="w-full appearance-none rounded-lg border border-input bg-background py-2.5 pl-10 pr-8 text-sm lg:text-xs lg:py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            >
              <option value="retailer">Retailer</option>
              <option value="dealer">Dealer</option>
              <option value="client">Client</option>
            </select>
          </div>
        </div>
        <SettingField label="Min password length" icon={Lock} value="6" placeholder="e.g. 6" type="number" />
      </div>
      <SettingField label="Session timeout (hours)" icon={Timer} value="5" placeholder="e.g. 5" type="number" />
      <Separator />
      <div className="space-y-3">
        <ToggleSetting
          label="Require email confirmation"
          description="New clients must confirm their email address before accessing the portal."
          icon={Mail}
          defaultChecked={true}
        />
        <ToggleSetting
          label="Auto-approve new clients"
          description="Automatically verify and approve new client registrations without manual review."
          icon={UserCheck}
          defaultChecked={false}
        />
        <ToggleSetting
          label="Enable digital ID cards"
          description="Allow clients to view and download their digital identification cards."
          icon={CreditCard}
          defaultChecked={true}
        />
      </div>
      <Separator />
      <Button type="submit" disabled={saving} className="w-full sm:w-auto">
        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save changes
      </Button>
    </form>
  );
}

// ─── Maintenance Mode Section ─────────────────────────────────────────────────
function MaintenanceModeSection() {
  return (
    <div className="space-y-3">
      <ToggleSetting
        label="Maintenance mode"
        description="Take the public landing page offline and show a maintenance notice to visitors."
        icon={Wrench}
        defaultChecked={false}
      />
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground lg:text-xs">Maintenance message</label>
        <textarea
          defaultValue="We're currently performing scheduled maintenance. Please check back soon."
          rows={3}
          title="Maintenance message"
          placeholder="Enter a message to display during maintenance..."
          className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm lg:text-xs lg:py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 transition-colors resize-none"
        />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function AdminSettingsContent({ email, createdAt, lastSignIn }: AdminSettingsContentProps) {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight lg:text-lg">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground lg:text-xs">
          Manage your account, security, and system preferences.
        </p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        {/* Scrollable tab bar on mobile */}
        <div className="-mx-1 overflow-x-auto px-1 pb-0.5">
          <TabsList className="min-w-max">
            <TabsTrigger value="account" className="gap-1.5">
              <UserCircle className="h-3.5 w-3.5" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-1.5">
              <KeyRound className="h-3.5 w-3.5" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              <span>Business</span>
            </TabsTrigger>
            <TabsTrigger value="store" className="gap-1.5">
              <Store className="h-3.5 w-3.5" />
              <span>Store</span>
            </TabsTrigger>
            <TabsTrigger value="clients" className="gap-1.5">
              <Users className="h-3.5 w-3.5" />
              <span>Clients</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-1.5">
              <Bell className="h-3.5 w-3.5" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="gap-1.5">
              <Tag className="h-3.5 w-3.5" />
              <span>Categories</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="gap-1.5">
              <Info className="h-3.5 w-3.5" />
              <span>System</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* ── Account ──────────────────────────────────────── */}
        <TabsContent value="account" className="mt-0 space-y-4">
          <SectionCard title="Account Information" icon={UserCircle}>
            <div className="divide-y divide-border">
              <InfoRow label="Email address" icon={Mail}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-foreground break-all lg:text-xs">
                    {email ?? "—"}
                  </span>
                  <Badge variant="secondary" className="gap-1 text-[10px]">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </Badge>
                </div>
              </InfoRow>
              <InfoRow label="Role" icon={ShieldCheck}>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground lg:text-xs">Administrator</span>
                  <Badge className="text-[10px]">Admin</Badge>
                </div>
              </InfoRow>
              <InfoRow label="Account created" icon={Calendar}>
                <span className="text-sm text-foreground lg:text-xs">{formatDate(createdAt)}</span>
              </InfoRow>
              <InfoRow label="Last sign-in" icon={Clock}>
                <span className="text-sm text-foreground lg:text-xs">{formatDate(lastSignIn)}</span>
              </InfoRow>
            </div>
          </SectionCard>
        </TabsContent>

        {/* ── Security ─────────────────────────────────────── */}
        <TabsContent value="security" className="mt-0 space-y-4">
          <SectionCard title="Change Password" icon={KeyRound}>
            <ChangePasswordForm />
          </SectionCard>
          <SectionCard title="Active Sessions" icon={LogOut}>
            <SignOutAllSection />
          </SectionCard>
        </TabsContent>

        {/* ── Business Profile ─────────────────────────────── */}
        <TabsContent value="business" className="mt-0 space-y-4">
          <SectionCard title="Business Profile" icon={Building2}>
            <BusinessProfileSection />
          </SectionCard>
        </TabsContent>

        {/* ── Store & Products ──────────────────────────────── */}
        <TabsContent value="store" className="mt-0 space-y-4">
          <SectionCard title="Store & Product Settings" icon={Store}>
            <StoreSettingsSection />
          </SectionCard>
        </TabsContent>

        {/* ── Client Management ─────────────────────────────── */}
        <TabsContent value="clients" className="mt-0 space-y-4">
          <SectionCard title="Client Registration & Access" icon={Users}>
            <ClientManagementSection />
          </SectionCard>
        </TabsContent>

        {/* ── Notifications ─────────────────────────────────── */}
        <TabsContent value="notifications" className="mt-0 space-y-4">
          <SectionCard title="Notification Preferences" icon={BellRing}>
            <NotificationSettingsSection />
          </SectionCard>
        </TabsContent>

        {/* ── Product Categories ────────────────────────────── */}
        <TabsContent value="categories" className="mt-0 space-y-4">
          <SectionCard title="Product Categories" icon={Tag}>
            <ManageCategoriesSection />
          </SectionCard>
        </TabsContent>

        {/* ── System Information ────────────────────────────── */}
        <TabsContent value="system" className="mt-0 space-y-4">
          <SectionCard title="Maintenance" icon={Wrench}>
            <MaintenanceModeSection />
          </SectionCard>
          <SectionCard title="System Information" icon={Info}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/40 p-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background shadow-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground lg:text-[10px]">
                    Platform
                  </p>
                  <p className="text-sm font-semibold text-foreground lg:text-xs">Next.js 15</p>
                  <p className="text-xs text-muted-foreground lg:text-[11px]">App Router · TypeScript</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/40 p-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background shadow-sm">
                  <Database className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground lg:text-[10px]">
                    Database
                  </p>
                  <p className="text-sm font-semibold text-foreground lg:text-xs">Supabase</p>
                  <p className="text-xs text-muted-foreground lg:text-[11px]">PostgreSQL · Row-Level Security</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/40 p-3.5 sm:col-span-2 lg:col-span-1">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background shadow-sm">
                  <Server className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground lg:text-[10px]">
                    Categories
                  </p>
                  <p className="text-sm font-semibold text-foreground lg:text-xs">3 categories</p>
                  <p className="text-xs text-muted-foreground lg:text-[11px]">CCTV · Access Point · Switch</p>
                </div>
              </div>
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}