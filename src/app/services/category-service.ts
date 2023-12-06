import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {ICategory} from '../types/category-interface';

@Injectable({providedIn:"root"})
export class CategoryService{
  categoriesSig=signal<ICategory[]>([])

  constructor(private http: HttpClient,
              private toastr:ToastrService) {
  }

  findAll(){
    return this.http.get<ICategory[]>("categories").subscribe((res:ICategory[])=>{
      this.categoriesSig.set(res)
    })
  }
  create(title:string){
    return this.http.post<ICategory>("categories",{title}).subscribe((res)=>{
      this.categoriesSig.update((categories)=>[...categories,res])
      this.toastr.success("Categories created successfully")
    })
  }
  delete(id:number){
    return this.http.delete(`categories/category/${id}`).subscribe((res)=>{
      this.categoriesSig.update((categories)=>
        categories.filter((category)=>category.id !==id)
      )
      this.toastr.success("Categories deleted successfully")
    })
  }
  update(id:number,title:string){
    this.http.patch(`categories/category/${id}`,{title}).subscribe(()=>{
      this.categoriesSig.update((categories)=>
      categories.map(ctg=>
        ctg.id === id ?{...ctg,title}:ctg
      )
      )
      this.toastr.success("Updated categories successfully")
    })
  }
}
