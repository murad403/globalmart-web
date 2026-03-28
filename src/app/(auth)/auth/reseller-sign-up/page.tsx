'use client'
import React, { useState } from 'react'
import { ChevronRight, Upload, FileText, Briefcase, CreditCard, Store, User, ChevronLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  resellerCompleteSignUpSchema,
  type ResellerCompleteSignUpValues
} from '@/validation/auth.validation'
import { Button } from '@/components/ui/button'

type DocumentType = 'identityDocument' | 'passport' | 'businessRegistration' | 'taxCertificate'

const ResellerSignUpPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [businessType, setBusinessType] = useState('individual')
  const [paymentPreference, setPaymentPreference] = useState('weekly')
  const [selectedDocumentTab, setSelectedDocumentTab] = useState<DocumentType>('identityDocument')
  const [documentFiles, setDocumentFiles] = useState<Partial<Record<DocumentType, File | null>>>({})
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [bannerFile, setBannerFile] = useState<File | null>(null)

  const stepItems = [
    { id: 1, title: 'Basic Info', subtitle: 'Personal details' },
    { id: 2, title: 'Business', subtitle: 'Business information' },
    { id: 3, title: 'Payment', subtitle: 'Payment setup' },
    { id: 4, title: 'Store Setup', subtitle: 'Store configuration' }
  ]

  const documentTabs: Array<{ id: DocumentType; label: string }> = [
    { id: 'identityDocument', label: 'Identity Document' },
    { id: 'passport', label: 'Passport' },
    { id: 'businessRegistration', label: 'Business Registration' },
    { id: 'taxCertificate', label: 'Tax Certificate' }
  ]

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger
  } = useForm<ResellerCompleteSignUpValues>({
    resolver: zodResolver(resellerCompleteSignUpSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: 'Demo',
      lastName: 'User',
      phoneNumber: '01700000000',
      email: 'demo@example.com',
      password: '123456',
      confirmPassword: '123456',
      businessType: 'individual',
      businessName: 'Demo Store',
      industryCategory: 'Fashion',
      businessAddress: 'Demo Business Address',
      country: 'Bangladesh',
      state: 'Dhaka',
      city: 'Dhaka',
      zipCode: '1207',
      streetAddress: 'House 10, Road 5',
      paymentPreference: 'weekly',
      accountHolderName: 'Demo User',
      bankName: 'Demo Bank',
      accountNumber: '123456789',
      swiftCode: 'DEMO1234',
      storeName: 'Demo Reseller Store',
      contactPhone: '01700000000',
      storeDescription: 'This is a demo store description for testing sign-up flow.'
    }
  })

  const handleDocumentUpload = (docType: DocumentType, files: FileList | null) => {
    const file = files?.[0] ?? null
    setDocumentFiles((prev) => {
      const updated = { ...prev, [docType]: file }
      const uploadedLabels = documentTabs
        .filter((tab) => updated[tab.id])
        .map((tab) => tab.label)
        .join(', ')
      setValue('documents', uploadedLabels)
      return updated
    })
  }

  const handleLogoUpload = (files: FileList | null) => {
    const file = files?.[0] ?? null
    setLogoFile(file)
    if (file) {
      setValue('storeLogo', file.name)
    }
  }

  const handleBannerUpload = (files: FileList | null) => {
    const file = files?.[0] ?? null
    setBannerFile(file)
    if (file) {
      setValue('storeBanner', file.name)
    }
  }

  const onSubmit = async (values: ResellerCompleteSignUpValues) => {
    console.log('Form submitted:', values)
  }

  const handleNext = async () => {
    let isValid = false
    if (currentStep === 1) {
      isValid = await trigger(['firstName', 'lastName', 'phoneNumber', 'email', 'password', 'confirmPassword'])
    } else if (currentStep === 2) {
      isValid = await trigger(['businessType', 'businessName', 'industryCategory', 'businessAddress', 'country', 'state', 'city', 'zipCode', 'streetAddress'])
    } else if (currentStep === 3) {
      isValid = await trigger(['accountHolderName', 'bankName', 'accountNumber', 'swiftCode', 'paymentPreference'])
    }

    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleFinalSubmit = async () => {
    const isValid = await trigger()
    if (isValid) await handleSubmit(onSubmit)()
  }

  return (
    <section className="min-h-screen w-full bg-white py-12">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold text-heading bg-[#FFEDD4] inline-block px-2 py-0.5 rounded-2xl">Reseller Registration</p>
          <h1 className="mt-2 text-4xl font-bold text-main">
            Create Your Seller <span className="text-heading">Account</span>
          </h1>
          <p className="mt-3 text-lg text-description">Join thousands of successful sellers on our platform</p>
        </div>

        {/* Step Indicator */}
        <div className="mb-12">
          <div className="flex items-start justify-between gap-2 sm:gap-4">
            {stepItems.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition ${
                        step.id < currentStep
                          ? 'bg-green-500 text-white'
                          : step.id === currentStep
                            ? 'bg-heading text-white'
                            : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {step.id < currentStep ? '✓' : step.id}
                    </div>
                    <p className="mt-3 text-center text-sm font-semibold leading-none text-title">{step.title}</p>
                    <p className="mt-1 text-center text-xs leading-none text-description">{step.subtitle}</p>
                  </div>
                </div>
                {index < stepItems.length - 1 && (
                  <div
                    className={`mt-5 hidden h-px flex-1 border-t transition sm:block ${
                      step.id < currentStep ? 'border-green-500' : 'border-slate-300'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="rounded-xl border border-slate-200 shadow-sm p-8">
          <form onSubmit={(e) => e.preventDefault()}>

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-heading text-white">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-title">Basic Information</h2>
                    <p className="text-lg text-description">Tell us about yourself</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-title">First Name</label>
                    <input type="text" placeholder="Enter your first name" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base outline-none placeholder:text-slate-400" {...register('firstName')} />
                    {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-title">Last Name</label>
                    <input type="text" placeholder="Enter your last name" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base outline-none placeholder:text-slate-400" {...register('lastName')} />
                    {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-title">Phone Number</label>
                  <input type="tel" placeholder="Enter your phone number" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base outline-none placeholder:text-slate-400" {...register('phoneNumber')} />
                  {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber.message}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-title">Email Address</label>
                  <input type="email" placeholder="Enter your email address" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base outline-none placeholder:text-slate-400" {...register('email')} />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-title">Password</label>
                    <input type="password" placeholder="Create a password" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base outline-none placeholder:text-slate-400" {...register('password')} />
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-title">Confirm Password</label>
                    <input type="password" placeholder="Confirm your password" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base outline-none placeholder:text-slate-400" {...register('confirmPassword')} />
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Business Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-heading text-white">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-title">Business Information</h2>
                    <p className="text-lg text-description">Details about your business</p>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-base font-semibold text-description">Business Type</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {(['individual', 'company'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setBusinessType(type)
                          setValue('businessType', type, { shouldValidate: true }) // ✅ fix 3
                        }}
                        className={`rounded-lg border-2 px-4 py-4 text-center transition ${
                          businessType === type ? 'border-heading bg-heading/10' : 'border-slate-200 hover:border-heading'
                        }`}
                      >
                        <p className="font-bold text-title capitalize">{type}</p>
                        <p className="text-sm text-description">
                          {type === 'individual' ? 'Sole proprietor or freelancer' : 'Registered business entity'}
                        </p>
                      </button>
                    ))}
                  </div>
                  {/* ✅ hidden input সরিয়ে দেওয়া হয়েছে */}
                  {errors.businessType && <p className="mt-1 text-sm text-red-500">{errors.businessType.message}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-title">Business Name</label>
                  <input type="text" placeholder="Enter business name" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base outline-none placeholder:text-slate-400" {...register('businessName')} />
                  {errors.businessName && <p className="mt-1 text-sm text-red-500">{errors.businessName.message}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-title">Industry/Category</label>
                  <input type="text" placeholder="Industry/Category" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base outline-none placeholder:text-slate-400" {...register('industryCategory')} />
                  {errors.industryCategory && <p className="mt-1 text-sm text-red-500">{errors.industryCategory.message}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-title">Business Address</label>
                  <input type="text" placeholder="Enter business address" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base outline-none placeholder:text-slate-400" {...register('businessAddress')} />
                  {errors.businessAddress && <p className="mt-1 text-sm text-red-500">{errors.businessAddress.message}</p>}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-title">Country</label>
                    <input type="text" placeholder="Country" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base outline-none placeholder:text-slate-400" {...register('country')} />
                    {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country.message}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-title">State/Province</label>
                    <input type="text" placeholder="Enter state or province" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base outline-none placeholder:text-slate-400" {...register('state')} />
                    {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-title">City</label>
                    <input type="text" placeholder="Enter city" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base outline-none placeholder:text-slate-400" {...register('city')} />
                    {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-title">ZIP/Postal Code</label>
                    <input type="text" placeholder="Enter ZIP code" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base outline-none placeholder:text-slate-400" {...register('zipCode')} />
                    {errors.zipCode && <p className="mt-1 text-sm text-red-500">{errors.zipCode.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-title">Street Address</label>
                  <input type="text" placeholder="Enter street address" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base outline-none placeholder:text-slate-400" {...register('streetAddress')} />
                  {errors.streetAddress && <p className="mt-1 text-sm text-red-500">{errors.streetAddress.message}</p>}
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-title">Upload Documents *</p>
                  <p className="mb-3 text-xs text-description">Document Type</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {documentTabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setSelectedDocumentTab(tab.id)}
                        className={`rounded-md border px-3 py-2 text-xs font-medium transition ${
                          selectedDocumentTab === tab.id
                            ? 'border-heading bg-[#FFF1E8] text-heading'
                            : 'border-slate-200 bg-white text-description hover:border-heading/60'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-3 rounded-lg border-2 border-dashed border-slate-300 p-8">
                    <div className="text-center">
                      <FileText className="mx-auto h-12 w-12 text-slate-400" />
                      <p className="mt-3 font-semibold text-title">Upload {documentTabs.find((tab) => tab.id === selectedDocumentTab)?.label}</p>
                      <p className="text-sm text-description">Accepted formats: PDF, JPG, JPEG, PNG</p>
                      <input
                        id={`document-upload-${selectedDocumentTab}`}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={(e) => handleDocumentUpload(selectedDocumentTab, e.target.files)}
                      />
                      <label
                        htmlFor={`document-upload-${selectedDocumentTab}`}
                        className="mt-4 inline-flex cursor-pointer items-center rounded-lg bg-heading px-6 py-2 text-white font-medium hover:bg-heading/90"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Choose File
                      </label>
                      <p className="mt-2 text-xs text-description">
                        {documentFiles[selectedDocumentTab]?.name ?? 'No file chosen'}
                      </p>
                    </div>
                  </div>

                  {Object.values(documentFiles).some(Boolean) && (
                    <div className="mt-3 space-y-1">
                      {documentTabs.map((tab) =>
                        documentFiles[tab.id] ? (
                          <p key={tab.id} className="text-xs text-description">
                            <span className="font-medium text-title">{tab.label}:</span> {documentFiles[tab.id]?.name}
                          </p>
                        ) : null
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Payment Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-heading text-white">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-title">Payment Information</h2>
                    <p className="text-lg text-description">Set up your payment details for receiving earnings</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-title">Account Holder Name</label>
                    <input type="text" placeholder="Enter account holder name" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base outline-none placeholder:text-slate-400" {...register('accountHolderName')} />
                    {errors.accountHolderName && <p className="mt-1 text-sm text-red-500">{errors.accountHolderName.message}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-title">Bank Name</label>
                    <input type="text" placeholder="Enter bank name" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base outline-none placeholder:text-slate-400" {...register('bankName')} />
                    {errors.bankName && <p className="mt-1 text-sm text-red-500">{errors.bankName.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-title">Account Number / IBAN</label>
                    <input type="text" placeholder="Enter account number / IBAN" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base outline-none placeholder:text-slate-400" {...register('accountNumber')} />
                    {errors.accountNumber && <p className="mt-1 text-sm text-red-500">{errors.accountNumber.message}</p>}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-title">SWIFT / Routing Code</label>
                    <input type="text" placeholder="Enter SWIFT / routing code" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base outline-none placeholder:text-slate-400" {...register('swiftCode')} />
                    {errors.swiftCode && <p className="mt-1 text-sm text-red-500">{errors.swiftCode.message}</p>}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-base font-semibold text-description">Payment Preferences</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {(['weekly', 'monthly', 'ondemand'] as const).map((pref) => (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => {
                          setPaymentPreference(pref)
                          setValue('paymentPreference', pref, { shouldValidate: true }) // ✅ fix 4
                        }}
                        className={`rounded-lg border-2 px-4 py-4 text-center transition ${
                          paymentPreference === pref ? 'border-heading bg-heading/10' : 'border-slate-200 hover:border-heading'
                        }`}
                      >
                        <p className="font-bold text-title capitalize">
                          {pref === 'weekly' && 'Weekly'}
                          {pref === 'monthly' && 'Monthly'}
                          {pref === 'ondemand' && 'On-demand'}
                        </p>
                        <p className="text-sm text-description">
                          {pref === 'weekly' && 'Receive payments every week'}
                          {pref === 'monthly' && 'Receive payments every month'}
                          {pref === 'ondemand' && 'Request payouts manually'}
                        </p>
                      </button>
                    ))}
                  </div>
                  {/* ✅ hidden input সরিয়ে দেওয়া হয়েছে */}
                  {errors.paymentPreference && <p className="mt-1 text-sm text-red-500">{errors.paymentPreference.message}</p>}
                </div>
              </div>
            )}

            {/* Step 4: Store Setup */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-heading text-white">
                    <Store className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-title">Store Setup</h2>
                    <p className="text-lg text-description">Configure your store setting and branding</p>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-title">Store Name</label>
                  <input type="text" placeholder="Enter your store name" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base outline-none placeholder:text-slate-400" {...register('storeName')} />
                  {errors.storeName && <p className="mt-1 text-sm text-red-500">{errors.storeName.message}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-title">Contact Phone (Optional)</label>
                  <input type="tel" placeholder="Enter contact phone" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base outline-none placeholder:text-slate-400" {...register('contactPhone')} />
                  {errors.contactPhone && <p className="mt-1 text-sm text-red-500">{errors.contactPhone.message}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-title">Store Description</label>
                  <textarea placeholder="Write a short description about your store..." className="h-24 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base outline-none placeholder:text-slate-400" {...register('storeDescription')} />
                  {errors.storeDescription && <p className="mt-1 text-sm text-red-500">{errors.storeDescription.message}</p>}
                  <p className="mt-2 text-xs text-slate-500">This will be displayed on your store page</p>
                </div>

                    <label className="mb-2 block text-sm font-medium text-title">Store Branding</label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border-2 border-dashed border-slate-300 p-6">
                    <div className="text-center">
                      <Upload className="mx-auto h-10 w-10 text-slate-400" />
                      <p className="mt-2 font-semibold text-title">Upload Logo</p>
                      <p className="text-xs text-description">Recommended Size: (PNG, JPG)</p>
                      <input
                        id="logo-upload"
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        className="hidden"
                        onChange={(e) => handleLogoUpload(e.target.files)}
                      />
                      <label
                        htmlFor="logo-upload"
                        className="mt-3 inline-flex cursor-pointer rounded-lg bg-heading px-4 py-2 text-sm font-medium text-white hover:bg-heading/90"
                      >
                        Choose File
                      </label>
                      {logoFile && (
                        <p className="mt-2 text-xs text-description">
                          <span className="font-medium text-title">{logoFile.name}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="rounded-lg border-2 border-dashed border-slate-300 p-6">
                    <div className="text-center">
                      <Upload className="mx-auto h-10 w-10 text-slate-400" />
                      <p className="mt-2 font-semibold text-title">Upload Banner</p>
                      <p className="text-xs text-description">Recommended Size: (PNG, JPG)</p>
                      <input
                        id="banner-upload"
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        className="hidden"
                        onChange={(e) => handleBannerUpload(e.target.files)}
                      />
                      <label
                        htmlFor="banner-upload"
                        className="mt-3 inline-flex cursor-pointer rounded-lg bg-heading px-4 py-2 text-sm font-medium text-white hover:bg-heading/90"
                      >
                        Choose File
                      </label>
                      {bannerFile && (
                        <p className="mt-2 text-xs text-description">
                          <span className="font-medium text-title">{bannerFile.name}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center gap-1 rounded-lg px-6 py-3 font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>

              {currentStep < 4 ? (
                <Button type="button" onClick={handleNext}>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="rounded-lg bg-green-500 px-8 py-3 font-medium text-white hover:bg-green-600 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Submitting...' : '✓ Submit'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ResellerSignUpPage