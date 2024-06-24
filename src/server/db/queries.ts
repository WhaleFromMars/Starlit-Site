import "server-only";
import { db } from "./index";
import { cookies } from "next/headers";

/** takes input of a 32-character UUID and returns true or false*/
export async function hasUserPlayed(userUuid: string): Promise<boolean> {
  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.id, userUuid),
  });

  if (!user) return false;
  return true;
}

export async function getTop5VotesMonth() {
  return await db.query.votes.findMany({
    orderBy: (votes, { asc }) => [asc(votes.votesThisMonth)],
    limit: 5,
  });
}

export async function getTop5VotesYear() {
  return await db.query.votes.findMany({
    orderBy: (votes, { asc }) => [asc(votes.votesThisYear)],
    limit: 5,
  });
}

export async function getMyVotes() {
  const user = cookies().get("useruuid");

  if (!user) throw new Error("User not logged in");
  const voteData = await db.query.votes.findFirst({
    where: (model, { eq }) => eq(model.userId, user.value),
  });
  return voteData;
}
