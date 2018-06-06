/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LandService } from './Land.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Land',
	templateUrl: './Land.component.html',
	styleUrls: ['./Land.component.css'],
  providers: [LandService]
})
export class LandComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          addressLand = new FormControl("", Validators.required);
        
  
      
          information = new FormControl("", Validators.required);
        
  
      
          owner = new FormControl("", Validators.required);
        
  
      
          isAvailable = new FormControl("", Validators.required);
        
  


  constructor(private serviceLand:LandService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          addressLand:this.addressLand,
        
    
        
          information:this.information,
        
    
        
          owner:this.owner,
        
    
        
          isAvailable:this.isAvailable
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceLand.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.example.mynetwork.Land",
      
        
          "addressLand":this.addressLand.value,
        
      
        
          "information":this.information.value,
        
      
        
          "owner":this.owner.value,
        
      
        
          "isAvailable":this.isAvailable.value
        
      
    };

    this.myForm.setValue({
      
        
          "addressLand":null,
        
      
        
          "information":null,
        
      
        
          "owner":null,
        
      
        
          "isAvailable":null
        
      
    });

    return this.serviceLand.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "addressLand":null,
        
      
        
          "information":null,
        
      
        
          "owner":null,
        
      
        
          "isAvailable":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.example.mynetwork.Land",
      
        
          
        
    
        
          
            "information":this.information.value,
          
        
    
        
          
            "owner":this.owner.value,
          
        
    
        
          
            "isAvailable":this.isAvailable.value
          
        
    
    };

    return this.serviceLand.updateAsset(form.get("addressLand").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceLand.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceLand.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "addressLand":null,
          
        
          
            "information":null,
          
        
          
            "owner":null,
          
        
          
            "isAvailable":null 
          
        
      };



      
        if(result.addressLand){
          
            formObject.addressLand = result.addressLand;
          
        }else{
          formObject.addressLand = null;
        }
      
        if(result.information){
          
            formObject.information = result.information;
          
        }else{
          formObject.information = null;
        }
      
        if(result.owner){
          
            formObject.owner = result.owner;
          
        }else{
          formObject.owner = null;
        }
      
        if(result.isAvailable){
          
            formObject.isAvailable = result.isAvailable;
          
        }else{
          formObject.isAvailable = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "addressLand":null,
        
      
        
          "information":null,
        
      
        
          "owner":null,
        
      
        
          "isAvailable":null 
        
      
      });
  }

}
