import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleUpgrade = () => {
    navigate('/payment');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <img src="./microphone-black-shape.png" alt="Microphone" className="w-8 h-8 filter invert" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Premium Feature</h2>
            <p className="text-gray-600">Voice input is available with our Premium plan</p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
            <div className="text-3xl font-bold text-gray-800 mb-2">$49</div>
            <div className="text-gray-600 mb-4">One-time payment</div>
            <ul className="text-left text-sm text-gray-600 space-y-2">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Voice input support
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Advanced AI responses
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Priority support
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Unlimited conversations
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={handleUpgrade}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
            >
              Upgrade to Premium
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};