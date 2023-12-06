import {Injectable, signal} from '@angular/core';
import {ITransaction} from '../types/transaction-interface';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {ITransactionData} from './transactions-interface';
import {tap} from 'rxjs/operators';
import {CategoryService} from './category-service';

@Injectable({providedIn:"root"})
export class TransactionService{
transactionSig= signal<ITransaction[]>([])

  constructor(private http:HttpClient,
              private toastr : ToastrService,
              private categoryService:CategoryService
  ) {
  }


  findAll(){
  return this.http.get<ITransaction[]>("transaction")
    .subscribe((res)=>this.transactionSig.set(res))
  }

  create(data:ITransactionData){
    return this.http.post<ITransaction>("transaction", data)
      .pipe(
        tap((newTransaction)=>{
          const category = this.categoryService.categoriesSig()
            .find(ctg =>
            ctg.id === newTransaction.category?.id)

          this.transactionSig.update(transactions=>[
            {...newTransaction,category:category || null},
            ...transactions
          ])
        })
      )
      .subscribe(()=>{
        this.toastr.success("Transaction created")
      })
  }

  delete(id:number){
  this.http.delete(`transaction/transaction/${id}`)
    .subscribe(()=>{
      this.transactionSig.update((transactions)=>
      transactions.filter(transaction=>transaction.id !== id))
      this.toastr.error("Transaction deleted")
    })
  }
}
