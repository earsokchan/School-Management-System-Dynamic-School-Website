"use client";

import { useCallback, useEffect, useState } from "react";
import {
  createCollectionAction,
  listCollectionAction,
  removeCollectionAction,
  updateCollectionAction,
  uploadImageAction,
  type ActionResult,
} from "@/lib/server/actions";
import type { CollectionName } from "@/lib/server/collections";

function unwrap<T>(result: ActionResult<T>): T {
  if (!result.ok) throw new Error(result.error);
  return result.data;
}

export function useCollection<T extends { id: string }>(
  collection: CollectionName,
  initialData: readonly T[] = [],
  options: { loadOnMount?: boolean } = {},
) {
  const [items, setItems] = useState<T[]>(() => [...initialData]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(unwrap(await listCollectionAction<T>(collection)));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to load data");
    } finally {
      setLoading(false);
    }
  }, [collection]);

  useEffect(() => {
    if (options.loadOnMount !== false) void reload();
  }, [options.loadOnMount, reload]);

  const create = useCallback(async (value: Omit<T, "id"> | Partial<T>) => {
    const created = unwrap(await createCollectionAction<T>(collection, value));
    setItems((current) => [created, ...current]);
    return created;
  }, [collection]);

  const update = useCallback(async (id: string, value: Partial<T>) => {
    const updated = unwrap(await updateCollectionAction<T>(collection, id, value));
    setItems((current) => current.map((item) => (item.id === id ? updated : item)));
    return updated;
  }, [collection]);

  const remove = useCallback(async (id: string) => {
    unwrap(await removeCollectionAction(collection, id));
    setItems((current) => current.filter((item) => item.id !== id));
  }, [collection]);

  return { items, setItems, loading, error, reload, create, update, remove };
}

export async function uploadImage(file: File, folder = "images") {
  return unwrap(await uploadImageAction(file, folder));
}
