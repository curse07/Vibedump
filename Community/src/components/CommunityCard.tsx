
import { Users } from 'lucide-react';

interface CommunityCardProps {
  title: string;
  description: string;
  tags: string[];
  memberCount: number;
  status: 'active' | 'inactive';
}

const CommunityCard = ({ title, description, tags, memberCount, status }: CommunityCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 font-avenir">{title}</h3>
        <div className={`w-3 h-3 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
      </div>
      
      <p className="text-gray-600 mb-4 font-avenir font-light leading-relaxed text-sm">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-avenir"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center text-gray-500 text-sm font-avenir mb-4">
        <Users className="w-4 h-4 mr-1" />
        <span>{memberCount} members</span>
      </div>
      
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-avenir font-medium transition-colors text-base">
        Join Community
      </button>
    </div>
  );
};

export default CommunityCard;
