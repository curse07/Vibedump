import React, { useState, useCallback, useRef } from 'react';
import { Eye, EyeOff, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { validateEmailWithAPI, checkUsernameAvailability, checkEmailRegistration } from '../services/validationService';

interface FormErrors {
  email?: string;
  username?: string;
  password?: string;
  terms?: string;
}

interface ValidationStatus {
  email: 'idle' | 'checking' | 'valid' | 'invalid';
  username: 'idle' | 'checking' | 'available' | 'taken';
}

const SignInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    terms: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({
    email: false,
    username: false,
    password: false,
    terms: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>({
    email: 'idle',
    username: 'idle'
  });
  
  // Refs to store timeouts for debouncing
  const emailCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const usernameCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const validateField = (name: string, value: string | boolean, isSubmission: boolean = false): string => {
    switch (name) {
      case 'email':
        if (isSubmission && !value.toString().trim()) return 'Email is required';
        if (value.toString().trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.toString())) return 'Please enter a valid email address';
        return '';
      case 'username':
        if (isSubmission && !value.toString().trim()) return 'Username is required';
        if (value.toString().trim() && value.toString().length < 3) return 'Username must be at least 3 characters';
        if (value.toString().trim() && !/^[a-zA-Z0-9_-]+$/.test(value.toString())) return 'Username can only contain letters, numbers, hyphens, and underscores';
        return '';
      case 'password':
        if (isSubmission && !value) return 'Password is required';
        if (value && value.toString().length < 6) return 'Password must be at least 6 characters';
        return '';
      case 'terms':
        if (isSubmission && !value) return 'You must accept the terms & conditions';
        return '';
      default:
        return '';
    }
  };

  const handleEmailValidation = useCallback(async (email: string) => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationStatus(prev => ({ ...prev, email: 'idle' }));
      return;
    }

    setValidationStatus(prev => ({ ...prev, email: 'checking' }));
    
    try {
      // First check if email is already registered
      const isRegistered = await checkEmailRegistration(email);
      if (isRegistered) {
        setErrors(prev => ({
          ...prev,
          email: 'This email is already registered. Please use a different email or log in.'
        }));
        setValidationStatus(prev => ({ ...prev, email: 'invalid' }));
        return;
      }

      // Then validate email existence and deliverability
      const validation = await validateEmailWithAPI(email);
      
      if (!validation.isValid || !validation.isDeliverable || validation.isDisposable) {
        setErrors(prev => ({
          ...prev,
          email: validation.message || 'Please enter a valid email address'
        }));
        setValidationStatus(prev => ({ ...prev, email: 'invalid' }));
      } else {
        // Clear email error if it was about validation
        setErrors(prev => {
          const newErrors = { ...prev };
          if (newErrors.email && (
            newErrors.email.includes('already registered') ||
            newErrors.email.includes('valid email') ||
            newErrors.email.includes('cannot receive') ||
            newErrors.email.includes('not allowed') ||
            newErrors.email.includes('does not exist')
          )) {
            delete newErrors.email;
          }
          return newErrors;
        });
        setValidationStatus(prev => ({ ...prev, email: 'valid' }));
      }
    } catch (error) {
      console.error('Error validating email:', error);
      setValidationStatus(prev => ({ ...prev, email: 'idle' }));
    }
  }, []);

  const handleUsernameCheck = useCallback(async (username: string) => {
    if (!username.trim() || username.length < 3) {
      setValidationStatus(prev => ({ ...prev, username: 'idle' }));
      return;
    }

    setValidationStatus(prev => ({ ...prev, username: 'checking' }));
    
    try {
      const result = await checkUsernameAvailability(username);
      
      if (!result.isAvailable) {
        setErrors(prev => ({
          ...prev,
          username: result.message || 'This username is not available'
        }));
        setValidationStatus(prev => ({ ...prev, username: 'taken' }));
      } else {
        // Clear username error if it was about availability
        setErrors(prev => {
          const newErrors = { ...prev };
          if (newErrors.username && (
            newErrors.username.includes('already taken') ||
            newErrors.username.includes('not available') ||
            newErrors.username.includes('reserved')
          )) {
            delete newErrors.username;
          }
          return newErrors;
        });
        setValidationStatus(prev => ({ ...prev, username: 'available' }));
      }
    } catch (error) {
      console.error('Error checking username:', error);
      setValidationStatus(prev => ({ ...prev, username: 'idle' }));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Clear error when user starts typing or checking
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Handle email validation with debounce
    if (name === 'email' && type !== 'checkbox') {
      setValidationStatus(prev => ({ ...prev, email: 'idle' }));
      
      if (emailCheckTimeoutRef.current) {
        clearTimeout(emailCheckTimeoutRef.current);
      }
      
      emailCheckTimeoutRef.current = setTimeout(() => {
        handleEmailValidation(value);
      }, 1000);
    }

    // Handle username checking with debounce
    if (name === 'username' && type !== 'checkbox') {
      setValidationStatus(prev => ({ ...prev, username: 'idle' }));
      
      if (usernameCheckTimeoutRef.current) {
        clearTimeout(usernameCheckTimeoutRef.current);
      }
      
      usernameCheckTimeoutRef.current = setTimeout(() => {
        handleUsernameCheck(value);
      }, 800);
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Only validate format errors on blur, not required errors
    const error = validateField(name, fieldValue, false);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    // For email, also check validation on blur if not already checking
    if (name === 'email' && value.trim() && validationStatus.email !== 'checking') {
      if (emailCheckTimeoutRef.current) {
        clearTimeout(emailCheckTimeoutRef.current);
      }
      handleEmailValidation(value);
    }

    // For username, also check availability on blur if not already checking
    if (name === 'username' && value.trim() && validationStatus.username !== 'checking') {
      if (usernameCheckTimeoutRef.current) {
        clearTimeout(usernameCheckTimeoutRef.current);
      }
      handleUsernameCheck(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Validate all fields with submission flag
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData], true);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    // Mark all fields as touched
    setTouched({
      email: true,
      username: true,
      password: true,
      terms: true
    });

    // Final validation checks
    if (formData.email && !newErrors.email) {
      if (validationStatus.email === 'invalid') {
        newErrors.email = 'Please enter a valid email address';
      } else if (validationStatus.email === 'checking') {
        newErrors.email = 'Please wait while we verify your email';
      }
    }

    if (formData.username && !newErrors.username) {
      if (validationStatus.username === 'taken') {
        newErrors.username = 'This username is not available';
      } else if (validationStatus.username === 'checking') {
        newErrors.username = 'Please wait while we check username availability';
      }
    }

    setErrors(newErrors);

    // If no errors, proceed with submission
    if (Object.keys(newErrors).length === 0) {
      console.log('Sign up attempt:', formData);
      alert('Account created successfully!');
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign up clicked');
  };

  const handleSignUp = () => {
    console.log('Log in clicked');
  };

  const handleTermsClick = () => {
    setShowTerms(true);
  };

  const getInputClassName = (fieldName: keyof FormErrors) => {
    const hasError = (touched[fieldName] || submitted) && errors[fieldName];
    const isValidating = (fieldName === 'email' && validationStatus.email === 'checking') || 
                        (fieldName === 'username' && validationStatus.username === 'checking');
    const isValid = (fieldName === 'email' && validationStatus.email === 'valid') || 
                   (fieldName === 'username' && validationStatus.username === 'available');
    
    return `w-full px-3 py-2.5 text-sm bg-white border rounded-md text-gray-700 placeholder-gray-500 focus:outline-none transition-all duration-200 ${
      hasError 
        ? 'border-red-500 focus:ring-1 focus:ring-red-500 focus:border-red-500' 
        : isValid
        ? 'border-green-500 focus:ring-1 focus:ring-green-500 focus:border-green-500'
        : 'border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-transparent'
    }`;
  };

  const getValidationIcon = (fieldName: 'email' | 'username') => {
    const status = validationStatus[fieldName];
    const hasValue = formData[fieldName].trim().length > 0;
    
    if (!hasValue) return null;
    
    switch (status) {
      case 'checking':
        return <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />;
      case 'valid':
      case 'available':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'invalid':
      case 'taken':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  if (showTerms) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <div className="mb-6">
            <button
              onClick={() => setShowTerms(false)}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              ← Back to Sign Up
            </button>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>
            <div className="prose prose-sm text-gray-700 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">1. Acceptance of Terms</h2>
              <p>By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.</p>
              
              <h2 className="text-lg font-semibold text-gray-900">2. Use License</h2>
              <p>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>modify or copy the materials</li>
                <li>use the materials for any commercial purpose or for any public display</li>
                <li>attempt to reverse engineer any software contained on the website</li>
                <li>remove any copyright or other proprietary notations from the materials</li>
              </ul>
              
              <h2 className="text-lg font-semibold text-gray-900">3. Disclaimer</h2>
              <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
              
              <h2 className="text-lg font-semibold text-gray-900">4. Limitations</h2>
              <p>In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.</p>
              
              <h2 className="text-lg font-semibold text-gray-900">5. Privacy Policy</h2>
              <p>Your privacy is important to us. We collect and use your personal information in accordance with our Privacy Policy, which forms part of these terms and conditions.</p>
              
              <h2 className="text-lg font-semibold text-gray-900">6. User Accounts</h2>
              <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.</p>
              
              <h2 className="text-lg font-semibold text-gray-900">7. Prohibited Uses</h2>
              <p>You may not use our service for any unlawful purpose or to solicit others to perform unlawful acts, to violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances, or to infringe upon or violate our intellectual property rights or the intellectual property rights of others.</p>
              
              <h2 className="text-lg font-semibold text-gray-900">8. Termination</h2>
              <p>We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.</p>
              
              <h2 className="text-lg font-semibold text-gray-900">9. Changes to Terms</h2>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.</p>
              
              <h2 className="text-lg font-semibold text-gray-900">10. Contact Information</h2>
              <p>If you have any questions about these Terms & Conditions, please contact us at support@example.com.</p>
              
              <p className="text-sm text-gray-500 mt-8">Last updated: January 2025</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Header positioned above everything */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Sign up</h1>
      </div>

      {/* Form container with original positioning */}
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={`${getInputClassName('email')} ${formData.email.trim() ? 'pr-10' : ''}`}
                aria-invalid={(touched.email || submitted) && !!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {formData.email.trim() && (
                <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2">
                  {getValidationIcon('email')}
                </div>
              )}
            </div>
            {(touched.email || submitted) && errors.email && (
              <p id="email-error" className="mt-1 text-xs text-red-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          {/* Username Field */}
          <div>
            <div className="relative">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={`${getInputClassName('username')} ${formData.username.trim() ? 'pr-10' : ''}`}
                aria-invalid={(touched.username || submitted) && !!errors.username}
                aria-describedby={errors.username ? 'username-error' : undefined}
              />
              {formData.username.trim() && (
                <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2">
                  {getValidationIcon('username')}
                </div>
              )}
            </div>
            {(touched.username || submitted) && errors.username && (
              <p id="username-error" className="mt-1 text-xs text-red-600" role="alert">
                {errors.username}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={`${getInputClassName('password')} pr-10`}
                aria-invalid={(touched.password || submitted) && !!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {(touched.password || submitted) && errors.password && (
              <p id="password-error" className="mt-1 text-xs text-red-600" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div>
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={`mt-0.5 w-4 h-4 rounded border transition-all duration-200 focus:outline-none focus:ring-1 ${
                  (touched.terms || submitted) && errors.terms
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-gray-400 text-black accent-black'
                }`}
                aria-invalid={(touched.terms || submitted) && !!errors.terms}
                aria-describedby={errors.terms ? 'terms-error' : undefined}
              />
              <label htmlFor="terms" className="text-xs text-gray-600 leading-relaxed">
                Accept{' '}
                <button
                  type="button"
                  onClick={handleTermsClick}
                  className="text-gray-600 hover:underline hover:text-gray-800 transition-all duration-200"
                >
                  terms & conditions
                </button>
              </label>
            </div>
            {(touched.terms || submitted) && errors.terms && (
              <p id="terms-error" className="mt-1 text-xs text-red-600" role="alert">
                {errors.terms}
              </p>
            )}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={validationStatus.email === 'checking' || validationStatus.username === 'checking'}
            className="w-full bg-black text-white py-2.5 text-sm rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(validationStatus.email === 'checking' || validationStatus.username === 'checking') ? 'Validating...' : 'Sign up'}
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative bg-white px-3">
              <span className="text-xs text-gray-500">or</span>
            </div>
          </div>

          {/* Google Sign Up Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 py-2.5 text-sm rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign up with Google
          </button>

          {/* Log In Link */}
          <div className="text-center pt-3">
            <span className="text-xs text-gray-600">
              Already have an account ?{' '}
              <button
                type="button"
                onClick={handleSignUp}
                className="text-gray-800 font-medium hover:underline transition-all duration-200"
              >
                Log in
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;