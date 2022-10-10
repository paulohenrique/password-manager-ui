import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { CardDialogComponent } from '../card-dialog/card-dialog.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  cards: any;
  currentCard = null;
  currentIndex = -1;
  name = '';

  constructor(private cardService: CardService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.retrieveCards();
  }

  retrieveCards(): void {
    this.cardService.getAll()
      .subscribe(
        data => {
          this.cards = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveCards();
    this.currentCard = null;
    this.currentIndex = -1;
  }

  setActiveCard(card, index): void {
    this.currentCard = card;
    this.currentIndex = index;
    this.openDialog();
  }

  searchCardByName(): void {
    if (this.name) {
      this.cardService.findByName(this.name)
        .subscribe(
          data => {
            this.cards = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
    } else {
      this.retrieveCards();
    }

  } 

  deleteCard(id: number): void {
    this.cardService.delete(id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/cards']);
        },
        error => {
          console.log(error);
        });
  }

  updateCard(id: number, data): void {
    this.cardService.update(id, data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CardDialogComponent, {
      width: '30vw',
      data: this.currentCard
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'delete') {
        this.deleteCard(result.data.id);
      } else if (result && result.action === 'update') {
        this.updateCard(result.data.id, result.data);
      }
      this.refreshList();
      window.location.reload();
    });
  }

}
