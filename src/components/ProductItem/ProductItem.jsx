import { Link, useLocation, useNavigate } from 'react-router-dom';
import { arrowL, arrowR, Heart, productsBgImg } from '../../assets';
import { useEffect, useState } from 'react';
import AlsoLike from '../AlsoLike/AlsoLike';
import Image from '../Image';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  addToWishlist,
  removeWishItem,
} from '../../feature/cart/cartSlice';
import { toast, ToastContainer } from 'react-toastify';

function ProductItem() {
  const wishlistItems = useSelector((state) => state.cart.wishlistItems);
  const [activeTab, setActiveTab] = useState(1);
  const [selectedImg, setSelectedImg] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  if (!location.state) {
    navigate('/all-products');
  }

  const { data } = location.state;

  useEffect(() => {
    document.querySelector('#product-items').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [data]);

  function toggleImg(i) {
    setSelectedImg(i);
  }

  function handleTabClick(tabIndex) {
    setActiveTab(tabIndex);
  }

  const handleATC = (data) => {
    toast.success('Item added to cart');
    dispatch(
      addToCart({
        id: data.id,
        title: data.title,
        price: data.price,
        image: data.images[0],
        category: data.category,
        quantity: 1,
        discount: data.discountPercentage,
      })
    );
  };

  const handleATW = (data) => {
    const wishItem = wishlistItems.find((item) => item.id === data.id);
    if (wishItem) {
      toast.info('Item removed from wishlist');
      dispatch(removeWishItem(data.id));
    } else {
      toast.success('Item added to wishlist');
      dispatch(
        addToWishlist({
          id: data.id,
          title: data.title,
          price: data.price,
          image: data.images[0],
          category: data.category,
          quantity: 1,
          discount: data.discountPercentage,
        })
      );
    }
  };

  return (
    <div id="product-items">
      <ToastContainer />
      <div
        className="bg-no-repeat bg-cover h-24 flex items-center md:h-28 lg:h-36 xl:h-36 2xl:h-36"
        style={{ backgroundImage: `url(${productsBgImg})` }}
      >
        <div className="flex items-center px-4 lg:container lg:mx-auto lg:px-4 xl:container xl:mx-auto xl:px-8 2xl:container 2xl:mx-auto 2xl:px-0">
          <Link
            to={'/'}
            className="text-base font-medium text-black pr-4 s:text-xs xs:text-xs sm:text-xs"
          >
            Home
          </Link>
          <Link
            to={'/all-products'}
            state={{ num: undefined }}
            className="text-base font-medium text-[#BB0100] px-4 border-l-2 border-[#BB0100] s:text-xs xs:text-xs sm:text-xs"
          >
            All Products
          </Link>
          <span className="text-base font-medium text-[#BB0100] pl-4 border-l-2 border-[#BB0100] s:text-xs xs:text-xs sm:text-xs">
            {data.title}
          </span>
        </div>
      </div>
      <div className="px-4 py-6 lg:pb-14 lg:container lg:mx-auto lg:px-4 xl:pb-14 xl:container xl:mx-auto xl:px-8 2xl:pb-14 2xl:container 2xl:mx-auto 2xl:px-0">
        <div className="flex mb-4 s:flex-col xs:flex-col sm:flex-col lg:justify-center lg:mb-20 xl:justify-center xl:mb-20 2xl:justify-center 2xl:mb-20">
          <div className="flex flex-col-reverse items-center gap-4 mb-6 lg:flex-row xl:flex-row 2xl:flex-row">
            {data?.images?.length > 1 && (
              <div className="flex flex-col justify-center items-baseline overflow-x-scroll w-[288px] md:w-[400px] md:items-center lg:w-auto lg:overflow-hidden lg:h-[400px] lg:items-center xl:w-auto xl:overflow-hidden xl:h-[500px] xl:items-center 2xl:w-auto 2xl:overflow-hidden 2xl:h-[500px] 2xl:items-center">
                <div
                  className={`hidden w-6 h-6 ${
                    selectedImg === 0
                      ? 'cursor-not-allowed opacity-5'
                      : 'cursor-pointer'
                  } lg:inline-block xl:inline-block 2xl:inline-block`}
                  onClick={
                    selectedImg > 0
                      ? () => {
                          toggleImg(selectedImg - 1);
                          if (selectedImg === 1 && data.images.length > 3) {
                            document.querySelector(`#image-0`)?.scrollIntoView({
                              behavior: 'smooth',
                              block: 'center',
                            });
                          }
                        }
                      : null
                  }
                >
                  <img
                    src={arrowL}
                    alt="prev arrow"
                    className="w-auto h-auto rotate-90"
                  />
                </div>
                <div
                  className={`flex duration-200 gap-2 mini-imgs-con lg:flex-col lg:gap-0 xl:flex-col xl:gap-0 2xl:flex-col 2xl:gap-0`}
                >
                  {data.images.map((item, index) => (
                    <div
                      id={`image-${index}`}
                      className={`h-20 w-20${
                        data.images.length === index + 1
                          ? ''
                          : ' lg:mb-2 xl:mb-2 2xl:mb-2'
                      } lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-36 2xl:h-36`}
                      onClick={() => {
                        toggleImg(index);
                      }}
                      key={index}
                    >
                      <img
                        src={item}
                        alt={`Images-${index}`}
                        className={`w-20 h-20 border cursor-pointer ${
                          data.images[selectedImg] === item
                            ? 'shadow-lg border-black'
                            : ''
                        } lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-36 2xl:h-36`}
                        data-img={index}
                      />
                    </div>
                  ))}
                </div>
                <div
                  className={`hidden w-6 h-6 ${
                    selectedImg >= data.images.length - 1
                      ? 'cursor-not-allowed opacity-5'
                      : 'cursor-pointer'
                  } lg:inline-block xl:inline-block 2xl:inline-block`}
                  onClick={
                    selectedImg >= data.images.length - 1
                      ? null
                      : () => {
                          toggleImg(selectedImg + 1);
                          if (
                            selectedImg === data.images.length - 2 &&
                            data.images.length > 3
                          ) {
                            document
                              .querySelector(`#image-${data.images.length - 1}`)
                              ?.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center',
                              });
                          }
                        }
                  }
                >
                  <img
                    src={arrowR}
                    alt="next arrow"
                    className="w-auto h-auto rotate-90"
                  />
                </div>
              </div>
            )}
            <Image
              src={data.images[selectedImg]}
              alt={data.title}
              className="border border-[#BFBFBF] w-[400px] h-[200px] s:w-[200px] xs:w-[200px] sm:w-[200px] md:h-[400px] lg:h-[400px] xl:h-[500px] 2xl:h-[500px]"
            />
          </div>
          <div className="md:pl-4 lg:pl-4 xl:pl-10 2xl:pl-10">
            <h2 className="text-sm font-bold text-[#282627] py-2 s:py-1 xs:py-1 sm:py-1 lg:text-xl lg:pb-4 xl:text-xl xl:pb-4 2xl:text-xl 2xl:pb-4">
              {data.title}
            </h2>
            <p className="text-base font-bold text-[#111111] pb-2 s:pb-1 xs:pb-1 sm:pb-1 lg:text-3xl xl:text-3xl 2xl:text-3xl">
              &#8377;{data.price}
            </p>
            <p className="text-xs font-normal text-[#7F7F7F] pb-2 s:pb-1 xs:pb-1 sm:pb-1">
              Price incl. of all taxes
            </p>
            <div className="text-base text-yellow-500 pb-2 s:pb-1 xs:pb-1 sm:pb-1">
              {'★'.repeat(Math.floor(data.rating))}
              {'☆'.repeat(5 - Math.floor(data.rating))}
            </div>
            <p className="text-xs font-normal text-[#7F7F7F] pb-2 s:pb-1 xs:pb-1 sm:pb-1">
              Brand: {data.brand}
            </p>
            <p className="text-xs font-normal text-[#7F7F7F] pb-2 s:pb-1 xs:pb-1 sm:pb-1">
              In Stock {data.stock} Items
            </p>
            <p className="text-xs font-normal text-[#111111] pb-2 text-justify w-auto s:pb-1 xs:pb-1 sm:pb-1 xl:w-[500px] 2xl:w-[500px]">
              {data.description}
            </p>
            <p className="border-b border-[#BFBFBF] my-4 w-[200px] xl:w-[420px] 2xl:w-[420px]"></p>
            <div className="flex justify-between items-center sm:w-fit sm:gap-4 md:flex-col md:items-baseline md:gap-4 lg:flex-col lg:items-baseline lg:gap-4 xl:flex-col xl:items-baseline xl:gap-4 2xl:flex-col 2xl:items-baseline 2xl:gap-4">
              <button
                className="w-40 bg-[#BB0100] text-base font-medium text-white py-2 rounded-sm lg:w-60 xl:w-60 2xl:w-60"
                onClick={() => handleATC(data)}
              >
                Add To Cart
              </button>
              <div>
                <p
                  className="flex items-center gap-1 w-fit text-sm font-medium text-[#E91B1A] cursor-pointer s:text-xs xs:text-xs sm:text-xs"
                  onClick={() => handleATW(data)}
                >
                  <span
                    className={`h-6 w-6${
                      wishlistItems.length > 0 &&
                      wishlistItems.find((wishItem) => wishItem.id === data.id)
                        ? ' fill-[#E91B1A]'
                        : ' fill-white'
                    }`}
                  >
                    <Heart />
                  </span>
                  Add to Wishlist
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <ul className="flex gap-2 border-b border-[#BFBFBF] justify-center s:gap-1 xs:gap-1 sm:gap-1">
            <li
              className={`text-xs font-medium cursor-pointer pb-1 px-1 ${
                activeTab === 1
                  ? 'text-black border-b border-black'
                  : 'text-[#7F7F7F]'
              } md:text-base md:pb-3 md:px-3 lg:text-lg lg:pb-3 lg:px-3 xl:text-lg xl:pb-3 xl:px-3 2xl:text-lg 2xl:pb-3 2xl:px-3`}
              onClick={() => handleTabClick(1)}
            >
              Description
            </li>
            <li
              className={`text-xs font-medium cursor-pointer pb-1 px-1 ${
                activeTab === 2
                  ? 'text-black border-b border-black'
                  : 'text-[#7F7F7F]'
              } md:text-base md:pb-3 md:px-3 lg:text-lg lg:pb-3 lg:px-3 xl:text-lg xl:pb-3 xl:px-3 2xl:text-lg 2xl:pb-3 2xl:px-3`}
              onClick={() => handleTabClick(2)}
            >
              Additional Information
            </li>
            <li
              className={`text-xs font-medium cursor-pointer pb-1 px-1 ${
                activeTab === 3
                  ? 'text-black border-b border-black'
                  : 'text-[#7F7F7F]'
              } md:text-base md:pb-3 md:px-3 lg:text-lg lg:pb-3 lg:px-3 xl:text-lg xl:pb-3 xl:px-3 2xl:text-lg 2xl:pb-3 2xl:px-3`}
              onClick={() => handleTabClick(3)}
            >
              Reviews ({data.reviews.length})
            </li>
          </ul>
          <div className="pt-8 px-6 pb-4 s:p-2 xs:p-2 sm:p-2">
            {activeTab === 1 && (
              <div
                id="tab-1"
                className="text-base text-center font-normal text-[#11111] s:text-xs s:text-justify xs:text-xs xs:text-justify sm:text-xs sm:text-justify"
              >
                {data.description}
              </div>
            )}
            {activeTab === 2 && (
              <div
                id="tab-2"
                className="text-base text-center font-normal text-[#11111] s:text-xs s:text-justify xs:text-xs xs:text-justify sm:text-xs sm:text-justify"
              >
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus dignissimos rerum quidem ullam reiciendis a aperiam
                officia vitae molestiae. Itaque mollitia voluptatem cupiditate
                dolorem excepturi obcaecati accusantium, cum tempore voluptatum!
                Laudantium eaque eligendi soluta numquam, at cumque perspiciatis
                repellat alias eos praesentium iste tempora fuga illo dolores
                illum? Ea ut quae nulla tenetur mollitia dolorum laboriosam
                veritatis, hic molestiae rem.
              </div>
            )}
            {activeTab === 3 && (
              <div
                id="tab-3"
                className="text-base font-normal text-[#11111] s:text-xs xs:text-xs sm:text-xs"
              >
                {data?.reviews?.length > 0 &&
                  data.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="p-4 mb-4 border rounded-lg shadow-md s:p-2 s:mb-2 xs:p-2 xs:mb-2 sm:p-2 sm:mb-2"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold">{review.reviewerName}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mb-2">
                        <span className="text-yellow-500">
                          {'★'.repeat(Math.floor(data.rating))}
                          {'☆'.repeat(5 - Math.floor(data.rating))}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <AlsoLike page={true} />
      </div>
    </div>
  );
}

export default ProductItem;
