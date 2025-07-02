export interface EmailValidationResult {
  isValid: boolean;
  isDeliverable: boolean;
  isDisposable: boolean;
  message?: string;
}

export interface UsernameCheckResult {
  isAvailable: boolean;
  message?: string;
}

// Simulated database of existing usernames
const existingUsernames = [
  'admin',
  'user',
  'test',
  'demo',
  'john_doe',
  'jane_smith',
  'developer',
  'manager',
  'support'
];

// Email validation - ready for your API integration
export const validateEmailWithAPI = async (email: string): Promise<EmailValidationResult> => {
  try {
    // TODO: Replace this with your preferred email validation API
    // Example structure for your API integration:
    /*
    const response = await fetch('YOUR_EMAIL_VALIDATION_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify({ email })
    });
    const data = await response.json();
    
    return {
      isValid: data.valid,
      isDeliverable: data.deliverable,
      isDisposable: data.disposable,
      message: data.message
    };
    */

    // Simulated validation for demo purposes
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const domain = email.split('@')[1]?.toLowerCase();
    
    if (!domain) {
      return {
        isValid: false,
        isDeliverable: false,
        isDisposable: false,
        message: 'Invalid email format'
      };
    }

    // Simulate disposable email detection
    const disposableDomains = ['10minutemail.com', 'tempmail.org', 'guerrillamail.com', 'mailinator.com'];
    if (disposableDomains.includes(domain)) {
      return {
        isValid: true,
        isDeliverable: false,
        isDisposable: true,
        message: 'Disposable email addresses are not allowed'
      };
    }

    // Simulate invalid domains
    const invalidDomains = ['fakeemail.com', 'notreal.xyz', 'invalid.test'];
    if (invalidDomains.includes(domain)) {
      return {
        isValid: false,
        isDeliverable: false,
        isDisposable: false,
        message: 'This email domain does not exist'
      };
    }

    // Simulate undeliverable emails
    const undeliverableEmails = ['bounce@gmail.com', 'invalid@yahoo.com', 'fake@hotmail.com'];
    if (undeliverableEmails.includes(email.toLowerCase())) {
      return {
        isValid: true,
        isDeliverable: false,
        isDisposable: false,
        message: 'This email address cannot receive emails'
      };
    }

    // Most emails are valid for demo
    return {
      isValid: true,
      isDeliverable: true,
      isDisposable: false
    };

  } catch (error) {
    console.error('Email validation API error:', error);
    return {
      isValid: false,
      isDeliverable: false,
      isDisposable: false,
      message: 'Unable to verify email address. Please try again.'
    };
  }
};

// Check if username is available
export const checkUsernameAvailability = async (username: string): Promise<UsernameCheckResult> => {
  try {
    // TODO: Replace this with your username checking API
    // Example structure for your API integration:
    /*
    const response = await fetch('YOUR_USERNAME_CHECK_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify({ username })
    });
    const data = await response.json();
    
    return {
      isAvailable: data.available,
      message: data.message
    };
    */

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const normalizedUsername = username.toLowerCase().trim();
    
    // Check against reserved usernames
    const reservedUsernames = ['admin', 'root', 'administrator', 'moderator', 'support', 'help', 'api', 'www'];
    if (reservedUsernames.includes(normalizedUsername)) {
      return {
        isAvailable: false,
        message: 'This username is reserved and cannot be used'
      };
    }

    // Check against existing usernames
    if (existingUsernames.includes(normalizedUsername)) {
      return {
        isAvailable: false,
        message: 'This username is already taken'
      };
    }

    return {
      isAvailable: true
    };

  } catch (error) {
    console.error('Username check error:', error);
    return {
      isAvailable: false,
      message: 'Unable to check username availability. Please try again.'
    };
  }
};

// Check if email is already registered
export const checkEmailRegistration = async (email: string): Promise<boolean> => {
  try {
    // TODO: Replace this with your email registration check API
    // Example structure for your API integration:
    /*
    const response = await fetch('YOUR_EMAIL_CHECK_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify({ email })
    });
    const data = await response.json();
    
    return data.exists;
    */

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulated registered emails
    const registeredEmails = [
      'john@example.com',
      'jane@example.com',
      'admin@test.com',
      'user@demo.com',
      'test@gmail.com',
      'existing@yahoo.com',
      'taken@hotmail.com'
    ];
    
    return registeredEmails.includes(email.toLowerCase());
  } catch (error) {
    console.error('Email registration check error:', error);
    return false;
  }
};