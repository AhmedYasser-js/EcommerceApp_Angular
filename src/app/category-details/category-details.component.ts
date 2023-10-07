import { Component, OnInit } from '@angular/core';
import { ApidataService } from '../service/apidata.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  categoryId: string | null = '';
  categoryData: any = {};
  supCategoryData: any = {};

  constructor(
    private _ApidataService: ApidataService,
    private _ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoryId = params.get('id');
        console.log(this.categoryId)
      }
    })

    this._ApidataService.getCategoriesDetails(this.categoryId).subscribe({
      next: (response) => {
        console.log(response)
        this.categoryData = response.data;
      }
    })

    this._ApidataService.getAllSupCategories(this.categoryId).subscribe({
      next: (response) => {
        console.log(response)
        this.supCategoryData = response.data;
        console.log(this.supCategoryData)
      }
    })


  }

}
