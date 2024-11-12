"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { addRSSFeed } from "@/actions/addRSSFeed";

const addRssFeedFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	url: z.string().url("Invalid URL"),
});

export type AddRssFeedFormData = z.infer<typeof addRssFeedFormSchema>;

export const AddRSSFeed = ({ addRssFeedAction }: { addRssFeedAction: (data: AddRssFeedFormData) => ReturnType<typeof addRSSFeed> }) => {
	const [open, setOpen] = useState(false);
	const { toast } = useToast();

	const form = useForm<AddRssFeedFormData>({
		resolver: zodResolver(addRssFeedFormSchema),
		defaultValues: {
			name: "",
			url: "",
		},
	});

	const onSubmit = async (data: AddRssFeedFormData) => {
		const res = await addRssFeedAction(data);
		switch (res) {
			case "URL already exists":
				toast({
					title: "URL already exists",
					description: `The URL ${data.url} is already in use`,
				});
				break;
			case "Name already exists":
				toast({
					title: "Name already exists",
					description: `The name ${data.name} is already in use`,
				});
				break;
			case "Failed to add RSS Feed":
				toast({
					title: "Failed to add RSS Feed",
					description: `Could not add ${data.name} with URL ${data.url}`,
				});
				break;
			case "Succesfully added":
				toast({
					title: "RSS Feed Added",
					description: `Added ${data.name} with URL ${data.url}`,
				});
				form.reset();
				setOpen(false);
				break;
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Add RSS Feed</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
						<DialogTitle>Add RSS Feed</DialogTitle>
						<DialogDescription>Enter the details of the RSS feed you want to add. Click save when you&apos;re done.</DialogDescription>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="BBC News" {...field} />
									</FormControl>
									<FormDescription>The name of the RSS feed.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="url"
							render={({ field }) => (
								<FormItem>
									<FormLabel>URL</FormLabel>
									<FormControl>
										<Input placeholder="https://feeds.skynews.com/feeds/rss/uk.xml" {...field} />
									</FormControl>
									<FormDescription>The URL of the RSS feed.</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Add Feed</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
