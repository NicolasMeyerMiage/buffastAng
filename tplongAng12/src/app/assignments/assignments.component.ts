import {Component, OnInit} from '@angular/core';
import {AssignmentService} from "../shared/assignment.service";
import {AssignmentModel} from "../models/assignment.model";

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {

  ajoutActive: boolean = false;
  formVisible: boolean = false;
  dateDeRendu!: Date;
  assignmentsDone?: any;
  assignmentsNotDone?: any;
  assignementSelected!: AssignmentModel;
  assignmentsSelect: string[] = 'Web - BackEnd - Base de donées - Gestion de projet / SCRUM - Charlatanisme - Manipulation'.split(' - ');
  selectedAssignment: string = 'Web';
  // Pagination management
  assignment: any;
  page: number = 1;
  limit: number = 10;
  totalDocs?: number;
  totalPages?: number;
  hasPrevPage?: boolean;
  prevPage?: number;
  hasNextPage?: boolean;
  nextPage?: number;

  constructor(private assignmentService: AssignmentService) {
  }

  ngOnInit(): void {
    this.getAssignments(true);
    this.getAssignments(false);
    setTimeout(() => {
      this.ajoutActive = true;
    }, 2000);
  }

  assignementClique(assignment: AssignmentModel) {
    this.assignementSelected = assignment;
  }

  /*onAddAssignmentBtnClick() {
    this.formVisible = true;
  }*/

  onListVisible() {
    this.formVisible = false;
  }

  getAssignments(done: boolean) {
    this.assignmentService.getAssignments(this.page, this.limit, done)
      .subscribe(data => {
        done ? this.assignmentsDone = data.docs : this.assignmentsNotDone = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;
      });
  }

  onDrop($event: any) {
    let assignment: AssignmentModel = $event.previousContainer.data[$event.previousIndex];
    if($event.isPointerOverContainer) {
      assignment.rendu ? assignment.rendu = false : assignment.rendu = true;
      this.assignmentService.updateAssignment(assignment)
        .subscribe(() => {
          this.getAssignments(true);
          this.getAssignments(false);
        });
    }
  }
}
