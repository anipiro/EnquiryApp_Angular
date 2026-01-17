import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Master {
  private baseUrl = 'https://localhost:7116/api/EnquiryMaster';

  constructor(private http: HttpClient) {}

  getStatus() {
    return this.http.get<any[]>(`${this.baseUrl}/GetAllStatus`);
  }

  getEnquiryTypes() {
    return this.http.get<any[]>(`${this.baseUrl}/GetAllTypes`);
  }

  createEnquiry(obj: any) {
    return this.http.post(`${this.baseUrl}/CreateEnquiry`, obj);
  }
}
