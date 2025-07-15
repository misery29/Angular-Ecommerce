import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@admin.com';
  try {
    const adminExists = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('Admin123', 10);
      await prisma.user.create({
        data: {
          name: 'Administrador',
          email: adminEmail,
          password: hashedPassword,
          phone: '+5511999999999',
          role: 'admin',
        },
      });
      console.log('Usuário admin criado!');
    } else {
      console.log('Usuário admin já existe.');
    }
  } catch (err) {
    console.error('Erro ao criar admin:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 