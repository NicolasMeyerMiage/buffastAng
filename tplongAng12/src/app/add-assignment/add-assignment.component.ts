import { Component, OnInit } from '@angular/core';
import { AssignmentService } from "../shared/assignment.service";
import { AssignmentModel } from "../models/assignment.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClasseService} from "../shared/classe.service";
import {StudentService} from "../shared/student.service";
import {StudentModel} from "../models/student.model";

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss']
})
export class AddAssignmentComponent implements OnInit {

  nomAssignment!: string;
  ue!: string;
  lastAssignment!: number;
  classes!: string[];
  idStudent!: number;
  students!: StudentModel[]
  assignmentsSelect: string[] = 'Web - BackEnd - Base de donnees - Gestion de projet - Charlatanisme - Manipulation'.split(' - ');
  assignmentGroupForm!: FormGroup;
  studentGroupForm!: FormGroup;
  ueSelected!: string;

  constructor(private assignmentService: AssignmentService,
              private classeService: ClasseService,
              private studentService: StudentService,
              private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getLastAssignment();
    this.getClasses();
    this.assignmentGroupForm = this._formBuilder.group({
      nomAssignment: [this.nomAssignment, Validators.required],
      ue: [this.ue, Validators.required],
    });
    this.studentGroupForm = this._formBuilder.group({
      classe: ['', Validators.required],
      student: ['', Validators.required],
    });
  }

  getLastAssignment() {
    this.assignmentService.getLastAssignment().subscribe(data => {
      this.lastAssignment = data;
    });
  }

  setUeSelected(ue: string) {
    this.ueSelected = ue;
  }

  getClasses() {
    this.classeService.getClasses().subscribe(data => {
      for(data of data.docs) {
        console.log(data);
        this.classes.push(data.nom);
      }
    });
  }

  getStudentsFromClasse(classe: string) {
    this.studentService.getStudentsByClasse(classe).subscribe(data => {
      for(data of data) {
        this.students.push(data);
      }
    })
  }

  setStudentId(student: StudentModel) {
    this.idStudent = student.id;
  }

  onSubmit() {
    const assignmentModel: AssignmentModel = new AssignmentModel();
    assignmentModel.id = this.lastAssignment + 1;
    assignmentModel.rendu = false;
    assignmentModel.nom = this.nomAssignment;
    assignmentModel.ue = this.ueSelected;
    assignmentModel.etudiant = this.idStudent;
    assignmentModel.rendu = false;

    this.assignmentService.addAssignment(assignmentModel)
      .subscribe(message => console.log(message));
    //this.nouvelAssignemnt.emit(assignementsModel)
  }


}

