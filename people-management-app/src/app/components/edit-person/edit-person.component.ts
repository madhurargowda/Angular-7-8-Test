import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html'
})
export class EditPersonComponent implements OnInit {

  person: any = {};
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private service: PeopleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.service.getPersonById(this.id).subscribe(data => {
      this.person = data;
    });
  }

  updatePerson() {
    this.service.updatePerson(this.id, this.person).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
