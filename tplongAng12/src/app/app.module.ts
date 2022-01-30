// Modules
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {HttpClientModule} from "@angular/common/http";
import {MatPaginatorModule} from "@angular/material/paginator";
// Components
import {AppComponent} from './app.component';
import {AssignmentsComponent} from "./assignments/assignments.component";
import {AddAssignmentComponent} from './add-assignment/add-assignment.component';
import {AssignmentDetailComponent} from './assignment-detail/assignment-detail.component';
import {EditAssignmentComponent} from './edit-assignment/edit-assignment.component';
import {AssignmentLoginComponent} from './assignment-login/assignment-login.component';
// Services
import {AssignmentService} from "./shared/assignment.service";
import {LoginService} from "./shared/login.service";
import {AuthService} from "./shared/auth.service";
import {UserService} from "./shared/user.service";
import {AuthGuard} from "./shared/auth.guard";
// Directives
import {RenduDirective} from "./shared/rendu.directive";
import {Utils} from "./shared/utils";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatSelectModule} from "@angular/material/select";
import {MatStepperModule} from "@angular/material/stepper";

const routes: Routes = [
  {path: '', component: AssignmentsComponent},
  {path: 'login', component: AssignmentLoginComponent},
  {path: 'home', component: AssignmentsComponent},
  {path: 'add', component: AddAssignmentComponent, canActivate: [AuthGuard]},
  {path: 'assignment/:id', component: AssignmentDetailComponent},
  {path: 'assignment/:id/edit', component: EditAssignmentComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent, AssignmentsComponent, RenduDirective,
    AssignmentDetailComponent, AddAssignmentComponent,
    EditAssignmentComponent, AssignmentLoginComponent
  ],
    imports: [
        BrowserModule, AppRoutingModule, BrowserAnimationsModule,
        FormsModule, HttpClientModule, ReactiveFormsModule,
        MatButtonModule, MatDividerModule, MatIconModule,
        MatFormFieldModule, MatInputModule, MatDatepickerModule,
        MatNativeDateModule, MatListModule, MatCardModule,
        MatCheckboxModule, MatSlideToggleModule, MatPaginatorModule,
        RouterModule.forRoot(routes), DragDropModule, MatOptionModule, MatSelectModule, MatStepperModule
    ],
  providers: [
    AssignmentService, LoginService, AuthService,
    UserService, Utils
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
