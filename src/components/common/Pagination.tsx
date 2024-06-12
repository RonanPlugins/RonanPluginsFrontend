import { useState } from "react";
import { Button } from "../ui/button";

interface PaginationProps {
  startPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  startPage,
  totalPages,
  onPageChange,
}: {
  startPage?: number;
  totalPages: number;
  onPageChange: CallableFunction;
}) => {
  const [currentPage, setCurrentPage] = useState(startPage ? startPage : 1);

  const handleClick = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      onPageChange(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      onPageChange(currentPage - 1);
    }
  };

  const renderPageNumbers = () => {
    let startPage = Math.max(1, currentPage - 3);
    let endPage = Math.min(totalPages, currentPage + 3);

    if (endPage - startPage < 6) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + 6);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - 6);
      }
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <>
        {startPage > 1 && (
          <>
            <Button
              size={"sm"}
              variant={"link"}
              className="p-2"
              onClick={() => handleClick(1)}
            >
              1
            </Button>
            {startPage > 2 && <span>...</span>}
          </>
        )}
        {pageNumbers.map((page) => (
          <Button
            size={"sm"}
            variant={"link"}
            className="p-2"
            key={page}
            onClick={() => handleClick(page)}
            style={{ fontWeight: page === currentPage ? "bold" : "normal" }}
          >
            {page}
          </Button>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span>...</span>}
            <Button
              size={"sm"}
              variant={"link"}
              className="p-2"
              onClick={() => handleClick(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}
      </>
    );
  };

  return (
    <div>
      <Button
        size={"sm"}
        variant={"secondary"}
        className="p-2"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        &lt;Prev
      </Button>
      {renderPageNumbers()}
      <Button
        size={"sm"}
        variant={"secondary"}
        className="p-2"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next&gt;
      </Button>
    </div>
  );
};

export default Pagination;
