export const languages = ['CR', 'EN', 'FR', 'GEORDIE'] as const
export type Lang = typeof languages[number]

type Translations = {
  logo: [string, string, string]
  about: string[]
  why: string[]
  enterPassword: string
  builtBy: string
  nav: { home: string; why: string; photos: string }
}

export const t: Record<Lang, Translations> = {
  EN: {
    logo: ['human', 'rights', 'reserved.'],
    about: [
      'by the way of the magic of the universe, we found ourselves calling the beautiful country of costa rica home.',
      'during our first rainy season, we would sit and listen to the endless sound of the rain.',
      'asking ourselves questions such as',
      '\u201Cwhat do you want to do with your time on earth?\u201D',
      '\u201Cwhat is important to you?\u201D',
      '\u201Cwhat brings you joy?\u201D',
      'so inspired by the patience, resilience, gratitude and brilliance of the people and country of costa rica',
      'we started building...',
    ],
    why: [
      'to follow our dreams.',
      'to share ideas and work on the things we love.',
      'to inspire others to do the same.',
      'to enjoy the life :)',
    ],
    enterPassword: 'ENTER PASSWORD',
    builtBy: 'built by tamara and william.',
    nav: { home: 'home.', why: 'why?', photos: 'photos.' },
  },
  CR: {
    logo: ['derechos', 'humanos', 'reservados.'],
    about: [
      'por la magia del universo, nos encontramos llamando hogar al hermoso pa\u00EDs de costa rica.',
      'durante nuestra primera temporada de lluvias, nos sent\u00E1bamos a escuchar el sonido interminable de la lluvia.',
      'haci\u00E9ndonos preguntas como',
      '\u201C\u00BFqu\u00E9 quer\u00E9s hacer con tu tiempo en la tierra?\u201D',
      '\u201C\u00BFqu\u00E9 es importante para vos?\u201D',
      '\u201C\u00BFqu\u00E9 te trae alegr\u00EDa?\u201D',
      'tan inspirados por la paciencia, la resiliencia, la gratitud y la brillantez de la gente y el pa\u00EDs de costa rica',
      'empezamos a construir...',
    ],
    why: [
      'para seguir nuestros sue\u00F1os.',
      'para compartir ideas y trabajar en lo que amamos.',
      'para inspirar a otros a hacer lo mismo.',
      'para disfrutar la vida, pura vida :)',
    ],
    enterPassword: 'INGRESE CONTRASE\u00D1A',
    builtBy: 'hecho por tamara y william.',
    nav: { home: 'inicio.', why: '\u00BFpor qu\u00E9?', photos: 'fotos.' },
  },
  FR: {
    logo: ['droits', 'humains', 'r\u00E9serv\u00E9s.'],
    about: [
      'par la magie de l\u2019univers, nous nous sommes retrouv\u00E9s \u00E0 appeler le magnifique costa rica notre foyer.',
      'lors de notre premi\u00E8re saison des pluies, nous nous asseyions pour \u00E9couter le son interminable de la pluie.',
      'en nous posant des questions telles que',
      '\u201Cque veux-tu faire de ton temps sur terre ?\u201D',
      '\u201Cqu\u2019est-ce qui est important pour toi ?\u201D',
      '\u201Cqu\u2019est-ce qui te rend heureux ?\u201D',
      'tellement inspir\u00E9s par la patience, la r\u00E9silience, la gratitude et la brillance du peuple et du pays du costa rica',
      'nous avons commenc\u00E9 \u00E0 construire...',
    ],
    why: [
      'pour suivre nos r\u00EAves.',
      'pour partager des id\u00E9es et travailler sur ce que nous aimons.',
      'pour inspirer les autres \u00E0 faire de m\u00EAme.',
      'pour profiter de la vie :)',
    ],
    enterPassword: 'ENTREZ LE MOT DE PASSE',
    builtBy: 'construit par tamara et william.',
    nav: { home: 'accueil.', why: 'pourquoi ?', photos: 'photos.' },
  },
  GEORDIE: {
    logo: ['human', 'rights', 'reserved.'],
    about: [
      'by way of the magic of the universe, like, we found worsels callin\u2019 the canny country of costa rica hyem.',
      'durin\u2019 wor forst rainy season, we\u2019d sit an\u2019 listen te the endless sound of the rain, man.',
      'askin\u2019 worsels questions like',
      '\u201Cwhat d\u2019ye wanna dee wi\u2019 yer time on this earth?\u201D',
      '\u201Cwhat matters te ye?\u201D',
      '\u201Cwhat brings ye joy, like?\u201D',
      'so inspired by the patience, grit, gratitude an\u2019 pure class of the people an\u2019 country of costa rica',
      'we started buildin\u2019, didn\u2019t we...',
    ],
    why: [
      'to follow wor dreams, like.',
      'to share ideas an\u2019 graft on the things we love.',
      'to inspire others te dee the same.',
      'to enjoy the life, man :)',
    ],
    enterPassword: 'ENTER WOR PASSWORD',
    builtBy: 'built by tamara an\u2019 william.',
    nav: { home: 'hyem.', why: 'why, like?', photos: 'photos.' },
  },
}
