import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer,
  json,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `starlitsite_${name}`);

export const users = createTable("user", {
  id: varchar("id", { length: 32 }).notNull().primaryKey(),
  displayName: varchar("display_name", { length: 16 }).notNull(),
  profilePic: varchar("profile_pic", { length: 255 }),
  email: varchar("email", { length: 255 }),
});

export const storePurchases = createTable(
  "store_purchase",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 32 })
      .notNull()
      .references(() => users.id),
    item: varchar("item", { length: 50 }).notNull(),
    purchasedAt: timestamp("purchased_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (purchase) => ({
    userIdIndex: index("store_purchase_user_id_idx").on(purchase.userId),
  }),
);

export const votes = createTable(
  "vote",
  {
    userId: varchar("user_id", { length: 32 })
      .notNull()
      .primaryKey()
      .references(() => users.id),
    votesToday: integer("votes_today").default(0).notNull(),
    votesThisMonth: integer("votes_this_month").default(0).notNull(),
    votesThisYear: integer("votes_this_year").default(0).notNull(),
    votesPreviousMonths: json("votes_previous_months").default(sql`'{}'::json`),
  },
  (vote) => ({
    userIdIndex: index("vote_user_id_idx").on(vote.userId),
  }),
);
