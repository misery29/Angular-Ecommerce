import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const IMAGE_PLACEHOLDER = 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081';

export async function main() {

  await prisma.product.createMany({
    data: [
      {
        name: 'Camiseta Festival',
        description: 'Camiseta oficial do festival, 100% algodão.',
        price: 59.90,
        imageUrl: IMAGE_PLACEHOLDER
      },
      {
        name: 'Caneca Festival',
        description: 'Caneca personalizada do festival.',
        price: 29.90,
        imageUrl: IMAGE_PLACEHOLDER
      },
      {
        name: 'Boné Festival',
        description: 'Boné estiloso para curtir o evento.',
        price: 39.90,
        imageUrl: IMAGE_PLACEHOLDER
      },
      {
        name: 'Pulseira VIP',
        description: 'Pulseira de acesso VIP ao festival.',
        price: 99.90,
        imageUrl: IMAGE_PLACEHOLDER
      },
      {
        name: 'Óculos de Sol',
        description: 'Óculos de sol estiloso para o festival.',
        price: 49.90,
        imageUrl: IMAGE_PLACEHOLDER
      },
      {
        name: 'Chaveiro Festival',
        description: 'Chaveiro exclusivo do festival.',
        price: 14.90,
        imageUrl: IMAGE_PLACEHOLDER
      },
      {
        name: 'Ecobag Festival',
        description: 'Ecobag ecológica para levar suas compras.',
        price: 24.90,
        imageUrl: IMAGE_PLACEHOLDER
      },
      {
        name: 'Adesivo Festival',
        description: 'Adesivo decorativo do festival.',
        price: 4.90,
        imageUrl: IMAGE_PLACEHOLDER
      },
      {
        name: 'Copo Térmico',
        description: 'Copo térmico para bebidas geladas ou quentes.',
        price: 34.90,
        imageUrl: IMAGE_PLACEHOLDER
      },
      {
        name: 'Toalha Festival',
        description: 'Toalha exclusiva para curtir o evento.',
        price: 54.90,
        imageUrl: IMAGE_PLACEHOLDER
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect()); 