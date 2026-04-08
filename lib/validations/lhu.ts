import { z } from "zod";

export const lhuDraftSchema = z.object({
  customer: z.string().min(3),
  projectName: z.string().min(3),
  projectAddress: z.string().min(3),
  referenceNumber: z.string().min(3),
  concreteType: z.enum(["silinder", "kubus"]),
  receivedDate: z.string().min(1),
  testingDate: z.string().min(1),
  notes: z.string().optional(),
});
