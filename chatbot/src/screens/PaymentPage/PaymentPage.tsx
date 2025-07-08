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
    <div className="w-80 bg-white rounded-lg border border-[#dce0e5]">
      <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-6 py-4 border-b border-[#dce0e5]">
        Payment methods
      </h2>
      
      <div className="p-2">
        {paymentMethods.map((method) => {
          const IconComponent = method.icon;
          const isSelected = selectedMethod === method.id;
          
          return (
            <button
              key={method.id}
              onClick={() => handleMethodSelect(method.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all ${
                isSelected 
                  ? 'bg-[#f0f8ff] border border-[#1978e5]' 
                  : 'hover:bg-[#f8f9fa]'
              }`}
            >
              <div className={`flex items-center justify-center rounded-lg shrink-0 size-10 ${
                isSelected ? 'bg-[#1978e5] text-white' : 'bg-[#f0f2f4] text-[#111418]'
              }`}>
                <IconComponent size={20} />
              </div>
              <div className="text-left flex-1">
                <p className="text-[#111418] font-medium">{method.name}</p>
                <p className="text-[#637488] text-sm">{method.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Billing Summary */}
      <div className="border-t border-[#dce0e5] p-6">
        <h3 className="text-[#111418] text-lg font-bold mb-4">Order Summary</h3>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between">
            <span className="text-[#637488] text-sm">{billingInfo.item}</span>
            <span className="text-[#111418] font-medium">${billingInfo.amount}</span>
          </div>
          <div className="text-[#637488] text-xs">{billingInfo.description}</div>
          
          {billingInfo.tax > 0 && (
            <div className="flex justify-between">
              <span className="text-[#637488] text-sm">Tax</span>
              <span className="text-[#111418] font-medium">${billingInfo.tax}</span>
            </div>
          )}
        </div>
        
        <div className="border-t border-[#dce0e5] pt-3">
          <div className="flex justify-between">
            <span className="text-[#111418] font-bold">Total</span>
            <span className="text-[#111418] font-bold text-lg">${billingInfo.total}</span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-[#f0f8ff] rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} className="text-[#1978e5]" />
            <span className="text-[#111418] font-medium text-sm">What's included:</span>
          </div>
          <ul className="text-[#637488] text-xs space-y-1">
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
    <div className="flex-1 bg-white rounded-lg border border-[#dce0e5] p-6">
      <h2 className="text-[#111418] text-2xl font-bold mb-6">Pay with UPI</h2>
      
      <div className="mb-6">
        <label className="block text-[#111418] font-medium mb-2">Enter UPI ID</label>
        <input
          type="text"
          placeholder="yourname@upi (e.g., john@paytm)"
          value={paymentData.upiId || ''}
          onChange={(e) => handleInputChange('upiId', e.target.value)}
          className={`w-full h-14 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1978e5] text-base ${
            errors.upiId ? 'border-red-500' : 'border-[#dce0e5]'
          }`}
        />
        {errors.upiId && <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>}
      </div>

      <div className="mb-6">
        <p className="text-[#637488] text-sm mb-3">Or pay using UPI apps:</p>
        <div className="flex gap-3">
          {['Google Pay', 'PhonePe', 'Paytm'].map((app) => (
            <button
              key={app}
              className="flex-1 p-3 border border-[#dce0e5] rounded-lg hover:border-[#1978e5] transition-colors"
            >
              <div className="w-8 h-8 bg-[#f0f2f4] rounded mx-auto mb-2"></div>
              <p className="text-[#111418] text-xs font-medium">{app}</p>
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={handlePayment}
        disabled={!paymentData.upiId?.trim()}
        className="w-full h-12 bg-[#1978e5] text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1565c0] transition-colors"
      >
        Pay ${billingInfo.total}
      </button>
    </div>
  );

  const renderCardDetails = () => (
    <div className="flex-1 bg-white rounded-lg border border-[#dce0e5] p-6">
      <h2 className="text-[#111418] text-2xl font-bold mb-6">
        {selectedMethod === 'credit' ? 'Credit Card' : 'Debit Card'} Details
      </h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-[#111418] font-medium mb-2">Card Number</label>
          <div className="relative">
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={paymentData.cardNumber || ''}
              onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
              maxLength={19}
              className={`w-full h-14 px-4 pr-16 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1978e5] text-base ${
                errors.cardNumber ? 'border-red-500' : 'border-[#dce0e5]'
              }`}
            />
            {paymentData.cardNumber && (
              <div className="absolute right-3 top-4 text-[#637488] text-sm font-medium">
                {getCardType(paymentData.cardNumber)}
              </div>
            )}
          </div>
          {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-[#111418] font-medium mb-2">Expiry Date</label>
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
              className={`w-full h-14 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1978e5] text-base ${
                errors.expiryDate ? 'border-red-500' : 'border-[#dce0e5]'
              }`}
            />
            {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
          </div>
          
          <div className="flex-1">
            <label className="block text-[#111418] font-medium mb-2">CVV</label>
            <input
              type="password"
              placeholder="123"
              value={paymentData.cvv || ''}
              onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
              maxLength={4}
              className={`w-full h-14 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1978e5] text-base ${
                errors.cvv ? 'border-red-500' : 'border-[#dce0e5]'
              }`}
            />
            {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-[#111418] font-medium mb-2">Cardholder Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={paymentData.cardholderName || ''}
            onChange={(e) => handleInputChange('cardholderName', e.target.value)}
            className={`w-full h-14 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1978e5] text-base ${
              errors.cardholderName ? 'border-red-500' : 'border-[#dce0e5]'
            }`}
          />
          {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="saveCard"
            checked={paymentData.saveCard || false}
            onChange={(e) => handleInputChange('saveCard', e.target.checked.toString())}
            className="w-4 h-4 text-[#1978e5] border-[#dce0e5] rounded focus:ring-[#1978e5]"
          />
          <label htmlFor="saveCard" className="text-[#637488] text-sm">
            Save this card for future payments
          </label>
        </div>
      </div>

      <div className="mb-6 p-4 bg-[#f0f8ff] rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Shield size={16} className="text-[#1978e5]" />
          <span className="text-[#111418] font-medium text-sm">Secure Payment</span>
        </div>
        <p className="text-[#637488] text-xs">
          Your card information is encrypted and secure. We use industry-standard SSL encryption.
        </p>
      </div>
      
      <button
        onClick={handlePayment}
        className="w-full h-12 bg-[#1978e5] text-white font-bold rounded-lg hover:bg-[#1565c0] transition-colors"
      >
        Pay ${billingInfo.total}
      </button>
    </div>
  );

  const renderNetBankingDetails = () => (
    <div className="flex-1 bg-white rounded-lg border border-[#dce0e5] p-6">
      <h2 className="text-[#111418] text-2xl font-bold mb-6">Net Banking</h2>
      
      <div className="mb-6">
        <label className="block text-[#111418] font-medium mb-2">Select Your Bank</label>
        <select
          value={paymentData.bankName || ''}
          onChange={(e) => handleInputChange('bankName', e.target.value)}
          className={`w-full h-14 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1978e5] text-base ${
            errors.bankName ? 'border-red-500' : 'border-[#dce0e5]'
          }`}
        >
          <option value="">Choose your bank</option>
          {banks.map((bank) => (
            <option key={bank} value={bank}>{bank}</option>
          ))}
        </select>
        {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
      </div>

      {paymentData.bankName && (
        <div className="mb-6 p-4 bg-[#fff3cd] border border-[#ffeaa7] rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={16} className="text-[#856404]" />
            <span className="text-[#856404] font-medium text-sm">Important</span>
          </div>
          <p className="text-[#856404] text-xs">
            You will be redirected to {paymentData.bankName}'s secure login page to complete the payment.
          </p>
        </div>
      )}
      
      <button
        onClick={handlePayment}
        disabled={!paymentData.bankName}
        className="w-full h-12 bg-[#1978e5] text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1565c0] transition-colors"
      >
        Proceed to {paymentData.bankName || 'Bank'}
      </button>
    </div>
  );

  const renderProcessing = () => (
    <div className="flex-1 flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#1978e5] mx-auto mb-6"></div>
        <h2 className="text-[#111418] text-2xl font-bold mb-2">Processing Payment...</h2>
        <p className="text-[#637488]">Please wait while we process your payment securely</p>
        {selectedMethod === 'netbanking' && (
          <p className="text-[#637488] text-sm mt-2">You may be redirected to your bank's website</p>
        )}
      </div>
    </div>
  );

  const renderOtpVerification = () => (
    <div className="flex-1 bg-white rounded-lg border border-[#dce0e5] p-6">
      <h2 className="text-[#111418] text-2xl font-bold mb-6">Enter OTP</h2>
      
      <div className="mb-6">
        <p className="text-[#637488] mb-4">
          Enter the 6-digit OTP sent to your registered mobile number ending with ****1234
        </p>
        
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={paymentData.otp || ''}
          onChange={(e) => handleInputChange('otp', e.target.value.replace(/\D/g, ''))}
          maxLength={6}
          className={`w-full h-14 px-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1978e5] text-center text-lg tracking-widest ${
            errors.otp ? 'border-red-500' : 'border-[#dce0e5]'
          }`}
        />
        {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-[#637488] text-sm">
          <Clock size={16} />
          <span>Resend OTP in {otpTimer}s</span>
        </div>
        {otpTimer === 0 && (
          <button
            onClick={() => {
              setOtpTimer(30);
              startOtpTimer();
            }}
            className="text-[#1978e5] text-sm font-medium hover:underline"
          >
            Resend OTP
          </button>
        )}
      </div>
      
      <button
        onClick={handleOtpVerification}
        disabled={!paymentData.otp || paymentData.otp.length !== 6}
        className="w-full h-12 bg-[#1978e5] text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1565c0] transition-colors"
      >
        Verify & Pay ${billingInfo.total}
      </button>
    </div>
  );

  const renderSuccess = () => (
    <div className="flex-1 flex items-center justify-center min-h-[500px]">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-20 h-20 bg-[#1978e5] rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-white" />
          </div>
          <h2 className="text-[#111418] text-3xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-[#637488] mb-6">Your premium subscription has been activated</p>
        </div>
        
        <div className="bg-[#f8f9fa] rounded-lg p-6 mb-6 text-left">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#637488]">Transaction ID:</span>
              <span className="text-[#111418] font-mono">{transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#637488]">Date & Time:</span>
              <span className="text-[#111418]">{new Date().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#637488]">Amount:</span>
              <span className="text-[#111418] font-bold">${billingInfo.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#637488]">Payment Method:</span>
              <span className="text-[#111418] capitalize">{selectedMethod}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {/* Download receipt logic */}}
            className="w-full flex items-center justify-center gap-2 h-12 border border-[#dce0e5] text-[#111418] font-medium rounded-lg hover:bg-[#f8f9fa] transition-colors"
          >
            <Download size={16} />
            Download Receipt
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 h-12 bg-[#1978e5] text-white font-bold rounded-lg hover:bg-[#1565c0] transition-colors"
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
          <h2 className="text-[#111418] text-3xl font-bold mb-2">Payment Failed</h2>
          <p className="text-[#637488] mb-6">We couldn't process your payment. Please try again.</p>
        </div>
        
        <div className="bg-[#fff5f5] border border-red-200 rounded-lg p-4 mb-6">
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
            className="w-full h-12 bg-[#1978e5] text-white font-bold rounded-lg hover:bg-[#1565c0] transition-colors"
          >
            Try Again
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full h-12 border border-[#dce0e5] text-[#111418] font-medium rounded-lg hover:bg-[#f8f9fa] transition-colors"
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
    <div className="min-h-screen bg-[#f8f9fa]" style={{fontFamily: 'Inter, "Noto Sans", sans-serif'}}>
      <header className="bg-white border-b border-[#dce0e5] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-[#111418] text-xl font-bold">
            {currentStep === 'success' ? 'Payment Complete' : 'Secure Payment'}
          </h1>
          
          {currentStep !== 'processing' && currentStep !== 'success' && (
            <button
              onClick={() => navigate('/')}
              className="text-[#637488] hover:text-[#111418] transition-colors"
            >
              <X size={24} />
            </button>
          )}
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          {(currentStep === 'method' || currentStep === 'processing') && renderPaymentMethods()}
          {renderRightPanel()}
        </div>
      </main>
    </div>
  );
};