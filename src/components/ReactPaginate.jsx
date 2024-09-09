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
        <div className="absolute right-0 bottom-16">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            containerClassName="flex justify-center mt-4 space-x-2 gap-2"
            pageClassName="px-3 py-1 text-base font-medium"
            activeClassName="bg-[#E91B1A] text-white rounded-sm"
            previousClassName="px-3 py-1 text-base font-medium"
            nextClassName="px-3 py-1 text-base font-medium"
            breakClassName="px-3 py-1 text-base font-medium"
            disabledClassName="opacity-50 cursor-not-allowed"
            forcePage={currentPage}
          />
        </div>
      )}
    </>
  );
}

export default PaginatedItems;
