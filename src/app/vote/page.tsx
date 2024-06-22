import { headers } from "next/headers";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default function VotePage() {
  
  const votes = db.query.votes.findMany(
    {
      orderBy: (model, {desc}) => desc(model.votesThisMonth),
    }
  );

  return (
    <main className="">
      <h1>Vote</h1>
    </main>
  );
}
