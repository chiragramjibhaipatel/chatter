import { cssBundleHref } from "@remix-run/css-bundle";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import createServerClient from "utils/supabase.server";

import type { SupabaseClient } from "@supabase/supabase-js";
import type { LoaderFunctionArgs, LinksFunction } from "@remix-run/node";
import type { Database } from "db_types";
import { createBrowserClient } from "@supabase/auth-helpers-remix";

type TypedSupabaseClient = SupabaseClient<Database>;

export type OutletContextType = {
  supabase: TypedSupabaseClient
}

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = async ({request}: LoaderFunctionArgs) => {
  const env = getBrowserEnvironment();
  
  const response = new Response();
  const supabase = createServerClient({request, response});
  const {data: {session}} = await supabase.auth.getSession();

  return json({ env, session }, {headers: response.headers});
}

export default function App() {

  const {env, session} = useLoaderData<typeof loader>();

  console.log({server: session});

  useEffect(() => {
    supabase.auth.getSession().then(data => console.log({client: data}));
  });

  const [supabase] = useState(() => 
    createBrowserClient<Database>(env.SUPABASE_URL!, env.SUPABASE_ANON_KEY!)
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