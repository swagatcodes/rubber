"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Save, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

interface Profile {
  name: string | null;
  email: string | null;
  profile: {
    bio: string | null;
    phone: string | null;
    companyName: string | null;
    location: string | null;
    website: string | null;
  };
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState<Profile | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/users/profile");
      const data = await response.json();
      if (data.success) {
        setProfile(data.data);
        setFormData(data.data);
      }
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "name" || name === "email") {
      setFormData((prev) =>
        prev ? { ...prev, [name]: value } : null
      );
    } else {
      setFormData((prev) =>
        prev
          ? {
              ...prev,
              profile: {
                ...prev.profile,
                [name]: value || null,
              },
            }
          : null
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    try {
      const response = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData?.name,
          bio: formData?.profile.bio,
          phone: formData?.profile.phone,
          companyName: formData?.profile.companyName,
          location: formData?.profile.location,
          website: formData?.profile.website,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to save profile");
        setErrors({ submit: data.error });
      } else {
        setProfile(data.data);
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error("An error occurred");
      setErrors({ submit: "An error occurred" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-600"></div>
      </div>
    );
  }

  if (!formData) {
    return <div>Failed to load profile</div>;
  }

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Profile Settings</h1>
        <p className="text-foreground/60 mt-2">Update your personal information</p>
      </div>

      {/* Error Message */}
      {errors.submit && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-600 dark:text-red-500">Error</p>
            <p className="text-sm text-red-600 dark:text-red-500">{errors.submit}</p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-6">Personal Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-slate-800 dark:border-slate-700"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email || ""}
                disabled
                className="w-full px-4 py-2 border border-foreground/20 rounded-lg bg-foreground/5 dark:bg-slate-800 dark:border-slate-700 disabled:cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.profile.phone || ""}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-slate-800 dark:border-slate-700"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.profile.location || ""}
                onChange={handleChange}
                placeholder="City, Country"
                className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-slate-800 dark:border-slate-700"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.profile.companyName || ""}
                onChange={handleChange}
                placeholder="Your company"
                className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-slate-800 dark:border-slate-700"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium mb-2">Website</label>
              <input
                type="url"
                name="website"
                value={formData.profile.website || ""}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-slate-800 dark:border-slate-700"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              name="bio"
              value={formData.profile.bio || ""}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              rows={4}
              className="w-full px-4 py-2 border border-foreground/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-slate-800 dark:border-slate-700"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
