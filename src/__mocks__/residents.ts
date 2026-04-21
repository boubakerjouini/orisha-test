import type { Resident } from '@/types/resident'

export function createMockResident(overrides: Partial<Resident> = {}): Resident {
  return {
    id: '1',
    prefixedId: 'Resident_101_a5vry8p',
    nomComplet: 'M. DURAND Gaston (H)',
    nomNaissance: 'né BONNET, Lucette, Marcel, Gaston',
    age: 76,
    ageTexte: '76 ans',
    dateNaissance: '10/07/1950',
    ins: '505882578295',
    secteurSousSecteur: {
      idEtablissementSecteur: 405,
      prefixedIdEtablissementSecteur: 'EtablisssementSecteur_405_cb58959d74',
      libelleEtablissementSecteur: 'RDC',
      idEtablissementSousSecteur: 204,
      prefixedIdEtablissementSousSecteur: 'EtablisssementSousSecteur_204_73127fd71b',
      libelleEtablissementSousSecteur: 'Les iris',
      libelleComplet: 'RDC > Les iris',
    },
    chambre: {
      idEtablissementChambre: 10000,
      prefixedIdEtablissementChambre: 'EtablisssementChambre_10000_3w0gz8yk',
      libelleEtablissementChambre: '283',
    },
    situationAdministrative: {
      idSituationAdministrative: 10000,
      prefixedIdSituationAdministrative: 'SituationAdministrative_10000_50vdn6r5',
      texte: 'Présent',
      couleur: '#00C851',
    },
    isFavorite: false,
    ...overrides,
  }
}

export const mockResidents: Resident[] = [
  createMockResident({ id: '1', nomComplet: 'M. DURAND Gaston (H)', isFavorite: true }),
  createMockResident({
    id: '2',
    nomComplet: 'Mme THOMAS Madeleine (F)',
    nomNaissance: 'née RICHARD',
    age: 95,
    ageTexte: '95 ans',
    dateNaissance: '07/04/1931',
    ins: '313641199899',
    situationAdministrative: {
      idSituationAdministrative: 10001,
      prefixedIdSituationAdministrative: 'SituationAdministrative_10001_abc',
      texte: 'Sortie temporaire',
      couleur: '#FFA100',
    },
    chambre: {
      idEtablissementChambre: 10001,
      prefixedIdEtablissementChambre: 'EtablisssementChambre_10001_xyz',
      libelleEtablissementChambre: '101',
    },
  }),
  createMockResident({
    id: '3',
    nomComplet: 'M. BERNARD Paul (H)',
    situationAdministrative: {
      idSituationAdministrative: 10002,
      prefixedIdSituationAdministrative: 'SituationAdministrative_10002_def',
      texte: 'Hospitalisation',
      couleur: '#FF4444',
    },
  }),
  createMockResident({
    id: '4',
    nomComplet: 'Mme PETIT Marie (F)',
    situationAdministrative: {
      idSituationAdministrative: 10003,
      prefixedIdSituationAdministrative: 'SituationAdministrative_10003_ghi',
      texte: 'Absence familiale',
      couleur: '#33B5E5',
    },
  }),
]
