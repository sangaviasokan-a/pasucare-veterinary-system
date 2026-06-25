import { z } from "zod";

export const appointmentSchema = z.object({
  fullName: z.string().min(2),

  phone: z.string().min(10, "Phone number is required"),

  serviceId: z.string(),

  startTime: z.string(),

  notes: z.string().optional(),
});

export type AppointmentInput =
  z.infer<typeof appointmentSchema>;