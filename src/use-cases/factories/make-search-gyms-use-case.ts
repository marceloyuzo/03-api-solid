import { PrismaGymsRepository } from '../../repositories/prisma/prisma-gyms-repository'
import { SearchGymUserCase } from '../search-gyms'

export function makeSearchGymsUseCase() {
  const gymRepository = new PrismaGymsRepository()
  const useCase = new SearchGymUserCase(gymRepository)

  return useCase
}
