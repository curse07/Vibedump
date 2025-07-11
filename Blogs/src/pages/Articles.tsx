import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, Calendar, User, Share2, BookOpen } from "lucide-react";
import { articles } from "@/data/articlesData";

const ArticlePage = () => {
  const { id } = useParams();

  // Sample article data - in a real app, this would come from an API
  const articles = {
    "1": {
      title: "Understanding Anxiety: A Comprehensive Guide to Managing Daily Stress",
      description: "Learn practical techniques for managing anxiety and building resilience in your daily life. Discover breathing exercises, mindfulness practices, and coping strategies that can help you navigate challenging moments with greater ease and confidence.",
      author: "Dr. Sarah Chen",
      date: "December 1, 2024",
      readTime: "8 min read",
      category: "Mental Health",
      tags: ["anxiety", "stress management", "coping skills"],
      content: `
        <p>Anxiety is one of the most common mental health challenges faced by millions of people worldwide. It's a natural response to stress, but when it becomes overwhelming or persistent, it can significantly impact our daily lives, relationships, and overall well-being.</p>
        
        <h2>What is Anxiety?</h2>
        <p>Anxiety is your body's natural alarm system. When you perceive a threat, your brain triggers a cascade of changes in your body to help you respond to danger. This is often called the "fight-or-flight" response. While this system is designed to protect you, sometimes it can become overactive or triggered by situations that aren't actually dangerous.</p>
        
        <h2>Common Signs of Anxiety</h2>
        <p>Anxiety can manifest in various ways, both physically and emotionally:</p>
        <ul>
          <li><strong>Physical symptoms:</strong> Rapid heartbeat, sweating, trembling, shortness of breath, muscle tension, headaches, or stomachaches</li>
          <li><strong>Emotional symptoms:</strong> Feeling worried, restless, or on edge; having a sense of impending doom; difficulty concentrating</li>
          <li><strong>Behavioral symptoms:</strong> Avoiding certain situations, difficulty sleeping, irritability, or seeking constant reassurance</li>
        </ul>
        
        <h2>Practical Techniques for Managing Anxiety</h2>
        
        <h3>1. Deep Breathing Exercises</h3>
        <p>One of the most effective immediate tools for managing anxiety is controlled breathing. When we're anxious, our breathing often becomes shallow and rapid. By consciously slowing and deepening our breath, we can activate our body's relaxation response.</p>
        
        <div class="technique-box">
          <h4>The 4-7-8 Breathing Technique:</h4>
          <ol>
            <li>Inhale through your nose for 4 counts</li>
            <li>Hold your breath for 7 counts</li>
            <li>Exhale through your mouth for 8 counts</li>
            <li>Repeat 3-4 times</li>
          </ol>
        </div>
        
        <h3>2. Mindfulness and Grounding</h3>
        <p>Mindfulness involves paying attention to the present moment without judgment. When anxiety strikes, our minds often race to worst-case scenarios or get stuck in worry loops. Grounding techniques can help bring you back to the here and now.</p>
        
        <div class="technique-box">
          <h4>The 5-4-3-2-1 Grounding Technique:</h4>
          <ul>
            <li>5 things you can see</li>
            <li>4 things you can touch</li>
            <li>3 things you can hear</li>
            <li>2 things you can smell</li>
            <li>1 thing you can taste</li>
          </ul>
        </div>
        
        <h3>3. Progressive Muscle Relaxation</h3>
        <p>This technique involves tensing and then relaxing different muscle groups in your body. It helps you become more aware of physical tension and teaches you how to release it.</p>
        
        <h3>4. Cognitive Techniques</h3>
        <p>Our thoughts play a crucial role in how we experience anxiety. Learning to identify and challenge anxious thoughts can be incredibly powerful:</p>
        <ul>
          <li><strong>Identify the thought:</strong> What specific thought is making you anxious?</li>
          <li><strong>Examine the evidence:</strong> Is this thought based on facts or assumptions?</li>
          <li><strong>Consider alternatives:</strong> What other ways could you look at this situation?</li>
          <li><strong>Ask yourself:</strong> What would you tell a friend in this situation?</li>
        </ul>
        
        <h2>Building Long-term Resilience</h2>
        <p>While these techniques can provide immediate relief, building long-term resilience against anxiety requires consistent practice and lifestyle adjustments:</p>
        
        <ul>
          <li><strong>Regular exercise:</strong> Physical activity is one of the most effective tools for managing anxiety</li>
          <li><strong>Adequate sleep:</strong> Aim for 7-9 hours of quality sleep each night</li>
          <li><strong>Limit caffeine and alcohol:</strong> Both can exacerbate anxiety symptoms</li>
          <li><strong>Connect with others:</strong> Social support is crucial for mental health</li>
          <li><strong>Practice self-compassion:</strong> Treat yourself with the same kindness you'd show a good friend</li>
        </ul>
        
        <h2>When to Seek Professional Help</h2>
        <p>While these self-help strategies can be very effective, sometimes professional support is necessary. Consider reaching out to a mental health professional if:</p>
        <ul>
          <li>Your anxiety is interfering with daily activities</li>
          <li>You're avoiding important situations due to anxiety</li>
          <li>You're experiencing panic attacks</li>
          <li>Your anxiety is affecting your relationships or work</li>
          <li>You're using alcohol or substances to cope</li>
        </ul>
        
        <h2>Remember: You're Not Alone</h2>
        <p>Experiencing anxiety doesn't mean you're weak or broken. It's a common human experience, and with the right tools and support, it's entirely manageable. Be patient with yourself as you learn and practice these techniques. Recovery is a journey, not a destination.</p>
        
        <p>Start small, be consistent, and remember that seeking help is a sign of strength, not weakness. You deserve to feel calm, confident, and in control of your life.</p>
      `
    },
    "2": {
      title: "The Power of Community in Mental Health Recovery",
      description: "Explore how connecting with others can accelerate healing and provide crucial support during difficult times. Real stories from community members and practical guidance on building meaningful connections.",
      author: "Marcus Johnson",
      date: "November 1, 2024",
      readTime: "6 min read",
      category: "Community",
      tags: ["community", "support", "recovery"],
      content: `
        <p>Mental health recovery is rarely a journey we can navigate alone. While personal resilience and professional support are crucial, the power of community connection often proves to be the missing piece that accelerates healing and provides hope during our darkest moments.</p>
        
        <h2>Why Community Matters in Mental Health</h2>
        <p>Human beings are inherently social creatures. Our mental health is deeply intertwined with our sense of belonging, connection, and purpose within a community. When we're struggling with mental health challenges, isolation can make everything feel worse, while genuine connection can provide the lifeline we need.</p>
        
        <h3>The Science Behind Social Support</h3>
        <p>Research consistently shows that strong social connections:</p>
        <ul>
          <li>Reduce stress hormones like cortisol</li>
          <li>Boost immune system function</li>
          <li>Increase production of oxytocin, the "bonding hormone"</li>
          <li>Improve overall life satisfaction and longevity</li>
          <li>Provide protective factors against depression and anxiety</li>
        </ul>
        
        <h2>Real Stories of Community Impact</h2>
        
        <h3>Sarah's Story: Finding Hope in Shared Experience</h3>
        <p>"I felt completely alone in my struggle with depression until I joined a local support group. Hearing others share similar experiences made me realize I wasn't 'broken' or unusual. The group became my lifeline during the hardest months of my recovery. Having people who truly understood what I was going through made all the difference."</p>
        
        <h3>Miguel's Journey: From Isolation to Connection</h3>
        <p>"After my anxiety became overwhelming, I withdrew from everyone. My therapist encouraged me to try online communities first, since in-person felt too intimidating. Starting with anonymous forums, then video support groups, and finally local meetups helped me gradually rebuild my confidence in connecting with others."</p>
        
        <h2>Types of Supportive Communities</h2>
        
        <h3>Peer Support Groups</h3>
        <p>These groups bring together people with similar experiences or challenges. Whether focused on specific conditions like depression, anxiety, or addiction, or broader themes like grief or life transitions, peer support groups offer:</p>
        <ul>
          <li>Shared understanding and validation</li>
          <li>Practical coping strategies from those who've been there</li>
          <li>Reduced stigma and shame</li>
          <li>Hope through witnessing others' recovery journeys</li>
        </ul>
        
        <h3>Online Communities</h3>
        <p>Digital platforms can provide accessible support, especially for those who face barriers to in-person connection:</p>
        <ul>
          <li>24/7 availability for crisis moments</li>
          <li>Anonymity for those not ready to share openly</li>
          <li>Access to diverse perspectives and experiences</li>
          <li>Connection across geographical boundaries</li>
        </ul>
        
        <h3>Therapeutic Communities</h3>
        <p>Professionally facilitated groups that combine peer support with clinical expertise:</p>
        <ul>
          <li>Structured healing approaches</li>
          <li>Professional guidance and safety</li>
          <li>Skill-building workshops</li>
          <li>Integration of therapeutic techniques</li>
        </ul>
        
        <h2>How to Find Your Community</h2>
        
        <h3>Start Where You Feel Comfortable</h3>
        <p>There's no wrong way to begin connecting. Some people feel ready for in-person groups, while others need to start online or with smaller, less formal connections. Honor your own pace and comfort level.</p>
        
        <h3>Resources for Finding Support</h3>
        <ul>
          <li><strong>Mental Health America:</strong> Offers support group directories</li>
          <li><strong>NAMI (National Alliance on Mental Illness):</strong> Provides local chapter information</li>
          <li><strong>Psychology Today:</strong> Lists support groups by location and focus</li>
          <li><strong>Local hospitals and community centers:</strong> Often host support groups</li>
          <li><strong>Religious or spiritual communities:</strong> May offer care groups or counseling</li>
          <li><strong>Workplace Employee Assistance Programs:</strong> Can provide referrals</li>
        </ul>
        
        <h2>Building Meaningful Connections</h2>
        
        <h3>Quality Over Quantity</h3>
        <p>You don't need a large network to benefit from community support. Often, one or two genuine connections can provide more support than a dozen superficial relationships.</p>
        
        <h3>Reciprocity and Giving Back</h3>
        <p>As you receive support, you'll often find opportunities to support others. This reciprocity is healing for both giver and receiver and helps create sustainable, mutual support networks.</p>
        
        <h3>Boundaries and Self-Care</h3>
        <p>While community support is powerful, it's important to maintain healthy boundaries. Not every person or group will be the right fit, and that's okay. It's also crucial to continue professional treatment alongside community support.</p>
        
        <h2>Creating Community Where None Exists</h2>
        <p>Sometimes the community you need doesn't exist yet. Consider:</p>
        <ul>
          <li>Starting a small group with one or two others facing similar challenges</li>
          <li>Organizing informal meetups or coffee gatherings</li>
          <li>Creating online spaces for connection</li>
          <li>Partnering with local organizations to launch new support initiatives</li>
        </ul>
        
        <h2>The Ripple Effect of Community Healing</h2>
        <p>When individuals heal within supportive communities, the benefits extend far beyond the individual. Families become stronger, workplaces become more compassionate, and entire communities become more resilient and mentally healthy.</p>
        
        <p>Your journey toward connection and healing doesn't just transform your own life—it contributes to a culture where mental health is prioritized, stigma is reduced, and support is readily available for all who need it.</p>
        
        <p>Remember: seeking community isn't a sign of weakness; it's a recognition of our fundamental human need for connection and the wisdom to use one of our most powerful tools for healing.</p>
      `
    }
  };

  const article = articles[id as keyof typeof articles];

  if (!article) {
    return (
      <div className="min-h-screen bg-wellness-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-wellness-text mb-4">Article not found</h1>
          <Button asChild>
            <Link to="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-wellness-bg">
      {/* Navigation */}
      <div className="border-b bg-background">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Button variant="ghost" asChild>
            <Link to="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-primary text-primary-foreground">
            {article.category}
          </Badge>
          
          <h1 className="text-4xl font-bold text-wellness-text mb-4 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-wellness-text-light mb-8 leading-relaxed">
            {article.description}
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-wellness-text-light">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="border-border">
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-6 text-wellness-text-light">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm">Reading time: {article.readTime}</span>
            </div>
            
            <div 
              className="prose prose-lg prose-wellness max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="border-border bg-accent">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-wellness-text mb-4">
                Found this helpful?
              </h3>
              <p className="text-wellness-text-light mb-6">
                Explore more articles to support your wellness journey
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/blogs">
                  Explore More Articles
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;