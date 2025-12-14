import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  Clock, 
  MapPin, 
  Building, 
  Calendar, 
  Play, 
  Share2, 
  Flag,
  ChevronRight 
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RatingBlock } from '@/components/project/RatingBlock';
import { CommentSection } from '@/components/project/CommentSection';
import { ProjectCard } from '@/components/project/ProjectCard';
import { mockProjects, mockRatingSummary, mockComments, mockUsers } from '@/lib/mock-data';
import { formatProjectType, formatRuntime, getCreditStatusLabel } from '@/lib/format';
import { Credit, CreditStatus } from '@/types/bmdb';
import { cn } from '@/lib/utils';

// Mock credits for the project
const mockCredits: Credit[] = [
  { id: '1', projectId: '1', userId: '1', user: mockUsers[0], role: 'Director', department: 'CREW', status: 'VERIFIED', order: 1, createdAt: '2024-01-10' },
  { id: '2', projectId: '1', userId: '1', user: mockUsers[0], role: 'Writer', department: 'CREW', status: 'VERIFIED', order: 2, createdAt: '2024-01-10' },
  { id: '3', projectId: '1', userId: '2', user: mockUsers[1], role: 'Cinematographer', department: 'CREW', status: 'VERIFIED', order: 3, createdAt: '2024-01-10' },
  { id: '4', projectId: '1', userId: '3', user: mockUsers[2], role: 'Lead', characterName: 'Elena', department: 'CAST', status: 'VERIFIED', order: 1, createdAt: '2024-01-10' },
  { id: '5', projectId: '1', role: 'Supporting', characterName: 'The Stranger', department: 'CAST', status: 'UNCLAIMED', order: 2, createdAt: '2024-01-10' },
];

