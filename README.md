# NETSoins — Liste des Residents

Application de gestion et de consultation de residents en EHPAD, developpee dans le cadre du test technique Orisha Socialcare.

## Stack technique

| Outil | Role | Justification |
|---|---|---|
| **Vue 3.5** | Framework UI | Impose par le test |
| **TypeScript 6** (strict) | Typage | Securite du code, autocompletion, meilleure maintenabilite |
| **Tailwind CSS v4** | Styling | Utility-first, tokens DS integres dans `@theme`, aucun CSS custom superflu |
| **@tanstack/vue-query** | Data fetching | Cache intelligent, loading/error states, stale-while-revalidate |
| **Pinia** | State management | Store leger et type pour les filtres / vue mode |
| **Vue Router 4** | Routing | Navigation SPA liste <-> fiche resident, lazy loading |
| **Phosphor Icons** | Iconographie | Correspond au design system Figma |
| **Vite 8** | Build tool | HMR rapide, tree-shaking, code-splitting automatique |

## Lancer le projet

```bash
# Installer les dependances
npm install

# Lancer en developpement
npm run dev

# Build de production
npm run build

# Previsualiser le build
npm run preview

# Type-check
npx vue-tsc --noEmit
```

## Architecture

```
src/
├── api/              # Couche data — API simulee avec delais (300ms/200ms)
├── assets/           # CSS (31+ design tokens @theme) + data.json (50 residents)
├── components/
│   ├── atoms/        # Avatar, Badge, InfoTag, Tooltip, DropdownMenu, SearchInput, ViewToggle, IconButton
│   ├── molecules/    # ResidentRow, ResidentCard, PaginationBar, FilterDropdown, BreadcrumbBar, InfoBlock
│   └── organisms/    # ResidentTable, ResidentGrid, ResidentProfile, FilterBar, SectorSidebar, EmptyState, etc.
├── composables/      # useResidents, useSectors, useClickOutside
├── layouts/          # DefaultLayout (sidebar retractable + content)
├── pages/            # ResidentsPage, ResidentDetailPage (lazy-loaded)
├── router/           # Routes avec code-splitting
├── stores/           # Pinia setup stores (filtres, pagination, vue mode)
└── types/            # Interfaces TypeScript strictes (Resident, MedecinTraitant, etc.)
```

### Choix architecturaux

**Atomic Design** — 27 composants organises en atoms (11) -> molecules (7) -> organisms (9). Chaque primitif (InfoTag, Tooltip, DropdownMenu) est reutilisable via des slots et des props typees.

**Separation des responsabilites** — La couche `api/` isole la source de donnees. Passer d'un JSON local a une API REST ne necessite que de modifier `api/residents.ts`.

**TanStack Query** — Cache intelligent avec `staleTime: 5min`, etats de chargement/erreur declaratifs, et un pattern coherent avec une architecture production.

**Design tokens dans Tailwind** — Tous les tokens du Design System Figma (couleurs, typographie, espacements, radius, ombres) sont centralises dans `@theme` de `main.css`. Zero couleur hardcodee dans les composants.

## Fonctionnalites

### Liste des residents
- Vue **tableau** avec colonnes triees et bouton d'action par ligne
- Vue **trombinoscope** (grille 3 colonnes) avec carte horizontale (avatar, nom, date, INS, chambre)
- Basculement instantane entre les deux vues via un segmented control

### Recherche et filtres
- **Recherche full-text** par nom, chambre, INS ou secteur
- **Sidebar hierarchique** avec filtres par secteur et sous-secteur
- **Filtre par colonnes** — popover avec recherche interne, multi-selection, apply/cancel
- **Badges semantiques** — Presente, Sortie temporaire, Absence familiale, Hospitalisation

### Pagination
- Selecteur de taille de page (5, 10, 20, 50)
- Navigation par pages avec ellipsis
- **Synchronisation URL** — page et taille persistees dans les query params (bookmarkable)
- Clamping automatique si les filtres reduisent les resultats

### Fiche resident (vue Synthese)
- **Bandeau patient** — avatar carre (64px), nom, badges d'info (GIR, age/genre/date, chambre, medecin traitant)
- **Tooltip medecin** — au hover, affiche nom complet et telephone dans un tooltip dark
- **Navigation par onglets** — Synthese, Soins, Administratif, Alimentation, Intendance, Autres
- **Indicateur glissant** — barre animee qui suit l'onglet actif horizontalement
- **Dropdowns** — menus deroulants pour Soins (4 items) et Autres (2 items)

