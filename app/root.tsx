import { cssBundleHref } from "@remix-run/css-bundle";
import { json, type LoaderFunctionArgs, type LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";

import type { Database } from "db_types";

type TypedSupabaseClient = SupabaseClient<Database>;

export type OutletContextType = {
  supabase: TypedSupabaseClient
}

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = ({}: LoaderFunctionArgs) => {
  const env = getBrowserEnvironment();

  return json({ env });
}

export default function App() {

  const {env} = useLoaderData<typeof loader>();

  const [supabase] = useState(() => 
    createClient<Database>(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!)
  );  

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet context={{supabase}} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}


function getBrowserEnvironment() {
  const env = process.env;

  return {
    SUPABASE_URL: env.SUPABASE_URL,
    SUPABASE_ANON_KEY: env.SUPABASE_ANON_KEY,
  };
}