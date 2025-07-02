import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FormErrors {
  username?: string;
  password?: string;
}

const SignInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({
    username: false,
    password: false
  });
  const [submitted, setSubmitted] = useState(false);

  const validateField = (name: string, value: string, isSubmission: boolean = false): string => {
    switch (name) {
      case 'username':
        if (isSubmission && !value.trim()) return 'Username is required';
        if (value.trim() && value.length < 3) return 'Username must be at least 3 characters';
        return '';
      case 'password':
        if (isSubmission && !value) return 'Password is required';
        if (value && value.length < 6) return 'Password must be at least 6 characters';
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
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Only validate format errors on blur, not required errors
    const error = validateField(name, value, false);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
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
      username: true,
      password: true
    });

    setErrors(newErrors);

    // If no errors, proceed with submission
    if (Object.keys(newErrors).length === 0) {
      console.log('Sign in attempt:', formData);
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in clicked');
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  const handleSignUp = () => {
    console.log('Sign up clicked');
  };

  const getInputClassName = (fieldName: keyof FormErrors) => {
    const hasError = (touched[fieldName] || submitted) && errors[fieldName];
    return `w-full px-3 py-2.5 text-sm bg-white border rounded-md text-gray-700 placeholder-gray-500 focus:outline-none transition-all duration-200 ${
      hasError 
        ? 'border-red-500 focus:ring-1 focus:ring-red-500 focus:border-red-500' 
        : 'border-gray-300 focus:ring-1 focus:ring-gray-400 focus:border-transparent'
    }`;
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Field */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username/ Email"
              value={formData.username}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={getInputClassName('username')}
              aria-invalid={(touched.username || submitted) && !!errors.username}
              aria-describedby={errors.username ? 'username-error' : undefined}
            />
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
                placeholder="Password"
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

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              Forgot Password ?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2.5 text-sm rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1"
          >
            Sign in
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

          {/* Google Sign In Button */}
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
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <div className="text-center pt-3">
            <span className="text-xs text-gray-600">
              Don't have an account ?{' '}
              <button
                type="button"
                onClick={handleSignUp}
                className="text-gray-800 font-medium hover:underline transition-all duration-200"
              >
                Sign up
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;