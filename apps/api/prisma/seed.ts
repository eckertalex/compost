import {List, PrismaClient, Task} from '@prisma/client'
import {buildList, buildTask} from '../tests/generator'

const prisma = new PrismaClient()

const taskOverrides: Partial<Task>[] = [
  {
    title: 'Implement awesome web app',
    content:
      'Use react and chakra for frontend, and express and prisma for backend',
  },
  {
    title: 'Polish project',
    content: 'Add some nice Docs',
  },
  {
    title: 'Make a to do list',
    content: 'Like this one',
  },
  {
    title: "Check off first thing on the 'To do' list",
    content: 'Nice job!',
  },
  {
    title: "Realize you've already completed 2 things on the list",
    content: '',
  },
  {
    title: 'Reward yourself with a nap',
    content: 'zZzZzZzz',
  },
]

export const clearAllData = async () => {
  const tasks = await prisma.task.findMany({})
  const lists = await prisma.list.findMany({})

  const deleteTask = async (uuid: string) => {
    return await prisma.task.delete({
      where: {uuid},
    })
  }

  const deleteList = async (uuid: string) => {
    return await prisma.list.delete({
      where: {uuid},
    })
  }

  const deleteTasks = async () => {
    return Promise.all(tasks.map((task) => deleteTask(task.uuid)))
  }

  const deleteLists = async () => {
    return Promise.all(lists.map((list) => deleteList(list.uuid)))
  }

  await deleteTasks()
  await deleteLists()
}

function getDefaultList() {
  return buildList({displayName: 'Todo App'})
}

function getTasks(listUuid: string) {
  const tasks = []
  for (const overrides of taskOverrides) {
    const task = buildTask({...overrides, listUuid})
    tasks.push(task)
  }

  for (let i = 0; i < 100; i++) {
    const task = buildTask()
    tasks.push(task)
  }

  return tasks
}

async function seed() {
  const defaultList = getDefaultList()
  const tasks = getTasks(defaultList.uuid)

  await prisma.list.create({data: defaultList}).then(() => {
    console.log(`Default list was created`)
  })

  await prisma.task.createMany({data: tasks}).then((data) => {
    console.log(`${data.count} new tasks were created`)
  })
}

async function main() {
  console.log('Clearing all data ...')
  await clearAllData()
  console.log(`Start seeding ...`)
  await seed()
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