### Empty state
- Message centre "Aucun resident ne correspond a votre recherche"
- Bouton "Reinitialiser la recherche" qui remet tous les filtres a zero

### Navigation
- **Breadcrumbs** dynamiques selon la route
- **Lazy loading** des pages pour le code-splitting
- **Sidebar retractable** avec animation

## Investissement personnel

Au-dela de la maquette demandee, voici les ajouts qui renforcent la qualite et la maintenabilite du projet :

### Primitifs reutilisables (Atomic Design pousse)

Plutot que de coder en dur dans les organismes, les patterns recurrents sont extraits en composants generiques :

| Composant | Role | API |
|---|---|---|
| `InfoTag` | Badge d'info gris (GIR, age, chambre...) | Slot + class prop |
| `Tooltip` | Tooltip dark avec fleche au hover | Slot `#trigger` + slot defaut, prop `minWidth` |
| `DropdownMenu` | Menu deroulant avec overlay | Props `items`, `minWidth`, slot `#trigger`, emit `select` |

Ces primitifs sont utilises dans `ResidentProfile` mais sont reutilisables n'importe ou dans l'application.

### Animations et micro-interactions

- **Indicateur d'onglet glissant** — calcul dynamique de `offsetLeft` et `offsetWidth` de l'onglet actif, anime via `transition-all duration-300 ease-in-out`
- **Transitions Vue `<Transition>`** — dropdowns (ease-out 150ms / ease-in 100ms), texte sidebar (fade)
- **Hover states** — ombres sur les cartes (`shadow-sm` -> `shadow-default`), couleurs sur les boutons et badges
- **Loading spinner** — `animate-spin` pendant le chargement des donnees
- **Collapse sidebar** — animation de largeur avec `transition-all duration-200`

### API simulee realiste

La couche `api/residents.ts` simule un backend avec des delais artificiels :

```typescript
// 300ms pour la liste, 200ms pour un resident
await new Promise(resolve => setTimeout(resolve, 300))
```

Combine avec TanStack Query, cela produit des loading states reels (spinner visible), du cache intelligent, et une architecture prete pour basculer sur une vraie API REST sans toucher aux composants.

### Filtrage multi-niveaux

Le systeme de filtrage combine 5 criteres simultanement :
1. **Recherche textuelle** — sur `nomComplet`, `chambre`, `ins`, `secteur`
2. **Secteur** — via la sidebar hierarchique
3. **Sous-secteur** — precision du filtre secteur
4. **Statut administratif** — par situation
5. **Selection par colonnes** — popover avec `Set<string>` pour des lookups O(1)

Chaque changement de filtre reset automatiquement la pagination a la page 1.

### Design System exhaustif

31+ tokens CSS dans `@theme` reproduisant fidelement le Figma :
- 12 tokens de couleurs semantiques (module, bg, stroke, text)
- 12 tokens de statut (4 couleurs x bg/border/text)
- 10 niveaux de gris neutres
- 6 tailles de texte avec line-height et letter-spacing associes
- 8 niveaux de spacing, 5 de radius, 2 ombres
- Scrollbar personnalisee (webkit)

### TypeScript strict

- `strict: true` + `noUnusedLocals` + `noUnusedParameters`
- Interfaces typees pour chaque entite (`Resident`, `MedecinTraitant`, `SecteurSousSecteur`, etc.)
- Props et emits types via `defineProps<T>()` et `defineEmits<T>()`
- Type unions pour les etats (`ViewMode`, `StatusColor`)
- Map de correspondance couleurs hex -> semantiques (`STATUS_COLOR_MAP`)
- Zero `any`, zero `@ts-ignore`

## Storybook

```bash
# Lancer Storybook (port 6006)
npm run storybook

# Build statique
npm run build-storybook
```

20 stories couvrant l'ensemble des composants (atoms, molecules, organisms, layouts), avec des variantes illustrant les differents etats. Addon d'accessibilite (`@storybook/addon-a11y`) integre.

## Tests

```bash
# Lancer les tests en mode watch
npm test

# Execution unique
npm run test:run
```

Tests unitaires avec **Vitest** + **@vue/test-utils**. Mock factory (`createMockResident()`) pour generer des donnees de test coherentes.
