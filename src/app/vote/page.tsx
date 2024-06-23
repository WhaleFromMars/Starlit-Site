import { getMyVotes, getTop5VotesMonth } from "~/server/db/queries";

export const dynamic = "force-dynamic";

export default async function VotePage() {
  
  const votes = await getTop5VotesMonth();

  return (
    <main className="">
      <h1>Vote</h1>
    </main>
  );
}
