import { Injectable } from '@angular/core';

import { surgeons, services } from '../../data-models'

@Injectable()
export class DataService {

  surgeonData: String[];
  serviceData: String[];

  constructor() {
    this.surgeonData = surgeons;
    this.serviceData = services;
  }

  getSurgeons(): String[] {
    return this.surgeonData;
  }

  getServices(): String[] {
    return this.serviceData;
  }

}
