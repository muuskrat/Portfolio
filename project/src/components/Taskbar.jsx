import { useEffect, useState } from "react";
import TaskbarImageSwitcher from "./TaskbarImageSwitcher";

export default function Taskbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeString = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dateString = time.toLocaleDateString();

  return (
    <div className="taskbar">
      <div className="taskbar-left">
        <TaskbarImageSwitcher />
      </div>
      <div className="taskbar-right">
        <div className="time-date">
          {timeString}
          <br />
          {dateString}
        </div>
      </div>
    </div>
  );
}
