import React, { useState } from "react";
import dayjs from "dayjs";

const CalendarWeek = () => {
  const today = dayjs();
  const startOfWeek = today.startOf("week").add(1, "day");
  const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const days = Array.from({ length: 7 }, (_, i) => {
    const date = startOfWeek.add(i, "day");
    return {
      day: weekDays[date.day()],
      date: date.format("DD/MM"),
      isActive: date.isSame(today, "day"),
    };
  });

  const [selectedDate, setSelectedDate] = useState(
    days.find((d) => d.isActive)?.date || days[0].date
  );

  return (
    <div className="calendar-week">
      {days.map((d, index) => (
        <div
          key={index}
          className={`day ${selectedDate === d.date ? "active" : ""}`}
          onClick={() => setSelectedDate(d.date)}
        >
          <div className="day-title">{d.day}</div>
          <div>{d.date}</div>
        </div>
      ))}
    </div>
  );
};

export default CalendarWeek;
