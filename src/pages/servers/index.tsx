import server from "@/api/server";
import Pagination from "@/components/common/Pagination";
import { FilterClear_Server } from "@/components/filters/FilterClear";
import { FilterPerPage } from "@/components/filters/FilterPerPage";
import { FilterSearch } from "@/components/filters/FilterSearch";
import { FilterCategory_Server } from "@/components/filters/servers/FilterCategory_Server";
import { FilterSort_Server } from "@/components/filters/servers/FilterSort_Server";
import { ServerPreview } from "@/components/server/Preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFilterContext_Common } from "@/context/FilterContext_Common";
import { useFilterContext_Server } from "@/context/FilterContext_Server";
import { useUserContext } from "@/context/UserContext";
import useDebounce from "@/hooks/useDebounce";
import Links from "@/lib/Links";
import { getEnumIndex } from "@/utils/enum";
import usePageTitle from "@/utils/usePageTitle";
import { Filter } from "lucide-react";
import { SERVER_CATEGORY } from "minecentral-api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Servers() {
  usePageTitle("Servers");

  const {
    filter_sort,
    page,
    page_amount,
    filter_search,
    filter_category,
    setFilterParams,
    setPage,
  } = useFilterContext_Server();
  const [loading, setLoading] = useState(true);

  const [totalPages, setTotalPages] = useState<number>(0);
  const [servers, setServers] = useState<any[] | null>(null);
  const [totalServers, setTotalServers] = useState<number>(0);
  const deboucedSearchFilter = useDebounce(filter_search);

  useEffect(() => {
    setTotalPages(Math.ceil(totalServers / page_amount));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalServers, page_amount]);

  useEffect(() => {
    getServers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter_sort, page, deboucedSearchFilter, filter_category]);

  async function getServers() {
    setLoading(true);
    if (!filter_sort) {
      return setLoading(false);
    }
    const posts = await server.getAll({
      sort: filter_sort,
      page,
      count: page_amount,
      search: filter_search,
      category: filter_category
        ? getEnumIndex(SERVER_CATEGORY, filter_category)
        : null,
    });
    setTotalServers(posts.totalCount);
    setServers(posts.servers);
    setLoading(false);
    if (posts.resources && posts.resources[0]) {
      if (page === 0) setFilterParams({});
      else setFilterParams({ page: `${page}` }); //navigate(page === 0 ? `.` : `./?page=${page}`);
    } else if (page !== 0) setPage(0);
  }

  return (
    <>
      {/* Hot Category Bar */}
      <div className="hidden lg:h-10 lg:flex flex-row mx-auto w-full items-center justify-center bg-card space-x-1">
        <FilterCategory_Server className="!h-8" />
      </div>
      {/* Main Div */}
      <main className="max-w-7xl mx-auto p-3 flex lg:flex-row flex-col lg:space-x-3 lg:space-y-0">
        <div className="w-full lg:max-w-80 self-start sticky top-14">
          {/* Filters */}
          <Sidebar />
        </div>

        {/* Main Panel */}
        <div className="w-full space-y-2 lg:space-y-0">
          {/* Search Bar */}
          <SearchBar />
          {/* Pagination */}
          <PageBar className="mb-3" pageTotal={totalPages} />
          {/* Resource Preview List */}
          <div className="resources">
            <ServerList
              loading={loading}
              servers={servers}
              amount={page_amount}
            />
          </div>
          {/* Pagination */}
          <PageBar className="mt-3" pageTotal={totalPages} />
        </div>
      </main>
    </>
  );
}

function PageBar({
  pageTotal,
  className,
}: {
  pageTotal: number;
  className: string;
}) {
  const { page, setPage } = useFilterContext_Common();
  if (pageTotal <= 1) return <></>;
  return (
    <div className={`w-full flex mx-auto justify-center ${className}`}>
      <Pagination
        currentPage={page + 1}
        totalPages={pageTotal}
        onPageChange={(page) => {
          setPage(page - 1);
        }}
      />
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
            Filters
            {!filter_show && isFiltering && (
              <span className="absolute -top-[5px] -right-[5px] flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-xl bg-accent opacity-75 z-9"></span>
                <span className="relative inline-flex rounded-xl h-full w-full bg-accent z-10"></span>
              </span>
            )}
          </Button>
          {/* Search */}
          <FilterSearch text="Search servers..." />
        </div>

        {/* Sort */}
        <div className="item grow min-w-48">
          {/* <FilterSort_Resource /> */}
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
        <CreateServerButton />
        <div className="flex flex-row grow">
          {/* Search */}
          <FilterSearch text="Search servers..." />
        </div>
        {/* Sort */}
        <div className="grow min-w-48">{<FilterSort_Server />}</div>
        <div className="flex flex-row items-center">
          <div className="w-16">
            <FilterPerPage />
          </div>

          <FilterClear_Server className="ml-auto" />
        </div>
      </div>
      {/* Clear Filter Button */}
      <div className="lg:hidden">
        <FilterClear_Server className="mx-auto mt-2" />
      </div>
      {/* Category (mobile) */}
      <div className="lg:hidden mx-2">
        <h2 className="font-bold">Category</h2>
        <div className="flex flex-row flex-wrap mx-auto w-full justify-center pb-2 space-x-1">
          <FilterCategory_Server className="mt-1" variant={"outline"} />
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
    </Card>
  );
}

function ServerList({
  loading,
  servers,
  amount,
}: {
  loading: boolean;
  servers: any[] | null;
  amount: number;
}) {
  // console.log(servers);
  return (
    <div className="grid md:grid-cols-2 gap-3">
      {!loading || servers
        ? servers &&
          servers.map((server) => (
            <ServerPreview key={server._id} server={server} />
          ))
        : Array.from({ length: amount }, (_, i) => <LoadingServer key={i} />)}
    </div>
  );
}

function CreateServerButton() {
  const { isLoggedIn } = useUserContext();

  return (
    <>
      {isLoggedIn ? (
        <Link to={Links.ServerNew}>
          <Button className="w-full flex flex-col h-auto p-1">
            <p>Add Your Server</p>

            <p className="text-xs font-normal">get your server noticed</p>
          </Button>
        </Link>
      ) : (
        <Link to={Links.Register}>
          <Button className="w-full flex flex-col h-auto p-1 flex-wrap">
            <p>Login or Register</p>
            <p className="text-xs font-normal text-wrap">
              Post your own server and get noticed!
            </p>
          </Button>
        </Link>
      )}
    </>
  );
}

function LoadingServer() {
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
