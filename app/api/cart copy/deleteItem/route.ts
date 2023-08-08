import { Database } from "@/app/types/supabase";
import { createClient } from "@supabase/supabase-js";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const supabase = createClient<Database>(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || "",
  {
    auth: {
      persistSession: true,
      storage: {
        getItem: (key) => cookies.get(key),
        setItem: (key, value) => cookies.set(key, value, { path: "/" }),
        removeItem: (key) => cookies.remove(key, { path: "/" }),
      },
    },
  }
);

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const data = await request.json();

  try {
    await supabase.from("tb_cart").delete().eq("id", data);

    return new Response(
      JSON.stringify({ message: "The item added to the cart successfully" }),
      {
        headers: { "content-type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "There is a problem" }), {
      headers: { "content-type": "application/json" },
      status: 400,
    });
  }
}
