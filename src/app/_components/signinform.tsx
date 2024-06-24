"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "~/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

interface MojangApiResponse {
  name: string;
  id: string;
}

interface MojangApiErrorResponse {
  error: string;
  errorMessage: string;
}

interface CheckUserResponse {
  exists: boolean;
}

const fetchUUID = async (username: string): Promise<string> => {
  const response = await fetch(`/api/proxy/mojang?username=${username}`, {
    method: "GET",
  });

  if (response.status === 200) {
    const data: MojangApiResponse =
      (await response.json()) as MojangApiResponse;
    return data.id;
  } else if (response.status === 204) {
    throw new Error("Username does not exist in Mojang database.");
  } else {
    const errorData = (await response.json()) as MojangApiErrorResponse;
    throw new Error(errorData.errorMessage);
  }
};

const checkUserExists = async (uuid: string): Promise<boolean> => {
  const response = await fetch(`/api/check-user?uuid=${uuid}`);
  if (response.status === 200) {
    const data: CheckUserResponse =
      (await response.json()) as CheckUserResponse;
    return data.exists;
  } else {
    const errorData = (await response.json()) as { error: string };
    throw new Error(errorData.error);
  }
};

const SignInSchema = z.object({
  identifier: z
    .string()
    .trim()
    .refine(
      (val) =>
        /^[a-zA-Z0-9_]{3,16}$/.test(val) ||
        val.length === 32 ||
        (val.length === 36 && val.split("-").length === 5),
      {
        message:
          "Must be a username (3-16 characters) or UUID (32 or 36 characters).",
      },
    )
    .superRefine(async (val, ctx) => {
      if (/^[a-zA-Z0-9_]{3,16}$/.test(val)) {
        try {
          // Fetch UUID from Mojang
          val = await fetchUUID(val);
        } catch (error) {
          if (error instanceof Error) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: error.message,
              fatal: true,
            });
            return z.NEVER;
          } else {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "An unknown error occurred.",
              fatal: true,
            });
            return z.NEVER;
          }
        }
      } else if (val.length === 36) {
        val = val.replace(/-/g, "");
      }

      if (val.length === 32) {
        try {
          const userExists = await checkUserExists(val);
          if (!userExists) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "UUID does not exist in the database.",
              fatal: true,
            });
            return z.NEVER;
          }
        } catch (error) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Error checking user in the database.",
            fatal: true,
          });
          return z.NEVER;
        }
      }
    }),
});

export function SignInForm() {
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      identifier: "",
    },
  });

  async function onSubmit(data: z.infer<typeof SignInSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username or UUID</FormLabel>
              <FormControl>
                <Input
                  placeholder="Minecraft Name Or UUID"
                  className="bg-gray-800"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" className="px-3">
          Submit
        </Button>
      </form>
    </Form>
  );
}
