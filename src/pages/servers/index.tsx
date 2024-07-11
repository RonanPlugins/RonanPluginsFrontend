import { FilterPerPage } from "@/components/filters/FilterPerPage";
import { FilterSearch } from "@/components/filters/FilterSearch";
import { Card, CardContent } from "@/components/ui/card";
import { useFilterContext_Server } from "@/context/FilterContext_Server";
import usePageTitle from "@/utils/usePageTitle";
import { useEffect, useState } from "react";

export function Servers() {
  usePageTitle("Resources");

  const { filter_sort, page, page_amount, filter_search } =
    useFilterContext_Server();
  const [loading, setLoading] = useState(true);

  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    // setTotalPages(Math.ceil(totalResources / page_amount));
    getServers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page_amount]);

  useEffect(() => {
    getServers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter_sort, page, filter_search]);

  async function getServers() {
    setLoading(true);
  }

  return (
    <>
      {/* Resource Hot Category Bar */}
      <div className="hidden lg:flex flex-row mx-auto w-full justify-center bg-primary pb-1 -mt-1 space-x-1">
        {/* <FilterCategory /> */}
      </div>
      {/* Main Div */}
      <main className="max-w-6xl mx-auto p-3 flex lg:flex-row flex-col lg:space-x-3 lg:space-y-0">
        <div className="w-full lg:max-w-80">
          {/* Filters */}
          <Sidebar />
        </div>

        {/* Main Panel */}
        <div className="w-full lg:max-w-6xl space-y-2">
          {/* Search Bar */}
          <SearchBar />
          {/* Pagination */}
          <PageBar pageTotal={totalPages} />
          {/* Resource Preview List */}
          <div className="resources">
            {/* <ResourceList
              loading={loading}
              resources={resources}
              amount={page_amount}
            /> */}
          </div>
          {/* Pagination */}
          <PageBar pageTotal={totalPages} />
        </div>
      </main>
    </>
  );
}

function PageBar({ pageTotal }: { pageTotal: number }) {
  // const { page, setPage } = useFilterResourceContext();
  if (pageTotal <= 1) return <></>;
  return (
    <div className="w-full flex">
      <div className="mx-auto">
        {/* <Pagination
          currentPage={page + 1}
          totalPages={pageTotal}
          onPageChange={(page) => {
            setPage(page - 1);
          }}
        /> */}
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <Card className="lg:hidden">
      <CardContent className="flex flex-wrap pl-0 pb-2">
        <div className="item flex flex-row grow">
          {/* Filter (mobile) */}
          {/* <Button
            variant={filter_show ? "special" : "outline"}
            onClick={() => setFilter_show((prev: boolean) => !prev)}
            className="relative mr-2"
          >
            <Filter className="pr-1" size={20} />
            Filters
            {!filter_show && isFiltering && (
              <span className="absolute -top-[5px] -right-[5px] flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-xl bg-accent opacity-75 z-9"></span>
                <span className="relative inline-flex rounded-xl h-full w-full bg-accent z-10"></span>
              </span>
            )}
          </Button> */}
          {/* Search */}
          <FilterSearch />
        </div>

        {/* Sort */}
        <div className="item grow min-w-48">{/* <FilterSort /> */}</div>

        <div className="item min-w-16">
          <FilterPerPage />
        </div>
      </CardContent>
    </Card>
  );
}

function Sidebar() {
  return <Card></Card>;
}
