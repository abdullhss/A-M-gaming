import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationCustom({
  page,
  count,
  setPage,
}: {
  page: number;
  count: number;
  setPage: (page: number) => void;
}) {
  const handleNext = () => {
    if (page < count) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const getVisiblePages = () => {
    const visiblePages: number[] = [];

    if (count <= 5) {
      for (let i = 2; i < count; i++) {
        visiblePages.push(i);
      }
    } else {
      if (page > 1 ) {
        visiblePages.push(page - 1);
      }
      visiblePages.push(page);
      if (page < count ) {
        visiblePages.push(page + 1);
      }
    }
    return visiblePages;
  };

  return (
    <Pagination className="col-span-full">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={handlePrev} />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink onClick={() => setPage(1)} className={ `${page === 1 ? "bg-rose-400" : "" }` } >
            1
          </PaginationLink>
        </PaginationItem>

        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {getVisiblePages().map((p) => (
          <PaginationItem key={p}>
            <PaginationLink onClick={() => setPage(p)}>{p}</PaginationLink>
          </PaginationItem>
        ))}

        {page < count - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
        <PaginationLink onClick={() => setPage(count)} className={ `${page === count ? "bg-rose-400" : "" }` } >
          {count}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext href="#" onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
