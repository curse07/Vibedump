import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';

interface FormErrors {
  email?: string;
  otp?: string;
  password?: string;
  confirmPassword?: string;
}

type Step = 'email' | 'otp' | 'password' | 'success';

interface ForgotPasswordProps {
  onBackToSignIn: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBackToSignIn }) => {
  const [currentStep, setCurrentStep] = useState<Step>('email');
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({
    email: false,
    otp: false,
    password: false,
    confirmPassword: false
  });
  const [submitted, setSubmitted] = useState(false);

  const validateField = (name: string, value: string, isSubmission: boolean = false): string => {
    switch (name) {
      case 'email':
        if (isSubmission && !value.trim()) return 'Email is required';
        if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      case 'otp':
        if (isSubmission && !value.trim()) return 'OTP is required';
        if (value.trim() && !/^\d{6}$/.test(value)) return 'OTP must be 6 digits';
        return '';
      case 'password':
        if (isSubmission && !value) return 'Password is required';
        if (value && value.length < 6) return 'Password must be at least 6 characters';
        return '';
      case 'confirmPassword':
        if (isSubmission && !value) return 'Please confirm your password';
        if (value && value !== formData.password) return 'Passwords do not match';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Special handling for confirm password to validate against current password
    if (name === 'confirmPassword' || name === 'password') {
      const confirmPasswordError = validateField('confirmPassword', 
        name === 'confirmPassword' ? value : formData.confirmPassword, 
        touched.confirmPassword || submitted
      );
      if (confirmPasswordError !== errors.confirmPassword) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: confirmPasswordError
        }));
      }
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value, false);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const checkEmailExists = async (email: string): Promise<boolean> => {
    // TODO: Replace with your actual API endpoint
    try {
      const response = await fetch('/api/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const sendOTP = async (email: string): Promise<boolean> => {
    // TODO: Replace with your actual API endpoint
    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return response.ok;
    } catch (error) {
      console.error('Error sending OTP:', error);
      return false;
    }
  };

  const verifyOTP = async (email: string, otp: string): Promise<boolean> => {
    // TODO: Replace with your actual API endpoint
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      return response.ok;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return false;
    }
  };

  const resetPassword = async (email: string, password: string): Promise<boolean> => {
    // TODO: Replace with your actual API endpoint
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return response.ok;
    } catch (error) {
      console.error('Error resetting password:', error);
      return false;
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    const emailError = validateField('email', formData.email, true);
    setTouched(prev => ({ ...prev, email: true }));
    setErrors(prev => ({ ...prev, email: emailError }));

    if (emailError) return;

    try {
      const emailExists = await checkEmailExists(formData.email);
      if (!emailExists) {
        setErrors(prev => ({ ...prev, email: 'Email address not found in our records' }));
        return;
      }

      const otpSent = await sendOTP(formData.email);
      if (otpSent) {
        setCurrentStep('otp');
        setSubmitted(false);
      } else {
        setErrors(prev => ({ ...prev, email: 'Failed to send OTP. Please try again.' }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, email: 'An error occurred. Please try again.' }));
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    const otpError = validateField('otp', formData.otp, true);
    setTouched(prev => ({ ...prev, otp: true }));
    setErrors(prev => ({ ...prev, otp: otpError }));

    if (otpError) return;

    try {
      const isValidOTP = await verifyOTP(formData.email, formData.otp);
      if (isValidOTP) {
        setCurrentStep('password');
        setSubmitted(false);
      } else {
        setErrors(prev => ({ ...prev, otp: 'Invalid OTP. Please try again.' }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, otp: 'An error occurred. Please try again.' }));
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    const passwordError = validateField('password', formData.password, true);
    const confirmPasswordError = validateField('confirmPassword', formData.confirmPassword, true);
    
    setTouched(prev => ({ ...prev, password: true, confirmPassword: true }));
    setErrors(prev => ({ 
      ...prev, 
      password: passwordError,
      confirmPassword: confirmPasswordError
    }));

    if (passwordError || confirmPasswordError) return;

    try {
      const success = await resetPassword(formData.email, formData.password);
      if (success) {
        setCurrentStep('success');
      } else {
        setErrors(prev => ({ ...prev, password: 'Failed to reset password. Please try again.' }));
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, password: 'An error occurred. Please try again.' }));
    }
  };

  const getInputClassName = (fieldName: keyof FormErrors) => {
    const hasError = (touched[fieldName] || submitted) && errors[fieldName];
    return `w-full px-3 py-2.5 text-sm bg-white border rounded-md text-gray-700 placeholder-gray-500 focus:outline-none transition-all duration-200 ${
      hasError 
        ? 'border-red-500 focus:ring-1 focus:ring-red-500 focus:border-red-500' 
        : 'border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-transparent'
    }`;
  };

  const renderEmailStep = () => (
    <form onSubmit={handleEmailSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Forgot Password?</h2>
        <p className="text-sm text-gray-600">Enter your email address and we'll send you an OTP to reset your password.</p>
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className={getInputClassName('email')}
          aria-invalid={(touched.email || submitted) && !!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {(touched.email || submitted) && errors.email && (
          <p id="email-error" className="mt-1 text-xs text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2.5 text-sm rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send OTP
      </button>
    </form>
  );

  const renderOTPStep = () => (
    <form onSubmit={handleOTPSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Enter OTP</h2>
        <p className="text-sm text-gray-600">We've sent a 6-digit code to <span className="font-medium">{formData.email}</span></p>
      </div>

      <div>
        <input
          type="text"
          name="otp"
          placeholder="Enter 6-digit OTP"
          value={formData.otp}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className={`${getInputClassName('otp')} text-center tracking-widest`}
          maxLength={6}
          aria-invalid={(touched.otp || submitted) && !!errors.otp}
          aria-describedby={errors.otp ? 'otp-error' : undefined}
        />
        {(touched.otp || submitted) && errors.otp && (
          <p id="otp-error" className="mt-1 text-xs text-red-600" role="alert">
            {errors.otp}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2.5 text-sm rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Verify OTP
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => sendOTP(formData.email)}
          className="text-xs text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          Didn't receive the code? Resend
        </button>
      </div>
    </form>
  );

  const renderPasswordStep = () => (
    <form onSubmit={handlePasswordSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Reset Password</h2>
        <p className="text-sm text-gray-600">Enter your new password below.</p>
      </div>

      <div>
        <input
          type="password"
          name="password"
          placeholder="New password"
          value={formData.password}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className={getInputClassName('password')}
          aria-invalid={(touched.password || submitted) && !!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
        />
        {(touched.password || submitted) && errors.password && (
          <p id="password-error" className="mt-1 text-xs text-red-600" role="alert">
            {errors.password}
          </p>
        )}
      </div>

      <div>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className={getInputClassName('confirmPassword')}
          aria-invalid={(touched.confirmPassword || submitted) && !!errors.confirmPassword}
          aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
        />
        {(touched.confirmPassword || submitted) && errors.confirmPassword && (
          <p id="confirm-password-error" className="mt-1 text-xs text-red-600" role="alert">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-2.5 text-sm rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Reset Password
      </button>
    </form>
  );

  const renderSuccessStep = () => (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Password Changed Successfully!</h2>
        <p className="text-sm text-gray-600">Your password has been updated. You can now sign in with your new password.</p>
      </div>

      <button
        onClick={onBackToSignIn}
        className="w-full bg-black text-white py-2.5 text-sm rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
      >
        Back to Sign In
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 font-inter">
      <div className="w-full max-w-xs">
        {currentStep === 'email' && renderEmailStep()}
        {currentStep === 'otp' && renderOTPStep()}
        {currentStep === 'password' && renderPasswordStep()}
        {currentStep === 'success' && renderSuccessStep()}
      </div>
    </div>
  );
};