// ============================================================
//  Le Grimoire Culinaire de MaruChiwa — recipes.js
//  window.RECIPES (majuscules) — requis par app.js
// ============================================================

window.RECIPES = {

  // Entrées / Apéro
  vinaigrette: { title:'Vinaigrette de chef (variantes)', categories:['Entrées','Apéro'], seasons:['Toutes saisons'], difficulty:'easy',
    ingredients:[{group:'Base',items:['30 g moutarde de Dijon','45 g vinaigre de vin rouge ou Xérès','2 g sel fin, 1 g poivre','150 g huile (80 g neutre + 70 g olive)','5 g miel (option)']}],
    steps:['Fouetter moutarde + vinaigre + sel/poivre (et miel).','Verser les huiles en filet pour émulsionner.','Goûter et ajuster.'],
    notes:['Ratio huile:acide 3:1 à 4:1 selon la salade.','Variantes : citron, herbes, miso blanc, yaourt grec.','Conservation : 5–7 j au froid.']
  },

  pesto_salades: { title:'Pesto pour salades (froid, citronné)', categories:['Entrées','Apéro'], seasons:['Printemps','Été'], difficulty:'easy',
    ingredients:[{group:'Base',items:["50 g basilic","40 g parmesan 24 mois râpé","30 g pignons grillés","1 gousse d'ail dégermée","45 g huile d'olive","45 g huile neutre (colza/tournesol)","10 g jus de citron","Sel fin, poivre"]}],
    steps:["Mixer basilic + pignons + ail + parmesan.","Monter à l'huile ; détendre avec citron.","Assaisonner."],
    notes:["Noisette ou amandes à la place des pignons.","Conservation : 3–4 j au froid (filmer au contact)."]
  },

  pesto_genovese_hg: { title:'Pesto alla Genovese', categories:['Entrées'], seasons:['Printemps','Été'], difficulty:'medium',
    ingredients:[{group:'Mortier (idéal)',items:["60 g basilic Genovese","30 g pignons","15 g Parmigiano Reggiano (24–30 mois)","15 g Pecorino Sardo","1 petite gousse d'ail","100–120 g huile d'olive EV fruitée","2–3 g sel"]}],
    steps:["Piler ail + sel, ajouter pignons, puis basilic par petites poignées.","Incorporer les fromages, détendre doucement à l'huile jusqu'à texture crémeuse.","Utiliser aussitôt (pâtes, gnocchi) ou filmer au contact."],
    notes:["Mixer : à-coups courts pour limiter l'oxydation.","Conservation : 2–3 j au froid, film au contact + fine couche d'huile."]
  },

  ricotta_fouettee: { title:'Ricotta fouettée (assaisonnements)', categories:['Entrées','Apéro'], seasons:['Toutes saisons'], difficulty:'easy',
    ingredients:[{group:'Base',items:["250 g ricotta de qualité","30 g crème 35 %","Sel fin, poivre"]}],
    steps:["Fouetter 2–3 min ricotta + crème jusqu'à lisse et aérée ; assaisonner."],
    notes:["Zaatar + huile d'olive ; Citron confit + aneth ; Miel + piment d'Espelette ; Truffe : 1–2 % huile de truffe.","Conservation : 2–3 j au froid."]
  },

  balsamique_reduit: { title:'Balsamique réduit (variantes)', categories:['Entrées','Apéro'], seasons:['Toutes saisons'], difficulty:'easy',
    ingredients:[{group:'Base',items:["250 g vinaigre balsamique IGP","25–50 g sucre (au goût)"]}],
    steps:["Mijoter 12–20 min à feu doux jusqu'à nappant (réduction 1/2–2/3)."],
    notes:["Variantes : zeste d'orange, vanille, cacao, espresso, figue (filtrer).","Conservation : 2–3 mois au froid."]
  },

  tomates_sechees: { title:'Tomates séchées (four doux)', categories:['Entrées','Apéro'], seasons:['Été','Automne'], difficulty:'easy',
    ingredients:[{group:'Base',items:["1 kg tomates Roma","Sel fin","Huile d'olive","Thym"]}],
    steps:['Couper en 2, épépiner légèrement.',"Saler, thym, four 90–100 °C 2h30–3h.",'Conserver couvert d\'huile.'],
    notes:['Parfait pour antipasti, salades, pâtes froides.','Conservation : 2–3 semaines au froid sous huile.']
  },

  tomates_confites: { title:'Tomates confites (huile/ail)', categories:['Entrées','Apéro'], seasons:['Été','Automne'], difficulty:'easy',
    ingredients:[{group:'Base',items:["1 kg tomates cerises","6 g sel","3 g sucre","4 gousses d'ail","Branches de thym","Huile d'olive"]}],
    steps:["Four 120 °C 1h30–2h avec ail et thym, arroser d'huile.",'Refroidir et conserver au froid sous huile.'],
    notes:['Excellent en bruschetta / salade de pâtes.','Conservation : 6–7 j au froid sous huile.']
  },

  huile_pimentee_pizza: { title:'Huile pimentée pour pizza (variantes)', categories:['Entrées','Plats'], seasons:['Toutes saisons'], difficulty:'easy',
    ingredients:[{group:'Base',items:["250 g huile d'olive","4 piments secs","1 gousse d'ail écrasée","Zeste de 1/2 citron (option)"]}],
    steps:["Chauffer 60–70 °C 10 min avec piments + ail + zeste, couvrir et infuser 24 h.","Filtrer."],
    notes:['Variantes : poivre de Sichuan, origan, paprika fumé.','Conservation : 1 mois au froid.']
  },

  legumes_rotis: { title:'Légumes rôtis au four', categories:['Entrées','Plats'], seasons:['Toutes saisons'], difficulty:'easy',
    ingredients:[{group:'Temps de cuisson — chaleur tournante 200 °C',items:[
      'Pomme de terre (dés 2–3 cm) — 35–45 min','Patate douce (dés 2–3 cm) — 25–35 min','Carotte (bâtonnets) — 22–30 min','Panais (bâtonnets) — 25–35 min','Betterave (dés 2–3 cm) — 35–45 min','Céleri-rave (dés 2–3 cm) — 30–40 min','Courge / butternut (dés 2–3 cm) — 25–35 min','Brocoli (fleurettes) — 15–20 min','Chou-fleur (fleurettes) — 20–25 min','Choux de Bruxelles (moitiés) — 20–25 min','Poivron (lanières) — 20–25 min','Courgette (quartiers) — 18–22 min','Aubergine (dés 2–3 cm) — 25–35 min','Oignon (quartiers) — 25–30 min','Fenouil (quartiers) — 25–35 min','Poireau (tronçons 3–4 cm) — 20–25 min','Asperges (grosses, parées) — 10–14 min','Champignons (gros quartiers) — 12–18 min','Tomate (demies Roma) — 20–25 min','Haricots verts (secs et parés) — 12–15 min'
    ]}],
    steps:["Four 200 °C chaleur tournante. Assaisonner, étaler, rôtir jusqu'à coloration et tendreté."],
    notes:['Plaque préchauffée = croûte plus nette.','Conservation : 4 j au réfrigérateur.']
  },

  marinades_guide: { title:'Marinades — 10 signatures', categories:['Entrées','Plats'], seasons:['Toutes saisons'], difficulty:'easy',
    ingredients:[
      {group:'1) Méditerranéenne',items:["40 g huile d'olive","20 g jus de citron","2 g zeste","2 g origan","2 g ail râpé","Sel/poivre"]},
      {group:'2) Teriyaki rapide',items:['40 g sauce soja','20 g mirin','10 g sucre','10 g vinaigre de riz','2 g gingembre','1 g ail']},
      {group:'3) Tandoori yaourt',items:['100 g yaourt grec','6 g pâte tandoori ou 4 g garam masala','5 g jus de citron','2 g ail','2 g gingembre','Sel']},
      {group:'4) BBQ fumé',items:['40 g ketchup','20 g sauce soja','10 g miel','10 g vinaigre de cidre','2 g paprika fumé','1 g ail']},
      {group:'5) Chermoula',items:["40 g huile d'olive","20 g jus de citron","10 g coriandre hachée","10 g persil","2 g cumin","1 g paprika","1 g ail"]},
      {group:'6) Citron-herbes volaille',items:['40 g huile neutre','20 g jus de citron','5 g moutarde','herbes fraîches','Sel/poivre']},
      {group:'7) Porc miel-moutarde',items:['40 g miel','20 g moutarde','10 g sauce soja','10 g vinaigre','1 g ail']},
      {group:'8) Mexicaine',items:['40 g huile','20 g jus de citron vert','2 g cumin','2 g paprika','1 g piment','1 g ail']},
      {group:'9) Thaï citronnelle',items:['40 g huile','10 g nuoc-mâm','10 g jus de citron vert','2 g citronnelle hachée','1 g sucre','piment']},
      {group:'10) Légumes balsamique',items:["40 g huile d'olive","20 g balsamique","2 g miel","1 g ail","Thym"]}
    ],
    steps:['Mariner 30 min (poisson/crevettes), 2–4 h (volaille), 6–12 h (porc/boeuf). Égoutter avant cuisson forte.'],
    notes:['Ne pas réutiliser la marinade crue ; porter à ébullition si sauce.','Conservation : marinades prêtes 7 j au froid.']
  },

  cookies_sales_jambon_fromage: { title:'Cookies salés jambon & fromage', categories:['Entrées','Apéro'], seasons:['Toutes saisons'], difficulty:'easy',
    yield:'18–20 pièces',
    ingredients:[{group:'Appareil',items:['150 g farine','100 g jambon en dés','100 g fromage râpé (gruyère/comté)','75 g beurre doux mou','1 œuf','1/2 c. à c. levure chimique','Sel, poivre',"1 c. à s. moutarde à l'ancienne (option)"]}],
    steps:['Crémer beurre ; œuf ; secs ; jambon/fromage.','Bouler, aplatir 1 cm ; cuire 180 °C 12–15 min.'],
    notes:['Conservation : 3 j boîte hermétique.']
  },

  cookies_sales_comte: { title:'Cookies salés au comté', categories:['Entrées','Apéro'], seasons:['Toutes saisons'], difficulty:'easy',
    yield:'18–20 pièces',
    ingredients:[{group:'Appareil',items:['150 g farine','120 g comté râpé','75 g beurre doux mou','1 œuf','1/2 c. à c. levure chimique','Sel, poivre']}],
    steps:['Procédé identique aux cookies salés jambon/fromage.'],
    notes:['Conservation : 3 j boîte hermétique.']
  },

  // Plats
  buns_brioche: { title:'Buns burger briochés (tangzhong)', categories:['Plats'], seasons:['Toutes saisons'], difficulty:'medium',
    yield:'8–10 buns (95–105 g)',
    ingredients:[
      {group:'Tangzhong',items:['25 g farine','125 g lait']},
      {group:'Pâte',items:['500 g farine T45/T55','180 g lait','1 œuf','40 g sucre','9 g sel','7 g levure instantanée (ou 9 g sèche active / 21 g fraîche)','60 g beurre mou']},
      {group:'Dorure',items:["1 jaune + 1 c. à s. d'eau","Graines"]}
    ],
    steps:['Cuire tangzhong ; refroidir.','Pétrir pâte ; incorporer beurre ; fenêtre.','Pointage 60–90 min ; bouler 95–105 g ; apprêt 45–60 min.','Dorer ; cuire 180–190 °C 12–16 min.'],
    notes:['Conservation : 2 j filmés ; congélateur 1 mois.']
  },

  boeuf_bourguignon: { title:'Bœuf bourguignon', categories:['Plats'], seasons:['Toutes saisons'], difficulty:'medium',
    yield:'6 portions',
    ingredients:[
      {group:'Base',items:['1.5 kg paleron (cubes 4–5 cm)','150 g poitrine fumée (lardons)','400 g carotte','250 g oignon','40 g concentré de tomate','750 g vin rouge corsé','500 g fond brun (ou eau)','Bouquet garni','Sel/poivre','Champignons + petits oignons glacés pour finition']},
      {group:'Beurre manié (option)',items:['20 g beurre','20 g farine']}
    ],
    steps:['Colorer bœuf et lardons ; suer oignons/carottes.','Ajouter concentré ; singer légèrement ; mouiller vin + fond.','Bouquet, mijoter 2 h 30–3 h jusqu\'à fondant.','Épaissir au beurre manié si besoin ; ajouter garniture bourguignonne.'],
    notes:['Meilleur le lendemain.','Conservation : 3–4 j au froid ; congélateur 3 mois.']
  },

  cassoulet: { title:'Cassoulet', categories:['Plats'], seasons:['Toutes saisons'], difficulty:'hard',
    yield:'8 portions',
    ingredients:[{group:'Base',items:['700 g haricots lingots trempés','800 g confit de canard (4 cuisses)','600 g épaule de porc','300 g saucisse de Toulouse','150 g couenne + 150 g poitrine salée','1 oignon, 2 carottes, 4 gousses d\'ail','1 bouquet garni','1 clou de girofle','1 c. à s. concentré de tomate','Sel/poivre']}],
    steps:['Cuire les lingots avec couennes + aromates.','Colorer viandes ; dégraisser ; réunir avec haricots et mouiller de bouillon.','Cuire au four 2–3 h à 160–170 °C en cassole, en cassant la croûte 3 fois.'],
    notes:['Repos 24 h au froid puis réchauffage = supérieur.','Conservation : 4–5 j au froid ; congélateur 2–3 mois.']
  },

  puree_robuchon: { title:'Purée de pommes de terre — Joël Robuchon (originale)', categories:['Plats'], seasons:['Toutes saisons'], difficulty:'hard',
    ingredients:[{group:'Base',items:['1 kg pommes de terre (Ratte)','250 g beurre doux froid en dés','250 ml lait entier bouillant','Sel fin']}],
    steps:["Cuire en robe ; passer fin.","Dessécher 5 min.","Incorporer le beurre en 3 fois, puis lait bouillant jusqu'à texture soyeuse.","Assaisonner ; tamiser fin pour la version atelier."],
    notes:['Conservation : meilleur le jour même.']
  },

  curry_porc_chef: { title:'Curry de porc — recette de chef', categories:['Plats'], seasons:['Toutes saisons'], difficulty:'medium',
    yield:'6 portions',
    ingredients:[
      {group:'Viande',items:['1.2 kg épaule de porc (cubes 3 cm)','8 g sel','15 g huile']},
      {group:"Pâte d'épices",items:['200 g oignon','20 g ail','20 g gingembre','10 g pâte de curry rouge (ou 12 g poudre madras)','5 g curcuma','2 g graines de fenouil','6 g cumin moulu','4 g coriandre moulue','2 g piment','30 g concentré de tomate']},
      {group:'Liquides & finition',items:['400 g lait de coco 1er pressage','250 g fond blanc ou eau','2 feuilles de combava (ou zeste de citron vert)','10 g sucre de palme (ou cassonade)','15 g sauce poisson (ou sel)','15 g jus de citron vert','Coriandre fraîche']}
    ],
    steps:['Colorer le porc ; réserver.','Suer oignon ; ajouter ail + gingembre ; torréfier les épices/pâte 2–3 min.','Ajouter concentré ; déglacer avec un peu de lait de coco.','Remettre le porc ; mouiller lait de coco + fond ; ajouter combava.','Mijoter 45–60 min ; découvrir pour napper.','Assaisonner sucre/nuoc-mâm et acidité citron vert.'],
    notes:['Conservation : 3–4 j au froid ; meilleur le lendemain.']
  },

  // Petits-déjeuners / Desserts
  donuts_leves: { title:'Donuts au sucre (levés)', categories:['Petits-déjeuners','Desserts'], seasons:['Toutes saisons'], difficulty:'medium',
    yield:'12–16 donuts (Ø 7–8 cm)',
    ingredients:[
      {group:'Pâte',items:['500 g farine T45/T55','60 g sucre','9 g sel','12 g levure sèche active (ou 30 g levure fraîche)','260 g lait entier tiède','2 œufs (100 g)','60 g beurre mou']},
      {group:'Friture',items:['Huile à 175 °C']},
      {group:'Finition',items:['Sucre semoule 120 g']}
    ],
    steps:['Pétrir 8–10 min jusqu\'à lisse ; pointage 1 h.','Abaisser 12 mm ; détailler anneaux ; apprêt 40–60 min.','Frire 175 °C 60–75 s / face ; égoutter, sucrer.'],
    notes:['Conservation : meilleurs le jour même ; congélation pâte crue découpée possible.']
  },

  crepes_hd: { title:'Pâte à crêpes', categories:['Petits-déjeuners'], seasons:['Toutes saisons'], difficulty:'easy',
    yield:'≈ 10–12 crêpes (26 cm)',
    ingredients:[{group:'Base',items:['250 g farine T55 tamisée','500 g lait entier','3 œufs entiers (150 g)','25 g beurre noisette','20 g sucre','2 g sel']}],
    steps:['Mélanger secs ; incorporer œufs puis lait en 3 fois ; ajouter beurre noisette.','Repos 30–60 min ; poêle antiadhésive très chaude légèrement beurrée.'],
    notes:['Conservation : pâte 24 h au froid ; crêpes 2 j filmées.']
  },

  pancake_babeurre: { title:'Pancakes au babeurre', categories:['Petits-déjeuners'], seasons:['Toutes saisons'], difficulty:'easy',
    yield:'10–12 pancakes',
    ingredients:[{group:'Pâte',items:['250 g farine','40 g sucre','10 g levure chimique','3 g sel','2 œufs','300 g babeurre','40 g beurre fondu']}],
    steps:['Secs puis liquides ; repos 10 min ; poêle beurrée.'],
    notes:['Conservation : pâte 4 h au froid ; cuits 2 j filmés.']
  },

  pancake_lait: { title:'Pancakes au lait', categories:['Petits-déjeuners'], seasons:['Toutes saisons'], difficulty:'easy',
    yield:'10–12 pancakes',
    ingredients:[{group:'Pâte',items:['250 g farine','40 g sucre','10 g levure chimique','3 g sel','2 œufs','300 g lait','40 g beurre fondu']}],
    steps:['Même procédé que babeurre.'],
    notes:['Conservation : pâte 4 h ; cuits 2 j filmés.']
  },

  babeurre_maison: { title:'Babeurre maison', categories:['Petits-déjeuners'], seasons:['Toutes saisons'], difficulty:'easy',
    ingredients:[{group:'Base',items:['250 g lait entier','10 g jus de citron ou vinaigre','Repos 10 min puis utiliser']}],
    steps:['Mélanger, laisser cailler 10 minutes.'],
    notes:['Remplace le babeurre en pâtisserie/pancakes.']
  },

  chocolat_ancien: { title:"Chocolat chaud à l'ancienne", categories:['Petits-déjeuners','Desserts'], seasons:['Toutes saisons'], difficulty:'easy',
    yield:'4 mugs (250 ml)',
    ingredients:[{group:'Base',items:['500 g lait entier','100 g crème','120 g chocolat noir 66–70 %','20 g sucre','1 pincée sel']}],
    steps:['Chauffer lait+crème ; fondre chocolat ; mixer pour mousser.'],
    notes:['Épaissir : 5–8 g maïzena diluée.','Conservation : 2 j au froid.']
  },

  // Desserts
  chantilly_classique: { title:'Chantilly classique au fouet', categories:['Desserts'], seasons:['Toutes saisons'], difficulty:'easy',
    ingredients:[{group:'Base',items:['250 g crème 35 % très froide','20–30 g sucre glace']}],
    steps:["Bol + fouet au froid ; monter en bec d'oiseau ; sucrer en fin."],
    notes:['Parfums : vanille, cacao, café, coco (1–2 %).','Conservation : 24 h au froid.']
  },

  mascarpone: { title:'Chantilly riche (mascarpone)', categories:['Desserts'], seasons:['Toutes saisons'], difficulty:'easy',
    ingredients:[{group:'Base',items:['250 g crème 35 % froide','125 g mascarpone','40 g sucre glace']}],
    steps:["Fouetter froid jusqu'à bec d'oiseau souple."],
    notes:['Aromatiser : vanille, cacao, coco (1–2 %).','Conservation : 36 h au froid.']
  },

  chantilly_gelatine: { title:'Chantilly stabilisée (gélatine)', categories:['Desserts'], seasons:['Toutes saisons'], difficulty:'easy',
    ingredients:[{group:'Base',items:['250 g crème 35 % très froide','25 g sucre glace','3 g gélatine']}],
    steps:['Hydrater gélatine 10 min ; fondre dans 30 g de crème chaude ; mélanger au reste froid ; refroidir 20–30 min.','Monter au fouet ; serrer au sucre en fin.'],
    notes:['Tenue 24–36 h en poche.']
  },

  creme_diplomate_vanille: { title:'Crème diplomate vanille', categories:['Desserts'], seasons:['Toutes saisons'], difficulty:'medium',
    ingredients:[
      {group:'Crème pâtissière',items:['500 g lait entier','1 gousse de vanille','100 g sucre','80 g jaunes (4)','40 g maïzena','40 g beurre']},
      {group:'Gélification + Chantilly',items:['6 g gélatine','200 g crème 35 % montée souple']}
    ],
    steps:['Faire une pâtissière classique, incorporer beurre ; ajouter gélatine hydratée à chaud ; refroidir 25–30 °C.','Assouplir puis incorporer la chantilly en 2 fois.'],
    notes:['Pour choux, fraisiers, tartes.','Conservation : 48 h au froid.']
  },

  choux_craquelin: { title:'Choux au craquelin', categories:['Desserts'], seasons:['Toutes saisons'], difficulty:'medium',
    yield:'18–22 choux',
    ingredients:[
      {group:'Craquelin',items:['50 g beurre','60 g cassonade','60 g farine']},
      {group:'Pâte à choux',items:['125 g lait','125 g eau','100 g beurre','5 g sel','150 g farine T55','250 g œufs (env. 5)']},
      {group:'Garnissage',items:['Crème diplomate vanille ou chantilly']}
    ],
    steps:['Abaisser craquelin 2 mm, détailler disques.','Réaliser pâte à choux ; pocher Ø 3–4 cm ; couvrir d\'un disque de craquelin.','Cuire 170–175 °C 35–40 min ventilé sec.','Refroidir, garnir.'],
    notes:['Conservation : coques 3 j au sec ; garnis 24 h au froid.']
  },

  cookies: { title:'Cookies américains', categories:['Desserts'], seasons:['Toutes saisons'], difficulty:'easy',
    yield:'20–24 cookies (50–60 g)',
    ingredients:[{group:'Appareil',items:['Sucre brun 560 g','Sucre 450 g','Beurre 560 g','4 œufs','Extrait de vanille 15 g','Huile de sésame 10 g','Eau 10 g + 12 g levure chimique + 12 g bicarbonate','Farine de gruau 480 g','Farine de gâteau 480 g','Sel fin 15 g','Pépites de chocolat 700 g']}],
    steps:['Crémer beurres + sucres ; œufs/arômes ; poudres ; farines ; pépites ; bouler.'],
    notes:['Repos au froid conseillé ; cuire selon taille.','Conservation : 3 j boîte hermétique ; pâte crue congélée 1 mois.']
  },

  meringues: { title:'Meringues', categories:['Desserts'], seasons:['Toutes saisons'], difficulty:'easy',
    yield:'20–30 petites meringues',
    ingredients:[{group:'Appareil',items:["200 g blancs d'œufs (à température ambiante)",'200 g sucre semoule','200 g sucre glace tamisé']}],
    steps:["Monter les blancs à vitesse moyenne jusqu'à texture mousseuse.","Ajouter progressivement le sucre semoule en fouettant jusqu'à obtenir une meringue brillante et ferme.","Incorporer délicatement le sucre glace tamisé à la maryse.","Pocher les meringues sur une plaque recouverte de papier cuisson.","Cuire 2 à 3 h à 90–100 °C jusqu'à ce qu'elles soient sèches et se décollent facilement.","Laisser refroidir dans le four éteint, porte entrouverte."],
    notes:['Des blancs "vieillis" montent mieux.','Cuisson longue = meringues bien sèches et stables.','Stockage optimal : boîte hermétique, endroit sec, jamais au réfrigérateur.','Conservation : 2 semaines sans perte de texture.']
  },

  coulis_fraise: { title:'Coulis de fraise', categories:['Desserts'], seasons:['Printemps'], difficulty:'easy',
    ingredients:[{group:'Base',items:['400 g fraises','80 g sucre','10 g jus de citron']}],
    steps:['Mixer ; chauffer à frémissement 1–2 min ; refroidir.'],
    notes:['Texture coulis (burette) ; passer fin.','Conservation : 5 j au froid ; congélateur 2 mois.']
  },

  coulis_framboise: { title:'Coulis de framboise', categories:['Desserts'], seasons:['Été'], difficulty:'easy',
    ingredients:[{group:'Base',items:['400 g framboises','90 g sucre','10 g jus de citron']}],
    steps:['Mixer ; chauffer ; passer fin pour enlever les pépins.'],
    notes:['Conservation : 5 j au froid ; congélateur 2 mois.']
  },

  coulis_abricot_vanille: { title:'Coulis abricot-vanille', categories:['Desserts'], seasons:['Été'], difficulty:'easy',
    ingredients:[{group:'Base',items:['400 g abricots dénoyautés','70 g sucre','1/2 gousse de vanille','20 g eau']}],
    steps:['Cuire 5–8 min ; mixer lisse ; passer.'],
    notes:['Conservation : 5 j au froid ; congélateur 2 mois.']
  },

  coulis_poire: { title:'Coulis de poire', categories:['Desserts'], seasons:['Automne','Hiver'], difficulty:'easy',
    ingredients:[{group:'Base',items:['400 g poires mûres','60–80 g sucre (au goût)','10 g jus de citron']}],
    steps:['Cuire 3–5 min ; mixer lisse ; passer.'],
    notes:['Assaisonnement possible : vanille, poivre Timut.','Conservation : 5 j au froid ; congélateur 2 mois.']
  },

  coulis_guide: { title:'Coulis — guide (formules & variantes)', categories:['Desserts'], seasons:['Toutes saisons'], difficulty:'easy',
    ingredients:[
      {group:'Base',items:["400 g fruit","60–100 g sucre (au goût et selon l'acidité)","10 g jus de citron"]},
      {group:'Fruits populaires',items:['Fraise, Framboise (passer), Mangue, Pêche, Poire, Cerise, Abricot-vanille']}
    ],
    steps:["Mixer, chauffer 1–2 min jusqu'à premier frémissement, passer si nécessaire, refroidir."],
    notes:['Texture "burette" pour dressage : ajuster eau si besoin.','Conservation : 5 j au froid ; congélateur 2 mois.']
  },

  creme_amande_: { title:"Crème d'amandes", categories:['Desserts'], seasons:['Toutes saisons'], difficulty:'easy',
    yield:'1 préparation (≈ tarte 22–24 cm)',
    ingredients:[{group:'Appareil',items:[
      '100 g beurre pommade','100 g sucre',"100 g poudre d'amande",
      '2 œufs','10 g farine','Zeste de citron (option)','Rhum ou vanille (option)'
    ]}],
    steps:[
      'Crémer beurre + sucre.',"Ajouter poudre d'amande.",
      'Incorporer œufs un à un.','Ajouter farine et arômes.',
      'Utiliser en garniture de tarte ou cuisson douce.'
    ],
    notes:[
      "Ne pas trop fouetter pour éviter qu'elle gonfle à la cuisson.",
      'Stockage optimal : boîte hermétique au réfrigérateur.',
      'Conservation : 48 h au froid ; congélateur 1 mois.'
    ]
  }

}; // ← FIN DU FICHIER