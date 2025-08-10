import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Sprout, Sun, Droplets, Flower, Heart, Star, CheckCircle, Sparkles } from 'lucide-react';

interface WellnessActivity {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  completed: boolean;
}

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  totalActivities: number;
  milestones: number[];
}

const wellnessActivities: WellnessActivity[] = [
  {
    id: 'journal',
    name: 'Journaling',
    icon: <Heart className="w-6 h-6" />,
    color: 'text-pink-400',
    completed: false
  },
  {
    id: 'doodle',
    name: 'Creative Doodling',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'text-purple-400',
    completed: false
  },
  {
    id: 'exercise',
    name: 'Mental Health Exercise',
    icon: <Flower className="w-6 h-6" />,
    color: 'text-green-400',
    completed: false
  },
  {
    id: 'music',
    name: 'Calming Music',
    icon: <Sun className="w-6 h-6" />,
    color: 'text-yellow-400',
    completed: false
  },
  {
    id: 'quotes',
    name: 'Daily Quotes',
    icon: <Star className="w-6 h-6" />,
    color: 'text-blue-400',
    completed: false
  }
];

export default function Streaks() {
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 3,
    longestStreak: 7,
    lastActivityDate: null,
    totalActivities: 15,
    milestones: [1, 3]
  });
  const [todayActivities, setTodayActivities] = useState<WellnessActivity[]>(wellnessActivities);
  const [showCelebration, setShowCelebration] = useState(false);

  const completeActivity = (activityId: string) => {
    const updatedActivities = todayActivities.map(activity =>
      activity.id === activityId ? { ...activity, completed: true } : activity
    );
    setTodayActivities(updatedActivities);
  };

  const getPlantStage = (streak: number) => {
    if (streak >= 30) return { 
      icon: <Sun className="w-24 h-24 text-yellow-400" />, 
      stage: "Radiant Sun", 
      message: "You're shining bright with consistency!" 
    };
    if (streak >= 21) return { 
      icon: <Flower className="w-24 h-24 text-pink-400" />, 
      stage: "Beautiful Flower", 
      message: "Your wellness practice is blooming beautifully!" 
    };
    if (streak >= 14) return { 
      icon: <Sprout className="w-24 h-24 text-green-500" />, 
      stage: "Growing Plant", 
      message: "Your habits are taking strong root!" 
    };
    if (streak >= 7) return { 
      icon: <Sprout className="w-24 h-24 text-green-400" />, 
      stage: "Young Sprout", 
      message: "Your wellness journey is growing!" 
    };
    if (streak >= 3) return { 
      icon: <Droplets className="w-24 h-24 text-blue-400" />, 
      stage: "Seed with Water", 
      message: "You're nurturing your wellbeing!" 
    };
    if (streak >= 1) return { 
      icon: <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center text-4xl">🌱</div>, 
      stage: "Planted Seed", 
      message: "Great start! Your wellness seed is planted!" 
    };
    return { 
      icon: <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-4xl">💭</div>, 
      stage: "Ready to Begin", 
      message: "Complete any wellness activity to start growing!" 
    };
  };

  const plantStage = getPlantStage(streakData.currentStreak);
  const completedToday = todayActivities.some(a => a.completed);
  const allCompleted = todayActivities.every(a => a.completed);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gradient-to-br from-background via-background/95 to-muted p-6">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
            Wellness Streaks
          </h1>
          <p className="text-lg text-muted-foreground">
            Build healthy habits and track your consistency journey
          </p>
        </div>

        {/* Main Streak Display */}
        <Card className="bg-white/70 dark:bg-gray-900/70 border-0 shadow-xl">
          <CardContent className="p-8 text-center space-y-6">
            {/* Plant/Growth Visual */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                {plantStage.icon}
                {streakData.currentStreak > 0 && (
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-sm font-bold px-2 py-1 rounded-full">
                    {streakData.currentStreak}
                  </div>
                )}
              </div>
              
              <h2 className="text-3xl font-light text-foreground">
                {streakData.currentStreak > 0 ? `${streakData.currentStreak} ${streakData.currentStreak === 1 ? 'Day' : 'Days'} in a Row` : 'Ready to Begin'}
              </h2>
              
              <p className="text-lg text-muted-foreground max-w-md">
                {plantStage.message}
              </p>
              
              <div className="text-sm text-muted-foreground">
                Growth Stage: <span className="font-medium text-primary">{plantStage.stage}</span>
              </div>
            </div>

            {/* Gentle Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-light text-primary">{streakData.longestStreak}</div>
                <div className="text-xs text-muted-foreground">Personal Best</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-light text-primary">{streakData.totalActivities}</div>
                <div className="text-xs text-muted-foreground">Total Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-light text-primary">{streakData.milestones.length}</div>
                <div className="text-xs text-muted-foreground">Milestones</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Wellness Activities */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-center text-foreground">
            Today's Wellness Activities
          </h3>
          
          <div className="text-center text-sm text-muted-foreground">
            Complete any activity below to continue your wellness journey
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {todayActivities.map((activity) => (
              <Card 
                key={activity.id}
                className={`group transition-all duration-300 cursor-pointer border-2 ${
                  activity.completed 
                    ? 'bg-green-50/80 dark:bg-green-950/20 border-green-300 dark:border-green-700' 
                    : 'hover:shadow-md hover:-translate-y-1 bg-white/60 dark:bg-gray-900/60 border-border/30 hover:border-primary/50'
                }`}
                onClick={() => !activity.completed && completeActivity(activity.id)}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`flex justify-center ${activity.color}`}>
                    {activity.icon}
                  </div>
                  
                  <h4 className="font-medium text-foreground">
                    {activity.name}
                  </h4>

                  {activity.completed ? (
                    <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Completed ✨</span>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full hover:bg-primary/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        completeActivity(activity.id);
                      }}
                    >
                      Mark Complete
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Gentle Encouragement */}
          <div className="text-center p-6 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl">
            {!completedToday ? (
              <div className="space-y-2">
                <p className="text-lg font-light text-foreground">
                  🌱 Take a moment for yourself today
                </p>
                <p className="text-sm text-muted-foreground">
                  Every small step nurtures your wellbeing
                </p>
              </div>
            ) : allCompleted ? (
              <div className="space-y-2">
                <p className="text-lg font-light text-foreground">
                  🌟 Beautiful! You've completed all activities today
                </p>
                <p className="text-sm text-muted-foreground">
                  Your commitment to wellness is inspiring
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-lg font-light text-foreground">
                  🌸 Wonderful start! Keep nurturing your growth
                </p>
                <p className="text-sm text-muted-foreground">
                  Each activity is a gift to your future self
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Milestone Badges */}
        {streakData.milestones.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-center text-foreground">
              🏆 Your Wellness Milestones
            </h4>
            <div className="flex flex-wrap justify-center gap-3">
              {streakData.milestones.map((milestone) => (
                <div 
                  key={milestone}
                  className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/50 dark:to-yellow-800/50 px-4 py-2 rounded-full text-sm font-medium text-yellow-800 dark:text-yellow-200 border border-yellow-300 dark:border-yellow-700"
                >
                  {milestone} day{milestone !== 1 ? 's' : ''}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
