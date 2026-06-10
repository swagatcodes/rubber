import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.activityLog.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPassword = await bcrypt.hash("Admin123!", 10);
  const adminUser = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      role: "ADMIN",
      emailVerified: new Date(),
      profile: {
        create: {
          bio: "System administrator",
          location: "Global",
        },
      },
    },
  });

  console.log("Created admin user:", adminUser);

  // Create regular users
  const userPassword = await bcrypt.hash("User123!", 10);
  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      password: userPassword,
      role: "USER",
      emailVerified: new Date(),
      profile: {
        create: {
          bio: "Passionate developer",
          location: "San Francisco",
          companyName: "Tech Corp",
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "jane@example.com",
      password: userPassword,
      role: "USER",
      emailVerified: new Date(),
      profile: {
        create: {
          bio: "Product designer",
          location: "New York",
          companyName: "Design Studio",
        },
      },
    },
  });

  console.log("Created users:", user1, user2);

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: "Premium Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 199.99,
        quantity: 50,
        category: "Electronics",
        userId: adminUser.id,
        published: true,
        featured: true,
        rating: 4.5,
        reviews: 120,
      },
    }),
    prisma.product.create({
      data: {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with precision tracking",
        price: 49.99,
        quantity: 100,
        category: "Electronics",
        userId: adminUser.id,
        published: true,
        featured: true,
        rating: 4.2,
        reviews: 85,
      },
    }),
    prisma.product.create({
      data: {
        name: "Mechanical Keyboard",
        description: "RGB mechanical keyboard with custom switches",
        price: 149.99,
        quantity: 75,
        category: "Electronics",
        userId: user1.id,
        published: true,
        rating: 4.7,
        reviews: 95,
      },
    }),
  ]);

  console.log("Created products:", products);

  // Create sample order
  const order = await prisma.order.create({
    data: {
      userId: user1.id,
      total: 249.98,
      status: "DELIVERED",
      items: {
        create: [
          {
            productId: products[0].id,
            quantity: 1,
            price: 199.99,
          },
          {
            productId: products[1].id,
            quantity: 1,
            price: 49.99,
          },
        ],
      },
    },
  });

  console.log("Created order:", order);

  // Create activity logs
  await prisma.activityLog.create({
    data: {
      userId: adminUser.id,
      action: "LOGIN",
      ipAddress: "192.168.1.1",
      userAgent: "Mozilla/5.0",
    },
  });

  console.log("Seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
