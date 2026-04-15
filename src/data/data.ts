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
  { id:1, icon:"🚤", tag:"Populaire", title:"Bateau Privatisé",
    desc:"Naviguez en liberté sur les eaux turquoise de Djerba à bord de votre bateau privatisé.",
    price:"150€", unit:"/ sortie", category:"Mer",
    img:"https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=600&q=80" },
  { id:2, icon:"🏄", tag:"Adrénaline", title:"Jet-Ski",
    desc:"Glissez à toute vitesse sur la Méditerranée pour des sensations uniques.",
    price:"50€", unit:"/ 30 min", category:"Mer",
    img:"https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=600&q=80" },
  { id:3, icon:"🐪", tag:"Aventure", title:"Excursion Désert",
    desc:"Traversez les dunes dorées du Sahara et bivouaquez sous les étoiles.",
    price:"80€", unit:"/ pers.", category:"Désert",
    img:"https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80" },
  { id:4, icon:"🚗", tag:"VIP", title:"Location Voiture",
    desc:"Explorez l'île à votre rythme dans un véhicule haut de gamme.",
    price:"40€", unit:"/ jour", category:"Mobilité",
    img:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80" },
  { id:5, icon:"🍕", tag:"Saveurs", title:"Livraison Cuisine",
    desc:"Pizzas, burgers et spécialités tunisiennes livrés directement chez vous.",
    price:"15€", unit:"min.", category:"Gastronomie",
    img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80" },
  { id:6, icon:"🌅", tag:"Luxe", title:"Brunch VIP",
    desc:"Produits frais, spécialités locales et table dressée face à la mer.",
    price:"25€", unit:"/ pers.", category:"Gastronomie",
    img:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" },
];

export const REVIEWS: Review[] = [
  { name:"Sophie M.", flag:"🇫🇷", text:"Expérience inoubliable ! Le tour en bateau était magnifique.", stars:5 },
  { name:"Karim B.", flag:"🇩🇿", text:"VIP Djerba a rendu mon séjour vraiment exceptionnel !", stars:5 },
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
