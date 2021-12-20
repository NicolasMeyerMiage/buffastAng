import { Component, OnInit } from '@angular/core';
import { AssignmentService } from "../shared/assignment.service";
import { AssignmentModel } from "../models/assignment.model";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {

  ajoutActive: boolean = false;
  title: string = 'C\'est un super titre pour ce component !';
  formVisible: boolean = false;
  dateDeRendu!: Date;
  assignments!: AssignmentModel[];
  assignementSelected!: AssignmentModel;

  // Pagination management
  page: number = 1;
  limit: number = 10;
  totalDocs?: number;
  totalPages?: number;
  hasPrevPage?: boolean;
  prevPage?: number;
  hasNextPage?: boolean;
  nextPage?: number;
  currentIndex?: number;

  constructor(private assignmentService: AssignmentService) { }

  ngOnInit(): void {
    this.getAssignments();
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

  getAssignments() {
    this.assignmentService.getAssignments(this.page, this.limit)
      .subscribe(data => {
        this.assignments = data.docs;
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

  onChangePage(pe: PageEvent) {
    this.currentIndex = (pe.pageIndex + 1) == this.page ? this.page : (pe.pageIndex + 1) == this.nextPage! ? this.nextPage! : this.prevPage!;
      this.assignmentService.getAssignments(this.currentIndex, pe.pageSize).subscribe(
        data => {
          this.assignments = data.docs;
          this.totalPages = data.totalPages;
          this.hasPrevPage = data.hasPrevPage;
          this.prevPage = data.prevPage;
          this.hasNextPage = data.hasNextPage;
          this.nextPage = data.nextPage;
        }
      );
  }
  /*onNouvelAssignement(event: AssignementsModel) {
    this.assignmentService.addAssignment(event)
      .subscribe(message => console.log(message));
    this.formVisible = false;
  }*/

}
