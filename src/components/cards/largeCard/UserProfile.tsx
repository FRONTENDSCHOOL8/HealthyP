import { UsersResponse } from "@/types/pocketbase-types";
import getPbImage from "@/util/data/getPBImage";

interface profileProps {
  profile?: UsersResponse;
  profileImg?: string;
}

export default function UserProfile({ profile }: profileProps) {
  if (profile === undefined) return;
  const url = getPbImage('_pb_users_auth_', profile.id, profile.avatar);

  return (
    <>
      <img src={url} alt="" className="size-30pxr bg-gray_400 rounded-[30px]" />
      <p className="ml-4pxr mr-auto text-sub-em">{profile.name}</p>
    </>
  );
}