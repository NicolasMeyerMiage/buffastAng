import {TeacherModel} from './teacher.model';
import {StudentModel} from './student.model';

export class AssignmentModel {
  _id?: string;
  id!: number;
  nom!: string;
  ue!: string;
  pic?: string;
  dateDeRendu?: string;
  rendu?: boolean;
  note?: number;
  visible: boolean = false;
  remarque?: string;
  etudiant!: number;
  student!: StudentModel;
  teacher!: TeacherModel;
}
