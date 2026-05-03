diff --git a/README.txt b/README.txt
index 2fdce20af78ace9306a0695ecf2e83ea4adf1ce5..c774b9b22358eaf6fa559fc663f455726b08b044 100644
--- a/README.txt
+++ b/README.txt
@@ -1,26 +1,26 @@
-MC FOOD - LE GRIMOIRE CULINAIRE DE MARUCHIWA
+Cook Note - LE GRIMOIRE CULINAIRE DE MARUCHIWA
 ============================================
 
 LANCER EN LOCAL 
 ---------------
 
 1. Installer Node.js 18+ si besoin.
 2. Depuis ce dossier :
 
    npm run dev
 
 3. Ouvrir :
 
    Site public : http://127.0.0.1:8080
    Admin       : http://127.0.0.1:8080/admin
 
 Le serveur Node remplace Mongoose pour le mode dev/admin.
 Mongoose peut toujours servir les fichiers statiques, mais il ne permet pas
 d'ecrire les recettes depuis le back-office.
 
 MOT DE PASSE ADMIN
 ------------------
 
 Option recommandee :
 
 1. Copier admin.local.example.json vers admin.local.json.
