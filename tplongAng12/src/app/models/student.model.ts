export class StudentModel {
  _id?: string;
  id!: number;
  prenom!: string;
  nom!: string;
  age!: number;
  classe!: string;
  devoirRendu?: number;
  devoirTotal?: number;
  note?: number;
}
