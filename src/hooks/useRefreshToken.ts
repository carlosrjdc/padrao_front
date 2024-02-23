"use client";

import { axiosRefresh } from "../lib/axios";
import { useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    if (session) {
      const res = await axiosRefresh(session.refresh_token);
      session.access_token = res.access_token;
      session.refresh_token = res.refresh_token;
    }
  };

  return refreshToken;
};