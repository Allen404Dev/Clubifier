export type MemberBase = {
  firstname: string;
  lastname: string;
  birthdate: number;
  email: string;
  phone: string;
};

export type Member = MemberBase & {
  id: number;
  created_at: string;
  activ: true;
  payedMemberShip: true;
};
