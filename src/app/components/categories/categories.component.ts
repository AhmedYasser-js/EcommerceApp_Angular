import { Component, OnInit } from '@angular/core';
import { ApidataService } from 'src/app/service/apidata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  constructor(private _ApidataService: ApidataService) { }

  CategorieData: any[] = [];


  ngOnInit(): void {
    this._ApidataService.getCategories().subscribe({
      next: (response) => {
        console.log(response)
        this.CategorieData = response.data;
      }
    })
  }
}
