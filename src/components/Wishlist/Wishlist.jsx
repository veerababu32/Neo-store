import { Link } from 'react-router-dom';
import { productsBgImg } from '../../assets';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeWishItem } from '../../feature/cart/cartSlice';
import { toast, ToastContainer } from 'react-toastify';

function Wishlist() {
  const wishlistItems = useSelector((state) => state.cart.wishlistItems);
  const dispatch = useDispatch();

  const handleATC = (data) => {
    toast.success('Item added to cart');
    dispatch(removeWishItem(data.id));
    dispatch(addToCart(data));
  };

  return (
    <>
      <ToastContainer />
      <div
        className="bg-no-repeat bg-cover h-24 flex items-center md:h-28 lg:h-36 xl:h-36 2xl:h-36"
        style={{ backgroundImage: `url(${productsBgImg})` }}
      >
        <div className="flex items-center px-4 lg:container lg:mx-auto lg:px-4 xl:container xl:mx-auto xl:px-8 2xl:container 2xl:mx-auto 2xl:px-0">
          <Link to={'/'} className="text-base font-medium text-black pr-4">
            Home
          </Link>
          <span className="text-base font-medium text-[#BB0100] pl-4 border-l-2 border-[#BB0100]">
            Favorites
          </span>
        </div>
      </div>
      <div className="px-4 py-10 lg:container lg:mx-auto lg:px-4 xl:container xl:mx-auto xl:px-8 2xl:container 2xl:mx-auto 2xl:px-0">
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-8 s:grid-cols-1 xs:grid-cols-1 sm:flex sm:justify-center sm:flex-wrap">
            {wishlistItems.map((item, index) => (
              <div
                className="w-auto flex flex-col items-center gap-4 border border-[#BFBFBF] p-2 sm:px-10 sm:py-4 lg:flex-row lg:items-start xl:flex-row xl:items-start 2xl:flex-row 2xl:items-start"
                key={index}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-[220px] h-[220px] shadow"
                />
                <div className="w-[220px] h-full flex flex-col justify-between gap-2 xl:w-auto 2xl:w-auto">
                  <h2 className="text-base font-medium">{item.title}</h2>
                  <p className="text-base font-medium capitalize">
                    Category: {item.category.replace('-', ' ')}
                  </p>
                  <p className="text-base font-medium">
                    Price:
                    <span className="ml-1 mr-2 text-[#C2C2C2] line-through">
                      &#8377;
                      {(
                        item['price'] +
                        item['price'] * (item['discount'] / 10)
                      ).toFixed(2)}
                    </span>
                    &#8377;{item.price}
                  </p>
                  <p className="text-base font-medium mb-2 xl:mb-[32px] 2xl:mb-[32px]">
                    Quantity: {item.quantity}
                  </p>
                  <button
                    className="w-full bg-[#BB0100] text-base font-medium text-white py-2 rounded-sm lg:w-[180px] xl:w-[180px] 2xl:w-[180px]"
                    onClick={() => handleATC(item)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-xl font-medium mb-4">
              SAVE YOUR FAVORITE ITEMS
            </h2>
            <p className="text-base text-center font-medium text-[#666666] mb-4">
              Want to save the items that you love? <br /> Just click on the
              heart symbol beside the item and it will show up here.
            </p>
            <div className="text-center border border-[#BB0100] hover:bg-[#BB0100]">
              <Link
                to={'/all-products'}
                state={{ data: undefined }}
                className="inline-block text-base font-medium text-[#BB0100] px-4 py-2 hover:text-white"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Wishlist;
