import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../feature/auth/authSlice';
import { account, cart, Logout, wishlist } from '../../assets';
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

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

  const ItemsInCart = useSelector((state) => state.cart.bagCount);
  const name = JSON.parse(sessionStorage.getItem('userData'));
  const dispatch = useDispatch();

  return (
    <section className="bg-white">
      <nav className="flex justify-between items-center py-4 sm:container sm:mx-auto">
        <div className="text-[#BB0100]">
          <Link to="/" className="font-bold text-3xl text-[#BB0100]">
            NeoSTORE
          </Link>
        </div>
        <ul className="flex">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                className="inline-block px-6 py-2 duration-200"
                state={{ num: item.state }}
                to={item.to}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
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
        </div>
      </nav>
    </section>
  );
}

export default Header;
