import {PrismaClient, Prisma} from '@prisma/client'

const prisma = new PrismaClient()

const taskData: Prisma.TaskCreateInput[] = [
  {
    completed: false,
    title: 'Implement awesome web app',
    description:
      'Use react and chakra for frontend, and express and prisma for backend',
  },
  {
    completed: false,
    title: 'Polish project',
    description: 'Add some nice Docs',
  },
  {
    completed: true,
    title: 'Make a to do list',
    description: 'Like this one',
  },
  {
    completed: true,
    title: "Check off first thing on the 'To do' list",
    description: 'Nice job!',
  },
  {
    completed: true,
    title: "Realize you've already completed 2 things on the list",
    description: '',
  },
  {
    completed: true,
    title: 'Reward yourself with a nap',
    description: 'zZzZzZzz',
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const t of taskData) {
    const task = await prisma.task.create({
      data: t,
    })
    console.log(`Created task with uuid: ${task.uuid}`)
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
