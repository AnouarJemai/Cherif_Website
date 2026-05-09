export interface Activity {
  id: number;
  icon: string;
  tag: string;
  title: string;
  desc: string;
  price: string;
  unit: string;
  img: string;
  category: string;
}

export interface Review {
  name: string;
  flag: string;
  text: string;
  stars: number;
}

export interface Pack {
  name: string;
  accent: string;
  badge: string;
  price: string;
  features: string[];
}

export const ACTIVITIES: Activity[] = [
  { id:1, icon:"🚤", tag:"Populaire", title:"Balade en mers",
    desc:"Naviguez en liberté sur les eaux turquoise de Djerba.",
    price:"150€", unit:"/ sortie", category:"Mer",
    img:"https://cdn-images-1.click-mallorca.com/images/foto-landing/foto_seccion_landing-23840-o.jpg" },


  { id:3, icon:"🐪", tag:"Aventure", title:"Excursion Désert",
    desc:"Traversez les dunes dorées du Sahara et bivouaquez sous les étoiles.",
    price:"80€", unit:"/ pers.", category:"Désert",
    img:"https://www.saharansky.com/file/2018/10/IMG_5844-copy.jpg" },


  { id:4, icon:"🐪", tag:"Aventure", title:"Balade cheval/chameau/caleche",
    desc:"Traversez les dunes dorées du Sahara et bivouaquez sous les étoiles.",
    price:"80€", unit:"/ pers.", category:"Désert",
    img:"https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80" },


  { id:5, icon:"🐪", tag:"Aventure", title:"tour de l ile",
    desc:"Découvrez Djerba avec un guide.",
    price:"80€", unit:"/ pers.", category:"Désert",
    img:"https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80" },

  { id:7, icon:"🏍️", tag:"Populaire", title:"Excursion Quads",
    desc:"Découvrez Djerba avec les quads.",
    price:"30€", unit:"/ pers.", category:"Mobilité",
    img:"https://tse2.mm.bing.net/th/id/OIP.FUb9yK89WzyctFZRwkS4YwHaE8?w=474&h=379&c=7&p=0"},

  { id:9, icon:"🌊", tag:"Aventure", title:"Sports Nautiques",
    desc:"Jet ski, banana boat et parachute ascensionnel à Djerba.",
    price:"45€",
    unit:"/ pers.",
    category:"Loisirs",
    img:"https://media.ceetiz.com/activity/DEPDJE007/Jet-Ski_Djerba_Ceetiz-4.JPG"},

  { id:10, icon:"🌊", tag:"Aventure", title:"activite de poterie",
    desc:"Poterie.",
    price:"45€",
    unit:"/ pers.",
    category:"Loisirs",
    img:"https://images.openai.com/static-rsc-4/Nx6sGOTqrFQuFMEGqRqxCbc6ZAM9xDYS9gDRKMpy2D6jOqKBftDv9yCiBdjOKhsjoM11bbWpthW47XAclh_K-oh3prfJljkxYq5r2UAqpedBjz_YHVQDxBGKAR0yNyeeNkUhfQ5kr85wq2jumY_DrAaM2vKsP2uo6iENq647WouxWyfWZVWSAEznqnWpvdvO?purpose=fullsize"},
  
  { id:13, icon:"🥘", tag:"Culture", title:"Préparation de Repas Traditionnels",
    desc:"Participez à un atelier culinaire traditionnel et apprenez à préparer un authentique couscous tunisien à Djerba.",
    price:"40€",
    unit:"/ pers.",
    category:"Tourisme Culturel",
    img:"https://tse2.mm.bing.net/th/id/OIP.8zpFZ3Rz7xdm4J_9HpNCJQHaF7?r=0&w=474&h=379&c=7&p=0"},
];

export const REVIEWS: Review[] = [
  { name:"Sophie M.", flag:"🇫🇷", text:"Expérience inoubliable ! Le tour en bateau était magnifique.", stars:5 },
  { name:"Karim B.", flag:"🇩🇿", text:"Djerba activities a rendu mon séjour vraiment exceptionnel !", stars:5 },
  { name:"Marie D.", flag:"🇧🇪", text:"Organisation au top. L'excursion dans le désert était magique.", stars:5 },
];

export const PACKS: Pack[] = [
  { name:"Essentiel", accent:"#7a9a7a", badge:"", price:"99€",
    features:["1 sortie Jet-Ski (30 min)","Livraison repas incluse","Support WhatsApp","Transfert aéroport"] },
  { name:"VIP", accent:"#C9A84C", badge:"⭐ Populaire", price:"199€",
    features:["Bateau privatisé ½ journée","Jet-Ski illimité 1h","Brunch VIP inclus","Location voiture 1 jour","Support 24/7"] },
  { name:"Prestige", accent:"#F5E07A", badge:"👑 Best", price:"349€",
    features:["Bateau privatisé journée","Jet-Ski illimité","Excursion désert 2j","Brunch + Dîner VIP","Location voiture 3j","Guide privé"] },
];

// ✅ Updated tabs — Booking tab replaces Contact in bottom bar
export const TABS = [
  { id:"home",       icon:"🏠", label:"Accueil"     },
  { id:"activities", icon:"🌊", label:"Activités"   },
  { id:"packages",   icon:"✨", label:"Formules"    },
  { id:"booking",    icon:"📅", label:"Réserver"    },
];
