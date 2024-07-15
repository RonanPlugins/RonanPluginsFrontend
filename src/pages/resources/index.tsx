import resourceAPI from "@/api/resource";
import { useEffect, useState } from "react";
import { ResourcePreview } from "@/components/resource/Preview";

import Pagination from "@/components/common/Pagination";
import { Card, CardContent } from "@/components/ui/card";
import usePageTitle from "@/utils/usePageTitle";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { FilterSearch } from "@/components/filters/FilterSearch";
import { useFilterContext_Resource } from "@/context/FilterContext_Resource";
import { FilterClear_Resource } from "@/components/filters/FilterClear";
import { FilterPerPage } from "@/components/filters/FilterPerPage";
import { getEnumIndexByKey, getEnumIndexByValue } from "@/utils/enum";
import { PLUGIN_CATEGORY, PLUGIN_VERSION } from "minecentral-api";
import { Link } from "react-router-dom";
import Links from "@/lib/Links";
import { useUserContext } from "@/context/UserContext";
import { FilterCategory_Resource } from "@/components/filters/resources/FilterCategory_Resource";
import { FilterSort_Resource } from "@/components/filters/resources/FilterSort_Resource";
import { FilterVersion_Resource } from "@/components/filters/resources/FilterVersion_Resource";
import useDebounce from "@/hooks/useDebounce";
import { useFilterContext_Common } from "@/context/FilterContext_Common";

export function Resources() {
  usePageTitle("Resources");

  const {
    filter_sort,
    filter_versions,
    filter_category,
    page,
    setPage,
    page_amount,
    setFilterParams,
    filter_search,
  } = useFilterContext_Resource();
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<any[] | null>(null);
  const [totalResources, setTotalResources] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const deboucedSearchFilter = useDebounce(filter_search);

  useEffect(() => {
    setTotalPages(Math.ceil(totalResources / page_amount));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalResources, page_amount]);

  useEffect(() => {
    getResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filter_sort,
    page,
    filter_versions,
    deboucedSearchFilter,
    filter_category,
  ]);

  async function getResources() {
    setLoading(true);
    if (!filter_sort) {
      return setLoading(false);
    }
    const posts = await resourceAPI.getAll({
      sort: filter_sort,
      page,
      count: page_amount,
      search: filter_search,
      versions: filter_versions?.map((key) =>
        getEnumIndexByValue(PLUGIN_VERSION, key)
      ),
      category: filter_category
        ? getEnumIndexByKey(PLUGIN_CATEGORY, filter_category)
        : null,
    });
    setTotalResources(posts.totalCount);
    setResources(posts.resources);
    setLoading(false);
    if (posts.resources && posts.resources[0]) {
      if (page === 0) setFilterParams({});
      else setFilterParams({ page: `${page}` }); //navigate(page === 0 ? `.` : `./?page=${page}`);
    } else if (page !== 0) setPage(0);
    // console.log(posts);
  }

  return (
    <>
      {/* Resource Hot Category Bar */}
      <div className="hidden lg:flex flex-row mx-auto w-full justify-center bg-primary pb-1 -mt-1 space-x-1">
        <FilterCategory_Resource />
      </div>
      {/* Main Div */}
      <main className="max-w-6xl mx-auto p-3 flex lg:flex-row flex-col lg:space-x-3 lg:space-y-0">
        <div className="w-full lg:max-w-80 self-start sticky top-3">
          {/* Filters */}
          <Sidebar />
        </div>

        {/* Main Panel */}
        <div className="w-full lg:max-w-6xl space-y-2 lg:space-y-0">
          {/* Search Bar */}
          <SearchBar />
          {/* Pagination */}
          <PageBar pageTotal={totalPages} />
          {/* Resource Preview List */}
          <div className="resources">
            <ResourceList
              loading={loading}
              resources={resources}
              amount={page_amount}
            />
          </div>
          {/* Pagination */}
          <PageBar pageTotal={totalPages} />
        </div>
      </main>
    </>
  );
}

function PageBar({ pageTotal }: { pageTotal: number }) {
  const { page, setPage } = useFilterContext_Common();
  if (pageTotal <= 1) return <></>;
  return (
    <div className="w-full flex">
      <div className="mx-auto">
        <Pagination
          currentPage={page + 1}
          totalPages={pageTotal}
          onPageChange={(page) => {
            setPage(page - 1);
          }}
        />
      </div>
    </div>
  );
}

