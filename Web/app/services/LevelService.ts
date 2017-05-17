import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class LevelService {
    level: number;
    private levelChange = new Subject<any>();
    levelChange$ = this.levelChange.asObservable();

    constructor() {
        this.level = 4;
    }
    getLevel(): number {
        return this.level;
    }
    setLevel(level: number) {
        this.level = level;
        this.levelChange.next(this.level);
    }

}

// 1 is GSU 2 is SSOR ************************