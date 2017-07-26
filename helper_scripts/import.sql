
DELETE FROM booking_booking;
INSERT INTO booking_booking(date, level, room, am_dept, pm_dept, am_surg, pm_surg) SELECT * FROM temp_booking;

