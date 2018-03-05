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
      // console.log(this.surgeonDataFix);
    return this.surgeonData.sort();
  }

  getServices(): String[] {
    return this.serviceData;
  }

}

export class Name {

    constructor(
        public first: string,
        public last: string,
    ) {
    }
}