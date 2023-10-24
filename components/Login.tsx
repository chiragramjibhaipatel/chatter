import { useOutletContext } from "@remix-run/react";

export function Login() {

    const { supabase } = useOutletContext();
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