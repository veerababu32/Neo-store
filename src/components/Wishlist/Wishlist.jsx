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
        className="bg-no-repeat bg-cover h-36 flex items-center"
        style={{ backgroundImage: `url(${productsBgImg})` }}
      >
        <div className="sm:container sm:mx-auto flex items-center">
          <Link to={'/'} className="text-base font-medium text-black pr-4">
            Home
          </Link>
          <span className="text-base font-medium text-[#BB0100] pl-4 border-l-2 border-[#BB0100]">
            Favorites
          </span>
        </div>
      </div>
      <div className="sm:container sm:mx-auto py-10">
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 gap-8">
            {wishlistItems.map((item, index) => (
              <div
                className="w-auto flex gap-4 border border-[#BFBFBF] p-2"
                key={index}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-[220px] h-[220px] shadow"
                />
                <div className="flex flex-col gap-2">
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
                  <p className="text-base font-medium mb-[32px]">
                    Quantity: {item.quantity}
                  </p>
                  <button
                    className="w-[180px] bg-[#BB0100] text-base font-medium text-white py-2 rounded-sm"
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
