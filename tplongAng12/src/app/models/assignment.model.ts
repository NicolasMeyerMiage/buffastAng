export class AssignmentModel {
  _id?: string;
  id!: number;
  nom!: string;
  ue!: string;
  dateDeRendu?: Date;
  rendu?: boolean;
  note?: number;
  remarque?: string;
  etudiant!: string;
}
