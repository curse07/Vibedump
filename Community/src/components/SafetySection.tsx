
const SafetySection = () => {
  return (
    <div className="bg-green-50 rounded-lg p-8 mt-16">
      <div className="flex items-center mb-6">
        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
        <h2 className="text-2xl font-bold text-gray-900 font-avenir">Community Safety & Guidelines</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 font-avenir">Anonymous & Safe</h3>
          <ul className="space-y-3 text-gray-700 font-avenir font-light">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              Complete anonymity - no personal information required
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              24/7 moderation to ensure respectful interactions
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              Report system for inappropriate content
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              End-to-end encryption for all conversations
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4 font-avenir">Community Guidelines</h3>
          <ul className="space-y-3 text-gray-700 font-avenir font-light">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              Treat others with kindness and respect
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              No medical advice - seek professional help when needed
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              Share experiences, not personal details
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">•</span>
              Support each other without judgment
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SafetySection;
