export const TestIds = {
  unit: {
    bannerImageView: {
      root: 'banner-image-container',
      imagePrefix: 'banner-images',
      image: (index: number) => `banner-images${index}`,
    },
    loader: 'loader',
    actionButton: {
      root: 'action-button-container',
    },
    appIntro: {
      root: 'app-intro-container',
      appLogo: 'app-intro-logo',
      appName: 'app-intro-name',
      appTagLine: 'app-intro-tag-line',
    },
    gameCard: {
      root: 'game-card-container',
      gameTitle: 'game-title',
      gameReleaseDate: 'game-release-date',
    },
    floatingDrawer: {
      root: 'floating-drawer',
      rootButton: 'drawer-button',
      popular: 'home-screen-with-popular-games',
      thisWeek: 'home-screen-with-this-week-games',
      bestOfTheYear: 'home-screen-with-best-of-the-year-games',
      popular2023: 'home-screen-with-popular-in-2023-games',
      top250: 'home-screen-with-top-250-games',
    },
  },
  integration: {
    splash: {
      root: 'splash-screen',
    },
    auth: {
      root: 'auth-screen',
    },
    stackNavigator: {
      root: 'stack-navigator',
    },
    home: {
      root: 'home-screen',
      title: 'home-screen-title',
    },
    search: {
      root: 'search-screen',
      inputBox: 'search-text-input',
      gameList: 'search-game-list',
    },
  },
};

