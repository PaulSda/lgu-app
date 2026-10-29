"use strict";
/* =========================================================
   LE GUIDE ULTIME — Appli des Plaques Ultimes (prototype)
   Toutes les adresses, créateurs et potes sont des exemples.
   ========================================================= */

// ---------- DONNÉES ----------
const SECT = {
  sale: ["Falafels","Burger","Poulet frit","Poulet","Kebab","Couscous","Tagine","Ramen","Banh mi","Crousty","Tacos","French Tacos","Sushi","Mafé","Thiep","Xiao long bao","Gyoza","Bobun","Pho","Shawarma","Pad thaï","Bibimbap","Hot pot","Loc lac","Curry","Naan","Onigiri","Vraie carbo","Pâtes fraîches","Pizza","Cordon bleu","Frites","Sandwich","Salade César","Croque","Aligot","Planches","Quiche","Dumpling","Grillades","Empanadas","Nouilles","Raviolis"],
  sucre: ["Ourson","Flan","Cookie","Croissant","Pain au chocolat","Chouquettes","Tartes sucrées","Éclairs","Paris Brest","Fondant au chocolat","Millefeuilles","Cannelés","Kouign Amann","Tiramisu","Mousse au chocolat","Cheese cake","Pancake japonais","Brioche","Glace","Crêpes"],
  typo: ["Confiserie","Chocolaterie","Bistrot","Brasserie","Fromagerie","Épicerie","Apéro","Brunch","Goûter","Healthy","Primeur","Produits locaux","Circuits courts","Cuisine locale","Adresses cachées","Cuisine familiale","Bar à cocktails","Marchés","Café pas cher","Avec vue","Qualité/prix","Étoilé","Mérite une étoile","Boui boui","Comptoir","Institutions","Généreux","Le Fooding","Glacier","Coffeeshop"]
};
const SECT_NAME = {sale:"Salé", sucre:"Sucré", typo:"Typo"};
const ALL = [...SECT.sale, ...SECT.sucre, ...SECT.typo];
const NUM = {}; ALL.forEach((c,i)=>NUM[c]=i+1);
const SECT_OF = {}; Object.entries(SECT).forEach(([k,a])=>a.forEach(c=>SECT_OF[c]=k));

const ILL = {"Burger":"c00","Kebab":"c01","Frites":"c02","Ramen":"c03","Pizza":"c04","Sushi":"c05","Tacos":"c06","French Tacos":"c07","Banh mi":"c08","Poulet frit":"c09","Poulet":"c10","Falafels":"c11","Bibimbap":"c12","Bobun":"c13","Gyoza":"c14","Hot pot":"c15","Mafé":"c16","Naan":"c17","Pad thaï":"c18","Pho":"c19","Onigiri":"c20","Xiao long bao":"c21","Vraie carbo":"c22"};
// plaques officielles (Canva « Plaque Ultime - catégories salées »), mention du resto effacée : on écrit le vrai nom par-dessus
// visuels des catégories (Drive « catégories »), titre = nom du fichier
const CAT_VIS = {"Aligot": {"k": "cv_00", "t": "Aligot"}, "Banh mi": {"k": "cv_01", "t": "Banh Mi"}, "Bibimbap": {"k": "cv_02", "t": "Bibimbap"}, "Bobun": {"k": "cv_03", "t": "Bobun"}, "Burger": {"k": "cv_04", "t": "Burger"}, "Vraie carbo": {"k": "cv_05", "t": "Carbo"}, "Cordon bleu": {"k": "cv_06", "t": "Cordon Bleu"}, "Couscous": {"k": "cv_07", "t": "Couscous"}, "Croque": {"k": "cv_08", "t": "Croque"}, "Crousty": {"k": "cv_09", "t": "Crousty"}, "Curry": {"k": "cv_10", "t": "Curry"}, "Dumpling": {"k": "cv_11", "t": "Dumplings"}, "Empanadas": {"k": "cv_12", "t": "Empanadas"}, "Falafels": {"k": "cv_13", "t": "Falafels"}, "French Tacos": {"k": "cv_14", "t": "French Taco"}, "Frites": {"k": "cv_15", "t": "Frites"}, "Grillades": {"k": "cv_16", "t": "Grillades"}, "Gyoza": {"k": "cv_17", "t": "Gyoza"}, "Hot pot": {"k": "cv_18", "t": "Hot Pot"}, "Kebab": {"k": "cv_19", "t": "Kebab"}, "Loc lac": {"k": "cv_20", "t": "Loc Lac"}, "Mafé": {"k": "cv_21", "t": "Mafé"}, "Naan": {"k": "cv_22", "t": "Naan"}, "Nouilles": {"k": "cv_23", "t": "Nouilles"}, "Onigiri": {"k": "cv_24", "t": "Onigiri"}, "Pad thaï": {"k": "cv_25", "t": "Pad Thaï"}, "Pâtes fraîches": {"k": "cv_26", "t": "Pâtes Fraîches"}, "Pho": {"k": "cv_27", "t": "Pho"}, "Pizza": {"k": "cv_28", "t": "Pizza"}, "Planches": {"k": "cv_29", "t": "Planche"}, "Poulet": {"k": "cv_31", "t": "Poulet"}, "Poulet frit": {"k": "cv_32", "t": "Poulet Frit"}, "Quiche": {"k": "cv_33", "t": "Quiche"}, "Ramen": {"k": "cv_34", "t": "Ramen"}, "Raviolis": {"k": "cv_35", "t": "Raviolis"}, "Salade César": {"k": "cv_36", "t": "Salade César"}, "Sandwich": {"k": "cv_37", "t": "Sandwich Salade"}, "Shawarma": {"k": "cv_38", "t": "Shawarma"}, "Sushi": {"k": "cv_39", "t": "Sushi"}, "Tacos": {"k": "cv_40", "t": "Taco"}, "Tagine": {"k": "cv_41", "t": "Tagine"}, "Thiep": {"k": "cv_42", "t": "Thiep"}, "Xiao long bao": {"k": "cv_43", "t": "Xiao Long Bao"}};
const PLAQUE_ART = {"Crousty": "pl_01", "Salade César": "pl_02", "Vraie carbo": "pl_03", "Croque": "pl_04", "Curry": "pl_05", "Cordon bleu": "pl_06", "Aligot": "pl_07", "Empanadas": "pl_08", "Couscous": "pl_09", "Grillades": "pl_10", "Nouilles": "pl_11", "Tagine": "pl_12", "Planches": "pl_13", "Dumpling": "pl_14", "Raviolis": "pl_15", "Thiep": "pl_16", "Kebab": "pl_17", "Poulet": "pl_18", "Xiao long bao": "pl_19", "Sushi": "pl_20", "Ramen": "pl_21", "Poulet frit": "pl_24", "Pizza": "pl_25", "Pho": "pl_26", "Onigiri": "pl_27", "Pad thaï": "pl_28", "Gyoza": "pl_29", "French Tacos": "pl_30", "Tacos": "pl_31", "Falafels": "pl_32", "Pâtes fraîches": "pl_33", "Burger": "pl_34", "Bobun": "pl_35", "Bibimbap": "pl_36", "Loc lac": "pl_37", "Banh mi": "pl_38", "Sandwich": "pl_39", "Shawarma": "pl_41", "Quiche": "pl_42", "Naan": "pl_43", "Frites": "pl_44", "Mafé": "pl_45", "Hot pot": "pl_46"};

const TITLE = {"Frites":"Meilleures frites","Xiao long bao":"Meilleurs xiao long bao","Gyoza":"Meilleurs gyozas","Falafels":"Meilleurs falafels","Tacos":"Meilleurs tacos","Sushi":"Meilleurs sushis","Pizza":"Meilleure pizza","Vraie carbo":"Meilleure vraie carbo","Salade César":"Meilleure salade César","Quiche":"Meilleure quiche","Pâtes fraîches":"Meilleures pâtes fraîches","Planches":"Meilleures planches","Grillades":"Meilleures grillades","Empanadas":"Meilleures empanadas","Nouilles":"Meilleures nouilles","Raviolis":"Meilleurs raviolis","Crêpes":"Meilleures crêpes","Glace":"Meilleure glace","Brioche":"Meilleure brioche","Chouquettes":"Meilleures chouquettes","Tartes sucrées":"Meilleures tartes","Éclairs":"Meilleurs éclairs","Cannelés":"Meilleurs cannelés","Millefeuilles":"Meilleurs millefeuilles","Mousse au chocolat":"Meilleure mousse au chocolat","Cheese cake":"Meilleur cheesecake","Pancake japonais":"Meilleurs pancakes japonais","Dumpling":"Meilleurs dumplings","French Tacos":"Meilleur french tacos","Confiserie":"Meilleure confiserie","Chocolaterie":"Meilleure chocolaterie","Brasserie":"Meilleure brasserie","Fromagerie":"Meilleure fromagerie","Épicerie":"Meilleure épicerie","Produits locaux":"Meilleurs produits locaux","Circuits courts":"Meilleurs circuits courts","Cuisine locale":"Meilleure cuisine locale","Adresses cachées":"Meilleure adresse cachée","Cuisine familiale":"Meilleure cuisine familiale","Marchés":"Meilleur marché","Avec vue":"Meilleure vue","Qualité/prix":"Meilleur qualité/prix","Mérite une étoile":"Mérite une étoile","Boui boui":"Meilleur boui-boui","Institutions":"Institution ultime","Généreux":"Le plus généreux","Le Fooding":"Coup de cœur Fooding","Kouign Amann":"Meilleur kouign-amann","Paris Brest":"Meilleur paris-brest","Pain au chocolat":"Meilleur pain au chocolat","Bar à cocktails":"Meilleur bar à cocktails","Café pas cher":"Meilleur café pas cher","Étoilé":"Meilleur étoilé"};
const title = c => TITLE[c] || ("Meilleur " + c.toLowerCase());

// Rareté = combien de plaqués existent dans la catégorie en France (pas le prix) : du kebab à l'étoilé, sans hiérarchie.
const RAR_SETS = {
  l: ["Aligot","Étoilé","Mérite une étoile","Kouign Amann","Thiep","Loc lac"],
  u: ["Xiao long bao","Hot pot","Mafé","Bibimbap","Onigiri","Vraie carbo","Paris Brest","Pancake japonais","Millefeuilles","Adresses cachées","Fromagerie","Empanadas","Tagine","Cannelés","Ourson","Confiserie"],
  r: ["Ramen","Bobun","Pho","Gyoza","Falafels","Naan","Pad thaï","Couscous","Flan","Éclairs","Cheese cake","Curry","Shawarma","Dumpling","Raviolis","Nouilles","Chocolaterie","Bar à cocktails","Institutions","Boui boui","Brasserie","Cuisine familiale","Primeur","Marchés","Tiramisu","Pâtes fraîches","Cordon bleu","Fondant au chocolat","Glacier","Crousty","Bistrot"]
};
const RAR = {}; ALL.forEach(c=>RAR[c]="c"); Object.entries(RAR_SETS).forEach(([k,a])=>a.forEach(c=>RAR[c]=k));
const RAR_NAME = {c:"Commune", r:"Rare", u:"Ultra rare", l:"Légendaire"};
const RAR_PTS = {c:10, r:20, u:50, l:100};
const RAR_HOW = {c:"Plus de 10 plaqués en France", r:"Entre 4 et 9 plaqués en France", u:"2 ou 3 plaqués en France", l:"Un seul plaqué, ou presque"};
const NEWCAT = 25, BOOSTER_BONUS = 150, REVISIT = 5;
const TYPO_G = ["linear-gradient(180deg,#FF99B3 0%,#FFB37A 55%,#FFCE18 100%)","linear-gradient(180deg,#6EA5FF 0%,#C9C7E6 50%,#FFCE18 100%)","linear-gradient(180deg,#EE0001 0%,#FF6A6A 45%,#FF99B3 100%)","linear-gradient(180deg,#FFD24A 0%,#FF8A1F 60%,#EE0001 100%)","linear-gradient(180deg,#00DEB5 0%,#9BE7D5 45%,#FFCE18 100%)","linear-gradient(180deg,#FFE27A 0%,#FF99B3 100%)"];

const LEVELS = [
  {n:1,t:"Petit creux",min:0,perks:["La map de tous les plaqués","Ta collec et ta sélection chaque lundi"]},
  {n:2,t:"Affamé",min:250,perks:["Tes premières récompenses LGU"]},
  {n:3,t:"Gourmand",min:700,perks:["Des avantages chez les plaqués"]},
  {n:4,t:"Fine gueule",min:1200,perks:["Des surprises réservées aux fines gueules","Les nouvelles plaques en avant-première"]},
  {n:5,t:"Épicurien",min:2000,perks:["Des expériences signées LGU"]},
  {n:6,t:"Ultime",min:3500,perks:["Les plus belles récompenses du Guide"]}
];

const CREATORS = [
  {h:"faimdeloup",n:"Lou",c:"#FF99B3",k:142},
  {h:"la.miette",n:"Miette",c:"#00DEB5",k:98},
  {h:"croc.et.tic",n:"Croc",c:"#6EA5FF",k:211},
  {h:"mamie.gourmande",n:"Mamie",c:"#FFCE18",k:64},
  {h:"street.goulue",n:"Goulue",c:"#FF7A1A",k:176},
  {h:"ventre.sur.pattes",n:"Ventre",c:"#FF6A6A",k:87}
];
const FRIENDS = [
  {n:"Marianne",c:"#FF99B3",k:31,w:5},{n:"Adélie",c:"#6EA5FF",k:18,w:2},{n:"Laura",c:"#00DEB5",k:24,w:2},{n:"Roch",c:"#FF7A1A",k:9,w:1},{n:"Maé",c:"#FFCE18",k:14,w:0}
];

const CITIES = {
  "Paris":[2.35,48.86],"Lyon":[4.83,45.76],"Marseille":[5.37,43.3],"Bordeaux":[-0.58,44.84],"Lille":[3.06,50.63],"Toulouse":[1.44,43.6],"Nantes":[-1.55,47.22],"Strasbourg":[7.75,48.58],"Rennes":[-1.68,48.11],"Nice":[7.26,43.7],"Laguiole":[2.85,44.68],"Biarritz":[-1.56,43.48],"Annecy":[6.13,45.9],"Montpellier":[3.88,43.61],"Ajaccio":[8.74,41.92]
};
const ISLES = ["La Réunion","Martinique","Guadeloupe"];

// [nom, catégorie, ville, quartier, x, y, prix, fermeture, créateurs, potes]
const P_RAW = [
 ["La Broche 96","Kebab","Paris","11e",.62,.42,"€","23h",[0,4],[0,1]],
 ["Chez Maé","Frites","Paris","10e",.52,.27,"€","22h",[4],[2]],
 ["Ohayo","Onigiri","Paris","2e",.33,.38,"€","19h",[1,2],[0]],
 ["Les raviolis de Mimi","Xiao long bao","Paris","13e",.45,.86,"€€","22h30",[2,5],[0,2]],
 ["Odette","Aligot","Paris","18e",.36,.09,"€€","23h",[3],[]],
 ["Kintsugi Ramen","Ramen","Paris","11e",.6,.55,"€€","23h",[0,1,2],[0,1,3]],
 ["Forno Ribelle","Pizza","Paris","11e",.68,.47,"€€","23h30",[4,5],[2]],
 ["Smash Brothers","Burger","Paris","3e",.47,.4,"€","23h",[4],[1]],
 ["Maki Moto","Sushi","Paris","9e",.3,.25,"€€€","22h30",[2],[]],
 ["Taqueria La Güera","Tacos","Paris","10e",.55,.2,"€","23h",[0],[2]],
 ["Le Sabre d'Or","French Tacos","Paris","20e",.86,.38,"€","2h",[4],[3]],
 ["Bánh Mì Cô Ba","Banh mi","Paris","13e",.48,.9,"€","20h",[1],[0]],
 ["Crispy Mama","Poulet frit","Paris","18e",.4,.04,"€","0h",[4],[1]],
 ["La Rôtisserie de Lucien","Poulet","Paris","15e",.12,.84,"€€","22h",[3],[]],
 ["Falafel Yallah","Falafels","Paris","4e",.44,.52,"€","23h",[0],[2]],
 ["Dolsot Club","Bibimbap","Paris","1er",.27,.47,"€€","22h30",[2],[0]],
 ["Petit Saïgon","Bobun","Paris","13e",.38,.92,"€","22h",[1],[]],
 ["Gyoza Bar Kiyo","Gyoza","Paris","2e",.36,.33,"€€","23h",[2],[0]],
 ["Mala Fire","Hot pot","Paris","13e",.52,.95,"€€","0h",[5],[1]],
 ["Chez Tata Awa","Mafé","Paris","18e",.3,.1,"€","22h",[3,4],[]],
 ["Naan Stop","Naan","Paris","10e",.5,.15,"€","23h",[4],[3]],
 ["Baan Kati","Pad thaï","Paris","11e",.66,.6,"€€","22h30",[0],[2]],
 ["Phở Bà Tư","Pho","Paris","13e",.43,.8,"€","21h30",[1,2],[0]],
 ["Guanciale","Vraie carbo","Paris","11e",.58,.36,"€€","23h",[5],[0,2]],
 ["Boulangerie Lumière","Flan","Paris","11e",.64,.38,"€","20h",[3],[1]],
 ["Dimanche Matin","Brunch","Paris","11e",.52,.5,"€€","16h",[1],[0,2]],
 ["Cookie Monstre","Cookie","Paris","11e",.7,.4,"€","20h",[1],[]],
 ["Au Levain du Faubourg","Croissant","Paris","11e",.74,.55,"€","19h30",[3],[0]],
 ["Le Zinc Fêlé","Bistrot","Paris","11e",.57,.62,"€€","0h",[5],[]],
 ["L'Alambic","Bar à cocktails","Paris","11e",.64,.32,"€€","2h",[],[3]],
 ["Chez Mounir","Couscous","Paris","20e",.9,.5,"€€","23h",[4],[]],
 ["Table Vingt-Trois","Étoilé","Paris","8e",.15,.26,"€€€€","22h",[2],[]],
 ["Grain de Folie","Coffeeshop","Paris","10e",.46,.26,"€","18h",[1],[2]],
 ["Le Toit d'Oberkampf","Avec vue","Paris","11e",.7,.3,"€€€","1h",[0],[]],
 ["Pâtisserie Clément","Paris Brest","Paris","7e",.15,.6,"€€","19h",[3],[]],
 ["Crousty Kingz","Crousty","Paris","19e",.74,.1,"€","0h",[4],[3]],
 ["Nonna Lina","Tiramisu","Paris","11e",.6,.66,"€€","22h",[5],[]],
 ["Beyrouth Express","Shawarma","Paris","10e",.56,.3,"€","1h",[4],[1]],
 ["Bouchon Gilberte","Bistrot","Lyon","2e",.5,.45,"€€","22h",[3],[]],
 ["Kazé Ramen","Ramen","Lyon","7e",.6,.62,"€€","22h30",[2],[]],
 ["Praline & Cie","Brioche","Lyon","1er",.42,.35,"€","19h",[3],[]],
 ["Le Mâchon d'Or","Cuisine locale","Lyon","5e",.32,.5,"€€","22h",[],[]],
 ["Mère Jeanne","Institutions","Lyon","6e",.62,.3,"€€€","22h",[2],[]],
 ["Chez Fifi","Pizza","Marseille","Vieux-Port",.45,.5,"€","23h",[4],[]],
 ["Le Panier Couscous","Couscous","Marseille","Le Panier",.38,.4,"€","22h",[4],[]],
 ["Kebab du Vieux-Port","Kebab","Marseille","Vieux-Port",.52,.56,"€","2h",[4],[]],
 ["Cabanon Bleu","Avec vue","Marseille","Malmousque",.3,.66,"€€€","23h",[0],[]],
 ["Cannelé Baron","Cannelés","Bordeaux","Saint-Pierre",.48,.45,"€","19h",[3],[]],
 ["Smash Garonne","Burger","Bordeaux","Chartrons",.55,.3,"€","23h",[4],[]],
 ["Marché des Chartrons","Marchés","Bordeaux","Chartrons",.6,.36,"€","14h",[],[]],
 ["Estaminet Chez Gus","Cuisine familiale","Lille","Vieux-Lille",.5,.42,"€€","22h",[3],[]],
 ["Friterie Jacqueline","Frites","Lille","Wazemmes",.4,.6,"€","23h",[4],[]],
 ["Gaufres Vlaamse","Goûter","Lille","Vieux-Lille",.56,.38,"€","19h",[1],[]],
 ["Boulangerie du Capitole","Pain au chocolat","Toulouse","Capitole",.5,.45,"€","19h",[3],[]],
 ["Taco Rosa","Tacos","Toulouse","Saint-Cyprien",.38,.55,"€","23h",[0],[]],
 ["Crêperie Belle-Île","Crêpes","Nantes","Bouffay",.5,.5,"€","22h",[3],[]],
 ["Comptoir Graslin","Comptoir","Nantes","Graslin",.4,.45,"€€","0h",[],[]],
 ["Winstub Haensel","Brasserie","Strasbourg","Petite France",.45,.5,"€€","23h",[3],[]],
 ["Ker Kouign","Kouign Amann","Rennes","Centre",.5,.5,"€","19h",[3],[]],
 ["Socca Nissa","Boui boui","Nice","Vieux-Nice",.5,.55,"€","21h",[0],[]],
 ["Glacier Riviera","Glacier","Nice","Port",.6,.6,"€","23h",[1],[]],
 ["Buron du Puech","Aligot","Laguiole","Aubrac",.5,.5,"€€","21h",[3],[]],
 ["Pintxos Gure","Planches","Biarritz","Halles",.5,.5,"€€","0h",[0],[]],
 ["Fromagerie des Aravis","Fromagerie","Annecy","Vieille ville",.5,.5,"€€","19h",[],[]],
 ["La Tielle de Lili","Qualité/prix","Montpellier","Écusson",.5,.5,"€","21h",[4],[]],
 ["U Fornu","Cuisine locale","Ajaccio","Vieille ville",.5,.5,"€€","22h",[],[]],
 ["Kaz Cari","Curry","La Réunion","Saint-Denis",.5,.5,"€","21h",[],[]],
 ["Accras Doudou","Boui boui","Martinique","Fort-de-France",.5,.5,"€","20h",[],[]],
 ["Bokit Kréyòl","Sandwich","Guadeloupe","Pointe-à-Pitre",.5,.5,"€","22h",[],[]]
];
const PLACES = P_RAW.map((r,i)=>({id:i,n:r[0],c:r[1],city:r[2],q:r[3],x:r[4],y:r[5],p:r[6],h:r[7],cr:r[8],fr:r[9]}));
const PL = id => PLACES[id];
const ME = {x:.56,y:.46};
const BOOSTER_IDS = [5,6,3]; // Kintsugi Ramen, Forno Ribelle, Les raviolis de Mimi

const MOTS = {
  "Ramen":"Un bouillon tonkotsu qui a mijoté 18 h, des nouilles maison, un œuf mariné parfait. On a fini le bol. Puis on a bu le fond.",
  "Kebab":"La broche tourne depuis 1996 et la pita sort du four sous tes yeux. Sauce blanche maison, frites coupées le matin. C'est karé.",
  "Frites":"Deux cuissons, graisse de bœuf, sel fumé. On est venus pour une barquette, on est repartis avec trois.",
  "Onigiri":"Riz japonais tiède, nori qui croustille encore, garnitures qui changent tous les jours. Le goûter le plus sous-coté de Paris.",
  "Xiao long bao":"Dix-huit plis à la main, un bouillon qui t'explose en bouche. Conseil de la rédac : petite cuillère obligatoire.",
  "Aligot":"Ça file sur un mètre, on a mesuré. Tome fraîche de l'Aubrac, beurre, ail. Un plat qui fait un câlin.",
  "Pizza":"Pâte qui lève 72 h, four à bois, mozza di bufala. La margherita à 9 € qui met tout le monde d'accord.",
  "Étoilé":"Une étoile, et pourtant le menu déj tient sous les 60 €. Du kebab à l'étoilé, on a dit.",
  "Flan":"Pâte feuilletée caramélisée, cœur tremblotant, vanille de Madagascar. On a fait la queue. On la refera."
};
const motFor = p => p.mot || MOTS[p.c] || `On est passés, on a goûté, on a tranché : ${title(p.c).toLowerCase()} ${p.city==="Paris"?"du "+p.q:"de "+p.city}. La rédac a validé, la plaque est sur la devanture.`;

const SETS = [
  {id:"kebab-etoile",t:"Du kebab à l'étoilé",c:["Kebab","Boui boui","Bistrot","Brasserie","Mérite une étoile","Étoilé"],r:"Badge signature + une récompense surprise"},
  {id:"asie",t:"Tour d'Asie",c:["Ramen","Pho","Bobun","Banh mi","Pad thaï","Gyoza","Xiao long bao","Bibimbap","Sushi","Onigiri","Hot pot"],r:"Sticker holo « Tour d'Asie » + une récompense surprise"},
  {id:"street",t:"Street-food",c:["Kebab","Burger","Frites","Tacos","French Tacos","Poulet frit","Crousty","Sandwich"],r:"Sticker holo « Street » + une récompense surprise"},
  {id:"sucre",t:"Bec sucré",c:["Flan","Cookie","Croissant","Pain au chocolat","Éclairs","Paris Brest","Cannelés","Kouign Amann"],r:"Sticker holo « Bec sucré » + une récompense surprise"},
  {id:"france",t:"Tour de France",c:["Aligot","Cannelés","Kouign Amann","Cuisine locale","Produits locaux","Marchés"],r:"Badge globe-trotteur + une récompense surprise"}
];

// ---------- ÉTAT ----------
const KEY = "lgu-app-v7";
function freshState(){
  const own = {};
  const seed = [[0,"2026-03-14"],[1,"2026-03-21"],[7,"2026-04-02"],[8,"2026-04-11"],[9,"2026-04-19"],[10,"2026-05-03"],[11,"2026-05-10"],[12,"2026-05-24"],[13,"2026-06-07"],[14,"2026-06-14"],[15,"2026-06-28"],[16,"2026-07-05"],[17,"2026-07-19"],[18,"2026-08-02"],[19,"2026-08-16"],[20,"2026-08-30"],[21,"2026-09-06"],[22,"2026-09-13"],[23,"2026-09-27"],[24,"2026-10-04"],[25,"2026-10-11"],[38,"2026-05-17"],[45,"2026-07-26"]];
  seed.forEach(([pid,d])=>{const c=PL(pid).c;(own[c]=own[c]||[]).push({p:pid,d});});
  return {v:7,cities:["Paris"],added:[],likes:[],rank:{Kebab:[0,45]},vote:null,storySeen:false,printed:seed.slice(0,15).map(x=>x[0]),album:true,onb:false,name:"Sam",city:"Paris",envies:[],recent:["ramen","pas cher"],follow:[0,2,4],pts:1960,own,saved:[2,4,31],
    booster:{opened:false,ids:BOOSTER_IDS.slice(),done:[]},react:{},order:null,sub:false,shipped:[],friendsFound:false,
    week:{sale:1,sucre:0,other:0,revisit:0,friends:0},streak:5};
}
let S;
try{ S = JSON.parse(localStorage.getItem(KEY)) || null; }catch(e){ S = null; }
if(!S || S.v!==7) S = freshState();
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }

const ownedCats = () => Object.keys(S.own).filter(c=>PLAQUE_ART[c]&&S.own[c].length);
const isOwnedCat = c => !!(S.own[c] && S.own[c].length);
const isOwnedPlace = id => Object.values(S.own).some(a=>a.some(x=>x.p===id));
const allCards = () => Object.entries(S.own).filter(([c])=>PLAQUE_ART[c]).flatMap(([c,a])=>a.map(x=>({c,...x}))).sort((a,b)=>b.d.localeCompare(a.d));
const lvlOf = pts => { let L=LEVELS[0]; LEVELS.forEach(l=>{ if(pts>=l.min) L=l; }); return L; };
const nextLvl = pts => LEVELS.find(l=>l.min>pts);

