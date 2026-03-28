import { z } from 'zod'

const signInBaseSchema = z.object({
	email: z.email('Please enter a valid email address.'),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters long.')
		.max(64, 'Password must be at most 64 characters long.')
})

export const customerSignInSchema = signInBaseSchema
export const resellerSignInSchema = signInBaseSchema
export const wholesalerSignInSchema = signInBaseSchema

export type CustomerSignInValues = z.infer<typeof customerSignInSchema>
export type ResellerSignInValues = z.infer<typeof resellerSignInSchema>
export type WholesalerSignInValues = z.infer<typeof wholesalerSignInSchema>
