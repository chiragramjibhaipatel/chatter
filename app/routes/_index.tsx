import { useLoaderData } from "@remix-run/react";
import supabase from "utils/supabase";

import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({} : LoaderFunctionArgs) => {
  const {data} = await supabase.from("messages").select();
  
  return {message: data || []};
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const {message} = useLoaderData<typeof loader>();
  
  return (
    <>
    <pre>{JSON.stringify(message, null, 2)}</pre>
    </>
  );
}
