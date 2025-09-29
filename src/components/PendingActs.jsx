import React from "react";
import ActCard from "./ActCard";

export default function PendingActs() {
  const pending = [
    {
      id: 1,
      title: "Light Exercise Sessions",
      desc: "Lead or assist in gentle stretches, walking, or chair yoga.",
      date: "12-02-2022",
      time: "12:00 pm to 10:00 pm",
    },
    {
      id: 2,
      title: "Meal Assistance",
      desc: "Serve meals or help residents during dining.",
      date: "12-02-2022",
      time: "12:00 pm to 10:00 pm",
    },
    {
      id: 3,
      title: "Event Planning",
      desc: "Organise birthday celebrations, movie nights, or cultural events.",
      date: "12-02-2022",
      time: "12:00 pm to 10:00 pm",
    },
    {
      id: 4,
      title: "Skill Sharing",
      desc: "Teach simple crafts, basic computer skills, or storytelling.",
      date: "12-02-2022",
      time: "12:00 pm to 10:00 pm",
    },
    {
      id: 5,
      title: "Regular Check-In Calls",
      desc: "Weekly phone or video calls for conversation.",
      date: "12-02-2022",
      time: "12:00 pm to 10:00 pm",
    },
    {
      id: 6,
      title: "Errand Assistance",
      desc: "Help with grocery shopping, pharmacy visits, or mail.",
      date: "12-02-2022",
      time: "12:00 pm to 10:00 pm",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {pending.map((item) => (
        <ActCard
          key={item.id}
          {...item}
          type="pending"
          buttonText="Opt-out"
        />
      ))}
    </div>
  );
}
