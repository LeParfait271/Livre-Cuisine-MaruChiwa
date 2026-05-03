diff --git a/recipes.js b/recipes.js
index 072646a9c2c9d5d7d924b0682461ff8984c8e39d..ad6ae33f45ae1571f48eabd950f2e584a4bf4eb5 100644
--- a/recipes.js
+++ b/recipes.js
@@ -1,220 +1,124 @@
 // ============================================================
-//  Le Grimoire Culinaire de MaruChiwa — recipes.js
+//  Cook Note — recipes.js
 //  window.RECIPES (majuscules) — requis par app.js
 // ============================================================
 
 window.RECIPES = {
 
   // Entrées / Apéro
   vinaigrette: { title:'Vinaigrette de chef (variantes)', categories:['Entrées','Apéro'], seasons:['Toutes saisons'], difficulty:'easy',
     ingredients:[{group:'Base',items:['30 g moutarde de Dijon','45 g vinaigre de vin rouge ou Xérès','2 g sel fin, 1 g poivre','150 g huile (80 g neutre + 70 g olive)','5 g miel (option)']}],
     steps:['Fouetter moutarde + vinaigre + sel/poivre (et miel).','Verser les huiles en filet pour émulsionner.','Goûter et ajuster.'],
     notes:['Ratio huile:acide 3:1 à 4:1 selon la salade.','Variantes : citron, herbes, miso blanc, yaourt grec.',
-      '→ Voir aussi : <span data-goto="pesto_salades" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Pesto pour salades</span>',
+      '→ Voir aussi : <span data-goto="pesto_variantes" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Pesto (variantes)</span>',
       'Stockage optimal : flacon avec couvercle au réfrigérateur ; secouer avant usage.',
       'Conservation : 5–7 j au froid.']
   },
 
-  pesto_salades: { title:'Pesto pour salades (froid, citronné)', categories:['Entrées','Apéro'], seasons:['Printemps','Été'], difficulty:'easy',
-    ingredients:[{group:'Base',items:["50 g basilic","40 g parmesan 24 mois râpé","30 g pignons grillés","1 gousse d'ail dégermée","45 g huile d'olive","45 g huile neutre (colza/tournesol)","10 g jus de citron","Sel fin, poivre"]}],
-    steps:["Mixer basilic + pignons + ail + parmesan.","Monter à l'huile ; détendre avec citron.","Assaisonner."],
-    notes:["Noisette ou amandes à la place des pignons.",
-      '→ Version traditionnelle : <span data-goto="pesto_genovese_hg" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Pesto alla Genovese</span>',
-      "Stockage optimal : pot hermétique au froid, fine couche d'huile en surface.",
-      "Conservation : 3–4 j au froid (filmer au contact) ; congélateur 2 mois (sans fromage)."]
-  },
-
-  pesto_genovese_hg: { title:'Pesto alla Genovese', categories:['Entrées'], seasons:['Printemps','Été'], difficulty:'medium',
-    ingredients:[{group:'Mortier (idéal)',items:["60 g basilic Genovese","30 g pignons","15 g Parmigiano Reggiano (24–30 mois)","15 g Pecorino Sardo","1 petite gousse d'ail","100–120 g huile d'olive EV fruitée","2–3 g sel"]}],
-    steps:["Piler ail + sel, ajouter pignons, puis basilic par petites poignées.","Incorporer les fromages, détendre doucement à l'huile jusqu'à texture crémeuse.","Utiliser aussitôt (pâtes, gnocchi) ou filmer au contact."],
-    notes:["Mixer : à-coups courts pour limiter l'oxydation.",
-      '→ Version simplifiée et citronnée : <span data-goto="pesto_salades" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Pesto pour salades</span>',
-      "Stockage optimal : pot en verre hermétique, fine couche d'huile d'olive en surface, au réfrigérateur.",
-      "Conservation : 2–3 j au froid (film au contact + huile) ; congélateur 1 mois sans fromage."]
+  pesto_variantes: { title:'Pesto (base + variantes)', categories:['Entrées','Apéro'], seasons:['Printemps','Été'], difficulty:'easy',
+    ingredients:[
+      {group:'Version salade (citronnée)',items:["50 g basilic","40 g parmesan râpé","30 g pignons grillés","1 gousse d'ail","45 g huile d'olive","45 g huile neutre","10 g jus de citron","Sel, poivre"]},
+      {group:'Version Genovese (traditionnelle)',items:["60 g basilic Genovese","30 g pignons","15 g Parmigiano Reggiano","15 g Pecorino","1 petite gousse d'ail","100–120 g huile d'olive EV","2–3 g sel"]}
+    ],
+    steps:["Version salade : mixer basilic + pignons + ail + parmesan puis monter à l’huile et citron.","Version Genovese : piler ail + sel + pignons, ajouter le basilic puis les fromages et l’huile."],
+    notes:["Même fiche, 2 styles : citronné (salades) ou traditionnel (pâtes/gnocchi).","Conservation : 2–4 j au froid, film au contact + fine couche d’huile."]
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
 
-  tomates_sechees: { title:'Tomates séchées (four doux)', categories:['Entrées','Apéro'], seasons:['Été','Automne'], difficulty:'easy',
-    ingredients:[{group:'Base',items:["1 kg tomates Roma","Sel fin","Huile d'olive","Thym"]}],
-    steps:['Couper en 2, épépiner légèrement.',"Saler, thym, four 90–100 °C 2h30–3h.",'Conserver couvert d\'huile.'],
-    notes:['Parfait pour antipasti, salades, pâtes froides.','Conservation : 2–3 semaines au froid sous huile.']
-  },
-
-  tomates_confites: { title:'Tomates confites (huile/ail)', categories:['Entrées','Apéro'], seasons:['Été','Automne'], difficulty:'easy',
-    ingredients:[{group:'Base',items:["1 kg tomates cerises","6 g sel","3 g sucre","4 gousses d'ail","Branches de thym","Huile d'olive"]}],
-    steps:["Four 120 °C 1h30–2h avec ail et thym, arroser d'huile.",'Refroidir et conserver au froid sous huile.'],
-    notes:['Excellent en bruschetta / salade de pâtes.','Conservation : 6–7 j au froid sous huile.']
+  tomates_variantes: { title:'Tomates au four (séchées ou confites)', categories:['Entrées','Apéro'], seasons:['Été','Automne'], difficulty:'easy',
+    ingredients:[
+      {group:'Version séchées',items:["1 kg tomates Roma","Sel fin","Thym","Huile d'olive pour conservation"]},
+      {group:'Version confites',items:["1 kg tomates cerises","6 g sel","3 g sucre","4 gousses d'ail","Branches de thym","Huile d'olive"]}
+    ],
+    steps:["Version séchées : four 90–100 °C pendant 2h30–3h.","Version confites : four 120 °C pendant 1h30–2h avec ail + thym et filet d’huile.","Refroidir puis conserver sous huile au frais."],
+    notes:['Séchées : parfaites pour antipasti et salades.','Confites : idéales en bruschetta / pâtes.']
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
 
-  cookies_sales_jambon_fromage: { title:'Cookies salés jambon & fromage', categories:['Entrées','Apéro'], seasons:['Toutes saisons'], difficulty:'easy',
-    yield:'18–20 pièces',
-    ingredients:[{group:'Appareil',items:['150 g farine','100 g jambon en dés','100 g fromage râpé (gruyère/comté)','75 g beurre doux mou','1 œuf','1/2 c. à c. levure chimique','Sel, poivre',"1 c. à s. moutarde à l'ancienne (option)"]}],
-    steps:['Crémer beurre ; œuf ; secs ; jambon/fromage.','Bouler, aplatir 1 cm ; cuire 180 °C 12–15 min.'],
-    notes:['Conservation : 3 j boîte hermétique.']
-  },
-
-  cookies_sales_comte: { title:'Cookies salés au comté', categories:['Entrées','Apéro'], seasons:['Toutes saisons'], difficulty:'easy',
+  cookies_sales_variantes: { title:'Cookies salés (base + variantes)', categories:['Entrées','Apéro'], seasons:['Toutes saisons'], difficulty:'easy',
     yield:'18–20 pièces',
-    ingredients:[{group:'Appareil',items:['150 g farine','120 g comté râpé','75 g beurre doux mou','1 œuf','1/2 c. à c. levure chimique','Sel, poivre']}],
-    steps:['Procédé identique aux cookies salés jambon/fromage.'],
-    notes:['Conservation : 3 j boîte hermétique.']
-  },
-
-  // Plats
-  buns_brioche: { title:'Buns burger briochés (tangzhong)', categories:['Plats'], seasons:['Toutes saisons'], difficulty:'medium',
-    yield:'8–10 buns (95–105 g)',
-    ingredients:[
-      {group:'Tangzhong',items:['25 g farine','125 g lait']},
-      {group:'Pâte',items:['500 g farine T45/T55','180 g lait','1 œuf','40 g sucre','9 g sel','7 g levure instantanée (ou 9 g sèche active / 21 g fraîche)','60 g beurre mou']},
-      {group:'Dorure',items:["1 jaune + 1 c. à s. d'eau","Graines"]}
-    ],
-    steps:['Cuire tangzhong ; refroidir.','Pétrir pâte ; incorporer beurre ; fenêtre.','Pointage 60–90 min ; bouler 95–105 g ; apprêt 45–60 min.','Dorer ; cuire 180–190 °C 12–16 min.'],
-    notes:['Stockage optimal : enveloppés individuellement dans film plastique à température ambiante.',
-      'Conservation : 2 j filmés à T° ambiante ; congélateur 1 mois (décongeler à T° ambiante).',
-      '→ Même technique de base que les <span data-goto="donuts_cloud" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Donuts Cloud-like</span>']
-  },
-
-  boeuf_bourguignon: { title:'Bœuf bourguignon', categories:['Plats'], seasons:['Toutes saisons'], difficulty:'medium',
-    yield:'6 portions',
-    ingredients:[
-      {group:'Base',items:['1.5 kg paleron (cubes 4–5 cm)','150 g poitrine fumée (lardons)','400 g carotte','250 g oignon','40 g concentré de tomate','750 g vin rouge corsé','500 g fond brun (ou eau)','Bouquet garni','Sel/poivre','Champignons + petits oignons glacés pour finition']},
-      {group:'Beurre manié (option)',items:['20 g beurre','20 g farine']}
-    ],
-    steps:['Colorer bœuf et lardons ; suer oignons/carottes.','Ajouter concentré ; singer légèrement ; mouiller vin + fond.','Bouquet, mijoter 2 h 30–3 h jusqu\'à fondant.','Épaissir au beurre manié si besoin ; ajouter garniture bourguignonne.'],
-    notes:['Meilleur le lendemain : les saveurs se développent.',
-      'Stockage optimal : dans la cocotte ou boîte hermétique au froid, dégraissé avant de réchauffer.',
-      'Conservation : 3–4 j au froid ; congélateur 3 mois (sans les légumes fragiles).']
-  },
-
-  cassoulet: { title:'Cassoulet', categories:['Plats'], seasons:['Toutes saisons'], difficulty:'hard',
-    yield:'8 portions',
-    ingredients:[{group:'Base',items:['700 g haricots lingots trempés','800 g confit de canard (4 cuisses)','600 g épaule de porc','300 g saucisse de Toulouse','150 g couenne + 150 g poitrine salée','1 oignon, 2 carottes, 4 gousses d\'ail','1 bouquet garni','1 clou de girofle','1 c. à s. concentré de tomate','Sel/poivre']}],
-    steps:['Cuire les lingots avec couennes + aromates.','Colorer viandes ; dégraisser ; réunir avec haricots et mouiller de bouillon.','Cuire au four 2–3 h à 160–170 °C en cassole, en cassant la croûte 3 fois.'],
-    notes:['Repos 24 h au froid puis réchauffage = supérieur.','Conservation : 4–5 j au froid ; congélateur 2–3 mois.']
-  },
-
-  puree_robuchon: { title:'Purée de pommes de terre — Joël Robuchon (originale)', categories:['Plats'], seasons:['Toutes saisons'], difficulty:'hard',
-    ingredients:[{group:'Base',items:['1 kg pommes de terre (Ratte)','250 g beurre doux froid en dés','250 ml lait entier bouillant','Sel fin']}],
-    steps:["Cuire en robe ; passer fin.","Dessécher 5 min.","Incorporer le beurre en 3 fois, puis lait bouillant jusqu'à texture soyeuse.","Assaisonner ; tamiser fin pour la version atelier."],
-    notes:['Conservation : meilleur le jour même.']
-  },
-
-  curry_porc_chef: { title:'Curry de porc — recette de chef', categories:['Plats'], seasons:['Toutes saisons'], difficulty:'medium',
-    yield:'6 portions',
     ingredients:[
-      {group:'Viande',items:['1.2 kg épaule de porc (cubes 3 cm)','8 g sel','15 g huile']},
-      {group:"Pâte d'épices",items:['200 g oignon','20 g ail','20 g gingembre','10 g pâte de curry rouge (ou 12 g poudre madras)','5 g curcuma','2 g graines de fenouil','6 g cumin moulu','4 g coriandre moulue','2 g piment','30 g concentré de tomate']},
-      {group:'Liquides & finition',items:['400 g lait de coco 1er pressage','250 g fond blanc ou eau','2 feuilles de combava (ou zeste de citron vert)','10 g sucre de palme (ou cassonade)','15 g sauce poisson (ou sel)','15 g jus de citron vert','Coriandre fraîche']}
+      {group:'Base commune',items:['150 g farine','75 g beurre doux mou','1 œuf','1/2 c. à c. levure chimique','Sel, poivre']},
+      {group:'Variante jambon-fromage',items:['100 g jambon en dés','100 g fromage râpé','1 c. à s. moutarde à l’ancienne (option)']},
+      {group:'Variante comté',items:['120 g comté râpé']}
     ],
-    steps:['Colorer le porc ; réserver.','Suer oignon ; ajouter ail + gingembre ; torréfier les épices/pâte 2–3 min.','Ajouter concentré ; déglacer avec un peu de lait de coco.','Remettre le porc ; mouiller lait de coco + fond ; ajouter combava.','Mijoter 45–60 min ; découvrir pour napper.','Assaisonner sucre/nuoc-mâm et acidité citron vert.'],
-    notes:['Meilleur le lendemain : les épices se fondent.',
-      'Stockage optimal : boîte hermétique au réfrigérateur, riz séparé.',
-      'Conservation : 3–4 j au froid ; congélateur 2 mois (sans garnitures fraîches).']
+    steps:['Crémer beurre puis incorporer l’œuf.','Ajouter farine + levure + assaisonnement, puis les ingrédients de la variante choisie.','Former des boules, aplatir à 1 cm et cuire 12–15 min à 180 °C.'],
+    notes:['Variante 1 : jambon-fromage ; Variante 2 : comté seul.','Conservation : 3 j boîte hermétique.']
   },
 
-  // Petits-déjeuners / Desserts
-  donuts_leves: { title:'Donuts au sucre (levés)', categories:['Petits-déjeuners','Desserts'], seasons:['Toutes saisons'], difficulty:'medium',
-    yield:'12–16 donuts (Ø 7–8 cm)',
+  pancakes_variantes: { title:'Pancakes (lait ou babeurre + base babeurre maison)', categories:['Petits-déjeuners'], seasons:['Toutes saisons'], difficulty:'easy',
+    yield:'10–12 pancakes',
     ingredients:[
-      {group:'Pâte',items:['500 g farine T45/T55','60 g sucre','9 g sel','12 g levure sèche active (ou 30 g levure fraîche)','260 g lait entier tiède','2 œufs (100 g)','60 g beurre mou']},
-      {group:'Friture',items:['Huile à 175 °C']},
-      {group:'Finition',items:['Sucre semoule 120 g']}
+      {group:'Base sèche',items:['250 g farine','40 g sucre','10 g levure chimique','3 g sel']},
+      {group:'Version lait',items:['2 œufs','300 g lait','40 g beurre fondu']},
+      {group:'Version babeurre',items:['2 œufs','300 g babeurre','40 g beurre fondu']},
+      {group:'Babeurre maison (si besoin)',items:['250 g lait entier','10 g jus de citron ou vinaigre','Repos 10 min']}
     ],
-    steps:['Pétrir 8–10 min jusqu\'à lisse ; pointage 1 h.','Abaisser 12 mm ; détailler anneaux ; apprêt 40–60 min.','Frire 175 °C 60–75 s / face ; égoutter, sucrer.'],
-    notes:['Conservation : meilleurs le jour même ; congélation pâte crue découpée possible.',
-      '→ Pour les fourrer : voir la <span data-goto="creme_diplomate_cloud" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Crème diplomate vanille</span>',
-      '→ Version rapide : <span data-goto="mascarpone" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Chantilly mascarpone</span>']
-  },
-
-  crepes_hd: { title:'Pâte à crêpes', categories:['Petits-déjeuners'], seasons:['Toutes saisons'], difficulty:'easy',
-    yield:'≈ 10–12 crêpes (26 cm)',
-    ingredients:[{group:'Base',items:['250 g farine T55 tamisée','500 g lait entier','3 œufs entiers (150 g)','25 g beurre noisette','20 g sucre','2 g sel']}],
-    steps:['Mélanger secs ; incorporer œufs puis lait en 3 fois ; ajouter beurre noisette.','Repos 30–60 min ; poêle antiadhésive très chaude légèrement beurrée.'],
-    notes:['Conservation : pâte 24 h au froid ; crêpes 2 j filmées.']
-  },
-
-  pancake_babeurre: { title:'Pancakes au babeurre', categories:['Petits-déjeuners'], seasons:['Toutes saisons'], difficulty:'easy',
-    yield:'10–12 pancakes',
-    ingredients:[{group:'Pâte',items:['250 g farine','40 g sucre','10 g levure chimique','3 g sel','2 œufs','300 g babeurre','40 g beurre fondu']}],
-    steps:['Secs puis liquides ; repos 10 min ; poêle beurrée.'],
-    notes:['Conservation : pâte 4 h au froid ; cuits 2 j filmés.']
-  },
-
-  pancake_lait: { title:'Pancakes au lait', categories:['Petits-déjeuners'], seasons:['Toutes saisons'], difficulty:'easy',
-    yield:'10–12 pancakes',
-    ingredients:[{group:'Pâte',items:['250 g farine','40 g sucre','10 g levure chimique','3 g sel','2 œufs','300 g lait','40 g beurre fondu']}],
-    steps:['Même procédé que babeurre.'],
-    notes:['Conservation : pâte 4 h ; cuits 2 j filmés.']
-  },
-
-  babeurre_maison: { title:'Babeurre maison', categories:['Petits-déjeuners'], seasons:['Toutes saisons'], difficulty:'easy',
-    ingredients:[{group:'Base',items:['250 g lait entier','10 g jus de citron ou vinaigre','Repos 10 min puis utiliser']}],
-    steps:['Mélanger, laisser cailler 10 minutes.'],
-    notes:['Remplace le babeurre en pâtisserie/pancakes.']
+    steps:['Mélanger les ingrédients secs.','Ajouter les liquides de la version choisie et mélanger juste assez (pas trop travailler).','Repos 10 min puis cuisson en petites louches sur poêle beurrée.'],
+    notes:['Pour la version babeurre maison : préparer le babeurre 10 min avant.','Conservation : pâte 4 h au froid ; pancakes cuits 2 j filmés.']
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
     notes:['Parfums : vanille, cacao, café, coco (1–2 %).',
       '→ Version plus stable : <span data-goto="mascarpone" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Chantilly mascarpone</span> ou <span data-goto="chantilly_gelatine" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Chantilly gélatine</span>',
       'Stockage optimal : dans un bol filmé ou en poche à douille au réfrigérateur.',
       'Conservation : 24 h au froid maximum.']
   },
 
   mascarpone: { title:'Chantilly riche (mascarpone)', categories:['Desserts'], seasons:['Toutes saisons'], difficulty:'easy',
     ingredients:[{group:'Base',items:['250 g crème 35 % froide','125 g mascarpone','40 g sucre glace']}],
     steps:["Fouetter froid jusqu'à bec d'oiseau souple."],
     notes:['Aromatiser : vanille, cacao, coco (1–2 %).',
       '→ Version avec tenue longue durée : <span data-goto="chantilly_gelatine" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Chantilly stabilisée gélatine</span>',
       '→ Parfait pour fourrer les <span data-goto="donuts_cloud" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Donuts Cloud-like</span>',
@@ -412,28 +316,84 @@ window.RECIPES = {
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
-  }
+  },
+
+  paris_brest: { title:'Paris-Brest (Cédric Grolet)', categories:['Desserts'], seasons:['Toutes saisons'], difficulty:'hard',
+    yield:'5 à 6 Paris-Brest individuels',
+    ingredients:[
+      {group:'Assemblage final',items:['5–6 couronnes de pâte à choux cuites avec craquelin','Crème au praliné','50 g noisettes torréfiées concassées','QS praliné noisette pur']},
+      {group:'Composants liés',items:[
+        '→ Voir : <span data-goto="craquelin_cacao" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Craquelin cacao</span>',
+        '→ Voir : <span data-goto="pate_choux" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Pâte à choux</span>',
+        '→ Voir : <span data-goto="pate_noisette" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Pâte de noisette</span>',
+        '→ Voir : <span data-goto="creme_patissiere_praline" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Crème pâtissière praliné</span>',
+        '→ Voir : <span data-goto="creme_beurre_meringue_italienne" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Crème au beurre meringue italienne</span>',
+        '→ Voir : <span data-goto="creme_praline" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Crème praliné</span>'
+      ]}
+    ],
+    steps:['Cuire les couronnes de pâte à choux avec le craquelin.','Couper chaque couronne dans la hauteur.','Pocher un peu de praliné pur au fond (optionnel), puis pocher la crème au praliné.','Ajouter quelques points de praliné pur, refermer avec le chapeau, puis décorer avec les noisettes concassées.'],
+    notes:['Recette adaptée de la version publiée sur iletaitungateau.com (article 30).','Sortir du réfrigérateur 30 à 40 min avant dégustation.']
+  },
+
+  craquelin_cacao: { title:'Craquelin cacao (Paris-Brest)', categories:['Desserts','Recettes de base'], seasons:['Toutes saisons'], difficulty:'easy',
+    ingredients:[{group:'Base',items:['40 g beurre pommade','45 g farine','50 g cassonade','6 g cacao non sucré','25 g blancs d’œufs','40 g noisettes concassées']}],
+    steps:['Mélanger farine + cassonade + cacao, puis incorporer le beurre.','Étaler à 2 mm entre deux feuilles et congeler 30 min.','Découper des anneaux (Ø 8 cm, trou Ø 2 cm), badigeonner de blanc d’œuf, ajouter les noisettes puis recongeler jusqu’à usage.'],
+    notes:['Composant pour : <span data-goto="paris_brest" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Paris-Brest (Cédric Grolet)</span>.']
+  },
+
+  pate_choux: { title:'Pâte à choux (Paris-Brest)', categories:['Desserts','Recettes de base'], seasons:['Toutes saisons'], difficulty:'medium',
+    ingredients:[{group:'Base',items:['62 g lait','62 g eau','2 g sel','55 g beurre','75 g farine','100 g œufs (≈2)']}],
+    steps:['Porter à ébullition eau + lait + sel + beurre.','Hors du feu, ajouter la farine en une fois puis dessécher sur feu doux.','Refroidir légèrement au robot (feuille), puis incorporer les œufs progressivement jusqu’à texture lisse.','Pocher des couronnes de 7 cm, poser le craquelin puis cuire à 170 °C pendant 40 à 45 min.'],
+    notes:['Le test du sillon : il doit se refermer doucement quand la texture est correcte.']
+  },
+
+  pate_noisette: { title:'Pâte de noisette maison', categories:['Desserts','Recettes de base'], seasons:['Toutes saisons'], difficulty:'easy',
+    ingredients:[{group:'Base',items:['250 g noisettes torréfiées','13,5 g sucre glace','0,5 g fleur de sel']}],
+    steps:['Mixer longuement tous les ingrédients jusqu’à obtention d’une pâte lisse et fluide.'],
+    notes:['Composant utilisable dans crèmes, pralinés et ganaches.']
+  },
+
+  creme_patissiere_praline: { title:'Crème pâtissière praliné (Paris-Brest)', categories:['Desserts','Recettes de base'], seasons:['Toutes saisons'], difficulty:'medium',
+    ingredients:[{group:'Base',items:['3,5 g gélatine poudre + 16 g eau','150 g lait','32 g crème liquide','30 g sucre','9 g maïzena','9 g farine','30 g jaunes d’œufs','10 g beurre de cacao','17 g beurre','10 g mascarpone','30 g pâte de noisette','60 g praliné noisette']}],
+    steps:['Réhydrater la gélatine dans l’eau froide.','Porter lait + crème à ébullition. Blanchir jaunes + sucre, puis ajouter maïzena et farine.','Verser le liquide chaud sur les jaunes, remettre en casserole et cuire jusqu’à épaississement.','Hors du feu, ajouter gélatine, beurre de cacao, beurre, mascarpone, pâte de noisette et praliné. Mixer, filmer au contact, refroidir.'],
+    notes:['Ajuster le praliné/pâte de noisette selon l’intensité souhaitée.']
+  },
+
+  creme_beurre_meringue_italienne: { title:'Crème au beurre (base crème anglaise + meringue italienne)', categories:['Desserts','Recettes de base'], seasons:['Toutes saisons'], difficulty:'hard',
+    ingredients:[
+      {group:'Crème anglaise au beurre',items:['45 g lait','45 g sucre','35 g jaunes d’œufs','200 g beurre pommade']},
+      {group:'Meringue italienne',items:['20 g eau','60 g sucre','30 g blancs d’œufs']}
+    ],
+    steps:['Cuire la crème anglaise (lait + jaunes + sucre) à 84 °C, puis refroidir légèrement.','Foisonner le beurre pommade puis incorporer progressivement la crème anglaise.','Réaliser une meringue italienne (sirop 121 °C versé sur blancs mousseux) puis incorporer délicatement à la crème au beurre.'],
+    notes:['Base technique pour plusieurs entremets/pâtisseries classiques.']
+  },
+
+  creme_praline: { title:'Crème praliné (montage Paris-Brest)', categories:['Desserts','Recettes de base'], seasons:['Toutes saisons'], difficulty:'medium',
+    ingredients:[{group:'Assemblage',items:['390 g crème pâtissière praliné (ou totalité préparée)','300 g crème au beurre (environ)']}],
+    steps:['Détendre la crème pâtissière refroidie au fouet.','Incorporer délicatement la crème au beurre à la maryse.','Mettre en poche cannelée pour le montage des Paris-Brest.'],
+    notes:['→ Utilisée dans : <span data-goto="paris_brest" style="color:#fbbf24;text-decoration:underline;cursor:pointer">Paris-Brest (Cédric Grolet)</span>.']
+  },
 
-}; // ← FIN DU FICHIER
\ No newline at end of file
+}; // ← FIN DU FICHIER
