import React from "react";

import { Card } from "../../ui/dashboard/cards";
import RevenueChart from "../../ui/dashboard/revenue-chart";
import LatestInvoices from "../../ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from "@/app/lib/data";

import { Suspense } from "react";
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from "@/app/ui/skeletons";
import CardWrapper from "@/app/ui/dashboard/cards";
export default async function DashboardPage(props) {
  // await
  // f ที่่ไปเอามาต้องใส่ async ด้วย
  // const revenue = await fetchRevenue();
  // const latestInvoices = await fetchLatestInvoices();

  //แบบใหม่ Destructuring ทำ 2 ข้างให้เหมือนกันเอาคีย์มาใส่เลย  แล้วเอาของไปใช้ข้างล่าง
  // const { numberOfCustomers, numberOfInvoices, totalPaidInvoices, totalPendingInvoices } =
  //   await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card title="Total Customers" value={numberOfCustomers} type="customers" /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-8 gap-6 ">
        {/* <RevenueChart revenue={revenue} /> */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
