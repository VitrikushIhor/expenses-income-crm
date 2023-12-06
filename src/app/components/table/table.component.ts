import {Component, OnInit} from '@angular/core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {TransactionService} from '../../services/transaction-service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
removeIcon = faTrash
  currentPage=1

  constructor(
    public transactionService: TransactionService
  ) {
  }

  ngOnInit(): void {
  this.transactionService.findAll()
  }

  delete(id: number) {
    this.transactionService.delete(id)
  }
}
