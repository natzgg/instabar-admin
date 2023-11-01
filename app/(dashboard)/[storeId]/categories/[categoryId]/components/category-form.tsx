"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";

import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/ui/modals/alert-modal";
import ErrorAlert from "@/components/ui/modals/error-alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { redirect, useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

interface CategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[] | [];
}

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  billboards,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Edit a category" : "Add a new category";
  const toastMessage = initialData ? "Category updated." : "Category created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      billboardId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          values
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, values);
      }
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onConfirm = () => {
    router.push(`/${params.storeId}/billboards`);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`
      );
      toast.success("Billboard deleted.");
      router.push(`/${params.storeId}/categories`);
    } catch (error) {
      toast.error(
        "Make sure you removed all products that is using this category."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      {billboards.length == 0 ? (
        <>
          <ErrorAlert onConfirm={onConfirm} />
        </>
      ) : (
        <>
          <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
          />
          <div className="flex justify-between items-center">
            <Heading title={title} description={description} />
            {initialData && (
              <Button
                onClick={() => setOpen(true)}
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Separator />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-3 gap-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Category name"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="billboardId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billboard</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              disabled={initialData ? true : false}
                            >
                              <SelectValue placeholder="Select a billboard" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {billboards?.map((billboard) => (
                              <SelectItem
                                key={billboard.id}
                                value={billboard.id}
                              >
                                {billboard.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={loading} type="submit">
                {action}
              </Button>
            </form>
          </Form>
        </>
      )}
    </>
  );
};
