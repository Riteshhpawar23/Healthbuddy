import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Play, Pause, Heart, HeartOff } from 'lucide-react';

interface MusicTrack {
  id: number;
  title: string;
  genre: string;
  youtubeId: string;
  description: string;
}

const musicTracks: MusicTrack[] = [
  {
    id: 1,
    title: "Rain Sounds",
    genre: "Nature",
    youtubeId: "aUm_OogP1nM",
    description: "Relaxing rain sounds for sleep and meditation"
  },
  {
    id: 2,
    title: "Instrumental Music",
    genre: "Instrumental",
    youtubeId: "mGC-S7n_HkE",
    description: "Beautiful instrumental melodies for focus"
  },
  {
    id: 3,
    title: "Nature Sounds - Forest",
    genre: "Nature",
    youtubeId: "hTDuZWt6Xbg",
    description: "Peaceful forest sounds with birds chirping"
  },
  {
    id: 4,
    title: "Nature Sounds - Ocean",
    genre: "Nature",
    youtubeId: "nE_XAauwu1I",
    description: "Calming ocean waves and seagulls"
  },
  {
    id: 5,
    title: "Sleep Music",
    genre: "Sleep",
    youtubeId: "LFASWuckB1c",
    description: "Deep sleep music for peaceful rest"
  },
  {
    id: 6,
    title: "Acoustic Instrumental",
    genre: "Instrumental",
    youtubeId: "LDrj7-UYvrA",
    description: "Gentle acoustic guitar instrumentals"
  },
  {
    id: 7,
    title: "Piano Music",
    genre: "Piano",
    youtubeId: "3NycM9lYdRI",
    description: "Beautiful piano compositions for relaxation"
  },
  {
    id: 8,
    title: "Meditation Music",
    genre: "Meditation",
    youtubeId: "FjHGZj2IjBk",
    description: "Peaceful meditation music for mindfulness"
  },
  {
    id: 9,
    title: "Chill Instrumental",
    genre: "Instrumental",
    youtubeId: "5CTuFiOuZDk",
    description: "Chill instrumental beats for studying"
  }
];

const genreColors = {
  "Nature": "bg-green-500/20 text-green-300 border-green-500/30",
  "Instrumental": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Sleep": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Piano": "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "Meditation": "bg-orange-500/20 text-orange-300 border-orange-500/30"
};

export default function Music() {
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("All");

  const genres = ["All", "Favorites", ...Array.from(new Set(musicTracks.map(track => track.genre)))];

  const filteredTracks = selectedGenre === "All" 
    ? musicTracks 
    : selectedGenre === "Favorites"
    ? musicTracks.filter(track => favorites.includes(track.id))
    : musicTracks.filter(track => track.genre === selectedGenre);

  const togglePlay = (trackId: number) => {
    if (playingTrack === trackId) {
      setPlayingTrack(null);
    } else {
      setPlayingTrack(trackId);
    }
  };

  const toggleFavorite = (trackId: number) => {
    setFavorites(prev => 
      prev.includes(trackId) 
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
  };

  const getEmbedUrl = (youtubeId: string) => {
    return `https://www.youtube.com/embed/${youtubeId}?autoplay=${playingTrack ? 1 : 0}&loop=1&playlist=${youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1`;
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-gradient-to-br from-background via-background/95 to-muted p-6">
      <div className="max-w-7xl mx-auto w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
            Wellness Music
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover calming sounds and music for relaxation and focus
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Genre Filter */}
          <div className="flex flex-wrap gap-2">
            {genres.map(genre => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGenre(genre)}
                className="text-sm"
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>

        {/* Music Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTracks.map((track) => (
            <Card 
              key={track.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card/60 backdrop-blur-sm border-border/50"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                      {track.title}
                    </CardTitle>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${genreColors[track.genre as keyof typeof genreColors]}`}>
                      {track.genre}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(track.id)}
                    className="p-2 hover:bg-accent"
                  >
                    {favorites.includes(track.id) ? (
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                    ) : (
                      <HeartOff className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {track.description}
                </p>

                {/* YouTube Embed - Only show for playing track */}
                {playingTrack === track.id && (
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={getEmbedUrl(track.youtubeId)}
                      title={track.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                {/* Play Button */}
                <Button
                  onClick={() => togglePlay(track.id)}
                  className="w-full flex items-center gap-2 bg-primary hover:bg-primary/90"
                >
                  {playingTrack === track.id ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Play
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No tracks message */}
        {filteredTracks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tracks found for the selected genre.</p>
          </div>
        )}
      </div>
    </div>
  );
}
