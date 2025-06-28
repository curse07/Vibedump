
import { useState } from 'react';
import CommunityCard from '../components/CommunityCard';
import CategoryFilter from '../components/CategoryFilter';
import SafetySection from '../components/SafetySection';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('All Communities');

  const categories = [
    'All Communities',
    'Mental Health',
    'Professional',
    'Relationships',
    'Academic',
    'Life Transitions'
  ];

  const communities = [
    {
      title: 'Anxiety Support Circle',
      description: 'A safe space for those dealing with anxiety, panic attacks, and worry.',
      tags: ['Mental Health', 'Peer Support'],
      memberCount: 156,
      status: 'active' as const
    },
    {
      title: 'Depression Warriors',
      description: 'Supporting each other through the darkness toward hope and healing.',
      tags: ['Mental Health', 'Mutual Aid'],
      memberCount: 203,
      status: 'active' as const
    },
    {
      title: 'Workplace Stress Relief',
      description: 'Navigate work-related stress, burnout, and career challenges together.',
      tags: ['Professional', 'Professional Focus'],
      memberCount: 89,
      status: 'inactive' as const
    },
    {
      title: 'Relationship Healing',
      description: 'Process relationship challenges, breakups, and building healthy connections.',
      tags: ['Relationships', 'Emotional Support'],
      memberCount: 134,
      status: 'active' as const
    },
    {
      title: 'Student Life Support',
      description: 'Academic pressure, social anxiety, and navigating student life.',
      tags: ['Academic', 'Peer Support'],
      memberCount: 178,
      status: 'active' as const
    },
    {
      title: 'Grief & Loss Circle',
      description: 'Supporting each other through loss, grief, and the healing process.',
      tags: ['Life Transitions', 'Specialized Care'],
      memberCount: 67,
      status: 'inactive' as const
    }
  ];

  const filteredCommunities = activeCategory === 'All Communities' 
    ? communities 
    : communities.filter(community => 
        community.tags.some(tag => tag === activeCategory)
      );

  return (
    <div className="min-h-screen font-avenir" style={{ backgroundColor: '#fffbf4' }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-avenir">
            Find Your Support Community
          </h1>
          <p className="text-lg text-gray-600 font-avenir font-light max-w-2xl mx-auto leading-relaxed">
            Connect with others who understand your experiences in safe, moderated, and completely anonymous spaces.
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Communities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredCommunities.map((community, index) => (
            <CommunityCard
              key={index}
              title={community.title}
              description={community.description}
              tags={community.tags}
              memberCount={community.memberCount}
              status={community.status}
            />
          ))}
        </div>

        {/* Safety Section */}
        <SafetySection />
      </div>
    </div>
  );
};

export default Index;
