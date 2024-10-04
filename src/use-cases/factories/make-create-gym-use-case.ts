import { PrismaGymsRepository } from '../../repositories/prisma/prisma-gyms-repository'
import { CreateGymUserCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const gymRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUserCase(gymRepository)

  return useCase
}
