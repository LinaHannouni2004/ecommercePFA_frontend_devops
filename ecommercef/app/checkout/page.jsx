'use client';
import { useState } from 'react';
import { useCart } from '../components/Card_Produit/CartContext';
import { CreditCard, DollarSign } from 'lucide-react';
import './checkout.css';
import NavigBare from '../components/NavigBare'

export default function Checkout() {
  const { cartItems } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    paymentMethod: 'card',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateSubtotal = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  const calculateDiscount = () => (parseFloat(calculateSubtotal()) * 0.1).toFixed(2);
  const calculateTotal = () => (parseFloat(calculateSubtotal()) - parseFloat(calculateDiscount()) + 50).toFixed(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
  };

  return (
    <div>
<NavigBare/>
   
    <div className="checkout-container">
      <div className="checkout-layout">
        {/* Left Column */}
        <div className="left-column">
          {/* Shipping Address */}
          <div className="form-section">
            <h2 className="section-title">Shipping Address</h2>
            <div className="address-form">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="First & Last Name" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Address 1</label>
                <input type="text" name="address1" value={formData.address1} onChange={handleChange} placeholder="421, Dubai Main St" className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Address 2</label>
                <input type="text" name="address2" value={formData.address2} onChange={handleChange} placeholder="Apartment, suite, etc." className="form-input" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Country</label>
                  <select name="state" value={formData.state} onChange={handleChange} className="form-input">
                    <option value="">Select country</option>
                    <option value="MR">Morocco</option>
                    <option value="FR">France</option>
                    <option value="SP">Spain</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Zip</label>
                <input type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder="Zip code" className="form-input" />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="form-section">
            <h2 className="section-title">Payment Method</h2>
            <div className="payment-method-section">
              <div className="payment-options">
                <label className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} />
                  <CreditCard className="icon" />
                  <span>Card</span>
                </label>

                <label className={`payment-option ${formData.paymentMethod === 'pay-at-delivery' ? 'selected' : ''}`}>
                  <input type="radio" name="paymentMethod" value="pay-at-delivery" checked={formData.paymentMethod === 'pay-at-delivery'} onChange={handleChange} />
                  <DollarSign className="icon" />
                  <span>Pay at the delivery</span>
                </label>
              </div>
            </div>

            {formData.paymentMethod === 'card' && (
              <div className="card-details">
                <div className="form-group">
                  <label className="form-label">Name on Card</label>
                  <input type="text" name="cardName" value={formData.cardName} onChange={handleChange} placeholder="First & Last Name" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="0000 0000 0000 0000" className="form-input" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Expiry</label>
                    <div className="expiry-inputs">
                      <input type="text" name="expiryMonth" value={formData.expiryMonth} onChange={handleChange} placeholder="MM" className="form-input small" maxLength="2" />
                      <span>/</span>
                      <input type="text" name="expiryYear" value={formData.expiryYear} onChange={handleChange} placeholder="YYYY" className="form-input medium" maxLength="4" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVV</label>
                    <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="CVV" className="form-input small" maxLength="3" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="right-column">
          <div className="order-summary">
            <h2 className="section-title">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="order-item">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-quantity">Quantity: {item.quantity}</p>
                <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span>${calculateSubtotal()}</span>
              </div>
              <div className="price-row discount">
                <span>Discount (10%)</span>
                <span>-${calculateDiscount()}</span>
              </div>
            </div>
            <div className="total-section">
              <div className="price-row total">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
              <button className="place-order-btn" onClick={handleSubmit}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
