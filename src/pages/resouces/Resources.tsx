import resourceAPI from "@/api/resource";
import Loading from "@/components/common/Loading";
import { useEffect, useState } from "react";
import ResourcePreview from "@/components/resource/ResourcePreview";
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

export default function Resources() {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<any[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  //Filters
  const [sort, setSort] = useState<string>(FILTERBY.LAST_UPDATE);
  const perPage = 20;
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 0
  );

  async function getResources() {
    const posts = await resourceAPI.getAll({ sort, page, count: perPage });
    setResources(posts);
    setTotalPages(Math.ceil((await resourceAPI.getCount()) / perPage));
    setLoading(false);
    if (resources) {
      if (page === 0) setSearchParams({});
      else setSearchParams({ page: `${page}` }); //navigate(page === 0 ? `.` : `./?page=${page}`);
    } else if (page !== 0) setPage(0);
    console.log(posts);
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
    <div className="resourceContainer my-2">
      {/* Title/Filter */}
      <div className="flex flex-row">
        <h1 className="">Resources</h1>
        <div className="flex flex-row ml-auto mb-2">
          <p className="my-auto mr-2">Sort By:</p>
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
        </div>
      </div>
      {/* Resources */}
      <div className="resources">
        {resources &&
          resources.map((resource) => (
            <ResourcePreview key={resource._id} resource={resource} />
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
  );
}
