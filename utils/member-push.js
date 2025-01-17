"use server";
import { createReadStream } from "fs";
import { parse } from "csv-parse";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function pushMembersFromCSV(filepath) {
  const records = [];

  const parser = createReadStream(filepath).pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
      columns: (header) => header.map((column) => column.toLowerCase()),
      trim: true, // Add trim to remove any whitespace
      bom: true, // Handle any BOM characters
    })
  );

  for await (const record of parser) {
    console.log("Processing record:", record); // Debug log
    records.push({
      name: record.Name || record.name, // Try both cases
      phone: record.Phone || record.phone,
      email: record.Email || record.email,
      roll: record.Roll || record.roll,
    });
  }

  try {
    const result = await prisma.user.createMany({
      data: records,
      skipDuplicates: true,
    });
    console.log(`Successfully inserted ${result.count} members`);
  } catch (error) {
    console.error("Error inserting members:", error);
  } finally {
    await prisma.$disconnect();
  }
}

pushMembersFromCSV("./members.csv");
