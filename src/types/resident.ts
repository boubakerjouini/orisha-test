export interface SecteurSousSecteur {
  idEtablissementSecteur: number
  prefixedIdEtablissementSecteur: string
  libelleEtablissementSecteur: string
  idEtablissementSousSecteur: number
  prefixedIdEtablissementSousSecteur: string
  libelleEtablissementSousSecteur: string
  libelleComplet: string
}

export interface Chambre {
  idEtablissementChambre: number
  prefixedIdEtablissementChambre: string
  libelleEtablissementChambre: string
}

export interface SituationAdministrative {
  idSituationAdministrative: number
  prefixedIdSituationAdministrative: string
  texte: string
  couleur: string
}

export interface Resident {
  id: string
  prefixedId: string
  nomComplet: string
  nomNaissance: string
  age: number
  ageTexte: string
  dateNaissance: string
  ins: string
  secteurSousSecteur: SecteurSousSecteur
  chambre: Chambre
  situationAdministrative: SituationAdministrative
  isFavorite: boolean
}

/** Map data.json hex colors to semantic status keys */
export type StatusColor = 'green' | 'orange' | 'blue' | 'red'

export const STATUS_COLOR_MAP: Record<string, StatusColor> = {
  '#00C851': 'green',   // Présent
  '#FFA100': 'orange',  // Sortie temporaire
  '#33B5E5': 'blue',    // Absence familiale
  '#FF4444': 'red',     // Hospitalisation
}

export type ViewMode = 'list' | 'grid'

export interface FilterState {
  search: string
  sector: string | null
  subSector: string | null
  status: string | null
}
