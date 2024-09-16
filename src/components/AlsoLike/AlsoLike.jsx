import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from '../Image';
import { Link, useLocation } from 'react-router-dom';
import conf from '../../conf/conf';

function AlsoLike({ page }) {
  const [data, setData] = useState();
  const location = useLocation();
  const URL = conf.reactAppBaseApi;

  useEffect(() => {
    axios
      .get(`${URL}/products/category/motorcycle`)
      .then((res) => {
        if (res?.data?.products) {
          setData(res.data);
        }
      })
      .catch((e) => {
        console.log('In Also Like :: ', e);
      });
  }, [URL]);

  return (
    <div className="lg:container lg:mx-auto alsoLike-section">
      <h2 className="uppercase text-xl md:text-3xl font-bold text-[#282627] text-center">
        You might also like
      </h2>
      <p className="text-sm md:text-base font-medium text-[#7F7F7F] text-center">
        From glam vibes to laid-back comfort, these sofas all have one thing in
        common—and that’s amazing value.
      </p>
      <div className="py-2 text-center">
        <span className="inline-block w-36 border-t-2 border-solid border-black"></span>
      </div>
      <div className="mt-7 flex flex-col items-center gap-4 md:items-start md:flex-row md:flex-wrap md:justify-center lg:justify-between">
        {data?.products &&
          data.products.map((item) => (
            <div className="w-[max-content]" key={item.id}>
              <Link
                className="inline-block"
                to={`${
                  page
                    ? location.pathname.split('/').slice(0, -1).join('/')
                    : '/all-products'
                }/${item.title.replace(/\s+/g, '-').toLowerCase()}`}
                state={{ data: item }}
              >
                <Image
                  src={item.images[0]}
                  alt={item['title']}
                  className="bg-[#f6f6f6] p-4 shadow w-48 h-48"
                />
              </Link>
              <h2 className="text-base font-medium text-[#4F4F4F] w-44 overflow-hidden whitespace-nowrap text-ellipsis">
                {item['title']}
              </h2>
              <p className="text-base font-medium text-[#282627] ">
                &#8377; {item['price']}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AlsoLike;
