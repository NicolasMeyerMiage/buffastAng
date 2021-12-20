import { Component, Input, OnInit } from '@angular/core';
import { AssignmentModel } from "../models/assignment.model";
import { AssignmentService } from "../shared/assignment.service";
import { ActivatedRoute, Router } from "@angular/router";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.scss']
})
export class AssignmentDetailComponent implements OnInit {

  /*@Input()*/ assignmentTransmis!: AssignmentModel;
  rendu: boolean = false;

  constructor(private assignmentService: AssignmentService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
    const id = +this.route.snapshot.params.id;
    this.assignmentService.getAssignmentById(id)
      .subscribe(assignment => this.assignmentTransmis = assignment);
  }

  devoirRendu() {
    this.assignmentTransmis.rendu = true;
    this.assignmentService.updateAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(['/home']);
      });
  }

  onDelete() {
    this.assignmentService.deleteAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
        // @ts-ignore
        this.assignmentTransmis = undefined;
        this.router.navigate(['/home']);
      });
  }

  onEdit() {
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'],
      {queryParams:{nom:this.assignmentTransmis.nom}, fragment:'edition'});
  }

  isLogged(): boolean {
    return this.authService.loggedIn;
  }

  isAdmin(): boolean {
    return this.authService.admin;
  }
}
