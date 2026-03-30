import PolicyPageTemplate from '@/components/shared/PolicyPageTemplate'

const intro = [
  'This website is operated by United Deals. Throughout the site, the terms "we", "us" and "our" refer to United Deals. United Deals offers this website, including all information, tools and Services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.',
  'Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all terms and conditions of this agreement, then you may not access the website or use any Services.'
]

const sections = [
  {
    heading: 'Section 1 - Online Store Terms',
    paragraphs: [
      'By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you have given us consent to allow any of your minor dependents to use this site.',
      'You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction.'
    ]
  },
  {
    heading: 'Section 2 - General Conditions',
    paragraphs: [
      'We reserve the right to refuse service to anyone for any reason at any time.',
      'Your credit card data is always encrypted during transfer over networks. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service without express written permission by us.'
    ]
  },
  {
    heading: 'Section 3 - Accuracy and Timeliness of Information',
    paragraphs: [
      'The material on this site is provided for general information and should not be relied upon as the sole basis for making decisions without consulting primary sources.',
      'Any reliance on the material on this site is at your own risk.'
    ]
  },
  {
    heading: 'Section 4 - Return and Refund Policy',
    paragraphs: [
      'Returns must be requested within 30 days after delivery for eligible products. To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging.',
      'To start a return, contact us at uniteddeals.contact@gmail.com. If your return is accepted, we will send return shipping instructions. Items sent back without requesting a return first will not be accepted.'
    ]
  },
  {
    heading: 'Damages and Issues',
    paragraphs: [
      'Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item so that we can evaluate the issue and make it right.'
    ]
  },
  {
    heading: 'Exceptions / Non-Returnable Items',
    paragraphs: [
      'Certain items cannot be returned, like perishable goods, custom products, special orders or personalized items, and personal care goods. We also do not accept returns for hazardous materials, flammable liquids or gases.',
      'Please contact us if you have questions or concerns about your specific item.'
    ]
  },
  {
    heading: 'Exchanges',
    paragraphs: [
      'The fastest way to ensure you get what you want is to return the item you have. Once the return is accepted, make a separate purchase for the new item.'
    ]
  },
  {
    heading: 'European Union 14-Day Cooling Off Period',
    paragraphs: [
      'If merchandise is being shipped into the European Union, you have the right to cancel or return your order within 14 days for any reason and without a justification.',
      'As above, your item must be in the same condition that you received it, with tags and in original packaging.'
    ]
  },
  {
    heading: 'Refunds',
    paragraphs: [
      'We will notify you once we have received and inspected your return, and let you know if the refund was approved or not. If approved, you will be automatically refunded on your original payment method within 10 business days.',
      'Please remember it can take some time for your bank or credit card company to process and post the refund too.'
    ]
  },
  {
    heading: 'Section 5 - Products or Services',
    paragraphs: [
      'Certain products may be available exclusively online through the website and may have limited quantities. We reserve the right to limit sales to any person, geographic region or jurisdiction and to discontinue products at any time.',
      'All descriptions of products and product pricing are subject to change at any time without notice.'
    ]
  },
  {
    heading: 'Section 6 - Accuracy of Billing and Account Information',
    paragraphs: [
      'We reserve the right to refuse any order you place with us and may limit or cancel quantities purchased per person, household or order.',
      'You agree to provide current, complete and accurate purchase and account information for all purchases made at our store.'
    ]
  },
  {
    heading: 'Section 7 - Optional Tools',
    paragraphs: [
      'We may provide access to third-party tools over which we neither monitor nor have control.',
      'Your use of optional tools offered through the site is entirely at your own risk and discretion.'
    ]
  },
  {
    heading: 'Section 8 - Third-Party Links',
    paragraphs: [
      'Certain content, products and services available via our Service may include materials from third parties. Third-party links on this site may direct you to external websites that are not affiliated with us.'
    ]
  },
  {
    heading: 'Section 9 - User Comments, Feedback and Other Submissions',
    paragraphs: [
      'If you send us creative ideas, suggestions, proposals or other materials, you agree that we may edit, copy, publish and otherwise use them without restriction.',
      'We may monitor, edit or remove content that we determine to be unlawful, offensive, threatening or otherwise objectionable.'
    ]
  },
  {
    heading: 'Section 10 - Personal Information',
    paragraphs: [
      'Your submission of personal information through the store is governed by our Privacy Policy.'
    ]
  },
  {
    heading: 'Section 11 - Errors, Inaccuracies and Omissions',
    paragraphs: [
      'Occasionally there may be information on our site that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers and availability.',
      'We reserve the right to correct any errors and to change or update information without prior notice.'
    ]
  },
  {
    heading: 'Section 12 - Prohibited Uses',
    paragraphs: [
      'You are prohibited from using the site or its content for unlawful purposes, to violate regulations or laws, to infringe intellectual property rights, to transmit viruses, or to interfere with security features of the Service.'
    ]
  },
  {
    heading: 'Section 13 - Disclaimer of Warranties; Limitation of Liability',
    paragraphs: [
      'We do not guarantee that your use of our service will be uninterrupted, timely, secure or error-free.',
      'In no case shall United Deals or our service providers be liable for any injury, loss or damages of any kind arising from your use of the service.'
    ]
  },
  {
    heading: 'Section 14 - Indemnification',
    paragraphs: [
      'You agree to indemnify, defend and hold harmless United Deals and our affiliates, officers, directors, agents and employees from any claim arising out of your breach of these Terms of Service.'
    ]
  },
  {
    heading: 'Section 15 - Severability',
    paragraphs: [
      'If any provision of these Terms is determined unlawful or unenforceable, that provision shall be deemed severed and shall not affect the validity of any remaining provisions.'
    ]
  },
  {
    heading: 'Section 16 - Termination',
    paragraphs: [
      'The obligations and liabilities of the parties incurred prior to termination shall survive termination of this agreement. We may terminate this agreement at any time without notice if you fail to comply with these Terms.'
    ]
  },
  {
    heading: 'Section 17 - Entire Agreement',
    paragraphs: [
      'These Terms and any policies posted by us constitute the entire agreement between you and us and govern your use of the Service.'
    ]
  },
  {
    heading: 'Section 18 - Governing Law',
    paragraphs: [
      'These Terms shall be governed by and construed in accordance with the laws of India.'
    ]
  },
  {
    heading: 'Section 19 - Changes to Terms of Service',
    paragraphs: [
      'You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update or change any part of these Terms by posting updates to our website.'
    ]
  },
  {
    heading: 'Section 20 - Contact Information',
    paragraphs: [
      'Questions about these terms should be sent to us at uniteddeals.contact@gmail.com.',
      'United deals, A-3/B, 5.G. Towers, Biringi Mondal Para, Benachity, Durgapur, Paschim Bardhaman, West Bengal, India - 713213.'
    ]
  }
]

const RefundPolicyPage = () => {
  return (
    <PolicyPageTemplate title="Refund Policy" intro={intro} sections={sections} />
  )
}

export default RefundPolicyPage
