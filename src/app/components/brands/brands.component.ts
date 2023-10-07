import { Component, OnInit } from '@angular/core';
import { ApidataService } from 'src/app/service/apidata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  constructor(private _ApidataService: ApidataService) { }

  BrandsData: any[] = [];

  ngOnInit(): void {
    this._ApidataService.getBrands().subscribe({
      next: (response) => {
        console.log(response)
        this.BrandsData = response.data;
      }
    })
  }

}
