export const IconFamily = {
  antDesign: 'AntDesign',
  entypo: 'Entypo',
  evilIcons: 'EvilIcons',
  feather: 'Feather',
  fontAwesome: 'FontAwesome',
  fontAwesome5: 'FontAwesome5',
  fontAwesome5Brands: 'FontAwesome5Brands',
  FONT_AWESOME6: 'FontAwesome6',
  FONT_AWESOME6Brands: 'FontAwesome6Brands',
  FONTISTO: 'Fontisto',
  FOUNDATION: 'Foundation',
  IONICONS: 'Ionicons',
  MATERIAL_COMMUNITY_ICONS: 'MaterialCommunityIcons',
  MATERIAL_ICONS: 'MaterialIcons',
  OCTICONS: 'Octicons',
  SIMPLE_LINE_ICONS: 'SimpleLineIcons',
  ZOCIAL: 'Zocial',
} as const;

export const Icons = {
  antDesign: {
    star: { family: IconFamily.antDesign, name: 'star' },
  },
  entypo: {},
  evilIcons: {},
  feather: {
    search: { family: IconFamily.feather, name: 'search' },
  },
  fontAwesome: {
    check: { family: IconFamily.fontAwesome, name: 'check' },
    linux: { family: IconFamily.fontAwesome, name: 'linux' },
    trophy: { family: IconFamily.fontAwesome, name: 'trophy' },
  },
  fontAwesome5: {},
  fontAwesome5Brands: {},
  fontAwesome6: {},
  fontAwesome6Brands: {},
  fontisto: {
    person: { family: IconFamily.FONTISTO, name: 'person' },
  },
  foundation: {},
  ionicons: {},
  materialCommunityIcons: {
    arrowLeft: { family: IconFamily.MATERIAL_COMMUNITY_ICONS, name: 'arrow-left' },
    chartBox: { family: IconFamily.MATERIAL_COMMUNITY_ICONS, name: 'chart-box' },
    crown: { family: IconFamily.MATERIAL_COMMUNITY_ICONS, name: 'crown' },
    eye: { family: IconFamily.MATERIAL_COMMUNITY_ICONS, name: 'eye' },
    eyeOff: { family: IconFamily.MATERIAL_COMMUNITY_ICONS, name: 'eye-off' },
    ios: { family: IconFamily.MATERIAL_COMMUNITY_ICONS, name: 'apple-ios' },
    microsoftWindows: { family: IconFamily.MATERIAL_COMMUNITY_ICONS, name: 'microsoft-windows' },
    nintendo: { family: IconFamily.MATERIAL_COMMUNITY_ICONS, name: 'nintendo-game-boy' },
    sonyPlaystation: { family: IconFamily.MATERIAL_COMMUNITY_ICONS, name: 'sony-playstation' },
    trashCan: { family: IconFamily.MATERIAL_COMMUNITY_ICONS, name: 'trash-can' },
    xbox: { family: IconFamily.MATERIAL_COMMUNITY_ICONS, name: 'microsoft-xbox' },
  },
  materialIcons: {
    add: { family: IconFamily.MATERIAL_ICONS, name: 'add' },
    addCircle: { family: IconFamily.MATERIAL_ICONS, name: 'add-circle' },
    apple: { family: IconFamily.MATERIAL_ICONS, name: 'apple' },
    alternateEmail: { family: IconFamily.MATERIAL_ICONS, name: 'alternate-email' },
    arrowDropDown: { family: IconFamily.MATERIAL_ICONS, name: 'arrow-drop-down' },
    close: { family: IconFamily.MATERIAL_ICONS, name: 'close' },
    collections: { family: IconFamily.MATERIAL_ICONS, name: 'collections' },
    fullscreen: { family: IconFamily.MATERIAL_ICONS, name: 'fullscreen' },
    fullscreenExit: { family: IconFamily.MATERIAL_ICONS, name: 'fullscreen-exit' },
    games: { family: IconFamily.MATERIAL_ICONS, name: 'games' },
    iPhone: { family: IconFamily.MATERIAL_ICONS, name: 'phone-iphone' },
    libraryAdd: { family: IconFamily.MATERIAL_ICONS, name: 'library-add' },
    lineWeight: { family: IconFamily.MATERIAL_ICONS, name: 'line-weight' },
    localFireDepartment: { family: IconFamily.MATERIAL_ICONS, name: 'local-fire-department' },
    logout: { family: IconFamily.MATERIAL_ICONS, name: 'logout' },
    password: { family: IconFamily.MATERIAL_ICONS, name: 'password' },
    playArrow: { family: IconFamily.MATERIAL_ICONS, name: 'play-arrow' },
    smartPhone: { family: IconFamily.MATERIAL_ICONS, name: 'smartphone' },
    star: { family: IconFamily.MATERIAL_ICONS, name: 'star' },
    starHalf: { family: IconFamily.MATERIAL_ICONS, name: 'star-half' },
    starOutline: { family: IconFamily.MATERIAL_ICONS, name: 'star-outline' },
  },
  octicons: {
    diffAdded: { family: IconFamily.OCTICONS, name: 'diff-added' },
  },
  simpleLineIcons: {},
  zocial: {
    macStore: { family: IconFamily.MATERIAL_ICONS, name: 'macstore' },
  },
};
