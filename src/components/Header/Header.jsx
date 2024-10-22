import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../feature/auth/authSlice';
import { account, cart, Logout, wishlist } from '../../assets';
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Spiral as Hamburger } from 'hamburger-react';
import { useState } from 'react';
import { toggleMenuBar } from '../../feature/home/homeSlice';

function Header() {
  const navItems = [
    {
      name: 'Home',
      to: '/',
    },
    {
      name: 'All Products',
      to: 'all-products',
      state: false,
    },
    {
      name: 'Furniture',
      to: 'all-products',
      state: 3,
    },
    {
      name: 'Home Decor',
      to: 'all-products',
      state: 5,
    },
    {
      name: 'More',
      to: 'all-products',
      state: false,
    },
  ];

  const [toggleMenu, setToggleMenu] = useState(false);
  const ItemsInCart = useSelector((state) => state.cart.bagCount);
  const name = JSON.parse(sessionStorage.getItem('userData'));
  const dispatch = useDispatch();

  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
    dispatch(toggleMenuBar());
  };

  return (
    <section className="bg-white">
      <div className={`offcanvasSidebar${toggleMenu ? ' active' : ''}`}></div>
      <nav className="flex justify-between items-center p-4 lg:container lg:mx-auto lg:px-4 xl:container xl:mx-auto xl:px-8 2xl:container 2xl:mx-auto 2xl:px-0">
        <Link
          to="/"
          onClick={
            document.body.clientWidth <= 767 && toggleMenu
              ? () => {
                  handleToggleMenu();
                }
              : null
          }
          className="font-bold text-xl text-[#BB0100] z-[115] md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl"
        >
          NeoSTORE
        </Link>
        <div className={`menu${toggleMenu ? ' active' : ''}`}>
          <div className="h-[40px] md:hidden lg:hidden xl:hidden 2xl:hidden"></div>
          <ul className="flex flex-row s:flex-col xs:flex-col sm:flex-col">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  className="text-sm inline-block px-4 py-2 duration-200 lg:text-base lg:px-6 xl:text-base xl:px-6 2xl:text-base 2xl:px-6"
                  state={{ num: item.state }}
                  onClick={
                    document.body.clientWidth <= 767
                      ? () => {
                          handleToggleMenu();
                        }
                      : null
                  }
                  to={item.to}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2 items-center">
          {/* <div className="w-48">
            <input
              type="text"
              placeholder="Search"
              className="h-9 w-[inherit] rounded-md bg-[#EDEDED] text-black pl-3 pr-5 focus-visible:outline-none"
            />
          </div> */}
          <Menu as="div" className="relative inline-block h-6">
            <MenuButton>
              <img src={account} alt="account" />
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-max origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <MenuItem>
                <div className="block px-4 py-2 text-base text-[#282627] capitalize data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                  Hello {name}
                </div>
              </MenuItem>
              <MenuItem>
                <Link
                  className="flex items-center w-full px-4 py-2 text-left text-base text-[#282627] data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  onClick={() => {
                    dispatch(logout());
                  }}
                  to={'/login'}
                >
                  <span className="mr-1 w-4 h-4">
                    <Logout />
                  </span>
                  Sign Out
                </Link>
              </MenuItem>
            </MenuItems>
          </Menu>
          <Link to={'wishlist'}>
            <img src={wishlist} alt="wishlist" />
          </Link>
          <Link to={'cart'} className="relative">
            {ItemsInCart > 0 && (
              <div className="absolute right-[-10px] top-[-8px] flex items-center justify-center min-w-5 h-[18px] bg-[#BB0100] text-white text-[10px] rounded-full delay-200 py-[2px] px-1">
                {ItemsInCart}
              </div>
            )}
            <img src={cart} alt="cart" />
          </Link>
          <div className="z-[105] md:hidden lg:hidden xl:hidden 2xl:hidden">
            <Hamburger
              rounded
              size={22}
              toggled={toggleMenu}
              toggle={handleToggleMenu}
            />
          </div>
        </div>
      </nav>
    </section>
  );
}

export default Header;
