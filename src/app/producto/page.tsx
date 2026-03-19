import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { Suspense } from "react";
import { TopProducts } from "@/components/Products/top-products";
import { TopProductsSkeleton } from "@/components/Products/top-products/skeleton";

export const metadata: Metadata = {
  title: "Productos",
};

export default function ProductPage() {
  return (
    <>
      <Breadcrumb pageName="Productos" />

      <div className="space-y-10">
        <Suspense fallback={<TopProductsSkeleton />}>
          <TopProducts />
        </Suspense>
      </div>
    </>
  );
}
