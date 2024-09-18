import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

function PaginatedItems({
  children,
  itemsPerPage,
  items,
  loadMoreData,
  currentPage,
  onPageChange,
}) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const itemOffset = currentPage * itemsPerPage;
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.products.length / itemsPerPage));
  }, [currentPage, itemsPerPage, items]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected;

    if (selectedPage > 0 && (selectedPage + 1) % 3 === 0) {
      loadMoreData.setFetchCounter(loadMoreData.fetchCounter + 1);
    }

    onPageChange(selectedPage);
  };

  return (
    <>
      {currentItems.map((item) => (
        <React.Fragment key={item.id}>{children(item)}</React.Fragment>
      ))}

      {pageCount > 1 && (
        <div className="absolute bottom-10 lg:right-0 lg:bottom-16 xl:right-0 xl:bottom-16 2xl:right-0 2xl:bottom-16">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            containerClassName="flex flex-wrap justify-center mt-4 space-x-1 gap-1 md:flex-nowrap md:space-x-2 md:gap-2 lg:flex-nowrap lg:space-x-2 lg:gap-2 xl:flex-nowrap xl:space-x-2 xl:gap-2 2xl:flex-nowrap 2xl:space-x-2 2xl:gap-2"
            pageClassName="px-3 py-1 text-base font-medium s:text-sm s:px-2 xs:text-sm xs:px-2 sm:text-sm sm:px-2"
            activeClassName="bg-[#E91B1A] text-white rounded-sm"
            previousClassName="px-3 py-1 text-base font-medium s:text-sm s:px-2 xs:text-sm xs:px-2 sm:text-sm sm:px-2"
            nextClassName="px-3 py-1 text-base font-medium s:text-sm s:px-2 xs:text-sm xs:px-2 sm:text-sm sm:px-2"
            breakClassName="px-3 py-1 text-base font-medium s:text-sm s:px-2 xs:text-sm xs:px-2 sm:text-sm sm:px-2"
            disabledClassName="opacity-50 cursor-not-allowed"
            forcePage={currentPage}
          />
        </div>
      )}
    </>
  );
}

export default PaginatedItems;
