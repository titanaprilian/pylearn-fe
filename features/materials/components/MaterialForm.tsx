"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createMaterialSchema,
  updateMaterialSchema,
  CreateMaterialRequest,
  UpdateMaterialRequest,
} from "../schemas/materialSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import { useTranslations } from "@/lib/i18n/useTranslation";
import { IconPicker } from "./IconPicker";
import { RichTextEditor } from "./RichTextEditor";
import { useEffect } from "react";

interface MaterialFormProps {
  initialValues?: Partial<UpdateMaterialRequest>;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function MaterialForm({ initialValues, onSubmit, isLoading }: MaterialFormProps) {
  const t = useTranslations();
  const isEdit = !!initialValues;

  const form = useForm<any>({
    resolver: zodResolver(isEdit ? updateMaterialSchema : createMaterialSchema),
    defaultValues: initialValues || {
      title: "",
      description: "",
      materialType: "text",
      content: "",
      iconName: "BookOpen",
      isPublished: false,
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5 px-1 py-1"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="title" className="text-sm font-medium">
            {t("materials.form.title.label")}
          </Label>
          <Input
            id="title"
            placeholder={t("materials.form.title.placeholder")}
            {...form.register("title")}
            disabled={isLoading}
          />
          {form.formState.errors.title && (
            <p className="text-xs text-destructive">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description" className="text-sm font-medium">
            {t("materials.form.description.label")}
          </Label>
          <Textarea
            id="description"
            placeholder={t("materials.form.description.placeholder")}
            className="resize-none"
            {...form.register("description")}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="icon" className="text-sm font-medium">
            {t("materials.form.icon.label")}
          </Label>
          <IconPicker
            value={form.watch("iconName")}
            onChange={(val) => form.setValue("iconName", val)}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="content" className="text-sm font-medium">
            {t("materials.form.content.label")}
          </Label>
          <Controller
            name="content"
            control={form.control}
            render={({ field }) => (
              <RichTextEditor
                value={field.value}
                onChange={field.onChange}
                placeholder={t("materials.form.content.placeholder")}
                disabled={isLoading}
              />
            )}
          />
          {form.formState.errors.content && (
            <p className="text-xs text-destructive">
              {form.formState.errors.content.message}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id="isPublished"
            checked={form.watch("isPublished")}
            onCheckedChange={(val) => form.setValue("isPublished", !!val)}
            disabled={isLoading}
          />
          <Label htmlFor="isPublished" className="text-sm font-medium cursor-pointer">
            {t("materials.form.isPublished.label")}
          </Label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="submit" disabled={isLoading} className="bg-branding-dark px-8">
          {isLoading ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              {t("common.save")}
            </>
          ) : (
            t("common.save")
          )}
        </Button>
      </div>
    </form>
  );
}
