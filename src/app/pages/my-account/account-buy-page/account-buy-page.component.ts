import { SaleApiService } from './../../../commons/services/api/sale/sale-api.service';
import { IResponseSaleById } from './../../../commons/services/api/sale/sale-api-model.interface';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-account-buy-page',
	templateUrl: './account-buy-page.component.html',
	styleUrls: ['./account-buy-page.component.scss']
})
export class AccountBuyPageComponent implements OnInit{

  imgTicket = '../../../../assets/images/card-menus/buys.png'

  dataSource = new MatTableDataSource<IResponseSaleById>();

  displayedColumns: string[] = [
		'id',
		'title',
    'quantity',
    'totalSale',
    'saleDate',
    'dateEvent',
    'quantity',
    'imgTicket'
	];

	constructor(private _saleService: SaleApiService) {
    console.log('Constructor my sales');
  }

  ngOnInit(): void {
    console.log('Init my sales');
    this._loadUserSales();
  }

	_loadUserSales(): void {
    this._saleService.getSaleByUser().subscribe({
      next: (response) =>{
        if(response != null){
          this.dataSource.data = response.result;
        }
      },
      error: () => {
        console.log('No trajo nada :V');
      }
    });
  }

	applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
}
