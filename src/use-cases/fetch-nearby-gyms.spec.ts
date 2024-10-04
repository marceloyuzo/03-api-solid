import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository) // sut = system under test
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'description-01',
      phone: '12341234',
      latitude: -23.4252151,
      longitude: -51.9371846,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: 'description-01',
      phone: '12341234',
      latitude: -23.3159429,
      longitude: -51.1835328,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.4218097,
      userLongitude: -51.9358867,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
