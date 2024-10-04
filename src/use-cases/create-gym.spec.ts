import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUserCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUserCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUserCase(gymsRepository) // sut = system under test
  })

  it('should be possible create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'JS Gym',
      description: 'description-01',
      phone: '12341234',
      latitude: -23.4252151,
      longitude: -51.9371846,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
