import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Play, Pause, Heart, HeartOff, Timer, RefreshCw, Star, Clock, CheckCircle } from 'lucide-react';

interface MentalHealthExercise {
  id: number;
  title: string;
  category: string;
  icon: string;
  description: string;
  instructions: string[];
  duration: number; // in minutes
  hasTiming: boolean;
  difficulty: string;
  benefits: string[];
}

const mentalHealthExercises: MentalHealthExercise[] = [
  // Mindfulness & Grounding
  {
    id: 1,
    title: "5-4-3-2-1 Grounding Technique",
    category: "Mindfulness",
    icon: "🌱",
    description: "A powerful grounding exercise to bring you back to the present moment",
    instructions: [
      "Find a comfortable position and take three deep breaths",
      "Name 5 things you can see around you (look around slowly)",
      "Name 4 things you can feel (your clothes, chair, temperature)",
      "Name 3 things you can hear (distant sounds, nearby sounds)",
      "Name 2 things you can smell (breathe in gently)",
      "Name 1 thing you can taste (run your tongue over your lips)",
      "Take a moment to notice how you feel now compared to when you started"
    ],
    duration: 5,
    hasTiming: false,
    difficulty: "Beginner",
    benefits: ["Reduced anxiety", "Increased presence", "Instant calm"]
  },
  {
    id: 2,
    title: "4-7-8 Mindful Breathing",
    category: "Breathing",
    icon: "🌸",
    description: "Ancient breathing technique to activate your body's relaxation response",
    instructions: [
      "Sit comfortably with your back straight",
      "Place the tip of your tongue against the roof of your mouth",
      "Exhale completely through your mouth with a whoosh sound",
      "Close your mouth and inhale quietly through your nose for 4 counts",
      "Hold your breath for 7 counts",
      "Exhale through your mouth for 8 counts with a whoosh sound",
      "Repeat this cycle 3-4 times, then breathe normally"
    ],
    duration: 4,
    hasTiming: true,
    difficulty: "Beginner",
    benefits: ["Better sleep", "Reduced anxiety", "Improved focus"]
  },
  {
    id: 3,
    title: "Progressive Body Scan",
    category: "Mindfulness",
    icon: "🧘‍♀️",
    description: "Systematic relaxation to release physical tension and increase awareness",
    instructions: [
      "Lie down or sit comfortably with eyes closed",
      "Take 5 deep, slow breaths to center yourself",
      "Start at the top of your head, notice any sensations",
      "Move to your forehead, eyes, and jaw - release any tension",
      "Continue down: neck, shoulders, arms, chest",
      "Focus on your stomach, lower back, hips",
      "Move through your thighs, knees, calves, and feet",
      "Take in your whole body, feeling relaxed and present"
    ],
    duration: 12,
    hasTiming: true,
    difficulty: "Intermediate",
    benefits: ["Deep relaxation", "Better body awareness", "Improved sleep"]
  },
  {
    id: 4,
    title: "Mindful Object Observation",
    category: "Mindfulness",
    icon: "👁️",
    description: "Develop present-moment awareness through detailed observation",
    instructions: [
      "Choose a small object near you (pen, flower, stone, etc.)",
      "Hold it in your hands and close your eyes briefly",
      "Open your eyes and look at it as if seeing it for the first time",
      "Notice its colors, textures, weight, and temperature",
      "Observe shadows, reflections, and fine details",
      "If your mind wanders, gently return focus to the object",
      "Spend the full 2 minutes in complete observation"
    ],
    duration: 3,
    hasTiming: true,
    difficulty: "Beginner",
    benefits: ["Enhanced focus", "Present moment awareness", "Reduced overthinking"]
  },

  // Emotional Release
  {
    id: 5,
    title: "Emotion Doodle Release",
    category: "Creative Release",
    icon: "🎨",
    description: "Express and release emotions through colors and abstract shapes",
    instructions: [
      "Get paper and colored pens, pencils, or digital drawing tools",
      "Close your eyes and take 3 deep breaths",
      "Think about how you're feeling right now",
      "Choose colors that represent your emotions",
      "Start drawing without thinking - let your hand move freely",
      "Use shapes, lines, swirls - whatever feels right",
      "Don't worry about making it 'good' - just express",
      "When finished, look at your creation and notice what you feel"
    ],
    duration: 8,
    hasTiming: false,
    difficulty: "Beginner",
    benefits: ["Emotional expression", "Stress relief", "Creative release"]
  },
  {
    id: 6,
    title: "Write-and-Release Ritual",
    category: "Emotional Release",
    icon: "📝",
    description: "Symbolically release negative thoughts and emotions through writing",
    instructions: [
      "Get a piece of paper or open a document",
      "Write down the negative thought, worry, or emotion bothering you",
      "Be completely honest - no one else will see this",
      "Write as much detail as you need to get it all out",
      "Read what you wrote once, acknowledging these feelings",
      "Now physically tear up the paper or delete the document",
      "As you destroy it, imagine releasing these thoughts from your mind",
      "Take three deep breaths and notice any sense of relief"
    ],
    duration: 6,
    hasTiming: false,
    difficulty: "Beginner",
    benefits: ["Emotional release", "Mental clarity", "Symbolic healing"]
  },

  // Gratitude & Positivity
  {
    id: 7,
    title: "Three Good Things Practice",
    category: "Gratitude",
    icon: "✨",
    description: "Scientifically proven exercise to boost happiness and optimism",
    instructions: [
      "Find a quiet moment at the end of your day",
      "Think back through your day, even if it was difficult",
      "Identify the first good thing that happened, no matter how small",
      "Write it down and explain why it was meaningful to you",
      "Find the second good thing and reflect on its impact",
      "Identify the third good thing and your role in making it happen",
      "Read all three items and feel gratitude for these moments",
      "Notice how focusing on positives shifts your perspective"
    ],
    duration: 7,
    hasTiming: false,
    difficulty: "Beginner",
    benefits: ["Increased happiness", "Better sleep", "Optimistic outlook"]
  },
  {
    id: 8,
    title: "Gratitude Letter Writing",
    category: "Gratitude",
    icon: "💌",
    description: "Express deep appreciation to someone who has impacted your life",
    instructions: [
      "Think of someone who has been kind or helpful to you",
      "This could be a friend, family member, teacher, or even a stranger",
      "Write their name at the top of a piece of paper",
      "Describe specifically what they did that helped you",
      "Explain how their actions made you feel",
      "Share how their kindness has influenced your life",
      "Write why you're grateful they are in your life",
      "You don't have to send it - the writing itself is powerful"
    ],
    duration: 10,
    hasTiming: false,
    difficulty: "Intermediate",
    benefits: ["Deep gratitude", "Stronger relationships", "Emotional warmth"]
  },
  {
    id: 9,
    title: "Joyful Memory Visualization",
    category: "Positivity",
    icon: "🌈",
    description: "Reconnect with happiness by reliving a cherished memory",
    instructions: [
      "Close your eyes and take several deep, relaxing breaths",
      "Bring to mind a time when you felt truly happy or peaceful",
      "See the scene clearly - where were you, who was there?",
      "What colors, textures, and details can you remember?",
      "What sounds were present? Voices, music, nature?",
      "What did you smell? Food, flowers, fresh air?",
      "How did your body feel in that moment of joy?",
      "Stay in this memory, allowing the positive feelings to fill you",
      "Slowly open your eyes, carrying this joy with you"
    ],
    duration: 8,
    hasTiming: true,
    difficulty: "Beginner",
    benefits: ["Mood boost", "Access to positive emotions", "Mental resilience"]
  },

  // Stress Reduction
  {
    id: 10,
    title: "Progressive Muscle Relaxation",
    category: "Stress Relief",
    icon: "💪",
    description: "Systematically release physical tension from your entire body",
    instructions: [
      "Lie down or sit comfortably with eyes closed",
      "Start with your toes - tense them tightly for 5 seconds",
      "Release and notice the contrast between tension and relaxation",
      "Move to your calves - tense, hold, then release",
      "Continue with thighs, buttocks, stomach, hands, arms",
      "Tense your shoulders up to your ears, then release",
      "Scrunch your facial muscles, then relax completely",
      "Take a moment to feel your entire body relaxed and heavy"
    ],
    duration: 15,
    hasTiming: true,
    difficulty: "Intermediate",
    benefits: ["Deep physical relaxation", "Stress relief", "Better sleep"]
  },
  {
    id: 11,
    title: "Peaceful Place Visualization",
    category: "Stress Relief",
    icon: "🏖️",
    description: "Escape to a calm, safe place in your imagination",
    instructions: [
      "Close your eyes and take three deep, calming breaths",
      "Imagine a place where you feel completely safe and peaceful",
      "This could be a beach, forest, mountain, or any place you love",
      "See yourself there - what does the landscape look like?",
      "What's the weather like? Feel the temperature on your skin",
      "What sounds do you hear? Waves, birds, wind in trees?",
      "Notice any scents - ocean air, pine trees, flowers",
      "Spend time walking around this peaceful place",
      "Know you can return here anytime you need calm"
    ],
    duration: 10,
    hasTiming: true,
    difficulty: "Beginner",
    benefits: ["Immediate calm", "Reduced stress", "Mental escape"]
  },
  {
    id: 12,
    title: "Breath & Stretch Flow",
    category: "Stress Relief",
    icon: "🤸‍♀️",
    description: "Gentle movement synchronized with breathing to release tension",
    instructions: [
      "Stand or sit with good posture, shoulders relaxed",
      "Inhale deeply while raising your arms overhead slowly",
      "Exhale while gently lowering arms and rolling shoulders back",
      "Inhale while gently tilting your head to the right",
      "Exhale returning to center, then tilt left on next breath",
      "Inhale reaching arms up, exhale into a gentle side stretch",
      "Continue moving slowly, letting breath guide movement",
      "End by standing still and noticing how you feel"
    ],
    duration: 8,
    hasTiming: true,
    difficulty: "Beginner",
    benefits: ["Physical relaxation", "Better circulation", "Mind-body connection"]
  },

  // Cognitive Shifts
  {
    id: 13,
    title: "Thought Reframing Practice",
    category: "Cognitive",
    icon: "💭",
    description: "Transform negative thinking patterns into balanced perspectives",
    instructions: [
      "Identify a negative thought that's been bothering you",
      "Write it down exactly as it appears in your mind",
      "Ask yourself: 'Is this thought 100% true?'",
      "Look for evidence that contradicts this negative thought",
      "Consider: 'What would I tell a good friend in this situation?'",
      "Write a more balanced, realistic version of the thought",
      "Include both challenges and possibilities in your new thought",
      "Read your reframed thought aloud and notice how it feels"
    ],
    duration: 8,
    hasTiming: false,
    difficulty: "Intermediate",
    benefits: ["Reduced negative thinking", "Better problem solving", "Emotional balance"]
  },
  {
    id: 14,
    title: "Future Self Encouragement",
    category: "Cognitive",
    icon: "🔮",
    description: "Write a compassionate letter to yourself one year from now",
    instructions: [
      "Imagine yourself exactly one year from today",
      "Start your letter with 'Dear Future Me' and today's date",
      "Share what you're currently going through or struggling with",
      "Offer yourself encouragement and remind yourself of your strengths",
      "Share your hopes and dreams for where you'll be in a year",
      "Give yourself permission to make mistakes and learn",
      "Remind your future self of what you've already overcome",
      "End with love and support, signing it 'Your Past Self'"
    ],
    duration: 12,
    hasTiming: false,
    difficulty: "Intermediate",
    benefits: ["Self-compassion", "Future motivation", "Perspective shift"]
  },
  {
    id: 15,
    title: "Silver Lining Discovery",
    category: "Cognitive",
    icon: "🌤️",
    description: "Find growth, learning, or positive outcomes in difficult experiences",
    instructions: [
      "Think of a challenging situation you've faced recently",
      "Acknowledge that it was difficult - don't minimize your pain",
      "Ask yourself: 'What did I learn about myself from this?'",
      "Consider: 'How did this experience make me stronger?'",
      "Think: 'What skills or wisdom did I gain?'",
      "Reflect: 'How might this help me in future situations?'",
      "Write down at least one positive outcome or lesson",
      "Appreciate your resilience in getting through the challenge"
    ],
    duration: 7,
    hasTiming: false,
    difficulty: "Intermediate",
    benefits: ["Resilience building", "Positive reappraisal", "Personal growth"]
  },

  // Creativity for Calm
  {
    id: 16,
    title: "Mandala Meditation Coloring",
    category: "Creative Calm",
    icon: "🎭",
    description: "Find peace through meditative coloring of sacred geometric patterns",
    instructions: [
      "Find a mandala pattern to color (print one or use a coloring app)",
      "Choose colors that feel calming and appealing to you today",
      "Begin coloring slowly, focusing only on the present section",
      "Pay attention to the feeling of the pencil or stylus in your hand",
      "Notice how the colors blend and the patterns emerge",
      "If your mind wanders, gently return focus to the coloring",
      "Work from the center outward or follow your intuition",
      "Continue until you feel calm, regardless of whether it's 'finished'"
    ],
    duration: 15,
    hasTiming: false,
    difficulty: "Beginner",
    benefits: ["Meditative focus", "Creative expression", "Reduced anxiety"]
  },
  {
    id: 17,
    title: "Stream-of-Consciousness Writing",
    category: "Creative Calm",
    icon: "✍️",
    description: "Release mental clutter through continuous, unedited writing",
    instructions: [
      "Get paper and pen, or open a document on your device",
      "Set a timer for 5 minutes (or use the built-in timer)",
      "Start writing about anything - your day, feelings, random thoughts",
      "Keep your hand moving the entire time, don't stop to think",
      "Don't worry about spelling, grammar, or making sense",
      "If you get stuck, write 'I don't know what to write' until ideas come",
      "Let whatever wants to come out flow onto the page",
      "When time is up, take a deep breath and notice how you feel"
    ],
    duration: 5,
    hasTiming: true,
    difficulty: "Beginner",
    benefits: ["Mental clarity", "Emotional release", "Creative flow"]
  },
  {
    id: 18,
    title: "Sound Painting Meditation",
    category: "Creative Calm",
    icon: "🎵",
    description: "Create art inspired by music, letting sound guide your creativity",
    instructions: [
      "Choose a piece of instrumental music (classical, ambient, or nature sounds)",
      "Get drawing materials - paper and colors, or digital drawing app",
      "Close your eyes and listen to the music for 30 seconds first",
      "Begin drawing while listening, letting the music guide your hand",
      "Don't draw 'things' - draw the feelings and movements you hear",
      "Use different colors for different instruments or sounds",
      "Let fast music inspire quick strokes, slow music inspire flowing lines",
      "Continue until the song ends, then look at your sound painting"
    ],
    duration: 10,
    hasTiming: false,
    difficulty: "Beginner",
    benefits: ["Creative expression", "Auditory-visual connection", "Mindful creativity"]
  }
];

