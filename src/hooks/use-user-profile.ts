"use client";

import { useEffect, useState } from "react";
import {
  loadUserProfile,
  saveUserProfile,
  subscribeUserProfile,
  type UserProfile,
} from "@/lib/user-profile";

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>(() => loadUserProfile());

  useEffect(() => {
    setProfile(loadUserProfile());
    const unsubscribe = subscribeUserProfile((nextProfile) => {
      setProfile(nextProfile);
    });
    return unsubscribe;
  }, []);

  return {
    profile,
    updateProfile: (updates: Partial<UserProfile>) =>
      setProfile(saveUserProfile(updates)),
  };
};
