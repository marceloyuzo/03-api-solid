import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeUserCheckInsHistoryUseCase } from '../../../use-cases/factories/make-fetch-user-check-ins-history-use-case'

export async function history(req: FastifyRequest, res: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(req.query)

  const userCheckInsHistoryUseCase = makeUserCheckInsHistoryUseCase()

  const { checkIns } = await userCheckInsHistoryUseCase.execute({
    page,
    userId: req.user.sub,
  })

  return res.status(200).send({
    checkIns,
  })
}
