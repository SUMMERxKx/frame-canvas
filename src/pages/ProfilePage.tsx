import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Globe, ExternalLink, Film } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProjectCard } from '@/components/project/ProjectCard';
import { mockUsers, mockProjects } from '@/lib/mock-data';
import { formatDate, getCreditStatusLabel } from '@/lib/format';

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  
  // Find user by username
  const user = mockUsers.find(u => u.username === username) || mockUsers[0];
  
  // Mock filmography (projects they're credited on)
  const userProjects = mockProjects.slice(0, 3);

  return (
    <Layout>
      {/* Profile Header */}
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row items-start gap-8"
            >
              {/* Avatar */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-secondary shrink-0 border-2 border-border">
                {user.avatarUrl ? (
                  <img 
                    src={user.avatarUrl} 
                    alt={user.displayName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display text-4xl text-muted-foreground">
                      {user.displayName.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {user.displayName}
                </h1>
                <p className="text-lg text-muted-foreground">@{user.username}</p>

                {user.bio && (
                  <p className="mt-4 text-foreground/90 leading-relaxed max-w-2xl">
                    {user.bio}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {user.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {user.location}
                    </span>
                  )}
                  {user.website && (
                    <a 
                      href={user.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-primary hover:underline"
                    >
                      <Globe className="h-4 w-4" />
                      Website
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {user.imdbUrl && (
                    <a 
                      href={user.imdbUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-primary hover:underline"
                    >
                      IMDb
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  Member since {formatDate(user.createdAt)}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filmography */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Film className="h-5 w-5 text-primary" />
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Filmography
              </h2>
            </div>

            {/* Crew Credits */}
            <div className="mb-12">
              <h3 className="text-lg font-medium text-foreground mb-4">Crew</h3>
              <div className="space-y-4">
                {userProjects.slice(0, 2).map((project) => (
                  <Link
                    key={project.id}
                    to={`/p/${project.slug}`}
                    className="block bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-24 rounded bg-muted overflow-hidden shrink-0">
                        {project.posterUrl && (
                          <img 
                            src={project.posterUrl} 
                            alt="" 
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-display font-semibold text-foreground">
                              {project.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {project.year} • Director
                            </p>
                          </div>
                          <Badge variant="verified">Verified</Badge>
                        </div>
                        {project.organization && (
                          <p className="mt-2 text-xs text-muted-foreground">
                            {project.organization}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Cast Credits */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-4">Cast</h3>
              <div className="space-y-4">
                {userProjects.slice(2).map((project) => (
                  <Link
                    key={project.id}
                    to={`/p/${project.slug}`}
                    className="block bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-24 rounded bg-muted overflow-hidden shrink-0">
                        {project.posterUrl && (
                          <img 
                            src={project.posterUrl} 
                            alt="" 
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-display font-semibold text-foreground">
                              {project.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {project.year} • Lead Role
                            </p>
                          </div>
                          <Badge variant="verified">Verified</Badge>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {userProjects.length === 0 && (
                <div className="text-center py-12 bg-card border border-border rounded-lg">
                  <p className="text-muted-foreground">No cast credits yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
