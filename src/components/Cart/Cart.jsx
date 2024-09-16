import { Link } from 'react-router-dom';
import { close, productsBgImg, Heart, orderSuccess } from '../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, AlsoLike } from '..';
import { useState } from 'react';
import {
  addToWishlist,
  decBagCount,
  removeAllCartItems,
  removeCartItem,
  removeWishItem,
} from '../../feature/cart/cartSlice';
import { toast, ToastContainer } from 'react-toastify';

function Cart() {
  const wishItems = useSelector((state) => state.cart.wishlistItems);
  const TotalPrice = useSelector((state) => state.cart.total);
  const discount = useSelector((state) => state.cart.discount);
  const cartItems = useSelector((state) => state.cart.items);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const dispatch = useDispatch();

  const selectedItem = cartItems.find((item) => item.id === selectedId);

  const handleModalShow = (id) => {
    setShowModal(true);
    setSelectedId(id);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleATW = (id) => {
    const item = cartItems.find((item) => item.id === id);
    const wishItem = wishItems.find((item) => item.id === id);

    if (wishItem) {
      toast.info('Item removed from wishlist');
      dispatch(removeWishItem(id));
    } else {
      toast.success('Item added to wishlist');
      dispatch(addToWishlist(item));
    }
  };

  const handleMTW = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (!item) return;
    toast.success('Item moved to wishlist');
    dispatch(decBagCount(1));
    dispatch(addToWishlist(item));
    dispatch(removeCartItem(itemId));
  };

  const handleRemoveItem = (itemId) => {
    toast.error('Item removed from cart');
    dispatch(removeCartItem(itemId));
  };

  return (
    <div id="cart">
      <ToastContainer />
      <div
        className="bg-no-repeat bg-cover h-24 flex items-center md:h-28 lg:h-36"
        style={{ backgroundImage: `url(${productsBgImg})` }}
      >
        <div className="flex items-center px-4 lg:container lg:mx-auto lg:px-8 2xl:px-0">
          <Link to={'/'} className="text-base font-medium text-black pr-4">
            Home
          </Link>
          <span className="text-base font-medium text-[#BB0100] pl-4 border-l-2 border-[#BB0100]">
            Cart
          </span>
        </div>
      </div>
      <div className="pt-6 pb-14 px-4 lg:container lg:mx-auto lg:px-8 2xl:px-0">
        {cartItems.length > 0 ? (
          <div className="flex flex-col mb-10 gap-2 md:flex-row md:gap-5 md:mb-20">
            <div className="w-full flex gap-2 flex-col md:w-3/4 md:gap-4">
              {cartItems.map((item, index) => (
                <div
                  className="flex rounded-sm border border-[#BFBFBF] p-1 lg:p-4"
                  id={`cart_item_${item.id}`}
                  key={index}
                >
                  <div className="h-36 w-30 mr-2 shadow md:mr-5 md:w-36">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-36 w-30 border rounded md:w-36"
                    />
                  </div>
                  <div
                    className={`flex justify-between${
                      document.body.clientWidth >= '768'
                        ? ' item-right-section'
                        : ' '
                    }`}
                  >
                    <div className="flex flex-col justify-between">
                      <div className="h-full flex flex-col justify-between md:gap-1">
                        <div>
                          <h2 className="text-xs font-normal text-[#666666] mb-1 md:text-sm">
                            {item.title}
                          </h2>
                          <p className="text-xs font-medium text-[#333333] mb-1 md:text-base">
                            <span className="mr-2 text-[#C2C2C2] line-through">
                              &#8377;
                              {(
                                item['price'] +
                                item['price'] * (item['discount'] / 10)
                              ).toFixed(2)}
                            </span>
                            &#8377;{item.price}
                          </p>
                          {item.discount > 10 && (
                            <p className="text-xs font-medium text-[#FE3F3F] mb-1 md:text-sm">
                              you save:{' '}
                              <span>
                                &#8377;
                                {(
                                  item['price'] *
                                  (item['discount'] / 10)
                                ).toFixed(2)}
                              </span>
                              <span className="pl-1">({item.discount}%)</span>
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col justify-center gap-1 md:flex-row md:gap-4">
                          <p className="text-xs font-medium md:text-base">
                            Quantity: {item.quantity}
                          </p>
                          <p
                            className="flex items-center gap-1 w-fit text-xs font-normal text-[#E91B1A] cursor-pointer md:text-sm md:gap-2"
                            onClick={() => handleATW(item.id)}
                          >
                            <span
                              className={`h-4 w-4${
                                wishItems.length > 0 &&
                                wishItems.find(
                                  (wishItem) => wishItem.id === item.id
                                )
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
                    <div>
                      <img
                        src={close}
                        alt="close icon"
                        className="cursor-pointer w-4 h-4"
                        onClick={() => {
                          handleModalShow(item.id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3">
              <div className="flex flex-col gap-2 rounded-sm border border-[#BFBFBF] p-2 md:p-4 lg:py-11 lg:px-9 lg:gap-4">
                <h3 className="text-base font-medium text-[#666666]">
                  Apply Coupon
                </h3>
                <div className="bg-[#EDEDED] flex items-center justify-between p-4">
                  <p className="text-sm font-medium text-[#666666]">
                    Apply Coupon
                  </p>
                  <p className="text-sm font-medium text-[#333333]">
                    View Coupon
                  </p>
                </div>
                <h3 className="text-base font-medium text-[#666666]">
                  Price Detail
                </h3>
                <div>
                  <div className="bg-[#EDEDED] flex flex-col gap-2 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-[#333333]">
                        Total Price
                      </p>
                      <p className="text-sm font-medium text-[#333333]">
                        &#8377;{TotalPrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-[#333333]">
                        Discount on Price
                      </p>
                      <p className="text-sm font-medium text-[#333333]">
                        &#8377;{discount.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-[#333333]">
                        Coupon
                      </p>
                      <p className="text-sm font-medium text-[#333333]">
                        Apply Coupon
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-[#333333]">
                        Shipping Charges
                      </p>
                      <p className="text-sm font-medium text-[#333333]">
                        ₹0.00
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#7F7F7F] text-white px-4 py-2">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-medium">Total</p>
                      <p className="text-lg font-medium">
                        &#8377;{TotalPrice.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  className="text-base font-medium text-white py-2 bg-[#BB0100] border text-center hover:bg-white hover:border-[#BB0100] hover:text-[#BB0100]"
                  onClick={() => {
                    handleModalShow(null);
                    dispatch(removeAllCartItems());
                  }}
                >
                  Place Order
                </button>
                <Link
                  to={'/all-products'}
                  state={{ num: undefined }}
                  className="text-base font-medium text-[#BB0100] text-center border border-[#BB0100] py-2 hover:text-white hover:bg-[#BB0100]"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center pt-10 pb-16">
            <h2 className="text-xl font-medium mb-1">
              Hey, it feels too light!
            </h2>
            <p className="text-base font-medium text-[#666666] mb-4">
              There is nothing in your bag. Let's add some items.
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
        <AlsoLike page={false} />
        {showModal && (
          <Modal show={showModal} onClose={handleModalClose}>
            {selectedItem && (
              <>
                <div className="absolute right-4">
                  <img
                    src={close}
                    alt="close icon"
                    className="cursor-pointer w-4 h-4"
                    onClick={() => {
                      handleModalClose();
                    }}
                  />
                </div>
                <div className="shadow mb-4">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-36 h-36 rounded-xl"
                  />
                </div>
                <p className="mb-2">Remove from cart?</p>
                <p className="mb-6">
                  You can save product to your wishlist to use later.
                </p>
                <div className="flex gap-4">
                  <button
                    className="bg-[#EDEDED] text-sm text-[#666666] font-medium rounded-sm py-3 px-6"
                    onClick={() => {
                      handleModalClose();
                      handleRemoveItem(selectedItem.id);
                    }}
                  >
                    Remove
                  </button>
                  <button
                    className="bg-[#BB0100] text-sm text-white font-medium rounded-sm py-3 px-6"
                    onClick={() => {
                      handleModalClose();
                      handleMTW(selectedItem.id);
                    }}
                  >
                    Move to wishlist
                  </button>
                </div>
              </>
            )}
            {!selectedItem && (
              <>
                <div className="mb-4">
                  <img
                    src={orderSuccess}
                    alt="order success"
                    className="w-auto h-36"
                  />
                </div>
                <p className="text-4xl font-normal text-[#333333] mb-2">
                  Woohoo!
                </p>
                <p className="text-base font-normal text-[#666666] mb-6 text-center">
                  Your order has been placed and you will get <br /> a shipping
                  confirmation soon.
                </p>
                <Link
                  className="bg-[#BB0100] text-sm text-white font-medium border rounded-sm py-3 px-6 hover:bg-white hover:border-[#BB0100] hover:text-[#BB0100]"
                  to={'/all-products'}
                  state={{ data: undefined }}
                >
                  Continue Shopping
                </Link>
              </>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Cart;
