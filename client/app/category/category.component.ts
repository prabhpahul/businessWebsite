import { Component, OnInit , ElementRef, Input} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ToastComponent } from '../shared/toast/toast.component';
import "rxjs/add/operator/do";
//import the map function to be used with the http library
import "rxjs/add/operator/map";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})


export class CategoryComponent implements OnInit {
  path : String ;
  categoryForm: FormGroup;
  category = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);

  description = new FormControl('',[

   	Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')

  ])

  image = new FormControl('',[]);

  constructor(
              private formBuilder: FormBuilder,
              private router: Router,
              private http: HttpClient,
              private categoryS: CategoryService,
              private el: ElementRef,
              private toast:ToastComponent
              ) { 
				
              }

  ngOnInit() {
     this.categoryForm = this.formBuilder.group({
      category: this.category,
      description: this.description,
      image:this.image
     
    });
   }

 setClassUsername() {
    return { 'has-danger': !this.category.pristine && !this.category.valid };
  }

  setClassDescription() {
    return { 'has-danger': !this.description.pristine && !this.description.valid };
  }

  upload():any {
    //locate the file element meant for the file upload.
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
        console.log(inputEl);
    //get the total amount of files attached to the file input.
        let fileCount: number = inputEl.files.length;
        console.log(fileCount);
    //create a new fromdata instance
        let formData = new FormData();
    //check if the filecount is greater than zero, to be sure a file was selected.
        if (fileCount > 0) { // a file was selected
            //append the key name 'photo' with the first file in the element
            console.log(inputEl.files.item(0));
                formData.append('photo', inputEl.files.item(0));
            //call the angular http method

            //console.log('inside',formData);
            
            this.http.post<any>('/api/category', formData).map((res:Response) => {console.log(res);
            	console.log(res.path)
            	this.path = res.path;
            })
		.subscribe(
                //map the success function and alert the response
                 (success) => {
                        console.log(this.categoryForm);
                        this.categoryForm.value.image = this.path;
                 		console.log(this.path);
                 		console.log(this.categoryForm.value)	
                         alert("success");
                },
                (error) => alert(error))
          }
          
       }

       addCategory(){

       	console.log('inside categoryAdd');		
       		this.categoryS.addCat(this.categoryForm.value).subscribe(
      res => {
        this.toast.setMessage('you successfully registered!', 'success');
        this.router.navigate(['/login']);
      },
      error => this.toast.setMessage('email already exists', 'danger')
    );
  }		

       }
       


