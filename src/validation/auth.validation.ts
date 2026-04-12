import { z } from 'zod'

const signInBaseSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Please enter a valid email address.'),
	password: z.string().min(1, 'Password is required')
})

export const customerSignInSchema = signInBaseSchema
export const resellerSignInSchema = signInBaseSchema
export const wholesalerSignInSchema = signInBaseSchema

export type CustomerSignInValues = z.infer<typeof customerSignInSchema>
export type ResellerSignInValues = z.infer<typeof resellerSignInSchema>
export type WholesalerSignInValues = z.infer<typeof wholesalerSignInSchema>

// Reseller Sign-Up Schemas (Step by step)
export const resellerStep1Schema = z.object({
	firstName: z.string().min(1, 'First name is required').min(2, 'First name must be at least 2 characters'),
	lastName: z.string().min(1, 'Last name is required').min(2, 'Last name must be at least 2 characters'),
	phoneNumber: z.string().min(1, 'Phone number is required'),
	email: z.email('Please enter a valid email address.'),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters long.')
		.max(64, 'Password must be at most 64 characters long.'),
	confirmPassword: z
		.string()
		.min(6, 'Confirm password must be at least 6 characters long.')
})

export const resellerStep2Schema = z.object({
	businessType: z.enum(['individual', 'company'], {
		message: 'Please select a business type'
	}),
	businessName: z.string().min(1, 'Business name is required'),
	industryCategory: z.string().min(1, 'Industry/Category is required'),
	businessAddress: z.string().min(1, 'Business address is required'),
	country: z.string().min(1, 'Country is required'),
	state: z.string().min(1, 'State/Province is required'),
	city: z.string().min(1, 'City is required'),
	zipCode: z.string().min(1, 'ZIP/Postal code is required'),
	streetAddress: z.string().min(1, 'Street address is required'),
	documents: z.string().optional()
})

export const resellerStep3Schema = z.object({
	accountHolderName: z.string().min(1, 'Account holder name is required'),
	bankName: z.string().min(1, 'Bank name is required'),
	accountNumber: z.string().min(1, 'Account number/IBAN is required'),
	swiftCode: z.string().min(1, 'SWIFT/Routing code is required'),
	paymentPreference: z.enum(['weekly', 'monthly', 'ondemand'], {
		message: 'Please select a payment preference'
	})
})

export const resellerStep4Schema = z.object({
	storeName: z.string().min(1, 'Store name is required').min(3, 'Store name must be at least 3 characters'),
	contactPhone: z.string().min(1, 'Contact phone is required'),
	storeDescription: z.string().min(1, 'Store description is required').min(10, 'Description must be at least 10 characters'),
	storeLogo: z.string().optional(),
	storeBanner: z.string().optional()
})

// Combined schema for final submission
export const resellerCompleteSignUpSchema = resellerStep1Schema
	.merge(resellerStep2Schema)
	.merge(resellerStep3Schema)
	.merge(resellerStep4Schema)
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword']
	})

export type ResellerStep1Values = z.infer<typeof resellerStep1Schema>
export type ResellerStep2Values = z.infer<typeof resellerStep2Schema>
export type ResellerStep3Values = z.infer<typeof resellerStep3Schema>
export type ResellerStep4Values = z.infer<typeof resellerStep4Schema>
export type ResellerCompleteSignUpValues = z.infer<typeof resellerCompleteSignUpSchema>


export const customerSignUpSchema = z
  .object({
    role: z.enum(['wholesaler', 'reseller', 'customer']),
    firstName: z.string().min(1, 'First name is required').min(2, 'Enter a valid first name'),
    lastName: z.string().min(1, 'Last name is required').min(2, 'Enter a valid last name'),
    email: z.email('Please enter a valid email address.'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long.')
      .max(64, 'Password must be at most 64 characters long.'),
    confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters long.')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })