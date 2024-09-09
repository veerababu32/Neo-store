import { useEffect, useState } from 'react';
import { productsBgImg } from '../../assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Image, Loader, PaginatedItems } from '../index';
import conf from '../../conf/conf';

function AllProducts() {
  const [data, setData] = useState({
    categoryList: [],
    allProducts: { products: [] },
  });
  const [selectCheckbox, setSelectCheckbox] = useState(null);
  const [fetchCounter, setFetchCounter] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let { num } = location.state;
  const URL = conf.reactAppBaseApi;

  useEffect(() => {
    let isMounted = true;

    setLoader(true);
    async function fetchData() {
      try {
        const res = await axios.get(`${URL}/products/category-list`);
        if (isMounted && res?.data) {
          setData((prev) => ({ ...prev, categoryList: res.data }));
        }
      } catch (e) {
        console.log(`Error :: ${e} :: ALL Products :: category list`);
      } finally {
        setLoader(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [URL]);

  useEffect(() => {
    let isMounted = true;

    let skip = fetchCounter * 36;
    if (skip >= 216) return;

    if (data.categoryList) {
      if (num) {
        setSelectCheckbox(num);
      } else if (selectCheckbox) {
        setSelectCheckbox(selectCheckbox);
      } else {
        setSelectCheckbox(null);
        setData((prev) => ({
          ...prev,
          allProducts: { products: [] },
        }));
      }
    }

    let url;
    if (
      selectCheckbox &&
      data.categoryList &&
      data.categoryList[selectCheckbox - 1]
    ) {
      url = `${URL}/products/category/${data.categoryList[selectCheckbox - 1]}`;
    } else {
      url = `${URL}/products?limit=36&skip=${skip}`;
    }

    setLoader(true);
    axios
      .get(url)
      .then((res) => {
        if (isMounted && res?.data) {
          setData((prev) => ({
            ...prev,
            allProducts: {
              ...res.data,
              products: selectCheckbox
                ? res.data.products
                : [...prev.allProducts.products, ...res.data.products],
            },
          }));
        }
      })
      .catch((e) => {
        console.log(`Error :: ${e} :: ALL Products`);
      })
      .finally(() => setLoader(false));

    return () => {
      isMounted = false;
    };
  }, [fetchCounter, selectCheckbox, data.categoryList, num, URL]);

  const handleCheckbox = (index) => {
    if (selectCheckbox === index) {
      navigate(location.pathname, {
        state: { ...location.state, num: null },
        replace: true,
      });
      setSelectCheckbox(null);
      setData((prev) => ({
        ...prev,
        allProducts: { products: [] },
      }));
    } else {
      navigate(location.pathname, {
        state: { ...location.state, num: null },
        replace: true,
      });
      setSelectCheckbox(index);
    }
  };

  useEffect(() => {
    if (!num) {
      handleCheckbox();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div
            className="bg-no-repeat bg-cover h-36 flex items-center"
            style={{ backgroundImage: `url(${productsBgImg})` }}
          >
            <div className="sm:container sm:mx-auto flex items-center">
              <Link to={'/'} className="text-base font-medium text-black pr-4">
                Home
              </Link>
              <div className="text-base font-medium text-[#BB0100] pl-4 border-l-2 border-[#BB0100]">
                All Products
              </div>
            </div>
          </div>
          <div className="sm:container sm:mx-auto flex py-6">
            <div className="w-1/4">
              <div className="brand-section mb-2">
                <h2 className="text-xl font-medium text-[#282627] mb-2 underline underline-offset-4">
                  Product Brand
                </h2>
                <ul className="h-56 overflow-y-auto brand-filter">
                  {data?.categoryList &&
                    data.categoryList.map((item, index) => (
                      <li key={index} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          name="checkbox"
                          id={`filter-products-${index + 1}`}
                          checked={selectCheckbox === index + 1}
                          onChange={() => handleCheckbox(index + 1)}
                          className="h-4 w-4 accent-[#BB0100] cursor-pointer"
                        />
                        <label
                          htmlFor={`filter-products-${index + 1}`}
                          className="text-base font-medium text-[#7F7F7F] cursor-pointer pl-1"
                        >
                          {item}
                        </label>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="discount-section mb-2">
                <h2 className="text-xl font-medium text-[#282627] mb-2 underline underline-offset-4">
                  Discount Offer
                </h2>
                <ul className="discount-filter">
                  <li className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="checkbox"
                      id="filter-discount-0"
                      className="h-4 w-4 accent-[#BB0100] cursor-pointer"
                    />
                    <label
                      htmlFor="filter-discount-0"
                      className="text-base font-medium text-[#7F7F7F] cursor-pointer pl-1"
                    >
                      20% Cashback
                    </label>
                  </li>
                  <li className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="checkbox"
                      id="filter-discount-1"
                      className="h-4 w-4 accent-[#BB0100] cursor-pointer"
                    />
                    <label
                      htmlFor="filter-discount-1"
                      className="text-base font-medium text-[#7F7F7F] cursor-pointer pl-1"
                    >
                      5% Cashback Offer
                    </label>
                  </li>
                  <li className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="checkbox"
                      id="filter-discount-2"
                      className="h-4 w-4 accent-[#BB0100] cursor-pointer"
                    />
                    <label
                      htmlFor="filter-discount-0"
                      className="text-base font-medium text-[#7F7F7F] cursor-pointer pl-1"
                    >
                      20% Cashback
                    </label>
                  </li>
                </ul>
              </div>
              <div className="rating-section mb-2">
                <h2 className="text-xl font-medium text-[#282627] mb-2 underline underline-offset-4">
                  Rating Item
                </h2>
                <ul className="rating-filter">
                  <li className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="checkbox"
                      id="filter-rating-0"
                      className="h-4 w-4 accent-[#BB0100] cursor-pointer"
                    />
                    <label
                      htmlFor="filter-rating-0"
                      className="text-base font-medium text-yellow-500 cursor-pointer pl-1"
                    >
                      {'★'.repeat(5)}
                    </label>
                  </li>
                  <li className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="checkbox"
                      id="filter-rating-1"
                      className="h-4 w-4 accent-[#BB0100] cursor-pointer"
                    />
                    <label
                      htmlFor="filter-rating-1"
                      className="text-base font-medium text-yellow-500 cursor-pointer pl-1"
                    >
                      {'★'.repeat(4)}
                      {'☆'.repeat(1)}
                    </label>
                  </li>
                  <li className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="checkbox"
                      id="filter-rating-2"
                      className="h-4 w-4 accent-[#BB0100] cursor-pointer"
                    />
                    <label
                      htmlFor="filter-rating-2"
                      className="text-base font-medium text-yellow-500 cursor-pointer pl-1"
                    >
                      {'★'.repeat(3)}
                      {'☆'.repeat(2)}
                    </label>
                  </li>
                  <li className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="checkbox"
                      id="filter-rating-3"
                      className="h-4 w-4 accent-[#BB0100] cursor-pointer"
                    />
                    <label
                      htmlFor="filter-rating-3"
                      className="text-base font-medium text-yellow-500 cursor-pointer pl-1"
                    >
                      {'★'.repeat(2)}
                      {'☆'.repeat(3)}
                    </label>
                  </li>
                  <li className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="checkbox"
                      id="filter-rating-4"
                      className="h-4 w-4 accent-[#BB0100] cursor-pointer"
                    />
                    <label
                      htmlFor="filter-rating-4"
                      className="text-base font-medium text-yellow-500 cursor-pointer pl-1"
                    >
                      {'★'.repeat(1)}
                      {'☆'.repeat(4)}
                    </label>
                  </li>
                </ul>
              </div>
              <div className="price-section">
                <h2 className="text-xl font-medium text-[#282627] mb-2 underline underline-offset-4">
                  Price Filter
                </h2>
                <ul className="price-filter">
                  <li className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="checkbox"
                      id="filter-price-0"
                      className="h-4 w-4 accent-[#BB0100] cursor-pointer"
                    />
                    <label
                      htmlFor="filter-price-0"
                      className="text-base font-medium text-[#7F7F7F] cursor-pointer pl-1"
                    >
                      ₹0.00 - ₹150.00
                    </label>
                  </li>
                  <li className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="checkbox"
                      id="filter-price-1"
                      className="h-4 w-4 accent-[#BB0100] cursor-pointer"
                    />
                    <label
                      htmlFor="filter-price-1"
                      className="text-base font-medium text-[#7F7F7F] cursor-pointer pl-1"
                    >
                      ₹150.00 - ₹500.00
                    </label>
                  </li>
                  <li className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="checkbox"
                      id="filter-price-2"
                      className="h-4 w-4 accent-[#BB0100] cursor-pointer"
                    />
                    <label
                      htmlFor="filter-price-0"
                      className="text-base font-medium text-[#7F7F7F] cursor-pointer pl-1"
                    >
                      ₹500.00 - ₹1000.00
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full relative pb-40">
              <div className="flex justify-between flex-wrap gap-10">
                {data?.allProducts?.products && (
                  <PaginatedItems
                    itemsPerPage={12}
                    items={data.allProducts}
                    loadMoreData={{ fetchCounter, setFetchCounter }}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                  >
                    {(item) => (
                      <div className="w-[max-content]" key={item.id}>
                        <div className="bg-[#f6f6f6] p-4 shadow">
                          <Link
                            to={`${item.title
                              .replace(/\s+/g, '-')
                              .toLowerCase()}`}
                            state={{ data: item }}
                          >
                            <Image
                              src={item.images[0]}
                              alt={item['title']}
                              className="w-48 h-48"
                            />
                          </Link>
                        </div>
                        <h2 className="text-base font-medium text-[#4F4F4F] w-48 overflow-hidden whitespace-nowrap text-ellipsis">
                          {item['title']}
                        </h2>
                        <p className="text-base font-medium text-[#282627] ">
                          &#8377; {item['price']}{' '}
                          <span className="ml-2 text-[#E91B1A] line-through">
                            &#8377;
                            {(
                              item['price'] +
                              item['price'] * (item['discountPercentage'] / 10)
                            ).toFixed(2)}
                          </span>
                        </p>
                      </div>
                    )}
                  </PaginatedItems>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AllProducts;
