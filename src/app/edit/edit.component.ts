import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id?: number;
  newMode? = true;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.newMode = this.id ? false : true;
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.newMode = this.id ? false : true;
    });
  }
}
