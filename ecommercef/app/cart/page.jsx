'use client';

import { useCart } from '../components/Card_Produit/CartContext';
import { FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import NavigBare from '../components/NavigBare'
import './style.css';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const calculateDiscount = () =>
    (parseFloat(calculateSubtotal()) * 0.1).toFixed(2);

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const discount = parseFloat(calculateDiscount());
    return (subtotal - discount).toFixed(2);
  };

  return (
    <div >
      <NavigBare/>
      <h1 className="cart-title"
      style={{
        marginTop:"50px",
        marginBottom:"50px"
      }}
      >Shopping Cart</h1>

      <div className="cart-layout">
        {/* Product List */}
        <div className="product-list-container">
          <div className="product-list">
            <div className="product-list-header">
              <div className="header-product">Products</div>
              <div className="header-quantity">Quantity</div>
              <div className="header-total">Total</div>
              <div className="header-action">Delete</div>
            </div>

            {cartItems.length === 0 ? (
              <p className="empty-cart">Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-product">
                    <div className="product-image-container">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="product-image"
                        sizes="80px"
                      />
                    </div>
                    <span className="product-name">{item.name}</span>
                  </div>

                  <div className="item-quantity">
                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="quantity-btn minus"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="quantity-btn plus"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <div className="item-action">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            )}

            <Link href="/products">
              <button className="update-cart-btn">Update Cart</button>
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary-container">
          <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="voucher-section">
              <div className="voucher-input-group">
                <input
                  type="text"
                  placeholder="Discount voucher"
                  className="voucher-input"
                />
                <button className="voucher-apply-btn">Apply</button>
              </div>
            </div>

            <div className="summary-details">
              <div className="summary-row">
                <span>Sub Total</span>
                <span>${calculateSubtotal()}</span>
              </div>
              <div className="summary-row">
                <span>First order discount (10%)</span>
                <span className="discount-value">-${calculateDiscount()}</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>

            <div className="warranty-notice">
              <p>90 Day Limited Warranty against manufacturer's defects</p>
            </div>

            <Link href="/checkout" className="checkout-btn">
              Checkout Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
