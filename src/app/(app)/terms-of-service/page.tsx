import PolicyPageTemplate from '@/components/shared/PolicyPageTemplate'

const intro = [
  'This website is operated by United Deals. Throughout the site, the terms "we", "us" and "our" refer to United Deals. United Deals offers this website, including all information, tools and Services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.',
  'By visiting our site and purchasing something from us, you engage in our Service and agree to be bound by the following terms and conditions ("Terms of Service", "Terms"), including those additional terms and conditions and policies referenced herein and available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants and contributors of content.'
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
      'You understand that your content (excluding credit card information) may be transferred unencrypted and involve transmissions over various networks.'
    ]
  },
  {
    heading: 'Section 3 - Accuracy, Completeness and Timeliness of Information',
    paragraphs: [
      'The material on this site is provided for general information only and should not be relied upon as the sole basis for making decisions without consulting more accurate, complete or timely sources of information.',
      'Any reliance on the material on this site is at your own risk.'
    ]
  },
  {
    heading: 'Section 4 - Modifications to the Service and Prices',
    paragraphs: [
      'Prices for our products are subject to change without notice.',
      'We reserve the right at any time to modify or discontinue the Service without notice at any time.'
    ]
  },
  {
    heading: 'Section 5 - Products or Services',
    paragraphs: [
      'Certain products or Services may be available exclusively online through the website. These products or Services may have limited quantities and are subject to return or exchange according to our Refund Policy.',
      'We have made every effort to display as accurately as possible the colors and images of our products that appear at the store.'
    ]
  },
  {
    heading: 'Section 6 - Accuracy of Billing and Account Information',
    paragraphs: [
      'We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order.',
      'You agree to provide current, complete and accurate purchase and account information for all purchases made at our store.'
    ]
  },
  {
    heading: 'Section 7 - Optional Tools',
    paragraphs: [
      'We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.',
      'Your use of optional tools offered through the site is entirely at your own risk and discretion.'
    ]
  },
  {
    heading: 'Section 8 - Third-Party Links',
    paragraphs: [
      'Certain content, products and Services available via our Service may include materials from third parties.',
      'Third-party links on this site may direct you to third-party websites that are not affiliated with us.'
    ]
  },
  {
    heading: 'Section 9 - User Comments, Feedback and Other Submissions',
    paragraphs: [
      'If, at our request, you send certain specific submissions or without a request from us you send creative ideas, suggestions, proposals or other materials, you agree that we may, at any time, without restriction, edit, copy, publish and otherwise use in any medium any comments that you forward to us.',
      'We are and shall be under no obligation to maintain any comments in confidence or to pay compensation for any comments.'
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
      'Occasionally there may be information on our site that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing and availability.',
      'We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information at any time without prior notice.'
    ]
  },
  {
    heading: 'Section 12 - Prohibited Uses',
    paragraphs: [
      'In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content for unlawful purposes, to solicit others to perform unlawful acts, or to violate any international, federal, provincial or state regulations and laws.',
      'We reserve the right to terminate your use of the Service for violating any of the prohibited uses.'
    ]
  },
  {
    heading: 'Section 13 - Disclaimer of Warranties; Limitation of Liability',
    paragraphs: [
      'We do not guarantee, represent or warrant that your use of our Service will be uninterrupted, timely, secure or error-free.',
      'In no case shall United Deals, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim or damages of any kind arising from your use of the Service.'
    ]
  },
  {
    heading: 'Section 14 - Indemnification',
    paragraphs: [
      'You agree to indemnify, defend and hold harmless United Deals and our affiliates, partners, officers, directors, agents and employees from any claim or demand, including reasonable attorneys fees, made by any third-party due to your breach of these Terms of Service.'
    ]
  },
  {
    heading: 'Section 15 - Severability',
    paragraphs: [
      'If any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service.'
    ]
  },
  {
    heading: 'Section 16 - Termination',
    paragraphs: [
      'The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.',
      'These Terms of Service are effective unless and until terminated by either you or us.'
    ]
  },
  {
    heading: 'Section 17 - Entire Agreement',
    paragraphs: [
      'These Terms of Service and any policies or operating rules posted by us on this site constitute the entire agreement and understanding between you and us.'
    ]
  },
  {
    heading: 'Section 18 - Governing Law',
    paragraphs: [
      'These Terms of Service shall be governed by and construed in accordance with the laws of India.'
    ]
  },
  {
    heading: 'Section 19 - Changes to Terms of Service',
    paragraphs: [
      'We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website.',
      'Your continued use of or access to our website following the posting of any changes constitutes acceptance of those changes.'
    ]
  },
  {
    heading: 'Section 20 - Contact Information',
    paragraphs: [
      'Questions about the Terms of Service should be sent to us at uniteddeals.contact@gmail.com.',
      'United deals, A-3/B, 5.G. Towers, Biringi Mondal Para, Benachity, Durgapur, Paschim Bardhaman, West Bengal, India - 713213.'
    ]
  }
]

const TermsOfServicePage = () => {
  return (
    <PolicyPageTemplate title="Terms of Service" intro={intro} sections={sections} />
  )
}

export default TermsOfServicePage
