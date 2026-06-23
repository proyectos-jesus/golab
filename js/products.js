// GOLAB — Products Data
// Plataforma Ecommerce | Gomitas Funcionales Naturales

const GOLAB_PRODUCTS = [
  {
    id: 1,
    slug: "gomitas-moringa",
    name: "Gomitas de Moringa",
    tagline: "Energía y vitalidad desde la naturaleza",
    price: 30.96,
    currency: "Bs.",
    category: "energia",
    tag: "Más vendido",
    color: "#4A7C59",
    bgClass: "bg-moringa",
    image: "images/moringa.jpg",
    gallery: ["images/moringa.jpg", "images/moringa-2.jpg"],
    shortDescription: "Potencia tu día con la superplanta más nutritiva del planeta. Nuestras gomitas de Moringa están elaboradas con extracto puro boliviano.",
    description: `La Moringa Oleifera, conocida como "el árbol de la vida", es reconocida mundialmente por su extraordinaria densidad nutricional. Cada gomita GOLAB concentra lo mejor de esta planta ancestral en una presentación moderna, deliciosa y conveniente.\n\nFormuladas sin colorantes artificiales, sin conservantes sintéticos y con endulzantes naturales, nuestras gomitas son el complemento perfecto para quienes buscan bienestar real desde adentro.`,
    benefits: [
      "Aumenta los niveles de energía natural",
      "Fortalece el sistema inmunológico",
      "Rico en vitaminas A, C, E y complejo B",
      "Apoya la salud ósea y muscular",
      "Propiedades antioxidantes potentes",
      "Mejora la concentración y el rendimiento mental"
    ],
    ingredients: [
      "Extracto de Moringa Oleifera (500mg por porción)",
      "Gelatina natural",
      "Miel de abeja boliviana",
      "Zumo de limón orgánico",
      "Vitamina C natural",
      "Sin colorantes artificiales"
    ],
    netContent: "30 gomitas / 150g",
    servingSize: "2 gomitas diarias",
    stock: 50,
    rating: 4.9,
    reviews: 128
  },
  {
    id: 2,
    slug: "gomitas-muna",
    name: "Gomitas de Muña",
    tagline: "El secreto digestivo de los Andes",
    price: 22.35,
    currency: "Bs.",
    category: "digestivo",
    tag: "Andino",
    color: "#C9A84C",
    bgClass: "bg-muna",
    image: "images/muna.jpg",
    gallery: ["images/muna.jpg", "images/muna-2.jpg"],
    shortDescription: "La planta aromática de los Andes que cuida tu digestión. Muña boliviana pura en cada gomita, tradición milenaria en formato moderno.",
    description: `La Muña (Minthostachys mollis) es una planta aromática endémica de los Andes bolivianos, utilizada por comunidades indígenas durante siglos para aliviar malestares digestivos, combatir el mal de altura y fortalecer el cuerpo en entornos exigentes.\n\nGOLAB rescata este conocimiento ancestral y lo transforma en una gomita funcional de alta calidad, elaborada con muña cultivada de forma sostenible en los valles interandinos de Bolivia.`,
    benefits: [
      "Alivia molestias digestivas y gases",
      "Ayuda a combatir el soroche (mal de altura)",
      "Propiedades antiinflamatorias naturales",
      "Favorece la absorción de calcio",
      "Efecto relajante y antiespasmódico",
      "Fortalece el sistema respiratorio"
    ],
    ingredients: [
      "Extracto de Muña andina (400mg por porción)",
      "Gelatina natural",
      "Stevia boliviana",
      "Aceite esencial de menta andina",
      "Zumo de maracuyá",
      "Sin gluten ni lactosa"
    ],
    netContent: "30 gomitas / 150g",
    servingSize: "2 gomitas diarias",
    stock: 35,
    rating: 4.8,
    reviews: 94
  },
  {
    id: 3,
    slug: "gomitas-valeriana",
    name: "Gomitas de Valeriana",
    tagline: "Tu ritual de descanso nocturno",
    price: 24.04,
    currency: "Bs.",
    category: "descanso",
    tag: "Premium",
    color: "#7B5C42",
    bgClass: "bg-valeriana",
    image: "images/valeriana.jpg",
    gallery: ["images/valeriana.jpg", "images/valeriana-2.jpg"],
    shortDescription: "Duerme profundo, despierta renovado. Valeriana natural combinada con miel boliviana para el descanso que tu cuerpo merece.",
    description: `La Valeriana officinalis ha sido la aliada del sueño reparador durante milenios. Avalada por la ciencia moderna y respaldada por tradiciones herbolarias milenarias, la valeriana actúa como un sedante natural suave que prepara el sistema nervioso para el descanso sin generar dependencia ni efectos secundarios.\n\nNuestras gomitas de Valeriana GOLAB son la alternativa natural a los somníferos convencionales. Formuladas para adultos que buscan recuperar la calidad de su sueño de manera segura, deliciosa y efectiva.`,
    benefits: [
      "Reduce el tiempo para conciliar el sueño",
      "Mejora la calidad y profundidad del sueño",
      "Alivia el estrés y la ansiedad leve",
      "No genera dependencia ni efecto resaca",
      "Calma el sistema nervioso central",
      "Favorece la relajación muscular"
    ],
    ingredients: [
      "Extracto de Valeriana officinalis (300mg por porción)",
      "Melisa (toronjil) natural",
      "Miel de abeja oscura boliviana",
      "Gelatina natural",
      "Zumo de uva negra",
      "Vitamina B6"
    ],
    netContent: "30 gomitas / 150g",
    servingSize: "2 gomitas 30 min antes de dormir",
    stock: 28,
    rating: 4.9,
    reviews: 201
  },
  {
    id: 4,
    slug: "gomitas-licor",
    name: "Gomitas con Licor",
    tagline: "Placer adulto, ingredientes reales",
    price: 12,
    currency: "Bs.",
    category: "premium",
    tag: "Edición especial",
    color: "#1A1A1A",
    bgClass: "bg-licor",
    image: "images/licor.jpg",
    gallery: ["images/licor.jpg", "images/licor-2.jpg"],
    shortDescription: "Para los paladares exigentes. Gomitas gourmet elaboradas con licores bolivianos premium — singani, vino y destilados artesanales.",
    description: `Una experiencia sensorial diferente. Las Gomitas con Licor GOLAB son nuestra línea gourmet para adultos, elaboradas con destilados bolivianos de primera calidad: Singani de los Cintis, vino de altura y aguardiente artesanal de los valles.\n\nCada gomita es una pequeña joya gastronómica: textura perfecta, sabor complejo y el carácter inconfundible de Bolivia en cada mordida. Ideales como regalo, para celebraciones especiales o simplemente para darte un lujo cotidiano.`,
    benefits: [
      "Experiencia gourmet única en Bolivia",
      "Elaboradas con singani y licores artesanales",
      "Textura premium larga duración",
      "Sin conservantes artificiales",
      "Presentación elegante para regalo",
      "Sabores exclusivos de temporada"
    ],
    ingredients: [
      "Singani boliviano Casa Real (8% vol.)",
      "Vino tinto de altura (Tarija)",
      "Gelatina premium",
      "Azúcar orgánica de caña",
      "Extracto natural de frutos rojos",
      "Colorantes naturales (betacaroteno, antocianinas)"
    ],
    netContent: "20 gomitas / 120g",
    servingSize: "Consumo responsable para adultos +18",
    stock: 15,
    rating: 4.7,
    reviews: 67
  }
];

