import resourceAPI from "@/api/resource";
import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import { ResourcePreview } from "@/components/resource/Preview";
import { FILTERBY, getTitle } from "@/utils/FILTERBY";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@/components/common/Pagination";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import usePageTitle from "@/utils/usePageTitle";
import { NavFilterBar } from "@/components/resource/NavFilterBar";
import { useResourceContext } from "@/context/ResourceContext";
import { CATEGORY_PLUGIN } from "minecentral-api/dist/categories/CATEGORY_PLUGIN";

export function Resources() {
  usePageTitle("Resources");
  const { category, setCategory } = useResourceContext();
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<any[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  //Filters
  const [sort, setSort] = useState<string>(FILTERBY.LAST_UPDATE);
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

  if (loading) return <Loading />;

  return (
    <div className="">
      <div className="hidden md:flex flex-row mx-auto w-full justify-center bg-primary pb-2">
        <NavFilterBar
          onSelect={(category: CATEGORY_PLUGIN) => {
            setCategory(category);
          }}
          selected={category}
          variant="ghost"
          className="rounded-none"
        />
      </div>

      <div className="max-w-6xl space-y-2 mx-auto p-2 flex lg:flex-row flex-col lg:space-x-2 mb-2 lg:space-y-0">
        <div className="w-full lg:w-96">
          {/* Title/Filter */}
          <Card>
            <CardHeader>
              <h2 className="font-bold">Sort By</h2>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setSort} value={sort}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(FILTERBY).map((filter) => (
                    <SelectItem key={filter} value={filter}>
                      {getTitle(filter)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Resources */}
        <div className="w-full lg:max-w-6xl space-y-2">
          <div className="resources">
            {resources &&
              resources.map((resource) => (
                <div className="resource" key={resource._id}>
                  <ResourcePreview resource={resource} />
                </div>
              ))}
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              startPage={page + 1}
              totalPages={totalPages}
              onPageChange={(page) => {
                setPage(page - 1);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
