import { Component, OnInit } from '@angular/core';
import { ApidataService } from '../service/apidata.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brands-details',
  templateUrl: './brands-details.component.html',
  styleUrls: ['./brands-details.component.scss']
})
export class BrandsDetailsComponent implements OnInit {
  constructor(
    private _ApidataService: ApidataService,
    private _ActivatedRoute: ActivatedRoute
  ) { }


  brandsId: string | null = '';
  brandsData: any = {};



  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.brandsId = params.get('id');
        console.log(this.brandsId)
      }
    })

    this._ApidataService.getSpecificBrands(this.brandsId).subscribe({
      next: (response) => {
        // console.log(response)
        this.brandsData = response.data;
        console.log(this.brandsData)
      }
    })


  }



}
