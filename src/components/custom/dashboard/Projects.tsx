"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Loader2, RefreshCcw } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import axios from "axios";

type Project = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await axios.get("/api/projects", {
        withCredentials: true,
      });

      if (!data.success) {
        throw new Error(data.message || "Failed to load projects");
      }

      setProjects(data.projects || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="w-full my-10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-52 rounded-xl border border-border/50 bg-background/60 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border/50 bg-background/60 px-6 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertCircle className="size-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-customWhite">
                Unable to load projects
              </h3>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
            <Button onClick={fetchProjects} variant="outline">
              <RefreshCcw className="size-4" />
              Retry
            </Button>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border/50 bg-background/60 px-6 py-12 text-center">
            <h3 className="text-lg font-semibold text-customWhite">
              No projects found
            </h3>
            <p className="text-sm text-muted-foreground">
              Create your first project to see it here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                createdAt={project.createdAt}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
