import { inngest } from "@/lib/inngest/client";
import { checkBudgetAlert } from "@/lib/inngest/functions";
import { serve } from "inngest/next";


export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    checkBudgetAlert, // <-- This is where you'll always add all your functions
  ],
});