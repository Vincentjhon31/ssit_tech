import { createClient } from "@/lib/supabase/server";
import { AdminSettingsContent } from "./settings-content";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user ?? null;

  return (
    <AdminSettingsContent
      email={user?.email ?? null}
      createdAt={user?.created_at ?? null}
      lastSignIn={user?.last_sign_in_at ?? null}
    />
  );
}
