# NETSoins — Liste des Résidents

Application de gestion et de consultation de résidents en EHPAD, développée dans le cadre du test technique Orisha Socialcare.

## Stack technique

| Outil | Rôle | Justification |
|---|---|---|
| **Vue 3** | Framework UI | Imposé par le test |
| **TypeScript** (strict) | Typage | Sécurité du code, autocomplétion, meilleure maintenabilité |
| **Tailwind CSS v4** | Styling | Utility-first, tokens DS intégrés dans `@theme`, aucun CSS custom superflu |
| **@tanstack/vue-query** | Data fetching | Gestion du cache, loading/error states, stale-while-revalidate — même sur données locales, simule une vraie architecture API |
| **Pinia** | State management | Store léger et typé pour les filtres / vue mode |
| **Vue Router** | Routing | Navigation SPA liste ↔ fiche résident |
| **Phosphor Icons** | Iconographie | Correspond au design system Figma |
| **Vite** | Build tool | HMR rapide, tree-shaking, code-splitting automatique |

## Lancer le projet

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview

# Type-check
npx vue-tsc --noEmit
```

## Architecture

```
src/
├── api/            # Couche data — fonctions de fetch (simulées)
├── assets/         # CSS (design tokens) + data.json
├── components/
│   ├── atoms/      # Badge, Avatar, SearchInput, ViewToggle, IconButton
│   ├── molecules/  # ResidentRow, ResidentCard, FilterDropdown, InfoBlock
│   └── organisms/  # ResidentTable, ResidentGrid, FilterBar, Sidebar, etc.
├── composables/    # useResidents (TanStack Query), useClickOutside
├── layouts/        # DefaultLayout (sidebar + content)
├── pages/          # ResidentsPage, ResidentDetailPage
├── router/         # Configuration des routes
├── stores/         # Pinia — filtres, vue mode
└── types/          # Interfaces TypeScript (Resident, etc.)
```

### Choix architecturaux

**Atomic Design** — Les composants suivent une hiérarchie atoms → molecules → organisms pour faciliter la réutilisation et la maintenance.

**Séparation des responsabilités** — La couche `api/` isole la source de données. Passer d'un JSON local à une API REST ne nécessiterait que de modifier `api/residents.ts`.

**TanStack Query** — Même sur des données locales, cette librairie apporte : cache intelligent, états de chargement/erreur déclaratifs, et un pattern cohérent avec une architecture production.

**Design tokens dans Tailwind** — Tous les tokens du Design System Figma (couleurs, typographie, espacements, radius, ombres) sont centralisés dans `@theme` de `main.css`, rendant le code cohérent avec la maquette.

## Fonctionnalités

- Liste des résidents en vue **tableau** et **trombinoscope**
- **Recherche** par nom, chambre, INS ou secteur
- **Filtres** par secteur, sous-secteur et statut administratif
- **Badges sémantiques** (Présent, Sortie temporaire, Absence familiale, Hospitalisation)
- **Fiche résident** détaillée avec toutes les informations
- **Navigation** fluide avec Vue Router (lazy-loaded)
- **Responsive** — adaptatif selon la taille d'écran
- **Sidebar** rétractable
