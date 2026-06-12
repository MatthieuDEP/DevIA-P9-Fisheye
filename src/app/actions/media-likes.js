"use server";

import { revalidatePath } from "next/cache";
import { incrementMediaLikes } from "../lib/prisma-db";

export async function addMediaLike(mediaId, photographerId) {
  if (
    !Number.isInteger(mediaId) ||
    !Number.isInteger(photographerId)
  ) {
    throw new Error("Identifiant invalide.");
  }

  const media = await incrementMediaLikes(mediaId, photographerId);

  if (!media) {
    throw new Error("Média introuvable.");
  }

  revalidatePath(`/photographers/${photographerId}`);

  return media.likes;
}
