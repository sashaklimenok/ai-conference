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

export function ConfigDrawer() {
  const form = useForm({
    defaultValues: {
      projectKey: "",
      email: "",
    },
  });

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="mt-5 cursor-pointer">Report and Generate</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-gray-800 border-t-4 border-t-red-400">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-white">Configuration Form</DrawerTitle>
            <DrawerDescription className="text-gray-400">
              Set your user
            </DrawerDescription>
          </DrawerHeader>
          <Form {...form}>
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
            <div className="h-4" />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name} className="text-white">
                    Email/Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your-email@example.com"
                      className="text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-400">
                    Type your email or full name.
                  </FormDescription>
                </FormItem>
              )}
            />
          </Form>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
