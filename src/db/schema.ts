import { relations } from 'drizzle-orm';
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  active: integer('active', { mode: 'boolean' }).default(true),
  email: text('email'),
});

export const events = sqliteTable('events', {
  id: text('id').primaryKey(),
});

export const usersOnEvents = sqliteTable(
  'users_events',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id),
    eventId: text('eventId')
      .notNull()
      .references(() => events.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.eventId] }),
  })
);

export const userRelations = relations(users, ({ many }) => ({
  userEvents: many(usersOnEvents),
}));

export const eventRelations = relations(events, ({ many }) => ({
  eventUsers: many(usersOnEvents),
}));

export const usersOnEventsRelations = relations(usersOnEvents, ({ one }) => ({
  user: one(users, { fields: [usersOnEvents.userId], references: [users.id] }),
  event: one(events, {
    fields: [usersOnEvents.eventId],
    references: [events.id],
  }),
}));
