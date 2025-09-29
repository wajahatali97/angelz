import React from "react";
import ActCard from "./ActCard";

export default function CompletedActs() {
  const completed = [
    {
      id: 1,
      title: "Friendly Visits & Companionship",
      desc: "Spend time talking, listening, or playing board games/cards.",
      date: "10-02-2022",
      time: "02:00 pm to 04:00 pm",
      points: 50,
    },
    {
      id: 2,
      title: "Reading Aloud",
      desc: "Read newspapers, books, or letters to residents with vision issues.",
      date: "11-02-2022",
      time: "03:00 pm to 05:00 pm",
      points: 40,
    },
    {
      id: 3,
      title: "Meal Preparation",
      desc: "Assist in preparing and serving nutritious meals.",
      date: "12-02-2022",
      time: "01:00 pm to 03:00 pm",
      points: 60,
    },
    {
      id: 4,
      title: "Gardening Help",
      desc: "Support in maintaining the community garden.",
      date: "13-02-2022",
      time: "09:00 am to 11:00 am",
      points: 45,
    },
    {
      id: 5,
      title: "Technology Support",
      desc: "Help seniors with mobile phones, tablets, and computers.",
      date: "14-02-2022",
      time: "11:00 am to 01:00 pm",
      points: 55,
    },
    {
      id: 6,
      title: "Library Assistance",
      desc: "Organize books, read stories, and assist in library duties.",
      date: "15-02-2022",
      time: "02:00 pm to 04:00 pm",
      points: 35,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {completed.map((item) => (
        <ActCard key={item.id} {...item} type="completed" />
      ))}
    </div>
  );
}