// ---------- HELPERS ----------
const $ = (s,el=document)=>el.querySelector(s);
const $$ = (s,el=document)=>[...el.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const icon = (id,cls="") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
const pad = n => String(n).padStart(2,"0");
const fmtN = n => n.toLocaleString("fr-FR");
const hash = s => [...s].reduce((a,ch)=>(a*31+ch.charCodeAt(0))>>>0,7);
let distM = p => p.city!=="Paris" ? null : Math.round(Math.hypot((p.x-ME.x)*1000,(p.y-ME.y)*1200)*4/10)*10;
const fmtD = m => m==null ? "" : m<1000 ? m+" m" : (m/1000).toFixed(1).replace(".",",")+" km";
const where = p => p.city==="Paris" ? "Paris "+p.q : p.city;
const fmtDate = d => new Date(d+"T12:00:00").toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"});
const today = () => "2026-10-21";
// photos de profil : celles des potes (démo) + la tienne (ajoutée depuis « Moi »)
const PH = {"Marianne":"ph_marianne","Adélie":"ph_adelie","Laura":"ph_laura","Roch":"ph_roch","Maé":"ph_mae","Manon":"ph_manon","Opa":"ph_opa"};
const photoOf = n => (n===S.name && S.photo) ? S.photo : (PH[n] && IMG[PH[n]]) || null;
const avBg = (n,c) => { const p=photoOf(n); return p?`background:${c} url(${p}) center/cover`:`background:${c}`; };
const avTxt = n => photoOf(n) ? "" : esc((n||"?")[0]);
const avatar = (n,c,cls="") => `<span class="avatar ${cls} ${photoOf(n)?"has-ph":""}" style="${avBg(n,c)}">${avTxt(n)}</span>`;
function rng(seed){ return function(){ seed|=0; seed=seed+0x6D2B79F5|0; let t=Math.imul(seed^seed>>>15,1|seed); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }

function toast(msg){ const t=$("#toast"); t.innerHTML=msg; t.classList.add("is-on"); clearTimeout(toast._t); toast._t=setTimeout(()=>t.classList.remove("is-on"),2600); }

// ---------- CARTE (la plaque) ----------
function cardHTML(c,o={}){
  const r = RAR[c]; const resto = o.resto || "";
  let art;
  if(PLAQUE_ART[c]) art = `<div class="card__art card__art--plaque" style="background-image:url(${IMG[PLAQUE_ART[c]]})"></div>${resto?`<div class="card__name"><span>${esc(resto.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[đĐ]/g,"d"))}</span></div>`:""}`;
  else if(ILL[c]) art = `<div class="card__art" style="background-image:url(${IMG[ILL[c]]})"></div>`;
  else art = `<div class="card__art" style="background:${TYPO_G[hash(c)%TYPO_G.length]}"></div><div class="card__typo"><span class="${c.length>10?"long":""}">${esc(c)}</span></div>${o.wip===false?"":`<div class="card__wip">ILLUS EN COURS</div>`}`;
  const top = PLAQUE_ART[c] ? "" : `<img class="card__badge" src="${IMG.badge}" alt=""><img class="card__wm" src="${IMG.wordmark}" alt="">`;
  const foot = PLAQUE_ART[c] ? "" : `<div class="card__foot"><div class="l"><span>Plaqué ultime</span><span>${esc(resto||"· · ·")}</span></div><div class="r"><b>${esc(title(c))}</b><span>Édition 2026/2027</span></div></div>`;
  const lock = o.locked ? `<div class="card__lock"><div class="stamp">${o.lockText||"À décrocher<small>sur place</small>"}</div></div>` : "";
  return `<div class="card r-${r} ${PLAQUE_ART[c]?"is-plq":""} ${o.locked?"is-locked":""} ${o.cls||""}" style="${o.style||""}" aria-label="Carte ${esc(title(c))}"><div class="card__in">${art}${top}${foot}<div class="card__holo"></div>${lock}</div></div>`;
}
const backHTML = () => `<div class="card-back"><img src="${IMG.badge}" alt=""></div>`;
const rarChip = c => `<span class="rar rar--${RAR[c]}">${RAR_NAME[RAR[c]]}</span>`;

// ---------- NAVIGATION ----------
let TAB = "map";
function go(tab){
  if(tab==="scan"){ openScan(); return; }
  TAB = tab;
  $$(".tab").forEach(t=>t.hidden = t.dataset.tab!==tab);
  $$("#nav [data-go]").forEach(b=>b.classList.toggle("is-on", b.dataset.go===tab));
  ({map:renderMap,collec:renderCollec,potes:renderPotes,moi:renderMoi})[tab]();
  const el = $("#t-"+tab); if(el) el.scrollTop = 0;
}
$("#nav").addEventListener("click",e=>{ const b=e.target.closest("[data-go]"); if(b){ closeAll(); go(b.dataset.go); }});

// overlays
const layers = () => $("#layers");
function pushLayer(html, cls="ov", opts={}){
  const d=document.createElement("div"); d.className=cls; d.innerHTML=html; layers().appendChild(d);
  if(opts.hideNav) $("#nav").classList.add("is-hidden");
  d._hideNav = !!opts.hideNav;
  return d;
}
function popLayer(d){
  if(!d || !d.parentNode) return;
  const inner = d.querySelector(".sheet,.full");
  if(inner){ inner.classList.add("is-out"); setTimeout(()=>{d.remove(); syncNav();},240); }
  else { d.remove(); syncNav(); }
}
function syncNav(){ const any=[...layers().children].some(x=>x._hideNav); $("#nav").classList.toggle("is-hidden",any); }
function closeAll(){ [...layers().children].forEach(d=>d.remove()); syncNav(); }
function sheet(html){
  const d = pushLayer(`<div class="ov__bg"></div><div class="sheet"><div class="sheet__grab"></div><button class="sheet__x" aria-label="Fermer">${icon("x")}</button><div class="sheet__body">${html}</div></div>`,"ov");
  d.querySelector(".ov__bg").onclick=()=>popLayer(d); d.querySelector(".sheet__x").onclick=()=>popLayer(d);
  return d;
}
function full(titleTxt, html, o={}){
  const d = pushLayer(`<div class="full ${o.cls||""}"><div class="full__bar"><button class="iconbtn" data-back aria-label="Retour">${icon("back")}</button><div class="t">${titleTxt}</div>${o.right||""}</div><div class="full__body">${html}</div>${o.after||""}</div>`,"ov",{hideNav:true});
  d.querySelector("[data-back]").onclick=()=>popLayer(d);
  return d;
}

// ---------- CONFETTI ----------
function confetti(n=140){
  const cv=$("#confetti"), app=$("#app"); const W=cv.width=app.clientWidth*2, H=cv.height=app.clientHeight*2; const ctx=cv.getContext("2d");
  const cols=["#FFCE18","#EE0001","#00DEB5","#FF99B3","#6EA5FF","#FFFFFF"];
  const ps=[...Array(n)].map(()=>({x:W/2+(Math.random()-.5)*W*.3,y:H*.38,vx:(Math.random()-.5)*26,vy:-Math.random()*30-8,s:Math.random()*14+8,r:Math.random()*6,vr:(Math.random()-.5)*.4,c:cols[Math.random()*cols.length|0],sh:Math.random()<.5}));
  let f=0; cancelAnimationFrame(confetti._r);
  (function step(){ ctx.clearRect(0,0,W,H); ps.forEach(p=>{p.vy+=1.1;p.vx*=.985;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle=p.c;ctx.strokeStyle="#111";ctx.lineWidth=3;if(p.sh){ctx.fillRect(-p.s/2,-p.s/3,p.s,p.s*.66);ctx.strokeRect(-p.s/2,-p.s/3,p.s,p.s*.66);}else{ctx.beginPath();ctx.arc(0,0,p.s/2.4,0,7);ctx.fill();ctx.stroke();}ctx.restore();});
    if(++f<170) confetti._r=requestAnimationFrame(step); else ctx.clearRect(0,0,W,H); })();
}

// =========================================================
// EXPLORER : carte de France + liste + recherche
// =========================================================
const M = {q:null, open:false, todo:false, price:[], creators:false, sel:null, cx:0, cy:0, s:40, rs:"peek", inited:false};
const PAN={moved:false};
const norm = s => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
const ASIA=["Ramen","Pho","Bobun","Banh mi","Pad thaï","Gyoza","Xiao long bao","Bibimbap","Sushi","Onigiri","Hot pot","Dumpling","Raviolis","Nouilles","Loc lac","Curry","Naan"];
const ENVIES=[
  {k:"asie",t:"Envie d'Asie",cats:ASIA,img:"c03",g:TYPO_G[2]},
  {k:"street",t:"Street-food",cats:["Kebab","Burger","Frites","Tacos","French Tacos","Poulet frit","Crousty","Sandwich","Shawarma","Falafels"],img:"c01",g:TYPO_G[3]},
  {k:"sucre",t:"Un truc sucré",cats:[...SECT.sucre,"Glacier","Chocolaterie","Confiserie","Goûter"],g:TYPO_G[0]},
  {k:"budget",t:"Petit budget",price:"€",img:"c02",g:TYPO_G[4]},
  {k:"brunch",t:"Brunch & café",cats:["Brunch","Coffeeshop","Café pas cher","Croissant","Goûter","Pain au chocolat"],g:TYPO_G[5]},
  {k:"occasion",t:"Grande occasion",cats:["Étoilé","Mérite une étoile","Avec vue","Bar à cocktails"],g:TYPO_G[1]}
];
const SYN={japonais:["Ramen","Sushi","Gyoza","Onigiri"],asiatique:ASIA,asie:ASIA,chinois:["Xiao long bao","Hot pot","Dumpling","Raviolis","Nouilles"],vietnamien:["Pho","Bobun","Banh mi"],coreen:["Bibimbap"],thai:["Pad thaï"],indien:["Naan","Curry"],italien:["Pizza","Vraie carbo","Pâtes fraîches","Tiramisu"],africain:["Mafé","Thiep"],libanais:["Shawarma","Falafels"],street:ENVIES[1].cats,sucre:ENVIES[2].cats,dessert:ENVIES[2].cats,patisserie:["Flan","Éclairs","Paris Brest","Millefeuilles","Cannelés","Tartes sucrées","Kouign Amann"],boulangerie:["Croissant","Pain au chocolat","Flan","Brioche","Chouquettes","Kouign Amann"],cafe:["Coffeeshop","Café pas cher","Brunch"],"petit dej":["Brunch","Croissant","Coffeeshop","Pain au chocolat"],vege:["Falafels","Healthy","Primeur"],veggie:["Falafels","Healthy","Primeur"],vegan:["Falafels","Healthy"],date:ENVIES[5].cats,romantique:ENVIES[5].cats,gastro:["Étoilé","Mérite une étoile"],etoile:["Étoilé","Mérite une étoile"],apero:["Apéro","Bar à cocktails","Planches"],boire:["Bar à cocktails","Apéro","Coffeeshop"],cocktail:["Bar à cocktails"],poulet:["Poulet","Poulet frit","Crousty"],fromage:["Fromagerie","Aligot"],soupe:["Ramen","Pho","Hot pot"],nouilles:["Ramen","Pho","Pad thaï","Nouilles"]};
// envies pour « On mange où ? » : plus de choix, toutes basées sur les catégories plaquées
const GENV=[
  {k:"asie",t:"🥢 Envie d'Asie",cats:ASIA},
  {k:"street",t:"🌯 Street-food",cats:["Kebab","Burger","Frites","Tacos","French Tacos","Poulet frit","Crousty","Sandwich","Shawarma","Falafels"]},
  {k:"burger",t:"🍔 Burger",cats:["Burger"]},
  {k:"pizza",t:"🍕 Pizza & pâtes",cats:["Pizza","Vraie carbo","Pâtes fraîches"]},
  {k:"soupe",t:"🍜 Nouilles & soupes",cats:["Ramen","Pho","Nouilles","Pad thaï","Hot pot","Bobun"]},
  {k:"japon",t:"🍣 Japonais",cats:["Ramen","Sushi","Gyoza","Onigiri"]},
  {k:"viet",t:"🇻🇳 Vietnamien",cats:["Pho","Bobun","Banh mi","Loc lac"]},
  {k:"chine",t:"🥟 Raviolis & dim sum",cats:["Xiao long bao","Dumpling","Raviolis","Gyoza","Hot pot"]},
  {k:"poulet",t:"🍗 Poulet",cats:["Poulet","Poulet frit","Crousty","Cordon bleu"]},
  {k:"orient",t:"🧆 Orient & Maghreb",cats:["Kebab","Shawarma","Falafels","Couscous","Tagine","Grillades"]},
  {k:"afrique",t:"🍛 Afrique",cats:["Mafé","Thiep","Couscous"]},
  {k:"indien",t:"🍛 Indien & curry",cats:["Curry","Naan"]},
  {k:"latino",t:"🌮 Latino",cats:["Tacos","French Tacos","Empanadas"]},
  {k:"leger",t:"🥗 Plutôt léger",cats:["Salade César","Bibimbap","Falafels","Pho","Sushi","Onigiri"]},
  {k:"reconfort",t:"🧀 Réconfort",cats:["Aligot","Croque","Cordon bleu","Quiche","Vraie carbo","Couscous","Mafé","Frites"]},
  {k:"partage",t:"🍢 À partager",cats:["Planches","Grillades","Hot pot","Empanadas","Gyoza"]},
  {k:"sandwich",t:"🥪 Sur le pouce",cats:["Sandwich","Banh mi","Croque","Kebab","Onigiri","Quiche"]}
];
const QUICK=["Burger","Ramen","Pizza","Kebab","Brunch","Sushi","Flan","Pho","Tacos","Coffeeshop"];

// --- géographie : chaque plaqué a des coordonnées réelles (approchées pour la démo) ---
const ISLE_LL = {"La Réunion":[55.53,-21.12],"Martinique":[-61.02,14.64],"Guadeloupe":[-61.55,16.25]};
PLACES.forEach(p=>{
  if(p.lon!=null) return;
  if(p.city==="Paris"){ p.lon=2.25+p.x*.2; p.lat=48.905-p.y*.095; }
  else { const c=CITIES[p.city]||ISLE_LL[p.city]; p.lon=c[0]+(p.x-.5)*.05; p.lat=c[1]-(p.y-.5)*.035; }
});
const ME_LL = {lon:2.25+ME.x*.2, lat:48.905-ME.y*.095};
const wx = lon => (lon+5.5)*68.8, wy = lat => (51.5-lat)*100;
PLACES.forEach(p=>{ p.wx=wx(p.lon); p.wy=wy(p.lat); });
const ME_W = {x:wx(ME_LL.lon), y:wy(ME_LL.lat)};
// distance réelle depuis toi (Paris 11e)
distM = p => { const dx=(p.lon-ME_LL.lon)*73000, dy=(p.lat-ME_LL.lat)*111000; return Math.round(Math.hypot(dx,dy)/10)*10; };

const isOpen = p => !["14h","16h","18h"].includes(p.h);
function matchesQ(p){ const q=M.q; if(!q) return true; if(q.ids && !q.ids.includes(p.id)) return false; if(q.cats && !q.cats.includes(p.c)) return false; if(q.price && p.p!==q.price) return false; return true; }
// pour l'instant : seuls les plaqués dont la catégorie a son illustration sont affichés
const hasArt = c => !!(ILL[c]||PLAQUE_ART[c]), shown = p => hasArt(p.c);
function passFilter(p){ return shown(p) && (!M.band||bandLiked(p.id)) && matchesQ(p) && (!M.open||isOpen(p)) && (!M.todo||!isOwnedPlace(p.id)) && (!M.price.length||M.price.includes(p.p)); }
const filtered = () => PLACES.filter(passFilter);
const placesIn = city => PLACES.filter(p=>p.city===city);

function searchAll(t){
  const q=norm(t.trim()); if(!q) return null;
  const cats=ALL.filter(hasArt).filter(c=>norm(c).includes(q)||norm(title(c)).includes(q));
  const syn=new Set(); Object.entries(SYN).forEach(([k,v])=>{ if(k.startsWith(q)||(q.length>3&&q.includes(k))) v.forEach(c=>syn.add(c)); });
  const price=/pas cher|budget|cheap|petit prix/.test(q);
  const places=PLACES.filter(shown).filter(p=>norm(p.n).includes(q)||norm(p.c).includes(q)||norm(title(p.c)).includes(q)||norm(p.q).includes(q)||norm(p.city).includes(q)||syn.has(p.c)||(price&&p.p==="€"));
  const cities=[...new Set(PLACES.filter(shown).map(p=>p.city))].filter(c=>norm(c).includes(q));
  return {cats:[...cats,...[...syn].filter(c=>hasArt(c)&&!cats.includes(c))],places,cities};
}
function applyQ(q){
  M.q=q; M.sel=null; M.rs="half";
  if(TAB!=="map") go("map"); else refreshMap();
  requestAnimationFrame(()=>fitTo(filtered()));
}

// --- vue : centre (cx,cy) en unités monde, échelle s = px écran par unité ---
const V = () => { const m=$("#map"); return {W:m.clientWidth,H:m.clientHeight}; };
const toS = (x,y) => { if(GL.on){ const p=GL.map.project(w2ll(x,y)); return [p.x,p.y]; } const {W,H}=V(); return [(x-M.cx)*M.s+W/2,(y-M.cy)*M.s+H/2]; };
const S_MIN=.28, S_MAX=260, S_CITY=9;
const TOPH=118;
function visY(){ const {H}=V(); return (TOPH + H - sheetPx())/2; }   // milieu de la zone visible
function setView(x,y,s,anim){
  if(GL.on){ GL.map[anim?"flyTo":"jumpTo"]({center:w2ll(x,y),zoom:Math.min(17,Math.max(3.5,s2z(s))),offset:glOff(),duration:anim?650:0,essential:true}); if(!anim){ glSync(); draw(); } return; }
  const {H}=V(); s=Math.min(S_MAX,Math.max(S_MIN,s)); const tcx=x, tcy=y-(visY()-H/2)/s;
  if(!anim){ M.cx=tcx; M.cy=tcy; M.s=s; draw(); return; }
  const a={cx:M.cx,cy:M.cy,ls:Math.log(M.s)}, b={cx:tcx,cy:tcy,ls:Math.log(s)}; const t0=performance.now(), D=520;
  cancelAnimationFrame(setView._r);
  (function step(t){ let k=Math.min(1,(t-t0)/D); k=1-Math.pow(1-k,3); M.cx=a.cx+(b.cx-a.cx)*k; M.cy=a.cy+(b.cy-a.cy)*k; M.s=Math.exp(a.ls+(b.ls-a.ls)*k); draw(true); if(k<1) setView._r=requestAnimationFrame(step); else draw(); })(t0);
}
function fitTo(L){
  if(!L.length) return;
  if(GL.on){ const lo=L.map(p=>p.lon), la=L.map(p=>p.lat); GL.map.fitBounds([[Math.min(...lo),Math.min(...la)],[Math.max(...lo),Math.max(...la)]],{padding:{top:TOPH+50,bottom:sheetPx()+50,left:46,right:76},maxZoom:15.5,duration:650}); return; }
  const xs=L.map(p=>p.wx), ys=L.map(p=>p.wy); const {W,H}=V(); const vh=H-TOPH-sheetPx()-20;
  const bw=Math.max(...xs)-Math.min(...xs), bh=Math.max(...ys)-Math.min(...ys);
  const s=Math.min(60,(W-90)/Math.max(bw,.4),vh/Math.max(bh,.4));
  setView((Math.max(...xs)+Math.min(...xs))/2,(Math.max(...ys)+Math.min(...ys))/2,s*.9,true);
}
function franceView(anim){ if(GL.on){ GL.map.fitBounds([[-4.9,41.3],[9.6,51.1]],{padding:{top:TOPH+10,bottom:sheetPx()+10,left:12,right:60},duration:anim?650:0}); return; } const {W,H}=V(); const vh=H-TOPH-sheetPx(); setView(wx(2.4),wy(46.6),Math.min((W-30)/950,vh/1000),anim); }
function zoomAt(f,sx,sy){ if(GL.on){ GL.map.easeTo({zoom:GL.map.getZoom()+Math.log2(f),around:GL.map.unproject([sx,sy]),duration:280}); return; } const {W,H}=V(); const ns=Math.min(S_MAX,Math.max(S_MIN,M.s*f)); const x=(sx-W/2)/M.s+M.cx, y=(sy-H/2)/M.s+M.cy; M.s=ns; M.cx=x-(sx-W/2)/ns; M.cy=y-(sy-H/2)/ns; draw(); }

// --- fond de carte (vectoriel, sobre) ---
const FR_OUT=[[2.55,51.08],[1.85,50.95],[1.6,50.7],[1.55,50.2],[1.08,49.93],[.1,49.5],[-.3,49.33],[-1.1,49.4],[-1.27,49.7],[-1.94,49.72],[-1.6,49.2],[-1.55,48.65],[-2,48.65],[-2.8,48.5],[-3.5,48.83],[-4.3,48.68],[-4.78,48.4],[-4.3,48.1],[-4.7,47.95],[-4.2,47.8],[-3.4,47.7],[-2.7,47.5],[-2.2,47.25],[-2.1,46.8],[-1.8,46.5],[-1.2,46.2],[-1.25,45.7],[-1.15,45.2],[-1.25,44.6],[-1.35,44],[-1.5,43.4],[-1.75,43.35],[-.7,42.9],[.7,42.8],[1.45,42.6],[2.2,42.4],[3.17,42.45],[3.05,43],[3.5,43.3],[4.2,43.45],[4.85,43.35],[5.4,43.2],[6,43.1],[6.7,43.4],[7.25,43.7],[7.5,43.78],[7.65,44.15],[6.9,44.4],[7,45.1],[6.8,45.8],[6.85,46.4],[6.1,46.25],[6.15,46.6],[6.9,47.4],[7.6,47.6],[7.55,48.1],[8.2,48.95],[7.3,49.15],[6.7,49.2],[6.1,49.5],[5.5,49.5],[4.85,50.15],[4.2,49.95],[3.7,50.35],[3.1,50.78]];
const FR_CO=[[9.4,43],[9.55,42.6],[9.4,41.7],[9.2,41.37],[8.8,41.6],[8.6,42],[8.7,42.6],[9.35,43]];
const pts = a => a.map(([lo,la])=>wx(lo).toFixed(2)+","+wy(la).toFixed(2)).join(" ");
const ell = (lo,la,rx,ry,rot=0) => `<ellipse cx="${wx(lo)}" cy="${wy(la)}" rx="${rx*68.8}" ry="${ry*100}" transform="rotate(${rot} ${wx(lo)} ${wy(la)})"/>`;
const SEINE=[[2.2,48.83],[2.24,48.84],[2.27,48.85],[2.29,48.858],[2.31,48.864],[2.33,48.86],[2.35,48.854],[2.37,48.846],[2.39,48.836],[2.42,48.82]];
const RHONE=[[4.83,45.82],[4.84,45.78],[4.845,45.755],[4.84,45.73],[4.82,45.7]];
const GARONNE=[[-0.6,44.89],[-0.555,44.86],[-0.56,44.84],[-0.55,44.82]];
const line = a => `<polyline points="${pts(a)}"/>`;
const BASE = `<rect x="-3000" y="-3000" width="12000" height="12000" class="sea"/>
<g class="land"><polygon points="${pts(FR_OUT)}"/><polygon points="${pts(FR_CO)}"/>${ell(55.53,-21.12,.27,.2)}${ell(-61.02,14.64,.09,.2,-30)}${ell(-61.6,16.2,.12,.1)}${ell(-61.4,16.32,.1,.1)}</g>
<g class="river">${line(SEINE)}${line(RHONE)}${line(GARONNE)}</g>
<ellipse class="periph" cx="${wx(2.343)}" cy="${wy(48.858)}" rx="${.105*68.8}" ry="${.047*100}"/>`;
const ARR=[["1er",.27,.52],["2e",.34,.3],["3e",.47,.35],["4e",.45,.58],["8e",.12,.32],["7e",.13,.66],["9e",.3,.19],["10e",.5,.21],["11e",.66,.52],["12e",.7,.78],["13e",.44,.76],["15e",.1,.88],["18e",.34,.02],["19e",.74,.17],["20e",.88,.44]].map(([l,x,y])=>({l,x:wx(2.25+x*.2),y:wy(48.905-y*.095)}));
const CITY_W = Object.entries({...CITIES,...ISLE_LL}).map(([n,[lo,la]])=>({n,x:wx(lo),y:wy(la)}));

// --- rendu ---
function draw(fast){
  const svg=$("#msvg"), ov=$("#mov"); if(!svg) return;
  const {W,H}=V();
  svg.setAttribute("viewBox",`${M.cx-W/2/M.s} ${M.cy-H/2/M.s} ${W/M.s} ${H/M.s}`);
  $("#map").dataset.z = M.s<S_CITY ? "country" : M.s<60 ? "city" : "street";
  const L=filtered(); let h="";
  const inView=(x,y,m=40)=>x>-m&&x<W+m&&y>-m&&y<H+m;
  if(M.s<S_CITY){
    // vue France : une bulle par ville, nom + nombre
    const by={}; L.forEach(p=>{ (by[p.city]=by[p.city]||[]).push(p); });
    const placed=[];
    Object.entries(by).sort((u,v)=>v[1].length-u[1].length).forEach(([c,a])=>{ const cw=CITY_W.find(z=>z.n===c); const [x,y]=toS(cw.x,cw.y); if(!inView(x,y,80)) return;
      const w=c.length*7.5+44; const hit=placed.some(r=>Math.abs(r.x-x)<(r.w+w)/2+4&&Math.abs(r.y-y)<30); const small=hit; placed.push({x,y,w:small?32:w});
      h+=`<button class="cb ${c==="Paris"?"is-me":""} ${small?"is-small":""}" data-cityz="${esc(c)}" style="left:${x}px;top:${y}px" aria-label="${esc(c)}, ${a.length} adresses"><b>${a.length}</b>${small?"":`<span>${esc(c)}</span>`}</button>`; });
  } else {
    // vue ville : épingles regroupées si elles se chevauchent
    const cell=GL.on?84:76, grid={}; const items=[];
    L.forEach(p=>{ const [x,y]=toS(p.wx,p.wy); if(!inView(x,y)) return; if(p.id===M.sel){ items.push({one:p,x,y,sel:true}); return; } const k=Math.floor(x/cell)+":"+Math.floor(y/cell); (grid[k]=grid[k]||[]).push({p,x,y}); });
    // fusionne les groupes trop proches (évite les pastilles qui se chevauchent)
    const gs=Object.values(grid).map(g=>({m:g,x:g.reduce((a,o)=>a+o.x,0)/g.length,y:g.reduce((a,o)=>a+o.y,0)/g.length}));
    for(let i=0;i<gs.length;i++) for(let j=i+1;j<gs.length;j++){ const A=gs[i],B=gs[j]; if(!B.m.length||!A.m.length) continue; if(Math.abs(A.x-B.x)<74&&Math.abs(A.y-B.y)<46){ A.m=A.m.concat(B.m); B.m=[]; A.x=A.m.reduce((a,o)=>a+o.x,0)/A.m.length; A.y=A.m.reduce((a,o)=>a+o.y,0)/A.m.length; j=i; } }
    Object.keys(grid).forEach(k=>delete grid[k]); gs.filter(g=>g.m.length).forEach((g,i)=>grid[i]=g.m);
    Object.values(grid).forEach(g=>{ if(g.length===1) items.push({one:g[0].p,x:g[0].x,y:g[0].y}); else items.push({many:g.map(o=>o.p),x:g.reduce((a,o)=>a+o.x,0)/g.length,y:g.reduce((a,o)=>a+o.y,0)/g.length}); });
    // repères lisibles : étiquette « illustration + nom + catégorie » quand il y a la place, sinon pastille ronde
    const {W:VW,H:VH}=V(), week=new Set(S.booster.ids||[]); const placed=[{x:-99,y:-99,w:VW+200,h:TOPH+6},{x:VW-64,y:TOPH,w:80,h:300},{x:-99,y:VH-sheetPx()-4,w:VW+200,h:999}];
    const fits=(x,y,w,hh)=>x>4&&x+w<VW-4&&!placed.some(r=>x<r.x+r.w+6&&x+w>r.x-6&&y<r.y+r.h+6&&y+hh>r.y-6);
    const prio=it=>it.sel?-1e9:(it.many?-1e8:0)+(it.one&&week.has(it.one.id)?-1e6:0)+Math.hypot(it.x-VW/2,it.y-visY());
    items.sort((a,b)=>prio(a)-prio(b));
    const out=[];
    items.forEach(it=>{
      if(it.many){ const g=it.many; const ills=[...new Set(g.map(p=>ILL[p.c]||PLAQUE_ART[p.c]).filter(Boolean))].slice(0,2); const w=36+ills.length*17+String(g.length).length*10; placed.push({x:it.x-w/2,y:it.y-19,w,h:38});
        out.push({z:1,h:`<button class="cl2" data-cl="${g.map(p=>p.id).join(",")}" style="left:${it.x}px;top:${it.y}px" aria-label="${g.length} adresses, zoomer"><span class="cl2__st">${(ills.length?ills:["badge"]).map(k=>`<i style="background-image:url(${IMG[k]})"></i>`).join("")}</span><b>${g.length}</b></button>`}); return; }
      const p=it.one, own=isOwnedPlace(p.id), ill=ILL[p.c]||PLAQUE_ART[p.c], wk=week.has(p.id)&&!own;
      const nm=p.n.length>22?p.n.slice(0,21)+"…":p.n, sub=`${p.c} · ${p.p}`;
      const w=Math.min(190,52+Math.max(nm.length*6.9,sub.length*5.8)), hh=44;
      if(!it.sel && it.y<TOPH+10) return;
      const bx=Math.max(8,Math.min(VW-8-w,it.x-w/2)), sh=Math.round(bx+w/2-it.x);
      const full = it.sel || (Math.abs(sh)<w/2-22 && fits(bx,it.y-hh-8,w,hh));
      const art=`<span class="mk__c" style="${ill?`background-image:url(${IMG[ill]})`:""}">${ill?"":`<img src="${IMG.badge}" alt="">`}${own?`<span class="mk__ck">${icon("check")}</span>`:""}</span>`;
      if(full){ placed.push({x:bx,y:it.y-hh-8,w,h:hh});
        out.push({z:it.sel?3:2,h:`<button class="mk ${it.sel?"is-sel":""} ${wk?"is-week":""} ${own?"is-own":""}" data-pid="${p.id}" aria-label="${esc(p.n)}, ${esc(p.c)}" style="left:${it.x}px;top:${it.y}px;--sh:${it.sel?0:sh}px">${wk?`<em class="mk__tag">Pour toi</em>`:""}<span class="mk__b">${art}<span class="mk__t"><b>${esc(nm)}</b><small>${esc(sub)}</small></span></span><i class="mk__dot"></i></button>`}); }
      else out.push({z:0,h:`<button class="mk mk--mini ${wk?"is-week":""}" data-pid="${p.id}" style="left:${it.x}px;top:${it.y}px" aria-label="${esc(p.n)}, ${esc(p.c)}"><span class="mk__b">${art}</span><i class="mk__dot"></i></button>`});
    });
    out.sort((a,b)=>a.z-b.z).forEach(o=>h+=o.h);
    if(GL.on){} else if(M.s>=40){ ARR.forEach(a=>{ const [x,y]=toS(a.x,a.y); if(inView(x,y)) h+=`<span class="arr" style="left:${x}px;top:${y}px">${a.l}</span>`; }); }
    else CITY_W.forEach(c=>{ const [x,y]=toS(c.x,c.y); if(inView(x,y)) h+=`<span class="cname" style="left:${x}px;top:${y-34}px">${esc(c.n)}</span>`; });
  }
  const [mx,my]=toS(ME_W.x,ME_W.y); if(M.s>=S_CITY&&inView(mx,my)) h+=`<span class="me" style="left:${mx}px;top:${my}px"></span>`;
  ov.innerHTML=h;
  if(!fast){ clearTimeout(draw._t); draw._t=setTimeout(drawSheet,60); }
}

// --- liste du bas ---
function areaName(){
  if(M.s<S_CITY) return "Toute la France";
  let best=null,bd=1e9; CITY_W.forEach(c=>{ const d=Math.hypot(c.x-M.cx,c.y-M.cy); if(d<bd){bd=d;best=c;} });
  if(best && best.n==="Paris" && Math.hypot(ME_W.x-M.cx,ME_W.y-M.cy)<4 && M.s>40) return "Autour de toi";
  return bd<25 ? best.n : "Dans cette zone";
}
function inViewList(){
  const L=filtered(); if(M.s<S_CITY) return L;
  const {W,H}=V(); return L.filter(p=>{ const [x,y]=toS(p.wx,p.wy); return x>0&&x<W&&y>TOPH-20&&y<H-sheetPx()+30; });
}
function rowHTML(p,rank){
  const own=isOwnedPlace(p.id), dm=distM(p);
  return `<button class="rr" data-open="${p.id}">${rank?`<span class="rr__rk">${rank}</span>`:""}${cardHTML(p.c,{resto:p.n})}<div class="grow"><div class="rr__t">${esc(p.n)}</div><div class="rr__s">${esc(title(p.c))}</div><div class="rr__m"><span>${dm<5000?fmtD(dm):esc(where(p))}</span>${isOpen(p)?`<span class="open">Ouvert</span>`:`<span>Fermé</span>`}<span>${esc(p.p)}</span>${own?`<span class="tag tag--own">✓ Dans ta collec</span>`:`<span class="tag tag--pts">+${RAR_PTS[RAR[p.c]]} pts</span>`}</div></div></button>`;
}
function drawSheet(){
  const t=$("#rst"), b=$("#rsb"); if(!t) return;
  if(M.sel!=null){
    const p=PL(M.sel), own=isOwnedPlace(p.id);
    t.innerHTML=`<b>${esc(p.n)}</b><span>${fmtD(distM(p)).toUpperCase()}</span>`;
    b.innerHTML=`<div class="pv">${cardHTML(p.c,{resto:p.n})}<div class="grow"><div class="place__cat">${esc(title(p.c))}</div><div class="rr__m" style="margin-top:6px"><span class="open">Ouvert jusqu'à ${esc(p.h)}</span><span>${esc(p.p)}</span><span>${esc(where(p))}</span></div><div style="margin-top:9px">${own?`<span class="tag tag--own">✓ Dans ta collec</span>`:`<span class="tag tag--pts">Carte à décrocher · +${RAR_PTS[RAR[p.c]]} pts</span>`}</div></div></div>
      <div class="pv__btns"><button class="btn btn--white" data-route>${icon("route")} Y aller</button><button class="btn" data-open="${p.id}">Voir la fiche</button></div>`;
    return;
  }
  const L=inViewList().sort((a,c)=>Math.hypot(a.wx-M.cx,a.wy-M.cy)-Math.hypot(c.wx-M.cx,c.wy-M.cy));
  const name = M.q ? M.q.label : areaName();
  t.innerHTML=`<b>${esc(name)}</b><span>${L.length} ADRESSE${L.length>1?"S":""}${M.q?" · "+esc(areaName().toUpperCase()):""}</span>`;
  let h="";
  if(!M.q && !M.todo && !M.open && !M.price.length && name==="Autour de toi"){
    const ids=S.booster.ids, done=ids.filter(isOwnedPlace).length;
    h+=`<button class="week" data-week><span class="stk">${ids.map((id,i)=>cardHTML(PL(id).c,{resto:PL(id).n,style:`left:${i*14}px;transform:rotate(${(i-1)*9}deg)`})).join("")}</span><span class="grow"><b>Ta sélection de la semaine · ${done}/3</b><span>3 adresses choisies pour toi. Les 3 avant dimanche : +${BOOSTER_BONUS} pts.</span></span></button>`;
  }
  if(!L.length) h+=`<div class="empty-r"><p class="sub">Rien dans cette zone${M.q?" pour "+esc(M.q.label):""}.</p><div class="recent">${filtered().length?`<button class="chip" data-fitall>Voir les ${filtered().length} en France</button>`:""}${M.q||M.open||M.todo||M.price.length?`<button class="chip" data-reset>Tout effacer</button>`:""}</div></div>`;
  if(M.q&&M.q.ranked){ const ids=M.q.ids; b.innerHTML = h + filtered().sort((a,c)=>ids.indexOf(a.id)-ids.indexOf(c.id)).map(p=>rowHTML(p,ids.indexOf(p.id)+1)).join(""); return; }
  b.innerHTML = h + L.slice(0,40).map(p=>rowHTML(p)).join("");
}

// --- bottom sheet ---
function sheetH(st){ const H=$("#t-map").clientHeight; const top=parseInt(getComputedStyle($("#app")).getPropertyValue("--top"))||12; return {peek:214, sel:300, half:Math.round(H*.52), full:H-top-66}[st]; }
function setSheet(st,instant){ M.rs=st; const rs=$("#rs"); if(!rs) return; if(instant) rs.classList.add("is-drag"); rs.style.setProperty("--rsh",sheetH(st)+"px"); if(instant) requestAnimationFrame(()=>requestAnimationFrame(()=>rs.classList.remove("is-drag"))); }
const sheetPx = () => { const r=$("#rs"); if(!r) return 214; return Math.min(sheetH(M.rs), sheetH("half")); };
function setupSheet(){
  const rs=$("#rs"), h=$("#rsh"); let y0=0,h0=0,mv=false,down=false;
  h.onpointerdown=e=>{ down=true; mv=false; y0=e.clientY; h0=rs.offsetHeight; try{h.setPointerCapture(e.pointerId);}catch(_){} rs.classList.add("is-drag"); };
  h.onpointermove=e=>{ if(!down) return; const dy=y0-e.clientY; if(Math.abs(dy)>5) mv=true; rs.style.setProperty("--rsh",Math.max(150,Math.min(sheetH("full"),h0+dy))+"px"); };
  h.onpointerup=h.onpointercancel=()=>{ if(!down) return; down=false; rs.classList.remove("is-drag");
    const base=M.sel!=null?"sel":"peek";
    if(!mv){ setSheet({peek:"half",sel:"half",half:"full",full:base}[M.rs]); return; }
    const opts=[base,"half","full"]; const cur=rs.offsetHeight; let i=Math.max(0,opts.indexOf(M.rs));
    if(Math.abs(cur-h0)>40) i=Math.max(0,Math.min(2,i+(cur>h0?1:-1)));
    setSheet(opts[i]); };
  h.onclick=e=>e.stopPropagation();
}

// --- gestes ---
function setupPan(){
  const map=$("#map"); const pts=new Map(); let start=null, moved=false, pinch=null;
  map.onpointerdown=e=>{ cancelAnimationFrame(setView._r); pts.set(e.pointerId,{x:e.clientX,y:e.clientY}); moved=false; start={x:e.clientX,y:e.clientY,cx:M.cx,cy:M.cy}; if(pts.size===2){ const [a,b]=[...pts.values()]; pinch={d:Math.hypot(a.x-b.x,a.y-b.y)||1,s:M.s}; } };
  window.onpointermove=e=>{ if(!pts.has(e.pointerId)) return; pts.set(e.pointerId,{x:e.clientX,y:e.clientY}); const r=map.getBoundingClientRect();
    if(pts.size===2&&pinch){ const [a,b]=[...pts.values()]; const d=Math.hypot(a.x-b.x,a.y-b.y); zoomAt(pinch.s*d/pinch.d/M.s,(a.x+b.x)/2-r.left,(a.y+b.y)/2-r.top); moved=true; return; }
    const dx=e.clientX-start.x, dy=e.clientY-start.y; if(Math.abs(dx)+Math.abs(dy)>6) moved=true; if(moved){ M.cx=start.cx-dx/M.s; M.cy=start.cy-dy/M.s; draw(true); } };
  window.onpointerup=window.onpointercancel=e=>{ if(!pts.has(e.pointerId)) return; pts.delete(e.pointerId); if(pts.size<2) pinch=null; if(pts.size===1){ const v=[...pts.values()][0]; start={x:v.x,y:v.y,cx:M.cx,cy:M.cy}; } if(!pts.size&&moved) draw(); PAN.moved=moved; setTimeout(()=>PAN.moved=false,40); };
  map.onwheel=e=>{ e.preventDefault(); const r=map.getBoundingClientRect(); zoomAt(e.deltaY<0?1.15:1/1.15,e.clientX-r.left,e.clientY-r.top); };
  map.ondblclick=e=>{ const r=map.getBoundingClientRect(); zoomAt(2,e.clientX-r.left,e.clientY-r.top); };
}

// ---------- VRAIE CARTE (MapLibre + OpenFreeMap) : rues, noms, précision. Repli sur la carte dessinée si indisponible ----------
const GL={map:null,on:false,tried:false,wrap:null};
const z2s = z => 0.02067*Math.pow(2,z), s2z = s => Math.log2(s/0.02067);
const w2ll = (x,y) => [x/68.8-5.5, 51.5-y/100];
const GL_OK = location.protocol.startsWith("http") && !/claude|anthropic/.test(location.hostname);
function glPad(){ return {top:TOPH+8,bottom:sheetPx()+8,left:8,right:62}; }
function glOff(){ return [-27,Math.round((TOPH-sheetPx())/2)]; }
function glSync(){ const m=GL.map, cc=m.getCenter(); M.cx=wx(cc.lng); M.cy=wy(cc.lat); M.s=z2s(m.getZoom()); }
function initGL(){
  if(GL.tried||!GL_OK) return; GL.tried=true;
  const css=document.createElement("link"); css.rel="stylesheet"; css.href="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css"; document.head.appendChild(css);
  const s=document.createElement("script"); s.src="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js";
  s.onload=()=>{ try{ startGL(); }catch(e){ GL.on=false; } };
  document.head.appendChild(s);
}
function startGL(){
  const wrap=document.createElement("div"); wrap.id="glwrap"; GL.wrap=wrap;
  const host=$("#map"); if(!host) return; host.insertBefore(wrap,host.querySelector(".mgrain"));
  const c=w2ll(M.cx,M.cy);
  const map=new maplibregl.Map({container:wrap,style:"https://tiles.openfreemap.org/styles/positron",center:[ME_LL.lon,ME_LL.lat],zoom:14,attributionControl:false,dragRotate:false,pitchWithRotate:false,touchPitch:false,maxZoom:18,minZoom:3.5,fadeDuration:0});
  map.touchZoomRotate.disableRotation(); map.keyboard.disableRotation();
  GL.map=map; let loaded=false;
  const fail=()=>{ if(loaded) return; try{ map.remove(); }catch(e){} wrap.remove(); GL.map=null; GL.on=false; };
  setTimeout(fail,9000);
  map.on("error",()=>{ if(!loaded) fail(); });
  map.on("load",()=>{
    loaded=true; styleLGU(map); GL.on=true;
    const m=$("#map"); if(m){ m.onpointerdown=null; m.onwheel=null; m.ondblclick=null; m.classList.add("is-gl"); } window.onpointermove=null;
    map.jumpTo({center:[ME_LL.lon,ME_LL.lat],zoom:12.5,offset:glOff()}); glSync();
    map.on("move",()=>{ glSync(); draw(true); });
    map.on("moveend",()=>{ draw(); setTimeout(()=>PAN.moved=false,80); });
    map.on("dragstart",()=>{ PAN.moved=true; });
    map.on("zoomstart",()=>{ PAN.moved=true; });
    draw();
  });
}
function styleLGU(m){
  const set=(id,p,v)=>{ try{ m.setPaintProperty(id,p,v); }catch(e){} };
  const lay=(id,p,v)=>{ try{ m.setLayoutProperty(id,p,v); }catch(e){} };
  m.getStyle().layers.forEach(l=>{ const id=l.id;
    if(l.type==="background") set(id,"background-color","#FFF3D2");
    else if(l.type==="fill"){
      if(/water/.test(id)) set(id,"fill-color","#A8CBFF");
      else if(/park|wood|grass|landcover/.test(id)) set(id,"fill-color","#C9EBC0");
      else if(/building/.test(id)){ set(id,"fill-color","#F7E4B5"); set(id,"fill-outline-color","#E9CD8C"); }
      else if(/residential|landuse/.test(id)) set(id,"fill-color","#FFEDC2");
      else if(/aeroway|pier/.test(id)) set(id,"fill-color","#F1E2BD");
    } else if(l.type==="line"){
      if(/water/.test(id)) set(id,"line-color","#A8CBFF");
      else if(/casing/.test(id)) set(id,"line-color","#E2BE73");
      else if(/highway|road|motorway|tunnel|bridge|path|aeroway/.test(id)) set(id,"line-color","#FFFFFF");
      else if(/rail/.test(id)) set(id,"line-color","#D3BE93");
      else if(/boundary/.test(id)) set(id,"line-color","#B99456");
    } else if(l.type==="symbol"){
      set(id,"text-color",/water/.test(id)?"#2F63B8":"#2A1D0C"); set(id,"text-halo-color","#FFF6DF"); set(id,"text-halo-width",1.6);
      if(/shield/.test(id)) lay(id,"visibility","none");
    }
  });
  // routes un peu plus épaisses pour la lisibilité
  ["highway_minor","highway_major_inner","highway_major_casing"].forEach(id=>{ try{ const w=m.getPaintProperty(id,"line-width"); if(typeof w==="number") set(id,"line-width",w*1.4); }catch(e){} });
}

function renderMap(){
  const t=$("#t-map");
  t.innerHTML=`<div class="map" id="map"><svg id="msvg" class="msvg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${BASE}</svg><div class="mgrain"></div><div class="mov" id="mov"></div><span class="osm">© OpenStreetMap · OpenFreeMap</span></div>
  <div class="topbar">
    <div class="sbar">${icon("search")}<button class="sbar__q ${M.q?"is-set":""}" data-search>${M.q?esc(M.q.label):"Un plat, un resto, une ville…"}</button>${M.q?`<button class="sbar__x" data-clear aria-label="Effacer la recherche">${icon("x")}</button>`:""}</div>
    <div class="qrow" id="qrow"></div>
  </div>
  <div class="mctrl"><div class="zoom"><button data-zin aria-label="Zoomer">+</button><button data-zout aria-label="Dézoomer">−</button></div><button class="fab" data-loc aria-label="Me recentrer">${icon("locate")}</button><button class="fab" data-fr aria-label="Voir toute la France">${icon("france")}</button></div>
  <div class="rs" id="rs"><button class="rs__h" id="rsh" aria-label="Agrandir la liste"><div class="rs__grab"></div><div class="rs__t" id="rst"></div></button><div class="rs__body" id="rsb"></div></div>`;
  drawQrow(); setupSheet(); setSheet(M.rs,true);
  if(GL.wrap&&GL.map){ const m=$("#map"); m.classList.add("is-gl"); m.insertBefore(GL.wrap,m.querySelector(".mgrain")); GL.map.resize(); draw(); }
  else { setupPan(); if(!M.inited){ M.inited=true; setView(ME_W.x,ME_W.y,50,false); } else draw(); initGL(); }
  t.onclick=mapClick;
}
function refreshMap(){ if(!$("#msvg")) return renderMap(); drawQrow(); const b=$(".sbar__q"); if(b){ b.textContent=M.q?M.q.label:"Un plat, un resto, une ville…"; b.classList.toggle("is-set",!!M.q); const x=$(".sbar__x"); if(!M.q&&x) x.remove(); if(M.q&&!x) b.insertAdjacentHTML("afterend",`<button class="sbar__x" data-clear aria-label="Effacer la recherche">${icon("x")}</button>`); } setSheet(M.rs); draw(); }
function drawQrow(){
  const nf=(M.open?1:0)+(M.todo?1:0)+(M.price.length?1:0)+(M.creators?1:0);
  const sm = id => icon(id).replace("<svg",'<svg style="width:14px;height:14px"');
  $("#qrow").innerHTML=`<button class="qc ring ${S.storySeen?"is-seen":""}" data-stories><i><img src="${IMG.badge}" alt=""></i>La rédac</button><button class="qc plain qc--red" data-group>${sm("user")} On mange où ?</button><button class="qc plain ${M.band?"is-on":""}" data-band>Validé par ta bande</button><button class="qc plain ${nf?"is-on":""}" data-filters>${sm("filter")} Filtres${nf?` <span class="n">${nf}</span>`:""}</button><button class="qc plain ${M.open?"is-on":""}" data-topen>Ouvert</button>${QUICK.map(c=>{const on=M.q&&M.q.cats&&M.q.cats.length===1&&M.q.cats[0]===c; return `<button class="qc ${on?"is-on":""}" data-qc="${esc(c)}"><i style="${ILL[c]?`background-image:url(${IMG[ILL[c]]})`:`background:${TYPO_G[hash(c)%TYPO_G.length]}`}"></i>${esc(c)}</button>`;}).join("")}`;
}
function selectPlace(id){
  const p=PL(id); M.sel=id; if(TAB!=="map") go("map");
  setSheet("sel"); setView(p.wx,p.wy,Math.max(M.s,GL.on?z2s(14.6):60),true); $("#rsb").scrollTop=0;
}
function mapClick(e){
  const b=e.target.closest("button");
  if(!b){ if(e.target.closest("#map") && !PAN.moved){ if(M.sel!=null){ M.sel=null; setSheet("peek"); draw(); } else if(M.rs!=="peek"){ setSheet("peek"); } } return; }
  const {W,H}=V();
  if(b.dataset.pid!==undefined){ if(!PAN.moved) selectPlace(+b.dataset.pid); return; }
  if(b.dataset.cl){ if(PAN.moved) return; fitTo(b.dataset.cl.split(",").map(Number).map(PL)); return; }
  if(b.dataset.cityz){ if(PAN.moved) return; fitTo(filtered().filter(p=>p.city===b.dataset.cityz)); return; }
  if(b.dataset.open!==undefined){ openPlace(+b.dataset.open); return; }
  if(b.hasAttribute("data-search")){ openSearch(); return; }
  if(b.hasAttribute("data-stories")){ openStories(0); return; }
  if(b.hasAttribute("data-group")){ openGroup(); return; }
  if(b.hasAttribute("data-band")){ M.band=!M.band; M.sel=null; refreshMap(); if(M.band) toast("Les adresses que ta bande a aimées"); return; }
  if(b.hasAttribute("data-clear")||b.hasAttribute("data-reset")){ M.q=null; M.sel=null; M.open=M.todo=false; M.price=[]; M.rs="peek"; refreshMap(); return; }
  if(b.hasAttribute("data-fitall")){ fitTo(filtered()); return; }
  if(b.hasAttribute("data-me")){ openProfile(); return; }
  if(b.hasAttribute("data-zin")){ zoomAt(2,W/2,visY()); return; }
  if(b.hasAttribute("data-zout")){ zoomAt(.5,W/2,visY()); return; }
  if(b.hasAttribute("data-loc")){ M.sel=null; setSheet("peek"); setView(ME_W.x,ME_W.y,Math.max(M.s,GL.on?z2s(12.5):50),true); return; }
  if(b.hasAttribute("data-fr")){ M.sel=null; setSheet("peek"); franceView(true); return; }
  if(b.hasAttribute("data-filters")){ openFilters(); return; }
  if(b.hasAttribute("data-topen")){ M.open=!M.open; M.sel=null; refreshMap(); return; }
  if(b.dataset.qc){ const c=b.dataset.qc; const on=M.q&&M.q.cats&&M.q.cats.length===1&&M.q.cats[0]===c; if(on){ M.q=null; M.rs="peek"; refreshMap(); } else applyQ({label:c,cats:[c]}); return; }
  if(b.hasAttribute("data-week")){ applyQ({label:"Ta sélection de la semaine",ids:S.booster.ids.slice()}); return; }
  if(b.hasAttribute("data-route")){ toast("Dans l'appli, ça ouvre ton GPS préféré"); return; }
}

function openFilters(){
  const d=sheet(`<div class="h2">Filtres</div>
   <button class="toggle" data-t="open"><span class="grow"><b>Ouvert maintenant</b><span>Cache ce qui est fermé.</span></span><span class="sw ${M.open?"is-on":""}"></span></button>
   <button class="toggle" data-t="todo"><span class="grow"><b>Pas encore testé</b><span>Seulement les adresses dont t'as pas la carte.</span></span><span class="sw ${M.todo?"is-on":""}"></span></button>
   <div class="blk"><div class="blk__h"><b style="font-size:17px">Budget</b></div><div style="display:flex;gap:8px">${["€","€€","€€€","€€€€"].map(x=>`<button class="chip ${M.price.includes(x)?"is-on":""}" data-pr="${x}">${x}</button>`).join("")}</div></div>
   <div style="display:flex;gap:10px"><button class="btn btn--white" style="flex:1" data-fx>Effacer</button><button class="btn btn--black" style="flex:1.7" data-fok>Voir</button></div>`);
  const upd=()=>{ const n=filtered().length; d.querySelector("[data-fok]").textContent=`Voir ${n} adresse${n>1?"s":""}`; };
  upd();
  d.querySelector(".sheet__body").onclick=e=>{ const b=e.target.closest("button"); if(!b) return;
    if(b.dataset.t){ M[b.dataset.t]=!M[b.dataset.t]; b.querySelector(".sw").classList.toggle("is-on",M[b.dataset.t]); }
    if(b.dataset.pr){ const x=b.dataset.pr,i=M.price.indexOf(x); if(i>=0) M.price.splice(i,1); else M.price.push(x); b.classList.toggle("is-on"); }
    if(b.hasAttribute("data-fx")){ M.open=M.todo=false; M.price=[]; $$(".sw",d).forEach(s=>s.classList.remove("is-on")); $$("[data-pr]",d).forEach(s=>s.classList.remove("is-on")); }
    if(b.hasAttribute("data-fok")){ popLayer(d); M.sel=null; refreshMap(); return; }
    upd(); };
}
function goCity(c){ M.sel=null; M.rs="peek"; if(TAB!=="map") go("map"); setSheet("peek"); if(c==="France") franceView(true); else if(c==="me") setView(ME_W.x,ME_W.y,GL.on?z2s(12.5):50,true); else fitTo(placesIn(c)); }

// --- écran de recherche ---
function addRecent(t){ t=(t||"").trim(); if(!t) return; S.recent=[t,...(S.recent||[]).filter(x=>x!==t)].slice(0,6); save(); }
function openSearch(){
  const d=pushLayer(`<div class="srch"><div class="srch__bar"><button class="iconbtn" data-back aria-label="Retour">${icon("back")}</button><label class="srch__f">${icon("search")}<input id="q" placeholder="Un plat, un resto, une ville…" autocomplete="off" enterkeyhint="search" value="${M.q&&M.q.text?esc(M.q.text):""}"><button class="sbar__x" data-qx aria-label="Effacer" hidden>${icon("x")}</button></label></div><div class="srch__body" id="sb"></div></div>`,"ov",{hideNav:true});
  const q=d.querySelector("#q"), sb=d.querySelector("#sb"), qx=d.querySelector("[data-qx]");
  let tab="sale"; const counts={}; PLACES.filter(shown).forEach(p=>counts[p.c]=(counts[p.c]||0)+1);
  const byCity={}; PLACES.filter(shown).forEach(p=>byCity[p.city]=(byCity[p.city]||0)+1);
  const tile=c=>{ const ill=ILL[c]||PLAQUE_ART[c], n=counts[c]||0; return ill?`<button class="ct ${n?"":"is-zero"}" data-cat="${esc(c)}" style="background-image:url(${IMG[ill]})">${n?`<em>${n}</em>`:""}<span>${esc(c)}</span></button>`:`<button class="ct typo ${n?"":"is-zero"}" data-cat="${esc(c)}" style="background:${TYPO_G[hash(c)%TYPO_G.length]}">${n?`<em>${n}</em>`:""}<b>${esc(c)}</b></button>`; };
  const hl=(s,v)=>{ const i=norm(s).indexOf(norm(v.trim())); const L=v.trim().length; return (i<0||!L)?esc(s):esc(s.slice(0,i))+"<mark>"+esc(s.slice(i,i+L))+"</mark>"+esc(s.slice(i+L)); };
  let R=null;
  const draw2=()=>{ const v=q.value; qx.hidden=!v; R=searchAll(v);
    if(!R){ sb.innerHTML=`
      ${(S.recent||[]).length?`<div class="blk"><div class="blk__h"><b>Récentes</b><button class="skip" data-clr>Effacer</button></div><div class="recent">${S.recent.map(r=>`<button class="chip" data-recent="${esc(r)}">${icon("clock")}${esc(r)}</button>`).join("")}</div></div>`:""}
      <div class="blk"><div class="blk__h"><b>T'as envie de quoi ?</b></div><div class="env6">${ENVIES.filter(e=>!e.cats||e.cats.some(hasArt)).map(e=>`<button class="env" data-env="${e.k}" style="background:${e.g}">${e.img?`<i style="background-image:url(${IMG[e.img]})"></i>`:""}<b>${esc(e.t)}</b></button>`).join("")}</div></div>
      <div class="blk"><div class="blk__h"><b>Les listes des créateurs</b><span>SUIS CEUX QUI SAVENT</span></div>${creatorListsHTML()}</div>
      <div class="blk"><div class="blk__h"><b>Aller à…</b><span>${PLACES.filter(shown).length} ADRESSES EN FRANCE</span></div><div class="recent"><button class="chip is-on" data-go="me">${icon("locate")} Autour de moi</button><button class="chip" data-go="France">Toute la France</button>${Object.entries(byCity).filter(([c])=>c!=="Paris").sort((a,b)=>b[1]-a[1]).map(([c,n])=>`<button class="chip" data-go="${esc(c)}">${esc(c)} · ${n}</button>`).join("")}</div></div>
      <div class="blk"><div class="blk__h"><b>Les ${ALL.filter(hasArt).length} catégories</b><span>DU KEBAB À L'ÉTOILÉ</span></div><div class="seg">${Object.keys(SECT).filter(k=>SECT[k].some(hasArt)).map(k=>`<button class="${tab===k?"is-on":""}" data-tab="${k}">${SECT_NAME[k]} · ${SECT[k].filter(hasArt).length}</button>`).join("")}</div><div class="cg">${SECT[tab].filter(hasArt).map(tile).join("")}</div></div>`; return; }
    sb.innerHTML=`
      ${R.cities.length?`<div class="blk"><div class="blk__h"><b>Villes</b></div><div class="hits">${R.cities.map(c=>`<button class="hit" data-go="${esc(c)}"><span class="ic">${icon("map")}</span><span class="grow"><b>${hl(c,v)}</b><small>${byCity[c]} adresses</small></span></button>`).join("")}</div></div>`:""}
      ${R.cats.length?`<div class="blk"><div class="blk__h"><b>Catégories</b></div><div class="recent">${R.cats.slice(0,12).map(c=>`<button class="qc" data-cat="${esc(c)}"><i style="${ILL[c]?`background-image:url(${IMG[ILL[c]]})`:`background:${TYPO_G[hash(c)%TYPO_G.length]}`}"></i>${hl(c,v)} <span style="font:800 13px var(--f-cond);opacity:.5">${counts[c]||0}</span></button>`).join("")}</div></div>`:""}
      <div class="blk"><div class="blk__h"><b>Adresses</b><span>${R.places.length} RÉSULTAT${R.places.length>1?"S":""}</span></div>${R.places.length?`<div class="hits">${R.places.slice(0,12).map(p=>{const ill=ILL[p.c]||PLAQUE_ART[p.c];return `<button class="hit" data-place="${p.id}"><span class="ic" style="${ill?`background-image:url(${IMG[ill]})`:""}">${ill?"":icon("map")}</span><span class="grow"><b>${hl(p.n,v)}</b><small>${esc(title(p.c))} · ${esc(where(p))} · ${fmtD(distM(p))}</small></span>${isOwnedPlace(p.id)?`<span class="tag tag--own">✓</span>`:""}</button>`;}).join("")}</div>`:`<p class="sub">Rien pour « ${esc(v)} ». Essaie un plat (ramen, flan…), une envie (japonais, pas cher, date…), un quartier (11e) ou une ville.</p>`}</div>
      ${R.places.length?`<button class="btn btn--black btn--block seeall" data-all>Voir les ${R.places.length} sur la carte</button>`:""}`; };
  draw2(); q.oninput=draw2; setTimeout(()=>{ try{q.focus();}catch(_){} },250);
  const done=qq=>{ popLayer(d); applyQ(qq); };
  const freeText=()=>{ const v=q.value.trim(); if(!R||!R.places.length) return; addRecent(v); done({label:`« ${v} »`,ids:R.places.map(p=>p.id),text:v}); };
  q.onkeydown=e=>{ if(e.key==="Enter") freeText(); };
  d.onclick=e=>{ const b=e.target.closest("button"); if(!b) return;
    if(b.hasAttribute("data-back")) popLayer(d);
    else if(b.hasAttribute("data-qx")){ q.value=""; draw2(); q.focus(); }
    else if(b.dataset.tab){ tab=b.dataset.tab; draw2(); }
    else if(b.dataset.cat){ const c=b.dataset.cat; addRecent(c); done({label:c,cats:[c]}); }
    else if(b.dataset.env){ const en=ENVIES.find(x=>x.k===b.dataset.env); done({label:en.t,cats:en.cats||null,price:en.price||null}); }
    else if(b.dataset.recent){ q.value=b.dataset.recent; draw2(); }
    else if(b.dataset.clist){ popLayer(d); applyCreatorList(+b.dataset.clist); }
    else if(b.hasAttribute("data-clr")){ S.recent=[]; save(); draw2(); }
    else if(b.dataset.go){ popLayer(d); M.q=null; if(TAB!=="map") go("map"); else refreshMap(); goCity(b.dataset.go); }
    else if(b.dataset.place){ addRecent(q.value); popLayer(d); M.q=null; if(TAB!=="map") go("map"); else refreshMap(); selectPlace(+b.dataset.place); }
    else if(b.hasAttribute("data-all")) freeText(); };
}

// ---------- FICHE LIEU ----------
function openPlace(id){
  const p=PL(id); const own=isOwnedPlace(id); const d0=distM(p); const L=lvlOf(S.pts);
  const saved=S.saved.includes(id);
  const friends=p.fr.map(i=>FRIENDS[i]);
  const perkOk=L.n>=3;
  const html=`
    <div class="place__hero">${cardHTML(p.c,{resto:p.n,locked:!own})}
      <div class="grow" style="padding-bottom:6px"><div class="place__cat">${esc(title(p.c))}</div><h2 class="place__name">${esc(p.n)}</h2><div class="row" style="flex-wrap:wrap;gap:6px">${rarChip(p.c)}<span class="eyebrow">N°${pad(NUM[p.c])}/93</span></div></div></div>
    <div class="facts"><div class="fact"><span class="eyebrow">${d0<3000?"À pied":"Distance"}</span><b>${d0<3000?Math.max(1,Math.round(d0/80))+" min":fmtD(d0)}</b></div><div class="fact"><span class="eyebrow">Ouvert</span><b class="ok">Jusqu'à ${esc(p.h)}</b></div><div class="fact"><span class="eyebrow">Budget</span><b>${esc(p.p)}</b></div></div>
    ${own?`<div class="perk" style="background:var(--cyan);color:var(--noir)">${icon("check")}<div><b style="color:var(--noir)">Carte décrochée le ${fmtDate(S.own[p.c].find(x=>x.p===id).d)}</b><br><span style="font:600 italic 13px var(--f-title)">Reviens quand tu veux : +${REVISIT} pts à chaque visite.</span></div></div>`
          :`<div class="perk">${icon("nfc")}<div><b>Carte à décrocher ici</b><br><span style="font:600 italic 13px var(--f-title)">Scanne la plaque au moment de payer : +${RAR_PTS[RAR[p.c]]} pts${isOwnedCat(p.c)?"":` et +${NEWCAT} nouvelle catégorie`}.</span></div></div>`}
    <div class="quote"><span class="sig">la rédac</span><span class="eyebrow">Pourquoi on l'a plaqué</span><p>${esc(motFor(p))}</p></div>
    <div class="perk" data-rw style="cursor:pointer">${icon("gift")}<div><b>Récompenses LGU</b><br><span style="font:600 italic 13px var(--f-title)">Ça arrive. Plus tu collectionnes, plus tu débloques. Voir mes récompenses →</span></div></div>
    ${bandNotesHTML(id)}
    ${p.cr.length?`<div style="display:flex;flex-direction:column;gap:8px"><div class="sect__h"><span class="h3">Vu chez</span><span class="eyebrow muted">bonus créateurs</span></div><div class="creators">${p.cr.map(i=>{const c=CREATORS[i];return `<button class="cr" data-creator="${i}">${avatar(c.n,c.c)}@${esc(c.h)}<span class="pl">${icon("play")}</span></button>`;}).join("")}</div></div>`:""}
    <div class="actions"><button class="act" data-route>${icon("route")}Y aller</button><button class="act" data-save>${icon(saved?"bookmark-f":"bookmark")}${saved?"Sauvé":"À tester"}</button><button class="act" data-share>${icon("share")}Partager</button></div>
    ${!own?`<button class="btn btn--red btn--block" data-scanhere>${icon("nfc")} J'y suis, je scanne</button>`:`<button class="btn btn--white btn--block" data-viewcard>Voir ma carte</button>`}
    <p class="note" style="text-align:center;margin:0">${esc(where(p))} · adresse d'exemple pour le prototype</p>`;
  const d=sheet(html);
  d.querySelector(".sheet__body").onclick=e=>{
    if(e.target.closest("[data-rw]")){ openRewards(); return; }
    const b=e.target.closest("button"); if(!b) return;
    if(b.hasAttribute("data-save")){ const i=S.saved.indexOf(id); if(i>=0) S.saved.splice(i,1); else S.saved.push(id); save(); b.innerHTML=icon(i>=0?"bookmark":"bookmark-f")+(i>=0?"À tester":"Sauvé"); toast(i>=0?"Retiré de « À tester »":"Ajouté à ta liste « À tester »"); }
    if(b.hasAttribute("data-route")) toast("Dans l'appli, ça ouvre ton GPS préféré");
    if(b.hasAttribute("data-share")) toast("Lien copié : envoie-le à ta bande");
    if(b.hasAttribute("data-scanhere")){ popLayer(d); openScan(id); }
    if(b.hasAttribute("data-viewcard")){ popLayer(d); openViewer(p.c, id); }
    if(b.hasAttribute("data-pass")) openPass(LEVELS[2].perks[0]);
    if(b.dataset.creator) openCreator(+b.dataset.creator);
    if(b.dataset.friend){ popLayer(d); openFriend(+b.dataset.friend); }
  };
}
function openCreator(i){
  const c=CREATORS[i]; const pl=PLACES.filter(p=>p.cr.includes(i));
  const fol=S.follow.includes(i);
  const d=sheet(`<div class="row"><span class="avatar" style="width:60px;height:60px;font-size:24px;background:${c.c}">${esc(c.n[0])}</span><div class="grow"><div class="h2">@${esc(c.h)}</div><div class="sub">${c.k} adresses référencées par LGU · ${pl.length} plaquées</div></div></div>
  <button class="btn ${fol?"btn--white":""} btn--block" data-fol>${fol?"Suivi":"Suivre ses adresses"}</button>
  <div class="eyebrow">Ses adresses plaquées</div><div class="list">${pl.map(p=>`<button class="li" data-place="${p.id}"><span class="ic" style="background:var(--jaune)">${icon("play")}</span><span class="grow">${esc(p.n)}<small>${esc(title(p.c))} · voir sa vidéo</small></span></button>`).join("")}</div>
  <p class="note">Créateur fictif pour le prototype. Dans l'appli : LGU relie les @ et les vidéos source à chaque adresse.</p>`);
  d.querySelector(".sheet__body").onclick=e=>{ const b=e.target.closest("button"); if(!b) return;
    if(b.hasAttribute("data-fol")){ const k=S.follow.indexOf(i); if(k>=0) S.follow.splice(k,1); else S.follow.push(i); save(); b.textContent=k>=0?"Suivre ses adresses":"Suivi"; b.classList.toggle("btn--white",k<0); }
    if(b.dataset.place){ popLayer(d); openPlace(+b.dataset.place); } };
}
function openWhere(cat){
  const pl=PLACES.filter(p=>p.c===cat);
  const d=sheet(`<div class="row" style="align-items:flex-end;gap:14px">${cardHTML(cat,{locked:true,style:"width:96px;transform:rotate(-4deg)"})}<div class="grow"><span class="eyebrow">N°${pad(NUM[cat])}/93 · ${SECT_NAME[SECT_OF[cat]]}</span><div class="h2" style="margin:4px 0 6px">${esc(title(cat))}</div>${rarChip(cat)}</div></div>
  <div class="sub">${pl.length?`Pour décrocher cette carte, passe chez ${pl.length>1?"l'un de ces plaqués":"ce plaqué"} :`:`Pas encore de plaqué dans cette catégorie. La cuvée 2026/2027 se remplit chaque mois.`}</div>
  ${pl.length?`<div class="list">${pl.map(p=>`<button class="li" data-place="${p.id}"><span class="ic" style="background:var(--jaune)">${icon("map")}</span><span class="grow">${esc(p.n)}<small>${esc(where(p))}${distM(p)!=null?" · "+fmtD(distM(p)):""}</small></span>${icon("back","chev")}</button>`).join("")}</div>`:""}
  <button class="toggle" data-alert><span class="grow"><b>Préviens-moi</b><span>Dès qu'un plaqué ${esc(cat)} ouvre près de chez toi.</span></span><span class="sw"></span></button>`);
  d.querySelector(".sheet__body").onclick=e=>{ const b=e.target.closest("button"); if(!b) return; if(b.dataset.place){ popLayer(d); openPlace(+b.dataset.place); } if(b.hasAttribute("data-alert")){ const s=b.querySelector(".sw"); s.classList.toggle("is-on"); toast(s.classList.contains("is-on")?"Alerte activée":"Alerte coupée"); } };
}

// =========================================================
// SCAN NFC
// =========================================================
function scanCandidates(){
  const notOwned=PLACES.filter(p=>shown(p)&&p.city==="Paris"&&!isOwnedPlace(p.id)).sort((a,b)=>distM(a)-distM(b));
  const boost=S.booster.ids.filter(id=>!isOwnedPlace(id)).map(PL);
  const rest=notOwned.filter(p=>!S.booster.ids.includes(p.id));
  return [...boost,...rest.slice(0,10),PL(0)];
}
function openScan(preset){
  closeAll();
  const C=scanCandidates(); if(preset!=null && !C.some(p=>p.id===preset)) C.unshift(PL(preset)); const def = preset!=null ? preset : C[0].id;
  const opts=C.map(p=>`<option value="${p.id}" ${p.id===def?"selected":""}>${esc(p.n)} · ${esc(p.c)}${isOwnedPlace(p.id)?" (déjà dans ta collec)":""}</option>`).join("");
  const d=pushLayer(`<div class="scan" id="scan">
    <div class="full__bar"><button class="iconbtn" data-x aria-label="Fermer" style="background:#222;color:#fff;border-color:#444;box-shadow:none">${icon("x")}</button><div class="t"></div><span class="eyebrow" style="color:var(--cyan)">NFC prêt</span></div>
    <div class="scan__body">
      <div class="nfc"><span class="nfc__r"></span><span class="nfc__r"></span><span class="nfc__r"></span><div class="nfc__plaque">${cardHTML(PL(def).c,{resto:PL(def).n})}</div><div class="nfc__phone"></div></div>
      <h2 class="scan__t">Approche ton tel<br>de la plaque</h2>
      <p class="scan__p">Elle est près de la caisse. Au moment de payer, colle le haut de ton téléphone dessus. Clac, la carte est à toi.</p>
    </div>
    <div class="scan__foot">
      <div class="demo-pick"><span class="eyebrow">Démo · tu es chez</span><select id="scanPick" aria-label="Plaqué où tu te trouves">${opts}</select></div>
      <button class="btn btn--block" data-sim>${icon("nfc")} Simuler le scan</button>
      <button class="btn btn--ghost" style="color:#B9AC94" data-noplaque>Pas de plaque en vue ?</button>
    </div></div>`,"ov",{hideNav:true});
  const sel=d.querySelector("#scanPick");
  sel.onchange=()=>{ const p=PL(+sel.value); d.querySelector(".nfc__plaque").innerHTML=cardHTML(p.c,{resto:p.n}); };
  d.onclick=e=>{ const b=e.target.closest("button"); if(!b) return;
    if(b.hasAttribute("data-x")) popLayer(d);
    if(b.hasAttribute("data-noplaque")) toast("Demande-la au comptoir, sinon on prend le relais avec ta géoloc");
    if(b.hasAttribute("data-sim")){ const s=d.querySelector("#scan"); s.classList.add("is-hit"); b.disabled=true; b.innerHTML="Plaque détectée…"; if(navigator.vibrate) try{navigator.vibrate([30,40,60]);}catch(_){}
      setTimeout(()=>{ popLayer(d); doScan(+sel.value); },900); } };
}
function doScan(id){
  const p=PL(id); const r=RAR[p.c]; const before=S.pts; const lvBefore=lvlOf(before);
  const rows=[]; const already=isOwnedPlace(id); const newCat=!isOwnedCat(p.c);
  if(already){ rows.push(["Revisite d'un plaqué",REVISIT]); S.week.revisit++; }
  else{
    rows.push(["Check-in "+RAR_NAME[r].toLowerCase(),RAR_PTS[r]]);
    if(newCat) rows.push(["Nouvelle catégorie",NEWCAT]);
    (S.own[p.c]=S.own[p.c]||[]).push({p:id,d:today()});
    S.week[SECT_OF[p.c]==="sucre"?"sucre":"sale"]++;
    if(p.city!=="Paris"||!["11e"].includes(p.q)) S.week.other++;
    if(S.booster.ids.includes(id)&&!S.booster.done.includes(id)){ S.booster.done.push(id); rows.push([`Booster ${S.booster.done.length}/3`,0]); if(S.booster.done.length===3) rows.push(["Booster complété",BOOSTER_BONUS]); }
  }
  const gain=rows.reduce((a,x)=>a+x[1],0); S.pts+=gain; save();
  const lvAfter=lvlOf(S.pts); const n=ownedCats().length;
  const d=pushLayer(`<div class="scan"><div class="reveal">
    <div class="reveal__burst"></div>
    <span class="reveal__kicker">Plaque détectée · ${esc(p.n)}</span>
    <h2 class="reveal__t">${already?"Te revoilà !":newCat?"Carte<br>décrochée !":"Encore une !"}</h2>
    <div class="flip is-back" id="rflip"><div class="flip__in">${cardHTML(p.c,{resto:p.n,cls:"is-live"})}${backHTML()}</div></div>
    <div class="row" style="position:relative;gap:8px">${rarChip(p.c)}<span class="eyebrow" style="color:#D9CDB6">${newCat?`Catégorie ${n}/${Object.keys(CAT_VIS).length}`:already?"Déjà dans ta collec":`Carte x${S.own[p.c].length}`}</span></div>
    <div class="tally">${rows.map((x,i)=>`<div class="tally__r" style="animation-delay:${1.1+i*.28}s"><span>${esc(x[0])}</span><b>${x[1]?"+"+x[1]:"✓"}</b></div>`).join("")}<div class="tally__r tally__tot" style="animation-delay:${1.2+rows.length*.28}s"><span>Total</span><b>+${gain} pts</b></div></div>
    ${!already?`<p class="note" style="color:#B9AC94;text-align:center;margin:0;position:relative">Imprime-la en sticker pour ton album quand tu veux.</p>`:""}
    <div style="display:flex;width:100%;position:relative"><button class="btn btn--block" data-next>${already?"Continuer":"Continuer · ton avis"}</button></div>
  </div></div>`,"ov",{hideNav:true});
  setTimeout(()=>{ d.querySelector("#rflip").classList.remove("is-back"); confetti(already?60:170); },420);
  d.onclick=e=>{ const b=e.target.closest("button"); if(!b) return;
    if(b.dataset.react){ $$("[data-react]",d).forEach(x=>x.classList.toggle("is-on",x===b)); S.react[id]=b.dataset.react; save(); toast(b.dataset.react==="Bof"?"Noté. La rédac lit tout, promis.":"Noté, ça compte pour ta compatibilité avec tes potes"); }
    if(b.hasAttribute("data-story")) openStory(p.c,p);
    if(b.hasAttribute("data-next")){ popLayer(d); const fin=()=>{ go(TAB); }; if(already) fin(); else afterScan(id,fin); } };
  setTimeout(rerender,100);
}
function levelUp(L){
  const d=pushLayer(`<div class="lu"><div class="reveal__burst" style="top:30%"></div><span class="reveal__kicker">Niveau débloqué</span><div class="lu__n">${L.n}</div><h2 class="lu__t">${esc(L.t)}</h2><p class="scan__p" style="position:relative">Ce que ça débloque ? Surprise. C'est encore au four.</p><button class="btn btn--block" data-ok style="position:relative">Let's gooooo</button><button class="btn btn--ghost btn--block" data-rw style="position:relative;color:var(--jaune)">Voir mes récompenses</button></div>`,"ov",{hideNav:true});
  confetti(220);
  d.querySelector("[data-ok]").onclick=()=>{ popLayer(d); go(TAB); };
  d.querySelector("[data-rw]").onclick=()=>{ popLayer(d); openRewards(); };
}
function storyLine(c){ const t=title(c); const m=t.match(/^(Meilleures?|Meilleurs?)\s/); if(!m) return `J'ai décroché<br>« ${esc(t)} »`; const art={"Meilleur":"le","Meilleure":"la","Meilleurs":"les","Meilleures":"les"}[m[1]]; return `J'ai décroché<br>${art} ${esc(t.toLowerCase())}`; }
function openStory(c,p){
  const n=ownedCats().length;
  const d=sheet(`<div class="story"><div class="k">${storyLine(c)}</div>${cardHTML(c,{resto:p?p.n:""})}<div class="f"><img src="${IMG.wordmark}" alt="Le Guide Ultime"><span>${n}/93</span></div></div>
  <button class="btn btn--block" data-sh>${icon("share")} Partager en story</button><p class="note" style="text-align:center;margin:0">Format 9:16 prêt pour Insta et TikTok, avec ton @ et le lien vers la fiche du plaqué.</p>`);
  d.querySelector("[data-sh]").onclick=()=>{ toast("Dans l'appli, ça ouvre Insta direct 📲"); popLayer(d); };
}

// =========================================================
// COLLEC
// =========================================================
const C = {view:"cards", f:"all"};
function renderCollec(){
  const t=$("#t-collec"); const n=ownedCats().length; const cards=allCards(); const todo=cards.filter(x=>!isPrinted(x.p)).length;
  const secs=Object.entries(SECT).map(([k,a])=>({k,a,got:a.filter(isOwnedCat).length}));
  const fan=cards.slice(0,3).map(x=>cardHTML(x.c,{resto:PL(x.p).n})).join("");
  t.innerHTML=`
  <header class="hero hero--feu grain"><div class="fan">${fan}</div>
    <div class="row" style="justify-content:space-between;position:relative;z-index:3"><span class="ed">Ma collec' · 2026/2027</span></div>
    <div class="count"><span class="count__n">${cards.length}</span><span class="count__d">cartes</span></div>
    <div class="count__s" style="margin-top:8px;max-width:20ch">${Math.max(0,PLACES.filter(p=>PLAQUE_ART[p.c]).length-cards.length)} autres à décrocher en France.</div>
    <div class="bar bar--y" style="margin-top:16px;max-width:60%"><i style="width:${n/Object.keys(CAT_VIS).length*100}%"></i></div>
    <div class="eyebrow" style="margin-top:8px">${n}/${Object.keys(CAT_VIS).length} catégories touchées</div>
  </header>
  <button class="albumcta" data-album><div class="albumcta__mock">${miniBook()}</div><div class="grow"><b>Imprimer mes cartes</b><span>${todo?`${todo} carte${todo>1?"s":""} pas encore imprimée${todo>1?"s":""} pour ton album.`:"Tout est imprimé. Tu peux en réimprimer."}</span></div><span class="go">${icon("back")}</span></button>
  <div class="sect"><div class="seg"><button class="${C.view==="cards"?"is-on":""}" data-v="cards">Mes cartes · ${cards.length}</button><button class="${C.view==="album"?"is-on":""}" data-v="album">Catégories · ${n}/${Object.keys(CAT_VIS).length}</button></div>
  ${C.view==="album"?`<div class="chips" style="margin:0 -16px;padding:0 16px">${[["all","Toutes"],["got","Commencées"],["miss","Pas encore"]].map(([k,l])=>`<button class="chip ${C.f===k?"is-on":""}" data-cf="${k}">${l}</button>`).join("")}</div>`:""}
  <div id="cgrid" style="display:flex;flex-direction:column;gap:14px">${C.view==="album"?albumGrid():cardsGrid(cards)}</div></div>`;
  t.onclick=e=>{ const b=e.target.closest("button"); if(!b) return;
    if(b.dataset.v){ C.view=b.dataset.v; renderCollec(); }
    if(b.dataset.cf){ C.f=b.dataset.cf; renderCollec(); }
    if(b.hasAttribute("data-album")) openShop();
    if(b.hasAttribute("data-me")) openProfile();
    if(b.dataset.slot) openCat(b.dataset.slot);
    if(b.dataset.card){ const [c,p]=b.dataset.card.split("|"); openViewer(c,+p); } };
}
const catTotal = c => PLACES.filter(p=>p.c===c).length;
function albumGrid(){
  const items=Object.entries(CAT_VIS).filter(([c])=>C.f==="all"||(C.f==="got"?isOwnedCat(c):!isOwnedCat(c)));
  if(!items.length) return `<p class="sub">Rien à afficher avec ce filtre.</p>`;
  return `<div class="cvgrid">${items.map(([c,v])=>{ const mine=isOwnedCat(c)?S.own[c].length:0, tot=catTotal(c);
    return `<button class="cv ${mine?"is-got":""}" data-slot="${esc(c)}"><span class="cv__img" style="background-image:url(${IMG[v.k]})">${mine?`<em>${icon("check")}${mine>1?` x${mine}`:""}</em>`:""}</span><b class="cv__t">${esc(v.t)}</b><span class="cv__n">${mine?`${mine}/${tot||mine} carte${(tot||mine)>1?"s":""}`:tot?`${tot} à décrocher`:"Bientôt"}</span></button>`; }).join("")}</div>`;
}
function cardsGrid(cards){
  return `<div class="grid" style="grid-template-columns:repeat(2,minmax(0,1fr));gap:20px 14px">${cards.map(x=>{const p=PL(x.p);return `<button class="slot" data-card="${esc(x.c)}|${x.p}">${cardHTML(x.c,{resto:p.n})}<span class="slot__name" style="font-size:14px">${esc(p.n)}</span><span class="slot__n" style="margin-top:-3px"><span>${new Date(x.d+"T12:00").toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit"})} · ${esc(p.city)}</span>${isPrinted(x.p)?`<span class="got">IMPRIMÉE</span>`:""}</span></button>`;}).join("")}</div>`;
}
function openCat(c){
  const mine=myRank(c).map(p=>({p})); const all=PLACES.filter(p=>p.c===c); const left=all.filter(p=>!isOwnedPlace(p.id)).sort((a,b)=>distM(a)-distM(b));
  const d=sheet(`<div><span class="eyebrow">N°${pad(NUM[c])}/93 · ${SECT_NAME[SECT_OF[c]]} · ${RAR_NAME[RAR[c]]}</span><div class="h2" style="margin-top:6px">${esc(title(c))}</div><p class="sub" style="margin-top:6px">${all.length?`${all.length} plaqué${all.length>1?"s":""} en France, donc ${all.length} carte${all.length>1?"s":""} à collectionner. T'en as ${mine.length}.`:"Pas encore de plaqué dans cette catégorie. La cuvée se remplit chaque mois."}</p></div>
  ${mine.length?`<div class="hscroll">${mine.map(x=>`<button data-card="${x.p}" style="width:104px">${cardHTML(c,{resto:PL(x.p).n})}</button>`).join("")}</div>`:""}
  ${left.length?`<div class="blk__h"><b style="font-size:17px">À décrocher</b></div><div class="list">${left.map(p=>`<button class="li" data-place="${p.id}"><span class="ic" style="background:var(--jaune)">${icon("map")}</span><span class="grow">${esc(p.n)}<small>${esc(where(p))} · ${fmtD(distM(p))}</small></span>${icon("back","chev")}</button>`).join("")}</div>`:""}
  <button class="toggle" data-alert><span class="grow"><b>Préviens-moi</b><span>Dès qu'un nouveau plaqué ${esc(c)} ouvre.</span></span><span class="sw"></span></button>`);
  d.querySelector(".sheet__body").onclick=e=>{ const b=e.target.closest("button"); if(!b) return;
    if(b.dataset.card){ popLayer(d); openViewer(c,+b.dataset.card); }
    if(b.dataset.place){ popLayer(d); openPlace(+b.dataset.place); }
    if(b.hasAttribute("data-alert")){ const s=b.querySelector(".sw"); s.classList.toggle("is-on"); toast(s.classList.contains("is-on")?"Alerte activée":"Alerte coupée"); } };
}
function miniBook(){ return `<div style="position:absolute;inset:0;border-radius:4px 10px 10px 4px;background:var(--g-feu);border:2.5px solid var(--noir);box-shadow:4px 5px 0 var(--noir);transform:rotate(-6deg);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;overflow:hidden"><img src="${IMG.badge}" style="width:34px" alt=""><img src="${IMG.wordmark}" style="width:58px" alt=""></div>`; }

function openViewer(c,pid){
  const p=PL(pid); const ent=(S.own[c]||[]).find(x=>x.p===pid)||{d:today()};
  const bgs={c:"#EE0001",r:"#00A88A",u:"#FFB21A",l:"#B06EFF"};
  const printed=isPrinted(pid);
  const d=pushLayer(`<div class="viewer" style="--vbg:${bgs[RAR[c]]}">
    <div class="full__bar dark" style="background:transparent"><button class="iconbtn" data-x aria-label="Fermer" style="background:rgba(0,0,0,.35);color:#fff;border-color:rgba(255,255,255,.3);box-shadow:none">${icon("x")}</button><div class="t" style="color:#fff">N°${pad(NUM[c])} · ${esc(c)}</div>${rarChip(c)}</div>
    <div class="viewer__stage" id="vst"><div class="viewer__card flip" id="vcard"><div class="flip__in">${cardHTML(c,{resto:p.n,cls:"is-live"})}
      <div class="vback"><span class="eyebrow">Plaque ultime · Édition 2026/2027</span><h4>${esc(title(c))}</h4><dl><dt>Plaqué</dt><dd>${esc(p.n)}</dd><dt>Où</dt><dd>${esc(where(p))}</dd><dt>Décrochée</dt><dd>${fmtDate(ent.d)}</dd><dt>Rareté</dt><dd>${RAR_NAME[RAR[c]]} · ${RAR_HOW[RAR[c]].toLowerCase()}</dd><dt>Points</dt><dd>+${RAR_PTS[RAR[c]]} pts</dd><dt>Illus</dt><dd>Champ Magnétique, Clara Biel</dd></dl><div class="num"><span class="eyebrow">${SECT_NAME[SECT_OF[c]]}</span><b>${pad(NUM[c])}/93</b></div></div>
    </div></div></div>
    <div class="viewer__info"><p class="hint">touche la carte pour la retourner</p>
      <div style="display:flex;gap:10px"><button class="btn btn--white" style="flex:1" data-place>Le plaqué</button><button class="btn" style="flex:1" data-story>${icon("share")} Story</button></div>
      <button class="btn btn--black btn--block" data-sticker>${printed?"Imprimée ✓ · la réimprimer":"Imprimer cette carte"}</button></div></div>`,"ov",{hideNav:true});
  const card=d.querySelector("#vcard"), st=d.querySelector("#vst"), live=card.querySelector(".card");
  let moved=false;
  st.onpointermove=e=>{ const r=st.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height; card.style.transform=`rotateX(${(y-.5)*-22}deg) rotateY(${(x-.5)*26}deg)`; live.style.setProperty("--hx",(x*100)+"%"); live.style.setProperty("--hy",(y*100)+"%"); moved=true; };
  st.onpointerleave=()=>{ card.style.transform=""; };
  card.onclick=()=>card.classList.toggle("is-back");
  d.onclick=e=>{ const b=e.target.closest("button"); if(!b) return;
    if(b.hasAttribute("data-x")) popLayer(d);
    if(b.hasAttribute("data-place")){ popLayer(d); openPlace(pid); }
    if(b.hasAttribute("data-story")) openStory(c,p);
    if(b.hasAttribute("data-sticker")){ popLayer(d); openShop(pid); } };
}

// =========================================================
// MOI
// =========================================================
function confirmReset(){
  const d=sheet(`<div class="h2">On remet tout à zéro ?</div><p class="sub">Ta collec, tes points, ton booster et ta commande reviennent à l'état de départ de la démo.</p><div style="display:flex;gap:10px"><button class="btn btn--white" style="flex:1" data-no>Non</button><button class="btn btn--red" style="flex:1" data-yes>Oui, reset</button></div>`);
  d.querySelector("[data-no]").onclick=()=>popLayer(d);
  d.querySelector("[data-yes]").onclick=()=>{ S=freshState(); S.onb=true; save(); closeAll(); M.q=null; M.sel=null; M.rs="peek"; M.inited=false; go("map"); toast("Démo remise à zéro"); };
}
function openHow(){
  sheet(`<div class="h2">Comment gagner des points</div>
  <div class="list">${[["Check-in commune","+10"],["Check-in rare","+20"],["Check-in ultra rare","+50"],["Check-in légendaire","+100"],["Nouvelle catégorie","+25"],["Revisite d'un plaqué","+5"],["Booster complété","+150"],["Un pote te rejoint","+50"]].map(([a,b])=>`<div class="li"><span class="grow">${a}</span><span class="quest__p">${b}</span></div>`).join("")}</div>
  <div class="h3">La rareté, c'est quoi ?</div><p class="sub">Pas le prix : la rareté dit combien de plaqués existent dans la catégorie. Un kebab peut être plus rare qu'un étoilé. Du kebab à l'étoilé, on a dit.</p>
  <div class="list">${["c","r","u","l"].map(k=>`<div class="li"><span class="rar rar--${k}">${RAR_NAME[k]}</span><span class="grow" style="font-size:13px">${RAR_HOW[k]}</span></div>`).join("")}</div>`);
}
function openPass(perk){
  const L=lvlOf(S.pts); const R=rng(hash(S.name+perk)); let cells="";
  for(let y=0;y<21;y++)for(let x=0;x<21;x++){ const f=(x<7&&y<7)||(x>13&&y<7)||(x<7&&y>13); const on=f?((x%6===0||y%6===0||(x>1&&x<5&&y>1&&y<5)||(x>15&&x<19&&y>1&&y<5)||(x>1&&x<5&&y>15&&y<19))&&!(x>13&&(x===14))&&!(y>13&&y===14)):R()<.48; if(on) cells+=`<rect x="${x}" y="${y}" width="1" height="1"/>`; }
  const d=pushLayer(`<div class="pass"><div class="full__bar"><button class="iconbtn" data-x aria-label="Fermer">${icon("x")}</button><div class="t">Ton pass</div></div>
    <div class="pass__card"><div class="row" style="justify-content:space-between"><img src="${IMG.wordmark}" style="width:110px" alt="Le Guide Ultime"><span class="ed" style="background:var(--jaune);color:var(--noir)">NIV. ${L.n} · ${esc(L.t)}</span></div>
      <div class="pass__perk">${esc(perk)}</div>
      <div class="qr"><svg viewBox="0 0 21 21" shape-rendering="crispEdges" fill="#111">${cells}</svg></div>
      <div class="row" style="justify-content:space-between;align-items:flex-end"><div><div class="eyebrow" style="color:#B9AC94">${esc(S.name)} · valable aujourd'hui</div><div class="pass__clock" id="clk">--:--:--</div></div>${avatar(S.name,"var(--jaune)")}</div></div>
    <p class="sub" style="text-align:center;padding:18px 24px 0">Montre cet écran au moment de payer. L'heure qui défile prouve que c'est pas une capture.</p></div>`,"ov",{hideNav:true});
  const tick=()=>{ const el=d.querySelector("#clk"); if(!el){clearInterval(iv);return;} el.textContent=new Date().toLocaleTimeString("fr-FR"); }; const iv=setInterval(tick,1000); tick();
  d.querySelector("[data-x]").onclick=()=>{ clearInterval(iv); popLayer(d); };
}
function openSaved(){
  const d=full("À tester",`<div class="sect" style="padding-top:0">${S.saved.length?`<div class="list">${S.saved.map(id=>{const p=PL(id);return `<button class="li" data-place="${id}"><span class="ic" style="background:var(--jaune)">${icon("bookmark-f")}</span><span class="grow">${esc(p.n)}<small>${esc(title(p.c))} · ${esc(where(p))}</small></span>${rarChip(p.c)}</button>`;}).join("")}</div>`:`<p class="sub">Rien pour l'instant. Sur une fiche, touche « À tester ».</p>`}</div>`);
  d.onclick=e=>{ const b=e.target.closest("[data-place]"); if(b) openPlace(+b.dataset.place); };
}
function openCreatorsList(){
  const d=full("Créateurs suivis",`<div class="sect" style="padding-top:0"><p class="sub">Leurs adresses s'affichent en bonus sur ta carte, à côté des plaqués.</p><div class="crlist">${CREATORS.map((c,i)=>`<button class="crow ${S.follow.includes(i)?"is-on":""}" data-i="${i}">${avatar(c.n,c.c)}<span class="grow"><b>@${esc(c.h)}</b><span>${c.k} adresses référencées</span></span><span class="fol">${S.follow.includes(i)?"Suivi":"Suivre"}</span></button>`).join("")}</div><p class="note">Créateurs fictifs pour le prototype.</p></div>`);
  d.onclick=e=>{ const b=e.target.closest(".crow"); if(!b) return; const i=+b.dataset.i; const k=S.follow.indexOf(i); if(k>=0) S.follow.splice(k,1); else S.follow.push(i); save(); b.classList.toggle("is-on"); b.querySelector(".fol").textContent=k>=0?"Suivre":"Suivi"; };
}
function openInvite(){
  const d=sheet(`<div class="h2">Ramène ta bande</div><p class="sub">+50 pts pour toi à chaque pote qui s'inscrit avec ton code. Et un bonus de bienvenue pour lui.</p>
  <div class="friends">${FRIENDS.slice(0,3).map(f=>`<div class="crow">${avatar(f.n,f.c)}<span class="grow"><b>${esc(f.n)}</b><span>${f.k} cartes · déjà sur LGU</span></span><span class="fol" style="background:var(--noir);color:var(--jaune)">Ami</span></div>`).join("")}
  ${SUGG.map(x=>x.n).map((n,i)=>`<div class="crow">${avatar(n,SUGG[i].c)}<span class="grow"><b>${n}</b><span>Dans tes contacts</span></span><button class="fol" data-inv="${n}">Inviter</button></div>`).join("")}</div>
  <p class="note">Contacts d'exemple. Dans l'appli, le matching se fait sur des empreintes chiffrées sur ton tel, jamais en clair.</p>`);
  d.querySelector(".sheet__body").onclick=e=>{ const b=e.target.closest("[data-inv]"); if(!b) return; b.textContent="Invité ✓"; b.style.background="var(--cyan)"; toast(`Invitation envoyée à ${esc(b.dataset.inv)}`); };
}

// =========================================================
// ALBUM PAPIER : imprimer ses cartes
// =========================================================
const PRICE={album:12.9,sticker:.5,holo:1.5,ship:3.9,free:20};
const euro=n=>n.toFixed(2).replace(".",",")+" €";
const isPrinted = pid => S.printed.includes(pid);
function openShop(preset){
  const cards=allCards(); const todo=cards.filter(x=>!isPrinted(x.p)), done=cards.filter(x=>isPrinted(x.p));
  const sel=new Set(todo.map(x=>x.p)); if(preset!=null) sel.add(preset);
  let album=!S.album; let view=(preset!=null&&isPrinted(preset))?"done":"todo";
  const body=`
  <section class="shop-hero grain" style="padding-bottom:18px"><div class="book" style="transform:perspective(900px) rotateY(-20deg) rotateX(5deg) scale(.82);margin-top:-6px;margin-bottom:-24px"><div class="book__spine"></div><div class="book__cover"><img class="b" src="${IMG.badge}" alt=""><img class="w" src="${IMG.wordmark}" alt="Le Guide Ultime"><span class="t">L'album officiel</span>${cardHTML("Burger",{resto:"Smash Brothers"})}${cardHTML("Frites",{resto:"Chez Maé"})}</div><div class="book__pages"></div></div>
    <h1 class="h1 outline" style="text-align:center;margin-top:18px;font-size:34px">Ta collec, en vrai</h1>
    <p class="sub" style="text-align:center;margin-top:6px;color:var(--noir)">Chaque carte décrochée s'imprime en sticker pour ton album.</p></section>
  <div class="sect"><div class="pstat">
    <div class="pstat__c"><b>${done.length}</b><span>déjà imprimée${done.length>1?"s":""}</span></div>
    <div class="pstat__c is-todo"><b>${todo.length}</b><span>pas encore imprimée${todo.length>1?"s":""}</span></div>
    <div class="pstat__c"><b>${S.album?"✓":"–"}</b><span>${S.album?"album reçu":"pas d'album"}</span></div></div></div>
  <div class="sect"><div class="seg" id="pv"><button data-view="todo">À imprimer · ${todo.length}</button><button data-view="done">Déjà imprimées · ${done.length}</button></div>
    <div class="row" style="justify-content:space-between"><span class="note" id="phint"></span><button class="skip" id="pall"></button></div>
    <div class="picks" id="picks"></div></div>
  <div class="sect"><button class="offer" id="palb"><span class="offer__r"></span><span class="grow"><b>${S.album?"Un album en plus":"L'album officiel"}</b><span>${S.album?"Pour recommencer à zéro, ou pour offrir.":"93 catégories, une page par catégorie, de la place pour toutes tes cartes."}</span></span><span class="pr">${euro(PRICE.album)}</span></button>
    <p class="note" style="margin:0 0 96px">Sticker 0,50 €, légendaire en holo 1,50 €, port offert dès 20 €. Prix indicatifs, paiement non branché dans le prototype.</p></div>`;
  const d=full("Imprimer mes cartes",body,{after:`<div class="paybar"><div class="tot" id="tot"></div><button class="btn btn--red" style="flex:1" data-pay>Commander</button></div>`});
  const calc=()=>{ let n=0,h=0; sel.forEach(pid=>{ if(RAR[PL(pid).c]==="l") h++; else n++; }); const st=n*PRICE.sticker+h*PRICE.holo; const sum=(album?PRICE.album:0)+st; const ship=sum>=PRICE.free||sum===0?0:PRICE.ship; return {n:n+h,st,sum,ship,total:sum+ship,re:[...sel].filter(isPrinted).length}; };
  const drawPicks=()=>{
    $$("#pv button",d).forEach(b=>b.classList.toggle("is-on",b.dataset.view===view));
    const list=view==="todo"?todo:done;
    d.querySelector("#phint").textContent = view==="todo" ? (todo.length?"Cochées d'office : tes nouvelles cartes.":"Tout est imprimé. Bravo.") : "Touche une carte pour la réimprimer.";
    const allOn=list.length&&list.every(x=>sel.has(x.p)); const pa=d.querySelector("#pall"); pa.hidden=!list.length; pa.textContent=allOn?"Tout décocher":"Tout cocher";
    d.querySelector("#picks").innerHTML = list.length ? list.map(x=>{const pr=isPrinted(x.p), on=sel.has(x.p); return `<button class="pick ${on?"is-on":""} ${pr?"is-printed":""}" data-pick="${x.p}" aria-pressed="${on}">${cardHTML(x.c,{resto:PL(x.p).n})}<span class="tick">${icon("check")}</span>${pr?`<span class="done">${on?"RÉIMPRESSION":"IMPRIMÉE"}</span>`:`<span class="done new">NOUVELLE</span>`}</button>`;}).join("") : `<p class="sub" style="grid-column:1/-1">${view==="todo"?"Aucune carte en attente. Va en décrocher d'autres !":"Rien d'imprimé pour l'instant."}</p>`;
  };
  const drawTot=()=>{ const k=calc(); d.querySelector("#palb").classList.toggle("is-on",album); const parts=[]; if(k.n) parts.push(`${k.n} carte${k.n>1?"s":""}${k.re?` dont ${k.re} réimpr.`:""}`); if(album) parts.push("album"); d.querySelector("#tot").innerHTML=`${euro(k.total)}<small>${parts.join(" + ").toUpperCase()||"RIEN DE SÉLECTIONNÉ"}${k.total?(k.ship?` · PORT ${euro(k.ship)}`:" · PORT OFFERT"):""}</small>`; d.querySelector("[data-pay]").disabled=!k.total; };
  drawPicks(); drawTot();
  d.onclick=e=>{ const b=e.target.closest("button"); if(!b) return;
    if(b.dataset.view){ view=b.dataset.view; drawPicks(); }
    else if(b.dataset.pick){ const pid=+b.dataset.pick; if(sel.has(pid)) sel.delete(pid); else sel.add(pid); drawPicks(); drawTot(); }
    else if(b.id==="pall"){ const list=view==="todo"?todo:done; const allOn=list.every(x=>sel.has(x.p)); list.forEach(x=>allOn?sel.delete(x.p):sel.add(x.p)); drawPicks(); drawTot(); }
    else if(b.id==="palb"){ album=!album; drawTot(); }
    else if(b.hasAttribute("data-pay")) checkout(album,sel,calc()); };
}
function checkout(album,sel,k){
  const d=sheet(`<div class="h2">Livraison</div>
  <form class="form" id="shipf"><div class="field"><label for="sf1">Nom</label><input id="sf1" value="${esc(S.name)} Martin" required></div><div class="field"><label for="sf2">Adresse</label><input id="sf2" value="12 rue Oberkampf" required></div><div class="row"><div class="field" style="flex:1"><label for="sf3">Code postal</label><input id="sf3" value="75011" inputmode="numeric" required></div><div class="field" style="flex:1.4"><label for="sf4">Ville</label><input id="sf4" value="Paris" required></div></div>
  <div class="tally" style="background:var(--blanc);border-color:var(--noir);color:var(--noir)">${k.n?`<div class="tally__r" style="opacity:1;transform:none"><span>${k.n} carte${k.n>1?"s":""} en sticker</span><b style="color:var(--noir)">${euro(k.st)}</b></div>`:""}${album?`<div class="tally__r" style="opacity:1;transform:none"><span>Album</span><b style="color:var(--noir)">${euro(PRICE.album)}</b></div>`:""}<div class="tally__r" style="opacity:1;transform:none"><span>Port</span><b style="color:var(--noir)">${k.ship?euro(k.ship):"Offert"}</b></div><div class="tally__r tally__tot" style="opacity:1;transform:none;border-color:rgba(0,0,0,.2)"><span>Total</span><b style="color:var(--rouge)">${euro(k.total)}</b></div></div>
  <button class="btn btn--red btn--block" type="submit">Payer ${euro(k.total)} (démo)</button></form>`);
  d.querySelector("#shipf").onsubmit=e=>{ e.preventDefault();
    S.order={date:today(),n:k.n,total:k.total,album}; sel.forEach(pid=>{ if(!S.printed.includes(pid)) S.printed.push(pid); }); if(album) S.album=true; save();
    closeAll(); const first=[...sel][0]; const fc=first!=null?PL(first):PL(0);
    const ok=full("Commande",`<div class="ok-big"><div style="width:190px">${cardHTML(fc.c,{resto:fc.n,cls:"pop"})}</div><h2 class="h1">C'est dans<br>la boîte !</h2><p class="sub">${album?"Ton album et ":""}${k.n?`tes ${k.n} sticker${k.n>1?"s":""}`:""} parte${(album?1:0)+(k.n?1:0)>1||k.n>1?"nt":""} cette semaine.</p><button class="btn btn--block" data-done>Suivre ma commande</button></div>`);
    confetti(160); ok.querySelector("[data-done]").onclick=()=>{ popLayer(ok); openOrder(); }; };
}
function openOrder(){
  const o=S.order;
  full("Ma commande",`<div class="sect" style="padding-top:0"><div class="panel" style="padding:16px;display:flex;flex-direction:column;gap:12px"><div class="row" style="justify-content:space-between"><b class="h3">${o.album?"Album"+(o.n?" + ":""):""}${o.n?o.n+" stickers":""}</b><span class="cond" style="font-size:22px">${euro(o.total)}</span></div>
  <div class="track"><div class="track__s on"><i></i><div><b>Commande reçue</b><span>${fmtDate(o.date)}</span></div></div><div class="track__s on"><i></i><div><b>Stickers imprimés</b><span>Dans l'ordre de l'album</span></div></div><div class="track__s"><i></i><div><b>En route</b><span>Prévu sous 3 à 5 jours</span></div></div><div class="track__s"><i></i><div><b>Dans ta boîte aux lettres</b><span>Le moment de coller</span></div></div></div></div>
  <button class="btn btn--white btn--block" data-more>Imprimer d'autres cartes</button></div>`).onclick=e=>{ if(e.target.closest("[data-more]")) openShop(); };
}

// =========================================================
// SOCIAL : rédac, On mange où, avis + verdict, profil, compat, créateurs, Insta
// =========================================================
const TEAM = {Clara:{c:"#FF99B3",r:"rédac Paris"},Yanis:{c:"#6EA5FF",r:"rédac Lyon"},Nora:{c:"#FFCE18",r:"co-fondatrice"}};
let PLAT = {by:"Clara", pid:6, text:"La margherita de Forno Ribelle, 9 balles, pâte qui lève 72 heures. On y était hier midi, on y retourne demain. Fonce.", dur:"0:24"};
let CANDIDATE = {n:"Boulangerie Brûlée", c:"Flan", q:"Paris 3e", yes:68, text:"Un flan vanille-caramel brûlé à la commande. Elle mérite la plaque ? À vous de jouer."};
const FR_OWN = {0:[0,5,3,2,15,22,17,24,25,21,7,33],1:[0,7,12,37,10,13,1],2:[1,9,14,21,24,25,32,20],3:[10,20,29,35,0],4:[25,26,27,32,24]};
const FR_COMPAT = [87,64,78,52,71];
const CREATOR_LISTS = [
  {cr:0,t:"Le Paris de Lou",ids:[5,9,21,25,33],ill:"c03"},
  {cr:2,t:"Ma tournée asiat'",ids:[3,11,16,18,22,15],ill:"c21"},
  {cr:4,t:"5 street-food qui tabassent",ids:[0,1,7,12,35],ill:"c01"},
  {cr:3,t:"Que du sucré",ids:[24,26,27,34],ill:null},
  {cr:1,t:"Top ramen de France",ids:[5,39],ill:"c03"}
];
const handle = () => "@"+norm(S.name||"sam").replace(/[^a-z0-9]/g,"")||"@sam";

// ---------- classement perso (façon Beli) ----------
function myRank(c){ const own=(S.own[c]||[]).map(x=>x.p); const r=(S.rank&&S.rank[c]||[]).filter(p=>own.includes(p)); own.forEach(p=>{ if(!r.includes(p)) r.push(p); }); return r; }
function setRank(c,arr){ S.rank=S.rank||{}; S.rank[c]=arr; save(); }
const rankLabel = (c,i) => `N°${i+1} de mes ${c.toLowerCase()}${/[sx]$/.test(c)?"":"s"}`;

// ---------- STORIES DE LA RÉDAC ----------
function openStories(start=0){
  const SL=["plat",...(CANDIDATE?["vote"]:[]),...(S.booster.ids.length?["week"]:[])]; let i=Math.min(start,SL.length-1), timer=null; const N=SL.length; const TM=TEAM[PLAT.by]||{c:"#FFCE18"};
  const d=pushLayer(`<div class="st"><div class="st__bars">${SL.map(k=>`<i><b></b></i>`).join("")}</div>
    <div class="st__head"><span class="st__av" style="background:${TM.c}">${esc((PLAT.by||"R")[0])}</span><div class="grow"><b>La rédac</b><span id="stwho"></span></div><button class="iconbtn" data-x aria-label="Fermer" style="background:rgba(0,0,0,.35);color:#fff;border-color:rgba(255,255,255,.35);box-shadow:none">${icon("x")}</button></div>
    <div class="st__slide" id="sts"></div><button class="st__nav st__nav--l" data-prev aria-label="Story précédente"></button><button class="st__nav st__nav--r" data-nextst aria-label="Story suivante"></button></div>`,"ov",{hideNav:true});
  $$(".notif").forEach(n=>n.remove()); S.storySeen=true; save(); const ring=$(".ring"); if(ring) ring.classList.add("is-seen");
  const bars=$$(".st__bars i b",d);
  const show=()=>{
    clearTimeout(timer); bars.forEach((b,k)=>{ b.style.transition="none"; b.style.width=k<i?"100%":"0%"; });
    requestAnimationFrame(()=>{ const b=bars[i]; b.style.transition="width 9s linear"; b.style.width="100%"; });
    const s=d.querySelector("#sts"), who=d.querySelector("#stwho");
    if(SL[i]==="plat"){ const p=PL(PLAT.pid); who.textContent=`${PLAT.by==='La rédac'?'Le plat du jour':PLAT.by} · 11:45`;
      s.style.background=`url(${IMG[ILL[p.c]]}) center 60%/cover`;
      s.innerHTML=`<div class="st__shade"></div><div class="st__body"><span class="ed">Le plat du jour</span><h2 class="st__t">${esc(p.n)}</h2><p class="st__s">${esc(title(p.c))} · ${esc(where(p))}</p>
        ${PLAT.audio||PLAT.dur?`<button class="voice" data-play><span class="voice__p">${icon("play")}</span><span class="voice__w">${Array.from({length:28},(_,k)=>`<i style="height:${6+Math.abs(Math.sin(k*1.7))*18}px"></i>`).join("")}</span><span class="voice__d">${PLAT.dur||"vocal"}</span></button>${PLAT.audio?`<audio id="staud" src="${esc(PLAT.audio)}" preload="none"></audio>`:""}`:""}
        <p class="st__tr" id="sttr"><span>${esc(PLAT.text)}</span></p>
        <button class="btn btn--block" data-placest="${p.id}">Voir l'adresse</button></div>`; }
    if(SL[i]==="vote"){ who.textContent="La rédac · vote ouvert"; s.style.background=TYPO_G[0];
      const voted=S.vote; s.innerHTML=`<div class="st__body st__body--c"><span class="ed">On plaque ou pas ?</span><div style="width:150px;margin:6px auto">${cardHTML(CANDIDATE.c,{resto:CANDIDATE.n,locked:true,lockText:"Candidate<small>cuvée 2026/27</small>"})}</div><h2 class="st__t" style="text-align:center">${esc(CANDIDATE.n)}</h2><p class="st__s" style="text-align:center">${esc(title(CANDIDATE.c))} · ${esc(CANDIDATE.q)}</p><p class="st__tr" style="text-align:center"><span>${esc(CANDIDATE.text)}</span></p>
        <div id="vote">${voted?voteRes():`<div class="vote"><button class="btn" data-vote="yes">On plaque !</button><button class="btn btn--white" data-vote="no">Pas encore</button></div>`}</div></div>`; }
    if(SL[i]==="week"){ who.textContent=`Pour toi · semaine ${weekNo()%100}`; s.style.background=TYPO_G[3]; const ids=S.booster.ids;
      s.innerHTML=`<div class="st__body st__body--c"><span class="ed">Ta sélection de la semaine</span><div class="st__fan">${ids.map((id,k)=>cardHTML(PL(id).c,{resto:PL(id).n,style:`transform:rotate(${(k-1)*10}deg) translateY(${k===1?-10:0}px)`})).join("")}</div><h2 class="st__t" style="text-align:center">3 adresses<br>choisies pour toi</h2><p class="st__s" style="text-align:center">Les 3 avant dimanche : +${BOOSTER_BONUS} pts.</p><button class="btn btn--block" data-weekst>Voir sur la carte</button></div>`; }
    timer=setTimeout(()=>{ if(i<N-1){ i++; show(); } else close(); },9000);
  };
  const close=()=>{ clearTimeout(timer); popLayer(d); };
  function voteRes(){ const y=S.vote==="yes"?CANDIDATE.yes+1:CANDIDATE.yes; return `<div class="vres"><div><span>On plaque !</span><b>${y} %</b><i style="width:${y}%"></i></div><div><span>Pas encore</span><b>${100-y} %</b><i style="width:${100-y}%"></i></div><p>La rédac tranche vendredi. Merci pour ta voix !</p></div>`; }
  d.onclick=e=>{ const b=e.target.closest("button"); if(!b) return;
    if(b.hasAttribute("data-x")) close();
    else if(b.hasAttribute("data-prev")){ i=Math.max(0,i-1); show(); }
    else if(b.hasAttribute("data-nextst")){ if(i<N-1){ i++; show(); } else close(); }
    else if(b.hasAttribute("data-play")){ clearTimeout(timer); b.classList.add("is-on"); bars[i].style.transition="none"; bars[i].style.width=bars[i].getBoundingClientRect().width+"px"; const tr=d.querySelector("#sttr"); tr.classList.add("is-play"); const au=d.querySelector("#staud"); if(au) au.play().catch(()=>{}); setTimeout(()=>{ b.classList.remove("is-on"); },6500); }
    else if(b.dataset.vote){ S.vote=b.dataset.vote; save(); d.querySelector("#vote").innerHTML=voteRes(); clearTimeout(timer); }
    else if(b.dataset.placest){ close(); openPlace(+b.dataset.placest); }
    else if(b.hasAttribute("data-weekst")){ close(); applyQ({label:"Ta sélection de la semaine",ids:S.booster.ids.slice()}); } };
  show();
}
function notifMock(){
  if(notifMock.done || !S.onb) return; notifMock.done=true;
  const n=document.createElement("button"); n.className="notif"; n.setAttribute("aria-label","Notification : le plat du jour"); const np=PL(PLAT.pid);
  n.innerHTML=`<img src="${IMG.badge}" alt=""><span class="grow"><span class="notif__h"><b>LE GUIDE ULTIME</b><span>11:45</span></span><b>Le plat du jour${PLAT.by&&PLAT.by!=="La rédac"?" de "+esc(PLAT.by):""}</b><span>${esc(np.n)} · ${esc(where(np))}. ${esc(PLAT.text.split(/(?<=[.!?])\s/)[0])}</span></span>`;
  $("#app").appendChild(n); requestAnimationFrame(()=>n.classList.add("is-on"));
  const hide=()=>{ n.classList.remove("is-on"); setTimeout(()=>n.remove(),400); };
  n.onclick=()=>{ hide(); openStories(0); }; setTimeout(hide,6500);
}

// ---------- ON MANGE OÙ ? ----------
function openGroup(pre=[]){
  const G={who:new Set(pre.length?pre:[0,1,2]), price:["€","€€"], envie:null};
  const d=pushLayer(`<div class="full grp"><div class="full__bar"><button class="iconbtn" data-back aria-label="Fermer">${icon("x")}</button><div class="t">On mange où ?</div></div><div class="full__body" id="gb"></div></div>`,"ov",{hideNav:true});
  d.querySelector("[data-back]").onclick=()=>popLayer(d);
  const gb=d.querySelector("#gb");
  const setup=()=>{
    gb.innerHTML=`<div class="sect" style="padding-top:0"><h1 class="h1 outline" style="font-size:42px">On mange<br>où ?</h1><p class="sub">Chacun swipe 10 plaqués, l'appli tranche. Fini les 40 messages pour choisir un resto.</p></div>
    <div class="sect"><div class="blk__h"><b>Avec qui ?</b><span class="eyebrow">${G.who.size?`TOI + ${G.who.size}`:"QUE TOI ?"}</span></div><div class="recent">${FRIENDS.map((f,k)=>`<button class="chip ${G.who.has(k)?"is-on":""}" data-who="${k}"><i class="dotc" style="background:${f.c}"></i>${esc(f.n)}</button>`).join("")}</div>
      <button class="link" data-glink>${icon("copy")} <span>Ou envoie le lien au groupe : <b>lgu.app/g/XK42</b></span></button></div>
    <div class="sect"><div class="blk__h"><b>Budget</b></div><div class="recent">${["€","€€","€€€","€€€€"].map(x=>`<button class="chip ${G.price.includes(x)?"is-on":""}" data-gp="${x}">${x}</button>`).join("")}</div></div>
    <div class="sect"><div class="blk__h"><b>Une envie ?</b><span>FACULTATIF</span></div><div class="recent"><button class="chip ${!G.envie?"is-on":""}" data-ge="">Tout me va</button>${GENV.filter(e=>PLACES.some(p=>shown(p)&&e.cats.includes(p.c))).map(e=>`<button class="chip ${G.envie===e.k?"is-on":""}" data-ge="${e.k}">${esc(e.t)}</button>`).join("")}</div></div>
    <div class="sect" style="padding-bottom:30px"><button class="btn btn--red btn--block" data-go2>C'est parti · ${pool().length} adresses</button><p class="note" style="text-align:center;margin:0">Ouverts maintenant, autour de toi.</p></div>`;
  };
  const pool=()=>{ const en=GENV.find(e=>e.k===G.envie); return PLACES.filter(p=>shown(p)&&p.city==="Paris"&&isOpen(p)&&G.price.includes(p.p)&&(!en||en.cats.includes(p.c))).sort((a,b)=>distM(a)-distM(b)).slice(0,10); };
  const likes={me:new Set()};
  const swipe=()=>{
    const L=pool(); let k=0;
    gb.innerHTML=`<div class="swp"><div class="sw__top"><div class="avs">${[...G.who].map(w=>avatar(FRIENDS[w].n,FRIENDS[w].c)).join("")}${avatar(S.name,"var(--jaune)")}</div><span class="eyebrow" id="swn">1/${L.length}</span></div>
      <div class="sw__stack" id="stk"></div>
      <div class="sw__btns"><button class="swb swb--no" data-sw="0" aria-label="Bof">${icon("x")}</button><button class="swb swb--yes" data-sw="1" aria-label="Chaud">${icon("check")}</button></div>
      <p class="note" style="text-align:center;margin:0">Glisse à droite si t'es chaud, à gauche si bof.</p></div>`;
    const stk=gb.querySelector("#stk");
    const cardFor=p=>{ const fr=p.fr.map(i=>FRIENDS[i]).filter(Boolean); return `<div class="swc" data-pid="${p.id}"><div class="swc__art" style="${ILL[p.c]||PLAQUE_ART[p.c]?`background-image:url(${IMG[ILL[p.c]||PLAQUE_ART[p.c]]})`:`background:${TYPO_G[hash(p.c)%TYPO_G.length]}`}">${ILL[p.c]||PLAQUE_ART[p.c]?"":`<b>${esc(p.c)}</b>`}<span class="swc__st swc__st--yes">CHAUD</span><span class="swc__st swc__st--no">BOF</span></div><div class="swc__info"><div class="place__cat">${esc(title(p.c))}</div><div class="swc__n">${esc(p.n)}</div><div class="rr__m"><span>${fmtD(distM(p))}</span><span class="open">Ouvert</span><span>${esc(p.p)}</span>${isOwnedPlace(p.id)?`<span class="tag tag--own">✓ Déjà testé</span>`:""}</div>${fr.length?`<div class="row" style="margin-top:8px;gap:8px"><div class="avs">${fr.map(f=>avatar(f.n,f.c)).join("")}</div><span class="note" style="margin:0">${fr.map(f=>f.n).join(", ")} y ${fr.length>1?"sont allés":"est allé·e"}</span></div>`:""}</div></div>`; };
    const render=()=>{ stk.innerHTML=L.slice(k,k+3).reverse().map(cardFor).join(""); gb.querySelector("#swn").textContent=`${Math.min(k+1,L.length)}/${L.length}`; bindTop(); };
    const decide=(yes)=>{ const top=stk.lastElementChild; if(!top) return; const p=+top.dataset.pid; if(yes) likes.me.add(p); top.classList.add(yes?"is-yes":"is-no"); top.style.transform=`translateX(${yes?520:-520}px) rotate(${yes?24:-24}deg)`; setTimeout(()=>{ k++; if(k>=L.length) result(L); else render(); },260); };
    function bindTop(){ const top=stk.lastElementChild; if(!top) return; let x0=null,dx=0;
      top.onpointerdown=e=>{ x0=e.clientX; dx=0; try{top.setPointerCapture(e.pointerId);}catch(_){} top.style.transition="none"; };
      top.onpointermove=e=>{ if(x0==null) return; dx=e.clientX-x0; top.style.transform=`translateX(${dx}px) rotate(${dx/16}deg)`; top.classList.toggle("is-yes",dx>40); top.classList.toggle("is-no",dx<-40); };
      top.onpointerup=top.onpointercancel=()=>{ if(x0==null) return; x0=null; top.style.transition=""; if(Math.abs(dx)>90) decide(dx>0); else { top.style.transform=""; top.classList.remove("is-yes","is-no"); } }; }
    gb.querySelector(".sw__btns").onclick=e=>{ const b=e.target.closest("[data-sw]"); if(b) decide(b.dataset.sw==="1"); };
    render();
  };
  const result=(L)=>{
    const names=[...G.who].map(w=>FRIENDS[w].n); const one=names.length===1;
    gb.innerHTML=`<div class="ok-big" style="padding-top:60px"><div class="dots3"><i></i><i></i><i></i></div><h2 class="h2">On attend ${one?esc(names[0]):names.length===2?esc(names.join(" et ")):"ta bande"}…</h2><p class="sub">${esc(listFr(names))} ${one?"swipe":"swipent"} encore.</p></div>`;
    setTimeout(()=>{
      const score=L.map(p=>{ const voters=[{n:S.name,c:"var(--jaune)",y:likes.me.has(p.id)}].concat([...G.who].map(w=>({n:FRIENDS[w].n,c:FRIENDS[w].c,y:(hash(FRIENDS[w].n+p.id)%100)<(compatPct(w)-(likes.me.has(p.id)?0:35))}))); return {p,voters,n:voters.filter(v=>v.y).length}; }).sort((a,b)=>b.n-a.n||distM(a.p)-distM(b.p));
      const w=score[0], tot=G.who.size+1;
      gb.innerHTML=`<div class="sect" style="padding-top:0;align-items:center;text-align:center"><span class="ed">${one?`Ton verdict avec ${esc(names[0])}`:names.length===2?`Votre verdict à trois`:"Le verdict de la bande"}</span><div style="width:190px;margin:10px auto 0">${cardHTML(w.p.c,{resto:w.p.n,cls:"pop is-live"})}</div><h1 class="h1" style="margin-top:8px">${esc(w.p.n)}</h1><p class="sub">${esc(title(w.p.c))} · ${fmtD(distM(w.p))} · ${esc(w.p.p)}</p>
        <div class="row" style="justify-content:center;gap:8px"><div class="avs">${w.voters.filter(v=>v.y).map(v=>avatar(v.n,v.c)).join("")}</div><b class="h3">${w.n}/${tot} chauds</b></div>
        <div style="display:flex;gap:10px;width:100%;margin-top:6px"><button class="btn btn--white" style="flex:1" data-gshare>${icon("share")} Partager</button><button class="btn btn--red" style="flex:1.3" data-ggo>${icon("route")} On y va</button></div></div>
        <div class="sect"><div class="blk__h"><b>Juste derrière</b></div>${score.slice(1,4).map(s=>`<button class="rr" data-gpl="${s.p.id}">${cardHTML(s.p.c,{resto:s.p.n})}<div class="grow"><div class="rr__t">${esc(s.p.n)}</div><div class="rr__s">${esc(title(s.p.c))}</div><div class="rr__m"><span>${s.n}/${tot} chauds</span><span>${fmtD(distM(s.p))}</span></div></div></button>`).join("")}
        <button class="btn btn--ghost" data-again>Refaire une partie</button></div>`;
      confetti(170);
    },1600);
  };
  gb.onclick=e=>{ const b=e.target.closest("button"); if(!b||b.closest(".sw__btns")) return;
    if(b.dataset.who){ const k=+b.dataset.who; G.who.has(k)?G.who.delete(k):G.who.add(k); setup(); }
    else if(b.dataset.gp){ const x=b.dataset.gp, i=G.price.indexOf(x); if(i>=0) G.price.splice(i,1); else G.price.push(x); setup(); }
    else if(b.dataset.ge!==undefined){ G.envie=b.dataset.ge||null; setup(); }
    else if(b.hasAttribute("data-glink")) copyText("lgu.app/g/XK42","Lien copié : colle-le dans ton groupe");
    else if(b.hasAttribute("data-go2")){ if(!pool().length){ toast("Rien avec ces critères. Élargis le budget."); return; } swipe(); }
    else if(b.hasAttribute("data-gshare")) toast(G.who.size===1?`Envoyé à ${FRIENDS[[...G.who][0]].n}`:"Envoyé dans le groupe");
    else if(b.hasAttribute("data-ggo")) toast("Dans l'appli, ça ouvre ton GPS préféré");
    else if(b.dataset.gpl){ openPlace(+b.dataset.gpl); }
    else if(b.hasAttribute("data-again")){ likes.me.clear(); setup(); } };
  setup();
}
const listFr = a => a.length<=1?(a[0]||""):a.slice(0,-1).join(", ")+" et "+a[a.length-1];
function copyText(t,msg){ try{ navigator.clipboard.writeText(t).then(()=>toast(msg),()=>toast(t)); }catch(_){ toast(t); } }

// ---------- APRÈS LE SCAN : avis (classement) puis verdict vidéo ----------
function afterScan(id,done){
  const p=PL(id), c=p.c; const others=myRank(c).filter(x=>x!==id);
  const d=pushLayer(`<div class="scan"><div class="reveal" id="av"></div></div>`,"ov",{hideNav:true});
  const av=d.querySelector("#av"); let lo=0, hi=others.length;
  const finish=(pos)=>{ const r=others.slice(); r.splice(pos,0,id); setRank(c,r); verdict(pos); };
  const ask=()=>{
    if(!others.length){
      av.innerHTML=`<span class="reveal__kicker">Ton avis</span><h2 class="reveal__t" style="font-size:34px">Alors,<br>c'était comment ?</h2><div style="width:150px">${cardHTML(c,{resto:p.n})}</div>
        <div class="bigreact">${[["Banger","Je reviens demain"],["Validé","Solide"],["Bof","Pas pour moi"]].map(([a,s])=>`<button data-r="${a}"><b>${a}</b><span>${s}</span></button>`).join("")}</div><p class="note" style="color:#B9AC94;margin:0;text-align:center">Pas d'étoiles chez nous. Ton avis lance ton classement ${esc(c.toLowerCase())}.</p>`;
      return;
    }
    if(lo>=hi){ finish(lo); return; }
    const mid=(lo+hi)>>1, q=PL(others[mid]);
    av.innerHTML=`<span class="reveal__kicker">Ton classement ${esc(c.toLowerCase())}</span><h2 class="reveal__t" style="font-size:32px">Mieux ou<br>moins bien ?</h2>
      <div class="cmp"><button data-cmp="new">${cardHTML(c,{resto:p.n})}<b>${esc(p.n)}</b><span>aujourd'hui</span></button><span class="cmp__vs">VS</span><button data-cmp="old">${cardHTML(c,{resto:q.n})}<b>${esc(q.n)}</b><span>${esc(where(q))}</span></button></div>
      <p class="note" style="color:#B9AC94;margin:0;text-align:center">Touche ton préféré. Pas d'étoiles, juste ton top perso.</p><button class="btn btn--ghost" style="color:#B9AC94" data-same>Trop dur, c'est pareil</button>`;
  };
  const verdict=(pos)=>{
    const lab=rankLabel(c,pos), n=myRank(c).length;
    av.innerHTML=`<span class="reveal__kicker">${n>1?`Classé · ${n} ${esc(c.toLowerCase())} dans ton top`:"Ton top commence ici"}</span><h2 class="reveal__t" style="font-size:36px">${esc(lab)}</h2>
      <div class="ranklist">${myRank(c).slice(0,4).map((pid,k)=>`<div class="${pid===id?"is-new":""}"><b>${k+1}</b><span>${esc(PL(pid).n)}</span></div>`).join("")}</div>
      <div class="vcta"><div class="vcta__ic">${icon("play")}</div><div class="grow"><b>Filme ton verdict</b><span>10 secondes, cadre LGU, prêt pour TikTok, Snap et Insta. Les meilleurs passent sur nos comptes.</span></div></div>
      <label class="btn btn--block" style="position:relative">${icon("play")} Filmer mon verdict<input type="file" accept="video/*" capture="user" id="vfile" style="position:absolute;inset:0;opacity:0;cursor:pointer"></label>
      <div style="display:flex;gap:10px;width:100%"><button class="btn btn--white" style="flex:1" data-vdemo>Voir la démo</button><button class="btn btn--ghost" style="flex:1;color:#B9AC94" data-vskip>Plus tard</button></div>`;
    av.querySelector("#vfile").onchange=e=>{ const f=e.target.files&&e.target.files[0]; if(f) preview(URL.createObjectURL(f),lab); };
    av._lab=lab;
  };
  const preview=(src,lab)=>{
    const p2=PL(id); const n=allCards().length;
    av.innerHTML=`<span class="reveal__kicker">Ton verdict</span>
      <div class="vframe">${src?`<video src="${src}" autoplay muted loop playsinline></video>`:`<div class="vframe__demo" style="background-image:url(${IMG[ILL[c]||PLAQUE_ART[c]]||IMG.c03})"></div><div class="vframe__rec"><i></i> 0:10</div>`}
        <div class="vframe__top"><img src="${IMG.wordmark}" alt="Le Guide Ultime"><span>VERDICT</span></div>
        <div class="vframe__sticker">${esc(lab)}</div>
        <div class="vframe__bot"><div style="width:58px">${cardHTML(c,{resto:p2.n})}</div><div class="grow"><b>${esc(p2.n)}</b><span>${esc(where(p2))} · carte n°${n} · ${esc(handle())}</span></div></div></div>
      <div class="share4">${[["TikTok","#111"],["Snap","#FFFC00"],["Insta","#FF99B3"],["Enregistrer","#FFF"]].map(([t,col])=>`<button data-sh="${t}"><i style="background:${col}"></i>${t}</button>`).join("")}</div>
      <button class="toggle" data-repost style="background:#1F1A14;border-color:#3b3228;color:#fff"><span class="grow"><b style="color:#fff">Proposer à LGU</b><span style="color:#B9AC94">Les meilleurs verdicts sont repostés sur nos comptes, avec ton @.</span></span><span class="sw is-on"></span></button>
      <button class="btn btn--block" data-vdone>Terminer</button>`;
  };
  av.onclick=e=>{ const b=e.target.closest("button"); if(!b) return;
    if(b.dataset.r){ S.react[id]=b.dataset.r; save(); finish(0); }
    else if(b.dataset.cmp){ const mid=(lo+hi)>>1; if(b.dataset.cmp==="new") hi=mid; else lo=mid+1; ask(); }
    else if(b.hasAttribute("data-same")){ finish((lo+hi)>>1); }
    else if(b.hasAttribute("data-vdemo")) preview(null,av._lab);
    else if(b.hasAttribute("data-vskip")||b.hasAttribute("data-vdone")){ popLayer(d); done(); }
    else if(b.dataset.sh) toast(b.dataset.sh==="Enregistrer"?"Vidéo enregistrée dans ta pellicule":`Dans l'appli, ça ouvre ${b.dataset.sh} avec ta vidéo`);
    else if(b.hasAttribute("data-repost")){ const s=b.querySelector(".sw"); s.classList.toggle("is-on"); } };
  ask();
}

// ---------- PROFIL (partageable) ----------
// ---------- COMPATIBILITÉ : calculée à partir de vos vraies données ----------
// 4 critères, pondérés : mêmes envies (catégories), adresses en commun, mêmes verdicts, même budget.
// Avec peu de cartes, le score reste prudent (ramené vers 50 %) : il devient fiable à partir de 8 cartes chacun.
const PRICE_N = p => (p.p||"€€").length;
const VERD_N = {Banger:2,"Validé":1,Bof:0};
function compatOf(i){
  const meP=allCards().map(x=>x.p), frP=(FR_OWN[i]||[]).filter(p=>PL(p)&&PLAQUE_ART[PL(p).c]);
  const mine=new Set(meP), common=frP.filter(p=>mine.has(p));
  if(meP.length<3||frP.length<3) return {pct:null,common,parts:null,few:true};
  // 1. mêmes envies : similarité cosinus des catégories (racine = un gros mangeur de kebab ne masque pas le reste)
  const vec=L=>{ const v={}; L.forEach(p=>{ const c=PL(p).c; v[c]=(v[c]||0)+1; }); Object.keys(v).forEach(c=>v[c]=Math.sqrt(v[c])); return v; };
  const a=vec(meP), b=vec(frP); let dot=0,na=0,nb=0; Object.keys({...a,...b}).forEach(c=>{ dot+=(a[c]||0)*(b[c]||0); na+=(a[c]||0)**2; nb+=(b[c]||0)**2; });
  const envies=na&&nb?dot/Math.sqrt(na*nb):0;
  // 2. adresses en commun : part de la plus petite collection déjà partagée
  const adresses=Math.min(1,common.length/Math.min(meP.length,frP.length)*1.2);
  // 3. mêmes verdicts sur les adresses communes (Banger/Validé/Bof)
  const both=common.filter(p=>S.react&&S.react[p]); let verdicts=null;
  if(both.length){ verdicts=both.reduce((s,p)=>s+(1-Math.abs(VERD_N[S.react[p]]-VERD_N[frVerdict(i,p)])/2),0)/both.length; }
  // 4. même budget : écart entre les prix moyens
  const avg=L=>L.reduce((s,p)=>s+PRICE_N(PL(p)),0)/L.length;
  const budget=1-Math.min(1,Math.abs(avg(meP)-avg(frP))/1.5);
  const W={envies:.4,adresses:.25,verdicts:.2,budget:.15}; let sw=0,sc=0;
  const parts={envies,adresses,verdicts,budget}; Object.entries(parts).forEach(([k,v])=>{ if(v!=null){ sc+=v*W[k]; sw+=W[k]; } });
  const raw=sc/sw, conf=Math.min(1,Math.min(meP.length,frP.length)/8);
  const pct=Math.max(5,Math.min(99,Math.round(50+(raw*100-50)*conf)));
  return {pct,common,parts,conf};
}
const compatPct = i => { const k=compatOf(i); return k.pct==null?50:k.pct; };
function topsHTML(own,rankFn,max=4){
  const cats=Object.keys(own).filter(c=>PLAQUE_ART[c]&&own[c].length).sort((a,b)=>own[b].length-own[a].length||a.localeCompare(b)).slice(0,max);
  return cats.map(c=>{ const r=rankFn(c); return `<div class="top"><span class="top__i" style="${ILL[c]?`background-image:url(${IMG[ILL[c]]})`:`background:${TYPO_G[hash(c)%TYPO_G.length]}`}"></span><div class="grow"><b>Top ${esc(c.toLowerCase())}</b><span>${r.slice(0,3).map((p,k)=>`${k+1}. ${esc(PL(p).n)}`).join("  ·  ")}</span></div></div>`; }).join("");
}
function openProfile(){ closeAll(); go("moi"); }
let M_TAB="tops";
function renderMoi(){
  const t=$("#t-moi");
  const L=lvlOf(S.pts), N=nextLvl(S.pts); const pct=N?((S.pts-L.min)/(N.min-L.min)*100):100; const cards=allCards();
  M_TAB=M_TAB||"tops";
  const html=`
  <div class="idc"><div class="idc__top"><img src="${IMG.badge}" alt=""><span>MEMBRE · 2026/2027</span><em>N°${String(1000+hash(S.name||"x")%9000)}</em></div>
    <div class="idc__me"><label class="pf__av pf__av--me" style="${avBg(S.name,"#f6f3ec")}" aria-label="Changer ma photo">${avTxt(S.name)}<input type="file" accept="image/*" id="myph" hidden><span class="pf__cam">${S.photo?"Changer":"+ Photo"}</span></label><div class="grow"><h1>${esc(S.name)}</h1><span>${esc(handle())} · ${esc(S.city)}</span></div></div>
    <div class="idc__st"><div><b>${cards.length}</b><span>cartes</span></div><div><b>${ownedCats().length}</b><span>catégories</span></div><div><b>${FRIENDS.length}</b><span>potes</span></div></div></div>
  <div class="sect" style="padding-top:14px"><button class="lvl" data-ladder style="text-align:left;width:100%"><div class="lvl__top"><div><div class="lvl__n">MES RÉCOMPENSES</div><div class="lvl__t">Ça arrive…</div></div><div class="lvl__pts">${fmtN(S.pts)}<small>POINTS</small></div></div><div class="lvl__next">Voir mes récompenses →</div></button>
    <div style="display:flex;gap:10px;width:100%;margin-top:12px"><button class="btn btn--black" style="flex:1.2" data-sharepf>${icon("share")} Partager</button><button class="btn btn--white" style="flex:1" data-invite>+ Inviter</button></div></div>
  <div class="sect"><div class="seg">${[["tops","Mes tops"],["compat","Compat"],["more","Réglages"]].map(([k,l])=>`<button class="${M_TAB===k?"is-on":""}" data-mt="${k}">${l}</button>`).join("")}</div>
  ${M_TAB==="tops"?`<div class="tops">${topsHTML(S.own,myRank,8)||`<p class="sub">Décroche des cartes pour faire tes tops.</p>`}</div><p class="note" style="margin:0">Zéro étoile chez nous : tu classes tes adresses entre elles.</p>`:""}
  ${M_TAB==="compat"?`<div class="list">${FRIENDS.map((f,i)=>{const k=compatOf(i);return `<button class="li" data-friend="${i}">${avatar(f.n,f.c)}<span class="grow">${esc(f.n)}<small>${k.common.length} adresse${k.common.length>1?"s":""} en commun</small></span><span class="pct"><b>${k.pct}%</b><i style="width:${k.pct}%"></i></span></button>`;}).join("")}</div><button class="btn btn--red btn--block" data-group>On mange où ?</button>`:""}
  ${M_TAB==="more"?`<div class="list">
    <button class="li" data-list="saved"><span class="ic" style="background:var(--jaune)">${icon("bookmark")}</span><span class="grow">À tester<small>${S.saved.length} adresses sauvées</small></span>${icon("back","chev")}</button>
    <button class="li" data-list="print"><span class="ic" style="background:var(--rose)">${icon("box")}</span><span class="grow">Imprimer mes cartes<small>${cards.filter(x=>!isPrinted(x.p)).length} pas encore imprimées</small></span>${icon("back","chev")}</button>
    <button class="li" data-list="creators"><span class="ic" style="background:var(--cyan)">${icon("play")}</span><span class="grow">Créateurs suivis<small>${S.follow.length} créateurs</small></span>${icon("back","chev")}</button>
    <button class="li" data-list="mesure"><span class="ic" style="background:var(--beige)">${icon("check")}</span><span class="grow">Mesure d'audience<small>${S.consent===true?"Activée : merci de nous aider !":"Désactivée"}</small></span><span class="tag ${S.consent===true?"tag--own":""}">${S.consent===true?"Oui":"Non"}</span></button>
  </div>
  <div class="eyebrow" style="margin-top:6px">Démos du prototype</div><div class="list">
    <button class="li" data-demo="notif"><span class="ic" style="background:var(--jaune)">${icon("clock")}</span><span class="grow">Notif de 11h45<small>Le plat du jour de la rédac</small></span>${icon("back","chev")}</button>
    <button class="li" data-onb><span class="ic" style="background:var(--beige)">${icon("star")}</span><span class="grow">Revoir l'accueil</span>${icon("back","chev")}</button>
    <button class="li" data-reset><span class="ic" style="background:var(--beige)">${icon("x")}</span><span class="grow">Remettre la démo à zéro</span>${icon("back","chev")}</button>
  </div><p class="note" style="text-align:center;margin:6px 0 0">Prototype · adresses, créateurs et potes d'exemple · illustrations Champ Magnétique, Clara Biel</p>`:""}
  </div>`;
  t.innerHTML=`<div class="tabpad">${html}</div>`;
  const inp=t.querySelector("#myph"); if(inp) inp.onchange=()=>{ const f=inp.files&&inp.files[0]; if(!f) return; const img=new Image(); const u=URL.createObjectURL(f);
    img.onload=()=>{ const z=240, cv=document.createElement("canvas"); cv.width=cv.height=z; const k=Math.min(img.width,img.height); cv.getContext("2d").drawImage(img,(img.width-k)/2,(img.height-k)/2,k,k,0,0,z,z); S.photo=cv.toDataURL("image/jpeg",.85); save(); URL.revokeObjectURL(u); renderMoi(); toast("Photo ajoutée. Ta bande va te reconnaître !"); };
    img.src=u; };
  t.onclick=e=>{ const b=e.target.closest("button"); if(!b) return;
    if(b.dataset.mt){ M_TAB=b.dataset.mt; renderMoi(); return; }
    if(b.hasAttribute("data-sharepf")) openSharePf();
    else if(b.hasAttribute("data-invite")) openInvite();
    else if(b.dataset.friend) openFriend(+b.dataset.friend);
    else if(b.hasAttribute("data-group")) openGroup();
    else if(b.hasAttribute("data-ladder")) openLadder();
    else if(b.dataset.list==="saved") openSaved();
    else if(b.dataset.list==="print") openShop();
    else if(b.dataset.list==="creators") openCreatorsList();
    else if(b.dataset.list==="mesure"){ TRK.setConsent(S.consent!==true); renderMoi(); toast(S.consent?"Mesure activée. Merci !":"Mesure désactivée."); }
    else if(b.dataset.demo==="insta") openInstaDemo();
    else if(b.dataset.demo==="verif") openVerif();
    else if(b.dataset.demo==="notif"){ closeAll(); notifMock.done=false; notifMock(); }
    else if(b.hasAttribute("data-onb")) startOnb();
    else if(b.hasAttribute("data-reset")) confirmReset(); };
}
// ---------- MES RÉCOMPENSES : pas encore dévoilées → grosse animation + blague ----------
const RW_JOKES=[
  "On a demandé au chef quand c'est prêt. Il a répondu « oui chef ». On n'a pas compris non plus.",
  "Le chef a dit 18 h de mijotage minimum. Comme le bouillon. Ça vaut le coup, promis.",
  "Tes récompenses sont au four. Ouvre pas la porte, ça fait retomber le soufflé.",
  "La rédac goûte chaque récompense avant de la valider. Elle a un peu trop goûté. On recommence.",
  "C'est comme le resto du moment : liste d'attente. Mais toi t'es devant, t'inquiète.",
  "Spoiler : y aura à manger. On n'en dira pas plus.",
  "La pâte lève. 72 h, comme la pizza. On touche pas.",
  "Le serveur arrive. Il a dit « j'arrive » il y a 20 minutes, mais il arrive."
];
function openRewards(){
  const L=lvlOf(S.pts), N=nextLvl(S.pts); let j=0;
  const d=pushLayer(`<div class="rw"><div class="reveal__burst" style="top:44%"></div>
    <button class="iconbtn rw__x" data-x aria-label="Fermer">${icon("x")}</button>
    <span class="reveal__kicker">Mes récompenses</span>
    <div class="rw__pts"><b id="rwn">0</b><small>POINTS AU CHAUD</small></div>
    <div class="rw__stage" id="rwst">
      <div class="rw__steam"><i></i><i></i><i></i></div>
      <svg class="rw__svg" viewBox="0 0 260 200" aria-hidden="true">
        <g class="rw__peek"><rect x="88" y="118" width="84" height="40" rx="8" fill="#FFF8E6" stroke="#111" stroke-width="4" transform="rotate(-6 130 138)"/><text x="130" y="144" text-anchor="middle" transform="rotate(-6 130 138)" style="font:900 italic 17px var(--f-title)" fill="#E3000F">PAS PRÊT</text></g>
        <ellipse cx="130" cy="176" rx="120" ry="17" fill="#FFF8E6" stroke="#111" stroke-width="5"/>
        <g class="rw__dome">
          <path d="M28 164 Q30 58 130 54 Q230 58 232 164 Z" fill="#FFCE18" stroke="#111" stroke-width="6" stroke-linejoin="round"/>
          <path d="M62 132 Q66 88 108 76" fill="none" stroke="#FFF3B8" stroke-width="10" stroke-linecap="round"/>
          <rect x="20" y="156" width="220" height="16" rx="8" fill="#FFCE18" stroke="#111" stroke-width="5"/>
          <circle cx="130" cy="44" r="13" fill="#E3000F" stroke="#111" stroke-width="5"/>
          <text x="130" y="128" text-anchor="middle" style="font:800 30px var(--f-cond);letter-spacing:.04em" fill="#111">LGU</text>
        </g>
      </svg>
    </div>
    <div class="rw__bar"><i></i></div><div class="rw__pct" id="rwp">Cuisson des récompenses · 0 %</div>
    <p class="rw__joke" id="rwj">${esc(RW_JOKES[j])}</p>
    <div class="rw__btns"><button class="btn btn--block" data-again>Une autre excuse du chef</button><button class="btn btn--white btn--block" data-how>Gagner encore des points</button></div>
    <p class="rw__note">Tout ce que tu gagnes maintenant compte déjà.</p>
  </div>`,"ov",{hideNav:true});
  // points qui défilent
  const n=d.querySelector("#rwn"), t0=performance.now(), D=1300;
  (function step(t){ const k=Math.min(1,(t-t0)/D), e=1-Math.pow(1-k,3); n.textContent=fmtN(Math.round(S.pts*e)); if(k<1&&n.isConnected) requestAnimationFrame(step); })(t0);
  // la cuisson bloque à 99 %
  const p=d.querySelector("#rwp"), pb=d.querySelector(".rw__bar i"); const tm=[]; const T0=performance.now();
  const setP=v=>{ p.textContent="Cuisson des récompenses · "+v+" %"; };
  (function climb(t){ if(!p.isConnected) return; const k=Math.min(1,(t-T0)/1800), v=1+Math.round(98*(1-Math.pow(1-k,2))); setP(v); pb.style.width=v+"%"; if(k<1) requestAnimationFrame(climb); else { let n=0; tm.push(setInterval(()=>{ if(!p.isConnected) return; n++; setP("99,"+String(n).padStart(4,"0")); },700)); } })(T0);
  setTimeout(()=>confetti(60),2300);
  const jk=d.querySelector("#rwj"), st=d.querySelector("#rwst");
  d.onclick=e=>{ const b=e.target.closest("button");
    if(e.target.closest("#rwst")){ st.classList.remove("is-tap"); void st.offsetWidth; st.classList.add("is-tap"); return; }
    if(!b) return;
    if(b.hasAttribute("data-x")){ tm.forEach(clearInterval); popLayer(d); }
    else if(b.hasAttribute("data-again")){ j=(j+1)%RW_JOKES.length; jk.classList.remove("is-new"); void jk.offsetWidth; jk.textContent=RW_JOKES[j]; jk.classList.add("is-new"); st.classList.remove("is-tap"); void st.offsetWidth; st.classList.add("is-tap"); }
    else if(b.hasAttribute("data-how")){ tm.forEach(clearInterval); popLayer(d); openHow(); } };
}
const openLadder = openRewards;
function openFriend(i){
  const f=FRIENDS[i], k=compatOf(i); const own={}; (FR_OWN[i]||[]).forEach(p=>{ const c=PL(p).c; (own[c]=own[c]||[]).push(p); });
  const shared=k.common.map(PL);
  const d=full("",`<div class="pf"><div class="pf__av" style="${avBg(f.n,f.c)}">${avTxt(f.n)}</div><h1 class="h1" style="font-size:32px;text-align:center">${esc(f.n)}</h1><span class="eyebrow">@${norm(f.n)} · ${(FR_OWN[i]||[]).length} cartes</span>
    <div class="compat"><div class="compat__n">${k.pct==null?"?":k.pct}<small>%</small></div><div class="grow"><b>compatibles en bouffe</b><span>${k.pct==null?"Pas encore assez de cartes pour vous comparer.":k.pct>=80?"Vous êtes faits pour manger ensemble.":k.pct>=65?"Bonne entente, quelques débats à prévoir.":k.pct>=50?"Des goûts différents : parfait pour se faire découvrir des adresses.":"Vous allez vous disputer le choix du resto."}</span></div></div>
    ${k.parts?`<div class="cbd">${[["envies","Mêmes envies","les catégories que vous collectionnez"],["adresses","Adresses en commun",`${k.common.length} plaqué${k.common.length>1?"s":""} décroché${k.common.length>1?"s":""} tous les deux`],["verdicts","Mêmes verdicts","vos avis sur les adresses communes"],["budget","Même budget","le prix moyen de vos adresses"]].map(([key,l,sub])=>{ const v=k.parts[key]; return `<div class="cbd__r"><div class="grow"><b>${l}</b><small>${v==null?"pas encore d'avis en commun":sub}</small></div><span class="cbd__b"><i style="width:${v==null?0:Math.round(v*100)}%"></i></span><em>${v==null?"–":Math.round(v*100)+"%"}</em></div>`; }).join("")}${k.conf<1?`<p class="note" style="margin:6px 0 0">Score prudent : il s'affinera quand vous aurez chacun 8 cartes.</p>`:""}</div>`:""}
    <button class="btn btn--red btn--block" data-g>On mange où ? avec ${esc(f.n)}</button></div>
    ${shared.length?`<div class="sect"><div class="sect__h"><h2 class="h2">En commun</h2><span class="eyebrow">${shared.length} ADRESSES</span></div><div class="hscroll">${shared.map(p=>`<button data-pl="${p.id}" style="width:96px">${cardHTML(p.c,{resto:p.n})}</button>`).join("")}</div></div>`:""}
    <div class="sect"><div class="sect__h"><h2 class="h2">Ses tops</h2></div><div class="tops">${topsHTML(own,c=>own[c])}</div></div>
    <div class="sect"><div class="sect__h"><h2 class="h2">Pas encore testé par toi</h2></div><div class="list">${(FR_OWN[i]||[]).filter(p=>!isOwnedPlace(p)).slice(0,4).map(p=>`<button class="li" data-pl="${p}"><span class="ic" style="background:var(--jaune)">${icon("map")}</span><span class="grow">${esc(PL(p).n)}<small>${esc(title(PL(p).c))} · ${fmtD(distM(PL(p)))}</small></span>${icon("back","chev")}</button>`).join("")||`<p class="sub" style="padding:12px">Tu as déjà tout ce qu'elle a. Respect.</p>`}</div></div>`);
  d.querySelector(".full__body").onclick=e=>{ const b=e.target.closest("button"); if(!b) return; if(b.hasAttribute("data-g")) openGroup([i]); if(b.dataset.pl) openPlace(+b.dataset.pl); };
}
function openSharePf(){
  const cards=allCards(); const fan=cards.slice(0,3);
  const d=sheet(`<div class="web"><div class="web__bar"><i></i><i></i><i></i><span>lgu.app/${esc(handle().slice(1))}</span></div>
    <div class="web__body"><img src="${IMG.wordmark}" style="width:96px" alt="Le Guide Ultime"><div class="web__fan">${fan.map((x,k)=>cardHTML(x.c,{resto:PL(x.p).n,style:`transform:rotate(${(k-1)*12}deg)`})).join("")}</div>
      <b class="web__n">${esc(S.name)}</b><span class="eyebrow">${cards.length} cartes · ${ownedCats().length}/93 catégories</span>
      <div class="tops" style="width:100%">${topsHTML(S.own,myRank,2)}</div>
      <span class="web__cta">Teste ta compat avec ${esc(S.name)} →</span></div></div>
    <p class="sub" style="margin:0">Ta page publique : ta collec, tes tops, et un bouton « teste ta compat » qui ramène tes potes sur l'appli.</p>
    <div style="display:flex;gap:10px"><button class="btn btn--white" style="flex:1" data-cp>${icon("copy")} Copier</button><button class="btn" style="flex:1.3" data-bio>Mettre en bio Insta</button></div>`);
  d.querySelector("[data-cp]").onclick=()=>copyText("lgu.app/"+handle().slice(1),"Lien copié");
  d.querySelector("[data-bio]").onclick=()=>copyText("lgu.app/"+handle().slice(1),"Lien copié, colle-le dans ta bio Insta");
}

// ---------- LISTES DES CRÉATEURS ----------
function creatorListsHTML(){ return `<div class="hscroll">${CREATOR_LISTS.map((l,i)=>{ const ids=l.ids.filter(id=>shown(PL(id))); if(ids.length<2) return "";const c=CREATORS[l.cr];return `<button class="clist" data-clist="${i}"><span class="clist__art" style="${l.ill?`background-image:url(${IMG[l.ill]})`:`background:${TYPO_G[0]}`}"><em>${ids.length}</em></span><b>${esc(l.t)}</b><span class="row" style="gap:6px">${avatar(c.n,c.c).replace('class="avatar "','class="avatar" style="width:20px;height:20px;font-size:9px"')}@${esc(c.h)}</span></button>`;}).join("")}</div>`; }
function applyCreatorList(i){ const l=CREATOR_LISTS[i]; applyQ({label:`${l.t} · @${CREATORS[l.cr].h}`,ids:l.ids.filter(id=>shown(PL(id))),ranked:true}); }

// ---------- DÉMO INSTA : commente CARTE ----------
function openInstaDemo(){
  const p=PLACES.find(x=>x.c==="Ramen")||PL(S.booster.ids[0]??0);
  const d=pushLayer(`<div class="ig"><div class="ig__bar"><button class="iconbtn" data-x aria-label="Fermer" style="box-shadow:none">${icon("back")}</button><b>Instagram</b><span class="ed" style="margin-left:auto">DÉMO</span></div><div class="ig__body" id="igb"></div></div>`,"ov",{hideNav:true});
  const igb=d.querySelector("#igb");
  const post=()=>{ igb.innerHTML=`<div class="ig__head"><img src="${IMG.badge}" alt=""><b>leguideultime</b><span>Paris 11e</span></div>
    <div class="ig__media" style="background-image:url(${IMG[ILL[p.c]]||IMG.c03})"><span class="ig__play">${icon("play")}</span><span class="ig__cap">${esc(title(p.c).toUpperCase())} ${p.city==="Paris"?"DE PARIS":"À "+esc(p.city.toUpperCase())} ?</span></div>
    <div class="ig__txt"><b>leguideultime</b> ${esc(motFor(p))} <b>Commente CARTE</b> et on t'envoie l'adresse en DM 👇</div>
    <div class="ig__com" id="igc"><div><b>ines.mange</b> CARTE</div><div><b>malik_75</b> CARTE 🔥</div><div><b>jadeeee</b> on y va samedi @theo</div></div>
    <div class="ig__in"><span>${esc(handle().slice(1))}</span><button class="btn btn--sm" data-com>Commenter « CARTE »</button></div>`; };
  const dm=()=>{ igb.innerHTML=`<div class="ig__dmh"><img src="${IMG.badge}" alt=""><b>leguideultime</b></div><div class="dm"><div class="dm__b">Yo ${esc(S.name)} ! Voilà l'adresse du ramen 🍜</div><div class="dm__b dm__card"><div style="width:64px">${cardHTML(p.c,{resto:p.n})}</div><div class="grow"><b>${esc(p.n)}</b><span>${esc(title(p.c))} · ${esc(where(p))}</span><span class="dm__link">lgu.app/p/kintsugi</span></div></div><div class="dm__b">On te l'a mis direct dans « À tester ». Et si tu y vas, scanne la plaque : la carte est à toi.</div></div><button class="btn btn--red btn--block" data-open style="margin-top:auto">Ouvrir dans l'appli</button>`; };
  post();
  d.onclick=e=>{ const b=e.target.closest("button"); if(!b) return;
    if(b.hasAttribute("data-x")) popLayer(d);
    else if(b.hasAttribute("data-com")){ d.querySelector("#igc").insertAdjacentHTML("beforeend",`<div class="is-me"><b>${esc(handle().slice(1))}</b> CARTE</div>`); b.disabled=true; b.textContent="Envoyé"; setTimeout(()=>{ toast("leguideultime t'a envoyé un message"); dm(); },1100); }
    else if(b.hasAttribute("data-open")){ if(!S.saved.includes(p.id)) S.saved.push(p.id); save(); closeAll(); go("map"); selectPlace(p.id); setTimeout(()=>toast("Kintsugi Ramen ajouté à « À tester »"),400); } };
}


// =========================================================
// TA BANDE : fil des potes, avis, compat, ajout de potes
// =========================================================
const VERDICTS=["Banger","Banger","Validé","Validé","Bof"];
const SUGG=[{n:"Manon",c:"#FFD8B0",mut:"Adélie"},{n:"Opa",c:"#D7F5A8",mut:"Roch"}];
// potes ajoutés pendant la démo : on les recrée au chargement
(S.added||[]).forEach(a=>{ if(PH[a.n]&&!FRIENDS.some(f=>f.n===a.n)) addFriendData(a); });
function addFriendData(a){ const i=FRIENDS.length; FRIENDS.push({n:a.n,c:a.c,k:6+hash(a.n)%20,w:0}); const R=rng(hash(a.n)); const pool=PLACES.filter(p=>p.city==="Paris"&&PLAQUE_ART[p.c]); FR_OWN[i]=[...Array(10)].map(()=>pool[Math.floor(R()*pool.length)].id).filter((v,k,s)=>s.indexOf(v)===k); return i; }
const frVerdict = (i,pid) => VERDICTS[hash(FRIENDS[i].n+pid)%VERDICTS.length];
function frRank(i,pid){ const c=PL(pid).c; const l=(FR_OWN[i]||[]).filter(p=>PL(p).c===c); return l.indexOf(pid)+1; }
const bandOn = pid => FRIENDS.some((f,i)=>(FR_OWN[i]||[]).includes(pid));
const bandLiked = pid => FRIENDS.some((f,i)=>(FR_OWN[i]||[]).includes(pid)&&frVerdict(i,pid)!=="Bof");
function bandNotesHTML(pid){
  const L=FRIENDS.map((f,i)=>({f,i})).filter(o=>(FR_OWN[o.i]||[]).includes(pid)); if(!L.length) return "";
  return `<div class="bn"><div class="sect__h"><span class="h3">Ce qu'en pense ta bande</span><span class="eyebrow">${L.length} AVIS</span></div>${L.map(({f,i})=>{const v=frVerdict(i,pid), r=frRank(i,pid); return `<button class="bn__r" data-friend="${i}">${avatar(f.n,f.c)}<span class="grow"><b>${esc(f.n)}</b><span>${r?`N°${r} de ses ${esc(PL(pid).c.toLowerCase())}${/[sx]$/.test(PL(pid).c)?"":"s"}`:""}</span></span><span class="vtag vtag--${norm(v)}">${v}</span></button>`;}).join("")}</div>`;
}
function feedItems(){
  const it=[]; FRIENDS.forEach((f,i)=>(FR_OWN[i]||[]).filter(pid=>PL(pid)&&PLAQUE_ART[PL(pid).c]).slice(0,4).forEach((pid,k)=>it.push({i,pid,h:k*9+i*2+1,vid:(hash(f.n+pid)%3===0)})));
  const seen=new Set(); return it.sort((a,b)=>a.h-b.h).filter(x=>!seen.has(x.pid)&&seen.add(x.pid)).slice(0,14);
}
const ago = h => h<24?`il y a ${h} h`:`il y a ${Math.floor(h/24)} j`;

function feedItemHTML(x){const f=FRIENDS[x.i], p=PL(x.pid), v=frVerdict(x.i,x.pid), r=frRank(x.i,x.pid), saved=S.saved.includes(p.id), lk=(S.likes||[]).includes(x.i+"-"+p.id);
      return `<article class="fi"><div class="fi__h">${avatar(f.n,f.c)}<span class="grow"><b>${esc(f.n)}</b> a décroché <b>${esc(p.n)}</b><small>${ago(x.h)} · ${esc(where(p))}</small></span></div>
      <button class="fi__body" data-place="${p.id}"><div class="fi__card">${cardHTML(p.c,{resto:p.n})}${x.vid?`<span class="fi__vid">${icon("play")} verdict</span>`:""}</div><div class="grow"><span class="vtag vtag--${norm(v)}">${v}</span><div class="fi__rk">${r?`N°${r} de ses ${esc(p.c.toLowerCase())}${/[sx]$/.test(p.c)?"":"s"}`:""}</div><p>${esc(title(p.c))}${isOwnedPlace(p.id)?" · t'y es allé aussi":""}</p></div></button>
      <div class="fi__a"><button class="${lk?"is-on":""}" data-like="${x.i}-${p.id}">${icon("flame")} ${lk?"Chaud":"Ça donne envie"}</button><button class="${saved?"is-on":""}" data-save="${p.id}">${icon(saved?"bookmark-f":"bookmark")} ${saved?"Sauvé":"À tester"}</button></div></article>`;}
function bandeClick(t,e){ const b=e.target.closest("button"); if(!b) return;
    if(b.hasAttribute("data-allfeed")) openFeed();
    else if(b.hasAttribute("data-add")) openAddFriends();
    else if(b.hasAttribute("data-group")) openGroup();
    else if(b.dataset.friend) openFriend(+b.dataset.friend);
    else if(b.dataset.addname) addFriend(b.dataset.addname);
    else if(b.dataset.place) openPlace(+b.dataset.place);
    else if(b.dataset.like){ S.likes=S.likes||[]; const k=b.dataset.like, i=S.likes.indexOf(k); if(i>=0) S.likes.splice(i,1); else S.likes.push(k); save(); b.classList.toggle("is-on"); b.innerHTML=icon("flame")+(i>=0?" Ça donne envie":" Chaud"); }
    else if(b.dataset.save){ const id=+b.dataset.save, i=S.saved.indexOf(id); if(i>=0) S.saved.splice(i,1); else S.saved.push(id); save(); $$(`[data-save="${id}"]`,t).forEach(x=>{ x.classList.toggle("is-on",i<0); x.innerHTML=icon(i<0?"bookmark-f":"bookmark")+(i<0?" Sauvé":" À tester"); }); toast(i<0?"Ajouté à « À tester »":"Retiré de « À tester »"); } }
// spots en commun : les plaqués que plusieurs potes (et toi) ont décrochés
function commonSpots(){
  const cnt={}; FRIENDS.forEach((f,i)=>(FR_OWN[i]||[]).forEach(pid=>{ (cnt[pid]=cnt[pid]||[]).push(i); }));
  return Object.entries(cnt).map(([pid,fr])=>({p:PL(+pid),fr,me:isOwnedPlace(+pid)})).filter(o=>o.p&&PLAQUE_ART[o.p.c]&&(o.fr.length+(o.me?1:0))>=2).sort((a,b)=>(b.fr.length+(b.me?1:0))-(a.fr.length+(a.me?1:0))).slice(0,8);
}
function renderPotes(){
  const t=$("#t-potes"); const F=feedItems(); const SP=commonSpots();
  t.innerHTML=`<div class="tabpad bande">
  <div class="bh"><div><span class="ed">Ma bande · ${FRIENDS.length} potes</span><h1 class="h1 outline" style="margin-top:8px;font-size:44px">Ma bande</h1></div><button class="addf" data-add aria-label="Ajouter des potes">${icon("user")}<b>+</b></button></div>
  <div class="sect" style="padding-top:6px"><div class="sect__h"><h2 class="h2">T'es compatible avec qui ?</h2></div>
    <p class="crew__hint" style="margin:-4px 0 10px">On compare vos cartes et vos tops : plus le % est haut, plus vous aimez les mêmes adresses.</p><div class="crew">${FRIENDS.map((f,i)=>`<button class="crew__m" data-friend="${i}" style="--p:${compatPct(i)}"><span class="crew__av" style="${avBg(f.n,f.c)}">${avTxt(f.n)}</span><b>${esc(f.n)}</b><em>${(k=>k.pct==null?"?":k.pct)(compatOf(i))} %</em></button>`).join("")}<button class="crew__m crew__m--add" data-add><span class="crew__av">+</span><b>Ajouter</b><em>&nbsp;</em></button></div>
    <p class="crew__hint">Touche un pote pour voir ce que vous avez en commun.</p></div>
  <div class="sect"><button class="omo" data-group><div class="omo__stack">${(S.booster.ids.length?S.booster.ids:[0,1,2].filter(PL)).slice(0,3).map((id,k)=>cardHTML(PL(id).c,{resto:PL(id).n,style:`transform:rotate(${(k-1)*10}deg)`})).join("")}</div><div class="grow"><b>On mange où ?</b><span>Chacun swipe, l'appli tranche. Fini les 40 messages.</span><span class="omo__go">Lancer une partie →</span></div></button></div>
  <div class="sect"><div class="sect__h"><h2 class="h2">Cette semaine</h2><span class="eyebrow">${F.length} NOUVEAUTÉS</span></div>
    <div class="list wk">${F.slice(0,5).map(x=>{const f=FRIENDS[x.i], p=PL(x.pid), v=frVerdict(x.i,x.pid); return `<button class="li wk__r" data-place="${p.id}">${avatar(f.n,f.c)}<span class="grow"><b>${esc(f.n)}</b> a décroché <b>${esc(p.n)}</b><small>${ago(x.h)} · ${esc(p.c)}</small></span><span class="vtag vtag--${norm(v)}">${v}</span><span class="wk__c">${cardHTML(p.c,{resto:p.n})}</span></button>`;}).join("")}</div>
    <button class="btn btn--white btn--block" data-allfeed style="margin-top:12px">Voir tout le fil →</button></div>
  ${SP.length?`<div class="sect"><div class="sect__h"><h2 class="h2">Vos spots en commun</h2><span class="eyebrow">VALIDÉ PAR LA BANDE</span></div>
    <div class="hscroll spots">${SP.map(o=>`<button class="spot" data-place="${o.p.id}"><span class="spot__c">${cardHTML(o.p.c,{resto:o.p.n})}</span><span class="avs">${o.me?avatar(S.name,"var(--jaune)"):""}${o.fr.slice(0,3).map(i=>avatar(FRIENDS[i].n,FRIENDS[i].c)).join("")}</span><b>${esc(o.p.n)}</b><small>${o.fr.length+(o.me?1:0)} de la bande y sont allés</small></button>`).join("")}</div></div>`:""}
  <div class="sect"><div class="sect__h"><h2 class="h2">Tu les connais peut-être</h2></div><div class="hscroll">${SUGG.filter(s=>!FRIENDS.some(f=>f.n===s.n)).slice(0,4).map(s=>`<div class="sugg">${avatar(s.n,s.c)}<b>${esc(s.n)}</b><span>Ami·e de ${esc(s.mut)}</span><button class="btn btn--sm" data-addname="${esc(s.n)}">Ajouter</button></div>`).join("")||`<p class="sub">T'as ajouté tout le monde. Respect.</p>`}</div></div>
  </div>`;
  t.onclick=e=>bandeClick(t,e);
}
function openFeed(){
  const d=full("Ce que teste ta bande",`<div class="feed" style="padding:8px 16px 40px">${feedItems().map(feedItemHTML).join("")}</div>`);
  d.querySelector(".full__body").onclick=e=>{ const b=e.target.closest("button"); if(b&&b.dataset.place){ popLayer(d); openPlace(+b.dataset.place); return; } bandeClick(d,e); };
}
function addFriend(n,after){
  const s=SUGG.find(x=>x.n===n)||{n,c:"#FFE27A"}; if(FRIENDS.some(f=>f.n===n)) return;
  S.added=S.added||[]; S.added.push({n:s.n,c:s.c}); save(); const i=addFriendData(s);
  const d=pushLayer(`<div class="lu" style="background:var(--noir)"><span class="reveal__kicker">Calcul de votre compatibilité…</span><div class="cbig">${avatar(S.name,"var(--jaune)")}<span class="cbig__n" id="cn">0</span>${avatar(s.n,s.c)}</div><h2 class="lu__t" id="ct" style="opacity:0">${esc(s.n)} et toi</h2><p class="scan__p" id="cp" style="opacity:0;position:relative"></p><button class="btn btn--block" data-ok style="position:relative">Voir sa collec</button><button class="btn btn--ghost" data-close style="color:#B9AC94;position:relative">Fermer</button></div>`,"ov",{hideNav:true});
  d.style.zIndex=95;
  const target=compatPct(i); let v=0; const iv=setInterval(()=>{ v=Math.min(target,v+3); const el=d.querySelector("#cn"); if(el) el.textContent=v+"%"; if(v>=target){ clearInterval(iv); d.querySelector("#ct").style.opacity=1; const p=d.querySelector("#cp"); p.style.opacity=1; p.textContent=target>80?"Vous êtes faits pour manger ensemble.":target>65?"Bonne entente, quelques débats sur le sucré.":"Vous allez vous disputer le choix du resto."; confetti(120); } },30);
  d.onclick=e=>{ const b=e.target.closest("button"); if(!b) return; clearInterval(iv); popLayer(d); if(b.hasAttribute("data-ok")) openFriend(i); if(after) after(); else if(TAB==="potes") renderPotes(); };
  toast(`${esc(s.n)} ajouté·e à ta bande`);
}
function qrSVG(seed){ const R=rng(hash(seed)); let cells=""; for(let y=0;y<21;y++)for(let x=0;x<21;x++){ const fin=(a,b)=>x>=a&&x<a+7&&y>=b&&y<b+7; let on; if(fin(0,0)||fin(14,0)||fin(0,14)){ const lx=x%14===x?x:x-14, ly=y%14===y?y:y-14, ax=Math.min(lx,6-lx), ay=Math.min(ly,6-ly); on=Math.min(ax,ay)!==1; } else on=R()<.48; if(on) cells+=`<rect x="${x}" y="${y}" width="1" height="1"/>`; } return `<svg viewBox="0 0 21 21" shape-rendering="crispEdges" fill="#111">${cells}</svg>`; }
function openAddFriends(tab="search"){
  const link="lgu.app/"+handle().slice(1);
  const d=sheet(`<div class="h2">Ajoute tes potes</div><div class="seg" id="aft"><button data-t="search">Chercher</button><button data-t="code">Mon code</button><button data-t="contacts">Contacts</button></div><div id="afb" style="display:flex;flex-direction:column;gap:12px"></div>`);
  const afb=d.querySelector("#afb");
  const draw=()=>{ $$("#aft button",d).forEach(b=>b.classList.toggle("is-on",b.dataset.t===tab));
    if(tab==="search"){ afb.innerHTML=`<input id="afq" class="bigin" style="font-size:18px;padding:13px 14px" placeholder="Un prénom ou un @" autocomplete="off"><div class="list" id="afr"></div><button class="link" data-cp>${icon("copy")} <span>Ou envoie ton lien : <b>${esc(link)}</b></span></button>`;
      const q=afb.querySelector("#afq"), r=afb.querySelector("#afr");
      const res=()=>{ const v=norm(q.value); const L=SUGG.filter(s=>!v||norm(s.n).includes(v)); r.innerHTML=L.map(s=>{const has=FRIENDS.some(f=>f.n===s.n);return `<div class="li">${avatar(s.n,s.c)}<span class="grow">${esc(s.n)}<small>@${norm(s.n)} · ami·e de ${esc(s.mut)}</small></span>${has?`<span class="tag tag--own">✓ Dans ta bande</span>`:`<button class="btn btn--sm" data-addname="${esc(s.n)}">Ajouter</button>`}</div>`;}).join("")||`<div class="li">Personne à ce nom. Envoie-lui ton lien !</div>`; };
      q.oninput=res; res(); }
    if(tab==="code"){ afb.innerHTML=`<div class="mycode"><div class="qr" style="width:180px;height:180px">${qrSVG(link)}</div><b>${esc(handle())}</b><span>Fais scanner ce code à ton pote : il t'ajoute en une seconde.</span></div><div style="display:flex;gap:10px"><button class="btn btn--white" style="flex:1" data-cp>${icon("copy")} Copier le lien</button><button class="btn" style="flex:1" data-scanq>Scanner un code</button></div>`; }
    if(tab==="contacts"){ afb.innerHTML=S.friendsFound?`<div class="list">${SUGG.slice(0,4).map(s=>{const has=FRIENDS.some(f=>f.n===s.n);return `<div class="li">${avatar(s.n,s.c)}<span class="grow">${esc(s.n)}<small>Dans tes contacts · déjà sur LGU</small></span>${has?`<span class="tag tag--own">✓</span>`:`<button class="btn btn--sm" data-addname="${esc(s.n)}">Ajouter</button>`}</div>`;}).join("")}</div>`
      :`<div class="rgpd"><span class="eyebrow">Pourquoi on te demande tes contacts</span><p>Pour te montrer <b>qui de tes potes est déjà là</b>. Les numéros sont transformés en empreintes chiffrées <b>sur ton tel</b>, jamais envoyés en clair. Celles des non-inscrits sont <b>effacées tout de suite</b>.</p></div><button class="btn btn--black btn--block" data-contacts>Trouver mes potes</button>`; }
  };
  draw();
  d.querySelector(".sheet__body").onclick=e=>{ const b=e.target.closest("button"); if(!b) return;
    if(b.dataset.t){ tab=b.dataset.t; draw(); }
    else if(b.dataset.addname){ addFriend(b.dataset.addname,()=>{ draw(); if(TAB==="potes") renderPotes(); }); }
    else if(b.hasAttribute("data-cp")) copyText(link,"Lien copié : envoie-le à tes potes");
    else if(b.hasAttribute("data-scanq")) toast("Dans l'appli, ça ouvre l'appareil photo pour scanner son code");
    else if(b.hasAttribute("data-contacts")){ S.friendsFound=true; save(); draw(); toast("4 de tes contacts sont déjà sur LGU"); } };
}

// ---------- envies façon Uber Eats ----------
const POP=["Burger","Pizza","Sushi","Ramen","Kebab","Tacos","Poulet frit","Brunch","Pho","Bobun","Banh mi","Xiao long bao","Pad thaï","Frites","Falafels","Naan","Couscous","Crêpes","Glace","Flan","Cookie","Coffeeshop","Bar à cocktails","Étoilé"];
function ueTile(c,on){ const ill=ILL[c]||PLAQUE_ART[c]; return `<button class="ue ${on?"is-on":""}" data-cat="${esc(c)}"><span class="ue__c" style="${ill?`background-image:url(${IMG[ill]})`:`background:${TYPO_G[hash(c)%TYPO_G.length]}`}">${ill?"":`<b>${esc(c.split(" ")[0])}</b>`}<i>${icon("check")}</i></span><span class="ue__l">${esc(c)}</span></button>`; }

// =========================================================
// ACCUEIL (3 écrans)
// =========================================================
const ONB=["splash","name","envies","bande"];
let O=0, OD=null, ONB_ALL=false;
function startOnb(){ closeAll(); O=0; ONB_ALL=false; if(OD) OD.remove(); OD=document.createElement("div"); OD.className="onb"; $("#app").appendChild(OD); $("#nav").classList.add("is-hidden"); drawOnb(); }
function endOnb(){ S.onb=true; save(); if(OD){ OD.remove(); OD=null; } $("#nav").classList.remove("is-hidden"); go("map"); setTimeout(notifMock,180000); }
function drawOnb(){
  const step=ONB[O]; let body="", foot="";
  S.cities=S.cities||["Paris"];
  const top = O===0 ? "" : `<div class="onb__top"><button class="iconbtn" data-prev aria-label="Retour">${icon("back")}</button><div class="dots">${[1,2,3].map(i=>`<i class="${i<=O?"on":""}"></i>`).join("")}</div><button class="skip" data-end>Passer</button></div>`;
  if(step==="splash"){
    body=`<div class="splash"><div class="splash__fan">${cardHTML("Kebab",{resto:"La Broche 96"})}${cardHTML("Xiao long bao",{resto:"Les raviolis de Mimi",cls:"is-live"})}${cardHTML("Frites",{resto:"Chez Maé"})}</div><img class="splash__logo" src="${IMG.badge}" alt="LGU"><h1 class="splash__t">Du kebab<br>à l'étoilé</h1><p class="sub" style="color:var(--noir);max-width:30ch">Les meilleures adresses de France, testées par la rédac. Avec ta bande, chez les plaqués, et une carte à collectionner à chaque visite.</p></div>`;
    foot=`<button class="btn btn--black btn--block" data-next>C'est parti</button><button class="btn btn--ghost" data-end>J'ai déjà un compte</button>`;
  }
  if(step==="name"){
    const CS=["Paris","Lyon","Marseille","Bordeaux","Lille","Toulouse","Nantes","Strasbourg","Rennes","Nice","Montpellier","Les Îles"];
    body=`<h1 class="h1 outline">On t'appelle<br>comment ?</h1><input id="onbName" class="bigin" placeholder="Ton prénom" value="${S.name==="Sam"?"":esc(S.name)}" maxlength="18" autocomplete="given-name"><div class="sect__h" style="margin-top:8px"><h2 class="h2">Tu manges où ?</h2><span class="eyebrow">${S.cities.length} CHOISIE${S.cities.length>1?"S":""}</span></div><p class="sub" style="margin-top:-8px">Choisis-en autant que tu veux : ta ville, celle de tes parents, tes week-ends.</p><div class="cities">${CS.map(c=>`<button class="chip ${S.cities.includes(c)?"is-on":""}" data-city="${c}">${S.cities.includes(c)?icon("check").replace("<svg",'<svg style="width:13px;height:13px"'):""}${c}</button>`).join("")}</div>`;
    foot=`<button class="btn btn--black btn--block" data-next ${S.cities.length?"":"disabled"}>Suivant</button>`;
  }
  if(step==="envies"){
    const list = ONB_ALL ? null : POP;
    body=`<h1 class="h1 outline">T'as envie<br>de quoi ?</h1><p class="sub">Touche tout ce qui te fait saliver. On s'en sert pour ta sélection de la semaine.</p>
      ${list?`<div class="uegrid">${list.map(c=>ueTile(c,S.envies.includes(c))).join("")}</div><button class="btn btn--white btn--block" data-all>Voir les 93 catégories</button>`
      :Object.entries(SECT).map(([k,a])=>`<div class="group__h"><b>${SECT_NAME[k]}</b><span>${a.filter(c=>S.envies.includes(c)).length}/${a.length}</span></div><div class="uegrid">${a.map(c=>ueTile(c,S.envies.includes(c))).join("")}</div>`).join("")}`;
    foot=`<button class="btn btn--black btn--block" data-next>${S.envies.length?`Suivant · ${S.envies.length} envie${S.envies.length>1?"s":""}`:"Suivant"}</button>`;
  }
  if(step==="bande"){
    body=`<h1 class="h1 outline">Ramène<br>ta bande</h1><p class="sub">Vois ce que testent tes potes, votre compatibilité en bouffe, et choisissez le resto ensemble.</p>
      <div class="list">${SUGG.slice(0,4).map(s=>{const has=FRIENDS.some(f=>f.n===s.n);return `<div class="li">${avatar(s.n,s.c)}<span class="grow">${esc(s.n)}<small>Déjà sur LGU · ami·e de ${esc(s.mut)}</small></span>${has?`<span class="tag tag--own">✓ Ajouté·e</span>`:`<button class="btn btn--sm" data-addname="${esc(s.n)}">Ajouter</button>`}</div>`;}).join("")}</div>
      <div style="display:flex;gap:10px"><button class="btn btn--white" style="flex:1" data-cp>${icon("copy")} Mon lien</button><button class="btn btn--white" style="flex:1" data-code>Mon QR code</button></div>`;
    foot=`<button class="btn btn--red btn--block" data-end>Voir la carte</button>`;
  }
  OD.innerHTML=`${top}<div class="onb__body" style="${O===0?"padding-top:calc(var(--top) + 10px)":""}">${body}</div><div class="onb__foot">${foot}</div>`;
  OD.onclick=e=>{ const b=e.target.closest("button"); if(!b) return;
    const nm=OD.querySelector("#onbName"); if(nm&&nm.value.trim()) S.name=nm.value.trim();
    if(b.hasAttribute("data-next")){ save(); if(nm&&window.LGU_HOOK_NAME){ LGU_HOOK_NAME(S.name,()=>{ O++; drawOnb(); }); return; } O++; drawOnb(); }
    else if(b.hasAttribute("data-prev")){ O=Math.max(0,O-1); drawOnb(); }
    else if(b.hasAttribute("data-end")) endOnb();
    else if(b.dataset.city){ const c=b.dataset.city, i=S.cities.indexOf(c); if(i>=0) S.cities.splice(i,1); else S.cities.push(c); S.city=S.cities[0]||"Paris"; save(); const sc=OD.querySelector(".onb__body").scrollTop; drawOnb(); OD.querySelector(".onb__body").scrollTop=sc; }
    else if(b.dataset.cat){ const c=b.dataset.cat, i=S.envies.indexOf(c); if(i>=0) S.envies.splice(i,1); else S.envies.push(c); save(); b.classList.toggle("is-on",i<0); const nb=OD.querySelector("[data-next]"); nb.textContent=S.envies.length?`Suivant · ${S.envies.length} envie${S.envies.length>1?"s":""}`:"Suivant"; }
    else if(b.hasAttribute("data-all")){ ONB_ALL=true; drawOnb(); }
    else if(b.dataset.addname){ addFriend(b.dataset.addname,()=>drawOnb()); }
    else if(b.hasAttribute("data-cp")) copyText("lgu.app/"+handle().slice(1),"Lien copié : envoie-le à ta bande");
    else if(b.hasAttribute("data-code")){ const d=sheet(`<div class="mycode"><div class="qr" style="width:180px;height:180px">${qrSVG("lgu.app/"+handle().slice(1))}</div><b>${esc(handle())}</b><span>Fais scanner ce code à ton pote.</span></div>`); d.style.zIndex=95; } };
}

// =========================================================
// DONNÉES : une seule source à alimenter, la liste des plaqués (Google Sheets, Airtable ou CSV)
// Tout le reste (plaqué du jour, sélection de la semaine, listes des créateurs…) se calcule tout seul.
// =========================================================
const DATA={source:"Démo intégrée",url:null,rows:0,ok:0,errors:[],cand:[],hidden:0,loadedAt:null};
const sigOf = L => String(hash(L.map(p=>p.n+"|"+p.c).join(";")));
const DEMO_SIG = sigOf(PLACES);
const COLS={nom:["nom","name","restaurant","resto","etablissement"],categorie:["categorie","category","plaque"],ville:["ville","city"],quartier:["quartier","arrondissement","zone"],adresse:["adresse","address"],coord:["coordonnees","coords","gps","latlng","lat,lng","position"],lat:["lat","latitude"],lng:["lng","lon","long","longitude"],prix:["prix","budget","price"],ferme:["ferme_a","ferme a","fermeture","ferme","horaires"],mot:["mot_de_la_redac","mot de la redac","mot","description","pourquoi"],createurs:["createurs","creators","vu chez","vu_chez"],illustration:["illustration","image","visuel"],date:["date_ajout","date","ajoute le","ajout"],statut:["statut","status","etat"],vocal:["vocal","audio"],signe:["signe_par","signe par","auteur","redac"]};
function parseCSV(txt){
  txt=txt.replace(/^﻿/,""); const first=txt.split(/\r?\n/)[0]||""; const sep=(first.match(/;/g)||[]).length>(first.match(/,/g)||[]).length?";":(first.includes("\t")?"\t":",");
  const rows=[]; let row=[],cell="",q=false;
  for(let i=0;i<txt.length;i++){ const ch=txt[i];
    if(q){ if(ch==='"'){ if(txt[i+1]==='"'){ cell+='"'; i++; } else q=false; } else cell+=ch; }
    else if(ch==='"') q=true; else if(ch===sep){ row.push(cell); cell=""; } else if(ch==="\n"){ row.push(cell); rows.push(row); row=[]; cell=""; } else if(ch!=="\r") cell+=ch; }
  if(cell||row.length){ row.push(cell); rows.push(row); }
  const head=(rows.shift()||[]).map(h=>norm(h).trim().replace(/\s+/g," "));
  const key=h=>{ for(const [k,al] of Object.entries(COLS)) if(al.includes(h)||al.includes(h.replace(/_/g," "))) return k; return null; };
  const keys=head.map(key);
  return rows.filter(r=>r.some(c=>c.trim())).map(r=>{ const o={}; keys.forEach((k,j)=>{ if(k) o[k]=(r[j]||"").trim(); }); return o; });
}
function lev(a,b){ const m=a.length,n=b.length; const d=[...Array(m+1)].map((_,i)=>[i]); for(let j=1;j<=n;j++) d[0][j]=j; for(let i=1;i<=m;i++) for(let j=1;j<=n;j++) d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1)); return d[m][n]; }
function matchCat(v){
  const x=norm(v).trim(); if(!x) return {c:null};
  const strip=s=>s.replace(/^(le |la |les |l')?(meilleur(e)?s? )?/,"").replace(/s$/,"");
  for(const c of ALL){ const y=norm(c); if(y===x||strip(y)===strip(x)||norm(title(c))===x) return {c}; }
  let best=null,bd=99; ALL.forEach(c=>{ const dd=lev(strip(norm(c)),strip(x)); if(dd<bd){bd=dd;best=c;} });
  return bd<=2?{c:best,fixed:true}:{c:null,sug:bd<=4?best:null};
}
function parseCoord(o){
  let lat=parseFloat((o.lat||"").replace(",",".")), lng=parseFloat((o.lng||"").replace(",","."));
  if(isNaN(lat)||isNaN(lng)){ const src=(o.coord||"")+" "+(o.adresse||""); const m=src.match(/@?(-?\d{1,2}[.]\d+)\s*[,;\s]\s*(-?\d{1,3}[.]\d+)/)||src.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/); if(m){ lat=+m[1]; lng=+m[2]; } }
  return isNaN(lat)||isNaN(lng)?null:[lat,lng];
}
const normPrice = v => { const s=(v||"").trim(); if(/^€+$/.test(s)) return s.slice(0,4); const n=parseInt(s)||(s.match(/[$€]/g)||[]).length||2; return "€".repeat(Math.min(4,Math.max(1,n))); };
const COLORS=["#FF99B3","#00DEB5","#6EA5FF","#FFCE18","#FF7A1A","#FF6A6A"];
function creatorIdx(h){ h=h.replace(/^@/,"").trim(); if(!h) return -1; let i=CREATORS.findIndex(c=>c.h.toLowerCase()===h.toLowerCase()); if(i<0){ CREATORS.push({h,n:h.replace(/[._].*/,"").replace(/^./,m=>m.toUpperCase()),c:COLORS[hash(h)%COLORS.length],k:0}); i=CREATORS.length-1; } return i; }
function rowsToPlaces(objs){
  const out=[]; DATA.errors=[]; DATA.cand=[]; DATA.hidden=0;
  objs.forEach((o,r)=>{ const line=r+2, err=m=>DATA.errors.push({line,nom:o.nom||"(sans nom)",m});
    const st=norm(o.statut||"");
    if(/masque|cache|off|ferme definitivement/.test(st)){ DATA.hidden++; return; }
    if(!o.nom){ err("Nom manquant"); return; }
    const mc=matchCat(o.categorie||""); if(!mc.c){ err(o.categorie?`Catégorie « ${o.categorie} » inconnue${mc.sug?` (tu voulais dire « ${mc.sug} » ?)`:""}`:"Catégorie manquante"); return; }
    if(mc.fixed) err(`Catégorie « ${o.categorie} » lue comme « ${mc.c} » (à corriger dans le tableur)`);
    const ll=parseCoord(o); if(!ll){ err("Coordonnées manquantes : sur Google Maps, clic droit sur le resto puis copie les chiffres dans « coordonnees »"); return; }
    const d=o.date?new Date(o.date.split("/").reverse().join("-")):null;
    const p={n:o.nom,c:mc.c,city:o.ville||"France",q:o.quartier||o.ville||"",p:normPrice(o.prix),h:o.ferme||"23h",cr:(o.createurs||"").split(/[,\s]+/).filter(Boolean).map(creatorIdx).filter(i=>i>=0),fr:[],lat:ll[0],lon:ll[1],mot:o.mot||"",addr:o.adresse||"",vocal:o.vocal||"",signe:o.signe||"",isNew:d&&!isNaN(d)&&(Date.now()-d)<30*864e5,img:o.illustration||""};
    if(/candidat/.test(st)){ DATA.cand.push(p); return; }
    out.push(p);
  });
  return out;
}
function applyPlaces(list){
  PLACES.length=0; list.forEach((p,i)=>{ p.id=i; PLACES.push(p); });
  // illustrations fournies dans le tableur : remplacent celles de la catégorie
  PLACES.forEach(p=>{ if(p.img){ const k="x_"+hash(p.c); IMG[k]=p.img; ILL[p.c]=k; } });
  // villes : centre = moyenne des plaqués
  const by={}; PLACES.forEach(p=>(by[p.city]=by[p.city]||[]).push(p));
  Object.entries(by).forEach(([c,a])=>{ if(!CITIES[c]&&!ISLE_LL[c]) CITIES[c]=[a.reduce((s,p)=>s+p.lon,0)/a.length,a.reduce((s,p)=>s+p.lat,0)/a.length]; });
  CITY_W.length=0; Object.entries({...CITIES,...ISLE_LL}).filter(([n])=>by[n]).forEach(([n,[lo,la]])=>CITY_W.push({n,x:wx(lo),y:wy(la)}));
}
function prepGeo(){ PLACES.forEach(p=>{ p.wx=wx(p.lon); p.wy=wy(p.lat); }); }
const weekNo = () => { const d=new Date(); const t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())); const day=t.getUTCDay()||7; t.setUTCDate(t.getUTCDate()+4-day); return t.getUTCFullYear()*100+Math.ceil(((t-Date.UTC(t.getUTCFullYear(),0,1))/864e5+1)/7); };
function autoContent(sig){
  const demo = sig===DEMO_SIG;
  // état de l'utilisateur : on repart à zéro si la liste des plaqués a changé
  if(!demo && S.dataSig!==sig){
    const near=PLACES.slice().sort((a,b)=>distM(a)-distM(b)).slice(0,Math.min(8,Math.max(0,PLACES.length-6)));
    const own={}; near.forEach((p,k)=>{ (own[p.c]=own[p.c]||[]).push({p:p.id,d:new Date(Date.now()-(k+1)*9*864e5).toISOString().slice(0,10)}); });
    Object.assign(S,{own,rank:{},saved:[],printed:[],react:{},likes:[],booster:{ids:[],done:[],week:0},vote:null,dataSig:sig}); save();
  } else if(!S.dataSig){ S.dataSig=sig; save(); }
  // potes de la démo : leurs visites piochées dans la vraie liste
  if(!demo){ Object.keys(FR_OWN).forEach(k=>delete FR_OWN[k]); const pool=PLACES.slice().sort((a,b)=>distM(a)-distM(b)).slice(0,40);
    FRIENDS.forEach((f,i)=>{ const R=rng(hash(f.n+sig)); FR_OWN[i]=[...Array(8)].map(()=>pool[Math.floor(R()*pool.length)]).filter(Boolean).map(p=>p.id).filter((v,k,s)=>s.indexOf(v)===k); });
  }
  PLACES.forEach(p=>{ if(!p.fr||!p.fr.length) p.fr=FRIENDS.map((f,i)=>(FR_OWN[i]||[]).includes(p.id)?i:-1).filter(i=>i>=0).slice(0,3); });
  // sélection de la semaine : 3 plaqués proches, pas encore testés, selon tes envies — recalculée chaque lundi
  const wk=weekNo(); const valid=(S.booster.ids||[]).length===3&&S.booster.ids.every(id=>PL(id)&&shown(PL(id)));
  if(!(demo&&valid&&!S.booster.week) && (S.booster.week!==wk||!valid)){
    const R=rng(wk+hash(S.name||"")); const env=new Set(S.envies||[]);
    const ids=PLACES.filter(p=>shown(p)&&!isOwnedPlace(p.id)).map(p=>({p,s:distM(p)*(env.has(p.c)?.45:1)*(.7+R()*.6)})).sort((a,b)=>a.s-b.s).slice(0,3).map(o=>o.p.id);
    S.booster={ids,done:[],week:wk,opened:true}; save();
  }
  // plaqué du jour : chaque jour un plaqué différent, avec son « mot de la rédac » déjà écrit dans le tableur
  const pool=PLACES.filter(p=>shown(p)&&(p.mot||MOTS[p.c])); const L=pool.length?pool:PLACES.filter(shown);
  if(L.length){ const p=L[hash(new Date().toISOString().slice(0,10))%L.length]; PLAT={by:p.signe||"La rédac",pid:p.id,text:p.mot||motFor(p),audio:p.vocal||null}; }
  // vote : uniquement s'il y a des candidats dans le tableur (statut = candidat)
  if(!demo) CANDIDATE = DATA.cand.length ? (()=>{ const c=DATA.cand[hash(String(wk))%DATA.cand.length]; return {n:c.n,c:c.c,q:c.city==="Paris"?"Paris "+c.q:c.city,yes:52+hash(c.n)%40,text:c.mot||`Candidat pour ${title(c.c).toLowerCase()}. Il mérite la plaque ?`}; })() : null;
  // listes des créateurs : générées depuis la colonne « createurs »
  if(!demo){ CREATOR_LISTS.length=0; CREATORS.forEach((c,i)=>{ const ids=PLACES.filter(p=>shown(p)&&p.cr.includes(i)).map(p=>p.id); c.k=Math.max(c.k||0,ids.length); if(ids.length>=2) CREATOR_LISTS.push({cr:i,t:`Les adresses de ${c.n}`,ids,ill:ILL[PL(ids[0]).c]||null}); }); }
}
async function fetchText(u,ms=7000){ const ctl=new AbortController(); const t=setTimeout(()=>ctl.abort(),ms); try{ const r=await fetch(u,{signal:ctl.signal,cache:"no-store"}); if(!r.ok) throw new Error("HTTP "+r.status); return await r.text(); } finally{ clearTimeout(t); } }
function toCsvUrl(u){ if(/\/d\/e\/|output=csv|tqx=out:csv/.test(u)) return u; const m=u.match(/docs\.google\.com\/spreadsheets\/d\/([^/]+)/); if(m){ const g=(u.match(/[#&?]gid=(\d+)/)||[])[1]||"0"; return `https://docs.google.com/spreadsheets/d/${m[1]}/gviz/tq?tqx=out:csv&gid=${g}`; } return u; }
async function loadData(){
  let src=null;
  try{ const cfg=JSON.parse(await fetchText("config.json",4000)); src=cfg.source||null; }catch(e){}
  const tries=[src,"plaques.csv"].filter((v,i,a)=>v&&a.indexOf(v)===i);
  for(const s of tries){
    try{ if(/airtable\.com/.test(s)) throw new Error("Airtable doit passer par une synchro vers Google Sheets ou plaques.csv");
      const objs=parseCSV(await fetchText(toCsvUrl(s))); const list=rowsToPlaces(objs);
      if(!list.length) throw new Error("Aucun plaqué valide");
      applyPlaces(list); DATA.source=/docs\.google/.test(s)?"Google Sheets":s; DATA.url=s; DATA.rows=objs.length; DATA.ok=list.length; DATA.loadedAt=new Date(); break;
    }catch(e){ DATA.errors.push({line:0,nom:s,m:"Source illisible : "+e.message}); }
  }
  if(!DATA.loadedAt){ DATA.rows=PLACES.length; DATA.ok=PLACES.length; }
  prepGeo(); autoContent(sigOf(PLACES));
}
function openVerif(){
  const errs=DATA.errors.filter(e=>e.line>0), src=DATA.errors.filter(e=>e.line===0);
  sheet(`<div class="h2">Vérifier le tableur</div>
  <div class="pstat"><div class="pstat__c"><b>${DATA.ok}</b><span>plaqués en ligne</span></div><div class="pstat__c"><b>${DATA.cand.length}</b><span>candidats (vote)</span></div><div class="pstat__c ${errs.length?"is-todo":""}"><b>${errs.length}</b><span>ligne${errs.length>1?"s":""} à corriger</span></div></div>
  <p class="sub" style="margin:0">Source : <b>${esc(DATA.source)}</b>${DATA.loadedAt?` · lue à ${DATA.loadedAt.toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}`:""}${DATA.hidden?` · ${DATA.hidden} masqué${DATA.hidden>1?"s":""}`:""}</p>
  ${src.length&&!DATA.loadedAt?`<div class="quote"><span class="eyebrow">Tableur non branché</span><p>L'app affiche les adresses de démo. ${esc(src.map(e=>e.m).join(" · "))}</p></div>`:""}
  ${errs.length?`<div class="list">${errs.map(e=>`<div class="li"><span class="ic" style="background:var(--rouge);color:#fff;font:800 14px var(--f-cond)">${e.line}</span><span class="grow">${esc(e.nom)}<small>${esc(e.m)}</small></span></div>`).join("")}</div>`:`<div class="perk" style="background:var(--cyan);color:var(--noir)">${icon("check")}<b style="color:var(--noir)">Tout est bon. Chaque ligne est en ligne.</b></div>`}
  <div class="quote"><span class="eyebrow">Ajouter un plaqué</span><p>Une ligne dans le tableur : nom, catégorie (une des 93), ville, coordonnées (clic droit sur Google Maps). Le reste est facultatif. L'appli se met à jour à la prochaine ouverture.</p></div>`);
}

// =========================================================
// BOOT
// =========================================================
function rerender(){ ({map:refreshMap,collec:renderCollec,potes:renderPotes,moi:renderMoi})[TAB](); }
function boot(){
  document.documentElement.style.setProperty("--grain",`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.86' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.42'/%3E%3C/svg%3E")`); document.documentElement.style.setProperty("--speck",`url(${IMG.paper})`); ["st_lgu","st_plaques","st_rond","st_burger"].forEach(k=>document.documentElement.style.setProperty("--"+k.replace("_","-"),`url(${IMG[k]})`));
  $("#pitchLogo").src=IMG.wordmark;
  $$("[data-jump]").forEach(b=>b.onclick=()=>jump(b.dataset.jump));
  go("map");
  const h=(location.hash||"").slice(1);
  if(h) jump(h); else if(!S.onb) startOnb(); else setTimeout(notifMock,180000);
}
function jump(k){
  if(k!=="notif") notifMock.done=true;
  if(OD && k!=="onb"){ OD.remove(); OD=null; S.onb=true; save(); $("#nav").classList.remove("is-hidden"); }
  closeAll();
  if(k.startsWith("plaque-")){ const id=+k.split("-")[1]; if(PL(id)){ go("map"); openScan(id); } return; }
  switch(k){
    case "onb": startOnb(); break;
    case "search": go("map"); openSearch(); break;
    case "scan": go("map"); openScan(); break;
    case "collec": go("collec"); break;
    case "album": go("collec"); openShop(); break;
    case "moi": go("moi"); break;
    case "potes": go("potes"); break;
    case "stories": notifMock.done=true; go("map"); openStories(0); break;
    case "group": notifMock.done=true; go("map"); openGroup(); break;
    case "insta": notifMock.done=true; go("map"); openInstaDemo(); break;
    case "verif": go("map"); openVerif(); break;
    case "notif": go("map"); notifMock.done=false; notifMock(); break;
    default: go("map");
  }
}
let rz; window.addEventListener("resize",()=>{ clearTimeout(rz); rz=setTimeout(()=>{ if(TAB==="map"){ renderMap(); } },200); });
loadData().catch(e=>console.warn(e)).finally(boot);
