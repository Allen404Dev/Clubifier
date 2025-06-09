import { z } from "zod";

export const memberBaseSchema = z.object({
  firstname: z.string().min(1, "Vorname ist erforderlich"),
  lastname: z.string().min(1, "Nachname ist erforderlich"),
  birthdate: z.string().min(1, "Datum ist erforderlich"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  phone: z.string().min(1, "Telefonnummer ist erforderlich"),
});

export type MemberBase = z.infer<typeof memberBaseSchema>;

export type Member = MemberBase & {
  id: number;
  created_at: string;
  activ: true;
  payedMemberShip: true;
};
