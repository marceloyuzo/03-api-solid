import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeValidateCheckInUseCase } from '../../../use-cases/factories/make-validate-check-in-use-case'
import { LateCheckInValidationError } from '../../../use-cases/errors/late-check-in-validation-error'

export async function validate(req: FastifyRequest, res: FastifyReply) {
  try {
    const validateCheckInParamsSchema = z.object({
      checkInId: z.string().uuid(),
    })

    const { checkInId } = validateCheckInParamsSchema.parse(req.params)

    const validateCheckInUseCase = makeValidateCheckInUseCase()

    await validateCheckInUseCase.execute({
      checkInId,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return res.status(404).send()
    }

    if (err instanceof LateCheckInValidationError) {
      return res.status(404).send()
    }
  }

  return res.status(204).send()
}
