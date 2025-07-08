import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const categories = [
    "Mental Health",
    "Community", 
    "Wellness",
    "Relationships",
    "Research",
    "Self-Care"
  ];

  return (
    <div className="min-h-screen font-avenir" style={{ backgroundColor: '#fffbf4' }}>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">
            Knowledge for Your Wellness Journey
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Discover evidence-based articles, expert insights, and practical resources to 
            support your mental health and emotional well-being.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles, topics, or keywords..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              onClick={() => setSelectedCategory(selectedCategory === category ? "" : category)}
              className={`rounded-full px-6 py-2 border transition-colors ${
                selectedCategory === category
                  ? "bg-green-600 text-white border-green-600 hover:bg-green-600 hover:text-white"
                  : "text-black border-gray-300 hover:bg-gray-50"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Articles */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 flex items-center">
            <span className="text-green-600 mr-2"></span>
            Featured Articles
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* First Featured Article */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Mental Health</span>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Featured</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Understanding Anxiety: A Comprehensive Guide to Managing Daily Stress
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn practical techniques for managing anxiety and building resilience in your daily life. 
                  Discover breathing exercises, mindfulness practices, and coping strategies.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Dr. Sarah Chen</span>
                  <span>12/01/2024</span>
                  <span>8 min read</span>
                </div>
                <div className="flex gap-2 mb-4">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#anxiety</span>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#stress management</span>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#coping skills</span>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Read Article
                </Button>
              </CardContent>
            </Card>

            {/* Second Featured Article */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Community</span>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Featured</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  The Power of Community in Mental Health Recovery
                </h3>
                <p className="text-gray-600 mb-4">
                  Explore how connecting with others can accelerate healing and provide crucial support during 
                  difficult times. Real stories from community members.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Marcus Johnson</span>
                  <span>11/01/2024</span>
                  <span>6 min read</span>
                </div>
                <div className="flex gap-2 mb-4">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#community</span>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#support</span>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#recovery</span>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Read Article
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Latest Articles */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Latest Articles
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Article 1 */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-4 inline-block">Wellness</span>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Mindfulness Practices for Emotional Regulation
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Simple, science-backed mindfulness techniques you can use anywhere to manage overwhelming emotions and find inner calm.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Dr. Emily Rodriguez</span>
                  <span>5 min read</span>
                </div>
                <div className="flex gap-2 mb-4">
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">#mindfulness</span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">#emotional regulation</span>
                </div>
                <Button variant="outline" className="w-full text-blue-600 border-blue-300 hover:bg-blue-50">
                  Read More
                </Button>
              </CardContent>
            </Card>

            {/* Article 2 */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm mb-4 inline-block">Mental Health</span>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Navigating Depression: Hope and Healing Strategies
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  A compassionate guide to understanding depression and practical steps toward recovery, including professional resources and self-care tips.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Dr. Michael Thompson</span>
                  <span>10 min read</span>
                </div>
                <div className="flex gap-2 mb-4">
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">#depression</span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">#healing</span>
                </div>
                <Button variant="outline" className="w-full text-purple-600 border-purple-300 hover:bg-purple-50">
                  Read More
                </Button>
              </CardContent>
            </Card>

            {/* Article 3 */}
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-6">
                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm mb-4 inline-block">Relationships</span>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Building Healthy Boundaries in Relationships
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Learn how to set and maintain healthy boundaries to protect your mental health while nurturing meaningful connections.
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Lisa Park</span>
                  <span>7 min read</span>
                </div>
                <div className="flex gap-2 mb-4">
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">#boundaries</span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">#relationships</span>
                </div>
                <Button variant="outline" className="w-full text-pink-600 border-pink-300 hover:bg-pink-50">
                  Read More
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Article */}
          <Card className="bg-white border-0 shadow-sm max-w-2xl">
            <CardContent className="p-6">
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm mb-4 inline-block">Research</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                The Science of Emotional Expression and Healing
              </h3>
              <p className="text-gray-600 mb-4">
                Research-backed insights into how expressing emotions through writing, art, and conversation can promote psychological healing.
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Dr. Jennifer Lee</span>
                <span>9 min read</span>
              </div>
              <div className="flex gap-2 mb-4">
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#emotional expression</span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#research</span>
              </div>
              <Button variant="outline" className="w-full text-orange-600 border-orange-300 hover:bg-orange-50">
                Read More
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
