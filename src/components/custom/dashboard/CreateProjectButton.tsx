"use client";

import { useState } from "react";
import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

function CreateProjectButton() {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleCreateProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("/api/projects", formData);

      toast.success(response.data.message);

      setFormData({
        title: "",
        description: "",
      });

      setOpen(false);
      if (response.data.success) {
        router.push(`/editor/${response.data.project.id}`);
      }
    } catch (error: any) {
      console.error(error);

      toast.error(error.response?.data?.message || "Internal Server Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="size-4" />
          New Project
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleCreateProject}>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>

            <DialogDescription>
              Start building your next amazing website.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="mt-4 space-y-4">
            <Field>
              <Label htmlFor="title">Project Name</Label>

              <Input
                id="title"
                name="title"
                placeholder="Project title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </Field>

            <Field>
              <Label htmlFor="description">Description</Label>

              <Textarea
                id="description"
                name="description"
                placeholder="What is this project about?"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button variant="outline" type="button" disabled={loading}>
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Project"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateProjectButton;
