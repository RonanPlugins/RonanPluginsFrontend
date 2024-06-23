import resourceAPI from "@/api/resource";
import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import { ResourcePreview } from "@/components/resource/Preview";

import Pagination from "@/components/common/Pagination";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import usePageTitle from "@/utils/usePageTitle";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { FilterSearch } from "@/components/filter/FilterSearch";
import { FilterVersion } from "@/components/filter/FilterVersion";
import { useFilterResourceContext } from "@/context/FilterResourceContext";
import { FilterSort } from "@/components/filter/FilterSort";
import { FilterCategory } from "@/components/filter/FilterCategory";
import { FilterClear } from "@/components/filter/FilterClear";
import { FilterProxy } from "@/components/filter/FilterProxy";
import { FilterLoader } from "@/components/filter/FilterLoader";
// import { VERSION } from "minecentral-api/dist/plugins/VERSION";

export function Resources() {
  usePageTitle("Resources");
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<any[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  //Filters
  const {
    filter_sort: sort,
    filter_show,
    setFilter_show,
  } = useFilterResourceContext();
  //Pagination
  const perPage = 15;
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 0
  );

  async function getResources() {
    setLoading(true);
    if (!sort) {
      return setLoading(false);
    }
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
    <>
      {/* Resource Hot Category Bar */}
      <div className="hidden md:flex flex-row mx-auto w-full justify-center bg-primary pb-2 space-x-1">
        <FilterCategory />
      </div>
      {/* Main Div */}
      <main className="max-w-6xl mx-auto p-2 flex lg:flex-row flex-col lg:space-x-2 mb-2 lg:space-y-0">
        <div className="w-full lg:w-96">
          {/* Title/Filter */}
          <Sidebar filter_show={filter_show} />
        </div>

        {/* Main Panel */}
        <div className="w-full lg:max-w-6xl space-y-2">
          {/* Search Bar */}
          <SearchBar
            filter_show={filter_show}
            setFilter_show={setFilter_show}
          />
          {/* Pagination */}
          <PageBar page={page} pageTotal={totalPages} setPage={setPage} />
          {/* Resource Preview List */}
          <div className="resources">
            <ResourceList loading={loading} resources={resources} />
          </div>
        </div>
      </main>
    </>
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
  filter_show,
  setFilter_show,
}: {
  filter_show: boolean;
  setFilter_show: any;
}) {
  return (
    <Card className="">
      <CardContent className="flex flex-wrap pl-0 pb-2">
        <div className="item flex flex-row grow">
          {/* Filter (mobile) */}
          <Button
            variant={filter_show ? "special" : "outline"}
            onClick={() => setFilter_show((prev: boolean) => !prev)}
            className="lg:hidden mr-2"
          >
            <Filter className="pr-1" size={20} />
            Filters
          </Button>
          {/* Search */}
          <FilterSearch />
        </div>

        {/* Sort */}
        <div className="item grow min-w-fit">
          <FilterSort />
        </div>
      </CardContent>
    </Card>
  );
}

function Sidebar({ filter_show }: { filter_show: boolean }) {
  return (
    <Card className={`${filter_show ? "" : "hidden"} lg:block mb-2 px-2`}>
      {/* Clear Filter Button */}
      <FilterClear />
      {/* Filters */}

      {/* Category (mobile) */}
      <div className="md:hidden mx-2">
        <h2 className="font-bold pl-2">Category</h2>
        <div className="flex flex-row flex-wrap mx-auto w-full justify-center pb-2 space-x-1">
          <FilterCategory className="mt-1" variant={"outline"} />
        </div>
      </div>
      {/* Loader */}
      <div className="mx-2">
        <h2 className="font-bold">Loader</h2>
        <CardContent>
          <FilterLoader />
        </CardContent>
      </div>
      {/* Proxy */}
      <div className="mx-2">
        <h2 className="font-bold">Proxies</h2>
        <CardContent>
          <FilterProxy />
        </CardContent>
      </div>
      {/* Minecraft Versions */}
      <div className="">
        <h2 className="ml-2 font-bold">Minecraft Version</h2>
        <FilterVersion />
      </div>
    </Card>
  );
}

function ResourceList({
  loading,
  resources,
}: {
  loading: boolean;
  resources: any[] | null;
}) {
  return (
    <>
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
    </>
  );
}
