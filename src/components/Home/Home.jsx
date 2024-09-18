import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Loader, ReactSlider } from '../index';
import {
  arrowBtn,
  chair,
  cupboard,
  decor,
  decor1,
  lamp,
  lamps,
  popular,
  sofa,
  subscribe,
  table,
} from '../../assets';
import conf from '../../conf/conf';

function Home() {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const departArr = [
    { Icon: popular, label: 'Popular', to: 'all-products' },
    { Icon: chair, label: 'Chair', to: 'all-products', state: 7 },
    { Icon: table, label: 'Table', to: 'all-products', state: 8 },
    { Icon: sofa, label: 'Sofa', to: 'all-products', state: 9 },
    { Icon: cupboard, label: 'Cupboard', to: 'all-products', state: 10 },
    { Icon: lamp, label: 'Lamp', to: 'all-products', state: 11 },
  ];
  const URL = conf.reactAppBaseApi;

  useEffect(() => {
    const trendingProds = [
      'mens-shirts',
      'womens-dresses',
      'mens-shoes',
      'laptops',
      'tops',
    ];
    let randomNum = Math.floor(Math.random() * 5);

    setLoader(true);
    axios
      .all([
        axios.get(`${URL}/products/category/home-decoration`),
        axios.get(`${URL}/products/category/${trendingProds[randomNum]}`),
        axios.get(`${URL}/products/category/furniture`),
        axios.get(`${URL}/products?limit=6&skip=100`),
        axios.get(`${URL}/products/category/mens-watches`),
      ])
      .then(
        axios.spread(
          (homeDecors, trending, furniture, bestSellers, neostore) => {
            setData((prev) => ({
              ...prev,
              homeDecors: homeDecors.data,
              trending: trending.data,
              furniture: furniture.data,
              bestSellers: bestSellers.data,
              neostore: neostore.data,
            }));
          }
        )
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoader(false));
  }, [URL]);

  const bannerSettings = {
    responsive: [
      {
        breakpoint: 320,
        settings: {
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: true,
        },
      },
    ],
  };

  const neostoreSettings = {
    slidesToShow: 6,
    arrows: false,
    autoplay: false,
    responsive: [
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 6,
        },
      },
    ],
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="bg-[#faefe9] py-4 md:py-0 lg:py-0 xl:py-0 2xl:py-0 banner-section">
            <ReactSlider settings={bannerSettings}>
              {data?.homeDecors?.products &&
                data?.homeDecors?.products.map((item) => (
                  <div key={item.id}>
                    <div
                      className="bg-no-repeat bg-contain bg-right h-auto w-full md:h-[500px] lg:h-[500px] xl:h-[600px] 2xl:h-[600px]"
                      style={{
                        backgroundImage: `url(${item.images[0]})`,
                      }}
                    >
                      <div className="flex flex-col justify-center h-[inherit] gap-8 w-[max-content] pl-10 s:pl-4">
                        <h2 className="text-base font-normal pl-2 border-solid border-black border-l-2 uppercase md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl">
                          {item.category} <br /> 2024
                        </h2>
                        <h3 className="text-xl font-bold s:text-sm xs:text-sm sm:text-sm">
                          New Arrivals
                        </h3>
                        <h1 className="text-xl font-light w-80 s:w-20 xs:w-20 sm:w-20 md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-7xl">
                          Spring Collections
                        </h1>
                        <Link
                          className="bg-[#BB0100] text-white text-base py-2 px-6 w-[max-content] rounded-sm s:text-sm s:px-4 xs:text-sm xs:px-4 sm:text-sm sm:px-4"
                          to={`all-products/${item.title
                            .replace(/\s+/g, '-')
                            .toLowerCase()}`}
                          state={{ data: item }}
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </ReactSlider>
          </div>
          <div className="px-4 py-14 xl:container xl:mx-auto md:pt-20 xl:pt-28 xl:px-8 2xl:container 2xl:mx-auto 2xl:px-0 department-section">
            <h2 className="uppercase text-3xl font-bold text-[#282627] text-center s:text-xl xs:text-xl sm:text-xl">
              Shop By Department
            </h2>
            <p className="text-base font-medium text-[#7F7F7F] text-center s:text-sm xs:text-sm sm:text-sm">
              Site wide Discounts & Savings of up to 25%
            </p>
            <div className="py-2 text-center">
              <span className="inline-block w-36 border-t-2 border-solid border-black"></span>
            </div>
            <div className="flex flex-wrap justify-around items-center gap-4 mt-5 md:justify-center md:gap-12 lg:justify-center lg:gap-12 xl:h-52 xl:justify-center xl:gap-6 2xl:h-52 2xl:justify-center 2xl:gap-12">
              {departArr.map(({ Icon, label, to, state }, index) => (
                <Link
                  className="w-48 h-48 border border-[#BFBFBF] flex flex-col justify-center items-center hover:bg-[#bb0100] hover:h-full transition-all duration-100 text-[#7f7f7f] fill-[#7f7f7f] hover:fill-white hover:text-white s:w-32 s:h-32 xs:w-32 xs:h-32"
                  to={to}
                  state={{ num: state }}
                  key={index}
                >
                  <Icon />
                  <p className="text-xl font-medium">{label}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="px-4 pb-14 xl:container xl:mx-auto xl:px-8 2xl:container 2xl:mx-auto 2xl:px-0 trending-section">
            <h2 className="uppercase text-3xl font-bold text-[#282627] text-center s:text-xl xs:text-xl sm:text-xl">
              Trending
            </h2>
            <p className="text-base font-medium text-[#7F7F7F] text-center s:text-sm xs:text-sm sm:text-sm">
              Explore a wide range of affordable, well-designed and functional
              home furnishing solutions
            </p>
            <div className="py-2 text-center">
              <span className="inline-block w-36 border-t-2 border-solid border-black"></span>
            </div>
            <div className="flex flex-wrap justify-evenly mt-7 gap-8 s:flex-col s:items-center s:gap-4 xs:flex-col xs:items-center xs:gap-4">
              {data?.trending?.products &&
                data?.trending?.products.map((item) => (
                  <div className="w-[max-content]" key={item.id}>
                    <Link
                      className="inline-block bg-[#f6f6f6] p-4 shadow"
                      to={`all-products/${item.title
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
                    <h2 className="text-base font-medium text-[#4F4F4F] w-48 overflow-hidden whitespace-nowrap text-ellipsis">
                      {item['title']}
                    </h2>
                    <p className="text-base font-medium text-[#282627] ">
                      &#8377; {item['price']}
                    </p>
                  </div>
                ))}
            </div>
          </div>
          <div className="px-4 pb-14 xl:container xl:mx-auto xl:px-8 2xl:container 2xl:mx-auto 2xl:px-0 furniture-section">
            <h2 className="uppercase text-3xl font-bold text-[#282627] text-center s:text-xl xs:text-xl sm:text-xl">
              FURNITURE FOR EVERY BUDGET
            </h2>
            <p className="text-base font-medium text-[#7F7F7F] text-center s:text-sm xs:text-sm sm:text-sm">
              From glam vibes to laid-back comfort, these sofas all have one
              thing in common—and that’s amazing value.
            </p>
            <div className="py-2 text-center">
              <span className="inline-block w-36 border-t-2 border-solid border-black"></span>
            </div>
            <div className="flex flex-wrap justify-around gap-4 s:flex-col s:text-center s:items-center s:justify-normal xs:flex-col xs:text-center xs:items-center xs:justify-normal md:gap-10">
              {data?.furniture?.products.length > 0 &&
                data?.furniture?.products.slice(1).map((item) => (
                  <div className="w-[max-content] bg-[#EDEDED]" key={item.id}>
                    <div className="bg-[#f6f6f6] p-4 shadow flex items-center justify-center">
                      <Image
                        src={item.images[0]}
                        alt={item['title']}
                        className="w-72 h-60 s:w-60 xs:w-60 sm:w-60"
                      />
                    </div>
                    <div className="flex p-2 items-center justify-between">
                      <div>
                        <h2 className="text-xl font-medium text-[#4F4F4F] w-44 overflow-hidden whitespace-nowrap text-ellipsis s:w-36 s:text-base xs:text-base sm:text-base">
                          {item['title']}
                        </h2>
                        <p className="text-xl font-medium text-[#BB0100] s:text-base xs:text-base sm:text-base">
                          &#8377; {item['price']}
                        </p>
                      </div>
                      <div>
                        <Link
                          className="bg-[#BB0100] text-white py-2 px-4 w-[max-content] rounded-sm"
                          to={`all-products/${item.title
                            .replace(/\s+/g, '-')
                            .toLowerCase()}`}
                          state={{ data: item }}
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="px-4 pb-14 xl:container xl:mx-auto xl:px-8 2xl:container 2xl:mx-auto 2xl:px-0 bestsellers-section">
            <h2 className="uppercase text-3xl font-bold text-[#282627] text-center s:text-xl xs:text-xl sm:text-xl">
              Best Sellers
            </h2>
            <p className="text-base font-medium text-[#7F7F7F] text-center s:text-sm xs:text-sm sm:text-sm">
              Site wide Discounts & Savings of up to 25%
            </p>
            <div className="py-2 text-center">
              <span className="inline-block w-36 border-t-2 border-solid border-black"></span>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-7 sm:flex sm:flex-wrap sm:justify-center sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:flex 2xl:flex-wrap 2xl:justify-around">
              {data?.bestSellers?.products.length > 0 &&
                data?.bestSellers?.products.map((item) => (
                  <div
                    className="flex flex-col items-center md:items-start xl:flex-row xl:justify-between 2xl:flex-row 2xl:justify-normal"
                    key={item.id}
                  >
                    <div className="bg-[#f6f6f6] p-4 w-max md:w-fit">
                      <Image
                        src={item.images[0]}
                        alt={item['title']}
                        className="w-48 h-48"
                      />
                    </div>
                    <div className="flex flex-col py-2 px-4 md:p-2 md:py-6">
                      <div>
                        <h2 className="text-base font-medium text-[#282627] w-48 overflow-hidden whitespace-nowrap text-ellipsis">
                          {item['title']}
                        </h2>
                        <p className="text-base font-medium text-[#282627]">
                          <span className="text-[#BFBFBF] line-through">
                            &#8377;
                            {(
                              item['price'] +
                              item['price'] * (item['discountPercentage'] / 10)
                            ).toFixed(2)}
                          </span>
                          <span className="ml-2">
                            &#8377;{item['price'].toFixed(2)}
                          </span>
                        </p>
                      </div>
                      <div className="mt-4">
                        <Link
                          className="inline-block bg-[#BB0100] text-white py-2 px-4 w-[max-content] rounded-sm"
                          to={`all-products/${item['title']
                            .replace(/\s+/g, '-')
                            .toLowerCase()}`}
                          state={{ data: item }}
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex text-white pb-14 s:flex-col xs:flex-col sm:flex-col xl:container xl:mx-auto xl:px-8 2xl:container 2xl:mx-auto 2xl:px-0 newArrivals-section">
            <div
              className="bg-no-repeat bg-cover bg-right h-[200px] w-full flex flex-col justify-center items-center pl-4 s:items-start xs:items-start sm:items-start md:h-[480px] md:w-1/4 md:pl-0 lg:h-[480px] lg:w-1/4 lg:pl-0 xl:h-[480px] xl:w-1/4 xl:pl-0 2xl:h-[480px] 2xl:w-1/4 2xl:pl-0"
              style={{ backgroundImage: `url(${lamps})` }}
            >
              <h2 className="text-xs font-medium uppercase">New Arrivals</h2>
              <p className="text-xl font-medium pb-4">Sofa Style 2021</p>
              <Link
                className="text-sm font-medium underline"
                to={'all-products'}
                state={{ num: undefined }}
              >
                shop now
              </Link>
            </div>
            <div
              className="bg-no-repeat bg-cover bg-center h-[200px] w-full flex flex-col justify-center items-center md:h-[480px] md:w-1/2 lg:h-[480px] lg:w-1/2 xl:h-[480px] xl:w-1/2 2xl:h-[480px] 2xl:w-1/2"
              style={{ backgroundImage: `url(${decor})` }}
            >
              <h2 className="text-xs font-medium uppercase">New Arrivals</h2>
              <p className="text-xl font-medium pb-4">
                Perfect fit for your home
              </p>
              <Link
                className="text-sm font-medium underline"
                to={'all-products'}
                state={{ num: undefined }}
              >
                shop now
              </Link>
            </div>
            <div
              className="bg-no-repeat bg-cover bg-right h-[200px] w-full flex flex-col justify-center items-center pr-4 s:items-end xs:items-start sm:items-start md:h-[480px] md:w-1/4 md:pr-0 lg:h-[480px] lg:w-1/4 lg:pr-0 xl:h-[480px] xl:w-1/4 xl:pr-0 2xl:h-[480px] 2xl:w-1/4 2xl:pr-0"
              style={{
                backgroundImage: `url(${decor1})`,
              }}
            >
              <h2 className="text-xs font-medium uppercase">New Arrivals</h2>
              <p className="text-xl font-medium pb-4">New Collection</p>
              <Link
                className="text-sm font-medium underline"
                to={'all-products'}
                state={{ num: undefined }}
              >
                shop now
              </Link>
            </div>
          </div>
          <div className="px-4 pb-14 xl:container xl:mx-auto xl:px-8 2xl:container 2xl:mx-auto 2xl:px-0 blog-section">
            <h2 className="uppercase text-3xl font-bold text-[#282627] text-center s:text-xl xs:text-xl sm:text-xl">
              From Our Blog
            </h2>
            <p className="text-base font-medium text-[#7F7F7F] text-center s:text-sm xs:text-sm sm:text-sm">
              See how our customers have styled products in their home
            </p>
            <div className="py-2 text-center">
              <span className="inline-block w-36 border-t-2 border-solid border-black"></span>
            </div>
            {/* <div className="mt-7 flex flex-col items-center md:flex-row md:items-start md:justify-between gap-4 md:overflow-x-scroll md:w-[736px] lg:w-[992px] xl:overflow-visible xl:w-full"></div> */}
            <div className="flex flex-wrap justify-center mt-7 gap-4 xl:justify-around 2xl:justify-around">
              {data?.furniture?.products.length > 0 &&
                data?.furniture?.products.map((item) => (
                  <div
                    className="w-[max-content] h-full flex flex-col"
                    key={item.id}
                  >
                    <div className="bg-[#f6f6f6] p-4">
                      <Image
                        src={item.images[2]}
                        alt={item['title']}
                        className="h-40 md:w-48 lg:w-48 xl:w-52 2xl:w-52"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-between text-center p-4 border flex-grow">
                      <div>
                        <h3 className="text-xs font-medium text-[#BB0100] pb-4 uppercase">
                          {item.category}
                        </h3>
                        <h2 className="text-xl font-medium text-[#282627] pb-4 w-48">
                          {item.title}
                        </h2>
                      </div>
                      <Link
                        className="underline"
                        to={`all-products/${item.title
                          .replace(/\s+/g, '-')
                          .toLowerCase()}`}
                        state={{ data: item }}
                      >
                        Know More
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="neostore-section">
            <h2 className="uppercase text-3xl font-bold text-[#282627] text-center s:text-xl xs:text-xl sm:text-xl">
              #NEOSTORE
            </h2>
            <p className="text-base font-medium text-[#7F7F7F] text-center s:text-sm xs:text-sm sm:text-sm">
              Use #neostore on your post for a chance to be featured!
            </p>
            <div className="py-2 text-center">
              <span className="inline-block w-36 border-t-2 border-solid border-black"></span>
            </div>
            <div className="mt-7 flex">
              <ReactSlider settings={neostoreSettings}>
                {data?.neostore?.products.length > 0 &&
                  data?.neostore?.products.map((item) => (
                    <Link
                      className="inline-block p-4 bg-[#f6f6f6] hover:bg-[#00000032] cursor-crosshair border"
                      to={`/all-products/${item.title
                        .replace(/\s+/g, '-')
                        .toLowerCase()}`}
                      state={{ data: item }}
                      key={item.id}
                    >
                      <Image
                        src={item.images[0]}
                        alt={item['title']}
                        className="w-30 h-30 xl:w-48 xl:h-48 2xl:w-48 2xl:h-48"
                      />
                    </Link>
                  ))}
              </ReactSlider>
            </div>
          </div>
          <div
            className="bg-repeat-round bg-cover flex flex-col justify-center items-center h-[200px] md:bg-no-repeat xl:h-[340px] 2xl:container 2xl:mx-auto subscribe-section"
            style={{
              backgroundImage: `url(${subscribe})`,
            }}
          >
            <h2 className="uppercase text-3xl font-bold text-[#282627] text-center s:text-xl xs:text-xl sm:text-xl">
              SIGN UP FOR NEWS & OFFERS!
            </h2>
            <p className="text-base font-medium text-[#7F7F7F] text-center pb-6 s:text-sm xs:text-sm sm:text-sm">
              Subscribe to the weekly newsletter for all the latest updates
            </p>
            <div className="relative py-2 inline-block">
              <input
                type="text"
                name="offersMail"
                className="outline-none md:w-96 text-xl font-light text-[#7f7f7f] bg-transparent border-black border-b-2"
                placeholder="Enter your email"
              />
              <button className="absolute right-0">
                <img src={arrowBtn} alt="arrow btn" />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;
