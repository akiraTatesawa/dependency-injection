import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class DBContext {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async connect() {
    await this.prisma.$connect();

    console.log("Prisma Connected");
  }

  get user() {
    return this.prisma.user;
  }
}