export const gameDetail: GameDetailResponse = {
  id: 3498,
  slug: 'grand-theft-auto-v',
  name: 'Grand Theft Auto V',
  name_original: 'Grand Theft Auto V',
  description:
    '<p>Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update. <br />\nSimultaneous storytelling from three unique perspectives: <br />\nFollow Michael, ex-criminal living his life of leisure away from the past, Franklin, a kid that seeks the better future, and Trevor, the exact past Michael is trying to run away from. <br />\nGTA Online will provide a lot of additional challenge even for the experienced players, coming fresh from the story mode. Now you will have other players around that can help you just as likely as ruin your mission. Every GTA mechanic up to date can be experienced by players through the unique customizable character, and community content paired with the leveling system tends to keep everyone busy and engaged.</p>\n<p>Español<br />\nRockstar Games se hizo más grande desde su entrega anterior de la serie. Obtienes la construcción del mundo complicada y realista de Liberty City de GTA4 en el escenario de Los Santos, un viejo favorito de los fans, GTA San Andreas. 561 vehículos diferentes (incluidos todos los transportes que puede operar) y la cantidad aumenta con cada actualización.<br />\nNarración simultánea desde tres perspectivas únicas:<br />\nSigue a Michael, ex-criminal que vive su vida de ocio lejos del pasado, Franklin, un niño que busca un futuro mejor, y Trevor, el pasado exacto del que Michael está tratando de huir.<br />\nGTA Online proporcionará muchos desafíos adicionales incluso para los jugadores experimentados, recién llegados del modo historia. Ahora tendrás otros jugadores cerca que pueden ayudarte con la misma probabilidad que arruinar tu misión. Los jugadores pueden experimentar todas las mecánicas de GTA actualizadas a través del personaje personalizable único, y el contenido de la comunidad combinado con el sistema de nivelación tiende a mantener a todos ocupados y comprometidos.</p>',
  metacritic: 92,
  metacritic_platforms: [
    {
      metascore: 96,
      url: 'https://www.metacritic.com/game/pc/grand-theft-auto-v',
      platform: {
        platform: 4,
        name: 'PC',
        slug: 'pc',
      },
    },
    {
      metascore: 97,
      url: 'https://www.metacritic.com/game/playstation-3/grand-theft-auto-v',
      platform: {
        platform: 16,
        name: 'PlayStation 3',
        slug: 'playstation3',
      },
    },
    {
      metascore: 97,
      url: 'https://www.metacritic.com/game/playstation-4/grand-theft-auto-v',
      platform: {
        platform: 18,
        name: 'PlayStation 4',
        slug: 'playstation4',
      },
    },
    {
      metascore: 81,
      url: 'https://www.metacritic.com/game/playstation-5/grand-theft-auto-v',
      platform: {
        platform: 187,
        name: 'PlayStation 5',
        slug: 'playstation5',
      },
    },
    {
      metascore: 97,
      url: 'https://www.metacritic.com/game/xbox-360/grand-theft-auto-v',
      platform: {
        platform: 14,
        name: 'Xbox 360',
        slug: 'xbox360',
      },
    },
    {
      metascore: 97,
      url: 'https://www.metacritic.com/game/xbox-one/grand-theft-auto-v',
      platform: {
        platform: 1,
        name: 'Xbox One',
        slug: 'xbox-one',
      },
    },
    {
      metascore: 79,
      url: 'https://www.metacritic.com/game/xbox-series-x/grand-theft-auto-v',
      platform: {
        platform: 186,
        name: 'Xbox Series S/X',
        slug: 'xbox-series-x',
      },
    },
  ],
  released: '2013-09-17',
  tba: false,
  updated: '2025-01-01T10:36:54',
  background_image: 'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg',
  background_image_additional:
    'https://media.rawg.io/media/screenshots/5f5/5f5a38a222252d996b18962806eed707.jpg',
  website: 'http://www.rockstargames.com/V/',
  rating: 4.47,
  rating_top: 5,
  ratings: [
    {
      id: 5,
      title: 'exceptional',
      count: 4189,
      percent: 59.11,
    },
    {
      id: 4,
      title: 'recommended',
      count: 2314,
      percent: 32.65,
    },
    {
      id: 3,
      title: 'meh',
      count: 451,
      percent: 6.36,
    },
    {
      id: 1,
      title: 'skip',
      count: 133,
      percent: 1.88,
    },
  ],
  playtime: 74,
  screenshots_count: 58,
  movies_count: 8,
  creators_count: 11,
  achievements_count: 539,
  parent_achievements_count: 75,
  reddit_url: 'https://www.reddit.com/r/GrandTheftAutoV/',
  saturated_color: '0f0f0f',
  dominant_color: '0f0f0f',
  parent_platforms: [
    {
      platform: {
        id: 1,
        name: 'PC',
        slug: 'pc',
      },
    },
    {
      platform: {
        id: 2,
        name: 'PlayStation',
        slug: 'playstation',
      },
    },
    {
      platform: {
        id: 3,
        name: 'Xbox',
        slug: 'xbox',
      },
    },
  ],
  platforms: [
    {
      platform: {
        id: 4,
        name: 'PC',
        slug: 'pc',
        games_count: 541767,
        image_background:
          'https://media.rawg.io/media/games/49c/49c3dfa4ce2f6f140cc4825868e858cb.jpg',
      },
      released_at: '2013-09-17',
      requirements: {
        minimum:
          'Minimum:OS: Windows 10 64 Bit, Windows 8.1 64 Bit, Windows 8 64 Bit, Windows 7 64 Bit Service Pack 1, Windows Vista 64 Bit Service Pack 2* (*NVIDIA video card recommended if running Vista OS)Processor: Intel Core 2 Quad CPU Q6600 @ 2.40GHz (4 CPUs) / AMD Phenom 9850 Quad-Core Processor (4 CPUs) @ 2.5GHzMemory: 4 GB RAMGraphics: NVIDIA 9800 GT 1GB / AMD HD 4870 1GB (DX 10, 10.1, 11)Storage: 72 GB available spaceSound Card: 100% DirectX 10 compatibleAdditional Notes: Over time downloadable content and programming changes will change the system requirements for this game.  Please refer to your hardware manufacturer and www.rockstargames.com/support for current compatibility information. Some system components such as mobile chipsets, integrated, and AGP graphics cards may be incompatible. Unlisted specifications may not be supported by publisher.     Other requirements:  Installation and online play requires log-in to Rockstar Games Social Club (13+) network; internet connection required for activation, online play, and periodic entitlement verification; software installations required including Rockstar Games Social Club platform, DirectX , Chromium, and Microsoft Visual C++ 2008 sp1 Redistributable Package, and authentication software that recognizes certain hardware attributes for entitlement, digital rights management, system, and other support purposes.     SINGLE USE SERIAL CODE REGISTRATION VIA INTERNET REQUIRED; REGISTRATION IS LIMITED TO ONE ROCKSTAR GAMES SOCIAL CLUB ACCOUNT (13+) PER SERIAL CODE; ONLY ONE PC LOG-IN ALLOWED PER SOCIAL CLUB ACCOUNT AT ANY TIME; SERIAL CODE(S) ARE NON-TRANSFERABLE ONCE USED; SOCIAL CLUB ACCOUNTS ARE NON-TRANSFERABLE.  Partner Requirements:  Please check the terms of service of this site before purchasing this software.',
        recommended:
          'Recommended:OS: Windows 10 64 Bit, Windows 8.1 64 Bit, Windows 8 64 Bit, Windows 7 64 Bit Service Pack 1Processor: Intel Core i5 3470 @ 3.2GHz (4 CPUs) / AMD X8 FX-8350 @ 4GHz (8 CPUs)Memory: 8 GB RAMGraphics: NVIDIA GTX 660 2GB / AMD HD 7870 2GBStorage: 72 GB available spaceSound Card: 100% DirectX 10 compatibleAdditional Notes:',
      },
    },
    {
      platform: {
        id: 187,
        name: 'PlayStation 5',
        slug: 'playstation5',
        games_count: 1176,
        image_background:
          'https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg',
      },
      released_at: '2013-09-17',
      requirements: {},
    },
    {
      platform: {
        id: 186,
        name: 'Xbox Series S/X',
        slug: 'xbox-series-x',
        games_count: 1028,
        image_background:
          'https://media.rawg.io/media/games/5ad/5adab016a307c2902a82b60d487fe287.jpg',
      },
      released_at: '2013-09-17',
      requirements: {},
    },
    {
      platform: {
        id: 18,
        name: 'PlayStation 4',
        slug: 'playstation4',
        games_count: 6875,
        image_background:
          'https://media.rawg.io/media/games/8a0/8a02f84a5916ede2f923b88d5f8217ba.jpg',
      },
      released_at: '2013-09-17',
      requirements: {},
    },
    {
      platform: {
        id: 16,
        name: 'PlayStation 3',
        slug: 'playstation3',
        games_count: 3167,
        image_background:
          'https://media.rawg.io/media/games/c6b/c6bfece1daf8d06bc0a60632ac78e5bf.jpg',
      },
      released_at: '2013-09-17',
      requirements: {},
    },
    {
      platform: {
        id: 14,
        name: 'Xbox 360',
        slug: 'xbox360',
        games_count: 2805,
        image_background:
          'https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg',
      },
      released_at: '2013-09-17',
      requirements: {},
    },
    {
      platform: {
        id: 1,
        name: 'Xbox One',
        slug: 'xbox-one',
        games_count: 5672,
        image_background:
          'https://media.rawg.io/media/games/d1a/d1a2e99ade53494c6330a0ed945fe823.jpg',
      },
      released_at: '2013-09-17',
      requirements: {},
    },
  ],
  genres: [
    {
      id: 4,
      name: 'Action',
      slug: 'action',
      games_count: 184522,
      image_background:
        'https://media.rawg.io/media/games/d82/d82990b9c67ba0d2d09d4e6fa88885a7.jpg',
    },
  ],
  tags: [
    {
      id: 31,
      name: 'Singleplayer',
      slug: 'singleplayer',
      games_count: 233260,
      image_background:
        'https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg',
    },
    {
      id: 40847,
      name: 'Steam Achievements',
      slug: 'steam-achievements',
      games_count: 42483,
      image_background:
        'https://media.rawg.io/media/games/da1/da1b267764d77221f07a4386b6548e5a.jpg',
    },
    {
      id: 7,
      name: 'Multiplayer',
      slug: 'multiplayer',
      games_count: 39665,
      image_background:
        'https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg',
    },
    {
      id: 40836,
      name: 'Full controller support',
      slug: 'full-controller-support',
      games_count: 20127,
      image_background:
        'https://media.rawg.io/media/games/49c/49c3dfa4ce2f6f140cc4825868e858cb.jpg',
    },
    {
      id: 13,
      name: 'Atmospheric',
      slug: 'atmospheric',
      games_count: 35550,
      image_background:
        'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg',
    },
    {
      id: 42,
      name: 'Great Soundtrack',
      slug: 'great-soundtrack',
      games_count: 3415,
      image_background:
        'https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg',
    },
    {
      id: 24,
      name: 'RPG',
      slug: 'rpg',
      games_count: 23023,
      image_background:
        'https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg',
    },
    {
      id: 18,
      name: 'Co-op',
      slug: 'co-op',
      games_count: 12615,
      image_background:
        'https://media.rawg.io/media/games/49c/49c3dfa4ce2f6f140cc4825868e858cb.jpg',
    },
    {
      id: 36,
      name: 'Open World',
      slug: 'open-world',
      games_count: 8164,
      image_background:
        'https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg',
    },
    {
      id: 411,
      name: 'cooperative',
      slug: 'cooperative',
      games_count: 5565,
      image_background:
        'https://media.rawg.io/media/games/21c/21cc15d233117c6809ec86870559e105.jpg',
    },
    {
      id: 8,
      name: 'First-Person',
      slug: 'first-person',
      games_count: 33666,
      image_background:
        'https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg',
    },
    {
      id: 149,
      name: 'Third Person',
      slug: 'third-person',
      games_count: 12641,
      image_background:
        'https://media.rawg.io/media/games/960/960b601d9541cec776c5fa42a00bf6c4.jpg',
    },
    {
      id: 4,
      name: 'Funny',
      slug: 'funny',
      games_count: 26270,
      image_background:
        'https://media.rawg.io/media/games/960/960b601d9541cec776c5fa42a00bf6c4.jpg',
    },
    {
      id: 37,
      name: 'Sandbox',
      slug: 'sandbox',
      games_count: 7475,
      image_background:
        'https://media.rawg.io/media/games/58a/58ac7f6569259dcc0b60b921869b19fc.jpg',
    },
    {
      id: 123,
      name: 'Comedy',
      slug: 'comedy',
      games_count: 13270,
      image_background:
        'https://media.rawg.io/media/games/a3c/a3c529a12c896c0ef02db5b4741de2ba.jpg',
    },
    {
      id: 150,
      name: 'Third-Person Shooter',
      slug: 'third-person-shooter',
      games_count: 3711,
      image_background:
        'https://media.rawg.io/media/games/e2d/e2d3f396b16dded0f841c17c9799a882.jpg',
    },
    {
      id: 62,
      name: 'Moddable',
      slug: 'moddable',
      games_count: 996,
      image_background:
        'https://media.rawg.io/media/games/997/997ab4d67e96fb20a4092383477d4463.jpg',
    },
    {
      id: 144,
      name: 'Crime',
      slug: 'crime',
      games_count: 3002,
      image_background:
        'https://media.rawg.io/media/games/13a/13a528ac9cf48bbb6be5d35fe029336d.jpg',
    },
    {
      id: 62349,
      name: 'vr mod',
      slug: 'vr-mod',
      games_count: 17,
      image_background:
        'https://media.rawg.io/media/screenshots/1bb/1bb3f78f0fe43b5d5ca2f3da5b638840.jpg',
    },
  ],
  esrb_rating: {
    id: 4,
    name: 'Mature',
    slug: 'mature',
  },
  clip: null,
  description_raw:
    'Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update. \nSimultaneous storytelling from three unique perspectives: \nFollow Michael, ex-criminal living his life of leisure away from the past, Franklin, a kid that seeks the better future, and Trevor, the exact past Michael is trying to run away from. \nGTA Online will provide a lot of additional challenge even for the experienced players, coming fresh from the story mode. Now you will have other players around that can help you just as likely as ruin your mission. Every GTA mechanic up to date can be experienced by players through the unique customizable character, and community content paired with the leveling system tends to keep everyone busy and engaged.\n\nEspañol\nRockstar Games se hizo más grande desde su entrega anterior de la serie. Obtienes la construcción del mundo complicada y realista de Liberty City de GTA4 en el escenario de Los Santos, un viejo favorito de los fans, GTA San Andreas. 561 vehículos diferentes (incluidos todos los transportes que puede operar) y la cantidad aumenta con cada actualización.\nNarración simultánea desde tres perspectivas únicas:\nSigue a Michael, ex-criminal que vive su vida de ocio lejos del pasado, Franklin, un niño que busca un futuro mejor, y Trevor, el pasado exacto del que Michael está tratando de huir.\nGTA Online proporcionará muchos desafíos adicionales incluso para los jugadores experimentados, recién llegados del modo historia. Ahora tendrás otros jugadores cerca que pueden ayudarte con la misma probabilidad que arruinar tu misión. Los jugadores pueden experimentar todas las mecánicas de GTA actualizadas a través del personaje personalizable único, y el contenido de la comunidad combinado con el sistema de nivelación tiende a mantener a todos ocupados y comprometidos.',
};

