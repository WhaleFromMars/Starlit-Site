import "server-only";
import { db } from "./index";

export async function getTop5Votes() {
  return await db.query.votes.findMany();
}

export async function getUserVotes(userId: string) {
    return await db.query.votes.findMany();
}

