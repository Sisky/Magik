import {Component} from '@angular/core';

import {DateService} from "../../../services/DateService";
import {LevelService} from "../../../services/LevelService";

declare var moment: any;

@Component({
    selector: 'header',
    templateUrl:'./app/components/planner/header/header.html',
    styleUrls:[
        './node_modules/bootstrap/dist/css/bootstrap.css',
        './app/components/planner/header/header.css'
    ]
})

export default class HeaderComponent {

    today: string;
    todayDate: Date;
    level: number;

    constructor(private dateService: DateService, private levelService: LevelService) {

    }

    ngOnInit() {

        this.level = this.levelService.getLevel();

        let _subscription = this.levelService.levelChange$.subscribe((value) => {
            this.level = value;
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
