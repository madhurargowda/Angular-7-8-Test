import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html'
})
export class PeopleListComponent implements OnInit {

  people: any[] = [];

  constructor(private service: PeopleService, private router: Router) {}

  ngOnInit() {
    this.service.getPeople().subscribe(data => {
      this.people = data;
    });
  }

  editPerson(id: number) {
    this.router.navigate(['/edit', id]);
  }

  deletePerson(id: number) {
    this.service.deletePerson(id).subscribe(() => {
      this.people = this.people.filter(p => p.id !== id);
    });
  }
}
