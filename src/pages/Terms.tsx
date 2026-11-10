import { LegalPage, type LegalSection } from '../components/LegalPage'

const sections: LegalSection[] = [
  {
    number: '1',
    title: 'Using the Studio',
    body:
      'Qraft provides browser tools for creating, styling, testing, and downloading QR code images. You are responsible for the content you choose to encode and for checking the result before distribution.',
  },
  {
    number: '2',
    title: 'Your Content and Downloads',
    subsections: [
      {
        number: '2.1',
        title: 'Your responsibility',
        body:
          'The app generates a QR image from information you provide. It does not verify that the destination or encoded information is accurate, safe, available, or controlled by you.',
      },
      {
        number: '2.2',
        title: 'Check before sharing',
        body:
          'Check links and scan behavior before printing or sharing a code. A code that worked in the editor can still fail if the destination changes or becomes unavailable.',
      },
    ],
  },
  {
    number: '3',
    title: 'Local Projects',
    body:
      'Projects are saved in your browser on your device. They may be lost if local browser storage is cleared, the browser profile is removed, or device access changes. The app does not currently provide cloud sync or recovery.',
  },
  {
    number: '4',
    title: 'Availability and Changes',
    body:
      'The studio is provided as it currently exists in this project. Features may change as the project develops. No service uptime, support response time, backup, or compatibility guarantee is published here.',
  },
  {
    number: '5',
    title: 'Acceptable Use',
    body:
      'Use the studio lawfully. Do not use generated codes to mislead people, distribute harmful content, or infringe another person’s rights.',
  },
  {
    number: '6',
    title: 'No Published Paid Terms',
    body:
      'The current project does not include paid plans, subscriptions, or a billing flow. If those are introduced, the terms should be updated before they are offered.',
  },
  {
    number: '7',
    title: 'Questions',
    body:
      'No official legal or support contact address is published in the current project.',
  },
]

export function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="November 10, 2026"
      intro={[
        'These terms describe the current Qraft QR design studio and how it is intended to be used.',
        'By accessing or using the studio, you agree to use it lawfully and to check the result before distributing any generated code.',
      ]}
      sections={sections}
    />
  )
}
