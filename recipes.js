// ============================================================
//  Cook Note — recipes.js
//  window.RECIPES (majuscules) — requis par app.js
// ============================================================

window.RECIPES = {


  // Fiches ma?tre
  coulis_maitre: { title:'Coulis', categories:['Desserts','Recettes de base'], seasons:['Toutes saisons'], difficulty:'easy',
    masterType:'collection',
    variants:[
      {id:'coulis_guide', label:'Guide & formules'},
      {id:'coulis_fraise', label:'Fraise'},
      {id:'coulis_framboise', label:'Framboise'},
      {id:'coulis_abricot_vanille', label:'Abricot-vanille'},
      {id:'coulis_poire', label:'Poire'}
    ],
    ingredients:[{group:'Choisir une variante',items:['S?lectionner le coulis voulu dans les boutons de la fiche.']}],
    steps:['Choisir une variante pour afficher ses ingr?dients, ?tapes, notes et conservation.'],
    notes:['Fiche ma?tre : toutes les recettes de coulis du carnet sont regroup?es ici.'],
    tags:['coulis','fruit','dessert','base']
  },

  chantilly_maitre: { title:'Chantilly', categories:['Desserts','Recettes de base'], seasons:['Toutes saisons'], difficulty:'easy',
    masterType:'collection',
    variants:[
      {id:'chantilly_classique', label:'Classique'},
      {id:'mascarpone', label:'Mascarpone'},
      {id:'chantilly_gelatine', label:'Stabilis?e g?latine'}
    ],
    ingredients:[{group:'Choisir une variante',items:['S?lectionner la chantilly voulue dans les boutons de la fiche.']}],
    steps:['Choisir une variante pour afficher la m?thode adapt?e.'],
    notes:['Fiche ma?tre : chantilly simple, riche ou stabilis?e.'],
    tags:['chantilly','creme','dessert','base']
  },

  cremes_maitre: { title:'Cr?mes p?tissi?res et garnitures', categories:['Desserts','Recettes de base'], seasons:['Toutes saisons'], difficulty:'medium',
    masterType:'collection',
    variants:[
      {id:'creme_diplomate_vanille', label:'Diplomate vanille'},
      {id:'creme_diplomate_cloud', label:'Diplomate donuts & choux'},
      {id:'creme_patissiere_praline', label:'P?tissi?re pralin?'},
      {id:'creme_praline', label:'Cr?me pralin?'},
      {id:'creme_beurre_meringue_italienne', label:'Cr?me au beurre'},
      {id:'creme_amande_', label:'Cr?me d?amandes'}
    ],
    ingredients:[{group:'Choisir une variante',items:['S?lectionner la cr?me ou garniture voulue dans les boutons de la fiche.']}],
    steps:['Choisir une variante pour afficher la recette compl?te.'],
    notes:['Fiche ma?tre : toutes les cr?mes et garnitures de base du carnet.'],
    tags:['creme','patisserie','garniture','base']
  },

  pates_bases_maitre: { title:'P?tes et bases p?tissi?res', categories:['Desserts','Recettes de base'], seasons:['Toutes saisons'], difficulty:'medium',
    masterType:'collection',
    variants:[
      {id:'pate_choux', label:'P?te ? choux'},
      {id:'craquelin_cacao', label:'Craquelin cacao'},
      {id:'pate_noisette', label:'P?te de noisette'},
      {id:'choux_craquelin', label:'Choux au craquelin'},
      {id:'paris_brest', label:'Paris-Brest'}
    ],
    ingredients:[{group:'Choisir une variante',items:['S?lectionner la base ou le montage voulu dans les boutons de la fiche.']}],
    steps:['Choisir une variante pour afficher la recette compl?te.'],
    notes:['Fiche ma?tre : bases techniques et montages li?s.'],
    tags:['pate','base','choux','patisserie']
  },

  sauces_assaisonnements_maitre: { title:'Sauces, pestos et assaisonnements', categories:['Entr?es','Ap?ro','Recettes de base'], seasons:['Toutes saisons'], difficulty:'easy',
    masterType:'collection',
    variants:[
      {id:'vinaigrette', label:'Vinaigrette'},
      {id:'pesto_variantes', label:'Pesto'},
      {id:'balsamique_reduit', label:'Balsamique r?duit'},
      {id:'huile_pimentee_pizza', label:'Huile piment?e'},
      {id:'marinades_guide', label:'Marinades'}
    ],
    ingredients:[{group:'Choisir une variante',items:['S?lectionner la sauce ou l?assaisonnement voulu dans les boutons de la fiche.']}],
    steps:['Choisir une variante pour afficher la recette compl?te.'],
    notes:['Fiche ma?tre : sauces froides, condiments, huiles et marinades.'],
    tags:['sauce','pesto','marinade','assaisonnement']
  },

  tomates_maitre: { title:'Tomates pr?par?es', categories:['Entr?es','Ap?ro','Recettes de base'], seasons:['?t?','Automne'], difficulty:'easy',
    masterType:'collection',
    variants:[
      {id:'tomates_variantes', label:'S?ch?es ou confites'}
    ],
    ingredients:[{group:'Choisir une variante',items:['S?lectionner la pr?paration de tomates voulue dans les boutons de la fiche.']}],
    steps:['Choisir une variante pour afficher la recette compl?te.'],
    notes:['Fiche ma?tre : pr?parations de tomates au four.'],
    tags:['tomate','confit','seche','aperitif']
  },

  // Entrées / Apéro
  vinaigrette: { title:'Vinaigrette de chef (variantes)', master:'sauces_assaisonnements_maitre', categories:['Entrées','Apéro'], seasons:['Toutes saisons'], difficulty:'easy',
    ingredients:[{group:'Base',items:['30 g moutarde de Dijon','45 g vinaigre de vin rouge ou Xérès','2 g sel fin, 1 g poivre','150 g huile (80 g neutre + 70 g olive)','5 g miel (option)']}],
    steps:['Fouetter moutarde + vinaigre + sel/poivre (et miel).','Verser les huiles en filet pour émulsionner.','Goûter et ajuster.'],
    notes:['Ratio huile:acide 3:1 à 4:1 selon la salade.','Variantes : citron, herbes, miso blanc, yaourt grec.',
      '→ Voir aussi : <span data-goto="pesto_variantes" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Pesto (variantes)</span>',
      'Stockage optimal : flacon avec couvercle au réfrigérateur ; secouer avant usage.',
      'Conservation : 5–7 j au froid.']
  },

  pesto_variantes: { title:'Pesto (base + variantes)', master:'sauces_assaisonnements_maitre', categories:['Entrées','Apéro'], seasons:['Printemps','Été'], difficulty:'easy',
    ingredients:[
      {group:'Version salade (citronnée)',items:["50 g basilic","40 g parmesan râpé","30 g pignons grillés","1 gousse d'ail","45 g huile d'olive","45 g huile neutre","10 g jus de citron","Sel, poivre"]},
      {group:'Version Genovese (traditionnelle)',items:["60 g basilic Genovese","30 g pignons","15 g Parmigiano Reggiano","15 g Pecorino","1 petite gousse d'ail","100–120 g huile d'olive EV","2–3 g sel"]}
    ],
    steps:["Version salade : mixer basilic + pignons + ail + parmesan puis monter à l’huile et citron.","Version Genovese : piler ail + sel + pignons, ajouter le basilic puis les fromages et l’huile."],
    notes:["Même fiche, 2 styles : citronné (salades) ou traditionnel (pâtes/gnocchi).","Conservation : 2–4 j au froid, film au contact + fine couche d’huile."]
  },

  ricotta_fouettee: { title:'Ricotta fouettée (assaisonnements)', categories:['Entrées','Apéro'], seasons:['Toutes saisons'], difficulty:'easy',
    ingredients:[{group:'Base',items:["250 g ricotta de qualité","30 g crème 35 %","Sel fin, poivre"]}],
    steps:["Fouetter 2–3 min ricotta + crème jusqu'à lisse et aérée ; assaisonner."],
    notes:["Zaatar + huile d'olive ; Citron confit + aneth ; Miel + piment d'Espelette ; Truffe : 1–2 % huile de truffe.","Conservation : 2–3 j au froid."]
  },

  balsamique_reduit: { title:'Balsamique réduit (variantes)', master:'sauces_assaisonnements_maitre', categories:['Entrées','Apéro'], seasons:['Toutes saisons'], difficulty:'easy',
    ingredients:[{group:'Base',items:["250 g vinaigre balsamique IGP","25–50 g sucre (au goût)"]}],
    steps:["Mijoter 12–20 min à feu doux jusqu'à nappant (réduction 1/2–2/3)."],
    notes:["Variantes : zeste d'orange, vanille, cacao, espresso, figue (filtrer).","Conservation : 2–3 mois au froid."]
  },

  tomates_variantes: { title:'Tomates au four (séchées ou confites)', master:'tomates_maitre', categories:['Entrées','Apéro'], seasons:['Été','Automne'], difficulty:'easy',
    ingredients:[
      {group:'Version séchées',items:["1 kg tomates Roma","Sel fin","Thym","Huile d'olive pour conservation"]},
      {group:'Version confites',items:["1 kg tomates cerises","6 g sel","3 g sucre","4 gousses d'ail","Branches de thym","Huile d'olive"]}
    ],
    steps:["Version séchées : four 90–100 °C pendant 2h30–3h.","Version confites : four 120 °C pendant 1h30–2h avec ail + thym et filet d’huile.","Refroidir puis conserver sous huile au frais."],
    notes:['Séchées : parfaites pour antipasti et salades.','Confites : idéales en bruschetta / pâtes.']
  },

  huile_pimentee_pizza: { title:'Huile pimentée pour pizza (variantes)', master:'sauces_assaisonnements_maitre', categories:['Entrées','Plats'], seasons:['Toutes saisons'], difficulty:'easy',
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

  marinades_guide: { title:'Marinades — 10 signatures', master:'sauces_assaisonnements_maitre', categories:['Entrées','Plats'], seasons:['Toutes saisons'], difficulty:'easy',
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

  cookies_sales_variantes: { title:'Cookies salés (base + variantes)', categories:['Entrées','Apéro'], seasons:['Toutes saisons'], difficulty:'easy',
    yield:'18–20 pièces',
    ingredients:[
      {group:'Base commune',items:['150 g farine','75 g beurre doux mou','1 œuf','1/2 c. à c. levure chimique','Sel, poivre']},
      {group:'Variante jambon-fromage',items:['100 g jambon en dés','100 g fromage râpé','1 c. à s. moutarde à l’ancienne (option)']},
      {group:'Variante comté',items:['120 g comté râpé']}
    ],
    steps:['Crémer beurre puis incorporer l’œuf.','Ajouter farine + levure + assaisonnement, puis les ingrédients de la variante choisie.','Former des boules, aplatir à 1 cm et cuire 12–15 min à 180 °C.'],
    notes:['Variante 1 : jambon-fromage ; Variante 2 : comté seul.','Conservation : 3 j boîte hermétique.']
  },

  pancakes_variantes: { title:'Pancakes (lait ou babeurre + base babeurre maison)', categories:['Petits-déjeuners'], seasons:['Toutes saisons'], difficulty:'easy',
    yield:'10–12 pancakes',
    ingredients:[
      {group:'Base sèche',items:['250 g farine','40 g sucre','10 g levure chimique','3 g sel']},
      {group:'Version lait',items:['2 œufs','300 g lait','40 g beurre fondu']},
      {group:'Version babeurre',items:['2 œufs','300 g babeurre','40 g beurre fondu']},
      {group:'Babeurre maison (si besoin)',items:['250 g lait entier','10 g jus de citron ou vinaigre','Repos 10 min']}
    ],
    steps:['Mélanger les ingrédients secs.','Ajouter les liquides de la version choisie et mélanger juste assez (pas trop travailler).','Repos 10 min puis cuisson en petites louches sur poêle beurrée.'],
    notes:['Pour la version babeurre maison : préparer le babeurre 10 min avant.','Conservation : pâte 4 h au froid ; pancakes cuits 2 j filmés.']
  },

  chocolat_ancien: { title:"Chocolat chaud à l'ancienne", categories:['Petits-déjeuners','Desserts'], seasons:['Toutes saisons'], difficulty:'easy',
    yield:'4 mugs (250 ml)',
    ingredients:[{group:'Base',items:['500 g lait entier','100 g crème','120 g chocolat noir 66–70 %','20 g sucre','1 pincée sel']}],
    steps:['Chauffer lait+crème ; fondre chocolat ; mixer pour mousser.'],
    notes:['Épaissir : 5–8 g maïzena diluée.','Conservation : 2 j au froid.']
  },

  // Desserts
  chantilly_classique: { title:'Chantilly classique au fouet', master:'chantilly_maitre', categories:['Desserts'], seasons:['Toutes saisons'], difficulty:'easy',
    ingredients:[{group:'Base',items:['250 g crème 35 % très froide','20–30 g sucre glace']}],
    steps:["Bol + fouet au froid ; monter en bec d'oiseau ; sucrer en fin."],
    notes:['Parfums : vanille, cacao, café, coco (1–2 %).',
      '→ Version plus stable : <span data-goto="mascarpone" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Chantilly mascarpone</span> ou <span data-goto="chantilly_gelatine" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Chantilly gélatine</span>',
      'Stockage optimal : dans un bol filmé ou en poche à douille au réfrigérateur.',
      'Conservation : 24 h au froid maximum.']
  },

  mascarpone: { title:'Chantilly riche (mascarpone)', master:'chantilly_maitre', categories:['Desserts'], seasons:['Toutes saisons'], difficulty:'easy',
    ingredients:[{group:'Base',items:['250 g crème 35 % froide','125 g mascarpone','40 g sucre glace']}],
    steps:["Fouetter froid jusqu'à bec d'oiseau souple."],
    notes:['Aromatiser : vanille, cacao, coco (1–2 %).',
      '→ Version avec tenue longue durée : <span data-goto="chantilly_gelatine" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Chantilly stabilisée gélatine</span>',
      '→ Parfait pour fourrer les <span data-goto="donuts_cloud" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Donuts Cloud-like</span>',
      'Stockage optimal : en poche à douille ou boîte hermétique au réfrigérateur.',
      'Conservation : 36 h au froid.']
  },

  chantilly_gelatine: { title:'Chantilly stabilisée (gélatine)', master:'chantilly_maitre', categories:['Desserts'], seasons:['Toutes saisons'], difficulty:'easy',
    ingredients:[{group:'Base',items:['250 g crème 35 % très froide','25 g sucre glace','3 g gélatine']}],
    steps:['Hydrater gélatine 10 min ; fondre dans 30 g de crème chaude ; mélanger au reste froid ; refroidir 20–30 min.','Monter au fouet ; serrer au sucre en fin.'],
    notes:['Tenue 24–36 h en poche.']
  },

  creme_diplomate_vanille: { title:'Crème diplomate vanille', master:'cremes_maitre', categories:['Desserts'], seasons:['Toutes saisons'], difficulty:'medium',
    ingredients:[
      {group:'Crème pâtissière',items:['500 g lait entier','1 gousse de vanille','100 g sucre','80 g jaunes (4)','40 g maïzena','40 g beurre']},
      {group:'Gélification + Chantilly',items:['6 g gélatine','200 g crème 35 % montée souple']}
    ],
    steps:['Faire une pâtissière classique, incorporer beurre ; ajouter gélatine hydratée à chaud ; refroidir 25–30 °C.','Assouplir puis incorporer la chantilly en 2 fois.'],
    notes:['Pour choux, fraisiers, tartes.',
      '→ Utilisation : <span data-goto="choux_craquelin" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Choux au craquelin</span>',
      '→ Fourrage donuts : <span data-goto="donuts_cloud" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Donuts Cloud-like</span>',
      'Stockage optimal : boîte hermétique au froid, filmée au contact pour éviter le croûtage.',
      'Conservation pâtissière seule : 48 h au froid. Assemblée avec chantilly : 24 h au froid.']
  },

  choux_craquelin: { title:'Choux au craquelin', master:'pates_bases_maitre', categories:['Desserts'], seasons:['Toutes saisons'], difficulty:'medium',
    yield:'18–22 choux',
    ingredients:[
      {group:'Craquelin',items:['50 g beurre','60 g cassonade','60 g farine']},
      {group:'Pâte à choux',items:['125 g lait','125 g eau','100 g beurre','5 g sel','150 g farine T55','250 g œufs (env. 5)']},
      {group:'Garnissage',items:['Crème diplomate vanille ou chantilly']}
    ],
    steps:['Abaisser craquelin 2 mm, détailler disques.','Réaliser pâte à choux ; pocher Ø 3–4 cm ; couvrir d\'un disque de craquelin.','Cuire 170–175 °C 35–40 min ventilé sec.','Refroidir, garnir.'],
    notes:['Conservation : coques 3 j à température ambiante dans boîte hermétique ; garnis 24 h au froid.',
      '→ Recette de garnissage : <span data-goto="creme_diplomate_vanille" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Crème diplomate vanille</span>',
      '→ Version allégée : <span data-goto="chantilly_gelatine" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Chantilly stabilisée</span>']
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

  coulis_fraise: { title:'Coulis de fraise', master:'coulis_maitre', categories:['Desserts'], seasons:['Printemps'], difficulty:'easy',
    ingredients:[{group:'Base',items:['400 g fraises','80 g sucre','10 g jus de citron']}],
    steps:['Mixer ; chauffer à frémissement 1–2 min ; refroidir.'],
    notes:['Texture coulis (burette) ; passer fin.',
      '→ Guide complet : <span data-goto="coulis_guide" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Coulis — guide & variantes</span>',
      'Stockage optimal : flacon souple (burette) ou pot hermétique au réfrigérateur.',
      'Conservation : 5 j au froid ; congélateur 2 mois.']
  },

  coulis_framboise: { title:'Coulis de framboise', master:'coulis_maitre', categories:['Desserts'], seasons:['Été'], difficulty:'easy',
    ingredients:[{group:'Base',items:['400 g framboises','90 g sucre','10 g jus de citron']}],
    steps:['Mixer ; chauffer ; passer fin pour enlever les pépins.'],
    notes:['Conservation : 5 j au froid ; congélateur 2 mois.']
  },

  coulis_abricot_vanille: { title:'Coulis abricot-vanille', master:'coulis_maitre', categories:['Desserts'], seasons:['Été'], difficulty:'easy',
    ingredients:[{group:'Base',items:['400 g abricots dénoyautés','70 g sucre','1/2 gousse de vanille','20 g eau']}],
    steps:['Cuire 5–8 min ; mixer lisse ; passer.'],
    notes:['Conservation : 5 j au froid ; congélateur 2 mois.']
  },

  coulis_poire: { title:'Coulis de poire', master:'coulis_maitre', categories:['Desserts'], seasons:['Automne','Hiver'], difficulty:'easy',
    ingredients:[{group:'Base',items:['400 g poires mûres','60–80 g sucre (au goût)','10 g jus de citron']}],
    steps:['Cuire 3–5 min ; mixer lisse ; passer.'],
    notes:['Assaisonnement possible : vanille, poivre Timut.','Conservation : 5 j au froid ; congélateur 2 mois.']
  },

  coulis_guide: { title:'Coulis — guide (formules & variantes)', master:'coulis_maitre', categories:['Desserts'], seasons:['Toutes saisons'], difficulty:'easy',
    ingredients:[
      {group:'Base',items:["400 g fruit","60–100 g sucre (au goût et selon l'acidité)","10 g jus de citron"]},
      {group:'Fruits populaires',items:['Fraise, Framboise (passer), Mangue, Pêche, Poire, Cerise, Abricot-vanille']}
    ],
    steps:["Mixer, chauffer 1–2 min jusqu'à premier frémissement, passer si nécessaire, refroidir."],
    notes:['Texture "burette" pour dressage : ajuster eau si besoin.','Conservation : 5 j au froid ; congélateur 2 mois.']
  },

  creme_amande_: { title:"Crème d'amandes", master:'cremes_maitre', categories:['Desserts'], seasons:['Toutes saisons'], difficulty:'easy',
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
  },


  // ── Bases / Fonds ──────────────────────────────────────────
  court_bouillon: { title:'Court-bouillon (Paul Bocuse)', categories:['Entrées','Plats'], seasons:['Toutes saisons'], difficulty:'easy',
    yield:'≈ 1 litre (pour pocher 4–6 portions)',
    image:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
    ingredients:[{group:'Légumes & aromates',items:[
      '1 poireau','2 carottes','1 oignon','2 branches de céleri',
      '1 botte de persil','2 branches de thym','¼ feuille de laurier',
      '1 clou de girofle','5 grains de poivre'
    ]},{group:'Liquides',items:[
      '2 verres de vin blanc sec (≈ 30 cl)','50 cl eau','Sel'
    ]}],
    steps:[
      "Éplucher le poireau, les carottes et l'oignon. Laver le céleri et les herbes.",
      "Couper le poireau en quatre dans la longueur et l'attacher avec les branches de céleri et le laurier pour former le bouquet garni.",
      "Couper les carottes en quatre dans la longueur. Piquer l'oignon avec le clou de girofle.",
      "Dans une cocotte, placer le bouquet garni, les carottes, l'oignon, le vin blanc et 50 cl d'eau. Saler et poivrer.",
      "Porter à ébullition puis laisser cuire 20 min à frémissement.",
      "Laisser refroidir, puis placer au frais avant utilisation."
    ],
    notes:[
      'Recette de Paul Bocuse — source : Académie du Goût.',
      'Idéal pour pocher poissons (cabillaud, saumon, sole), crustacés, légumes ou volailles.',
      "Astuce : ajouter un trait de vinaigre blanc ou de jus de citron pour les crustacés.",
      "→ Utilisé comme base dans : <span data-goto='boeuf_bourguignon' style='color:#fbbf24;text-decoration:underline;cursor:pointer'>Bœuf bourguignon</span>",
      'Stockage optimal : boîte hermétique ou pot en verre au réfrigérateur.',
      'Conservation : 3–4 j au froid ; se congèle très bien 2–3 mois (en portions de 250 ml).'
    ]
  },

  // ── Donuts Cloud-like ──────────────────────────────────────
  donuts_cloud: { title:'Donuts "Cloud-like" (pousse lente, levure fraîche)', categories:['Petits-déjeuners','Desserts'], seasons:['Toutes saisons'], difficulty:'medium',
    yield:'12–14 gros donuts (60–70 g)',
    image:'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80',
    ingredients:[
      {group:'Pâte',items:[
        '250 g farine T45 ou T55','25 g sucre','3 g sel',
        '10–12 g levure fraîche','50 g œuf (≈ 1 œuf)','140 g lait entier',
        '25 g beurre fondu ou mou (tiède)','5 g vanille'
      ]},
      {group:'Friture',items:['Huile neutre en quantité suffisante (160–165 °C)']},
      {group:'Finition — Option 1 (classique)',items:['120 g sucre semoule']},
      {group:'Finition — Option 2 (fourré)',items:['30–40 g de crème par donut']}
    ],
    steps:[
      '— VEILLE AU SOIR —',
      "Activer la levure : prélever 40 g de lait sur les 140 g, chauffer à 25–30 °C. Émietter la levure fraîche dedans et mélanger.",
      "Dans un bol, mélanger farine + sucre + sel + vanille. Ajouter l'œuf, le reste du lait froid, puis le mélange levure. Incorporer enfin le beurre tiède.",
      "Pétrir 8–10 min jusqu'à pâte lisse, souple et légèrement collante. Repos 15 min.",
      "Former une boule, placer dans un bol huilé. Laisser 30–45 min à température ambiante, puis couvrir hermétiquement et réfrigérer 12–18 h.",
      '— LE LENDEMAIN —',
      "Sortir la pâte 1 h avant pour la remettre à température ambiante.",
      "Diviser en boules de 60–70 g en serrant bien ('bouler' pour une belle mie). Apprêt 1 h à 1 h 30 à couvert : la pâte doit être gonflée, légère et trembler légèrement.",
      '— CUISSON —',
      "Chauffer l'huile à 160–165 °C (thermomètre recommandé). Frire 2 min 30 à 3 min par face (5–6 min total). ⚠️ Maximum 2–3 donuts à la fois pour maintenir la température de l'huile.",
      "Égoutter sur papier absorbant.",
      '— FINITION —',
      "Option 1 : rouler dans le sucre semoule immédiatement à la sortie du bain (colle parfaitement quand chaud).",
      "Option 2 : laisser tiédir, percer un petit trou sur le côté, pocher 30–40 g de crème à la douille longue jusqu'à sentir le donut s'alourdir légèrement."
    ],
    notes:[
      '⚠️ Température huile trop haute = intérieur cru. Trop basse = donuts gras et compacts.',
      'Pâte pas assez levée = beignets denses. Trop levée = ils retombent à la cuisson.',
      "Résultat attendu : extérieur doré uniforme, anneau clair visible au centre, mie très aérée et filante ('cloud-like'), intérieur 100% cuit sans être sec.",
      "→ Garnissage recommandé : <span data-goto='creme_diplomate_cloud' style='color:#fbbf24;text-decoration:underline;cursor:pointer'>Crème diplomate vanille (version donuts)</span>",
      "→ Garnissage rapide : <span data-goto='mascarpone' style='color:#fbbf24;text-decoration:underline;cursor:pointer'>Chantilly mascarpone</span> (prêt en 3 min, très stable)",
      "→ Recette de base similaire : <span data-goto='donuts_leves' style='color:#fbbf24;text-decoration:underline;cursor:pointer'>Donuts au sucre classiques</span>",
      'Stockage optimal : à température ambiante, boîte semi-ouverte (boîte hermétique = condensation). Ne pas mettre au frigo sans crème.',
      'Conservation : nature — 24 h max à T° ambiante. Fourrés crème — 12 h au froid (sortir 15 min avant dégust.).'
    ]
  },

  creme_diplomate_cloud: { title:'Crème diplomate vanille (pour donuts & choux)', master:'cremes_maitre', categories:['Desserts'], seasons:['Toutes saisons'], difficulty:'medium',
    yield:'Garniture pour 12–14 donuts ou 18–22 choux',
    image:'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    ingredients:[
      {group:'Crème pâtissière',items:[
        '250 g lait entier','50 g jaunes d\'œufs (≈ 3 jaunes)','60 g sucre',
        '25 g maïzena','25 g beurre doux','5 g vanille (ou 1 gousse)'
      ]},
      {group:'Chantilly',items:[
        '200 g crème liquide entière (30–35 %) très froide','20 g sucre glace'
      ]},
      {group:'Variante mascarpone (rapide)',items:[
        '250 g mascarpone','200 g crème liquide entière','60 g sucre glace','Vanille'
      ]}
    ],
    steps:[
      '— CRÈME PÂTISSIÈRE —',
      "Chauffer le lait avec la vanille (gratter la gousse si entière) jusqu'à frémissement.",
      "Dans un bol, fouetter les jaunes + sucre jusqu'à blanchiment. Ajouter la maïzena, bien mélanger.",
      "Verser le lait chaud en filet sur le mélange en fouettant constamment pour éviter la coagulation.",
      "Remettre dans la casserole, cuire à feu moyen en remuant sans arrêt jusqu'à épaississement net (environ 1–2 min après reprise de l'ébullition).",
      "Hors du feu, incorporer le beurre en morceaux. Filmer immédiatement au contact (le film touche la crème) et refroidir complètement au réfrigérateur (minimum 2 h).",
      '— CHANTILLY —',
      "Fouetter la crème bien froide avec le sucre glace jusqu'à texture souple mais qui tient (bec d'oiseau ferme).",
      '— ASSEMBLAGE (crème diplomate) —',
      "Fouetter la pâtissière froide pour la détendre et la lisser. Incorporer la chantilly délicatement à la spatule en 2–3 fois (ne pas écraser les bulles d'air).",
      '— FOURRAGE DONUTS —',
      "Faire un petit trou sur le côté de chaque donut tiède ou froid. Mettre la crème en poche avec une douille longue. Pocher 30–40 g de crème par donut — arrêter dès qu'il devient légèrement plus lourd.",
      '— VARIANTE MASCARPONE (si pressé) —',
      "Fouetter mascarpone + crème + sucre glace + vanille jusqu'à texture ferme. Prêt en 3 minutes, très stable, excellente tenue."
    ],
    notes:[
      "Ne jamais fourrer des donuts chauds : la crème fond et coule.",
      "→ Recette des donuts : <span data-goto='donuts_cloud' style='color:#fbbf24;text-decoration:underline;cursor:pointer'>Donuts Cloud-like (pousse lente)</span>",
      "→ Recette des choux : <span data-goto='choux_craquelin' style='color:#fbbf24;text-decoration:underline;cursor:pointer'>Choux au craquelin</span>",
      "→ Version pâtissière seule : <span data-goto='creme_diplomate_vanille' style='color:#fbbf24;text-decoration:underline;cursor:pointer'>Crème diplomate vanille (recette de base)</span>",
      "Stockage optimal pâtissière : filmée au contact dans boîte hermétique au réfrigérateur.",
      "Conservation pâtissière seule : 48 h au froid. Diplomate assemblée : 24 h au froid. Mascarpone : 36–48 h au froid.",
      "Congélation : possible pour la pâtissière seule (avant incorporation chantilly) — 1 mois. Fouetter à nouveau après décongélation."
    ]
  },

  paris_brest: { title:'Paris-Brest (Cédric Grolet)', master:'pates_bases_maitre', categories:['Desserts'], seasons:['Toutes saisons'], difficulty:'hard',
    yield:'5 à 6 Paris-Brest individuels',
    ingredients:[
      {group:'Assemblage final',items:['5–6 couronnes de pâte à choux cuites avec craquelin','Crème au praliné','50 g noisettes torréfiées concassées','QS praliné noisette pur']},
      {group:'Composants liés',items:[
        '→ Voir : <span data-goto="craquelin_cacao" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Craquelin cacao</span>',
        '→ Voir : <span data-goto="pate_choux" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Pâte à choux</span>',
        '→ Voir : <span data-goto="pate_noisette" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Pâte de noisette</span>',
        '→ Voir : <span data-goto="creme_patissiere_praline" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Crème pâtissière praliné</span>',
        '→ Voir : <span data-goto="creme_beurre_meringue_italienne" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Crème au beurre meringue italienne</span>',
        '→ Voir : <span data-goto="creme_praline" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Crème praliné</span>'
      ]}
    ],
    steps:['Cuire les couronnes de pâte à choux avec le craquelin.','Couper chaque couronne dans la hauteur.','Pocher un peu de praliné pur au fond (optionnel), puis pocher la crème au praliné.','Ajouter quelques points de praliné pur, refermer avec le chapeau, puis décorer avec les noisettes concassées.'],
    notes:['Recette adaptée de la version publiée sur iletaitungateau.com (article 30).','Sortir du réfrigérateur 30 à 40 min avant dégustation.']
  },

  craquelin_cacao: { title:'Craquelin cacao (Paris-Brest)', master:'pates_bases_maitre', categories:['Desserts','Recettes de base'], seasons:['Toutes saisons'], difficulty:'easy',
    ingredients:[{group:'Base',items:['40 g beurre pommade','45 g farine','50 g cassonade','6 g cacao non sucré','25 g blancs d’œufs','40 g noisettes concassées']}],
    steps:['Mélanger farine + cassonade + cacao, puis incorporer le beurre.','Étaler à 2 mm entre deux feuilles et congeler 30 min.','Découper des anneaux (Ø 8 cm, trou Ø 2 cm), badigeonner de blanc d’œuf, ajouter les noisettes puis recongeler jusqu’à usage.'],
    notes:['Composant pour : <span data-goto="paris_brest" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Paris-Brest (Cédric Grolet)</span>.']
  },

  pate_choux: { title:'Pâte à choux (Paris-Brest)', master:'pates_bases_maitre', categories:['Desserts','Recettes de base'], seasons:['Toutes saisons'], difficulty:'medium',
    ingredients:[{group:'Base',items:['62 g lait','62 g eau','2 g sel','55 g beurre','75 g farine','100 g œufs (≈2)']}],
    steps:['Porter à ébullition eau + lait + sel + beurre.','Hors du feu, ajouter la farine en une fois puis dessécher sur feu doux.','Refroidir légèrement au robot (feuille), puis incorporer les œufs progressivement jusqu’à texture lisse.','Pocher des couronnes de 7 cm, poser le craquelin puis cuire à 170 °C pendant 40 à 45 min.'],
    notes:['Le test du sillon : il doit se refermer doucement quand la texture est correcte.']
  },

  pate_noisette: { title:'Pâte de noisette maison', master:'pates_bases_maitre', categories:['Desserts','Recettes de base'], seasons:['Toutes saisons'], difficulty:'easy',
    ingredients:[{group:'Base',items:['250 g noisettes torréfiées','13,5 g sucre glace','0,5 g fleur de sel']}],
    steps:['Mixer longuement tous les ingrédients jusqu’à obtention d’une pâte lisse et fluide.'],
    notes:['Composant utilisable dans crèmes, pralinés et ganaches.']
  },

  creme_patissiere_praline: { title:'Crème pâtissière praliné (Paris-Brest)', master:'cremes_maitre', categories:['Desserts','Recettes de base'], seasons:['Toutes saisons'], difficulty:'medium',
    ingredients:[{group:'Base',items:['3,5 g gélatine poudre + 16 g eau','150 g lait','32 g crème liquide','30 g sucre','9 g maïzena','9 g farine','30 g jaunes d’œufs','10 g beurre de cacao','17 g beurre','10 g mascarpone','30 g pâte de noisette','60 g praliné noisette']}],
    steps:['Réhydrater la gélatine dans l’eau froide.','Porter lait + crème à ébullition. Blanchir jaunes + sucre, puis ajouter maïzena et farine.','Verser le liquide chaud sur les jaunes, remettre en casserole et cuire jusqu’à épaississement.','Hors du feu, ajouter gélatine, beurre de cacao, beurre, mascarpone, pâte de noisette et praliné. Mixer, filmer au contact, refroidir.'],
    notes:['Ajuster le praliné/pâte de noisette selon l’intensité souhaitée.']
  },

  creme_beurre_meringue_italienne: { title:'Crème au beurre (base crème anglaise + meringue italienne)', master:'cremes_maitre', categories:['Desserts','Recettes de base'], seasons:['Toutes saisons'], difficulty:'hard',
    ingredients:[
      {group:'Crème anglaise au beurre',items:['45 g lait','45 g sucre','35 g jaunes d’œufs','200 g beurre pommade']},
      {group:'Meringue italienne',items:['20 g eau','60 g sucre','30 g blancs d’œufs']}
    ],
    steps:['Cuire la crème anglaise (lait + jaunes + sucre) à 84 °C, puis refroidir légèrement.','Foisonner le beurre pommade puis incorporer progressivement la crème anglaise.','Réaliser une meringue italienne (sirop 121 °C versé sur blancs mousseux) puis incorporer délicatement à la crème au beurre.'],
    notes:['Base technique pour plusieurs entremets/pâtisseries classiques.']
  },

  creme_praline: { title:'Crème praliné (montage Paris-Brest)', master:'cremes_maitre', categories:['Desserts','Recettes de base'], seasons:['Toutes saisons'], difficulty:'medium',
    ingredients:[{group:'Assemblage',items:['390 g crème pâtissière praliné (ou totalité préparée)','300 g crème au beurre (environ)']}],
    steps:['Détendre la crème pâtissière refroidie au fouet.','Incorporer délicatement la crème au beurre à la maryse.','Mettre en poche cannelée pour le montage des Paris-Brest.'],
    notes:['→ Utilisée dans : <span data-goto="paris_brest" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Paris-Brest (Cédric Grolet)</span>.']
  },

}; // ← FIN DU FICHIER
