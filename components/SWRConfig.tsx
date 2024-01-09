"use client";
import { SWRConfig } from "swr";
import { ReactNode } from "react";
export const SWRProvider = ({ children }: { children: ReactNode }) => {
    return <SWRConfig>{children}</SWRConfig>;
};