const categoryColors = {
  "Gratitude": "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "Breathing": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Mindfulness": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Cognitive": "bg-green-500/20 text-green-300 border-green-500/30",
  "Creative": "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "Emotional": "bg-red-500/20 text-red-300 border-red-500/30",
  "Anxiety Relief": "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  "Self-Care": "bg-teal-500/20 text-teal-300 border-teal-500/30"
};

export default function Exercise() {
  const [dailyExercise, setDailyExercise] = useState<MentalHealthExercise | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [completedToday, setCompletedToday] = useState<number[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [moodBefore, setMoodBefore] = useState<number | null>(null);
  const [moodAfter, setMoodAfter] = useState<number | null>(null);
  const [showMoodCheck, setShowMoodCheck] = useState(false);
  const [view, setView] = useState<'daily' | 'all' | 'history'>('daily');

  // Get daily exercise (same one for the whole day)
  useEffect(() => {
    const today = new Date().toDateString();
    const savedDaily = localStorage.getItem(`dailyExercise_${today}`);
    
    if (savedDaily) {
      setDailyExercise(JSON.parse(savedDaily));
    } else {
      const randomExercise = mentalHealthExercises[Math.floor(Math.random() * mentalHealthExercises.length)];
      setDailyExercise(randomExercise);
      localStorage.setItem(`dailyExercise_${today}`, JSON.stringify(randomExercise));
    }

    // Load saved data
    const savedFavorites = localStorage.getItem('exerciseFavorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    
    const savedCompleted = localStorage.getItem(`completed_${today}`);
    if (savedCompleted) setCompletedToday(JSON.parse(savedCompleted));
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isActive) {
      setIsActive(false);
      handleExerciseComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  const generateNewDaily = () => {
    const availableExercises = mentalHealthExercises.filter(ex => ex.id !== dailyExercise?.id);
    const newExercise = availableExercises[Math.floor(Math.random() * availableExercises.length)];
    setDailyExercise(newExercise);
    
    const today = new Date().toDateString();
    localStorage.setItem(`dailyExercise_${today}`, JSON.stringify(newExercise));
    resetExerciseState();
  };

  const resetExerciseState = () => {
    setIsActive(false);
    setTimeRemaining(0);
    setCurrentStep(0);
    setMoodBefore(null);
    setMoodAfter(null);
    setShowMoodCheck(false);
  };

  const startExercise = () => {
    if (!dailyExercise) return;
    
    if (dailyExercise.hasTiming) {
      setTimeRemaining(dailyExercise.duration * 60);
      setIsActive(true);
    }
    setCurrentStep(0);
    setShowMoodCheck(true);
  };

  const handleExerciseComplete = () => {
    if (!dailyExercise) return;
    
    const today = new Date().toDateString();
    const newCompleted = [...completedToday, dailyExercise.id];
    setCompletedToday(newCompleted);
    localStorage.setItem(`completed_${today}`, JSON.stringify(newCompleted));
    
    // Show mood after check
    setShowMoodCheck(true);
  };

  const toggleFavorite = (exerciseId: number) => {
    const newFavorites = favorites.includes(exerciseId) 
      ? favorites.filter(id => id !== exerciseId)
      : [...favorites, exerciseId];
    
    setFavorites(newFavorites);
    localStorage.setItem('exerciseFavorites', JSON.stringify(newFavorites));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const MoodRating = ({ mood, setMood, label }: { mood: number | null, setMood: (rating: number) => void, label: string }) => (
    <div className="space-y-3">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <div className="flex gap-2 justify-center">
        {[1, 2, 3, 4, 5].map(rating => (
          <button
            key={rating}
            onClick={() => setMood(rating)}
            className={`w-10 h-10 rounded-full border-2 transition-all ${
              mood === rating 
                ? 'bg-pink-500 border-pink-500 text-white' 
                : 'border-gray-300 hover:border-pink-300 bg-white'
            }`}
          >
            {rating}
          </button>
        ))}
      </div>
    </div>
  );

  if (!dailyExercise) return <div className="flex-1 flex items-center justify-center">Loading...</div>;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Daily Mental Health Exercise
          </h1>
          <p className="text-lg text-gray-600">
            Your personalized wellness ritual awaits ✨
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center gap-2">
          {(['daily', 'all', 'history'] as const).map(viewType => (
            <Button
              key={viewType}
              variant={view === viewType ? "default" : "outline"}
              size="sm"
              onClick={() => setView(viewType)}
              className="capitalize"
            >
              {viewType === 'daily' ? 'Today\'s Exercise' : viewType}
            </Button>
          ))}
        </div>

        {view === 'daily' && (
          <>
            {/* Today's Exercise Card */}
            <Card className="group hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-2 border-pink-100 rounded-2xl">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{dailyExercise.icon}</span>
                    <div>
                      <CardTitle className="text-2xl text-gray-800">{dailyExercise.title}</CardTitle>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border mt-2 ${categoryColors[dailyExercise.category as keyof typeof categoryColors]}`}>
                        {dailyExercise.category}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(dailyExercise.id)}
                      className="p-2 hover:bg-pink-100"
                    >
                      {favorites.includes(dailyExercise.id) ? (
                        <Heart className="w-5 h-5 text-pink-500 fill-current" />
                      ) : (
                        <HeartOff className="w-5 h-5 text-gray-400" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={generateNewDaily}
                      className="gap-2 hover:bg-blue-50"
                    >
                      <RefreshCw className="w-4 h-4" />
                      New Exercise
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-gray-600 text-lg leading-relaxed">{dailyExercise.description}</p>

                {/* Benefits */}
                <div className="flex flex-wrap gap-2">
                  {dailyExercise.benefits.map((benefit, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {benefit}
                    </span>
                  ))}
                </div>

                {/* Duration & Timer */}
                {dailyExercise.hasTiming && (
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                    <Timer className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-700 font-medium">
                      {isActive ? formatTime(timeRemaining) : `${dailyExercise.duration} minutes`}
                    </span>
                    {isActive && (
                      <div className="flex-1">
                        <div className="w-full bg-blue-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                            style={{
                              width: `${((dailyExercise.duration * 60 - timeRemaining) / (dailyExercise.duration * 60)) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Instructions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm">
                      {currentStep + 1}
                    </span>
                    Step-by-Step Guide
                  </h3>
                  
                  <div className="space-y-3">
                    {dailyExercise.instructions.map((instruction, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-xl transition-all duration-300 ${
                          currentStep === index 
                            ? 'bg-purple-100 border-2 border-purple-300' 
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            currentStep > index 
                              ? 'bg-green-500 text-white' 
                              : currentStep === index
                              ? 'bg-purple-500 text-white'
                              : 'bg-gray-300 text-gray-600'
                          }`}>
                            {currentStep > index ? <CheckCircle className="w-4 h-4" /> : index + 1}
                          </span>
                          <p className="text-gray-700">{instruction}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Step Navigation */}
                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      disabled={currentStep === 0}
                    >
                      Previous Step
                    </Button>
                    <Button
                      onClick={() => {
                        if (currentStep < dailyExercise.instructions.length - 1) {
                          setCurrentStep(currentStep + 1);
                        } else {
                          handleExerciseComplete();
                        }
                      }}
                    >
                      {currentStep === dailyExercise.instructions.length - 1 ? 'Complete Exercise' : 'Next Step'}
                    </Button>
                  </div>
                </div>

                {/* Mood Check */}
                {showMoodCheck && !completedToday.includes(dailyExercise.id) && (
                  <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl space-y-4">
                    <h3 className="text-lg font-semibold text-center text-gray-800">How are you feeling?</h3>
                    <MoodRating 
                      mood={moodBefore} 
                      setMood={setMoodBefore} 
                      label="Before starting (1=Low, 5=Great)" 
                    />
                  </div>
                )}

                {/* Completion Status */}
                {completedToday.includes(dailyExercise.id) && (
                  <div className="text-center p-6 bg-green-50 rounded-xl">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <h3 className="text-lg font-semibold text-green-800">Exercise Completed! 🎉</h3>
                    <p className="text-green-600">Great job taking care of your mental health today!</p>
                  </div>
                )}

                {/* Start Button */}
                {!isActive && !completedToday.includes(dailyExercise.id) && (
                  <Button
                    onClick={startExercise}
                    className="w-full py-4 text-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Begin Your Daily Practice
                  </Button>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {view === 'all' && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mentalHealthExercises.map((exercise) => (
              <Card key={exercise.id} className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-xl">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                        <span className="text-xl">{exercise.icon}</span>
                        {exercise.title}
                      </CardTitle>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${categoryColors[exercise.category as keyof typeof categoryColors]}`}>
                        {exercise.category}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(exercise.id)}
                      className="p-2 hover:bg-pink-100"
                    >
                      {favorites.includes(exercise.id) ? (
                        <Heart className="w-4 h-4 text-pink-500 fill-current" />
                      ) : (
                        <HeartOff className="w-4 h-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{exercise.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {exercise.duration} min
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setDailyExercise(exercise);
                      setView('daily');
                      resetExerciseState();
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  >
                    Try This Exercise
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {view === 'history' && (
          <Card className="bg-white/80 backdrop-blur-sm rounded-xl">
            <CardHeader>
              <CardTitle>Your Wellness Journey</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Track your progress and completed exercises here.</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Star className="w-4 h-4" />
                  Exercises completed today: {completedToday.length}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Heart className="w-4 h-4" />
                  Favorite exercises: {favorites.length}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
