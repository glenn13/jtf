import EventCalendar from "@/components/events/EventCalendar";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

// export const metadata: Metadata = {
//     title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
//     description:
//         "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
//     // other metadata
// };
const page = () => {
    return (
        <div>
            <EventCalendar />
        </div>
    );
}

export default page;