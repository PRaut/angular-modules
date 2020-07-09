import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

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
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
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

  forbiddenNameValidator(control: FormControl): {[s:string]: boolean}{
    if(this.forbiddenName.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true};
    }
    return null;
  }
}
