"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createMaterialSchema,
  updateMaterialSchema,
  UpdateMaterialRequest,
} from "../schemas/materialSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { IconPicker } from "./IconPicker";
import { RichTextEditor } from "./RichTextEditor";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Type, Upload } from "lucide-react";

interface MaterialFormProps {
  initialValues?: Partial<UpdateMaterialRequest>;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export function MaterialForm({
  initialValues,
  onSubmit,
  isLoading,
}: MaterialFormProps) {
  const isEdit = !!initialValues;
  const [file, setFile] = useState<File | null>(null);

  const formSchema = isEdit ? updateMaterialSchema : createMaterialSchema;

  const form = useForm<any>({
    // Cast the resolver to any to resolve the "ResolverOptions" conflict
    resolver: zodResolver(formSchema) as any,
    defaultValues: initialValues || {
      title: "",
      description: "",
      materialType: "text",
      content: "",
      iconName: "BookOpen",
      isPublished: true, // As we agreed earlier, default to true
    },
  });

  const materialType = form.watch("materialType");

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);

  // Special handler to append the file to the data
  const handleFormSubmit = (values: any) => {
    const data = { ...values };
    if (materialType === "file" && file) {
      data.file = file;
    }
    onSubmit(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleFormSubmit)}
      className="space-y-5 px-1 py-1"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Title & Description (Direct Bahasa labels as requested) */}
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="title" className="text-sm font-medium">
            Judul Materi
          </Label>
          <Input
            id="title"
            placeholder="Contoh: Pengenalan Dasar React"
            {...form.register("title")}
            disabled={isLoading}
          />
          {form.formState.errors.title && (
            <p className="text-xs text-destructive">
              {form.formState.errors.title.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Deskripsi Singkat
          </Label>
          <Textarea
            id="description"
            placeholder="Jelaskan apa yang akan dipelajari..."
            className="resize-none"
            {...form.register("description")}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label className="text-sm font-medium">Ikon Materi</Label>
          <IconPicker
            value={form.watch("iconName")}
            onChange={(val) => form.setValue("iconName", val)}
            disabled={isLoading}
          />
        </div>

        {/* --- MATERIAL TYPE SELECTION --- */}
        <div className="space-y-3 sm:col-span-2 border-y py-4">
          <Label className="text-sm font-medium">Tipe Konten</Label>
          <Tabs
            value={materialType}
            onValueChange={(val) => form.setValue("materialType", val)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text" className="gap-2">
                <Type className="h-4 w-4" /> Editor Teks
              </TabsTrigger>
              <TabsTrigger value="file" className="gap-2">
                <FileText className="h-4 w-4" /> Upload PDF
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* --- DYNAMIC CONTENT AREA --- */}
        <div className="space-y-2 sm:col-span-2">
          <Label className="text-sm font-medium">Konten Utama</Label>

          {materialType === "text" ? (
            <Controller
              name="content"
              control={form.control}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Tulis materi di sini..."
                  disabled={isLoading}
                />
              )}
            />
          ) : (
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 bg-muted/30">
              {file ? (
                <div className="flex items-center gap-3 bg-background p-3 rounded-md border w-full">
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setFile(null)}
                  >
                    Ganti
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">
                    Pilih file PDF untuk diunggah
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Maksimal ukuran file: 10MB
                  </p>
                  <Input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    id="pdf-upload"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  <Button type="button" variant="secondary" asChild>
                    <Label htmlFor="pdf-upload" className="cursor-pointer">
                      Pilih File
                    </Label>
                  </Button>
                </div>
              )}
              {materialType === "file" && !file && !isEdit && (
                <p className="text-xs text-destructive mt-2">
                  File PDF wajib diunggah untuk tipe konten file
                </p>
              )}
            </div>
          )}

          {form.formState.errors.content && materialType === "text" && (
            <p className="text-xs text-destructive">
              {form.formState.errors.content.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading || (materialType === "file" && !file && !isEdit)}
          className="bg-branding-dark px-8"
        >
          {isLoading ? (
            <>
              <Spinner className="mr-2 h-4 w-4" /> Menyimpan...
            </>
          ) : (
            "Simpan Materi"
          )}
        </Button>
      </div>
    </form>
  );
}
