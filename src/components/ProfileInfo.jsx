import { useEffect, useState } from "react";
import ProfileAvatar from "./ProfileAvatar";
import ProfileBadge from "./ProfileBadge";

export default function ProfileInfo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  if (!user) return null;

  return (
    <section >
      <div className="flex items-center justify-between">
        {/* Left: Avatar + Info */}
        <ProfileAvatar user={user} />

        {/* Right: Badge */}
        <ProfileBadge rank={user.rank} />
      </div>
    </section>
  );
}
