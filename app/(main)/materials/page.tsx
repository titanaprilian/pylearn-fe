"use client";

import { useTranslations } from "@/lib/i18n/useTranslation";
import { Suspense, useRef } from "react"; // Tambahkan Suspense
import {
  MaterialHeader,
  MaterialsList,
  useFetchMaterials,
  useMaterialFilters,
} from "@/features/materials";
import { TablePagination } from "@/components/ui/table-pagination";
import { Skeleton } from "@/components/ui/skeleton";

function MaterialsCollection() {
  const t = useTranslations();
  const filters = useMaterialFilters();
  const listRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useFetchMaterials({
    page: filters.page,
    limit: filters.limit,
    lecturerId: filters.lecturerId,
    materialType: filters.materialType || undefined,
    isPublished: filters.isPublished,
  });

  return (
    <>
      <div ref={listRef}>
        <MaterialsList data={data?.data || []} isLoading={isLoading} />
      </div>

      {data && data.pagination.total > 0 && (
        <TablePagination
          page={filters.page}
          limit={filters.limit}
          total={data.pagination.total}
          onPageChange={filters.setPage}
          onLimitChange={filters.setLimit}
          showingText={t("common.showing")}
          rowsText={t("common.rows")}
          scrollRef={listRef}
        />
      )}
    </>
  );
}

// 2. Export utama membungkus konten dengan Suspense
export default function MaterialsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <MaterialHeader />

      {/* 
          Suspense HARUS berada di luar komponen yang memanggil useMaterialFilters.
          Next.js butuh batas ini untuk menangani CSR Bailout.
      */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        }
      >
        <MaterialsCollection />
      </Suspense>
    </div>
  );
}
