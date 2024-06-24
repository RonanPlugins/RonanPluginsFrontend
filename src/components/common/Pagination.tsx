import { Button } from "../ui/button";
import { Minus, MoveLeft, MoveRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: CallableFunction;
}) => {
  //const [currentPage, setCurrentPage] = useState(startPage ? startPage : 1);

  const handleClick = (page: number) => {
    //setCurrentPage(page);
    onPageChange(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      //setCurrentPage((prev) => prev + 1);
      onPageChange(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      //setCurrentPage((prev) => prev - 1);
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
      <div className="flex flex-row w-full">
        {startPage > 1 && (
          <>
            <Button
              size={"sm"}
              variant={"secondary"}
              className="h-8 min-w-10 rounded-full mx-1"
              onClick={() => handleClick(1)}
            >
              1
            </Button>
            {startPage > 2 && (
              <Minus className="translate-y-2" stroke="gray" size={20} />
            )}
          </>
        )}
        {pageNumbers.map((page) => (
          <Button
            size={"sm"}
            variant={"secondary"}
            className="h-8 min-w-10 rounded-full mx-1"
            key={page}
            onClick={() => handleClick(page)}
            style={{ fontWeight: page === currentPage ? "bold" : "normal" }}
          >
            {page}
          </Button>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <Minus className="translate-y-2" stroke="gray" size={20} />
            )}
            <Button
              size={"sm"}
              variant={"secondary"}
              className="h-8  min-w-10 rounded-full mx-1"
              onClick={() => handleClick(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-row">
      <Button
        size={"sm"}
        variant={"secondary"}
        className="px-3 mr-2 h-8 rounded-full"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <MoveLeft size={20} />
      </Button>
      {renderPageNumbers()}
      <Button
        size={"sm"}
        variant={"secondary"}
        className="px-3 ml-2 h-8 rounded-full"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <MoveRight size={20} />
      </Button>
    </div>
  );
};

export default Pagination;
