diff --git a/server.js b/server.js
index bf224cabde473e8d537ca9b8723899a889defa92..4ea9cb156313a82086eca0f9de80bafc7ebcc16b 100644
--- a/server.js
+++ b/server.js
@@ -127,51 +127,51 @@ function serveFile(req, res, filePath, noStore = false) {
 }
 
 function readRecipes() {
   const recipesPath = path.join(ROOT, 'recipes.js');
   const code = fs.readFileSync(recipesPath, 'utf8');
   const context = { window: {} };
   vm.createContext(context);
   vm.runInContext(code, context, { filename: recipesPath });
   if (!context.window.RECIPES || typeof context.window.RECIPES !== 'object') {
     throw new Error('window.RECIPES est introuvable');
   }
   return context.window.RECIPES;
 }
 
 function backupRecipes() {
   const backupDir = path.join(ROOT, 'backups');
   fs.mkdirSync(backupDir, { recursive: true });
   const stamp = new Date().toISOString().replace(/[:.]/g, '-');
   fs.copyFileSync(path.join(ROOT, 'recipes.js'), path.join(backupDir, `recipes-${stamp}.js`));
 }
 
 function writeRecipes(recipes) {
   backupRecipes();
   const header = [
     '// ============================================================',
-    '//  Le Grimoire Culinaire de MaruChiwa - recipes.js',
+    '//  Cook Note - recipes.js',
     '//  Genere par le back-office local. Modifier via /admin.',
     '// ============================================================',
     '',
     `window.RECIPES = ${JSON.stringify(recipes, null, 2)};`,
     ''
   ].join('\n');
   fs.writeFileSync(path.join(ROOT, 'recipes.js'), header, 'utf8');
 }
 
 function sanitizeId(value) {
   return String(value || '')
     .normalize('NFD')
     .replace(/[\u0300-\u036f]/g, '')
     .toLowerCase()
     .replace(/[^a-z0-9_-]+/g, '_')
     .replace(/^_+|_+$/g, '')
     .slice(0, 80);
 }
 
 function normalizeRecipe(recipe) {
   return {
     title: String(recipe.title || '').trim(),
     categories: Array.isArray(recipe.categories) ? recipe.categories.map(String).filter(Boolean) : [],
     seasons: Array.isArray(recipe.seasons) ? recipe.seasons.map(String).filter(Boolean) : [],
     difficulty: String(recipe.difficulty || ''),
@@ -342,28 +342,28 @@ function route(req, res) {
 
   if (url.pathname === '/admin' || url.pathname === '/admin/') {
     if (!requireAdmin(req, res)) return;
     serveFile(req, res, path.join(ROOT, 'admin.html'), true);
     return;
   }
 
   if (['/admin.html', '/admin.js'].includes(url.pathname)) {
     if (!requireAdmin(req, res)) return;
     serveFile(req, res, path.join(ROOT, url.pathname.slice(1)), true);
     return;
   }
 
   if (url.pathname === '/admin-login.html') {
     serveFile(req, res, path.join(ROOT, 'admin-login.html'), true);
     return;
   }
 
   const filePath = safePath(url.pathname);
   if (!filePath) return send(res, 400, 'Bad request');
   serveFile(req, res, filePath);
 }
 
 const server = http.createServer(route);
 server.listen(PORT, HOST, () => {
-  console.log(`MC Food dev server: http://${HOST}:${PORT}`);
+  console.log(`Cook Note dev server: http://${HOST}:${PORT}`);
   console.log(`Admin: http://${HOST}:${PORT}/admin`);
 });
