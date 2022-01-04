import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// importanto os componentes necessários
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  {path: '', redirectTo:'create-employee', pathMatch:'full'},
  {path: 'create-employee', component: EmployeeCreateComponent},
  {path: 'employees-list', component: EmployeeListComponent},
  {path: 'employee-edit/:id', component: EmployeeEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
