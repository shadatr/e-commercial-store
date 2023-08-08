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


export async function POST(request: Request, { params }: { params: { id: number } }) {
  const data = await request.json();

  try {

    await supabase.from("tb_users").update( data ).eq("id", params.id);

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


export async function GET(request: Request, { params }: { params: { id: number } }) {
  try {
    const data = await supabase
      .from("tb_users")
      .select("*")
      .eq("id", params.id);

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