import {PrismaClient, Prisma} from '@prisma/client'

const prisma = new PrismaClient()

const todoData: Prisma.TodoCreateInput[] = [
  {
    title: 'Implement awesome web app',
    description: 'Use react, typescript, and chakra-ui',
  },
  {
    title: 'Polish project',
    description: 'Docs, testing, pretty ui etc.',
  },
  {
    title: 'Make a to do list',
  },
  {
    title: "Check off first thing on the 'To do' list",
  },
  {
    title: "Realize you've already completed 2 things on the list",
    description: "Awesome, you're the best :)",
  },
  {
    title: 'Reward yourself with a nap',
    description: 'Sleep is important',
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const t of todoData) {
    const todo = await prisma.todo.create({
      data: t,
    })
    console.log(`Created todo with id: ${todo.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
