import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { Master } from '../../../service/master';

@Component({
  selector: 'app-new-enquiry',
  standalone: true,
  imports: [FormsModule, AsyncPipe, NgIf, NgFor],
  templateUrl: './new-enquiry.html',
  styleUrl: './new-enquiry.css',
})
export class NewEnquiry {
  private masterSvr = inject(Master);

  lastMessage = '';

  // ✅ Keep createdDate locally if you want, but we won't send it to API
  newEnquiryObj = {
    enquiryId: 0,
    enquiryTypeId: 0,
    enquiryStatusId: 0,
    customerName: '',
    mobileNo: '',
    email: '',
    message: '',
    createdDate: new Date(),
    resolution: '',
  };

  typeList$: Observable<any[]> = this.masterSvr.getEnquiryTypes();
  statusList$: Observable<any[]> = this.masterSvr.getStatus();

  handleSubmit(form: NgForm) {
    this.lastMessage = 'Submitting...';

    // ✅ Clone then remove createdDate so SQL doesn't crash
    const payload: any = { ...this.newEnquiryObj };
    delete payload.createdDate;

    console.log('Payload sent to API:', payload);

    this.masterSvr.createEnquiry(payload).subscribe({
      next: () => {
        this.lastMessage = '✅ Saved successfully!';
        this.resetForm(form);
      },
      error: (err) => {
        console.error('API Error:', err);
        this.lastMessage = '❌ Failed to save. Check console.';
      },
    });
  }

  resetForm(form: NgForm) {
    form.resetForm();

    this.newEnquiryObj = {
      enquiryId: 0,
      enquiryTypeId: 0,
      enquiryStatusId: 0,
      customerName: '',
      mobileNo: '',
      email: '',
      message: '',
      createdDate: new Date(),
      resolution: '',
    };
  }
}
