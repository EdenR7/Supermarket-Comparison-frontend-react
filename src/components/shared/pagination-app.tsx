import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginatorAppProps {
  totalEntities: number;
  perPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PaginatorApp({
  totalEntities,
  perPage,
  page,
  setPage,
}: PaginatorAppProps) {
  if (!totalEntities || totalEntities < 1) return null;

  const totalPages = Math.ceil(totalEntities / perPage);

  function goPrev() {
    setPage((p: number) => Math.max(1, p - 1));
  }
  function goNext() {
    setPage((p: number) => Math.min(totalPages, p + 1));
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button disabled={page === 1} variant="outline" onClick={goPrev}>
            <ArrowLeft size={14} />
          </Button>
        </PaginationItem>
        {/* {page > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => setPage(page - 1)}>
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )} */}
        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        {/* {page < totalPages && (
          <PaginationItem>
            <PaginationLink onClick={() => setPage(page + 1)}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )} */}
        {page < totalPages && (
          // <PaginationItem>
          <PaginationEllipsis />
          // {/* </PaginationItem> */}
        )}
        {totalPages > 1 && page < totalPages && (
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer"
              isActive
              onClick={() => setPage(totalPages)}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <Button
            disabled={page === totalPages}
            variant="outline"
            onClick={goNext}
          >
            <ArrowRight size={14} />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
