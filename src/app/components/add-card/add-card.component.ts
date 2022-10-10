import { Component, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  card = {
    name: '',
    url: '',
    username: '',
    password: ''
  };

  submitted = false;

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    const data = {
      name: this.card.name,
      url: this.card.url,
      username: this.card.username,
      password: this.card.password
    };

    this.cardService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newTutorial(): void {
    this.submitted = false;
    this.card = {
      name: '',
      url: '',
      username: '',
      password: ''
    };
  }

}
