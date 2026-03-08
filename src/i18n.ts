export const languages = ['CR', 'EN', 'FR', 'GEORDIE'] as const
export type Lang = typeof languages[number]

type Translations = {
  about: string[]
  why: string[]
  builtBy: string
  nav: { about: string; why: string; photos: string }
}

export const t: Record<Lang, Translations> = {
  EN: {
    about: [
      'by the way of the magic of the universe, we found ourselves calling the beautiful country of costa rica home.',
      'during our first rainy season, we would sit and listen to the endless sound of the rain.',
      'asking ourselves questions such as',
      '\u201Cwhat do you want to do with your time on earth?\u201D',
      '\u201Cwhat is important to you?\u201D',
      '\u201Cwhat brings you joy?\u201D.',
      'so inspired by the patience, resilience, gratitude and brilliance of the people and country of costa rica',
      'we started building...',
    ],
    why: [
      'follow our dreams.',
      'share ideas and work on the things we love.',
      'inspire others to do the same.',
      'enjoy the life :)',
    ],
    builtBy: 'built by tamara and william.',
    nav: { about: 'about.', why: 'why?', photos: 'photos.' },
  },
  CR: {
    about: [
      'por la magia del universo, nos encontramos llamando hogar al hermoso pa\u00EDs de costa rica.',
      'durante nuestra primera temporada de lluvias, nos sent\u00E1bamos a escuchar el sonido interminable de la lluvia.',
      'haci\u00E9ndonos preguntas como',
      '\u201C\u00BFqu\u00E9 quer\u00E9s hacer con tu tiempo en la tierra?\u201D',
      '\u201C\u00BFqu\u00E9 es importante para vos?\u201D',
      '\u201C\u00BFqu\u00E9 te trae alegr\u00EDa?\u201D.',
      'tan inspirados por la paciencia, la resiliencia, la gratitud y la brillantez de la gente y el pa\u00EDs de costa rica',
      'empezamos a construir...',
    ],
    why: [
      'seguir nuestros sue\u00F1os.',
      'compartir ideas y trabajar en lo que amamos.',
      'inspirar a otros a hacer lo mismo.',
      'disfrutar la vida, pura vida :)',
    ],
    builtBy: 'hecho por tamara y william.',
    nav: { about: 'sobre.', why: '\u00BFpor qu\u00E9?', photos: 'fotos.' },
  },
  FR: {
    about: [
      'par la magie de l\u2019univers, nous nous sommes retrouv\u00E9s \u00E0 appeler le magnifique costa rica notre foyer.',
      'lors de notre premi\u00E8re saison des pluies, nous nous asseyions pour \u00E9couter le son interminable de la pluie.',
      'en nous posant des questions telles que',
      '\u201Cque veux-tu faire de ton temps sur terre ?\u201D',
      '\u201Cqu\u2019est-ce qui est important pour toi ?\u201D',
      '\u201Cqu\u2019est-ce qui te rend heureux ?\u201D.',
      'tellement inspir\u00E9s par la patience, la r\u00E9silience, la gratitude et la brillance du peuple et du pays du costa rica',
      'nous avons commenc\u00E9 \u00E0 construire...',
    ],
    why: [
      'suivre nos r\u00EAves.',
      'partager des id\u00E9es et travailler sur ce que nous aimons.',
      'inspirer les autres \u00E0 faire de m\u00EAme.',
      'profiter de la vie :)',
    ],
    builtBy: 'construit par tamara et william.',
    nav: { about: '\u00E0 propos.', why: 'pourquoi ?', photos: 'photos.' },
  },
  GEORDIE: {
    about: [
      'by way of the magic of the universe, like, we found worsels callin\u2019 the canny country of costa rica hyem.',
      'durin\u2019 wor forst rainy season, we\u2019d sit an\u2019 listen te the endless sound of the rain, man.',
      'askin\u2019 worsels questions like',
      '\u201Cwhat d\u2019ye wanna dee wi\u2019 yer time on this earth?\u201D',
      '\u201Cwhat matters te ye?\u201D',
      '\u201Cwhat brings ye joy, like?\u201D.',
      'so inspired by the patience, grit, gratitude an\u2019 pure class of the people an\u2019 country of costa rica',
      'we started buildin\u2019, didn\u2019t we...',
    ],
    why: [
      'follow wor dreams, like.',
      'share ideas an\u2019 graft on the things we love.',
      'inspire others te dee the same.',
      'enjoy the life, man :)',
    ],
    builtBy: 'built by tamara an\u2019 william.',
    nav: { about: 'about.', why: 'why, like?', photos: 'photos.' },
  },
}
