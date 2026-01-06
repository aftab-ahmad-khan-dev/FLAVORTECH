import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

// Users (for basic auth structure, even if mocked on client)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("manager"), // manager, admin, staff
  avatar: text("avatar"),
});

export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price").notNull(), // in cents
  category: text("category").notNull(), // main, starter, dessert, drink
  image: text("image"),
  isAvailable: boolean("is_available").default(true),
  isPopular: boolean("is_popular").default(false),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  status: text("status").notNull().default("pending"), // pending, preparing, ready, delivered, cancelled
  totalAmount: integer("total_amount").notNull(),
  items: jsonb("items").notNull(), // Array of { menuItemId, quantity, name, price }
  createdAt: timestamp("created_at").defaultNow(),
});

export const staff = pgTable("staff", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(), // chef, rider, waiter
  status: text("status").notNull().default("idle"), // idle, busy, offline
  performanceRating: integer("performance_rating").default(5),
});

export const promotions = pgTable("promotions", {
  id: serial("id").primaryKey(),
  code: text("code").notNull(),
  discountType: text("discount_type").notNull(), // percentage, fixed
  discountValue: integer("discount_value").notNull(),
  isActive: boolean("is_active").default(true),
  usageCount: integer("usage_count").default(0),
});

// === SCHEMAS ===

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertMenuItemSchema = createInsertSchema(menuItems).omit({ id: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });
export const insertStaffSchema = createInsertSchema(staff).omit({ id: true });
export const insertPromotionSchema = createInsertSchema(promotions).omit({ id: true });

// === TYPES ===

export type User = typeof users.$inferSelect;
export type MenuItem = typeof menuItems.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Staff = typeof staff.$inferSelect;
export type Promotion = typeof promotions.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type InsertStaff = z.infer<typeof insertStaffSchema>;
export type InsertPromotion = z.infer<typeof insertPromotionSchema>;
