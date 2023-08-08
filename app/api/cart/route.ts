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

export async function GET() {
  try {
    const data = await supabase.from("tb_cart").select("*");

    return new Response(JSON.stringify({ message: data.data }), {
      status: 200,
      headers: { revalidate: dynamic },
    });
  } catch (error) {
    console.error("Error fetching files: ", error);
    return new Response(JSON.stringify({ message: "An error occurred" }), {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const res = await supabase.from("tb_cart").insert([
      {
        client_id: data.client_id,
        item_id: data.item_id,
        quantity: data.quantity,
      },
    ]);

    

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
