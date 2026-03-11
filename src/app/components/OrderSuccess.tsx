import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';
import { Order } from '../types';

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as Order;

  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6"
          >
            <CheckCircle className="w-16 h-16 text-green-600" />
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Order Placed Successfully!
          </motion.h1>

          <motion.p 
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Thank you for shopping with DORCY VOGUE
          </motion.p>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-50 rounded-2xl p-6 mb-8 text-left"
          >
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5" />
              <h2 className="font-semibold text-lg">Order Details</h2>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-semibold">#{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold text-lg">${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Items:</span>
                <span className="font-semibold">{order.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Delivery Address:</strong>
              </p>
              <p className="text-sm">
                {order.address}<br />
                {order.city}, {order.state} {order.zipCode}
              </p>
            </div>
          </motion.div>

          {/* Payment Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-5 h-5 text-amber-700" />
              <h3 className="font-semibold text-amber-900">Next Steps</h3>
            </div>
            <p className="text-sm text-amber-900 text-left">
              We've sent a confirmation email to <strong>{order.email}</strong> with your order details and payment instructions. 
              Please complete the bank transfer to the account provided. Your order will be processed once we confirm your payment.
            </p>
          </motion.div>

          {/* Order Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <h3 className="font-semibold text-lg mb-4 text-left">Items Ordered</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-4 items-center bg-gray-50 rounded-xl p-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-semibold truncate">{item.product.name}</p>
                    <p className="text-sm text-gray-600">
                      Size: {item.selectedSize} | Color: {item.selectedColor}
                    </p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              to="/shop"
              className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all transform hover:scale-105"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link 
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-white text-black border-2 border-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition-all"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
