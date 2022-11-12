import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { usePagination, DOTS } from "../../../hooks/usePagination";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    isFixed,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <div>
      <div className="bg-white py-3 flex items-center justify-between px-2 container">
        <div className="sm:flex-1 sm:flex sm:items-center sm:justify-end">
          {Number(currentPage) !== 1 && (
            <div
              className="bg-white rounded-full text-contrast-90 hover:bg-contrast-10 relative inline-flex items-center h-7.5 w-7.5 py-2 px-3.5 text-sm font-medium"
              onClick={() => onPageChange(Number(currentPage) - 1)}
            >
              <IoChevronBack
                className="block h-4 w-4 text-contrast-90"
                aria-hidden="true"
              />
            </div>
          )}
          <ul className="relative z-0 inline-flex rounded-md cursor-pointer  ">
            {paginationRange.map((pageNumber) => {
              if (pageNumber === DOTS) {
                return (
                  <li
                    key={"dots" + Math.floor(Math.random() * 100)}
                    className="bg-white text-contrast-90 rounded-full hover:bg-contrast-10 relative inline-flex items-center h-7.5 w-7.5 py-2 px-3.5 text-sm font-medium"
                  >
                    &#8230;
                  </li>
                );
              }

              return (
                <li
                  key={pageNumber}
                  className={
                    pageNumber === Number(currentPage)
                      ? "bg-contrast-10 text-primary-text rounded-full hover:bg-contrast-30 relative inline-flex items-center h-7.5 w-7.5 py-2 px-3.5 text-sm font-medium"
                      : "bg-white rounded-full text-contrast-90 hover:bg-contrast-10 relative inline-flex items-center h-7.5 w-7.5 py-2 px-3.5 text-sm font-medium"
                  }
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </li>
              );
            })}
          </ul>
          {paginationRange.length !== Number(currentPage) && (
            <div
              className="bg-white rounded-full text-contrast-90 hover:bg-contrast-10 relative inline-flex items-center h-7.5 w-7.5 py-2 px-3.5 text-sm font-medium"
              onClick={() => onPageChange(Number(currentPage) + 1)}
            >
              <IoChevronForward
                className="block h-4 w-4 text-contrast-90"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
