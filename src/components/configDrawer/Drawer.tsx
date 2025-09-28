"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import API from "@/lib/api";
import { toast } from "sonner";
import { useState } from "react";

export function ConfigDrawer() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      projectKey: "",
    },
  });

  // const blocker = () => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(true);
  //     }, 2000);
  //   });
  // };

  const onSubmit = async (values: Record<string, string>) => {
    setIsLoading(true);

    // Show loading toast
    const loadingToast = toast.loading("Processing your request...", {
      description: "Setting up your project configuration",
    });

    try {
      await API.post("/notify", {
        projectKey: values.projectKey,
      });

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success("Configuration Saved! 🎉", {
        description: `Project "${values.projectKey}" has been configured successfully.`,
        duration: 5000,
        action: {
          label: "View Details",
          onClick: () => console.log("View details clicked"),
        },
      });

      // Reset form after successful submission
      form.reset();
    } catch (err) {
      // Dismiss loading toast and show error
      toast.dismiss(loadingToast);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      toast.error("Configuration Failed", {
        description: errorMessage,
        duration: 6000,
        action: {
          label: "Retry",
          onClick: () => onSubmit(values),
        },
      });
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="mt-5 cursor-pointer">Start Generation</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-gray-800 border-t-4 border-t-red-400">
        <div className="mx-auto w-full max-w-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DrawerHeader>
                <DrawerTitle className="text-white">
                  Configuration Form
                </DrawerTitle>
                <DrawerDescription className="text-gray-400">
                  Set your user
                </DrawerDescription>
              </DrawerHeader>

              <FormField
                control={form.control}
                name="projectKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name} className="text-white">
                      Project Key
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your-project-key"
                        className="text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-400">
                      This is the ID of your Jira space.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <DrawerFooter className="pl-0 pr-0">
                <Button type="submit" disabled={isLoading} className="relative">
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Start Generation"
                  )}
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" disabled={isLoading}>
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