function SearchBar() {
  const { filter_show, setFilter_show, isFiltering } =
    useFilterContext_Common();

  return (
    <Card className="lg:hidden">
      <CardContent className="flex flex-wrap pl-0 pb-2">
        <div className="item flex flex-row grow">
          {/* Filter (mobile) */}
          <Button
            variant={filter_show ? "special" : "outline"}
            onClick={() => setFilter_show((prev: boolean) => !prev)}
            className="relative mr-2"
          >
            <Filter className="pr-1" size={20} />
            More Filters
            {!filter_show && isFiltering && (
              <span className="absolute -top-[5px] -right-[5px] flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-xl bg-accent opacity-75 z-9"></span>
                <span className="relative inline-flex rounded-xl h-full w-full bg-accent z-10"></span>
              </span>
            )}
          </Button>
          {/* Search */}
          <FilterSearch />
        </div>

        {/* Sort */}
        <div className="item grow min-w-48">
          <FilterSort_Resource />
        </div>

        <div className="item min-w-16">
          <FilterPerPage />
        </div>
      </CardContent>
    </Card>
  );
}

function Sidebar() {
  const { filter_show } = useFilterContext_Common();
  return (
    <Card className={`${filter_show ? "" : "hidden"} lg:block mb-2 px-2`}>
      {/* Filters */}
      <div className="hidden lg:flex flex-col gap-2 my-2">
        <CreateResourceButton />
        <div className="flex flex-row grow">
          {/* Search */}
          <FilterSearch />
        </div>
        {/* Sort */}
        <div className="grow min-w-48">
          <FilterSort_Resource />
        </div>
        <div className="flex flex-row items-center">
          <div className="w-16">
            <FilterPerPage />
          </div>

          <FilterClear_Resource className="ml-auto" />
        </div>
      </div>
      {/* Clear Filter Button */}
      <div className="lg:hidden">
        <FilterClear_Resource className="mx-auto mt-2" />
      </div>
      {/* Category (mobile) */}
      <div className="lg:hidden mx-2">
        <h2 className="font-bold">Category</h2>
        <div className="flex flex-row flex-wrap mx-auto w-full justify-center pb-2 space-x-1">
          <FilterCategory_Resource className="mt-1" variant={"outline"} />
        </div>
      </div>
      {/* Loader */}
      {/* <div className="mx-2">
        <h2 className="font-bold">Loader</h2>
        <CardContent>
          <FilterLoader />
        </CardContent>
      </div> */}
      {/* Proxy */}
      {/* <div className="mx-2">
        <h2 className="font-bold">Proxies</h2>
        <CardContent>
          <FilterProxy />
        </CardContent>
      </div> */}
      {/* Minecraft Versions */}
      <div className="">
        <h2 className="ml-2 font-bold">Minecraft Version</h2>
        <FilterVersion_Resource />
      </div>
    </Card>
  );
}

function ResourceList({
  loading,
  resources,
  amount,
}: {
  loading: boolean;
  resources: any[] | null;
  amount: number;
}) {
  return (
    <>
      {!loading || resources
        ? resources &&
          resources.map((resource) => (
            <ResourcePreview key={resource._id} resource={resource} />
          ))
        : Array.from({ length: amount }, (_, index) => (
            <LoadingResource key={index} />
          ))}
    </>
  );
}

function LoadingResource() {
  return (
    <div className="border bg-card rounded-xl p-3 w-full mx-auto ">
      <div className="animate-pulse flex space-x-3">
        <div className="rounded-xl bg-slate-700 h-[96px] w-[96px]"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateResourceButton() {
  const { isLoggedIn } = useUserContext();

  return (
    <>
      {isLoggedIn ? (
        <Link to={Links.ResourceNew}>
          <Button className="w-full flex flex-col h-auto p-1">
            <p>Post New Resource</p>
            <p className="text-xs font-normal">or import from SpigotMC</p>
          </Button>
        </Link>
      ) : (
        <Link to={Links.Register}>
          <Button className="w-full flex flex-col h-auto p-1 flex-wrap">
            <p>Login or Register</p>
            <p className="text-xs font-normal text-wrap">
              Post your own resources and make money sharing your projects!
            </p>
          </Button>
        </Link>
      )}
    </>
  );
}
