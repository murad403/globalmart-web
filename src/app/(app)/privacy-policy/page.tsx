import PolicyPageTemplate from '@/components/shared/PolicyPageTemplate'

const intro = [
  'This Privacy Policy describes how United Deals (the Site, we, us, or our) collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from uniteddeals.com.',
  'Please read this Privacy Policy carefully. By using and accessing any of the Services, you agree to the collection, use and disclosure of your information as described in this Privacy Policy.'
]

const sections = [
  {
    heading: 'Information We Collect',
    paragraphs: [
      'The personal information we obtain depends on how you interact with our Site and Services. We may collect your name, email address, phone number, shipping address, billing address and payment details.',
      'We may also collect technical information including IP address, browser type, device identifiers and browsing behavior through cookies and similar technologies.'
    ]
  },
  {
    heading: 'How We Use Your Information',
    paragraphs: [
      'We use your information to provide products and services, process payments, fulfill orders, deliver customer support, and communicate with you about your account or orders.',
      'We may also use information to improve our services, prevent fraud and comply with legal obligations.'
    ]
  },
  {
    heading: 'Cookies and Tracking Technologies',
    paragraphs: [
      'Like many websites, we use cookies and similar technologies to operate and improve our services. Cookies help us remember your preferences and understand how users interact with our website.',
      'You can adjust your browser settings to remove or reject cookies, but doing so may affect your user experience and certain features may not function properly.'
    ]
  },
  {
    heading: 'How We Share Personal Information',
    paragraphs: [
      'We may share personal information with service providers that help us operate our business, such as payment processors, shipping partners, analytics providers and customer support partners.',
      'We may disclose your information if required by law, to enforce our terms, or to protect the rights, property or safety of our company, users or others.'
    ]
  },
  {
    heading: 'User Generated Content',
    paragraphs: [
      'If you post product reviews or submit other user-generated content, this content may be visible to the public. Please avoid sharing sensitive personal data in public areas of the website.'
    ]
  },
  {
    heading: 'Data Retention',
    paragraphs: [
      'We retain personal information for as long as necessary to fulfill the purposes outlined in this policy, including legal, accounting and reporting requirements.',
      'When information is no longer required, we take reasonable steps to delete or anonymize it.'
    ]
  },
  {
    heading: 'Your Rights',
    paragraphs: [
      'Depending on your location, you may have rights to access, correct, update, delete or restrict the processing of your personal information.',
      'You may contact us to exercise your rights. We may request information to verify your identity before processing your request.'
    ],
    bullets: [
      'Right to know what personal data we collect and process',
      'Right to request correction of inaccurate information',
      'Right to request deletion of eligible personal information',
      'Right to opt out of certain targeted advertising uses'
    ]
  },
  {
    heading: 'Data Security',
    paragraphs: [
      'We implement technical and organizational safeguards designed to protect your personal information. However, no security system is completely secure and we cannot guarantee absolute security.'
    ]
  },
  {
    heading: 'Children\'s Data',
    paragraphs: [
      'Our services are not directed to children. If we become aware that we have collected personal information from a child in violation of applicable law, we will take appropriate steps to delete such information.'
    ]
  },
  {
    heading: 'Changes to This Privacy Policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices, operational requirements, legal obligations or regulatory updates. The revised version will be posted on this page with an updated effective date.'
    ]
  },
  {
    heading: 'Contact Us',
    paragraphs: [
      'If you have questions or concerns about this Privacy Policy, you may email us at uniteddeals.contact@gmail.com or write to A-3/B, 5.G. Towers, Biringi Mondal Para, Benachity, Durgapur, Paschim Bardhaman, West Bengal, India - 713213.'
    ]
  }
]

const PrivacyPolicyPage = () => {
  return (
    <PolicyPageTemplate title="Privacy Policy" intro={intro} sections={sections} />
  )
}

export default PrivacyPolicyPage
