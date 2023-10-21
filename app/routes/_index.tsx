import { useLoaderData } from "@remix-run/react";
import supabase from "utils/supabase";

import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

export const loader = async ({} : LoaderFunctionArgs) => {
  const {data} = await supabase.from("messages").select();
  console.log(data);
  
  return {messages: data || []};
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const {messages} = useLoaderData<typeof loader>();
  console.log(messages);
  
  return (
    <>
    <h1>Hello</h1>
    <pre>{JSON.stringify(messages, null, 2)}</pre>
    </>
  );
}
