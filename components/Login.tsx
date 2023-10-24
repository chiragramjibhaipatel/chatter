import { useOutletContext } from "@remix-run/react";

import type {SupabaseOutletContext} from "~/root";

export function Login() {

    const { supabase } = useOutletContext<SupabaseOutletContext>();
    const handleLogin = async () => {
          const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "github",
          });
    }

    const handleLogout = async () => {
          const { error } = await supabase.auth.signOut();
    }

    return(
        <>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleLogin}>Login</button>
        </>
    )
}