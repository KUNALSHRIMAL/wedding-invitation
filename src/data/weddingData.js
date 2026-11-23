import heroImage from '../assets/hero-palace.jpg'
import storyImage from '../assets/couple-story.jpg'

/**
 * The single source of truth for the invitation.
 *
 * Replace the sample details below to reuse this website for another wedding.
 * Dates should use an ISO-8601 timezone offset so the countdown is consistent
 * for guests in every country (India is +05:30).
 */
export const weddingData = {
  couple: {
    bride: {
      firstName: 'Meera',
      fullName: 'Meera Sharma',
      parents: 'Daughter of Kavita & Rajesh Sharma',
    },
    groom: {
      firstName: 'Aarav',
      fullName: 'Aarav Kapoor',
      parents: 'Son of Sunita & Vikram Kapoor',
    },
    monogram: 'M · A',
  },

  wedding: {
    dateTime: '2027-02-14T18:30:00+05:30',
    displayDate: 'Sunday, 14 February 2027',
    shortDate: '14 · 02 · 2027',
    time: '6:30 PM onwards',
  },

  opening: {
    eyebrow: 'With the blessings of our families',
    title: 'You are invited',
    buttonLabel: 'Open the invitation',
    note: 'A celebration of love awaits',
  },

  hero: {
    eyebrow: 'Together with our families',
    invitationMessage:
      'With joyful hearts, we invite you to share in our happiness as we begin our forever.',
  },

  images: {
    hero: heroImage,
    heroAlt:
      'A candlelit palace garden decorated with ivory arches and rose garlands for a wedding celebration',
    story: storyImage,
    storyAlt:
      'An Indian couple in blush and burgundy wedding attire walking together through a sunlit palace colonnade',
    socialPreview: '/og-wedding-preview.jpg',
  },

  families: {
    brideFamily: 'The Sharma Family',
    groomFamily: 'The Kapoor Family',
    invitation:
      'With the grace of the Divine and the blessings of our elders, the Sharma and Kapoor families request the pleasure of your company at the wedding of their beloved children. Your presence and blessings will make our celebration complete.',
    signOff: 'With love and warm regards',
  },

  events: [
    {
      id: 'mehendi',
      name: 'Mehendi',
      date: 'Friday, 12 February 2027',
      time: '3:00 PM',
      venue: 'The Courtyard, Samode Haveli',
      description: 'Henna, music and an afternoon painted in joy.',
      icon: 'Sparkles',
    },
    {
      id: 'haldi',
      name: 'Haldi',
      date: 'Saturday, 13 February 2027',
      time: '10:30 AM',
      venue: 'The Garden Pavilion, Samode Haveli',
      description: 'A sunlit morning of laughter, turmeric and blessings.',
      icon: 'Sun',
    },
    {
      id: 'sangeet',
      name: 'Sangeet',
      date: 'Saturday, 13 February 2027',
      time: '7:30 PM',
      venue: 'Durbar Hall, Samode Haveli',
      description: 'An evening of stories told through music and dance.',
      icon: 'Music2',
    },
    {
      id: 'wedding',
      name: 'Wedding Ceremony',
      date: 'Sunday, 14 February 2027',
      time: '6:30 PM',
      venue: 'The Royal Lawns, Samode Haveli',
      description: 'Join us beneath the stars as we take our sacred vows.',
      icon: 'Heart',
      featured: true,
    },
    {
      id: 'reception',
      name: 'Reception',
      date: 'Monday, 15 February 2027',
      time: '7:00 PM',
      venue: 'Rambagh Palace, Jaipur',
      description: 'Dinner, dancing and a toast to the new beginning.',
      icon: 'GlassWater',
    },
  ],

  venue: {
    name: 'Samode Haveli',
    area: 'Gangapole, Jaipur',
    address:
      'Jorawar Singh Gate, Gangapole, Jaipur, Rajasthan 302002, India',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Samode+Haveli+Jaipur',
    eyebrow: 'Where forever begins',
  },

  story: {
    enabled: true,
    eyebrow: 'Written in the stars',
    title: 'Our Story',
    introduction:
      'A chance meeting over masala chai became long conversations, shared dreams and a love that felt like coming home.',
    quote: 'In you, I found my favourite place to be.',
    moments: [
      {
        year: '2021',
        title: 'The first hello',
        text: 'A rainy Jaipur afternoon, one shared umbrella and a conversation neither wanted to end.',
      },
      {
        year: '2024',
        title: 'A thousand little adventures',
        text: 'From sunrise road trips to Sunday chai, friendship quietly grew into forever.',
      },
      {
        year: '2026',
        title: 'She said yes',
        text: 'Under a sky full of lanterns, we chose each other—and this beautiful next chapter.',
      },
    ],
  },

  rsvp: {
    whatsappNumber: '919876543210',
    deadline: 'Please respond by 20 January 2027',
    defaultMessage: 'We would be delighted to celebrate with you.',
  },

  closing: {
    eyebrow: 'With love, laughter & blessings',
    message: 'We look forward to celebrating with you',
    blessing:
      'May our new beginning be made brighter by the love of those who have shaped our lives.',
  },

  share: {
    siteUrl: 'https://your-wedding-site.example',
    title: 'Meera & Aarav are getting married',
    description:
      'Join us in Jaipur on 14 February 2027 as we celebrate love, laughter and forever.',
  },

  theme: {
    ivory: '#FBF7EF',
    cream: '#F4EBDD',
    champagne: '#C9A55C',
    blush: '#D8A5A0',
    burgundy: '#681F32',
    deepBurgundy: '#3A0F1D',
    ink: '#2A2021',
    sage: '#69735F',
  },

  features: {
    showStory: true,
    showStoryTimeline: true,
    showFloatingPetals: true,
    playMusic: false,
  },
}

export default weddingData