const statusVariantMap: Record<CreditStatus, 'verified' | 'pending' | 'unclaimed' | 'rejected' | 'disputed' | 'secondary'> = {
  VERIFIED: 'verified',
  PENDING_ACCEPTANCE: 'pending',
  UNCLAIMED: 'unclaimed',
  REJECTED: 'rejected',
  DISPUTED: 'disputed',
  REMOVED: 'secondary',
};

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const [showVideo, setShowVideo] = useState(false);
  
  // Find project by slug
  const project = mockProjects.find(p => p.slug === slug) || mockProjects[0];
  const castCredits = mockCredits.filter(c => c.department === 'CAST');
  const crewCredits = mockCredits.filter(c => c.department === 'CREW');

  // Mock state
  const isLoggedIn = false;
  const userRating = undefined;

  const handleRate = (score: number) => {
    console.log('Rating:', score);
    // TODO: API call
  };

  return (
    <Layout>
      {/* Hero / Backdrop */}
      <section className="relative">
        {/* Backdrop image */}
        <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
          {project.backdropUrl ? (
            <img
              src={project.backdropUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-card to-background" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-6 lg:px-12 pb-8 lg:pb-12">
            <div className="flex flex-col lg:flex-row gap-8 items-end">
              {/* Poster */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="hidden lg:block w-64 shrink-0"
              >
                <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-elevated border border-border/50">
                  {project.posterUrl ? (
                    <img
                      src={project.posterUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-card flex items-center justify-center">
                      <span className="font-display text-4xl text-muted-foreground">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Title & Meta */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex-1"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <Badge variant="gold">{formatProjectType(project.projectType)}</Badge>
                  {project.genres?.map((genre) => (
                    <Badge key={genre} variant="genre">{genre}</Badge>
                  ))}
                </div>

                <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
                  {project.title}
                </h1>
                
                {project.tagline && (
                  <p className="mt-3 text-lg text-muted-foreground italic">
                    "{project.tagline}"
                  </p>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {project.year && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {project.year}
                    </span>
                  )}
                  {project.runtime && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {formatRuntime(project.runtime)}
                    </span>
                  )}
                  {project.organization && (
                    <span className="flex items-center gap-1.5">
                      <Building className="h-4 w-4" />
                      {project.organization}
                    </span>
                  )}
                  {project.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {project.location}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {project.videoUrl && (
                    <Button 
                      variant="gold" 
                      onClick={() => setShowVideo(true)}
                      className="group"
                    >
                      <Play className="h-4 w-4 fill-current" />
                      Watch Film
                    </Button>
                  )}
                  <Button variant="outline">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="ghost">
                    <Flag className="h-4 w-4" />
                    Report
                  </Button>
                </div>
              </motion.div>

              {/* Rating quick view */}
              {project.averageRating && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="hidden md:flex flex-col items-center justify-center w-32 h-32 rounded-lg bg-card/80 backdrop-blur-sm border border-border"
                >
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="h-5 w-5 text-primary fill-primary" />
                  </div>
                  <div className="text-3xl font-display font-bold text-foreground">
                    {project.averageRating.toFixed(1)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {project.ratingCount} ratings
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && project.videoUrl && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setShowVideo(false)}
        >
          <div 
            className="relative w-full max-w-5xl aspect-video"
            onClick={e => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0"
              onClick={() => setShowVideo(false)}
            >
              ×
            </Button>
            <iframe
              src={project.videoUrl}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Synopsis */}
              {project.synopsis && (
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Synopsis
                  </h2>
                  <p className="text-foreground/90 leading-relaxed">
                    {project.synopsis}
                  </p>
                </div>
              )}

              {/* Cast */}
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Cast
                </h2>
                <div className="space-y-3">
                  {castCredits.map((credit) => (
                    <div 
                      key={credit.id}
                      className="flex items-center justify-between p-4 bg-card rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                          {credit.user?.avatarUrl ? (
                            <img src={credit.user.avatarUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-sm font-medium text-muted-foreground">
                              {credit.characterName?.charAt(0) || '?'}
                            </span>
                          )}
                        </div>
                        <div>
                          {credit.user ? (
                            <Link 
                              to={`/u/${credit.user.username}`}
                              className="font-medium text-foreground hover:text-primary transition-colors"
                            >
                              {credit.user.displayName}
                            </Link>
                          ) : (
                            <span className="font-medium text-muted-foreground">Unclaimed</span>
                          )}
                          <div className="text-sm text-muted-foreground">
                            as {credit.characterName}
                          </div>
                        </div>
                      </div>
                      <Badge variant={statusVariantMap[credit.status]}>
                        {getCreditStatusLabel(credit.status)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Crew */}
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Crew
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {crewCredits.map((credit) => (
                    <div 
                      key={credit.id}
                      className="flex items-center justify-between p-4 bg-card rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                          {credit.user?.avatarUrl ? (
                            <img src={credit.user.avatarUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-sm font-medium text-muted-foreground">
                              {credit.role.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">{credit.role}</div>
                          {credit.user ? (
                            <Link 
                              to={`/u/${credit.user.username}`}
                              className="font-medium text-foreground hover:text-primary transition-colors"
                            >
                              {credit.user.displayName}
                            </Link>
                          ) : (
                            <span className="font-medium text-muted-foreground">Unclaimed</span>
                          )}
                        </div>
                      </div>
                      <Badge variant={statusVariantMap[credit.status]}>
                        {getCreditStatusLabel(credit.status)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <CommentSection
                comments={mockComments}
                isLoggedIn={isLoggedIn}
                onAddComment={(content) => console.log('Add comment:', content)}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Rating block */}
              <RatingBlock
                summary={mockRatingSummary}
                userRating={userRating}
                isLoggedIn={isLoggedIn}
                onRate={handleRate}
              />

              {/* Actions for logged in users */}
              {isLoggedIn && (
                <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Actions
                  </h3>
                  <Button variant="outline" className="w-full justify-start">
                    Request Credit
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Claim Unclaimed Role
                  </Button>
                </div>
              )}

              {/* Related projects */}
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  More Like This
                </h3>
                <div className="space-y-4">
                  {mockProjects.slice(1, 4).map((p) => (
                    <ProjectCard key={p.id} project={p} variant="compact" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
