# DeviseApp — Frontend Vue.js

Application de gestion des devises développée avec Vue.js 3 et Laravel.

## Prérequis

- **Node.js** `>= 20.19`
- **npm** `>= 9`
- Le backend Laravel doit être en cours d'exécution

## Installation et lancement

```bash
git clone git@github.com:Steph2505/deviseApp-front.git
cd deviseApp-front
npm install
cp .env.example .env
```

Renseigner l'URL de l'API dans `.env` :

```env
VITE_API_URL=http://localhost:8000/api
```

```bash
npm run dev
```

## Stack technique

### Dépendances principales

| Bibliothèque | Version | Rôle |
|---|---|---|
| [Vue.js 3](https://vuejs.org) | ^3.5 | Framework UI (Composition API) |
| [Vue Router](https://router.vuejs.org) | ^5.0 | Routage côté client |
| [Pinia](https://pinia.vuejs.org) | ^3.0 | Gestion d'état global |
| [Axios](https://axios-http.com) | ^1.16 | Requêtes HTTP vers l'API |
| [VueUse](https://vueuse.org) | ^14.3 | Composables utilitaires |
| [Font Awesome Free](https://fontawesome.com) | ^7.2 | Icônes |
| [jsPDF](https://github.com/parallax/jsPDF) | ^4.2 | Génération de PDF |
| [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable) | ^5.0 | Tableaux dans les PDF |


## Installation individuelle

```bash
npm install vue@^3.5 vue-router@^5.0 pinia@^3.0
npm install axios@^1.16 @vueuse/core@^14.3
npm install @fortawesome/fontawesome-free@^7.2
npm install jspdf@^4.2 jspdf-autotable@^5.0

npm install --save-dev vite@^8.0 @vitejs/plugin-vue vite-plugin-vue-devtools
npm install --save-dev eslint eslint-plugin-vue @eslint/js globals
npm install --save-dev oxlint eslint-plugin-oxlint eslint-config-prettier prettier npm-run-all2
```