// Blog articles data
const GOLAB_BLOG = [
  {
    id: 1,
    slug: "beneficios-moringa",
    title: "Moringa: La Superplanta que Bolivia le Regala al Mundo",
    excerpt: "Descubre por qué la Moringa Oleifera es considerada uno de los superalimentos más completos del planeta y cómo puede transformar tu salud diaria.",
    category: "Superalimentos",
    date: "15 de mayo, 2025",
    readTime: "5 min",
    image: "images/blog-moringa.jpg",
    content: `La Moringa Oleifera no es una moda pasajera: es una planta con más de 4,000 años de historia en la medicina ayurvédica y africana. Lo que sí es nuevo es la ciencia que respalda lo que las culturas ancestrales siempre supieron.\n\nCon más de 90 nutrientes, 46 antioxidantes y todos los aminoácidos esenciales, la moringa es, por definición, un superalimento. Y Bolivia, con sus condiciones climáticas únicas, produce algunas de las mejores variedades del mundo.`
  },
  {
    id: 2,
    slug: "beneficios-muna",
    title: "Muña: El Tesoro Digestivo de los Andes Bolivianos",
    excerpt: "Conoce la historia, los usos tradicionales y la ciencia moderna detrás de la muña, la planta aromática que los pueblos andinos han usado por siglos.",
    category: "Plantas Andinas",
    date: "8 de junio, 2025",
    readTime: "4 min",
    image: "images/blog-muna.jpg",
    content: `En las alturas de los valles interandinos bolivianos, entre los 2,500 y 3,800 metros sobre el nivel del mar, crece una pequeña planta de hojas menudas y aroma intenso que los pueblos quechua y aymara han reverenciado durante generaciones: la muña.\n\nSu uso tradicional abarca desde el tratamiento de malestares digestivos hasta la lucha contra el soroche, ese malestar tan característico de las alturas bolivianas.`
  },
  {
    id: 3,
    slug: "beneficios-valeriana",
    title: "Valeriana: Tu Aliada Natural para Dormir Mejor",
    excerpt: "El insomnio afecta a millones. La valeriana ofrece una solución natural, efectiva y sin dependencia. Aquí todo lo que necesitas saber.",
    category: "Bienestar y Sueño",
    date: "22 de julio, 2025",
    readTime: "6 min",
    image: "images/blog-valeriana.jpg",
    content: `Según la OMS, entre el 27% y el 40% de la población adulta mundial sufre algún trastorno del sueño. En Bolivia, el ritmo de vida acelerado de ciudades como La Paz, Santa Cruz y Cochabamba está generando una epidemia silenciosa de insomnio y ansiedad.\n\nLa valeriana (Valeriana officinalis) lleva más de 2,000 años siendo utilizada como sedante natural en Europa y Asia. Su mecanismo de acción está hoy bien documentado: actúa sobre los receptores GABA del cerebro, los mismos receptores que estimulan los ansiolíticos farmacológicos, pero de forma suave y sin generar dependencia.`
  },
  {
    id: 4,
    slug: "tendencias-gomitas-funcionales",
    title: "Gomitas Funcionales: La Revolución del Bienestar en Bolivia",
    excerpt: "El mercado global de suplementos en formato gummy crece al 12% anual. Bolivia está entrando a esta revolución con productos únicos. GOLAB lidera el camino.",
    category: "Tendencias",
    date: "3 de agosto, 2025",
    readTime: "7 min",
    image: "images/blog-tendencias.jpg",
    content: `El mercado global de suplementos nutricionales en formato gomita superó los $7.5 mil millones USD en 2024 y se proyecta que alcanzará los $15 mil millones para 2030. Esta tendencia no es casual: las gomitas funcionales resuelven el mayor problema de la industria de suplementos — la adherencia.\n\nLas personas simplemente no toman pastillas con consistencia. Pero sí comen gomitas. Este insight aparentemente simple está revolucionando la forma en que el mundo consume nutrición.`
  }
];

// Export for use across files
if (typeof module !== 'undefined') {
  module.exports = { GOLAB_PRODUCTS, GOLAB_BLOG };
}
