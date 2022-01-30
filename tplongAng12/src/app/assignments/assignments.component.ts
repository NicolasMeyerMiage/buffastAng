import {Component, OnInit} from '@angular/core';
import {AssignmentService} from "../shared/assignment.service";
import {AssignmentModel} from "../models/assignment.model";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {

  ajoutActive: boolean = false;
  formVisible: boolean = false;
  editActive: boolean = false;
  dateDeRendu!: Date;
  assignment: any;
  page: number = 1;
  limit: number = 10;
  totalDocs?: number;
  totalPages?: number;
  hasPrevPage?: boolean;
  prevPage?: number;
  hasNextPage?: boolean;
  nextPage?: number;
  assignmentsDone?: AssignmentModel[];
  assignmentsNotDone?: AssignmentModel[];

  constructor(private assignmentService: AssignmentService) {
  }

  ngOnInit(): void {
    this.getAssignments(true, '');
    this.getAssignments(false, '');
    setTimeout(() => {
      this.ajoutActive = true;
    }, 2000);
  }

  assignementClique(assignment: string) {
    assignment = assignment === 'Tous' ? '' : assignment;
    this.assignmentSelected = assignment === 'Tous' ? '' : assignment;
    this.getAssignments(true, assignment);
    this.getAssignments(false, assignment);
  }

  onEditVisible(assignment: any) {
    assignment.visible = assignment.visible == true ? false : true;
  }

  onListVisible() {
    this.formVisible = false;
  }

  getAssignments(done: boolean, ue: string) {
    this.assignmentService.getAssignments(this.page, this.limit, done, ue)
      .subscribe(data => {
        let assignments: AssignmentModel[] = [];
        for (data of data.docs) {
          let ass: AssignmentModel = data[0];
          ass.teacher = data[1];
          ass.student = data[2];
          assignments.push(ass);
        }
        done ? this.assignmentsDone = assignments : this.assignmentsNotDone = assignments;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
      });
    console.log(this.page);
  }

  assignmentsSelect: string[] = 'Tous - Web - BackEnd - Base de donnees - Gestion de projet - Charlatanisme - Manipulation'.split(' - ');
  assignmentSelected: string = '';
  selectedAssignment?: string;
  onDrop($event: any) {
    console.log($event);
    let assignment: AssignmentModel = $event.previousContainer.data[$event.previousIndex];
    if ($event.isPointerOverContainer && $event.container != $event.previousContainer && (assignment.note && assignment.note > 0)) {
      assignment.rendu ? assignment.rendu = false : assignment.rendu = true;
      this.assignmentService.updateAssignment(assignment)
        .subscribe(() => {
          this.getAssignments(true, this.assignmentSelected);
          this.getAssignments(false, this.assignmentSelected);
        });
    }
  }

  assignRemarque = new FormControl();
  assignNote = new FormControl();
  editAssignment(assignment: AssignmentModel) {
    if (this.assignNote.value < 21 && this.assignNote.value >= 0) {
      assignment.note = this.assignNote.value;
      assignment.remarque = this.assignRemarque.value;
      this.assignmentService.updateAssignment(assignment).subscribe(() => {
        this.assignNote = new FormControl();
        this.assignRemarque = new FormControl();
      });
    }
  }

  deleteNote(assignment: AssignmentModel) {
    assignment.note = NaN;
    assignment.remarque = '';
    this.assignmentService.updateAssignment(assignment).subscribe(() => {
      this.assignNote = new FormControl();
      this.assignRemarque = new FormControl();
    });
  }

  backPage(done: boolean) {
    this.page = this.page--;
    this.getAssignments(done, this.assignmentSelected);
  }

  jumpPage(done: boolean) {
    this.page = this.page++;
    this.getAssignments(done, this.assignmentSelected);
  }
}
