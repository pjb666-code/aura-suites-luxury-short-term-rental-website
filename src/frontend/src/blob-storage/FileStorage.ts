import { loadConfig } from "@caffeineai/core-infrastructure";
import { HttpAgent } from "@icp-sdk/core/agent";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { FileReference } from "../backend";
import { useActor } from "../hooks/useActor";
import { StorageClient } from "./StorageClient";

const getHttpAgent = async () => {
  const config = await loadConfig();

  const agent = new HttpAgent({
    host: config.backend_host,
  });
  if (config.backend_host?.includes("localhost")) {
    await agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running",
      );
      console.error(err);
    });
  }
  return agent;
};

const buildStorageClient = async () => {
  const envConfig = await loadConfig();
  const agent = await getHttpAgent();
  return new StorageClient(
    envConfig.bucket_name,
    envConfig.storage_gateway_url,
    envConfig.backend_canister_id,
    envConfig.project_id,
    agent,
  );
};

// Hook to fetch the list of files
export const useFileList = () => {
  const { actor } = useActor();

  return useQuery({
    queryKey: ["fileList"],
    queryFn: async () => {
      if (!actor) throw new Error("Backend is not available");
      return await actor.listFileReferences();
    },
    enabled: !!actor,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Unified hook for getting file URLs
export const useFileUrl = (path: string) => {
  const { actor } = useActor();

  const getFileUrl = async (filePath: string): Promise<string> => {
    if (!actor) throw new Error("Backend is not available");
    const fileReference = await actor.getFileReference(filePath);
    if (!fileReference) {
      throw new Error(`File reference not found for path: ${filePath}`);
    }
    const storageClient = await buildStorageClient();
    return storageClient.getDirectURL(fileReference.hash);
  };

  return useQuery({
    queryKey: ["fileUrl", path],
    queryFn: () => getFileUrl(path),
    enabled: !!path,
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useFileUpload = () => {
  const { actor } = useActor();
  const [isUploading, setIsUploading] = useState(false);
  const { invalidateFileList } = useInvalidateQueries();

  const uploadFile = async (
    path: string,
    data: File,
    onProgress?: (percentage: number) => void,
  ): Promise<{
    path: string;
    hash: string;
    url: string;
  }> => {
    if (!actor) {
      throw new Error("Backend is not available");
    }

    setIsUploading(true);

    try {
      const storageClient = await buildStorageClient();
      const blobBytes = new Uint8Array(await data.arrayBuffer());
      const { hash } = await storageClient.putFile(blobBytes, onProgress);

      // Register the file reference in the backend (path → hash mapping)
      await actor.registerFileReference(path, hash);

      await invalidateFileList();

      // Build a direct URL for immediate use
      const url = storageClient.getDirectURL(hash);
      return { path, hash, url };
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, isUploading };
};

export const useFileDelete = () => {
  const { actor } = useActor();
  const [isDeleting, setIsDeleting] = useState(false);
  const { invalidateFileList, invalidateFileUrl } = useInvalidateQueries();

  const deleteFile = async (path: string): Promise<void> => {
    if (!actor) {
      throw new Error("Backend is not available");
    }

    setIsDeleting(true);

    try {
      await actor.dropFileReference(path);
      await invalidateFileList();
      invalidateFileUrl(path);
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteFile, isDeleting };
};

// Utility to invalidate queries
export const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  return {
    invalidateFileList: () =>
      queryClient.invalidateQueries({ queryKey: ["fileList"] }),
    invalidateFileUrl: (path: string) =>
      queryClient.invalidateQueries({ queryKey: ["fileUrl", path] }),
    invalidateAll: () => {
      queryClient.invalidateQueries({ queryKey: ["fileList"] });
      queryClient.invalidateQueries({ queryKey: ["fileUrl"] });
    },
  };
};

// Re-export FileReference for convenience
export type { FileReference };