export const gtaSearch: PaginatedGamesResponse = {
  count: 76,
  next: 'https://api.rawg.io/api/games?key=c542e67aec3a4340908f9de9e86038af&page=2&page_size=2&search=gta',
  previous: null,
  results: [
    {
      slug: 'grand-theft-auto-1998',
      name: 'Grand Theft Auto',
      playtime: 1,
      platforms: [
        {
          platform: {
            id: 4,
            name: 'PC',
            slug: 'pc',
          },
          released_at: '',
          requirements: {
            minimum: undefined,
            recommended: undefined,
          },
        },
        {
          platform: {
            id: 27,
            name: 'PlayStation',
            slug: 'playstation1',
          },
          released_at: '',
          requirements: {
            minimum: undefined,
            recommended: undefined,
          },
        },
        {
          platform: {
            id: 43,
            name: 'Game Boy Color',
            slug: 'game-boy-color',
          },
          released_at: '',
          requirements: {
            minimum: undefined,
            recommended: undefined,
          },
        },
        {
          platform: {
            id: 26,
            name: 'Game Boy',
            slug: 'game-boy',
          },
          released_at: '',
          requirements: {
            minimum: undefined,
            recommended: undefined,
          },
        },
      ],
      released: '1997-10-21',
      tba: false,
      background_image:
        'https://media.rawg.io/media/games/786/786f9a212646c793ccbad196cba2cf36.jpg',
      rating: 3.86,
      rating_top: 4,
      ratings: [
        {
          id: 4,
          title: 'recommended',
          count: 218,
          percent: 54.91,
        },
        {
          id: 5,
          title: 'exceptional',
          count: 85,
          percent: 21.41,
        },
        {
          id: 3,
          title: 'meh',
          count: 71,
          percent: 17.88,
        },
        {
          id: 1,
          title: 'skip',
          count: 23,
          percent: 5.79,
        },
      ],
      metacritic: null,
      updated: '2024-12-30T13:39:51',
      id: 52998,
      clip: null,
      tags: [
        {
          id: 31,
          name: 'Singleplayer',
          slug: 'singleplayer',
          games_count: 233260,
          image_background:
            'https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg',
        },
        {
          id: 7,
          name: 'Multiplayer',
          slug: 'multiplayer',
          games_count: 39665,
          image_background:
            'https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg',
        },
        {
          id: 36,
          name: 'Open World',
          slug: 'open-world',
          games_count: 8164,
          image_background:
            'https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg',
        },
        {
          id: 45,
          name: '2D',
          slug: '2d',
          games_count: 199708,
          image_background:
            'https://media.rawg.io/media/games/a91/a911f0a91991469e398fa70091507a5b.jpg',
        },
        {
          id: 193,
          name: 'Classic',
          slug: 'classic',
          games_count: 1804,
          image_background:
            'https://media.rawg.io/media/games/4fb/4fb548e4816c84d1d70f1a228fb167cc.jpg',
        },
        {
          id: 61,
          name: 'Top-Down',
          slug: 'top-down',
          games_count: 26474,
          image_background:
            'https://media.rawg.io/media/screenshots/71c/71c015df012029897e87ac00b7a8de4c.jpg',
        },
      ],
      esrb_rating: {
        id: 4,
        name: 'Mature',
        slug: 'mature',
      },
      saturated_color: '0f0f0f',
      dominant_color: '0f0f0f',
      parent_platforms: [
        {
          platform: {
            id: 1,
            name: 'PC',
            slug: 'pc',
          },
        },
        {
          platform: {
            id: 2,
            name: 'PlayStation',
            slug: 'playstation',
          },
        },
        {
          platform: {
            id: 7,
            name: 'Nintendo',
            slug: 'nintendo',
          },
        },
      ],
      genres: [
        {
          id: 4,
          name: 'Action',
          slug: 'action',
        },
      ],
      name_original: '',
      description: '',
      metacritic_platforms: [],
      background_image_additional: '',
      website: '',
      screenshots_count: 0,
      movies_count: 0,
      creators_count: 0,
      achievements_count: 0,
      parent_achievements_count: 0,
      reddit_url: '',
      description_raw: '',
    },
    {
      slug: 'gta-bankrob',
      name: 'GTA-bankrob',
      playtime: 0,
      platforms: [
        {
          platform: {
            id: 4,
            name: 'PC',
            slug: 'pc',
          },
          released_at: '',
          requirements: {
            minimum: undefined,
            recommended: undefined,
          },
        },
      ],
      released: '2017-04-10',
      tba: false,
      background_image:
        'https://media.rawg.io/media/screenshots/70d/70d98f3c42cdc6db6cfd6318e6519b96.jpg',
      rating: 0.0,
      rating_top: 0,
      ratings: [],
      metacritic: null,
      updated: '2019-01-09T12:41:06',
      id: 197932,
      clip: null,
      tags: [
        {
          id: 604,
          name: 'simple',
          slug: 'simple',
          games_count: 9292,
          image_background:
            'https://media.rawg.io/media/screenshots/662/662c62b3368611fb5d1c2ac39d700350.jpg',
        },
      ],
      esrb_rating: null,
      saturated_color: '0f0f0f',
      dominant_color: '0f0f0f',
      parent_platforms: [
        {
          platform: {
            id: 1,
            name: 'PC',
            slug: 'pc',
          },
        },
      ],
      genres: [],
      name_original: '',
      description: '',
      metacritic_platforms: [],
      background_image_additional: '',
      website: '',
      screenshots_count: 0,
      movies_count: 0,
      creators_count: 0,
      achievements_count: 0,
      parent_achievements_count: 0,
      reddit_url: '',
      description_raw: '',
    },
  ],
};
