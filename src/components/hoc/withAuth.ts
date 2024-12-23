"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/router";

export const withAuth = (Component: React.ComponentType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function ProtectedComponent(props: any) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      }
    }, []);

    return React.createElement(Component, props);
  };
};
