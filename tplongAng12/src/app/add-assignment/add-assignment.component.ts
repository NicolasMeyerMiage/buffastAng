import { Component, OnInit } from '@angular/core';
import { AssignmentService } from "../shared/assignment.service";
import { AssignmentModel } from "../models/assignment.model";

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss']
})
export class AddAssignmentComponent implements OnInit {

  //@Output() nouvelAssignemnt: EventEmitter<AssignementsModel> = new EventEmitter<AssignementsModel>();
  nomDevoir: string = '';
  dateDeRendu!: string;

  constructor(private assignmentService: AssignmentService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const assignmentModel: AssignmentModel = new AssignmentModel();
    assignmentModel.id = Math.floor(Math.random()*1000);
    assignmentModel.nom = this.nomDevoir;
    assignmentModel.dateDeRendu = this.dateDeRendu;
    assignmentModel.rendu = false;

    this.assignmentService.addAssignment(assignmentModel)
      .subscribe(message => console.log(message));
    //this.nouvelAssignemnt.emit(assignementsModel)
  }
}

