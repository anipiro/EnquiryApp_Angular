import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { Master } from '../../../service/master';
import { Enquiry, EnquiryStatus, EnquiryType } from '../../models/enquiry.model';

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

  newEnquiryObj: Enquiry = {
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

  typeList$: Observable<EnquiryType[]> = this.masterSvr.getEnquiryTypes();
  statusList$: Observable<EnquiryStatus[]> = this.masterSvr.getStatus();

  handleSubmit(form: NgForm) {
    this.lastMessage = 'Submitting...';

    const payload: Enquiry = {
      ...this.newEnquiryObj,
      createdDate: undefined,
    };

    this.masterSvr.createEnquiry(payload).subscribe({
      next: () => {
        this.lastMessage = '✅ Saved successfully!';
        this.resetForm(form);
      },
      error: (err: unknown) => {
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
