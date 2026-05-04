// ============================================================
//  Cook Note - recipes.js
//  Source publique des recettes et fiches parents.
// ============================================================

window.RECIPES = {
  "coulis_maitre": {
    "title": "Coulis de fruits",
    "image": "/assets/recipe-images/coulis_maitre.jpg",
    "categories": [
      "Desserts",
      "Recettes de base"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "masterType": "collection",
    "variants": [
      {
        "id": "coulis_guide",
        "label": "Guide & formules"
      },
      {
        "id": "coulis_fraise",
        "label": "Fraise"
      },
      {
        "id": "coulis_framboise",
        "label": "Framboise"
      },
      {
        "id": "coulis_abricot_vanille",
        "label": "Abricot-vanille"
      },
      {
        "id": "coulis_poire",
        "label": "Poire"
      }
    ],
    "ingredients": [
      {
        "group": "Choisir une variante",
        "items": [
          "Sélectionner le coulis voulu dans les boutons de la fiche."
        ]
      }
    ],
    "steps": [
      "Choisir une variante pour afficher ses ingrédients, étapes, notes et conservation."
    ],
    "notes": [
      "Fiche maître : toutes les recettes de coulis du carnet sont regroupées ici."
    ],
    "tags": [
      "coulis",
      "fruit",
      "dessert",
      "base"
    ],
    "technical": [
      {
        "label": "Texture",
        "value": "Mixer finement puis tamiser pour un coulis net et brillant."
      },
      {
        "label": "Sucre",
        "value": "Ajuster selon le fruit et l'acidite, sans masquer le gout principal."
      },
      {
        "label": "Service",
        "value": "Refroidir avant dressage pour garder une tenue precise."
      }
    ],
    "master": "cremes_maitre"
  },
  "chantilly_maitre": {
    "title": "Chantilly",
    "image": "/assets/recipe-images/ricotta_fouettee.jpg",
    "categories": [
      "Desserts",
      "Recettes de base"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "masterType": "collection",
    "variants": [
      {
        "id": "chantilly_classique",
        "label": "Classique"
      },
      {
        "id": "chantilly_gelatine",
        "label": "Stabilisée gélatine"
      }
    ],
    "ingredients": [
      {
        "group": "Choisir une variante",
        "items": [
          "Sélectionner la chantilly voulue dans les boutons de la fiche."
        ]
      }
    ],
    "steps": [
      "Choisir une variante pour afficher la méthode adaptée."
    ],
    "notes": [
      "Fiche maître : chantilly simple, riche ou stabilisée."
    ],
    "tags": [
      "chantilly",
      "creme",
      "dessert",
      "base"
    ],
    "technical": [
      {
        "label": "Froid",
        "value": "Creme, bol et fouet bien froids avant montage."
      },
      {
        "label": "Tenue",
        "value": "Arreter des que la texture forme un bec souple a ferme selon l'usage."
      },
      {
        "label": "Sucre",
        "value": "Incorporer progressivement pour garder une bouche legere."
      }
    ],
    "master": "cremes_maitre"
  },
  "cremes_maitre": {
    "title": "Toping et garniture",
    "image": "/assets/recipe-images/ricotta_fouettee.jpg",
    "categories": [
      "Desserts",
      "Recettes de base"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "medium",
    "masterType": "collection",
    "variants": [
      {
        "id": "chantilly_classique",
        "label": "Chantilly classique au fouet"
      },
      {
        "id": "chantilly_gelatine",
        "label": "Chantilly stabilisée (gélatine)"
      },
      {
        "id": "coulis_guide",
        "label": "Coulis — guide (formules & variantes)"
      },
      {
        "id": "coulis_fraise",
        "label": "Coulis de fraise"
      },
      {
        "id": "coulis_framboise",
        "label": "Coulis de framboise"
      },
      {
        "id": "coulis_abricot_vanille",
        "label": "Coulis abricot-vanille"
      },
      {
        "id": "coulis_poire",
        "label": "Coulis de poire"
      },
      {
        "id": "creme_diplomate_vanille",
        "label": "Crème diplomate vanille"
      },
      {
        "id": "creme_diplomate_cloud",
        "label": "Crème diplomate vanille (pour donuts & choux)"
      },
      {
        "id": "creme_patissiere_praline",
        "label": "Crème pâtissière praliné"
      },
      {
        "id": "creme_praline",
        "label": "Crème praliné"
      },
      {
        "id": "creme_beurre_meringue_italienne",
        "label": "Crème au beurre (base crème anglaise + meringue italienne)"
      },
      {
        "id": "creme_amande_",
        "label": "Crème d'amandes"
      },
      {
        "id": "mascarpone",
        "label": "Crème mascarpone vanille"
      },
      {
        "id": "creme_kinder_nutella",
        "label": "Crème Kinder / Nutella stable"
      },
      {
        "id": "creme_pistache",
        "label": "Crème pistache stable"
      },
      {
        "id": "creme_patissiere_vanille",
        "label": "Crème pâtissière vanille"
      },
      {
        "id": "creme_citron_lemon_curd",
        "label": "Crème citron (lemon curd)"
      },
      {
        "id": "creme_amande_citron",
        "label": "Crème d’amande citron"
      },
      {
        "id": "compotee_citron",
        "label": "Compotée citron"
      },
      {
        "id": "meringue_italienne",
        "label": "Meringue italienne"
      }
    ],
    "ingredients": [
      {
        "group": "Sous-fiches",
        "items": [
          "Choisir une sous-fiche ou une variante pour afficher la recette."
        ]
      }
    ],
    "steps": [
      "Choisir une sous-fiche ou une variante pour afficher les étapes."
    ],
    "notes": [
      "Cette fiche regroupe les toppings, garnitures, chantillys, coulis et crèmes du carnet.",
      "Cliquer une sous-fiche pour ouvrir son propre groupe de recettes."
    ],
    "tags": [
      "creme",
      "patisserie",
      "garniture",
      "base",
      "toping",
      "chantilly",
      "coulis"
    ],
    "technical": [
      {
        "label": "Cuisson",
        "value": "Remuer constamment et stopper des que la creme epaissit franchement."
      },
      {
        "label": "Refroidissement",
        "value": "Filmer au contact pour eviter la peau et garder une texture lisse."
      },
      {
        "label": "Usage",
        "value": "Detendre au fouet avant pochage ou montage."
      }
    ],
    "master": "desserts_maitre"
  },
  "pates_bases_maitre": {
    "title": "Pâtes et bases pâtissières",
    "image": "/assets/recipe-images/pate_choux.jpg",
    "categories": [
      "Desserts",
      "Recettes de base"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "medium",
    "masterType": "collection",
    "variants": [
      {
        "id": "pate_choux",
        "label": "Pâte à choux"
      },
      {
        "id": "craquelin_cacao",
        "label": "Craquelin cacao"
      },
      {
        "id": "pate_noisette",
        "label": "Pâte de noisette maison"
      },
      {
        "id": "choux_craquelin",
        "label": "Choux au craquelin"
      },
      {
        "id": "paris_brest",
        "label": "Paris-Brest"
      },
      {
        "id": "pate_sucree",
        "label": "Pâte sucrée"
      }
    ],
    "ingredients": [
      {
        "group": "Choisir une variante",
        "items": [
          "Sélectionner la base ou le montage voulu dans les boutons de la fiche."
        ]
      }
    ],
    "steps": [
      "Choisir une variante pour afficher la recette complète."
    ],
    "notes": [
      "Fiche maître : bases techniques et montages liés."
    ],
    "tags": [
      "pate",
      "base",
      "choux",
      "patisserie"
    ],
    "technical": [
      {
        "label": "Temperature",
        "value": "Respecter le froid des matieres grasses et les temps de repos."
      },
      {
        "label": "Travail",
        "value": "Melanger juste ce qu'il faut pour eviter de corser les pates."
      },
      {
        "label": "Cuisson",
        "value": "Surveiller la coloration plutot que le minuteur seul."
      }
    ],
    "master": "desserts_maitre"
  },
  "sauces_assaisonnements_maitre": {
    "title": "Sauces, pestos et assaisonnements",
    "image": "/assets/recipe-images/sauces_assaisonnements_maitre.jpg",
    "categories": [
      "Entrées",
      "Apéro",
      "Recettes de base"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "masterType": "collection",
    "variants": [
      {
        "id": "vinaigrette",
        "label": "Vinaigrette"
      },
      {
        "id": "pesto_variantes",
        "label": "Pesto"
      },
      {
        "id": "balsamique_reduit",
        "label": "Balsamique réduit"
      },
      {
        "id": "huile_pimentee_pizza",
        "label": "Huile pimentée"
      },
      {
        "id": "marinades_guide",
        "label": "Marinades"
      }
    ],
    "ingredients": [
      {
        "group": "Choisir une variante",
        "items": [
          "Sélectionner la sauce ou l’assaisonnement voulu dans les boutons de la fiche."
        ]
      }
    ],
    "steps": [
      "Choisir une variante pour afficher la recette complète."
    ],
    "notes": [
      "Fiche maître : sauces froides, condiments, huiles et marinades."
    ],
    "tags": [
      "sauce",
      "pesto",
      "marinade",
      "assaisonnement"
    ],
    "technical": [
      {
        "label": "Equilibre",
        "value": "Verifier sel, acidite et gras en fin de preparation."
      },
      {
        "label": "Texture",
        "value": "Allonger par petites touches pour garder la concentration."
      },
      {
        "label": "Conservation",
        "value": "Filmer ou couvrir au contact quand la sauce attend."
      }
    ],
    "master": "entrees_maitre"
  },
  "tomates_maitre": {
    "title": "Tomates préparées",
    "image": "/assets/recipe-images/tomates_variantes.jpg",
    "categories": [
      "Entrées",
      "Apéro",
      "Recettes de base"
    ],
    "seasons": [
      "Été",
      "Automne"
    ],
    "difficulty": "easy",
    "masterType": "collection",
    "variants": [
      {
        "id": "tomates_variantes",
        "label": "Séchées ou confites"
      }
    ],
    "ingredients": [
      {
        "group": "Choisir une variante",
        "items": [
          "Sélectionner la préparation de tomates voulue dans les boutons de la fiche."
        ]
      }
    ],
    "steps": [
      "Choisir une variante pour afficher la recette complète."
    ],
    "notes": [
      "Fiche maître : préparations de tomates au four."
    ],
    "tags": [
      "tomate",
      "confit",
      "seche",
      "aperitif"
    ],
    "technical": [
      {
        "label": "Maturite",
        "value": "Choisir des tomates parfumees et bien egoutter si elles rendent beaucoup d'eau."
      },
      {
        "label": "Assaisonnement",
        "value": "Saler progressivement et corriger l'acidite en fin de preparation."
      },
      {
        "label": "Usage",
        "value": "Adapter la coupe selon sauce, garniture ou dressage."
      }
    ],
    "master": "entrees_maitre"
  },
  "biscuits_gouters_maitre": {
    "title": "Biscuits, cookies et meringues",
    "image": "/assets/recipe-images/cookies.jpg",
    "categories": [
      "Desserts",
      "Apéro",
      "Recettes de base"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "masterType": "collection",
    "variants": [
      {
        "id": "cookies_sales_variantes",
        "label": "Cookies salés (base + variantes)"
      },
      {
        "id": "cookies",
        "label": "Cookies américains"
      },
      {
        "id": "meringues",
        "label": "Meringues"
      }
    ],
    "ingredients": [
      {
        "group": "Choisir une variante",
        "items": [
          "Sélectionner le biscuit ou goûter voulu dans les boutons de la fiche."
        ]
      }
    ],
    "steps": [
      "Choisir une variante pour afficher la recette complète."
    ],
    "notes": [
      "Fiche maître : biscuits, cookies et petites préparations sucrées ou salées."
    ],
    "tags": [
      "cookies",
      "biscuits",
      "meringue",
      "gouter"
    ],
    "technical": [
      {
        "label": "Repos",
        "value": "Reposer la pate quand c'est indique pour une cuisson plus reguliere."
      },
      {
        "label": "Cuisson",
        "value": "Sortir legerement avant la texture finale, la chaleur residuelle termine le biscuit."
      },
      {
        "label": "Conservation",
        "value": "Stocker au sec apres refroidissement complet."
      }
    ],
    "master": "desserts_maitre"
  },
  "petits_dejeuners_maitre": {
    "title": "Petits-déjeuners et boissons chaudes",
    "image": "/assets/recipe-images/petits_dejeuners_maitre.jpg",
    "categories": [
      "Petits-déjeuners",
      "Desserts"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "masterType": "collection",
    "variants": [
      {
        "id": "pancakes_variantes",
        "label": "Pancakes"
      },
      {
        "id": "chocolat_ancien",
        "label": "Chocolat chaud"
      },
      {
        "id": "donuts_cloud",
        "label": "Donuts"
      },
      {
        "id": "gaufre_bruxelles",
        "label": "Gaufre de Bruxelles"
      }
    ],
    "ingredients": [
      {
        "group": "Choisir une variante",
        "items": [
          "Sélectionner la recette de petit-déjeuner voulue dans les boutons de la fiche."
        ]
      }
    ],
    "steps": [
      "Choisir une variante pour afficher la recette complète."
    ],
    "notes": [
      "Fiche maître : recettes du matin, goûter et boissons chaudes."
    ],
    "tags": [
      "petit-dejeuner",
      "pancakes",
      "donuts",
      "chocolat"
    ],
    "technical": [
      {
        "label": "Organisation",
        "value": "Preparer les pesees seches a l'avance pour un service rapide."
      },
      {
        "label": "Cuisson",
        "value": "Travailler a chaleur moderee pour garder moelleux et coloration propre."
      },
      {
        "label": "Service",
        "value": "Servir aussitot pour conserver le contraste chaud, moelleux ou mousseux."
      }
    ],
    "master": "petit_dejeuner_maitre"
  },
  "bases_salees_maitre": {
    "title": "Bases salées et accompagnements",
    "image": "/assets/recipe-images/bases_salees_maitre.jpg",
    "categories": [
      "Entrées",
      "Plats",
      "Recettes de base"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "masterType": "collection",
    "variants": [
      {
        "id": "ricotta_fouettee",
        "label": "Ricotta fouettée"
      },
      {
        "id": "legumes_rotis",
        "label": "Légumes rôtis"
      },
      {
        "id": "court_bouillon",
        "label": "Court-bouillon"
      }
    ],
    "ingredients": [
      {
        "group": "Choisir une variante",
        "items": [
          "Sélectionner la base salée ou l’accompagnement voulu dans les boutons de la fiche."
        ]
      }
    ],
    "steps": [
      "Choisir une variante pour afficher la recette complète."
    ],
    "notes": [
      "Fiche maître : bases salées, accompagnements et préparations de service."
    ],
    "tags": [
      "base",
      "accompagnement",
      "sale",
      "legumes"
    ],
    "technical": [
      {
        "label": "Assaisonnement",
        "value": "Gouter en fin de preparation, surtout apres reduction ou rotissage."
      },
      {
        "label": "Texture",
        "value": "Adapter coupe et cuisson a l'usage final de la base."
      },
      {
        "label": "Service",
        "value": "Garder les elements chauds separes si le dressage attend."
      }
    ],
    "master": "entrees_maitre"
  },
  "vinaigrette": {
    "title": "Vinaigrette de chef (variantes)",
    "master": "sauces_assaisonnements_maitre",
    "image": "/assets/recipe-images/vinaigrette.jpg",
    "categories": [
      "Entrées",
      "Apéro"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "30 g moutarde de Dijon",
          "45 g vinaigre de vin rouge ou Xérès",
          "2 g sel fin, 1 g poivre",
          "150 g huile (80 g neutre + 70 g olive)",
          "5 g miel (option)"
        ]
      }
    ],
    "steps": [
      "Fouetter moutarde + vinaigre + sel/poivre (et miel).",
      "Verser les huiles en filet pour émulsionner.",
      "Goûter et ajuster."
    ],
    "notes": [
      "Ratio huile:acide 3:1 à 4:1 selon la salade.",
      "Variantes : citron, herbes, miso blanc, yaourt grec.",
      "→ Voir aussi : <span data-goto=\"pesto_variantes\" style=\"color:#fbbf24;text-decoration:underline;cursor:pointer\">Pesto (variantes)</span>",
      "Stockage optimal : flacon avec couvercle au réfrigérateur ; secouer avant usage.",
      "Conservation : 5–7 j au froid.",
      "Stockage : bocal ou boîte hermétique au réfrigérateur. Péremption : 3–5 jours; vérifier odeur, texture et absence de fermentation."
    ],
    "difficultyScore": 4
  },
  "pesto_variantes": {
    "title": "Pesto (base + variantes)",
    "master": "sauces_assaisonnements_maitre",
    "image": "/assets/recipe-images/pesto_variantes.jpg",
    "categories": [
      "Entrées",
      "Apéro"
    ],
    "seasons": [
      "Printemps",
      "Été"
    ],
    "difficulty": "easy",
    "ingredients": [
      {
        "group": "Version salade (citronnée)",
        "items": [
          "50 g basilic",
          "40 g parmesan râpé",
          "30 g pignons grillés",
          "1 gousse d'ail",
          "45 g huile d'olive",
          "45 g huile neutre",
          "10 g jus de citron",
          "Sel, poivre"
        ]
      },
      {
        "group": "Version Genovese (traditionnelle)",
        "items": [
          "60 g basilic Genovese",
          "30 g pignons",
          "15 g Parmigiano Reggiano",
          "15 g Pecorino",
          "1 petite gousse d'ail",
          "100–120 g huile d'olive EV",
          "2–3 g sel"
        ]
      }
    ],
    "steps": [
      "Version salade : mixer basilic + pignons + ail + parmesan puis monter à l’huile et citron.",
      "Version Genovese : piler ail + sel + pignons, ajouter le basilic puis les fromages et l’huile."
    ],
    "notes": [
      "Même fiche, 2 styles : citronné (salades) ou traditionnel (pâtes/gnocchi).",
      "Conservation : 2–4 j au froid, film au contact + fine couche d’huile.",
      "Stockage : bocal ou boîte hermétique au réfrigérateur. Péremption : 3–5 jours; vérifier odeur, texture et absence de fermentation."
    ],
    "difficultyScore": 4
  },
  "ricotta_fouettee": {
    "title": "Ricotta fouettée (assaisonnements)",
    "master": "bases_salees_maitre",
    "image": "/assets/recipe-images/ricotta_fouettee.jpg",
    "categories": [
      "Entrées",
      "Apéro"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "250 g ricotta de qualité",
          "30 g crème 35 %",
          "Sel fin, poivre"
        ]
      }
    ],
    "steps": [
      "Fouetter 2–3 min ricotta + crème jusqu'à lisse et aérée ; assaisonner."
    ],
    "notes": [
      "Zaatar + huile d'olive ; Citron confit + aneth ; Miel + piment d'Espelette ; Truffe : 1–2 % huile de truffe.",
      "Conservation : 2–3 j au froid.",
      "Stockage : boîte hermétique adaptée, au réfrigérateur si la recette contient œufs, crème, viande ou garniture humide. Péremption : 2–3 jours."
    ],
    "difficultyScore": 3
  },
  "balsamique_reduit": {
    "title": "Balsamique réduit (variantes)",
    "master": "sauces_assaisonnements_maitre",
    "image": "/assets/recipe-images/balsamique_reduit.jpg",
    "categories": [
      "Entrées",
      "Apéro"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "250 g vinaigre balsamique IGP",
          "25–50 g sucre (au goût)"
        ]
      }
    ],
    "steps": [
      "Mijoter 12–20 min à feu doux jusqu'à nappant (réduction 1/2–2/3)."
    ],
    "notes": [
      "Variantes : zeste d'orange, vanille, cacao, espresso, figue (filtrer).",
      "Conservation : 2–3 mois au froid.",
      "Stockage : boîte hermétique adaptée, au réfrigérateur si la recette contient œufs, crème, viande ou garniture humide. Péremption : 2–3 jours."
    ],
    "difficultyScore": 3
  },
  "tomates_variantes": {
    "title": "Tomates au four (séchées ou confites)",
    "master": "tomates_maitre",
    "image": "/assets/recipe-images/tomates_variantes.jpg",
    "categories": [
      "Entrées",
      "Apéro"
    ],
    "seasons": [
      "Été",
      "Automne"
    ],
    "difficulty": "easy",
    "ingredients": [
      {
        "group": "Version séchées",
        "items": [
          "1 kg tomates Roma",
          "Sel fin",
          "Thym",
          "Huile d'olive pour conservation"
        ]
      },
      {
        "group": "Version confites",
        "items": [
          "1 kg tomates cerises",
          "6 g sel",
          "3 g sucre",
          "4 gousses d'ail",
          "Branches de thym",
          "Huile d'olive"
        ]
      }
    ],
    "steps": [
      "Version séchées : four 90–100 °C pendant 2h30–3h.",
      "Version confites : four 120 °C pendant 1h30–2h avec ail + thym et filet d’huile.",
      "Refroidir puis conserver sous huile au frais."
    ],
    "notes": [
      "Séchées : parfaites pour antipasti et salades.",
      "Confites : idéales en bruschetta / pâtes.",
      "Stockage : bocal ou boîte hermétique au réfrigérateur. Péremption : 3–5 jours; vérifier odeur, texture et absence de fermentation."
    ],
    "difficultyScore": 6
  },
  "huile_pimentee_pizza": {
    "title": "Huile pimentée pour pizza (variantes)",
    "master": "sauces_assaisonnements_maitre",
    "image": "/assets/recipe-images/huile_pimentee_pizza.jpg",
    "categories": [
      "Entrées",
      "Plats"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "250 g huile d'olive",
          "4 piments secs",
          "1 gousse d'ail écrasée",
          "Zeste de 1/2 citron (option)"
        ]
      }
    ],
    "steps": [
      "Chauffer 60–70 °C 10 min avec piments + ail + zeste, couvrir et infuser 24 h.",
      "Filtrer."
    ],
    "notes": [
      "Variantes : poivre de Sichuan, origan, paprika fumé.",
      "Conservation : 1 mois au froid.",
      "Stockage : bocal ou boîte hermétique au réfrigérateur. Péremption : 3–5 jours; vérifier odeur, texture et absence de fermentation."
    ],
    "difficultyScore": 3
  },
  "legumes_rotis": {
    "title": "Légumes rôtis au four",
    "master": "bases_salees_maitre",
    "image": "/assets/recipe-images/legumes_rotis.jpg",
    "categories": [
      "Entrées",
      "Plats"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "ingredients": [
      {
        "group": "Temps de cuisson — chaleur tournante 200 °C",
        "items": [
          "Pomme de terre (dés 2–3 cm) — 35–45 min",
          "Patate douce (dés 2–3 cm) — 25–35 min",
          "Carotte (bâtonnets) — 22–30 min",
          "Panais (bâtonnets) — 25–35 min",
          "Betterave (dés 2–3 cm) — 35–45 min",
          "Céleri-rave (dés 2–3 cm) — 30–40 min",
          "Courge / butternut (dés 2–3 cm) — 25–35 min",
          "Brocoli (fleurettes) — 15–20 min",
          "Chou-fleur (fleurettes) — 20–25 min",
          "Choux de Bruxelles (moitiés) — 20–25 min",
          "Poivron (lanières) — 20–25 min",
          "Courgette (quartiers) — 18–22 min",
          "Aubergine (dés 2–3 cm) — 25–35 min",
          "Oignon (quartiers) — 25–30 min",
          "Fenouil (quartiers) — 25–35 min",
          "Poireau (tronçons 3–4 cm) — 20–25 min",
          "Asperges (grosses, parées) — 10–14 min",
          "Champignons (gros quartiers) — 12–18 min",
          "Tomate (demies Roma) — 20–25 min",
          "Haricots verts (secs et parés) — 12–15 min"
        ]
      }
    ],
    "steps": [
      "Four 200 °C chaleur tournante. Assaisonner, étaler, rôtir jusqu'à coloration et tendreté."
    ],
    "notes": [
      "Plaque préchauffée = croûte plus nette.",
      "Conservation : 4 j au réfrigérateur.",
      "Stockage : bocal ou boîte hermétique au réfrigérateur. Péremption : 3–5 jours; vérifier odeur, texture et absence de fermentation."
    ],
    "difficultyScore": 3
  },
  "marinades_guide": {
    "title": "Marinades — 10 signatures",
    "master": "sauces_assaisonnements_maitre",
    "image": "/assets/recipe-images/marinades_guide.jpg",
    "categories": [
      "Entrées",
      "Plats"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "ingredients": [
      {
        "group": "1) Méditerranéenne",
        "items": [
          "40 g huile d'olive",
          "20 g jus de citron",
          "2 g zeste",
          "2 g origan",
          "2 g ail râpé",
          "Sel/poivre"
        ]
      },
      {
        "group": "2) Teriyaki rapide",
        "items": [
          "40 g sauce soja",
          "20 g mirin",
          "10 g sucre",
          "10 g vinaigre de riz",
          "2 g gingembre",
          "1 g ail"
        ]
      },
      {
        "group": "3) Tandoori yaourt",
        "items": [
          "100 g yaourt grec",
          "6 g pâte tandoori ou 4 g garam masala",
          "5 g jus de citron",
          "2 g ail",
          "2 g gingembre",
          "Sel"
        ]
      },
      {
        "group": "4) BBQ fumé",
        "items": [
          "40 g ketchup",
          "20 g sauce soja",
          "10 g miel",
          "10 g vinaigre de cidre",
          "2 g paprika fumé",
          "1 g ail"
        ]
      },
      {
        "group": "5) Chermoula",
        "items": [
          "40 g huile d'olive",
          "20 g jus de citron",
          "10 g coriandre hachée",
          "10 g persil",
          "2 g cumin",
          "1 g paprika",
          "1 g ail"
        ]
      },
      {
        "group": "6) Citron-herbes volaille",
        "items": [
          "40 g huile neutre",
          "20 g jus de citron",
          "5 g moutarde",
          "herbes fraîches",
          "Sel/poivre"
        ]
      },
      {
        "group": "7) Porc miel-moutarde",
        "items": [
          "40 g miel",
          "20 g moutarde",
          "10 g sauce soja",
          "10 g vinaigre",
          "1 g ail"
        ]
      },
      {
        "group": "8) Mexicaine",
        "items": [
          "40 g huile",
          "20 g jus de citron vert",
          "2 g cumin",
          "2 g paprika",
          "1 g piment",
          "1 g ail"
        ]
      },
      {
        "group": "9) Thaï citronnelle",
        "items": [
          "40 g huile",
          "10 g nuoc-mâm",
          "10 g jus de citron vert",
          "2 g citronnelle hachée",
          "1 g sucre",
          "piment"
        ]
      },
      {
        "group": "10) Légumes balsamique",
        "items": [
          "40 g huile d'olive",
          "20 g balsamique",
          "2 g miel",
          "1 g ail",
          "Thym"
        ]
      }
    ],
    "steps": [
      "Mariner 30 min (poisson/crevettes), 2–4 h (volaille), 6–12 h (porc/boeuf). Égoutter avant cuisson forte."
    ],
    "notes": [
      "Ne pas réutiliser la marinade crue ; porter à ébullition si sauce.",
      "Conservation : marinades prêtes 7 j au froid.",
      "Stockage : bocal ou boîte hermétique au réfrigérateur. Péremption : 3–5 jours; vérifier odeur, texture et absence de fermentation."
    ],
    "difficultyScore": 3
  },
  "cookies_sales_variantes": {
    "title": "Cookies salés (base + variantes)",
    "master": "biscuits_gouters_maitre",
    "image": "/assets/recipe-images/cookies_sales_variantes.jpg",
    "categories": [
      "Entrées",
      "Apéro"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "yield": "18–20 pièces",
    "ingredients": [
      {
        "group": "Base commune",
        "items": [
          "150 g farine",
          "75 g beurre doux mou",
          "1 œuf",
          "2 g levure chimique",
          "Sel, poivre"
        ]
      },
      {
        "group": "Variante jambon-fromage",
        "items": [
          "100 g jambon en dés",
          "100 g fromage râpé",
          "15 g moutarde à l’ancienne (option)"
        ]
      },
      {
        "group": "Variante comté",
        "items": [
          "120 g comté râpé"
        ]
      }
    ],
    "steps": [
      "Crémer beurre puis incorporer l’œuf.",
      "Ajouter farine + levure + assaisonnement, puis les ingrédients de la variante choisie.",
      "Former des boules, aplatir à 1 cm et cuire 12–15 min à 180 °C."
    ],
    "notes": [
      "Variante 1 : jambon-fromage ; Variante 2 : comté seul.",
      "Conservation : 3 j boîte hermétique.",
      "Stockage : boîte hermétique au sec, à température ambiante. Péremption : 5–14 jours selon humidité; garder loin du réfrigérateur sauf garniture fragile."
    ],
    "difficultyScore": 4
  },
  "pancakes_variantes": {
    "title": "Pancakes (lait ou babeurre + base babeurre maison)",
    "master": "petits_dejeuners_maitre",
    "image": "/assets/recipe-images/pancakes_variantes.jpg",
    "categories": [
      "Petits-déjeuners"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "yield": "10–12 pancakes",
    "ingredients": [
      {
        "group": "Base sèche",
        "items": [
          "250 g farine",
          "40 g sucre",
          "10 g levure chimique",
          "3 g sel"
        ]
      },
      {
        "group": "Version lait",
        "items": [
          "2 œufs",
          "300 g lait",
          "40 g beurre fondu"
        ]
      },
      {
        "group": "Version babeurre",
        "items": [
          "2 œufs",
          "300 g babeurre",
          "40 g beurre fondu"
        ]
      },
      {
        "group": "Babeurre maison (si besoin)",
        "items": [
          "250 g lait entier",
          "10 g jus de citron ou vinaigre",
          "Repos 10 min"
        ]
      }
    ],
    "steps": [
      "Mélanger les ingrédients secs.",
      "Ajouter les liquides de la version choisie et mélanger juste assez (pas trop travailler).",
      "Repos 10 min puis cuisson en petites louches sur poêle beurrée."
    ],
    "notes": [
      "Pour la version babeurre maison : préparer le babeurre 10 min avant.",
      "Conservation : pâte 4 h au froid ; pancakes cuits 2 j filmés.",
      "Stockage : idéalement le jour même. Péremption : 24–48 h en boîte hermétique; réchauffer doucement pour retrouver la texture."
    ],
    "difficultyScore": 7
  },
  "chocolat_ancien": {
    "title": "Chocolat chaud à l'ancienne",
    "master": "petits_dejeuners_maitre",
    "image": "/assets/recipe-images/chocolat_ancien.jpg",
    "categories": [
      "Petits-déjeuners",
      "Desserts"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "yield": "4 mugs (250 ml)",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "500 g lait entier",
          "100 g crème",
          "120 g chocolat noir 66–70 %",
          "20 g sucre",
          "1 pincée sel"
        ]
      }
    ],
    "steps": [
      "Chauffer lait+crème ; fondre chocolat ; mixer pour mousser."
    ],
    "notes": [
      "Épaissir : 5–8 g maïzena diluée.",
      "Conservation : 2 j au froid.",
      "Stockage : idéalement le jour même. Péremption : 24–48 h en boîte hermétique; réchauffer doucement pour retrouver la texture."
    ],
    "difficultyScore": 3
  },
  "chantilly_classique": {
    "title": "Chantilly classique au fouet",
    "master": "chantilly_maitre",
    "image": "/assets/recipe-images/chantilly_classique.jpg",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "250 g crème 35 % très froide",
          "20–30 g sucre glace"
        ]
      }
    ],
    "steps": [
      "Bol + fouet au froid ; monter en bec d'oiseau ; sucrer en fin."
    ],
    "notes": [
      "Parfums : vanille, cacao, café, coco (1–2 %).",
      "→ Version plus stable : <span data-goto=\"mascarpone\" style=\"color:#fbbf24;text-decoration:underline;cursor:pointer\">Chantilly mascarpone</span> ou <span data-goto=\"chantilly_gelatine\" style=\"color:#fbbf24;text-decoration:underline;cursor:pointer\">Chantilly gélatine</span>",
      "Stockage optimal : dans un bol filmé ou en poche à douille au réfrigérateur.",
      "Conservation : 24 h au froid maximum.",
      "Stockage : au réfrigérateur à 0–4 °C, filmé ou en boîte hermétique. Péremption : 24–48 h selon fraîcheur des produits laitiers et des œufs."
    ],
    "difficultyScore": 3
  },
  "mascarpone": {
    "title": "Crème mascarpone vanille",
    "master": "cremes_maitre",
    "image": "/assets/recipe-images/mascarpone.jpg",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "yield": "~500 g",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "250 g mascarpone",
          "200 g crème entière froide",
          "60 g sucre glace",
          "5 g vanille"
        ]
      }
    ],
    "steps": [
      "Lisser mascarpone, sucre glace et vanille.",
      "Ajouter la crème froide.",
      "Fouetter jusqu’à pics fermes."
    ],
    "notes": [
      "Texture plus dense, très stable.",
      "Idéal pour un fourrage rapide.",
      "Dosage fourrage : 30–40 g par donut.",
      "Stockage : au réfrigérateur à 0–4 °C, filmé ou en boîte hermétique. Péremption : 24–48 h selon fraîcheur des produits laitiers et des œufs."
    ],
    "tags": [
      "creme",
      "mascarpone",
      "vanille",
      "rapide",
      "stable"
    ],
    "difficultyScore": 3
  },
  "chantilly_gelatine": {
    "title": "Chantilly stabilisée (gélatine)",
    "master": "chantilly_maitre",
    "image": "/assets/recipe-images/chantilly_gelatine.jpg",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "250 g crème 35 % très froide",
          "25 g sucre glace",
          "3 g gélatine"
        ]
      }
    ],
    "steps": [
      "Hydrater gélatine 10 min ; fondre dans 30 g de crème chaude ; mélanger au reste froid ; refroidir 20–30 min.",
      "Monter au fouet ; serrer au sucre en fin."
    ],
    "notes": [
      "Tenue 24–36 h en poche.",
      "Stockage : au réfrigérateur à 0–4 °C, filmé ou en boîte hermétique. Péremption : 24–48 h selon fraîcheur des produits laitiers et des œufs."
    ],
    "difficultyScore": 3
  },
  "creme_diplomate_vanille": {
    "title": "Crème diplomate vanille",
    "master": "cremes_maitre",
    "image": "/assets/recipe-images/creme_diplomate_vanille.jpg",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "medium",
    "yield": "~700 g",
    "ingredients": [
      {
        "group": "Pâtissière",
        "items": [
          "250 g lait",
          "50 g jaunes d’œufs",
          "60 g sucre",
          "25 g Maïzena",
          "25 g beurre",
          "5 g vanille"
        ],
        "recipeId": "creme_patissiere_vanille"
      },
      {
        "group": "Chantilly",
        "items": [
          "200 g crème 30–35 % froide",
          "20 g sucre glace"
        ],
        "recipeId": "chantilly_classique"
      }
    ],
    "steps": [
      "Cuire la pâtissière jusqu’à épaississement, ajouter le beurre, filmer au contact puis refroidir.",
      "Monter la chantilly en texture souple.",
      "Lisser la pâtissière froide, puis incorporer la chantilly délicatement."
    ],
    "notes": [
      "Dosage fourrage : 30–40 g par donut.",
      "Texture attendue : légère, stable et propre.",
      "Met à jour la recette existante de crème diplomate vanille.",
      "Stockage : au réfrigérateur à 0–4 °C, filmé ou en boîte hermétique. Péremption : 24–48 h selon fraîcheur des produits laitiers et des œufs."
    ],
    "tags": [
      "creme",
      "diplomate",
      "vanille",
      "fourrage",
      "donut"
    ],
    "difficultyScore": 7
  },
  "choux_craquelin": {
    "title": "Choux au craquelin",
    "master": "pates_bases_maitre",
    "image": "/assets/recipe-images/choux_craquelin.jpg",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "medium",
    "yield": "18–22 choux",
    "ingredients": [
      {
        "group": "Craquelin",
        "items": [
          "50 g beurre",
          "60 g cassonade",
          "60 g farine"
        ]
      },
      {
        "group": "Pâte à choux",
        "items": [
          "125 g lait",
          "125 g eau",
          "100 g beurre",
          "5 g sel",
          "150 g farine T55",
          "250 g œufs (env. 5)"
        ]
      },
      {
        "group": "Garnissage",
        "items": [
          "Crème diplomate vanille ou chantilly"
        ]
      }
    ],
    "steps": [
      "Abaisser craquelin 2 mm, détailler disques.",
      "Réaliser pâte à choux ; pocher Ø 3–4 cm ; couvrir d'un disque de craquelin.",
      "Cuire 170–175 °C 35–40 min ventilé sec.",
      "Refroidir, garnir."
    ],
    "notes": [
      "Conservation : coques 3 j à température ambiante dans boîte hermétique ; garnis 24 h au froid.",
      "→ Recette de garnissage : <span data-goto=\"creme_diplomate_vanille\" style=\"color:#fbbf24;text-decoration:underline;cursor:pointer\">Crème diplomate vanille</span>",
      "→ Version allégée : <span data-goto=\"chantilly_gelatine\" style=\"color:#fbbf24;text-decoration:underline;cursor:pointer\">Chantilly stabilisée</span>",
      "Stockage : boîte hermétique au sec, à température ambiante. Péremption : 5–14 jours selon humidité; garder loin du réfrigérateur sauf garniture fragile."
    ],
    "difficultyScore": 7
  },
  "cookies": {
    "title": "Cookies américains",
    "master": "biscuits_gouters_maitre",
    "image": "/assets/recipe-images/cookies.jpg",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "yield": "20–24 cookies (50–60 g)",
    "ingredients": [
      {
        "group": "Appareil",
        "items": [
          "Sucre brun 560 g",
          "Sucre 450 g",
          "Beurre 560 g",
          "4 œufs",
          "Extrait de vanille 15 g",
          "Huile de sésame 10 g",
          "Eau 10 g + 12 g levure chimique + 12 g bicarbonate",
          "Farine de gruau 480 g",
          "Farine de gâteau 480 g",
          "Sel fin 15 g",
          "Pépites de chocolat 700 g"
        ]
      }
    ],
    "steps": [
      "Crémer beurres + sucres ; œufs/arômes ; poudres ; farines ; pépites ; bouler."
    ],
    "notes": [
      "Repos au froid conseillé ; cuire selon taille.",
      "Conservation : 3 j boîte hermétique ; pâte crue congélée 1 mois.",
      "Stockage : boîte hermétique au sec, à température ambiante. Péremption : 5–14 jours selon humidité; garder loin du réfrigérateur sauf garniture fragile."
    ],
    "difficultyScore": 4
  },
  "meringues": {
    "title": "Meringues",
    "master": "biscuits_gouters_maitre",
    "image": "/assets/recipe-images/meringues.jpg",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "yield": "20–30 petites meringues",
    "ingredients": [
      {
        "group": "Appareil",
        "items": [
          "200 g blancs d'œufs (à température ambiante)",
          "200 g sucre semoule",
          "200 g sucre glace tamisé"
        ]
      }
    ],
    "steps": [
      "Monter les blancs à vitesse moyenne jusqu'à texture mousseuse.",
      "Ajouter progressivement le sucre semoule en fouettant jusqu'à obtenir une meringue brillante et ferme.",
      "Incorporer délicatement le sucre glace tamisé à la maryse.",
      "Pocher les meringues sur une plaque recouverte de papier cuisson.",
      "Cuire 2 à 3 h à 90–100 °C jusqu'à ce qu'elles soient sèches et se décollent facilement.",
      "Laisser refroidir dans le four éteint, porte entrouverte."
    ],
    "notes": [
      "Des blancs \"vieillis\" montent mieux.",
      "Cuisson longue = meringues bien sèches et stables.",
      "Stockage optimal : boîte hermétique, endroit sec, jamais au réfrigérateur.",
      "Conservation : 2 semaines sans perte de texture.",
      "Stockage : boîte hermétique au sec, à température ambiante. Péremption : 5–14 jours selon humidité; garder loin du réfrigérateur sauf garniture fragile."
    ],
    "difficultyScore": 4
  },
  "coulis_fraise": {
    "title": "Coulis de fraise",
    "master": "coulis_maitre",
    "image": "/assets/recipe-images/coulis_fraise.jpg",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Printemps"
    ],
    "difficulty": "easy",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "400 g fraises",
          "80 g sucre",
          "10 g jus de citron"
        ]
      }
    ],
    "steps": [
      "Mixer ; chauffer à frémissement 1–2 min ; refroidir."
    ],
    "notes": [
      "Texture coulis (burette) ; passer fin.",
      "→ Guide complet : <span data-goto=\"coulis_guide\" style=\"color:#fbbf24;text-decoration:underline;cursor:pointer\">Coulis — guide & variantes</span>",
      "Stockage optimal : flacon souple (burette) ou pot hermétique au réfrigérateur.",
      "Conservation : 5 j au froid ; congélateur 2 mois.",
      "Stockage : bocal ou boîte hermétique au réfrigérateur. Péremption : 3–5 jours; vérifier odeur, texture et absence de fermentation."
    ],
    "difficultyScore": 4
  },
  "coulis_framboise": {
    "title": "Coulis de framboise",
    "master": "coulis_maitre",
    "image": "/assets/recipe-images/coulis_framboise.jpg",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Été"
    ],
    "difficulty": "easy",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "400 g framboises",
          "90 g sucre",
          "10 g jus de citron"
        ]
      }
    ],
    "steps": [
      "Mixer ; chauffer ; passer fin pour enlever les pépins."
    ],
    "notes": [
      "Conservation : 5 j au froid ; congélateur 2 mois.",
      "Stockage : bocal ou boîte hermétique au réfrigérateur. Péremption : 3–5 jours; vérifier odeur, texture et absence de fermentation."
    ],
    "difficultyScore": 4
  },
  "coulis_abricot_vanille": {
    "title": "Coulis abricot-vanille",
    "master": "coulis_maitre",
    "image": "/assets/recipe-images/coulis_abricot_vanille.jpg",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Été"
    ],
    "difficulty": "easy",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "400 g abricots dénoyautés",
          "70 g sucre",
          "1/2 gousse de vanille",
          "20 g eau"
        ]
      }
    ],
    "steps": [
      "Cuire 5–8 min ; mixer lisse ; passer."
    ],
    "notes": [
      "Conservation : 5 j au froid ; congélateur 2 mois.",
      "Stockage : bocal ou boîte hermétique au réfrigérateur. Péremption : 3–5 jours; vérifier odeur, texture et absence de fermentation."
    ],
    "difficultyScore": 4
  },
  "coulis_poire": {
    "title": "Coulis de poire",
    "master": "coulis_maitre",
    "image": "/assets/recipe-images/coulis_poire.jpg",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Automne",
      "Hiver"
    ],
    "difficulty": "easy",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "400 g poires mûres",
          "60–80 g sucre (au goût)",
          "10 g jus de citron"
        ]
      }
    ],
    "steps": [
      "Cuire 3–5 min ; mixer lisse ; passer."
    ],
    "notes": [
      "Assaisonnement possible : vanille, poivre Timut.",
      "Conservation : 5 j au froid ; congélateur 2 mois.",
      "Stockage : bocal ou boîte hermétique au réfrigérateur. Péremption : 3–5 jours; vérifier odeur, texture et absence de fermentation."
    ],
    "difficultyScore": 4
  },
  "coulis_guide": {
    "title": "Coulis — guide (formules & variantes)",
    "master": "coulis_maitre",
    "image": "/assets/recipe-images/coulis_guide.jpg",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "400 g fruit",
          "60–100 g sucre (au goût et selon l'acidité)",
          "10 g jus de citron"
        ]
      },
      {
        "group": "Fruits populaires",
        "items": [
          "Fraise, Framboise (passer), Mangue, Pêche, Poire, Cerise, Abricot-vanille"
        ]
      }
    ],
    "steps": [
      "Mixer, chauffer 1–2 min jusqu'à premier frémissement, passer si nécessaire, refroidir."
    ],
    "notes": [
      "Texture \"burette\" pour dressage : ajuster eau si besoin.",
      "Conservation : 5 j au froid ; congélateur 2 mois.",
      "Stockage : bocal ou boîte hermétique au réfrigérateur. Péremption : 3–5 jours; vérifier odeur, texture et absence de fermentation."
    ],
    "difficultyScore": 4
  },
  "creme_amande_": {
    "title": "Crème d'amandes",
    "master": "cremes_maitre",
    "image": "/assets/recipe-images/creme_amande_.jpg",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "yield": "1 préparation (≈ tarte 22–24 cm)",
    "ingredients": [
      {
        "group": "Appareil",
        "items": [
          "100 g beurre pommade",
          "100 g sucre",
          "100 g poudre d'amande",
          "2 œufs",
          "10 g farine",
          "Zeste de citron (option)",
          "Rhum ou vanille (option)"
        ]
      }
    ],
    "steps": [
      "Crémer beurre + sucre.",
      "Ajouter poudre d'amande.",
      "Incorporer œufs un à un.",
      "Ajouter farine et arômes.",
      "Utiliser en garniture de tarte ou cuisson douce."
    ],
    "notes": [
      "Ne pas trop fouetter pour éviter qu'elle gonfle à la cuisson.",
      "Stockage optimal : boîte hermétique au réfrigérateur.",
      "Conservation : 48 h au froid ; congélateur 1 mois.",
      "Stockage : boîte hermétique adaptée, au réfrigérateur si la recette contient œufs, crème, viande ou garniture humide. Péremption : 2–3 jours."
    ],
    "difficultyScore": 3
  },
  "court_bouillon": {
    "title": "Court-bouillon",
    "master": "bases_salees_maitre",
    "categories": [
      "Entrées",
      "Plats"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "yield": "≈ 1 litre (pour pocher 4–6 portions)",
    "image": "/assets/recipe-images/court_bouillon.jpg",
    "ingredients": [
      {
        "group": "Légumes & aromates",
        "items": [
          "1 poireau",
          "2 carottes",
          "1 oignon",
          "2 branches de céleri",
          "1 botte de persil",
          "2 branches de thym",
          "¼ feuille de laurier",
          "1 clou de girofle",
          "5 grains de poivre"
        ]
      },
      {
        "group": "Liquides",
        "items": [
          "2 verres de vin blanc sec (≈ 30 cl)",
          "50 cl eau",
          "Sel"
        ]
      }
    ],
    "steps": [
      "Éplucher le poireau, les carottes et l'oignon. Laver le céleri et les herbes.",
      "Couper le poireau en quatre dans la longueur et l'attacher avec les branches de céleri et le laurier pour former le bouquet garni.",
      "Couper les carottes en quatre dans la longueur. Piquer l'oignon avec le clou de girofle.",
      "Dans une cocotte, placer le bouquet garni, les carottes, l'oignon, le vin blanc et 50 cl d'eau. Saler et poivrer.",
      "Porter à ébullition puis laisser cuire 20 min à frémissement.",
      "Laisser refroidir, puis placer au frais avant utilisation."
    ],
    "notes": [
      "Base aromatique pour pocher poissons, crustacés, légumes ou volailles.",
      "Idéal pour pocher poissons (cabillaud, saumon, sole), crustacés, légumes ou volailles.",
      "Astuce : ajouter un trait de vinaigre blanc ou de jus de citron pour les crustacés.",
      "Base possible pour des plats mijotés, sauces et pochages aromatiques.",
      "Stockage optimal : boîte hermétique ou pot en verre au réfrigérateur.",
      "Conservation : 3–4 j au froid ; se congèle très bien 2–3 mois (en portions de 250 ml).",
      "Stockage : boîte hermétique adaptée, au réfrigérateur si la recette contient œufs, crème, viande ou garniture humide. Péremption : 2–3 jours."
    ],
    "difficultyScore": 3
  },
  "donuts_cloud": {
    "title": "Beignets Cloud-like",
    "master": "petits_dejeuners_maitre",
    "categories": [
      "Petits-déjeuners",
      "Desserts"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "medium",
    "yield": "12–14 beignets de 60–70 g",
    "image": "/assets/recipe-images/donuts_cloud.jpg",
    "ingredients": [
      {
        "group": "Pâte",
        "items": [
          "250 g farine T45 ou T55",
          "25 g sucre",
          "3 g sel",
          "10–12 g levure fraîche",
          "50 g œuf",
          "140 g lait",
          "25 g beurre",
          "5 g vanille"
        ]
      },
      {
        "group": "Friture",
        "items": [
          "Huile neutre à 160–165 °C"
        ]
      },
      {
        "group": "Finition",
        "items": [
          "120 g sucre semoule ou sucre glace",
          "30–40 g crème par pièce si fourré"
        ]
      },
      {
        "group": "Conversion levure",
        "items": [
          "1 g levure sèche équivaut à environ 3 g levure fraîche",
          "8–10 g levure sèche équivalent à 24–30 g levure fraîche"
        ]
      }
    ],
    "steps": [
      "La veille : prélever 40 g de lait, tiédir à 25–30 °C, dissoudre la levure fraîche.",
      "Mélanger farine, sucre, sel et vanille. Ajouter œuf, reste du lait, mélange levure et beurre fondu tiède ou mou.",
      "Pétrir 8–10 min jusqu’à pâte lisse, souple et légèrement collante. Couvrir 15 min.",
      "Bouler, placer en bol légèrement huilé, laisser 30–45 min à température ambiante.",
      "Couvrir et mettre au froid 12–18 h.",
      "Le lendemain : sortir 1 h avant.",
      "Dégazer légèrement, bouler à 60–70 g avec une surface bien tendue.",
      "Apprêt 1 h à 1 h 30. L’empreinte du doigt doit remonter lentement.",
      "Frire à 160–165 °C, 2 min 30 à 3 min par face, 2–3 pièces maximum à la fois.",
      "Rouler dans le sucre à chaud, saupoudrer de sucre glace tiède ou froid, ou fourrer quand les beignets sont tièdes ou froids."
    ],
    "notes": [
      "Ne jamais fourrer chaud.",
      "Trou sur le côté, douille longue, 30–40 g de crème.",
      "Stopper quand le beignet devient légèrement gonflé et lourd.",
      "Huile trop chaude : extérieur foncé et cœur insuffisamment cuit.",
      "Huile trop froide : beignets gras.",
      "Apprêt insuffisant : mie dense.",
      "Sur-apprêt : beignets qui retombent.",
      "Résultat attendu : mie aérée et filante, extérieur finement doré, cuisson à cœur sans sécheresse.",
      "Stockage : idéalement le jour même. Péremption : 24–48 h en boîte hermétique; réchauffer doucement pour retrouver la texture."
    ],
    "difficultyScore": 7
  },
  "creme_diplomate_cloud": {
    "title": "Crème diplomate vanille (pour donuts & choux)",
    "master": "cremes_maitre",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "medium",
    "yield": "Garniture pour 12–14 donuts ou 18–22 choux",
    "image": "/assets/recipe-images/creme_diplomate_cloud.jpg",
    "ingredients": [
      {
        "group": "Crème pâtissière",
        "items": [
          "250 g lait entier",
          "50 g jaunes d'œufs (≈ 3 jaunes)",
          "60 g sucre",
          "25 g maïzena",
          "25 g beurre doux",
          "5 g vanille (ou 1 gousse)"
        ],
        "recipeId": "creme_patissiere_vanille"
      },
      {
        "group": "Chantilly",
        "items": [
          "200 g crème liquide entière (30–35 %) très froide",
          "20 g sucre glace"
        ],
        "recipeId": "chantilly_classique"
      },
      {
        "group": "Variante mascarpone (rapide)",
        "items": [
          "250 g mascarpone",
          "200 g crème liquide entière",
          "60 g sucre glace",
          "Vanille"
        ]
      }
    ],
    "steps": [
      "— CRÈME PÂTISSIÈRE —",
      "Chauffer le lait avec la vanille (gratter la gousse si entière) jusqu'à frémissement.",
      "Dans un bol, fouetter les jaunes + sucre jusqu'à blanchiment. Ajouter la maïzena, bien mélanger.",
      "Verser le lait chaud en filet sur le mélange en fouettant constamment pour éviter la coagulation.",
      "Remettre dans la casserole, cuire à feu moyen en remuant sans arrêt jusqu'à épaississement net (environ 1–2 min après reprise de l'ébullition).",
      "Hors du feu, incorporer le beurre en morceaux. Filmer immédiatement au contact (le film touche la crème) et refroidir complètement au réfrigérateur (minimum 2 h).",
      "— CHANTILLY —",
      "Fouetter la crème bien froide avec le sucre glace jusqu'à texture souple mais qui tient (bec d'oiseau ferme).",
      "— ASSEMBLAGE (crème diplomate) —",
      "Fouetter la pâtissière froide pour la détendre et la lisser. Incorporer la chantilly délicatement à la spatule en 2–3 fois (ne pas écraser les bulles d'air).",
      "— FOURRAGE DONUTS —",
      "Faire un petit trou sur le côté de chaque donut tiède ou froid. Mettre la crème en poche avec une douille longue. Pocher 30–40 g de crème par donut — arrêter dès qu'il devient légèrement plus lourd.",
      "— VARIANTE MASCARPONE (si pressé) —",
      "Fouetter mascarpone + crème + sucre glace + vanille jusqu'à texture ferme. Prêt en 3 minutes, très stable, excellente tenue."
    ],
    "notes": [
      "Ne jamais fourrer des donuts chauds : la crème fond et coule.",
      "→ Recette des donuts : <span data-goto='donuts_cloud' style='color:#fbbf24;text-decoration:underline;cursor:pointer'>Donuts Cloud-like (pousse lente)</span>",
      "→ Recette des choux : <span data-goto='choux_craquelin' style='color:#fbbf24;text-decoration:underline;cursor:pointer'>Choux au craquelin</span>",
      "→ Version pâtissière seule : <span data-goto='creme_diplomate_vanille' style='color:#fbbf24;text-decoration:underline;cursor:pointer'>Crème diplomate vanille (recette de base)</span>",
      "Stockage optimal pâtissière : filmée au contact dans boîte hermétique au réfrigérateur.",
      "Conservation pâtissière seule : 48 h au froid. Diplomate assemblée : 24 h au froid. Mascarpone : 36–48 h au froid.",
      "Congélation : possible pour la pâtissière seule (avant incorporation chantilly) — 1 mois. Fouetter à nouveau après décongélation.",
      "Stockage : au réfrigérateur à 0–4 °C, filmé ou en boîte hermétique. Péremption : 24–48 h selon fraîcheur des produits laitiers et des œufs."
    ],
    "difficultyScore": 7
  },
  "paris_brest": {
    "title": "Paris-Brest",
    "master": "pates_bases_maitre",
    "image": "/assets/recipe-images/paris_brest.jpg",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "hard",
    "yield": "5 à 6 Paris-Brest individuels",
    "ingredients": [
      {
        "group": "Assemblage final",
        "items": [
          "5–6 couronnes de pâte à choux cuites avec craquelin",
          "Crème au praliné",
          "50 g noisettes torréfiées concassées",
          "QS praliné noisette pur"
        ]
      },
      {
        "group": "Composants liés",
        "items": [
          "→ Voir : <span data-goto=\"craquelin_cacao\" style=\"color:#fbbf24;text-decoration:underline;cursor:pointer\">Craquelin cacao</span>",
          "→ Voir : <span data-goto=\"pate_choux\" style=\"color:#fbbf24;text-decoration:underline;cursor:pointer\">Pâte à choux</span>",
          "→ Voir : <span data-goto=\"pate_noisette\" style=\"color:#fbbf24;text-decoration:underline;cursor:pointer\">Pâte de noisette</span>",
          "→ Voir : <span data-goto=\"creme_patissiere_praline\" style=\"color:#fbbf24;text-decoration:underline;cursor:pointer\">Crème pâtissière praliné</span>",
          "→ Voir : <span data-goto=\"creme_beurre_meringue_italienne\" style=\"color:#fbbf24;text-decoration:underline;cursor:pointer\">Crème au beurre meringue italienne</span>",
          "→ Voir : <span data-goto=\"creme_praline\" style=\"color:#fbbf24;text-decoration:underline;cursor:pointer\">Crème praliné</span>"
        ]
      }
    ],
    "steps": [
      "Cuire les couronnes de pâte à choux avec le craquelin.",
      "Couper chaque couronne dans la hauteur.",
      "Pocher un peu de praliné pur au fond (optionnel), puis pocher la crème au praliné.",
      "Ajouter quelques points de praliné pur, refermer avec le chapeau, puis décorer avec les noisettes concassées."
    ],
    "notes": [
      "Montage en couronnes de pâte à choux, crème praliné et noisettes.",
      "Sortir du réfrigérateur 30 à 40 min avant dégustation.",
      "Stockage : boîte hermétique adaptée, au réfrigérateur si la recette contient œufs, crème, viande ou garniture humide. Péremption : 2–3 jours."
    ],
    "difficultyScore": 7
  },
  "craquelin_cacao": {
    "title": "Craquelin cacao",
    "master": "pates_bases_maitre",
    "image": "/assets/recipe-images/craquelin_cacao.jpg",
    "categories": [
      "Desserts",
      "Recettes de base"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "40 g beurre pommade",
          "45 g farine",
          "50 g cassonade",
          "6 g cacao non sucré",
          "25 g blancs d’œufs",
          "40 g noisettes concassées"
        ]
      }
    ],
    "steps": [
      "Mélanger farine + cassonade + cacao, puis incorporer le beurre.",
      "Étaler à 2 mm entre deux feuilles et congeler 30 min.",
      "Découper des anneaux (Ø 8 cm, trou Ø 2 cm), badigeonner de blanc d’œuf, ajouter les noisettes puis recongeler jusqu’à usage."
    ],
    "notes": [
      "Composant pour : <span data-goto=\"paris_brest\" style=\"color:#fbbf24;text-decoration:underline;cursor:pointer\">Paris-Brest</span>.",
      "Stockage : boîte hermétique au sec, à température ambiante. Péremption : 5–14 jours selon humidité; garder loin du réfrigérateur sauf garniture fragile."
    ],
    "difficultyScore": 3
  },
  "pate_choux": {
    "title": "Pâte à choux",
    "master": "pates_bases_maitre",
    "image": "/assets/recipe-images/pate_choux.jpg",
    "categories": [
      "Desserts",
      "Recettes de base"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "medium",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "62 g lait",
          "62 g eau",
          "2 g sel",
          "55 g beurre",
          "75 g farine",
          "100 g œufs (≈2)"
        ]
      }
    ],
    "steps": [
      "Porter à ébullition eau + lait + sel + beurre.",
      "Hors du feu, ajouter la farine en une fois puis dessécher sur feu doux.",
      "Refroidir légèrement au robot (feuille), puis incorporer les œufs progressivement jusqu’à texture lisse.",
      "Pocher des couronnes de 7 cm, poser le craquelin puis cuire à 170 °C pendant 40 à 45 min."
    ],
    "notes": [
      "Le test du sillon : il doit se refermer doucement quand la texture est correcte.",
      "Stockage : boîte hermétique adaptée, au réfrigérateur si la recette contient œufs, crème, viande ou garniture humide. Péremption : 2–3 jours."
    ],
    "difficultyScore": 7
  },
  "pate_noisette": {
    "title": "Pâte de noisette maison",
    "master": "pates_bases_maitre",
    "image": "/assets/recipe-images/pate_noisette.jpg",
    "categories": [
      "Desserts",
      "Recettes de base"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "250 g noisettes torréfiées",
          "13,5 g sucre glace",
          "0,5 g fleur de sel"
        ]
      }
    ],
    "steps": [
      "Mixer longuement tous les ingrédients jusqu’à obtention d’une pâte lisse et fluide."
    ],
    "notes": [
      "Composant utilisable dans crèmes, pralinés et ganaches.",
      "Stockage : boîte hermétique au sec, à température ambiante. Péremption : 5–14 jours selon humidité; garder loin du réfrigérateur sauf garniture fragile."
    ],
    "difficultyScore": 3
  },
  "creme_patissiere_praline": {
    "title": "Crème pâtissière praliné",
    "master": "cremes_maitre",
    "image": "/assets/recipe-images/creme_patissiere_praline.jpg",
    "categories": [
      "Desserts",
      "Recettes de base"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "medium",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "3,5 g gélatine poudre + 16 g eau",
          "150 g lait",
          "32 g crème liquide",
          "30 g sucre",
          "9 g maïzena",
          "9 g farine",
          "30 g jaunes d’œufs",
          "10 g beurre de cacao",
          "17 g beurre",
          "10 g mascarpone",
          "30 g pâte de noisette",
          "60 g praliné noisette"
        ]
      }
    ],
    "steps": [
      "Réhydrater la gélatine dans l’eau froide.",
      "Porter lait + crème à ébullition. Blanchir jaunes + sucre, puis ajouter maïzena et farine.",
      "Verser le liquide chaud sur les jaunes, remettre en casserole et cuire jusqu’à épaississement.",
      "Hors du feu, ajouter gélatine, beurre de cacao, beurre, mascarpone, pâte de noisette et praliné. Mixer, filmer au contact, refroidir."
    ],
    "notes": [
      "Ajuster le praliné/pâte de noisette selon l’intensité souhaitée.",
      "Stockage : boîte hermétique adaptée, au réfrigérateur si la recette contient œufs, crème, viande ou garniture humide. Péremption : 2–3 jours."
    ],
    "difficultyScore": 7
  },
  "creme_beurre_meringue_italienne": {
    "title": "Crème au beurre (base crème anglaise + meringue italienne)",
    "master": "cremes_maitre",
    "image": "/assets/recipe-images/creme_beurre_meringue_italienne.jpg",
    "categories": [
      "Desserts",
      "Recettes de base"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "hard",
    "ingredients": [
      {
        "group": "Crème anglaise au beurre",
        "items": [
          "45 g lait",
          "45 g sucre",
          "35 g jaunes d’œufs",
          "200 g beurre pommade"
        ]
      },
      {
        "group": "Meringue italienne",
        "items": [
          "20 g eau",
          "60 g sucre",
          "30 g blancs d’œufs"
        ],
        "recipeId": "meringue_italienne"
      }
    ],
    "steps": [
      "Cuire la crème anglaise (lait + jaunes + sucre) à 84 °C, puis refroidir légèrement.",
      "Foisonner le beurre pommade puis incorporer progressivement la crème anglaise.",
      "Réaliser une meringue italienne (sirop 121 °C versé sur blancs mousseux) puis incorporer délicatement à la crème au beurre."
    ],
    "notes": [
      "Base technique pour plusieurs entremets/pâtisseries classiques.",
      "Stockage : boîte hermétique au sec, à température ambiante. Péremption : 5–14 jours selon humidité; garder loin du réfrigérateur sauf garniture fragile."
    ],
    "difficultyScore": 7
  },
  "creme_praline": {
    "title": "Crème praliné",
    "master": "cremes_maitre",
    "image": "/assets/recipe-images/creme_praline.jpg",
    "categories": [
      "Desserts",
      "Recettes de base"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "medium",
    "ingredients": [
      {
        "group": "Assemblage",
        "items": [
          "390 g crème pâtissière praliné (ou totalité préparée)",
          "300 g crème au beurre (environ)"
        ]
      }
    ],
    "steps": [
      "Détendre la crème pâtissière refroidie au fouet.",
      "Incorporer délicatement la crème au beurre à la maryse.",
      "Mettre en poche cannelée pour le montage des Paris-Brest."
    ],
    "notes": [
      "→ Utilisée dans : <span data-goto=\"paris_brest\" style=\"color:#fbbf24;text-decoration:underline;cursor:pointer\">Paris-Brest</span>.",
      "Stockage : boîte hermétique adaptée, au réfrigérateur si la recette contient œufs, crème, viande ou garniture humide. Péremption : 2–3 jours."
    ],
    "difficultyScore": 7
  },
  "petit_dejeuner_maitre": {
    "title": "Petit-déjeuner",
    "image": "/assets/recipe-images/petits_dejeuners_maitre.jpg",
    "categories": [
      "Petits-déjeuners"
    ],
    "seasons": [
      "Printemps",
      "Été",
      "Automne",
      "Hiver"
    ],
    "difficulty": "easy",
    "masterType": "collection",
    "variants": [
      {
        "id": "pancakes_variantes",
        "label": "Pancakes (lait ou babeurre + base babeurre maison)"
      },
      {
        "id": "chocolat_ancien",
        "label": "Chocolat chaud à l'ancienne"
      },
      {
        "id": "donuts_cloud",
        "label": "Beignets Cloud-like"
      },
      {
        "id": "gaufre_bruxelles",
        "label": "Gaufre de Bruxelles traditionnelle"
      }
    ],
    "ingredients": [
      {
        "group": "Sous-fiches",
        "items": [
          "Choisir une sous-fiche pour afficher les recettes."
        ]
      }
    ],
    "steps": [
      "Choisir une sous-fiche pour afficher les ingrédients et les étapes."
    ],
    "notes": [
      "Fiche parent de navigation. Les recettes restent conservées dans leurs sous-fiches."
    ],
    "tags": [
      "petits-déjeuners",
      "fiche-parent"
    ]
  },
  "entrees_maitre": {
    "title": "Entrées",
    "image": "/assets/recipe-images/bases_salees_maitre.jpg",
    "categories": [
      "Entrées"
    ],
    "seasons": [
      "Printemps",
      "Été",
      "Automne",
      "Hiver"
    ],
    "difficulty": "easy",
    "masterType": "collection",
    "variants": [
      {
        "id": "crudites_maitre",
        "label": "Crudités et salades fraîches"
      },
      {
        "id": "ricotta_fouettee",
        "label": "Ricotta fouettée (assaisonnements)"
      },
      {
        "id": "legumes_rotis",
        "label": "Légumes rôtis au four"
      },
      {
        "id": "court_bouillon",
        "label": "Court-bouillon"
      },
      {
        "id": "vinaigrette",
        "label": "Vinaigrette de chef (variantes)"
      },
      {
        "id": "pesto_variantes",
        "label": "Pesto (base + variantes)"
      },
      {
        "id": "balsamique_reduit",
        "label": "Balsamique réduit (variantes)"
      },
      {
        "id": "huile_pimentee_pizza",
        "label": "Huile pimentée pour pizza (variantes)"
      },
      {
        "id": "marinades_guide",
        "label": "Marinades — 10 signatures"
      },
      {
        "id": "tomates_variantes",
        "label": "Tomates au four (séchées ou confites)"
      },
      {
        "id": "oignons_rotis_thym_miel",
        "label": "Oignons rôtis au thym et au miel"
      },
      {
        "id": "cake_sale_lardon",
        "label": "Cake salé lardon"
      }
    ],
    "ingredients": [
      {
        "group": "Sous-fiches",
        "items": [
          "Choisir une sous-fiche pour afficher les recettes."
        ]
      }
    ],
    "steps": [
      "Choisir une sous-fiche pour afficher les ingrédients et les étapes."
    ],
    "notes": [
      "Fiche parent de navigation. Les recettes restent conservées dans leurs sous-fiches."
    ],
    "tags": [
      "entrées",
      "fiche-parent"
    ]
  },
  "plats_maitre": {
    "title": "Plats",
    "image": "/assets/recipe-images/legumes_rotis.jpg",
    "categories": [
      "Plats"
    ],
    "seasons": [
      "Printemps",
      "Été",
      "Automne",
      "Hiver"
    ],
    "difficulty": "easy",
    "masterType": "collection",
    "variants": [
      {
        "id": "cochon_confit_biere_erable",
        "label": "Cochon confit à la bière et au sirop d’érable"
      }
    ],
    "ingredients": [
      {
        "group": "Sous-fiches",
        "items": [
          "Choisir une sous-fiche pour afficher les recettes."
        ]
      }
    ],
    "steps": [
      "Choisir une sous-fiche pour afficher les ingrédients et les étapes."
    ],
    "notes": [
      "Fiche parent de navigation. Les recettes restent conservées dans leurs sous-fiches."
    ],
    "tags": [
      "plats",
      "fiche-parent"
    ]
  },
  "desserts_maitre": {
    "title": "Desserts",
    "image": "/assets/recipe-images/cremes_maitre.jpg",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Printemps",
      "Été",
      "Automne",
      "Hiver"
    ],
    "difficulty": "easy",
    "masterType": "collection",
    "variants": [
      {
        "id": "chantilly_classique",
        "label": "Chantilly classique au fouet"
      },
      {
        "id": "chantilly_gelatine",
        "label": "Chantilly stabilisée (gélatine)"
      },
      {
        "id": "coulis_guide",
        "label": "Coulis — guide (formules & variantes)"
      },
      {
        "id": "coulis_fraise",
        "label": "Coulis de fraise"
      },
      {
        "id": "coulis_framboise",
        "label": "Coulis de framboise"
      },
      {
        "id": "coulis_abricot_vanille",
        "label": "Coulis abricot-vanille"
      },
      {
        "id": "coulis_poire",
        "label": "Coulis de poire"
      },
      {
        "id": "creme_diplomate_vanille",
        "label": "Crème diplomate vanille"
      },
      {
        "id": "creme_diplomate_cloud",
        "label": "Crème diplomate vanille (pour donuts & choux)"
      },
      {
        "id": "creme_patissiere_praline",
        "label": "Crème pâtissière praliné"
      },
      {
        "id": "creme_praline",
        "label": "Crème praliné"
      },
      {
        "id": "creme_beurre_meringue_italienne",
        "label": "Crème au beurre (base crème anglaise + meringue italienne)"
      },
      {
        "id": "creme_amande_",
        "label": "Crème d'amandes"
      },
      {
        "id": "mascarpone",
        "label": "Crème mascarpone vanille"
      },
      {
        "id": "creme_kinder_nutella",
        "label": "Crème Kinder / Nutella stable"
      },
      {
        "id": "creme_pistache",
        "label": "Crème pistache stable"
      },
      {
        "id": "creme_patissiere_vanille",
        "label": "Crème pâtissière vanille"
      },
      {
        "id": "creme_citron_lemon_curd",
        "label": "Crème citron (lemon curd)"
      },
      {
        "id": "creme_amande_citron",
        "label": "Crème d’amande citron"
      },
      {
        "id": "compotee_citron",
        "label": "Compotée citron"
      },
      {
        "id": "meringue_italienne",
        "label": "Meringue italienne"
      },
      {
        "id": "pate_choux",
        "label": "Pâte à choux"
      },
      {
        "id": "craquelin_cacao",
        "label": "Craquelin cacao"
      },
      {
        "id": "pate_noisette",
        "label": "Pâte de noisette maison"
      },
      {
        "id": "choux_craquelin",
        "label": "Choux au craquelin"
      },
      {
        "id": "paris_brest",
        "label": "Paris-Brest"
      },
      {
        "id": "pate_sucree",
        "label": "Pâte sucrée"
      },
      {
        "id": "cookies_sales_variantes",
        "label": "Cookies salés (base + variantes)"
      },
      {
        "id": "cookies",
        "label": "Cookies américains"
      },
      {
        "id": "meringues",
        "label": "Meringues"
      },
      {
        "id": "tiramisu_speculoos",
        "label": "Tiramisu spéculoos rapide"
      },
      {
        "id": "tarte_citron_meringuee",
        "label": "Tarte citron meringuée"
      }
    ],
    "ingredients": [
      {
        "group": "Sous-fiches",
        "items": [
          "Choisir une sous-fiche pour afficher les recettes."
        ]
      }
    ],
    "steps": [
      "Choisir une sous-fiche pour afficher les ingrédients et les étapes."
    ],
    "notes": [
      "Fiche parent de navigation. Les recettes restent conservées dans leurs sous-fiches."
    ],
    "tags": [
      "desserts",
      "fiche-parent"
    ]
  },
  "creme_kinder_nutella": {
    "title": "Crème Kinder / Nutella stable",
    "master": "cremes_maitre",
    "image": "/assets/recipe-images/creme_praline.jpg",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "yield": "~500 g",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "250 g mascarpone",
          "150 g crème entière froide",
          "120 g pâte à tartiner chocolat-noisette",
          "20 g sucre glace"
        ]
      }
    ],
    "steps": [
      "Mélanger mascarpone et pâte à tartiner.",
      "Ajouter crème froide et sucre glace.",
      "Fouetter jusqu’à texture épaisse et stable."
    ],
    "notes": [
      "Texture crèmeuse mais stable en fourrage.",
      "Goût intense, ne détrempe pas le donut.",
      "Stockage : au réfrigérateur à 0–4 °C, filmé ou en boîte hermétique. Péremption : 24–48 h selon fraîcheur des produits laitiers et des œufs."
    ],
    "tags": [
      "creme",
      "nutella",
      "kinder",
      "fourrage",
      "stable"
    ],
    "difficultyScore": 3
  },
  "creme_pistache": {
    "title": "Crème pistache stable",
    "master": "cremes_maitre",
    "image": "/assets/recipe-images/pate_noisette.jpg",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "yield": "~500 g",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "250 g mascarpone",
          "180 g crème entière froide",
          "80 g pâte de pistache",
          "30 g sucre glace"
        ]
      }
    ],
    "steps": [
      "Lisser mascarpone, pâte de pistache et sucre glace.",
      "Ajouter la crème froide.",
      "Monter au fouet jusqu’à texture ferme."
    ],
    "notes": [
      "Résultat attendu : crèmeux, parfumé et stable.",
      "Stockage : au réfrigérateur à 0–4 °C, filmé ou en boîte hermétique. Péremption : 24–48 h selon fraîcheur des produits laitiers et des œufs."
    ],
    "tags": [
      "creme",
      "pistache",
      "fourrage",
      "stable"
    ],
    "difficultyScore": 3
  },
  "gaufre_bruxelles": {
    "title": "Gaufre de Bruxelles traditionnelle",
    "master": "petits_dejeuners_maitre",
    "image": "/assets/recipe-images/pancakes_variantes.jpg",
    "categories": [
      "Petits-déjeuners",
      "Desserts"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "yield": "8–10 gaufres",
    "ingredients": [
      {
        "group": "Pâte levée",
        "items": [
          "250 g farine",
          "370 g lait tiède",
          "15 g levure fraîche",
          "150 g œufs entiers (3 œufs)",
          "100 g beurre fondu",
          "10 g sucre",
          "2 g sel",
          "5 g vanille optionnelle"
        ]
      }
    ],
    "steps": [
      "Mélanger levure et lait tiède, attendre 10 min.",
      "Mélanger farine, sucre, sel, jaunes d’œufs, lait et levure jusqu’à pâte lisse.",
      "Ajouter le beurre fondu.",
      "Laisser lever 1 h.",
      "Monter les blancs en neige et incorporer délicatement.",
      "Cuire dans un gaufrier très chaud 3–4 min."
    ],
    "notes": [
      "Vraie gaufre de Bruxelles : pâte levée, blancs montés, gros trous, texture légère et croustillante.",
      "Pour plus de croustillant, remplacer 50 g de lait par 50 g de bière.",
      "Stockage : idéalement le jour même. Péremption : 24–48 h en boîte hermétique; réchauffer doucement pour retrouver la texture."
    ],
    "tags": [
      "gaufre",
      "bruxelles",
      "petit-dejeuner"
    ],
    "difficultyScore": 4
  },
  "tarte_citron_meringuee": {
    "title": "Tarte citron meringuée",
    "master": "tartes_maitre",
    "image": "/assets/recipe-images/coulis_guide.jpg",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Printemps",
      "Été"
    ],
    "difficulty": "hard",
    "yield": "1 tarte",
    "ingredients": [
      {
        "group": "Pâte sucrée",
        "items": [
          "100 g farine",
          "50 g beurre mou",
          "40 g sucre",
          "25 g œuf"
        ],
        "recipeId": "pate_sucree"
      },
      {
        "group": "Crème d’amande",
        "items": [
          "75 g beurre mou",
          "75 g sucre",
          "50 g œuf",
          "75 g poudre d’amande",
          "10 g fécule",
          "2 g zeste de citron"
        ],
        "recipeId": "creme_amande_citron"
      },
      {
        "group": "Crème citron",
        "items": [
          "80 g jus de citron",
          "180 g jaunes d’œufs",
          "130 g sucre",
          "10 g fécule",
          "100 g beurre"
        ],
        "recipeId": "creme_citron_lemon_curd"
      },
      {
        "group": "Compotée citron optionnelle",
        "items": [
          "3 citrons",
          "50 g sucre"
        ],
        "recipeId": "compotee_citron"
      },
      {
        "group": "Meringue italienne",
        "items": [
          "60 g blancs d’œufs",
          "100 g sucre",
          "30 g eau",
          "2 g sel",
          "2 g jus de citron"
        ],
        "recipeId": "meringue_italienne"
      }
    ],
    "steps": [
      "Pâte sucrée : mélanger beurre et sucre, ajouter œuf puis farine. Former une boule et refroidir 30 min.",
      "Étaler à 3–4 mm, foncer, piquer et cuire 10 min à 180 °C.",
      "Crème d’amande : mélanger beurre et sucre, ajouter œuf, poudre d’amande, fécule et zeste. Étaler 5 mm dans la tarte et cuire 20–25 min à 180 °C.",
      "Crème citron : chauffer le jus, fouetter jaunes et sucre, ajouter fécule, verser le jus chaud, cuire jusqu’à épaississement, ajouter beurre, filmer au contact et refroidir.",
      "Compotée optionnelle : cuire citron et sucre, mixer, puis Étaler une fine couche sur le fond.",
      "Montage : fond cuit, compotée optionnelle, crème citron sur 1–2 cm, lisser.",
      "Meringue italienne : cuire sucre, eau et citron à 118–120 °C, verser en filet sur blancs mousseux, fouetter 5–10 min jusqu’à refroidissement.",
      "Pocher la meringue, finir au chalumeau ou sous grill, puis reposer 1 h minimum au froid."
    ],
    "notes": [
      "Points critiques : beurre pommade non liquide, sirop à 118–120 °C, verser lentement, fouetter jusqu’à refroidissement complet.",
      "Résultat attendu : pâte croustillante, crème d’amande moelleuse, crème citron fondante, meringue légère et stable.",
      "Stockage : au réfrigérateur à 0–4 °C, filmé ou en boîte hermétique. Péremption : 24–48 h selon fraîcheur des produits laitiers et des œufs."
    ],
    "tags": [
      "tarte",
      "citron",
      "meringue",
      "dessert"
    ],
    "difficultyScore": 7
  },
  "tiramisu_speculoos": {
    "title": "Tiramisu spéculoos rapide",
    "master": "desserts_cuillere_maitre",
    "image": "/assets/recipe-images/biscuits_gouters_maitre.jpg",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "yield": "6 portions",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "250 g mascarpone",
          "100 g œufs (2 œufs)",
          "80 g sucre",
          "200 g spéculoos",
          "100 g jus d’orange",
          "30–45 g Grand Marnier"
        ]
      }
    ],
    "steps": [
      "Fouetter jaunes et sucre.",
      "Ajouter mascarpone.",
      "Monter les blancs et incorporer délicatement.",
      "Tremper les spéculoos dans jus d’orange et Grand Marnier.",
      "Monter en couches.",
      "Réfrigérer 4 h minimum."
    ],
    "notes": [
      "Toujours tout peser avant.",
      "Respecter les textures : pommade, mousse, bec d’oiseau.",
      "Ne jamais précipiter la meringue ou les mélanges mousseux.",
      "Stockage : au réfrigérateur à 0–4 °C, filmé ou en boîte hermétique. Péremption : 24–48 h selon fraîcheur des produits laitiers et des œufs."
    ],
    "tags": [
      "tiramisu",
      "speculoos",
      "rapide"
    ],
    "difficultyScore": 4
  },
  "cake_sale_lardon": {
    "title": "Cake salé lardon",
    "master": "entrees_maitre",
    "image": "/assets/recipe-images/cookies_sales_variantes.jpg",
    "categories": [
      "Entrées",
      "Apéro"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "yield": "6 personnes",
    "ingredients": [
      {
        "group": "Garniture",
        "items": [
          "200 g lardons fumés",
          "80 g oignon",
          "4 g ail",
          "10 g huile d’olive",
          "50 g vin blanc pour déglacer"
        ]
      },
      {
        "group": "Appareil à cake",
        "items": [
          "75 g beurre",
          "200 g farine",
          "11 g levure chimique",
          "200 g œufs (4 œufs)",
          "100 g lait",
          "150 g emmental râpé",
          "2 g sel",
          "1 g poivre"
        ]
      }
    ],
    "steps": [
      "Faire griller les lardons.",
      "Ajouter oignon et ail coupés très petit.",
      "Déglacer au vin blanc et laisser évaporer l’alcool.",
      "Mélanger tous les ingrédients de l’appareil avec la garniture.",
      "Beurrer et fariner le moule.",
      "Enfourner à 180 °C pendant 35 à 50 min selon le moule et l’épaisseur du cake."
    ],
    "notes": [
      "Le cake est prêt quand la lame ressort sèche et que le dessus est bien doré.",
      "Stockage : refroidir rapidement puis conserver au réfrigérateur en boîte hermétique. Péremption : 3–4 jours."
    ],
    "tags": [
      "cake",
      "sale",
      "lardon",
      "apero"
    ],
    "difficultyScore": 4
  },
  "oignons_rotis_thym_miel": {
    "title": "Oignons rôtis au thym et au miel",
    "master": "entrees_maitre",
    "image": "/assets/recipe-images/legumes_rotis.jpg",
    "categories": [
      "Entrées",
      "Plats"
    ],
    "seasons": [
      "Automne",
      "Hiver"
    ],
    "difficulty": "easy",
    "yield": "4 personnes",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "6 oignons jaunes",
          "42 g miel",
          "40 g huile d’olive",
          "2 branches de thym frais",
          "3 g sel",
          "1 g poivre"
        ]
      }
    ],
    "steps": [
      "Préchauffer le four à 180 °C.",
      "Éplucher les oignons et les couper en deux dans la largeur.",
      "Disposer côté coupé vers le haut sur plaque.",
      "Arroser d’huile d’olive, répartir le miel, saler, poivrer et parsemer de thym.",
      "Rôtir environ 30 min jusqu’à coloration et caramélisation.",
      "Arroser avec le jus de cuisson pendant la cuisson."
    ],
    "notes": [
      "Source fournie : recettes.memeswing.com.",
      "Accompagnement pour viande grillée, poisson, purée ou gratin de légumes.",
      "Conservation : 3–4 jours au froid en boîte hermétique.",
      "Stockage : bocal ou boîte hermétique au réfrigérateur. Péremption : 3–5 jours; vérifier odeur, texture et absence de fermentation."
    ],
    "tags": [
      "oignon",
      "thym",
      "miel",
      "accompagnement"
    ],
    "difficultyScore": 3
  },
  "cochon_confit_biere_erable": {
    "title": "Cochon confit à la bière et au sirop d’érable",
    "master": "plats_maitre",
    "image": "/assets/recipe-images/marinades_guide.jpg",
    "categories": [
      "Plats"
    ],
    "seasons": [
      "Automne",
      "Hiver"
    ],
    "difficulty": "medium",
    "yield": "6–8 personnes",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "1,5 kg porc (épaule ou poitrine désossée)",
          "28 g huile végétale neutre",
          "2 oignons jaunes émincés",
          "3 gousses d’ail hachées",
          "330 g bière blonde ou ambrée",
          "133 g sirop d’érable pur",
          "15 g moutarde de Dijon",
          "2 branches de thym frais",
          "1 feuille de laurier",
          "5 g sel fin",
          "2 g poivre noir",
          "15 g vinaigre de cidre optionnel",
          "40 g sirop d’érable optionnel pour ajuster"
        ]
      }
    ],
    "steps": [
      "Saler et poivrer le porc.",
      "Chauffer l’huile en cocotte et dorer la viande sur toutes ses faces.",
      "Ajouter les oignons et l’ail, faire revenir.",
      "Déglacer avec la bière en grattant les sucs.",
      "Ajouter sirop d’érable, moutarde, thym, laurier et vinaigre si utilisé.",
      "Couvrir et cuire lentement au four ou à feu doux jusqu’à viande très fondante.",
      "Réduire la sauce si besoin et napper la viande."
    ],
    "notes": [
      "Source fournie : ertova.com.",
      "Cuisson lente indispensable pour une texture fondante.",
      "Conservation : 3–4 jours au froid, réchauffage doux avec un peu de sauce.",
      "Stockage : refroidir rapidement puis conserver au réfrigérateur en boîte hermétique. Péremption : 3–4 jours."
    ],
    "tags": [
      "porc",
      "biere",
      "erable",
      "mijote"
    ],
    "difficultyScore": 6
  },
  "pate_sucree": {
    "title": "Pâte sucrée",
    "master": "pates_bases_maitre",
    "image": "/assets/recipe-images/pates_bases_maitre.jpg",
    "categories": [
      "Desserts",
      "Recettes de base"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "yield": "1 fond de tarte",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "100 g farine",
          "50 g beurre mou",
          "40 g sucre",
          "25 g œuf"
        ]
      }
    ],
    "steps": [
      "Mélanger beurre et sucre sans faire fondre le beurre.",
      "Ajouter l’œuf puis la farine.",
      "Former une boule, filmer et refroidir 30 min.",
      "Étaler à 3–4 mm, foncer le moule, piquer puis cuire selon la recette finale."
    ],
    "notes": [
      "Base utilisée dans la tarte citron meringuée.",
      "Beurre pommade, jamais liquide.",
      "Stockage : boîte hermétique adaptée, au réfrigérateur si la recette contient œufs, crème, viande ou garniture humide. Péremption : 2–3 jours."
    ],
    "tags": [
      "pate",
      "tarte",
      "base",
      "patisserie"
    ],
    "difficultyScore": 7
  },
  "creme_amande_citron": {
    "title": "Crème d’amande citron",
    "master": "cremes_maitre",
    "image": "/assets/recipe-images/creme_amande_.jpg",
    "categories": [
      "Desserts",
      "Recettes de base"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "yield": "1 insert fin de tarte",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "75 g beurre mou",
          "75 g sucre",
          "50 g œuf",
          "75 g poudre d’amande",
          "10 g fécule",
          "2 g zeste de citron"
        ]
      }
    ],
    "steps": [
      "Crèmer beurre et sucre.",
      "Ajouter l’œuf.",
      "Incorporer poudre d’amande, fécule et zeste.",
      "Étaler environ 5 mm dans le fond de tarte et cuire jusqu’à coloration moelleuse."
    ],
    "notes": [
      "Base moelleuse pour tartes aux fruits ou citron.",
      "Stockage : au réfrigérateur à 0–4 °C, filmé ou en boîte hermétique. Péremption : 24–48 h selon fraîcheur des produits laitiers et des œufs."
    ],
    "tags": [
      "creme",
      "amande",
      "citron",
      "garniture"
    ],
    "difficultyScore": 3
  },
  "creme_citron_lemon_curd": {
    "title": "Crème citron (lemon curd)",
    "master": "cremes_maitre",
    "image": "/assets/recipe-images/coulis_guide.jpg",
    "categories": [
      "Desserts",
      "Recettes de base"
    ],
    "seasons": [
      "Printemps",
      "Été",
      "Toutes saisons"
    ],
    "difficulty": "medium",
    "yield": "Environ 500 g",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "80 g jus de citron",
          "180 g jaunes d’œufs",
          "130 g sucre",
          "10 g fécule",
          "100 g beurre"
        ]
      }
    ],
    "steps": [
      "Chauffer le jus de citron.",
      "Fouetter jaunes et sucre, puis ajouter la fécule.",
      "Verser le jus chaud sur le mélange.",
      "Cuire jusqu’à épaississement.",
      "Ajouter le beurre, mixer si besoin, filmer au contact et refroidir."
    ],
    "notes": [
      "Texture fondante pour tarte citron, verrines ou fourrage.",
      "Refroidir avant montage pour une tenue nette.",
      "Stockage : au réfrigérateur à 0–4 °C, filmé ou en boîte hermétique. Péremption : 24–48 h selon fraîcheur des produits laitiers et des œufs."
    ],
    "tags": [
      "creme",
      "citron",
      "lemon-curd",
      "garniture"
    ],
    "difficultyScore": 6
  },
  "compotee_citron": {
    "title": "Compotée citron",
    "master": "cremes_maitre",
    "image": "/assets/recipe-images/coulis_abricot_vanille.jpg",
    "categories": [
      "Desserts",
      "Recettes de base"
    ],
    "seasons": [
      "Printemps",
      "Été",
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "yield": "Fine couche pour 1 tarte",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "3 citrons",
          "50 g sucre"
        ]
      }
    ],
    "steps": [
      "Couper les citrons finement en retirant les pépins.",
      "Cuire doucement avec le sucre.",
      "Mixer finement.",
      "Étaler en couche fine sur un fond de tarte cuit."
    ],
    "notes": [
      "Optionnelle dans la tarte citron meringuée.",
      "À utiliser en petite quantité pour éviter l’amertume.",
      "Stockage : au réfrigérateur à 0–4 °C, filmé ou en boîte hermétique. Péremption : 24–48 h selon fraîcheur des produits laitiers et des œufs."
    ],
    "tags": [
      "citron",
      "compotee",
      "tarte",
      "garniture"
    ],
    "difficultyScore": 7
  },
  "meringue_italienne": {
    "title": "Meringue italienne",
    "master": "cremes_maitre",
    "image": "/assets/recipe-images/meringues.jpg",
    "categories": [
      "Desserts",
      "Recettes de base"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "medium",
    "yield": "Décor pour 1 tarte",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "60 g blancs d’œufs",
          "100 g sucre",
          "30 g eau",
          "1 g sel",
          "2 g jus de citron"
        ]
      }
    ],
    "steps": [
      "Cuire sucre, eau et jus de citron à 118–120 °C.",
      "Monter les blancs mousseux avec le sel.",
      "Verser le sirop en filet sur les blancs.",
      "Fouetter 5–10 min jusqu’à refroidissement, texture lisse, brillante et ferme."
    ],
    "notes": [
      "Verser le sirop lentement.",
      "Fouetter jusqu’à refroidissement complet pour une bonne stabilité.",
      "Stockage : boîte hermétique au sec, à température ambiante. Péremption : 5–14 jours selon humidité; garder loin du réfrigérateur sauf garniture fragile."
    ],
    "tags": [
      "meringue",
      "italienne",
      "base",
      "patisserie"
    ],
    "difficultyScore": 7
  },
  "creme_patissiere_vanille": {
    "title": "Crème pâtissière vanille",
    "master": "cremes_maitre",
    "image": "/assets/recipe-images/creme_diplomate_vanille.jpg",
    "categories": [
      "Desserts",
      "Recettes de base"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "difficulty": "medium",
    "yield": "Environ 400 g",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "250 g lait",
          "50 g jaunes d’œufs",
          "60 g sucre",
          "25 g Maïzena",
          "25 g beurre",
          "5 g vanille"
        ]
      }
    ],
    "steps": [
      "Chauffer le lait avec la vanille.",
      "Fouetter jaunes, sucre et Maïzena.",
      "Verser le lait chaud sur le mélange.",
      "Cuire jusqu’à épaississement.",
      "Ajouter le beurre, filmer au contact et refroidir."
    ],
    "notes": [
      "Base de la crème diplomate vanille.",
      "Lisser au fouet après refroidissement avant incorporation.",
      "Stockage : au réfrigérateur à 0–4 °C, filmé ou en boîte hermétique. Péremption : 24–48 h selon fraîcheur des produits laitiers et des œufs."
    ],
    "tags": [
      "creme",
      "patissiere",
      "vanille",
      "base"
    ],
    "difficultyScore": 7
  },
  "salade_avocat_oeuf_epinards": {
    "title": "Salade avocat, œuf et épinards",
    "master": "crudites_maitre",
    "image": "/assets/recipe-images/bases_salees_maitre.jpg",
    "categories": [
      "Entrées",
      "Plats"
    ],
    "seasons": [
      "Printemps",
      "Été",
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "yield": "2 personnes",
    "ingredients": [
      {
        "group": "Base",
        "items": [
          "200 g avocat mûr en dés",
          "100 g œufs durs écalés et tranchés",
          "60 g pousses d’épinards lavées et séchées",
          "14 g huile d’olive",
          "15 g jus de citron",
          "2 g sel fin",
          "1 g poivre noir"
        ]
      },
      {
        "group": "Option",
        "items": [
          "120 g tomates cerises",
          "30 g noix",
          "40 g fromage en dés"
        ]
      }
    ],
    "steps": [
      "Cuire les œufs durs, refroidir, écaler et trancher.",
      "Couper l’avocat en dés.",
      "Mélanger pousses d’épinards, avocat et œufs.",
      "Assaisonner avec huile d’olive, jus de citron, sel et poivre.",
      "Ajouter les options au moment du service si souhaité."
    ],
    "notes": [
      "Recette ajoutée depuis l’image fournie.",
      "Servir rapidement après découpe de l’avocat.",
      "Stockage : boîte hermétique au réfrigérateur. Péremption : 24 h, à assaisonner au dernier moment."
    ],
    "tags": [
      "salade",
      "avocat",
      "oeuf",
      "epinards",
      "entree"
    ],
    "difficultyScore": 4,
    "additionalMasters": [
      "entrees_maitre",
      "apero_maitre"
    ]
  },
  "apero_maitre": {
    "title": "Apéro",
    "image": "/assets/recipe-images/sauces_assaisonnements_maitre.jpg",
    "categories": [
      "Apéro"
    ],
    "seasons": [
      "Printemps",
      "Été",
      "Automne",
      "Hiver"
    ],
    "variants": [
      {
        "id": "crudites_maitre",
        "label": "Crudités et salades fraîches"
      },
      {
        "id": "ricotta_fouettee",
        "label": "Ricotta fouettée (assaisonnements)"
      },
      {
        "id": "legumes_rotis",
        "label": "Légumes rôtis au four"
      },
      {
        "id": "court_bouillon",
        "label": "Court-bouillon"
      },
      {
        "id": "vinaigrette",
        "label": "Vinaigrette de chef (variantes)"
      },
      {
        "id": "pesto_variantes",
        "label": "Pesto (base + variantes)"
      },
      {
        "id": "balsamique_reduit",
        "label": "Balsamique réduit (variantes)"
      },
      {
        "id": "huile_pimentee_pizza",
        "label": "Huile pimentée pour pizza (variantes)"
      },
      {
        "id": "marinades_guide",
        "label": "Marinades — 10 signatures"
      },
      {
        "id": "cake_sale_lardon",
        "label": "Cake salé lardon"
      },
      {
        "id": "cookies_sales_variantes",
        "label": "Cookies salés (base + variantes)"
      },
      {
        "id": "tomates_variantes",
        "label": "Tomates au four (séchées ou confites)"
      },
      {
        "id": "oignons_rotis_thym_miel",
        "label": "Oignons rôtis au thym et au miel"
      }
    ],
    "technical": [
      {
        "label": "Organisation",
        "value": "Regroupe les recettes faciles à partager avant le repas."
      }
    ],
    "difficulty": "easy",
    "ingredients": [],
    "steps": [],
    "notes": [],
    "tags": []
  },
  "desserts_cuillere_maitre": {
    "title": "Desserts à la cuillère",
    "master": "desserts_maitre",
    "image": "/assets/recipe-images/creme_diplomate_vanille.jpg",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Toutes saisons"
    ],
    "variants": [
      {
        "id": "tiramisu_speculoos",
        "label": "Tiramisu spéculoos rapide"
      }
    ],
    "technical": [
      {
        "label": "Service",
        "value": "Desserts servis froids ou crèmeux, dressés en verrine, plat ou coupe."
      }
    ],
    "difficulty": "easy",
    "ingredients": [],
    "steps": [],
    "notes": [],
    "tags": []
  },
  "tartes_maitre": {
    "title": "Tartes",
    "master": "desserts_maitre",
    "image": "/assets/recipe-images/coulis_guide.jpg",
    "categories": [
      "Desserts"
    ],
    "seasons": [
      "Printemps",
      "Été",
      "Automne",
      "Hiver"
    ],
    "variants": [
      {
        "id": "tarte_citron_meringuee",
        "label": "Tarte citron meringuée"
      }
    ],
    "technical": [
      {
        "label": "Organisation",
        "value": "Regroupe les fonds, garnitures et montages de tartes."
      }
    ],
    "difficulty": "easy",
    "ingredients": [],
    "steps": [],
    "notes": [],
    "tags": []
  },
  "crudites_maitre": {
    "title": "Crudités et salades fraîches",
    "master": "entrees_maitre",
    "image": "/assets/recipe-images/bases_salees_maitre.jpg",
    "categories": [
      "Entrées",
      "Apéro"
    ],
    "seasons": [
      "Printemps",
      "Été",
      "Toutes saisons"
    ],
    "difficulty": "easy",
    "variants": [
      {
        "id": "salade_avocat_oeuf_epinards",
        "label": "Salade avocat, œuf et épinards"
      }
    ],
    "ingredients": [
      {
        "group": "Sous-fiches",
        "items": [
          "Choisir une recette dans cette fiche."
        ]
      }
    ],
    "steps": [
      "Choisir une recette pour afficher le détail."
    ],
    "notes": [
      "Fiche parent de rangement."
    ]
  }
};
