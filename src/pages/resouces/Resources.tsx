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

export function Resources() {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<any[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  //Filters
  const [sort, setSort] = useState<string>(FILTERBY.LAST_UPDATE);
  const perPage = 10;
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 0
  );

  async function getResources() {
    setLoading(true);
    const posts = await resourceAPI.getAll({ sort, page, count: perPage });
    setResources(posts);
    setTotalPages(Math.ceil((await resourceAPI.getCount()) / perPage));
    setLoading(false);
    if (posts) {
      if (page === 0) setSearchParams({});
      else setSearchParams({ page: `${page}` }); //navigate(page === 0 ? `.` : `./?page=${page}`);
    } else if (page !== 0) setPage(0);
    // console.log(posts);
  }

  // useEffect(() => {
  //   getResources();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    getResources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, page]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto flex lg:flex-row flex-col space-x-2 mt-2">
      <div className="w-full lg:w-96">
        {/* Title/Filter */}
        <Card>
          <CardHeader>
            <h2 className="font-bold">Sort By</h2>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setSort} value={sort}>
              <SelectTrigger className="w-[180px]">
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
          <CardHeader>
            <h2 className="font-bold">Categories</h2>
          </CardHeader>
          <CardContent>
            <p>Chat</p>
          </CardContent>
        </Card>
      </div>

      {/* Resources */}
      <div className="max-w-4xl lg:max-w-6xl grid space-y-2">
        <div className="resources">
          {resources &&
            resources.map((resource) => (
              <div className="resource">
                <ResourcePreview key={resource._id} resource={resource} />
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
  );
}
