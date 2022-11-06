import { User } from "@/entities/user.entity";
import { injectable } from "inversify";
import { User as PrismaUser } from "@prisma/client";
import { UpdateUserDTO } from "@/dto/update-user.dto";
import { UserRepositoryInterface } from "../user-repository-interface";
import { DBContext } from "../../data/DBContext";

@injectable()
export class UserRepositoryPrisma implements UserRepositoryInterface {
  private readonly prisma: DBContext;

  constructor(prisma: DBContext) {
    this.prisma = prisma;
  }

  public async findByEmail(email: string): Promise<PrismaUser | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async create(user: User): Promise<PrismaUser> {
    return this.prisma.user.create({
      data: user,
    });
  }

  public async findById(id: string): Promise<PrismaUser | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  public async findAll(): Promise<PrismaUser[]> {
    return this.prisma.user.findMany();
  }

  public async update({ id, ...data }: UpdateUserDTO): Promise<void> {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }
}
