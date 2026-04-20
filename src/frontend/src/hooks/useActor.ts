/**
 * Project-specific useActor wrapper.
 * Binds the backend's createActor function to the core-infrastructure useActor hook,
 * so callers can use `useActor()` without passing arguments.
 */
import { useActor as useCoreActor } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";
import type { backendInterface } from "../backend";

export function useActor(): {
  actor: backendInterface | null;
  isFetching: boolean;
} {
  return useCoreActor(createActor) as {
    actor: backendInterface | null;
    isFetching: boolean;
  };
}
