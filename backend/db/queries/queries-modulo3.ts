import { usuarios } from '../schema';
import { cache } from "react";
import { db } from "../drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const getUserProgress = cache(async() => {
  const { userId } = await auth()

  if(!userId){
    return null;
  }

  const data  = await db.select().from(usuarios)
  return data;
})