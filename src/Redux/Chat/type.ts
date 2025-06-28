export interface Room {
  id: string;
  name: string;
  avatar: string;
  time: string;
  lastMessage: string;
}

export interface RoomDetail {
  id: string;
  name: string;
  participants: string[];
  createdAt: string;
}
