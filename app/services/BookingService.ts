import {Injectable} from '@angular/core';

export class Booking {
    constructor(
        public date: Date,
        public level: number,
        public room: number,
        public am_dept: string,
        public pm_dept: string,
        public am_surg: string,
        public pm_surg: string) {
    }
}

// return a Booking object that matches date, room and level
@Injectable()
export class BookingService {
    getRoomBooking(date: Date, level: number, room: number): Booking[] {
        return bookings
            .filter(b => b.level === level && b.room === room && new Date(b.date) === date)
            .map(b => new Booking(new Date(b.date), b.level, b.room, b.am_dept, b.pm_dept, b.am_surg, b.pm_surg));
    }
    getDayBooking(date: Date, level: number): Booking[] {
        return bookings
            .filter(b => b.level === level && new Date(b.date).toDateString() === date.toDateString())
            .map(b => new Booking(new Date(b.date), b.level, b.room, b.am_dept, b.pm_dept, b.am_surg, b.pm_surg));
    }
    getLevelBooking(level: number): Booking[] {
        return bookings
            .filter(b => b.level === level)
            .map(b => new Booking(new Date(b.date), b.level, b.room, b.am_dept, b.pm_dept, b.am_surg, b.pm_surg));
    }
}

var bookings = [
    {
        "date": "03-27-2017",
        "level": 9,
        "room": 6,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-27-2017",
        "level": 9,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-27-2017",
        "level": 9,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-28-2017",
        "level": 9,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-28-2017",
        "level": 9,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-29-2017",
        "level": 9,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-29-2017",
        "level": 9,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-30-2017",
        "level": 9,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-30-2017",
        "level": 9,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-31-2017",
        "level": 9,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-31-2017",
        "level": 9,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-01-2017",
        "level": 9,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-01-2017",
        "level": 9,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-02-2017",
        "level": 9,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-02-2017",
        "level": 9,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-03-2017",
        "level": 9,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-03-2017",
        "level": 9,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-04-2017",
        "level": 9,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-04-2017",
        "level": 9,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-05-2017",
        "level": 9,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-05-2017",
        "level": 9,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-06-2017",
        "level": 9,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-06-2017",
        "level": 9,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-07-2017",
        "level": 9,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-07-2017",
        "level": 9,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-08-2017",
        "level": 9,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-08-2017",
        "level": 9,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-09-2017",
        "level": 9,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-09-2017",
        "level": 9,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-10-2017",
        "level": 9,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-10-2017",
        "level": 9,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-20-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-20-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-21-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-21-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-22-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-22-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-23-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-23-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-24-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-24-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-27-2017",
        "level": 1,
        "room": 6,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-27-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-27-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-28-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-28-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-29-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-29-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-30-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-30-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-31-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-31-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-01-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-01-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-02-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-02-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-03-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-03-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-04-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-04-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-05-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-05-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-06-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-06-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-07-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-07-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-08-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-08-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-09-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-09-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-10-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-10-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-20-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-20-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-21-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-21-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-22-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-22-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-23-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-23-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-24-2017",
        "level": 1,
        "room": 1,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "03-24-2017",
        "level": 1,
        "room": 2,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-03-2017",
        "level": 1,
        "room": 3,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-03-2017",
        "level": 1,
        "room": 4,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-03-2017",
        "level": 1,
        "room": 5,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-04-2017",
        "level": 1,
        "room": 3,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-04-2017",
        "level": 1,
        "room": 4,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-04-2017",
        "level": 1,
        "room": 5,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },
    {
        "date": "04-05-2017",
        "level": 1,
        "room": 3,
        "am_dept": "General",
        "pm_dept": "General",
        "am_surg": "Dr. Ben Smith",
        "pm_surg": "Dr. Ben Smith"
    },

];
