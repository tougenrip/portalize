import prisma from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface Filters {
  age: number;
  tags: string;
  search: string;
  category: string;
  userLimit: number;
  sort: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //Get query params
    const id = req.query.id as string;

    const { page, pageSize, search, age, tags, category, userLimit, sort } =
      req.query as unknown as {
        page: any;
        pageSize: any;
        search: string;
        age: any;
        tags: string;
        category: string;
        userLimit: any;
        sort: string;
      };

    //If id is present, return the map with that id
    if (id) {
      const map = await findMap(parseInt(id));
      if (!map) {
        return res.status(404).json({ message: "Map not found" });
      }
      return res.status(200).json(map);
    } else {
      //If no page is present, return all maps
      const maps = await findMaps(parseInt(page), parseInt(pageSize), search, {
        age: parseInt(age),
        category,
        userLimit: parseInt(userLimit),
        tags,
        search,
        sort,
      });

      return res.status(200).json({
        data: maps.data,
        page: page,
        pageSize: pageSize,
        totalItems: maps.count,
        totalPages: Math.ceil(maps.count / pageSize),
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const findMap = async (id: number) => {
  try {
    const map = await prisma.map.findUnique({
      where: { id: id },
    });
    return map;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const findMaps = async (
  page: number,
  pageSize: number,
  search: string,
  filters: Filters
) => {
  //Calculate skip and take
  const skip = (page - 1) * pageSize || 0;
  const take = pageSize || 10;

  //Find maps with filters
  const [data, count] = await prisma.$transaction([
    prisma.map.findMany({
      where: {
        ...(search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { desc: { contains: search, mode: "insensitive" } },
              ],
            }
          : {}),
        ...(filters.age && { ageLimit: { equals: filters.age } }),
        ...(filters.userLimit && { userLimit: { equals: filters.userLimit } }),
        ...(filters.tags && { tags: { hasSome: filters.tags.split(",") } }),
        ...(filters.category && {
          cat: { contains: filters.category, mode: "insensitive" },
        }),
      },
      orderBy: {
        ...(filters.sort === "newest" ? { created: "desc" } : {}),
        ...(filters.sort === "oldest" ? { created: "asc" } : {}),
      },
      skip,
      take,
    }),
    prisma.map.count({where: {
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { desc: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(filters.age && { ageLimit: { equals: filters.age } }),
      ...(filters.userLimit && { userLimit: { equals: filters.userLimit } }),
      ...(filters.tags && { tags: { hasSome: filters.tags.split(",") } }),
      ...(filters.category && {
        cat: { contains: filters.category, mode: "insensitive" },
      }),
    }}),
  ]);

  return { data, count };
};
