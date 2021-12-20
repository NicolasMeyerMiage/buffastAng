import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AssignmentService} from "../shared/assignment.service";
import {AssignmentModel} from "../models/assignment.model";

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.scss']
})
export class EditAssignmentComponent implements OnInit {

  assignment!: AssignmentModel;
  nomDevoir?: string;
  dateDeRendu?: Date;
  currentName?: string;

  constructor(private assignmentsService: AssignmentService,
              private route: ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.getAssignment();
    /*console.log("Query Params :");
    console.log(this.route.snapshot.queryParams);
    console.log("Fragment :");
    console.log(this.route.snapshot.fragment);*/
    this.route.queryParams.subscribe(params => {
      console.log("Query Params :");
      console.log(params);
    });
    this.route.fragment.subscribe(fragment => {
      console.log("Fragment :");
      console.log(fragment);
    })
    this.currentName = this.route.snapshot.queryParams.nom;
  }

  getAssignment() {
    const id = +this.route.snapshot.params.id;
    this.assignmentsService.getAssignmentById(id)
      .subscribe(assignment => this.assignment = assignment);
  }

  onSaveAssignment() {
    if(this.nomDevoir) {
      this.assignment.nom = this.nomDevoir;
    }

    if(this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }

    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(["/home"]);
      });
  }
}

