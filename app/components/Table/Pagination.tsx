"use client"
import React, {Suspense} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_PAGE, DEFAULT_ROW_PER_PAGE } from "@/app/constants/table";

type PaginationProps = { totalRows: number }

const rowsPerPageOptions = [10, 50, 100, 1000]
  
const Pagination = ({ totalRows }: PaginationProps) => {
  const router = useRouter()
  const currentPath = usePathname()
  const searchParams = useSearchParams()
  const currentPage = +(searchParams.get("page") || DEFAULT_PAGE);
  const currentPageSize = +(searchParams.get("limit") || DEFAULT_ROW_PER_PAGE);
  const totalPages = Math.ceil(totalRows / DEFAULT_ROW_PER_PAGE);

  const handlePageChange = (page: number) => {
    router.replace(`${currentPath}?page=${page}&limit=${currentPageSize}`)
  };

  const handleRowsPerPageChange = (rowsPerPage: string) => {
    console.log ('xxx handleRowsPerPageChange ', rowsPerPage)
    router.replace(`${currentPath}?page=${DEFAULT_PAGE}&limit=${rowsPerPage}`)
  };

  const goToFirstPage = () => {
    router.replace(`${currentPath}?page=${DEFAULT_PAGE}&limit=${currentPageSize}`)
  };

  const goToLastPage = () => {
    handlePageChange(totalPages);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <Suspense>
      <div className="flex items-center space-x-2">
        {/** Rows per item Select */}
        <select tabIndex={0} className="bg-base-100 rounded-box z-[1] w-full p-2 shadow active:outline:none focus:outline:none" onChange={(e)=>handleRowsPerPageChange(e.target.value)}>
          {rowsPerPageOptions.map(opt => <option key={opt} value={opt}> {opt} </option>)}
        </select>
        <div className="flex space-x-2">
          <button
            onClick={goToFirstPage}
            className="btn btn-xs"
            disabled={currentPage === 1}
          >
            &lt;&lt;
          </button>
          <button
            onClick={goToPreviousPage}
            className="btn btn-xs"
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span className="whitespace-nowrap mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            className="btn btn-xs"
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
          <button
            onClick={goToLastPage}
            className="btn btn-xs"
            disabled={currentPage === totalPages}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default Pagination;
