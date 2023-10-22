import { useLoaderData } from "@remix-run/react";
import supabase from "utils/supabase";

import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({} : LoaderFunctionArgs) => {
  const {data} = await supabase.from("messages").select();
  console.log(data);
  
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
  console.log(message);
  
  return (
    <>
    <h1>Hello</h1>
    <pre>{JSON.stringify(message, null, 2)}</pre>
    </>
  );
}
