import { LegalPage, type LegalSection } from '../components/LegalPage'

const sections: LegalSection[] = [
  {
    number: '1',
    title: 'Information We Collect',
    subsections: [
      {
        number: '1.1',
        title: 'Content you enter',
        body:
          'Qraft uses the content you enter to generate your QR code in your browser. The project does not include an account system, a server-side QR generator, or cloud project sync.',
      },
      {
        number: '1.2',
        title: 'Uploaded logos',
        body:
          'A logo image you choose is loaded into the current browser session to preview and include in the QR design. The project code does not upload the logo to a Qraft account or storage service.',
      },
    ],
  },
  {
    number: '2',
    title: 'How We Use Information',
    body:
      'The content and design settings you provide are used only to generate and preview your QR code. They are not sent to a Qraft server by this project.',
  },
  {
    number: '3',
    title: 'Local Storage',
    body:
      'When you save a project, its content and design settings are stored in local browser storage on your device. Theme preference is also stored locally. Anyone with access to this browser profile may be able to access that saved data.',
  },
  {
    number: '4',
    title: 'Sharing and Scanning',
    body:
      'A QR code is a way to encode content. Qraft does not host the destination website or message. When someone scans a code containing a URL, their device connects to that destination under its own settings and policies.',
  },
  {
    number: '5',
    title: 'Data We Do Not Collect',
    body:
      'The current project has no Qraft account, payment flow, analytics integration, newsletter form, or cloud backup. This statement describes the code in this project and does not cover hosting or infrastructure providers that may serve the website.',
  },
  {
    number: '6',
    title: 'Your Choices',
    body:
      'You can remove saved projects from the My projects page or clear this site’s browser storage. Clearing browser storage also removes locally saved projects and preferences.',
  },
  {
    number: '7',
    title: 'Changes and Contact',
    body:
      'This page should be updated if the product’s data practices change. No official privacy contact address is published in the current project.',
  },
]

export function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="November 10, 2026"
      intro={[
        'At Qraft, we take your privacy seriously. This Privacy Policy explains how the current browser-based QR design studio handles information when you use it.',
        'Please read this policy carefully. By accessing or using the studio, you acknowledge that you have read and understood how the product works today.',
      ]}
      sections={sections}
    />
  )
}
