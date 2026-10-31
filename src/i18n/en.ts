import { Translations } from './id';

export const en: Translations = {
  meta: {
    title: 'Pukico – Send crypto as easily as paying a friend',
    description: 'Send crypto as easily as paying a friend. Try the testnet beta now.',
  },
  nav: {
    joinDiscord: 'Join Discord',
    joinWaitlist: 'Open App',
    logoAriaLabel: 'Pukico home',
  },
  hero: {
    kicker: 'Open beta · Base Sepolia (testnet)',
    closedBetaBadge: 'Open Beta Testnet',
    closedBetaText:
      'The beta is open with limited slots. Testnet tokens have no monetary value. Try it now at app.pukico.xyz.',
    haveAccessCode: 'Open the app',
    h1Prefix: 'Send crypto ',
    h1Highlight: 'as easily as paying a friend',
    h1Suffix: '.',
    sub: "No more copy-pasting a 0x address that looks like a secret code. Just use a Pukico ID, like @andika, and you're done.",
    inputAriaLabel: 'Type the Pukico ID you want to check',
    placeholder: 'andika',
    check: 'Check your ID',
    checking: 'Checking...',
    claimButton: 'Claim in the app',
    claimLink: 'Claim in the app',
    available: '@{id} is available!',
    taken: '@{id} is taken, try another',
    empty: 'Enter the Pukico ID you want to check.',
    format:
      'Invalid format. Use lowercase letters (a-z), numbers (0-9) and underscores (_), 3-20 characters.',
    serverError: 'Something went wrong on our side. Try again in a moment.',
    finePrint:
      'Claim your ID directly in the Pukico app while slots are available.',
  },
  why: {
    title: 'Wallet addresses are scary.',
    p1: 'No wonder so many people never start.',
    p2: 'With Pukico, you just type @username. We look up the real address, and you check it before you send.',
    oldLabel: 'The old way',
    oldNote:
      'One wrong character and your funds can land at a different address, with no way to get them back.',
    newLabel: 'The Pukico way',
    newNote: 'Automatically matched to 0x7a3F...c91B',
  },
  how: {
    title: 'How it works',
    step1Title: 'Choose your Pukico ID',
    step1Desc:
      "Pick your username. Once claimed, it can't be changed or deleted.",
    step2Title: 'Sign in with email',
    step2Desc:
      "Your wallet is created through Privy. We don't store your private key in our database.",
    step3Title: 'Send and receive with @',
    step3Desc:
      'Your 0x address is still there when you need to send from or to another wallet.',
  },
  diff: {
    title: 'What makes it different',
    block1Title: 'Permanent ID.',
    block1Desc:
      "Once it's yours, nobody else can take it. You can't change it either, so pick one that's really you.",
    block2Title: 'Confirm first, send after.',
    block2Desc:
      "Before you sign, you see who's receiving, how much, and what the network fee is.",
    block3Title: 'Honest status.',
    block3Desc:
      'Still processing? We say processing. Failed? We say failed. We only say success once it\'s actually confirmed on the blockchain.',
  },
  honest: {
    title: 'Heads up',
    sub: 'Before you sign up, you should know:',
    points: [
      'Pukico is currently running on the Base Sepolia testnet. No real money is involved.',
      'This is testnet only. Everything in the beta has no real-world value.',
      'Blockchain transactions still have network fees (gas).',
      'Transactions can take a while, and sometimes fail. That\'s why we show the status clearly.',
      'It\'s a beta, so there will be bugs. Report them on Discord, we read everything.',
    ],
  },
  waitlist: {
    title: 'Slots full? Join the waitlist.',
    closedBetaBadge: 'Open Beta Testnet',
    closedBetaNotice:
      "The beta is open with limited slots. Try it now at app.pukico.xyz. If slots are full, leave your email here and we'll notify you when more open.",
    haveAccessCode: 'Open the app',
    emailLabel: 'Email',
    idLabel: 'Preferred Pukico ID',
    optional: '(optional)',
    checking: 'Checking...',
    button: 'Join Waitlist',
    submitting: 'Submitting...',
    successTitle: "You're in.",
    successText:
      "We'll notify you when new slots open. To stay in the loop, join the Discord now.",
    successButton: 'Join Discord',
    noIdNote:
      "You haven't included a preferred Pukico ID yet. You still can: submit this form again with the same email plus the ID you want.",
    errors: {
      emailExists: "This email is already on the waitlist, you're good.",
      idTaken: '@{id} is already taken, try another.',
      idTakenFallback: 'ID is already taken, try another.',
      invalidEmail: 'Enter a valid email address.',
      invalidId:
        'Invalid ID format. Use lowercase letters, numbers and underscores (_), 3-20 characters.',
      server: 'Something went wrong on our side. Try again in a moment.',
    },
    agreementPre: 'By joining, you agree to the ',
    agreementTerms: 'Terms',
    agreementAnd: ' and ',
    agreementPrivacy: 'Privacy Policy',
    agreementPost: '.',
  },
  faq: {
    title: 'FAQ',
    items: [
      {
        q: 'What is Pukico?',
        a: 'A crypto wallet where you send and receive with a username instead of a long address.',
      },
      {
        q: 'How do I join the beta?',
        a: 'The beta is open with limited slots, so you can jump right in at app.pukico.xyz. If slots are currently full, join the waitlist; new slots open gradually. If you have an access code, it can still be used.',
      },
      {
        q: 'Is this real money?',
        a: 'Pukico is currently running on the Base Sepolia testnet. No real money is involved.',
      },
      {
        q: 'Can I change my Pukico ID?',
        a: "No. Once claimed, it's permanent. So think it through.",
      },
      {
        q: 'If I switch phones, do I lose my wallet?',
        a: "You can recover access through login and Privy's recovery options. We'll test this properly in the beta.",
      },
      {
        q: 'Is the beta already open?',
        a: 'Yes, the testnet beta is now open to the public with limited slots at app.pukico.xyz.',
      },
    ],
  },
  footer: {
    feedback: 'Built while listening to your feedback on Discord.',
    disclaimer: 'Beta on Base Sepolia testnet. Not financial advice.',
    testnetNotice: 'Beta testing on the Base Sepolia testnet. Tokens have no monetary value.',
    privacy: 'Privacy Policy',
    terms: 'Terms',
    discord: 'Discord',
    x: 'X',
  },
  privacy: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: October 31, 2026',
    backHome: '← Back to home',
    tocTitle: 'Table of Contents',
    contactLine: 'Contact us at {email}.',
    sections: [
      {
        id: 'section-1',
        title: '1. Who we are',
        content:
          'Pukico (pukico.xyz) is a non-custodial wallet for testing (beta) on the Base Sepolia testnet network. This policy explains what data we process when you use Pukico.',
      },
      {
        id: 'section-2',
        title: '2. Data we collect',
        content:
          'Email (verified via our login provider). Your chosen Pukico ID. Wallet address. Account identifiers from the login provider. Saved friends list. Transaction records within Pukico: sender and recipient addresses, amount, transaction hash, status, and service fee status. In-app notifications. Waitlist data: your email and desired Pukico ID. Technical security logs: event type, account identifier, and IP address stored only in hashed form.',
      },
      {
        id: 'section-3',
        title: '3. What we do not hold',
        content:
          'Pukico never holds your private keys or seed phrase. Embedded wallet keys are managed by our wallet provider; you control access via email login and, if enabled, passkey. Never share exported private keys with anyone.',
      },
      {
        id: 'section-4',
        title: '4. How data is used',
        content:
          'Operating the service (login, wallet, sending and receiving, friends list, notifications). Maintaining security and preventing abuse (rate limiting, detecting suspicious address changes). Improving the product during beta. We do not sell your data and do not use it for advertising.',
      },
      {
        id: 'section-5',
        title: '5. Publicly visible data',
        content:
          'Blockchain transactions are public and permanent; anyone can view them via block explorers such as BaseScan, and we cannot alter or delete them. Additionally, other Pukico users who know your wallet address can discover your associated Pukico ID, and vice versa, due to the recipient search feature.',
      },
      {
        id: 'section-6',
        title: '6. Third parties we use',
        content:
          'Embedded login and wallet provider (Privy), database and serverless functions (Supabase), hosting (Vercel), Base Sepolia public RPC network, and anti-bot protection (Cloudflare Turnstile) on certain forms. Test token faucets (Circle) operate on their own sites and are subject to their policies.',
      },
      {
        id: 'section-7',
        title: '7. Retention',
        content:
          'Data is retained for the duration of the beta. Because this is a testnet, data and balances may be reset or erased at any time. Security logs are retained on a limited basis for investigation purposes.',
      },
      {
        id: 'section-8',
        title: '8. Your rights',
        content:
          'You may request access to, correction of, or deletion of data we retain, and withdraw consent, by contacting us. Data already recorded on a public blockchain cannot be erased.',
      },
      {
        id: 'section-9',
        title: '9. Security',
        content:
          'We implement reasonable security safeguards, but no system is completely secure. Please report any suspected security vulnerabilities to us.',
      },
      {
        id: 'section-10',
        title: '10. Age requirements',
        content: 'Pukico is intended for users aged 18 and older.',
      },
      {
        id: 'section-11',
        title: '11. Changes',
        content:
          'We may update this policy; the most recent revision date is shown at the top of the page.',
      },
      {
        id: 'section-12',
        title: '12. Contact',
        content: '',
      },
    ],
  },
  terms: {
    title: 'Terms of Use',
    lastUpdated: 'Last updated: October 31, 2026',
    backHome: '← Back to home',
    tocTitle: 'Table of Contents',
    contactLine: 'Contact us at {email}.',
    sections: [
      {
        id: 'section-1',
        title: '1. Testnet trial only',
        content:
          'Pukico currently operates exclusively on the Base Sepolia testnet network. Tokens (including test USDC) have no monetary value. Do not consider balances in Pukico as money or exchangeable assets.',
      },
      {
        id: 'section-2',
        title: '2. WARNING: do not send real assets',
        content:
          'Your wallet address is formatted as an Ethereum address recognized across many networks. Do not send real (mainnet) assets to your Pukico wallet address, including on other networks; those assets may be permanently lost and Pukico cannot recover them.',
      },
      {
        id: 'section-3',
        title: '3. "As is" service',
        content:
          'Pukico beta is provided "as is" without warranties of availability, accuracy, or fitness for a particular purpose. Features may change, be discontinued, or reset without prior notice.',
      },
      {
        id: 'section-4',
        title: '4. Non-custodial wallet and your responsibility',
        content:
          'You are responsible for accessing your account (email, passkey) and for every transaction you authorize. Blockchain transactions cannot be reversed. If you send funds to the wrong address or to a contract that does not support the token, funds may be lost and Pukico cannot restore them.',
      },
      {
        id: 'section-5',
        title: '5. Fees',
        content:
          'Pukico charges a 0.5% service fee (minimum 0.01 test USDC) per transfer. Network (gas) fees are paid in testnet ETH directly to network validators, not to Pukico. All figures apply to the trial period and are subject to change.',
      },
      {
        id: 'section-6',
        title: '6. Pukico ID',
        content:
          'A Pukico ID is permanent once chosen. We may revoke or modify any ID that impersonates others, is misleading, or violates these terms.',
      },
      {
        id: 'section-7',
        title: '7. Prohibited use',
        content:
          'Prohibited activities include: abusing the service or overloading the system; mass collecting user data or scraping the Pukico ID directory; creating multiple accounts to circumvent limits; attempting to breach or compromise security; impersonating identity; or violating applicable laws. Violations may result in revocation of beta access.',
      },
      {
        id: 'section-8',
        title: '8. Limitation of liability',
        content:
          'To the fullest extent permitted by law, Pukico and its operators are not liable for any damages or losses arising from the use of this trial service.',
      },
      {
        id: 'section-9',
        title: '9. Governing law',
        content: 'These terms are governed by and construed in accordance with the laws of the Republic of Indonesia.',
      },
      {
        id: 'section-10',
        title: '10. Changes',
        content:
          'We may update these terms; the latest revision date is displayed at the top of the page. Continuing to use Pukico following changes constitutes acceptance.',
      },
      {
        id: 'section-11',
        title: '11. Contact',
        content: '',
      },
    ],
  },
  preview: {
    sendTo: 'Send to',
    idFound: 'ID found',
    amount: 'Amount',
    testTokenNote: 'Test token (no real value)',
    gasFee: 'Network fee',
    network: 'Network',
    status: 'Status',
    readyToConfirm: 'Ready to confirm',
    confirmAndSend: 'Confirm & Send',
    label: 'Illustration of Pukico in the browser, not real data',
  },
};
