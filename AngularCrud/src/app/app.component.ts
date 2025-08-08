import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/services/data.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  courseList: any;
 selectedGender: string = '';
  data: any;
  tablesData: any;
  selectedTrainee: any;
  data_id: any;
  id: any;
traineeId: any;
  delete_id: any;
onSubmitHidden=false;
onUpdateHidden=true;
  constructor( private apiService: DataService,private datepipe:DatePipe){}

  studentForm = new FormGroup({
    full_name: new FormControl('', [Validators.required, ]),
    mobile_number: new FormControl('', [Validators.required,Validators.pattern('^[6-9]\\d{9}$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    course: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    

  });

  ngOnInit(){
 
    this.getTable();
  }



  getTable(){
    this.apiService.getData('student').subscribe(response=>{
      console.log('table',response);
      this.tablesData=response
    })
  }


  onSubmit() {
  
    console.log(this.studentForm.value);


  if (this.studentForm.invalid) {
    // alert("Please fill out the form correctly.");
     Swal.fire({
              icon: "error",
              text: "Please fill out the form correctly.", 
              timer: 5000
            });
    return;
  }
    this.apiService.postData('student', this.studentForm.value).subscribe((res: any) => {
      this.data = res;
      if (this.data)
        alert("Data saved succesfully..")
    });
   
    this.onClear();
   this.getTable();
  }

onClear(){
  this.visibleButton();
  this.studentForm.reset();
}


onEdit(id: any) { 
    this.hideButton();
  // Find the selected trainee data
  this.selectedTrainee = this.tablesData.find((t: any) => t.id === parseInt(id)); 
  this.getTable();
  console.log("Editing Trainee:", this.selectedTrainee);

  if (this.selectedTrainee) {
    this.id = id;

    // Patch form values
    this.studentForm.patchValue({
      // id: this.selectedTrainee.data_id,
      full_name: this.selectedTrainee.full_name,
      mobile_number: this.selectedTrainee.mobile_number, // Might need formatting if coming as timestamp
      email: this.selectedTrainee.email,
      gender: this.selectedTrainee.gender,
      course: this.selectedTrainee.course,
    });
  }
}

onUpdate() {

  // Ensure date is in correct format


  // Send PUT request to update trainee
  this.apiService.putData('student/' + this.id, this.studentForm.value).subscribe((res: any) => {
    this.data = res;
    if (this.data) {
      alert("Data updated successfully!");
    }

    // Refresh table and reset form
    this.getTable();
    this.onClear();
    this.visibleButton();
  });

}

async onDelete(id:any){
     const confirmed =  await Swal.fire({
    title: 'Are you sure?',
    text: "Are you sure you want to delete this data?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  });
  if (!confirmed.isConfirmed) return;
    
      this.apiService.deleteData('student/' + id).subscribe({
        next: (res) => {
          console.log('Delete response:', res);
         // alert("Data deleted successfully.");
                Swal.fire({
                  icon: "success",
                  text: "Data Delete successfully.", 
                  timer: 2000
                });
          this.getTable();
          // this.dialogRef?.close('deleted'); // Close dialog and signal parent to refresh
        },
        error: (err) => {
          console.error("Delete failed", err);
        //  alert("Failed to delete Data.");
                Swal.fire({
                  icon: "error",
                  text: "Failed to delete Data.", 
                  timer: 2000
                });
        }
        
      });
      // this.getTable();
    
    this.onClear();
}
  isHidden = false;

  hideButton() {
    this.onSubmitHidden = true;
    this.onUpdateHidden = false;
  }

    visibleButton() {
    this.onSubmitHidden = false;
    this.onUpdateHidden = true;
  }
}




