import {Component, OnInit} from '@angular/core';
import {AssignmentService} from "../shared/assignment.service";
import {AssignmentModel} from "../models/assignment.model";
import {TeacherService} from "../shared/teacher.service";

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
  assignmentsSelect: string[] = 'Tous - Web - BackEnd - Base de données - Gestion de projet - Charlatanisme - Manipulation'.split(' - ');
  assignmentSelected: string = '';
  selectedAssignment?: string;
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

  constructor(private assignmentService: AssignmentService,
              private teacherService: TeacherService) {
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

  onListVisible() {
    this.formVisible = false;
  }

  getAssignments(done: boolean, ue: string) {
    this.assignmentService.getAssignments(this.page, this.limit, done, ue)
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
          this.getAssignments(true, this.assignmentSelected);
          this.getAssignments(false, this.assignmentSelected);
        });
    }
  }

  editAssignment(assignment: any) {

  }
}
