
import {DateService} from "../../../services/date.service";
import {LevelService} from "../../../services/level.service";
import {Component, OnInit} from "@angular/core";

declare var moment: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  today: string;
  todayDate: Date;
  level: number;

  constructor(
    private dateService: DateService,
    private levelService: LevelService) {
  }

  ngOnInit() {

    this.level = this.levelService.getLevel();

    let _subscription = this.levelService.levelChange$.subscribe((value) => {
      this.level = value;

    });

      let _subscriptionDate = this.dateService.dateChange$.subscribe((value) => {
          this.todayDate = value;
          this.today = moment(this.todayDate).startOf('isoweek').format('dddd MMMM Do YYYY');

      });

    this.todayDate = this.dateService.getDate();
    this.today = moment(this.todayDate).startOf('isoweek').format('dddd MMMM Do YYYY');
    this.dateService.setDate(this.todayDate);

  }

  //gets the previous monday formats 'Monday January 2nd 2017' style
  private backWeek() {

    this.todayDate.setDate(this.todayDate.getDate() - 7);
    this.today = moment(this.todayDate).startOf('isoweek').format('dddd MMMM Do YYYY');
    this.dateService.setDate(this.todayDate);

  }
  //gets the next monday
  private forwardWeek() {

    this.todayDate.setDate(this.todayDate.getDate() + 7);
    this.today = moment(this.todayDate).startOf('isoweek').format('dddd MMMM Do YYYY');
    this.dateService.setDate(this.todayDate);

  }

  private changeLevel(level: number) {

    this.levelService.setLevel(level);

  }

}
