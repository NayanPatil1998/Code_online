import React from "react";
import Avatar, { ConfigProvider } from "react-avatar";

interface ClientAvatarProps {
  username: string;
}

const ClientAvatar: React.FC<ClientAvatarProps> = ({ username }) => {
  return (
      <div
        className="flex 
    flex-col m-2 text-center items-center"
      >
        <Avatar  name={username} size="50" round="14px" />
        <span className="mt-">{username}</span>
      </div>
    
  );
};

export default ClientAvatar;
