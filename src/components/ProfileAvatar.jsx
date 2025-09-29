export default function ProfileAvatar({ user }) {
  return (
    <div className="flex items-center gap-5">
      <img
        src={user.avatar || "https://randomuser.me/api/portraits/lego/1.jpg"}
        alt="profile"
        className="w-20 h-20 rounded-full object-cover border-2 border-orange-400 shadow-md"
      />
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          {user.name || "Guest User"}
        </h2>
        <p className="text-sm text-gray-500">
          @{user.username || user.email?.split("@")[0]}
        </p>
        <p className="mt-1 text-sm font-medium text-gray-700">
          {user.points || 0} Points Earned
        </p>
      </div>
    </div>
  );
}
