import React, { useState } from 'react';
import { X, Phone, CreditCard, Building, MoreHorizontal, CheckCircle, AlertCircle, ArrowLeft, Clock, Shield, Download, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type PaymentMethod = 'upi' | 'credit' | 'debit' | 'netbanking';
type PaymentStep = 'method' | 'processing' | 'otp' | 'success' | 'failure';

interface PaymentData {
  method: PaymentMethod;
  upiId?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
  bankName?: string;
  saveCard?: boolean;
  otp?: string;
}

export const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
  const [currentStep, setCurrentStep] = useState<PaymentStep>('method');
  const [paymentData, setPaymentData] = useState<PaymentData>({ method: 'upi' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [otpTimer, setOtpTimer] = useState(30);
  const [transactionId] = useState('TXN' + Math.random().toString(36).substr(2, 9).toUpperCase());

  const billingInfo = {
    item: 'Premium AI Therapist Subscription',
    description: 'Lifetime access to premium features',
    amount: 49,
    tax: 0,
    total: 49
  };

  const paymentMethods = [
    { id: 'upi' as PaymentMethod, name: 'UPI', icon: Phone, description: 'Pay using UPI ID or apps' },
    { id: 'credit' as PaymentMethod, name: 'Credit Card', icon: CreditCard, description: 'Visa, Mastercard, Amex' },
    { id: 'debit' as PaymentMethod, name: 'Debit Card', icon: CreditCard, description: 'All major banks supported' },
    { id: 'netbanking' as PaymentMethod, name: 'Net Banking', icon: Building, description: 'Online banking' }
  ];

  const banks = [
    'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 
    'Punjab National Bank', 'Kotak Mahindra Bank', 'Canara Bank', 'Bank of Baroda'
  ];

  const handleInputChange = (field: string, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (selectedMethod) {
      case 'upi':
        if (!paymentData.upiId?.trim()) {
          newErrors.upiId = 'UPI ID is required';
        } else if (!/^[\w.-]+@[\w.-]+$/.test(paymentData.upiId)) {
          newErrors.upiId = 'Please enter a valid UPI ID';
        }
        break;
      
      case 'credit':
      case 'debit':
        if (!paymentData.cardNumber?.trim()) {
          newErrors.cardNumber = 'Card number is required';
        } else if (paymentData.cardNumber.replace(/\s/g, '').length < 16) {
          newErrors.cardNumber = 'Please enter a valid card number';
        }
        
        if (!paymentData.expiryDate?.trim()) {
          newErrors.expiryDate = 'Expiry date is required';
        } else if (!/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
          newErrors.expiryDate = 'Please enter valid expiry date (MM/YY)';
        }
        
        if (!paymentData.cvv?.trim()) {
          newErrors.cvv = 'CVV is required';
        } else if (paymentData.cvv.length < 3) {
          newErrors.cvv = 'Please enter valid CVV';
        }
        
        if (!paymentData.cardholderName?.trim()) {
          newErrors.cardholderName = 'Cardholder name is required';
        }
        break;
      
      case 'netbanking':
        if (!paymentData.bankName) {
          newErrors.bankName = 'Please select your bank';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    if (!validateForm()) return;

    setCurrentStep('processing');
    
    // Simulate payment processing - only proceed if backend confirms success
    setTimeout(() => {
      // This is where your backend team will integrate actual payment processing
      // For now, we simulate the response
      const backendResponse = {
        success: Math.random() > 0.1, // 90% success rate for demo
        requiresOtp: selectedMethod === 'credit' || selectedMethod === 'debit'
      };

      if (backendResponse.requiresOtp && backendResponse.success) {
        setCurrentStep('otp');
        startOtpTimer();
      } else if (backendResponse.success) {
        // Only show success when backend confirms payment
        setCurrentStep('success');
      } else {
        setCurrentStep('failure');
      }
    }, 3000);
  };

  const handleOtpVerification = () => {
    if (!paymentData.otp || paymentData.otp.length !== 6) {
      setErrors({ otp: 'Please enter valid 6-digit OTP' });
      return;
    }

    setCurrentStep('processing');
    setTimeout(() => {
      // Backend OTP verification would happen here
      const otpVerified = Math.random() > 0.1; // 90% success rate for demo
      setCurrentStep(otpVerified ? 'success' : 'failure');
    }, 2000);
  };

  const startOtpTimer = () => {
    const timer = setInterval(() => {
      setOtpTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setPaymentData({ method });
    setErrors({});
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const getCardType = (number: string) => {
    const num = number.replace(/\s/g, '');
    if (/^4/.test(num)) return 'Visa';
    if (/^5[1-5]/.test(num)) return 'Mastercard';
    if (/^3[47]/.test(num)) return 'Amex';
    return '';
  };

  const renderPaymentMethods = () => (
    <div className="w-full max-w-sm">
      <h2 className="text-gray-900 text-xl font-semibold mb-6">Payment methods</h2>
      
      <div className="space-y-3 mb-8">
        {paymentMethods.map((method) => {
          const IconComponent = method.icon;
          const isSelected = selectedMethod === method.id;
          
          return (
            <button
              key={method.id}
              onClick={() => handleMethodSelect(method.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className={`flex items-center justify-center rounded-lg shrink-0 w-10 h-10 ${
                isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                <IconComponent size={20} />
              </div>
              <div className="text-left flex-1">
                <p className="text-gray-900 font-medium">{method.name}</p>
                <p className="text-gray-500 text-sm">{method.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Billing Summary */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-gray-900 text-lg font-semibold mb-4">Order Summary</h3>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600 text-sm">{billingInfo.item}</span>
            <span className="text-gray-900 font-medium">${billingInfo.amount}</span>
          </div>
          <div className="text-gray-500 text-xs">{billingInfo.description}</div>
          
          {billingInfo.tax > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Tax</span>
              <span className="text-gray-900 font-medium">${billingInfo.tax}</span>
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between">
            <span className="text-gray-900 font-semibold">Total</span>
            <span className="text-gray-900 font-semibold text-lg">${billingInfo.total}</span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} className="text-blue-600" />
            <span className="text-gray-900 font-medium text-sm">What's included:</span>
          </div>
          <ul className="text-gray-600 text-xs space-y-1">
            <li>• Voice input support</li>
            <li>• Advanced AI responses</li>
            <li>• Priority support</li>
            <li>• Unlimited conversations</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderUpiDetails = () => (
    <div className="w-full max-w-2xl">
      <h2 className="text-gray-900 text-2xl font-semibold mb-6">Pay with UPI</h2>
      
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-3">Enter UPI ID</label>
        <input
          type="text"
          placeholder="yourname@upi (e.g., john@paytm)"
          value={paymentData.upiId || ''}
          onChange={(e) => handleInputChange('upiId', e.target.value)}
          className={`w-full h-12 px-4 border-2 rounded-xl focus:outline-none focus:border-blue-500 text-base bg-white ${
            errors.upiId ? 'border-red-500' : 'border-gray-200'
          }`}
        />
        {errors.upiId && <p className="text-red-500 text-sm mt-2">{errors.upiId}</p>}
      </div>

      <div className="mb-6">
        <p className="text-gray-600 text-sm mb-3">Or pay using UPI apps:</p>
        <div className="flex gap-3">
          {[
            { name: 'Google Pay', logo: '/gpay.png' },
            { name: 'PhonePe', logo: '/phonepe.png' },
            { name: 'Paytm', logo: '/paytm.png' }
          ].map((app) => (
            <button
              key={app.name}
              className="flex-1 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-all duration-200 bg-white hover:shadow-lg"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center bg-white border border-gray-100">
                {app.logo ? (
                  <img 
                    src={app.logo} 
                    alt={`${app.name} logo`}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">P</span>
                  </div>
                )}
              </div>
              <p className="text-gray-900 text-sm font-medium">{app.name}</p>
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={handlePayment}
        disabled={!paymentData.upiId?.trim()}
        className="w-full h-12 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
      >
        Pay ${billingInfo.total}
      </button>
    </div>
  );

  const renderCardDetails = () => (
    <div className="w-full max-w-2xl">
      <h2 className="text-gray-900 text-2xl font-semibold mb-6">
        {selectedMethod === 'credit' ? 'Credit Card' : 'Debit Card'} Details
      </h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-gray-700 font-medium mb-3">Card Number</label>
          <div className="relative">
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={paymentData.cardNumber || ''}
              onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
              maxLength={19}
              className={`w-full h-12 px-4 pr-16 border-2 rounded-xl focus:outline-none focus:border-blue-500 text-base bg-white ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {paymentData.cardNumber && (
              <div className="absolute right-3 top-3 text-gray-500 text-sm font-medium">
                {getCardType(paymentData.cardNumber)}
              </div>
            )}
          </div>
          {errors.cardNumber && <p className="text-red-500 text-sm mt-2">{errors.cardNumber}</p>}
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-3">Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              value={paymentData.expiryDate || ''}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 2) {
                  value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                handleInputChange('expiryDate', value);
              }}
              maxLength={5}
              className={`w-full h-12 px-4 border-2 rounded-xl focus:outline-none focus:border-blue-500 text-base bg-white ${
                errors.expiryDate ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.expiryDate && <p className="text-red-500 text-sm mt-2">{errors.expiryDate}</p>}
          </div>
          
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-3">CVV</label>
            <input
              type="password"
              placeholder="123"
              value={paymentData.cvv || ''}
              onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
              maxLength={4}
              className={`w-full h-12 px-4 border-2 rounded-xl focus:outline-none focus:border-blue-500 text-base bg-white ${
                errors.cvv ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.cvv && <p className="text-red-500 text-sm mt-2">{errors.cvv}</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-3">Cardholder Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={paymentData.cardholderName || ''}
            onChange={(e) => handleInputChange('cardholderName', e.target.value)}
            className={`w-full h-12 px-4 border-2 rounded-xl focus:outline-none focus:border-blue-500 text-base bg-white ${
              errors.cardholderName ? 'border-red-500' : 'border-gray-200'
            }`}
          />
          {errors.cardholderName && <p className="text-red-500 text-sm mt-2">{errors.cardholderName}</p>}
        </div>
        
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="saveCard"
            checked={paymentData.saveCard || false}
            onChange={(e) => handleInputChange('saveCard', e.target.checked.toString())}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="saveCard" className="text-gray-600 text-sm">
            Save this card for future payments
          </label>
        </div>
      </div>

      <div className="mb-6 p-4 bg-blue-50 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <Shield size={16} className="text-blue-600" />
          <span className="text-gray-900 font-medium text-sm">Secure Payment</span>
        </div>
        <p className="text-gray-600 text-xs">
          Your card information is encrypted and secure. We use industry-standard SSL encryption.
        </p>
      </div>
      
      <button
        onClick={handlePayment}
        className="w-full h-12 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
      >
        Pay ${billingInfo.total}
      </button>
    </div>
  );

  const renderNetBankingDetails = () => (
    <div className="w-full max-w-2xl">
      <h2 className="text-gray-900 text-2xl font-semibold mb-6">Net Banking</h2>
      
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-3">Select Your Bank</label>
        <select
          value={paymentData.bankName || ''}
          onChange={(e) => handleInputChange('bankName', e.target.value)}
          className={`w-full h-12 px-4 border-2 rounded-xl focus:outline-none focus:border-blue-500 text-base bg-white ${
            errors.bankName ? 'border-red-500' : 'border-gray-200'
          }`}
        >
          <option value="">Choose your bank</option>
          {banks.map((bank) => (
            <option key={bank} value={bank}>{bank}</option>
          ))}
        </select>
        {errors.bankName && <p className="text-red-500 text-sm mt-2">{errors.bankName}</p>}
      </div>

      {paymentData.bankName && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={16} className="text-yellow-600" />
            <span className="text-yellow-800 font-medium text-sm">Important</span>
          </div>
          <p className="text-yellow-700 text-xs">
            You will be redirected to {paymentData.bankName}'s secure login page to complete the payment.
          </p>
        </div>
      )}
      
      <button
        onClick={handlePayment}
        className="w-full h-12 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
      >
        Proceed to {paymentData.bankName || 'Bank'}
      </button>
    </div>
  );

  const renderProcessing = () => (
    <div className="flex-1 flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
        <h2 className="text-gray-900 text-2xl font-semibold mb-2">Processing Payment...</h2>
        <p className="text-gray-600">Please wait while we process your payment securely</p>
        {selectedMethod === 'netbanking' && (
          <p className="text-gray-600 text-sm mt-2">You may be redirected to your bank's website</p>
        )}
      </div>
    </div>
  );

  const renderOtpVerification = () => (
    <div className="w-full max-w-2xl">
      <h2 className="text-gray-900 text-2xl font-semibold mb-6">Enter OTP</h2>
      
      <div className="mb-6">
        <p className="text-gray-600 mb-4">
          Enter the 6-digit OTP sent to your registered mobile number ending with ****1234
        </p>
        
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={paymentData.otp || ''}
          onChange={(e) => handleInputChange('otp', e.target.value.replace(/\D/g, ''))}
          maxLength={6}
          className={`w-full h-12 px-4 border-2 rounded-xl focus:outline-none focus:border-blue-500 text-center text-lg tracking-widest bg-white ${
            errors.otp ? 'border-red-500' : 'border-gray-200'
          }`}
        />
        {errors.otp && <p className="text-red-500 text-sm mt-2">{errors.otp}</p>}
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Clock size={16} />
          <span>Resend OTP in {otpTimer}s</span>
        </div>
        {otpTimer === 0 && (
          <button
            onClick={() => {
              setOtpTimer(30);
              startOtpTimer();
            }}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            Resend OTP
          </button>
        )}
      </div>
      
      <button
        onClick={handleOtpVerification}
        disabled={!paymentData.otp || paymentData.otp.length !== 6}
        className="w-full h-12 bg-black text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
      >
        Verify & Pay ${billingInfo.total}
      </button>
    </div>
  );

  const renderSuccess = () => (
    <div className="flex-1 flex items-center justify-center min-h-[500px]">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-white" />
          </div>
          <h2 className="text-gray-900 text-3xl font-semibold mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your premium subscription has been activated</p>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="text-gray-900 font-mono">{transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time:</span>
              <span className="text-gray-900">{new Date().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="text-gray-900 font-semibold">${billingInfo.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="text-gray-900 capitalize">{selectedMethod}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {/* Download receipt logic */}}
            className="w-full flex items-center justify-center gap-2 h-12 border-2 border-gray-200 text-gray-900 font-medium rounded-xl hover:bg-gray-50 transition-colors bg-white"
          >
            <Download size={16} />
            Download Receipt
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 h-12 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
          >
            <Home size={16} />
            Continue to App
          </button>
        </div>
      </div>
    </div>
  );

  const renderFailure = () => (
    <div className="flex-1 flex items-center justify-center min-h-[500px]">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <X size={40} className="text-white" />
          </div>
          <h2 className="text-gray-900 text-3xl font-semibold mb-2">Payment Failed</h2>
          <p className="text-gray-600 mb-6">We couldn't process your payment. Please try again.</p>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-red-600 text-sm">
            Transaction failed due to insufficient funds or network error. Please check your payment details and try again.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              setCurrentStep('method');
              setPaymentData({ method: selectedMethod });
              setErrors({});
            }}
            className="w-full h-12 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full h-12 border-2 border-gray-200 text-gray-900 font-medium rounded-xl hover:bg-gray-50 transition-colors bg-white"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  const renderRightPanel = () => {
    if (currentStep === 'processing') return renderProcessing();
    if (currentStep === 'otp') return renderOtpVerification();
    if (currentStep === 'success') return renderSuccess();
    if (currentStep === 'failure') return renderFailure();

    switch (selectedMethod) {
      case 'upi':
        return renderUpiDetails();
      case 'credit':
      case 'debit':
        return renderCardDetails();
      case 'netbanking':
        return renderNetBankingDetails();
      default:
        return renderUpiDetails();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{fontFamily: 'Inter, "Noto Sans", sans-serif'}}>
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-gray-900 text-xl font-semibold">
            {currentStep === 'success' ? 'Payment Complete' : 'Secure Payment'}
          </h1>
          
          {currentStep !== 'processing' && currentStep !== 'success' && (
            <button
              onClick={() => navigate('/')}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          )}
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex gap-20 items-start justify-center">
          {(currentStep === 'method' || currentStep === 'processing') && renderPaymentMethods()}
          {renderRightPanel()}
        </div>
      </main>
    </div>
  );
};