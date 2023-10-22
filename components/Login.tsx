import { useOutletContext } from "@remix-run/react";
import { type OutletContextType } from "~/root";

export default function Login(){

    const {supabase} = useOutletContext<OutletContextType>();
    async function signInWithGithub() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "github",
        });
    }

    async function signOut() {
        const { error } = await supabase.auth.signOut();
    }

    return (
      <>
        <button onClick={signInWithGithub}>Login</button>
        <button onClick={signOut}>Logout</button>
      </>
    );
}