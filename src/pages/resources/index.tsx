import resourceAPI from "@/api/resource";
import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import { ResourcePreview } from "@/components/resource/Preview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/common/Pagination";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import usePageTitle from "@/utils/usePageTitle";
import { NavFilterBar } from "@/components/resource/NavFilterBar";
import { useResourceContext } from "@/context/ResourceContext";
import { Checkbox } from "@/components/ui/checkbox";
import { formatToTitleCase } from "@/utils/formatter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleX, Filter, Search } from "lucide-react";
import { SORTBY, getTitle } from "@/utils/SORTBY";
import { VERSION } from "@/utils/VERSION";
// import { VERSION } from "minecentral-api/dist/plugins/VERSION";

export function Resources() {
  usePageTitle("Resources");
  const { category, setCategory } = useResourceContext();
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<any[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  //Sorting
  const [sort, setSort] = useState<string>(SORTBY.LAST_UPDATE);
  //Filter
  const [filterShow, setFilterShow] = useState<boolean>(false); //Only used in mobile
  //Pagination
  const perPage = 15;
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 0
  );

  async function getResources() {
    setLoading(true);
    const posts = await resourceAPI.getAll({ sort, page, count: perPage });
    setResources(posts);
    setTotalPages(Math.ceil((await resourceAPI.getCount()) / perPage));
    setLoading(false);
    if (posts && posts[0]) {
      if (page === 0) setSearchParams({});
      else setSearchParams({ page: `${page}` }); //navigate(page === 0 ? `.` : `./?page=${page}`);
    } else if (page !== 0) setPage(0);
    // console.log(posts);
  }

  useEffect(() => {
    getResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, page]);

  return (
    <div className="">
      <div className="hidden md:flex flex-row mx-auto w-full justify-center bg-primary pb-2">
        <NavFilterBar
          onSelect={(category: any) => {
            setCategory(category);
          }}
          selected={category}
          variant="ghost"
          className="rounded-full ml-1"
        />
      </div>

      <div className="max-w-6xl mx-auto p-2 flex lg:flex-row flex-col lg:space-x-2 mb-2 lg:space-y-0">
        <div className="w-full lg:w-96">
          {/* Title/Filter */}
          <Filters show={filterShow} />
        </div>

        {/* Main Panel */}
        <div className="w-full lg:max-w-6xl space-y-2">
          {/* Search Bar */}
          <SearchBar
            valueSortBy={sort}
            onSortChange={setSort}
            setShowFilter={setFilterShow}
            showFilter={filterShow}
          />
          {/* Pagination */}
          <PageBar page={page} pageTotal={totalPages} setPage={setPage} />
          {/* Resource Preview List */}
          <div className="resources">
            {!loading ? (
              resources &&
              resources.map((resource) => (
                <div className="resource" key={resource._id}>
                  <ResourcePreview resource={resource} />
                </div>
              ))
            ) : (
              <Loading className="w-full" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PageBar({
  pageTotal,
  page,
  setPage,
}: {
  pageTotal: number;
  page: number;
  setPage: any;
}) {
  return (
    <>
      {pageTotal > 1 && (
        <Pagination
          startPage={page + 1}
          totalPages={pageTotal}
          onPageChange={(page) => {
            setPage(page - 1);
          }}
        />
      )}
    </>
  );
}

function SearchBar({
  valueSortBy,
  onSortChange,
  setShowFilter,
  showFilter,
}: {
  valueSortBy: string;
  onSortChange: any;
  setShowFilter: any;
  showFilter: boolean;
}) {
  return (
    <Card className="">
      <CardContent className="flex flex-wrap pl-0 pb-2">
        <div className="item flex flex-row grow">
          {/* Filter (mobile) */}
          <Button
            variant={showFilter ? "special" : "outline"}
            onClick={() => setShowFilter((prev: boolean) => !prev)}
            className="lg:hidden mr-2"
          >
            <Filter className="pr-1" size={20} />
            Filters
          </Button>
          {/* Search */}
          <div className="w-full relative h-10">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
            />
            <Input
              type="text"
              placeholder="Search resources..."
              className="pl-10 pr-3 text-md w-full"
              // onChange={(e) => {
              //   console.log(e.target.value);
              // }}
            />
          </div>
        </div>

        {/* Sort */}
        <div className="item grow min-w-fit">
          <Sortby onValueChange={onSortChange} value={valueSortBy} />
        </div>
      </CardContent>
    </Card>
  );
}

function Filters({ show }: { show: boolean }) {
  return (
    <Card className={`${show ? "" : "hidden"} lg:block mb-2`}>
      {/* Clear Filter Button */}
      <Button
        variant="outline"
        className="mt-2 ml-2 mr-auto rounded-full hover:text-red"
      >
        <CircleX size={20} className="mr-2" />
        Clear Filters
      </Button>
      {/* Filters */}
      <div>
        {/* Versions */}
        <h2 className="font-bold pl-2">Minecraft Version</h2>
        <div className="flex space-y-2 flex-wrap lg:block pl-2 justify-center">
          {VERSION.map((filter) => {
            return (
              <div
                key={filter}
                className="item flex shrink items-center space-x-2"
              >
                <Checkbox id="terms" className="transition-colors" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {formatToTitleCase(filter)}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

/* <div className="flex space-y-2 flex-wrap lg:block pl-2 justify-center">
  {enumToArray(CATEGORY_PLUGIN).map((filter) => {
    return (
      <div key={filter} className="item flex shrink items-center space-x-2">
        <Checkbox id="terms" className="transition-colors" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {formatToTitleCase(filter)}
        </label>
      </div>
    );
  })}
</div>; */

function Sortby({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (p: string) => void;
}) {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.values(SORTBY).map((filter) => (
          <SelectItem key={filter} value={filter}>
            {getTitle(filter)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
