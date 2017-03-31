import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable()
export class LevelService {
    level: number;
    private levelChange = new Subject<any>();
    levelChange$ = this.levelChange.asObservable();

    constructor() {
        this.level = 1;
    }
    getLevel(): number {
        return this.level;
    }
    setLevel(level: number) {
        this.level = level;
        this.levelChange.next(this.level);
    }

}