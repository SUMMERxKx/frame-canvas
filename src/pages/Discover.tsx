import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Filter, ArrowRight, ChevronDown } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { ProjectCard } from '@/components/project/ProjectCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockDiscoverySections, mockProjects } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const sortOptions = [
  { value: 'trending', label: 'Trending' },
  { value: 'top_rated', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
  { value: 'most_reviewed', label: 'Most Reviewed' },
];

const projectTypes = [
  'All Types',
  'Short Film',
  'Feature',
  'Documentary',
  'Music Video',
  'Student Film',
  'Experimental',
];

const years = ['All Years', '2024', '2023', '2022', '2021'];

export default function Discover() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('trending');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [yearFilter, setYearFilter] = useState('All Years');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Discover
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Explore exceptional work from student and independent filmmakers worldwide. 
              Curated selections, trending projects, and hidden gems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border bg-card/30 sticky top-16 lg:top-20 z-40 backdrop-blur-md">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between gap-4">
            {/* Section tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Button
                variant={activeSection === null ? 'gold' : 'ghost'}
                size="sm"
                onClick={() => setActiveSection(null)}
              >
                All
              </Button>
              {mockDiscoverySections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? 'gold' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveSection(section.id)}
                  className="whitespace-nowrap"
                >
                  {section.title}
                </Button>
              ))}
            </div>

            {/* Filter toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="shrink-0"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown className={cn(
                "h-4 w-4 ml-2 transition-transform",
                showFilters && "rotate-180"
              )} />
            </Button>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="pt-4 mt-4 border-t border-border"
            >
              <div className="flex flex-wrap gap-4">
                <div className="w-40">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-40">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-32">
                  <Select value={yearFilter} onValueChange={setYearFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {(typeFilter !== 'All Types' || yearFilter !== 'All Years') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setTypeFilter('All Types');
                      setYearFilter('All Years');
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-6 lg:px-12">
          {activeSection === null ? (
            // Show all sections
            <div className="space-y-16">
              {mockDiscoverySections.map((section) => (
                <div key={section.id}>
                  <div className="flex items-end justify-between mb-6">
                    <div>
                      <h2 className="font-display text-2xl font-semibold text-foreground">
                        {section.title}
                      </h2>
                      {section.subtitle && (
                        <p className="mt-1 text-muted-foreground">{section.subtitle}</p>
                      )}
                    </div>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className="flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      View all
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {section.projects.slice(0, 4).map((project, index) => (
                      <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Show single section expanded
            <div>
              {mockDiscoverySections
                .filter((s) => s.id === activeSection)
                .map((section) => (
                  <div key={section.id}>
                    <div className="mb-8">
                      <h2 className="font-display text-3xl font-semibold text-foreground">
                        {section.title}
                      </h2>
                      {section.subtitle && (
                        <p className="mt-2 text-muted-foreground">{section.subtitle}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {mockProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
