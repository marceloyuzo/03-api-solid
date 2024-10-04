import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCheckInUseCase } from '../../../use-cases/factories/make-check-in-use-case'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { MaxDistanceError } from '../../../use-cases/errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '../../../use-cases/errors/max-number-of-check-ins-error'

export async function create(req: FastifyRequest, res: FastifyReply) {
  try {
    const createCheckInParamsSchema = z.object({
      gymId: z.string().uuid(),
    })

    const createCheckInBodySchema = z.object({
      latitude: z.coerce.number().refine((value) => {
        return Math.abs(value) <= 90
      }),
      longitude: z.coerce.number().refine((value) => {
        return Math.abs(value) <= 180
      }),
    })

    const { gymId } = createCheckInParamsSchema.parse(req.params)
    const { latitude, longitude } = createCheckInBodySchema.parse(req.body)

    const checkInUseCase = makeCheckInUseCase()

    await checkInUseCase.execute({
      gymId,
      userLatitude: latitude,
      userLongitude: longitude,
      userId: req.user.sub,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return res.status(404).send()
    }

    if (err instanceof MaxDistanceError) {
      return res.status(404).send()
    }

    if (err instanceof MaxNumberOfCheckInsError) {
      return res.status(404).send()
    }
  }

  return res.status(201).send()
}
