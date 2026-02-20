"use server";

import { createClient } from "@/lib/supabase/server";

export type OrderInquiry = {
  id: string;
  user_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  message: string;
  status: string;
  created_at: string;
};

export async function submitOrderInquiry(data: {
  productId: string | null;
  productName: string;
  quantity: number;
  message: string;
}): Promise<{ data: OrderInquiry | null; error: string | null }> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { data: null, error: "Not authenticated" };
    }

    const { data: row, error } = await supabase
      .from("order_inquiries")
      .insert({
        user_id: user.id,
        product_id: data.productId || null,
        product_name: data.productName,
        quantity: data.quantity,
        message: data.message,
      })
      .select("*")
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: row as OrderInquiry, error: null };
  } catch (e) {
    return {
      data: null,
      error: e instanceof Error ? e.message : "Failed to submit inquiry",
    };
  }
}

export async function getMyOrderInquiries(): Promise<{
  data: OrderInquiry[];
  error: string | null;
}> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { data: [], error: "Not authenticated" };
    }

    const { data, error } = await supabase
      .from("order_inquiries")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return { data: [], error: error.message };
    }

    return { data: (data ?? []) as OrderInquiry[], error: null };
  } catch (e) {
    return {
      data: [],
      error: e instanceof Error ? e.message : "Failed to fetch inquiries",
    };
  }
}
