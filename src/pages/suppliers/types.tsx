export interface ISupplierType {
  id: string;
  createdAt: string;
  name: string;
  logo: string;
  contact: Contact;
  serviceType: string;
  description: string;
  documentNumber: string;
  services: Service[];
  address: Address;
  rate: number;
  enabled: boolean;
  updatedAt: string;
}

export interface Contact {
  name: string;
  email: string;
  phone: string;
  cellphone: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  image?: string;
}

export interface Address {
  street: string;
  number: number;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  zipCode: number;
}