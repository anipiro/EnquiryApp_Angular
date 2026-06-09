import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Master } from '../../../service/master';
import { Enquiry } from '../../models/enquiry.model';

@Component({
  selector: 'app-enquiry-list',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './enquiry-list.html',
  styleUrl: './enquiry-list.css',
})
export class EnquiryList implements OnInit {
  private masterSvr = inject(Master);

  enquiries: Enquiry[] = [];
  selectedEnquiryId: number | null = null;
  selectedStatusId = 0;
  selectedResolution = '';
  message = '';

  ngOnInit(): void {
    this.loadEnquiries();
  }

  loadEnquiries(): void {
    this.masterSvr.getEnquiries().subscribe({
      next: (data: Enquiry[]) => {
        this.enquiries = data;
      },
      error: () => {
        this.message = 'Failed to load enquiries.';
      },
    });
  }

  startEdit(item: Enquiry): void {
    this.selectedEnquiryId = item.enquiryId;
    this.selectedStatusId = item.enquiryStatusId;
    this.selectedResolution = item.resolution ?? '';
    this.message = '';
  }

  cancelEdit(): void {
    this.selectedEnquiryId = null;
    this.selectedStatusId = 0;
    this.selectedResolution = '';
  }

  saveEdit(item: Enquiry): void {
    const payload: Enquiry = {
      ...item,
      enquiryStatusId: this.selectedStatusId,
      resolution: this.selectedResolution,
    };

    this.masterSvr.updateEnquiry(item.enquiryId, payload).subscribe({
      next: () => {
        this.message = 'Enquiry updated successfully.';
        this.cancelEdit();
        this.loadEnquiries();
      },
      error: () => {
        this.message = 'Failed to update enquiry.';
      },
    });
  }

  deleteEnquiry(item: Enquiry): void {
    this.masterSvr.deleteEnquiry(item.enquiryId).subscribe({
      next: () => {
        this.message = 'Enquiry deleted successfully.';
        this.loadEnquiries();
      },
      error: () => {
        this.message = 'Failed to delete enquiry.';
      },
    });
  }
}
