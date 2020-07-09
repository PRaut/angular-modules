import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];
  forbiddenName = ['James', 'Anna'];
  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNameValidator.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailsValidator)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // below code checks the Value changes
    this.signupForm.valueChanges.subscribe( (value) => {
      console.log(value);
    });

  }

  // getControls(){
  //   return (<FormArray>this.signupForm.get('hobbies')).controls;
  // }
  
  get controls(){
    return (<FormArray>this.signupForm.get('hobbies')).controls;  
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  // Validator for username
  forbiddenNameValidator(control: FormControl): {[s:string]: boolean}{
    if(this.forbiddenName.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true};
    }
    return null;
  }

  // Async Validator to validate Future data
  forbiddenEmailsValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(()=>{
        if(control.value == 'test@test.com'){
          resolve({'emailIsForbidden': true});
        }else{
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
