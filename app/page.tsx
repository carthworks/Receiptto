import { redirect } from "next/navigation";
import DashboardInvoices from "./dashboard/page";

// This page only renders when the app is built statically (output: 'export')
// export default function RootPage() {
//     redirect("/en");
// }



export default function RootPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold">Welcome to Receipto</h1>
      <DashboardInvoices />
    </main>
  );
}
