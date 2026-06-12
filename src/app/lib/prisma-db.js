import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../generated/prisma/client.ts";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export const getAllPhotographers = () => prisma.photographer.findMany();

export const getPhotographer = (id) =>
  prisma.photographer.findUnique({
    where: { id },
  });

export const getAllMediasForPhotographer = (photographerId) =>
  prisma.media.findMany({
    where: { photographerId },
  });

export const incrementMediaLikes = async (mediaId, photographerId) => {
  const result = await prisma.media.updateMany({
    where: {
      id: mediaId,
      photographerId,
    },
    data: {
      likes: {
        increment: 1,
      },
    },
  });

  if (result.count === 0) {
    return null;
  }

  return prisma.media.findUnique({
    where: { id: mediaId },
  });
};
