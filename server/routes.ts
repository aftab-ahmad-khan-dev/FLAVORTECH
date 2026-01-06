import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Menu Routes
  app.get(api.menu.list.path, async (req, res) => {
    const items = await storage.getMenuItems();
    res.json(items);
  });

  app.post(api.menu.create.path, async (req, res) => {
    try {
      const input = api.menu.create.input.parse(req.body);
      const item = await storage.createMenuItem(input);
      res.status(201).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.put(api.menu.update.path, async (req, res) => {
    try {
      const input = api.menu.update.input.parse(req.body);
      const item = await storage.updateMenuItem(Number(req.params.id), input);
      if (!item) return res.status(404).json({ message: "Item not found" });
      res.json(item);
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ message: err.errors[0].message });
        }
        throw err;
    }
  });

  // Order Routes
  app.get(api.orders.list.path, async (req, res) => {
    const orders = await storage.getOrders();
    res.json(orders);
  });

  app.post(api.orders.create.path, async (req, res) => {
    try {
      const input = api.orders.create.input.parse(req.body);
      const order = await storage.createOrder(input);
      res.status(201).json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.patch(api.orders.updateStatus.path, async (req, res) => {
    try {
      const { status } = api.orders.updateStatus.input.parse(req.body);
      const order = await storage.updateOrderStatus(Number(req.params.id), status);
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.json(order);
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ message: err.errors[0].message });
        }
        throw err;
    }
  });

  // Staff Routes
  app.get(api.staff.list.path, async (req, res) => {
    const staffMembers = await storage.getStaff();
    res.json(staffMembers);
  });

  // Stats Routes (Mocked aggregation for now)
  app.get(api.stats.overview.path, async (_req, res) => {
    res.json({
      totalRevenue: 15420,
      activeOrders: 12,
      totalCustomers: 1250,
      averageDeliveryTime: 24,
    });
  });

  // Seed Data function
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingMenu = await storage.getMenuItems();
  if (existingMenu.length === 0) {
    await storage.createMenuItem({
      name: "Spicy Chicken Burger",
      description: "Crispy chicken with spicy sauce",
      price: 1299,
      category: "main",
      isAvailable: true,
      isPopular: true,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60"
    });
    await storage.createMenuItem({
      name: "Truffle Fries",
      description: "Crispy fries with truffle oil",
      price: 699,
      category: "starter",
      isAvailable: true,
      isPopular: false,
      image: "https://images.unsplash.com/photo-1573080496987-aeb4d9171d55?auto=format&fit=crop&w=500&q=60"
    });
    await storage.createMenuItem({
      name: "Classic Cheeseburger",
      description: "Beef patty, cheddar, lettuce, tomato",
      price: 1099,
      category: "main",
      isAvailable: true,
      isPopular: true,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60"
    });
  }
}
