import { Translations } from './id';

export const en: Translations = {
  meta: {
    title: 'Pukico – Send crypto as easily as paying a friend',
    description: 'Send crypto as easily as paying a friend.',
  },
  nav: {
    joinDiscord: 'Join Discord',
    joinWaitlist: 'Join Waitlist',
    logoAriaLabel: 'Pukico home',
  },
  hero: {
    kicker: 'Waitlist open · Beta on Base Sepolia (testnet)',
    closedBetaBadge: 'Closed Beta',
    closedBetaText:
      'Access is currently invite-only. Join the waitlist, or sign in at app.pukico.xyz if you already have an access code.',
    haveAccessCode: 'Have an access code? Sign in',
    h1Prefix: 'Send crypto ',
    h1Highlight: 'as easily as paying a friend',
    h1Suffix: '.',
    sub: "No more copy-pasting a 0x address that looks like a secret code. Just use a Pukico ID, like @andika, and you're done.",
    inputAriaLabel: 'Type the Pukico ID you want to check',
    placeholder: 'andika',
    check: 'Check your ID',
    checking: 'Checking...',
    claimButton: 'Secure @{id}',
    claimLink: 'Claim now ↓',
    available: '@{id} is available!',
    taken: '@{id} is taken, try another',
    empty: 'Enter the Pukico ID you want to check.',
    format:
      'Invalid format. Use lowercase letters (a-z), numbers (0-9) and underscores (_), 3-20 characters.',
    serverError: 'Something went wrong on our side. Try again in a moment.',
    finePrint:
      'An ID you secure on the waitlist is held for you. The final claim still goes through the official process in Pukico when the beta opens.',
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
    step1Title: 'Secure your Pukico ID',
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
    title: 'Join the waitlist, secure your ID.',
    closedBetaBadge: 'Closed Beta',
    closedBetaNotice:
      'Access is currently invite-only. Join the waitlist, or sign in at app.pukico.xyz if you already have an access code.',
    haveAccessCode: 'Have an access code? Sign in',
    emailLabel: 'Email',
    idLabel: 'Preferred Pukico ID',
    optional: '(optional)',
    checking: 'Checking...',
    button: 'Join Waitlist',
    submitting: 'Submitting...',
    successTitle: "You're in.",
    successText:
      "We'll let you know when the beta opens. To stay in the loop, join the Discord now.",
    successButton: 'Join Discord',
    noIdNote:
      "You haven't secured a Pukico ID yet. You still can: submit this form again with the same email plus the ID you want.",
    errors: {
      emailExists: "This email is already on the waitlist, you're good.",
      idTaken: '@{id} is already taken, try another.',
      idTakenFallback: 'ID is already taken, try another.',
      invalidEmail: 'Enter a valid email address.',
      invalidId:
        'Invalid ID format. Use lowercase letters, numbers and underscores (_), 3-20 characters.',
      server: 'Something went wrong on our side. Try again in a moment.',
    },
  },
  faq: {
    title: 'FAQ',
    items: [
      {
        q: 'What is Pukico?',
        a: 'A crypto wallet where you send and receive with a username instead of a long address.',
      },
      {
        q: 'How do I get an access code?',
        a: 'Join our waitlist and Discord. Invites are sent in batches via the waitlist email.',
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
        q: 'When does the beta open?',
        a: 'No fixed date yet. Latest updates go on Discord.',
      },
    ],
  },
  footer: {
    feedback: 'Built while listening to your feedback on Discord.',
    disclaimer: 'Beta on Base Sepolia testnet. Not financial advice.',
    discord: 'Discord',
    x: 'X',
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
