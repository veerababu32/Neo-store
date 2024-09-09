import { Link } from 'react-router-dom';
import { gmail, fb, insta, twitter } from '../../assets/index';

function Footer() {
  const handleDefault = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="relative overflow-hidden py-10 bg-[#111111]">
        <div className="sm:container sm:mx-auto flex flex-wrap">
          <div className="w-full md:w-1/2 lg:w-4/12">
            <div className="flex h-full flex-col justify-between">
              <h1 className="font-bold text-3xl text-[#BB0100]">NeoSTORE</h1>
              <form
                className="h-12 w-80 rounded bg-white my-6 flex items-center gap-1 p-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <img src={gmail} alt="mail" />
                <input
                  type="text"
                  placeholder="Your email address"
                  className="outline-none text-[#BB0100] pl placeholder-[#BB0100] text-sm font-medium"
                />
                <div className="bg-[#BB0100] rounded w-24 h-9 flex items-center justify-center">
                  <button type="submit" className="text-white">
                    Subscribe
                  </button>
                </div>
              </form>
              <div className="text-white mb-4">
                <h4 className="text-sm font-light mb-2">Contact Info</h4>
                <div className="text-sm">
                  <Link onClick={handleDefault} className="hover:underline">
                    +91 12345 67890{' '}
                  </Link>{' '}
                  |{' '}
                  <Link onClick={handleDefault} className="hover:underline">
                    {' '}
                    +91 12345 67890
                  </Link>
                </div>
                <p className="text-sm">
                  17 Princess Road, London, Greater London NW1 8JR, UK
                </p>
              </div>
              <div className="flex gap-2">
                <div className="bg-[#7F7F7F] p-2 rounded-full flex justify-center items-center">
                  <Link onClick={handleDefault}>
                    <img src={fb} alt="fb" className="w-3 h-3" />
                  </Link>
                </div>
                <div className="bg-[#7F7F7F] p-2 rounded-full flex justify-center items-center">
                  <Link onClick={handleDefault}>
                    <img src={insta} alt="insta" className="w-3 h-3" />
                  </Link>
                </div>
                <div className="bg-[#7F7F7F] p-2 rounded-full flex justify-center items-center">
                  <Link onClick={handleDefault}>
                    <img src={twitter} alt="twitter" className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-2/12">
            <div className="h-full text-white">
              <h3 className="mb-4 text-sm font-bold uppercase">Categories</h3>
              <ul>
                <li className="mb-2">
                  <Link onClick={handleDefault} className="text-xs font-light">
                    Popular
                  </Link>
                </li>
                <li className="mb-2">
                  <Link onClick={handleDefault} className="text-xs font-light">
                    Chair
                  </Link>
                </li>
                <li className="mb-2">
                  <Link onClick={handleDefault} className="text-xs font-light">
                    Table
                  </Link>
                </li>
                <li className="mb-2">
                  <Link onClick={handleDefault} className="text-xs font-light">
                    Sofa
                  </Link>
                </li>
                <li className="mb-2">
                  <Link onClick={handleDefault} className="text-xs font-light">
                    Cupboard
                  </Link>
                </li>
                <li>
                  <Link onClick={handleDefault} className="text-xs font-light">
                    Lamp
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-2/12">
            <div className="h-full text-white">
              <h3 className="mb-4 text-sm font-bold uppercase">
                Customer Service
              </h3>
              <ul>
                <li className="mb-2">
                  <Link onClick={handleDefault} className=" text-xs font-light">
                    My Account
                  </Link>
                </li>
                <li className="mb-2">
                  <Link onClick={handleDefault} className=" text-xs font-light">
                    Discount
                  </Link>
                </li>
                <li className="mb-2">
                  <Link onClick={handleDefault} className=" text-xs font-light">
                    Returns
                  </Link>
                </li>
                <li className="mb-2">
                  <Link onClick={handleDefault} className=" text-xs font-light">
                    Orders History
                  </Link>
                </li>
                <li>
                  <Link onClick={handleDefault} className=" text-xs font-light">
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-2/12">
            <div className="h-full text-white">
              <h3 className="mb-4 text-sm font-bold uppercase">Furniture</h3>
              <ul>
                <li className="mb-2">
                  <Link onClick={handleDefault} className=" text-xs font-light">
                    Living Room Furniture
                  </Link>
                </li>
                <li className="mb-2">
                  <Link onClick={handleDefault} className=" text-xs font-light">
                    Bar Furniture
                  </Link>
                </li>
                <li className="mb-2">
                  <Link onClick={handleDefault} className=" text-xs font-light">
                    Bedroom Furniture
                  </Link>
                </li>
                <li className="mb-2">
                  <Link onClick={handleDefault} className=" text-xs font-light">
                    Kids Furniture
                  </Link>
                </li>
                <li className="mb-2">
                  <Link onClick={handleDefault} className=" text-xs font-light">
                    Accent Furniture
                  </Link>
                </li>
                <li>
                  <Link onClick={handleDefault} className=" text-xs font-light">
                    Book Shelves
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-2/12">
            <div className="h-full text-white">
              <h3 className="mb-4 text-sm font-bold uppercase">Useful Links</h3>
              <ul>
                <li className="mb-2">
                  <Link onClick={handleDefault} className=" text-xs font-light">
                    Promotions
                  </Link>
                </li>
                <li>
                  <Link onClick={handleDefault} className=" text-xs font-light">
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-[#BB0100]">
        <div className="text-white h-14 flex justify-center items-center gap-1 font-bold sm:text-base text-sm sm:container sm:mx-auto">
          &copy;NeoSTORE - All Rights Reserved
        </div>
      </div>
    </>
  );
}

export default Footer;
