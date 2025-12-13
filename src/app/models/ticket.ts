// src/app/models/ticket.ts
export interface Ticket {
  id?: number;
  titre?: string;
  description?: string;
  priorite?: 'URGENT' | 'MOYEN' | 'FAIBLE';
  statut?: 'NOUVEAU' | 'EN_COURS' | 'RESOLU';
  assigneA?: any; // <-- correction ici
  dateCreation?: string;
}
