export interface Enquiry {
  enquiryId: number;
  enquiryTypeId: number;
  enquiryStatusId: number;
  customerName: string;
  mobileNo: string;
  email: string;
  message: string;
  createdDate?: string | Date;
  resolution: string;
}

export interface EnquiryStatus {
  statusId: number;
  status: string;
}

export interface EnquiryType {
  typeId: number;
  typeName: string;
}
