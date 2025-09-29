import React from "react";
import { useParams } from "react-router-dom";

export default function ActDetailPage() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Act Detail Page</h1>
      <p>Yeh page Act ID: {id} ke liye hai.</p>
    </div>
  );
}
