import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Enquiry, EnquiryStatus, EnquiryType } from '../app/models/enquiry.model';

@Injectable({
  providedIn: 'root',
})
export class Master {
  private baseUrl = 'https://localhost:7116/api/enquiries';

  constructor(private http: HttpClient) {}

  getStatus() {
    return this.http.get<EnquiryStatus[]>(`${this.baseUrl}/statuses`);
  }

  getEnquiryTypes() {
    return this.http.get<EnquiryType[]>(`${this.baseUrl}/types`);
  }

  getEnquiries() {
    return this.http.get<Enquiry[]>(this.baseUrl);
  }

  createEnquiry(obj: Enquiry) {
    return this.http.post<Enquiry>(this.baseUrl, obj);
  }

  updateEnquiry(id: number, obj: Enquiry) {
    return this.http.put<Enquiry>(`${this.baseUrl}/${id}`, obj);
  }

  deleteEnquiry(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
