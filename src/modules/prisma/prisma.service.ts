import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { PrismaClient } from 'src/generated/prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // 1. Criamos a conexão usando o driver 'pg'
    const pool = new Pool({ connectionString: process.env.DATABASE_URL })

    // 2. Criamos o adapter (necessário no Prisma 7)
    const adapter = new PrismaPg(pool)

    // 3. Inicializamos o PrismaClient com o adapter
    super({ adapter })
  }

  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
