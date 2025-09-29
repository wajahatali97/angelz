export default function ProfileBadge({ rank }) {
  const rankMap = {
    "Bronze Angel": { img: "/bronze.png", label: "Bronze Angel" },
    "Silver Angel": { img: "/silver.png", label: "Silver Angel" },
    "Gold Angel": { img: "/gold.png", label: "Gold Angel" },
  };

  const currentRank = rankMap[rank] || rankMap["Bronze Angel"];

  return (
    <div className="flex items-center gap-2">
      <img src={currentRank.img} alt={currentRank.label} className="w-6 h-6" />
      <span className="text-sm font-semibold text-black">
        {currentRank.label}
      </span>
    </div>
  );
}
