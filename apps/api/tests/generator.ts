import {faker} from '@faker-js/faker'
import {List, Status, Task} from '@prisma/client'

export function buildList(overrides?: Partial<List>): List {
  const createdDateTime = faker.date.recent()
  const lastModifiedDateTime = faker.datatype.boolean()
    ? createdDateTime
    : faker.date.recent()

  return {
    uuid: faker.datatype.uuid(),
    displayName: faker.lorem.words(),
    createdDateTime,
    lastModifiedDateTime,
    ...overrides,
  }
}

export function buildTask(overrides?: Partial<Task>): Task {
  const status = faker.helpers.arrayElement([
    Status.NOT_STARTED,
    Status.IN_PROGRESS,
    Status.COMPLETED,
    Status.WAITING_ON_OTHERS,
    Status.DEFERRED,
  ])
  const createdDateTime = faker.date.recent()
  const completedDateTime =
    status === 'COMPLETED' ? faker.date.recent(2, createdDateTime) : null
  const dueDateTime = completedDateTime
    ? faker.date.soon(undefined, completedDateTime)
    : faker.date.soon()
  const lastModifiedDateTime = faker.datatype.boolean()
    ? createdDateTime
    : completedDateTime
    ? completedDateTime
    : faker.date.between(createdDateTime, dueDateTime)

  const content = faker.datatype.boolean() ? null : faker.lorem.sentence()

  return {
    uuid: faker.datatype.uuid(),
    title: faker.lorem.words(faker.datatype.number(11)),
    status,
    completedDateTime,
    importance: faker.helpers.arrayElement(['LOW', 'NORMAL', 'HIGH']),
    lastModifiedDateTime,
    dueDateTime,
    createdDateTime,
    content,
    listUuid: null,
    ...overrides,
  }
}
