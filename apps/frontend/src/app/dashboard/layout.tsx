

import DashboardProvider from "./dashboardProvider";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    const cookiesStore = (await cookies()).toString();
  const res = await fetch("http://localhost:3001/api/v1/user/stats", {
    headers: {
      cookie: cookiesStore,
    },
    cache: "no-store",
  });
  const data = await res.json();

  console.log("data:", data);

  return <DashboardProvider data={data}>{children}</DashboardProvider>;
}
