import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Sparkles, Star, Wand2, Heart, Moon, Sun, Zap, Rainbow } from 'lucide-react';

const magicalQuotes = [
  {
    text: "Believe in the magic within you.",
    author: "Unknown"
  },
  {
    text: "Magic is believing in yourself. If you can do that, you can make anything happen.",
    author: "Johann Wolfgang von Goethe"
  },
  {
    text: "The real magic is in the work.",
    author: "Unknown"
  },
  {
    text: "You have been assigned this mountain to show others it can be moved.",
    author: "Mel Robbins"
  },
  {
    text: "Magic happens when you don't give up, even though you want to.",
    author: "Unknown"
  },
  {
    text: "The magic you're looking for is in the work you're avoiding.",
    author: "Unknown"
  }
];

const magicalActivities = [
  {
    id: 'gratitude',
    title: 'Gratitude Practice',
    description: 'List three things you\'re grateful for today',
    icon: <Heart className="w-8 h-8 text-pink-400" />,
    color: 'from-pink-100 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20'
  },
  {
    id: 'visualization',
    title: 'Dream Visualization',
    description: 'Spend 5 minutes visualizing your ideal day',
    icon: <Moon className="w-8 h-8 text-purple-400" />,
    color: 'from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20'
  },
  {
    id: 'affirmations',
    title: 'Positive Affirmations',
    description: 'Repeat empowering affirmations to yourself',
    icon: <Sun className="w-8 h-8 text-yellow-400" />,
    color: 'from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20'
  },
  {
    id: 'magic-moments',
    title: 'Notice Magic Moments',
    description: 'Find beauty in small, everyday moments',
    icon: <Sparkles className="w-8 h-8 text-cyan-400" />,
    color: 'from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20'
  },
  {
    id: 'intention-setting',
    title: 'Set Daily Intentions',
    description: 'Choose your focus and energy for the day',
    icon: <Wand2 className="w-8 h-8 text-emerald-400" />,
    color: 'from-emerald-100 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20'
  },
  {
    id: 'manifestation',
    title: 'Manifestation Ritual',
    description: 'Write down your dreams and believe in them',
    icon: <Star className="w-8 h-8 text-amber-400" />,
    color: 'from-amber-100 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20'
  }
];

export default function Magic() {
  const [currentQuote, setCurrentQuote] = useState(magicalQuotes[0]);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * magicalQuotes.length);
    setCurrentQuote(magicalQuotes[randomIndex]);
  };

  const toggleActivity = (activityId: string) => {
    if (completedActivities.includes(activityId)) {
      setCompletedActivities(completedActivities.filter(id => id !== activityId));
    } else {
      setCompletedActivities([...completedActivities, activityId]);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gradient-to-br from-background via-background/95 to-muted p-6">
      <div className="max-w-6xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-12 h-12 text-purple-400" />
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              Daily Magic
            </h1>
            <Sparkles className="w-12 h-12 text-purple-400" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the extraordinary in the ordinary. Create magical moments and manifest positivity in your daily life.
          </p>
        </div>

        {/* Inspirational Quote Card */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-800">
          <CardContent className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <Rainbow className="w-16 h-16 text-purple-400" />
            </div>
            <blockquote className="text-xl lg:text-2xl font-medium text-foreground italic leading-relaxed">
              "{currentQuote.text}"
            </blockquote>
            <footer className="text-muted-foreground text-lg">
              — {currentQuote.author}
            </footer>
            <Button 
              onClick={getRandomQuote}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              New Magic Quote
            </Button>
          </CardContent>
        </Card>

        {/* Magical Activities Grid */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-foreground">
            Today's Magical Practices
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {magicalActivities.map((activity) => {
              const isCompleted = completedActivities.includes(activity.id);
              
              return (
                <Card 
                  key={activity.id}
                  className={`group transition-all duration-300 cursor-pointer border-2 ${
                    isCompleted 
                      ? 'bg-green-50/80 dark:bg-green-950/20 border-green-300 dark:border-green-700 shadow-md' 
                      : 'hover:shadow-lg hover:-translate-y-1 bg-white/60 dark:bg-gray-900/60 border-border/30 hover:border-purple-300 dark:hover:border-purple-600'
                  }`}
                  onClick={() => toggleActivity(activity.id)}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className={`h-32 rounded-xl bg-gradient-to-br ${activity.color} flex items-center justify-center relative overflow-hidden`}>
                      {activity.icon}
                      {isCompleted && (
                        <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                          <div className="bg-green-500 text-white rounded-full p-2">
                            ✓
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {activity.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {activity.description}
                      </p>
                    </div>

                    <Button 
                      variant={isCompleted ? "default" : "outline"} 
                      className={`w-full ${
                        isCompleted 
                          ? 'bg-green-500 hover:bg-green-600 text-white' 
                          : 'hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-950/50'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleActivity(activity.id);
                      }}
                    >
                      {isCompleted ? (
                        <>
                          <Star className="w-4 h-4 mr-2" />
                          Completed ✨
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Begin Magic
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Progress Summary */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Today's Magic Progress
              </h3>
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {completedActivities.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                    {magicalActivities.length - completedActivities.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Remaining</div>
                </div>
              </div>
              
              {completedActivities.length === magicalActivities.length && (
                <div className="mt-4 p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                  <p className="text-lg font-medium text-foreground">
                    🌟 Magical! You've completed all today's practices! 🌟
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    You're radiating positive energy and creating magic in your life!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
