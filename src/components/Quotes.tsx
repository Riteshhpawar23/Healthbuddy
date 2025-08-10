import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Heart, HeartOff, Copy, Share2, Bell, BellOff, Sunrise, Leaf, Cloud } from 'lucide-react';

interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
  description: string;
}

const inspirationalQuotes: Quote[] = [
  // Original quotes
  {
    id: 1,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Motivation",
    description: "A reminder that passion fuels excellence"
  },
  {
    id: 2,
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "Confidence",
    description: "The power of positive thinking and self-belief"
  },
  {
    id: 3,
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
    category: "Mindfulness",
    description: "Finding inner calm through self-awareness"
  },
  {
    id: 4,
    text: "The present moment is the only time over which we have dominion.",
    author: "Thích Nhất Hạnh",
    category: "Mindfulness",
    description: "Embracing the power of now"
  },
  {
    id: 5,
    text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
    author: "Unknown",
    category: "Self-Care",
    description: "A gentle reminder to prioritize your wellbeing"
  },
  {
    id: 6,
    text: "You have been assigned this mountain to show others it can be moved.",
    author: "Mel Robbins",
    category: "Resilience",
    description: "Transforming challenges into inspiration"
  },
  {
    id: 7,
    text: "Progress, not perfection.",
    author: "Unknown",
    category: "Growth",
    description: "Embracing the journey of continuous improvement"
  },
  {
    id: 8,
    text: "Healing isn't about getting back to who you were. It's about becoming who you're meant to be.",
    author: "Unknown",
    category: "Healing",
    description: "Finding growth through adversity"
  },
  {
    id: 9,
    text: "You are enough. You have enough. You do enough.",
    author: "Unknown",
    category: "Self-Love",
    description: "Affirmation of your inherent worth"
  },
  {
    id: 10,
    text: "The greatest revolution of our generation is the discovery that human beings, by changing the inner attitudes of their minds, can change the outer aspects of their lives.",
    author: "William James",
    category: "Mindset",
    description: "The transformative power of perspective"
  },
  {
    id: 11,
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
    category: "Inner Strength",
    description: "Discovering your inner power"
  },
  {
    id: 12,
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    category: "Authenticity",
    description: "Celebrating your unique self"
  },

  // New Mental Health focused quotes
  {
    id: 13,
    text: "Mental health… is just as important as physical health.",
    author: "Unknown",
    category: "Mental Health",
    description: "Recognizing the equal importance of mental wellness"
  },
  {
    id: 14,
    text: "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman",
    category: "Mental Health",
    description: "Finding freedom from overwhelming thoughts"
  },
  {
    id: 15,
    text: "It's okay to not be okay — but it's not okay to stay that way.",
    author: "Unknown",
    category: "Mental Health",
    description: "Permission to struggle while encouraging growth"
  },
  {
    id: 16,
    text: "The strongest people are those who win battles we know nothing about.",
    author: "Unknown",
    category: "Strength",
    description: "Honoring invisible struggles and quiet victories"
  },
  {
    id: 17,
    text: "What mental health needs is more sunlight, more candor, and more unashamed conversation.",
    author: "Glenn Close",
    category: "Mental Health",
    description: "Breaking stigma through open dialogue"
  },
  {
    id: 18,
    text: "Don't let your struggle become your identity.",
    author: "Unknown",
    category: "Recovery",
    description: "You are more than your challenges"
  },
  {
    id: 19,
    text: "You can be a masterpiece and a work in progress at the same time.",
    author: "Sophia Bush",
    category: "Self-Love",
    description: "Embracing your ongoing journey of growth"
  },
  {
    id: 20,
    text: "Healing is not linear.",
    author: "Unknown",
    category: "Healing",
    description: "Understanding the ups and downs of recovery"
  },
  {
    id: 21,
    text: "There is hope, even when your brain tells you there isn't.",
    author: "John Green",
    category: "Hope",
    description: "Finding light in the darkest moments"
  },

  // Anxiety quotes
  {
    id: 22,
    text: "Anxiety does not empty tomorrow of its sorrows, but only empties today of its strength.",
    author: "Charles Spurgeon",
    category: "Anxiety",
    description: "Understanding how worry affects our present moment"
  },
  {
    id: 23,
    text: "Slow breathing is like an anchor in the midst of an emotional storm.",
    author: "Unknown",
    category: "Anxiety",
    description: "The power of breath in calming anxiety"
  },
  {
    id: 24,
    text: "Your mind is a garden. Your thoughts are the seeds. You can grow flowers or you can grow weeds.",
    author: "Unknown",
    category: "Anxiety",
    description: "Taking control of your mental landscape"
  },
  {
    id: 25,
    text: "Feelings are just visitors. Let them come and go.",
    author: "Mooji",
    category: "Anxiety",
    description: "Learning to observe emotions without attachment"
  },
  {
    id: 26,
    text: "You are not your anxiety.",
    author: "Unknown",
    category: "Anxiety",
    description: "Separating yourself from anxious thoughts"
  },
  {
    id: 27,
    text: "The greatest weapon against stress is our ability to choose one thought over another.",
    author: "William James",
    category: "Anxiety",
    description: "The power of conscious thought selection"
  },

  // Depression quotes
  {
    id: 28,
    text: "Depression is being colorblind and constantly told how colorful the world is.",
    author: "Atticus",
    category: "Depression",
    description: "Validating the experience of those with depression"
  },
  {
    id: 29,
    text: "You are allowed to take your time to heal.",
    author: "Unknown",
    category: "Depression",
    description: "Permission to heal at your own pace"
  },
  {
    id: 30,
    text: "If you're going through hell, keep going.",
    author: "Winston Churchill",
    category: "Depression",
    description: "Perseverance through the darkest times"
  },
  {
    id: 31,
    text: "Even the darkest night will end and the sun will rise.",
    author: "Victor Hugo",
    category: "Depression",
    description: "Hope for brighter days ahead"
  },
  {
    id: 32,
    text: "You are more than the sadness you feel.",
    author: "Unknown",
    category: "Depression",
    description: "Your identity beyond depression"
  },
  {
    id: 33,
    text: "Your illness does not define you. Your strength and courage do.",
    author: "Unknown",
    category: "Depression",
    description: "Focusing on resilience rather than diagnosis"
  },

  // Healing and Recovery
  {
    id: 34,
    text: "Healing takes time, and asking for help is a courageous step.",
    author: "Mariska Hargitay",
    category: "Healing",
    description: "The bravery required to seek support"
  },
  {
    id: 35,
    text: "You can't pour from an empty cup. Take care of yourself first.",
    author: "Unknown",
    category: "Self-Care",
    description: "The necessity of self-care before caring for others"
  },
  {
    id: 36,
    text: "One small crack does not mean you are broken — it means you were put to the test and didn't fall apart.",
    author: "Linda Poindexter",
    category: "Resilience",
    description: "Reframing damage as evidence of strength"
  },
  {
    id: 37,
    text: "You survived 100% of your worst days.",
    author: "Unknown",
    category: "Strength",
    description: "Recognition of your proven resilience"
  },
  {
    id: 38,
    text: "Scars are proof you were stronger than whatever tried to hurt you.",
    author: "Unknown",
    category: "Healing",
    description: "Viewing scars as badges of survival"
  },
  {
    id: 39,
    text: "Rest is not laziness. Rest is medicine.",
    author: "Unknown",
    category: "Self-Care",
    description: "Reframing rest as essential healing"
  },

  // Strength and Resilience
  {
    id: 40,
    text: "You never know how strong you are until being strong is your only choice.",
    author: "Bob Marley",
    category: "Strength",
    description: "Discovering inner strength through necessity"
  },
  {
    id: 41,
    text: "Fall seven times and stand up eight.",
    author: "Japanese Proverb",
    category: "Resilience",
    description: "The power of getting back up"
  },
  {
    id: 42,
    text: "You can't stop the waves, but you can learn to surf.",
    author: "Jon Kabat-Zinn",
    category: "Resilience",
    description: "Adapting to life's inevitable challenges"
  },
  {
    id: 43,
    text: "Stars can't shine without darkness.",
    author: "Unknown",
    category: "Strength",
    description: "Finding beauty and purpose in difficult times"
  },
  {
    id: 44,
    text: "The comeback is always stronger than the setback.",
    author: "Unknown",
    category: "Resilience",
    description: "Hope for returning stronger from adversity"
  },

  // Self-Love and Compassion
  {
    id: 45,
    text: "Talk to yourself like someone you love.",
    author: "Brené Brown",
    category: "Self-Love",
    description: "Practicing self-compassion in your inner dialogue"
  },
  {
    id: 46,
    text: "Loving yourself is the greatest revolution.",
    author: "Unknown",
    category: "Self-Love",
    description: "The radical act of self-acceptance"
  },
  {
    id: 47,
    text: "Be patient with yourself; nothing in nature blooms all year.",
    author: "Unknown",
    category: "Self-Love",
    description: "Accepting your natural seasons of growth"
  },
  {
    id: 48,
    text: "Self-care is giving the world the best of you, instead of what's left of you.",
    author: "Katie Reed",
    category: "Self-Care",
    description: "Self-care as service to others"
  },
  {
    id: 49,
    text: "Your relationship with yourself sets the tone for every other relationship you have.",
    author: "Unknown",
    category: "Self-Love",
    description: "The foundation of all relationships"
  },

  // Short Affirmations
  {
    id: 50,
    text: "I am safe. I am calm. I am in control.",
    author: "Unknown",
    category: "Affirmations",
    description: "Grounding affirmation for anxious moments"
  },
  {
    id: 51,
    text: "I am worthy of love and joy.",
    author: "Unknown",
    category: "Affirmations",
    description: "Affirming your inherent worth"
  },
  {
    id: 52,
    text: "I choose peace over worry.",
    author: "Unknown",
    category: "Affirmations",
    description: "Conscious choice of emotional state"
  },
  {
    id: 53,
    text: "I am stronger than my struggles.",
    author: "Unknown",
    category: "Affirmations",
    description: "Affirmation of inner strength"
  },
  {
    id: 54,
    text: "This feeling is temporary.",
    author: "Unknown",
    category: "Affirmations",
    description: "Reminder that difficult emotions pass"
  },

  // Hope and Encouragement
  {
    id: 55,
    text: "Hope is being able to see that there is light despite all of the darkness.",
    author: "Desmond Tutu",
    category: "Hope",
    description: "Finding light in the midst of struggle"
  },
  {
    id: 56,
    text: "Your story is not over.",
    author: "Unknown",
    category: "Hope",
    description: "Reminder that there are more chapters ahead"
  },
  {
    id: 57,
    text: "You are allowed to start again and again.",
    author: "Unknown",
    category: "Hope",
    description: "Permission for fresh beginnings"
  },
  {
    id: 58,
    text: "Storms make trees take deeper roots.",
    author: "Dolly Parton",
    category: "Growth",
    description: "How challenges can strengthen us"
  },
  {
    id: 59,
    text: "You are capable of amazing things.",
    author: "Unknown",
    category: "Encouragement",
    description: "Belief in your potential"
  },

  // Letting Go and Mindfulness
  {
    id: 60,
    text: "Let go or be dragged.",
    author: "Zen Proverb",
    category: "Mindfulness",
    description: "The choice between release and suffering"
  },
  {
    id: 61,
    text: "Be where your feet are.",
    author: "Unknown",
    category: "Mindfulness",
    description: "Simple reminder to stay present"
  },
  {
    id: 62,
    text: "Don't believe everything you think.",
    author: "Unknown",
    category: "Mindfulness",
    description: "Questioning automatic thoughts"
  },
  {
    id: 63,
    text: "You can't heal what you won't feel.",
    author: "Unknown",
    category: "Healing",
    description: "The necessity of facing difficult emotions"
  },

  // Inspiration to Keep Going
  {
    id: 64,
    text: "One day you will tell your story of how you overcame what you went through and it will be someone else's survival guide.",
    author: "Brené Brown",
    category: "Hope",
    description: "Your healing journey can inspire others"
  },
  {
    id: 65,
    text: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe",
    category: "Encouragement",
    description: "Taking action with available resources"
  },
  {
    id: 66,
    text: "Small steps every day lead to big changes.",
    author: "Unknown",
    category: "Growth",
    description: "The power of consistent small actions"
  },
  {
    id: 67,
    text: "You are braver than you believe, stronger than you seem, and smarter than you think.",
    author: "A.A. Milne",
    category: "Strength",
    description: "Recognition of hidden inner resources"
  },
  {
    id: 68,
    text: "No feeling is final.",
    author: "Rainer Maria Rilke",
    category: "Hope",
    description: "The temporary nature of all emotions"
  },
  {
    id: 69,
    text: "This too shall pass.",
    author: "Persian Proverb",
    category: "Hope",
    description: "Ancient wisdom about impermanence"
  },
  {
    id: 70,
    text: "You've got this, even when you think you don't.",
    author: "Unknown",
    category: "Encouragement",
    description: "Confidence even in moments of doubt"
  }
];

