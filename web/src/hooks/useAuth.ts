import { useEffect, useState } from "react";
import { useLogto } from "@logto/react";

export function useAuth() {
  const { isAuthenticated, fetchUserInfo, getAccessToken, signOut, signIn } =
    useLogto();

  const [userInfo, setUserInfo] =
    useState<Awaited<ReturnType<typeof fetchUserInfo>>>();

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserInfo().then((userInfo) => {
        setUserInfo(userInfo);
      });
    }
  }, [fetchUserInfo, isAuthenticated]);

  return {
    isAuthenticated,
    userInfo,
    getAccessToken,
    fetchUserInfo,
    signOut,
    signIn,
  };
}

export type Auth = ReturnType<typeof useAuth>;
