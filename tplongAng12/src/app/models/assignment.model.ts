export class AssignmentModel {
  _id?: string;
  id!: number;
  nom!: string;
  ue!: string;
  pic?: string;
  dateDeRendu?: string;
  rendu?: boolean;
  note?: number;
  remarque?: string;
  etudiant!: string;
}
