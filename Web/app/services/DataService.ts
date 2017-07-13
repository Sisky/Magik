import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import { surgeons, services } from 'app/data-models.ts'

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

