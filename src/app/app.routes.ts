import { Routes } from '@angular/router';
import { EnquiryList } from './Pages/enquiry-list/enquiry-list';
import { NewEnquiry } from './Pages/new-enquiry/new-enquiry';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: EnquiryList },
  { path: 'createNew', component: NewEnquiry },
];
