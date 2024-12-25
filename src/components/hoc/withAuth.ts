"use client";

import { useRouter } from "next/router";
import React, { useEffect } from "react";

export const withAuth = (Component: React.ComponentType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function ProtectedComponent(props: any) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/sign-in");
      }
    }, []);

    return React.createElement(Component, props);
  };
};
