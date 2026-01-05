import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { EditPersonComponent } from './components/edit-person/edit-person.component';

const routes: Routes = [
  { path: '', component: PeopleListComponent },
  { path: 'edit/:id', component: EditPersonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