const categoryColors = {
  "Motivation": "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "Confidence": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Mindfulness": "bg-green-500/20 text-green-300 border-green-500/30",
  "Self-Care": "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "Resilience": "bg-red-500/20 text-red-300 border-red-500/30",
  "Growth": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Healing": "bg-teal-500/20 text-teal-300 border-teal-500/30",
  "Self-Love": "bg-rose-500/20 text-rose-300 border-rose-500/30",
  "Mindset": "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  "Inner Strength": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Authenticity": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "Mental Health": "bg-violet-500/20 text-violet-300 border-violet-500/30",
  "Strength": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "Recovery": "bg-lime-500/20 text-lime-300 border-lime-500/30",
  "Hope": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "Anxiety": "bg-blue-400/20 text-blue-300 border-blue-400/30",
  "Depression": "bg-purple-400/20 text-purple-300 border-purple-400/30",
  "Affirmations": "bg-pink-400/20 text-pink-300 border-pink-400/30",
  "Encouragement": "bg-green-400/20 text-green-300 border-green-400/30"
};

export default function Quotes() {
  const [dailyQuote, setDailyQuote] = useState<Quote | null>(null);
  const [reflection, setReflection] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [copiedQuote, setCopiedQuote] = useState<boolean>(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);
  const [showAllQuotes, setShowAllQuotes] = useState<boolean>(false);

  // Get quote of the day (based on current date)
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const quoteIndex = dayOfYear % inspirationalQuotes.length;
    const todaysQuote = inspirationalQuotes[quoteIndex];
    setDailyQuote(todaysQuote);

    // Check if this quote is favorited (from localStorage)
    const favorites = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
    setIsFavorite(favorites.includes(todaysQuote.id));

    // Load reflection for today's quote
    const savedReflection = localStorage.getItem(`reflection-${todaysQuote.id}`);
    if (savedReflection) {
      setReflection(savedReflection);
    }

    // Check notification settings
    const notifEnabled = localStorage.getItem('quoteNotifications') === 'true';
    setNotificationsEnabled(notifEnabled);
  }, []);

  const toggleFavorite = () => {
    if (!dailyQuote) return;
    
    const favorites = JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
    let updatedFavorites;
    
    if (isFavorite) {
      updatedFavorites = favorites.filter((id: number) => id !== dailyQuote.id);
    } else {
      updatedFavorites = [...favorites, dailyQuote.id];
    }
    
    localStorage.setItem('favoriteQuotes', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  const copyQuote = async () => {
    if (!dailyQuote) return;
    
    const text = `"${dailyQuote.text}" - ${dailyQuote.author}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedQuote(true);
      setTimeout(() => setCopiedQuote(false), 2000);
    } catch (err) {
      console.error('Failed to copy quote:', err);
    }
  };

  const shareQuote = async () => {
    if (!dailyQuote) return;
    
    const text = `"${dailyQuote.text}" - ${dailyQuote.author}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quote of the Day',
          text: text,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyQuote();
    }
  };

  const toggleNotifications = () => {
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);
    localStorage.setItem('quoteNotifications', newState.toString());
    
    if (newState && 'Notification' in window) {
      Notification.requestPermission();
    }
  };

  const saveReflection = (value: string) => {
    setReflection(value);
    if (dailyQuote) {
      localStorage.setItem(`reflection-${dailyQuote.id}`, value);
    }
  };

  if (!dailyQuote) {
    return <div className="flex-1 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20">
        {/* Floating Nature Elements */}
        <div className="absolute top-10 left-10 animate-pulse opacity-30">
          <Cloud className="w-16 h-16 text-blue-300" />
        </div>
        <div className="absolute top-20 right-20 animate-bounce opacity-40">
          <Sunrise className="w-12 h-12 text-orange-300" />
        </div>
        <div className="absolute bottom-20 left-20 animate-pulse opacity-35">
          <Leaf className="w-14 h-14 text-green-300" />
        </div>
        <div className="absolute bottom-32 right-16 animate-bounce opacity-30">
          <Cloud className="w-10 h-10 text-purple-300" />
        </div>
        <div className="absolute top-1/2 left-1/4 animate-pulse opacity-25">
          <Leaf className="w-8 h-8 text-emerald-300" />
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col p-6">
        <div className="max-w-4xl mx-auto w-full space-y-8 flex-1 flex flex-col justify-center">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              Inspirational Quotes
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover wisdom and motivation from great minds to inspire your journey
            </p>
          </div>

          {/* Quote of the Day Card */}
          <Card className="backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-0 shadow-2xl relative overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-purple-100/30 dark:from-gray-800/50 dark:to-purple-900/20 pointer-events-none" />
            
            <CardContent className="relative p-8 lg:p-12 space-y-8">
              {/* Quote of the Day Header */}
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-primary mb-2 flex items-center justify-center gap-2">
                  <Sunrise className="w-6 h-6" />
                  Quote of the Day
                </h2>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              {/* Main Quote */}
              <div className="text-center space-y-6">
                <blockquote className="text-2xl lg:text-3xl font-light text-foreground leading-relaxed tracking-wide px-4">
                  "{dailyQuote.text}"
                </blockquote>
                <cite className="text-lg font-medium text-primary not-italic">
                  — {dailyQuote.author}
                </cite>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  {dailyQuote.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  onClick={toggleFavorite}
                  variant={isFavorite ? "default" : "outline"}
                  size="lg"
                  className="flex items-center gap-2 px-6"
                >
                  {isFavorite ? (
                    <Heart className="w-5 h-5 fill-current" />
                  ) : (
                    <HeartOff className="w-5 h-5" />
                  )}
                  {isFavorite ? 'Saved' : 'Save'}
                </Button>

                <Button
                  onClick={copyQuote}
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2 px-6"
                >
                  <Copy className="w-5 h-5" />
                  {copiedQuote ? 'Copied!' : 'Copy'}
                </Button>

                <Button
                  onClick={shareQuote}
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2 px-6"
                >
                  <Share2 className="w-5 h-5" />
                  Share
                </Button>

                <Button
                  onClick={toggleNotifications}
                  variant={notificationsEnabled ? "default" : "outline"}
                  size="lg"
                  className="flex items-center gap-2 px-6"
                >
                  {notificationsEnabled ? (
                    <Bell className="w-5 h-5" />
                  ) : (
                    <BellOff className="w-5 h-5" />
                  )}
                  Notify
                </Button>
              </div>

              {/* Reflection Section */}
              <div className="space-y-4 max-w-2xl mx-auto">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    💭 Personal Reflection
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    How does this quote relate to your day? What thoughts or feelings does it inspire?
                  </p>
                </div>
                
                <Textarea
                  placeholder="Write your thoughts about today's quote... How does it speak to you? What does it remind you of in your life right now?"
                  value={reflection}
                  onChange={(e) => saveReflection(e.target.value)}
                  className="min-h-[120px] bg-white/50 dark:bg-gray-800/50 border-border/30 focus:border-primary/50 resize-none text-base leading-relaxed"
                />
                
                {reflection && (
                  <p className="text-xs text-muted-foreground text-center">
                    ✨ Your reflection has been saved automatically
                  </p>
                )}
              </div>

              {/* Browse More Quotes Button */}
              <div className="text-center">
                <Button
                  onClick={() => setShowAllQuotes(!showAllQuotes)}
                  variant="ghost"
                  className="text-primary hover:text-primary/80"
                >
                  {showAllQuotes ? 'Hide' : 'Browse'} More Quotes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* All Quotes Grid (when expanded) */}
          {showAllQuotes && (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-center text-foreground">
                More Inspirational Quotes
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {inspirationalQuotes.filter(quote => quote.id !== dailyQuote.id).map((quote) => (
                  <Card 
                    key={quote.id}
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-border/30"
                  >
                    <CardContent className="p-6 space-y-4">
                      <blockquote className="text-base font-medium text-foreground italic leading-relaxed">
                        "{quote.text}"
                      </blockquote>
                      <cite className="text-sm font-semibold text-primary not-italic">
                        — {quote.author}
                      </cite>
                      <p className="text-xs text-muted-foreground">
                        {quote.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
