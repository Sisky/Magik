import {DateService} from "./date.service";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class LevelService {

  level: number;
  private levelChange = new Subject<any>();
  levelChange$ = this.levelChange.asObservable();

  constructor(private dateService: DateService) {
    this.level = 4;
  }

  getLevel(): number {
    return this.level;
  }

  setLevel(level: number) {
    this.level = level;
    this.levelChange.next(this.level);
    // this.dateService.setDate(new Date());
  }

}
