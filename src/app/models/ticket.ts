// src/app/models/ticket.ts

export interface Ticket {
  id?: number;
  titre?: string;
  description?: string;
  priorite?: 'HAUTE' | 'MOYENNE' | 'BASSE'; 
  statut?: 'OUVERT' | 'EN_COURS' | 'FERME'; 
  assigneA?: {
    id: number;
    nom: string;
  } | null;
  dateCreation?: string;       
  dateModification?: string;   
}
