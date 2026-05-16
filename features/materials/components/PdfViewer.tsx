"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Set worker path
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  url: string;
}

export function PdfViewer({ url }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
  }

  function onDocumentLoadError(err: Error) {
    console.error("PDF Load Error:", err);
    setError(err.message);
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center w-full bg-muted/30 rounded-lg p-4 gap-4">
      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading PDF</AlertTitle>
          <AlertDescription>
            {error}. You can try opening it directly in a new tab.
          </AlertDescription>
        </Alert>
      ) : (
        <>
          <div className="relative w-full overflow-auto flex justify-center border rounded-md bg-white min-h-[500px]">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            <Document
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={<Skeleton className="h-[600px] w-full" />}
            >
              <Page
                pageNumber={pageNumber}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="max-w-full"
                width={window.innerWidth > 800 ? 700 : window.innerWidth - 64}
              />
            </Document>
          </div>

          {numPages && (
            <div className="flex items-center gap-4 py-2">
              <Button
                variant="outline"
                size="icon"
                disabled={pageNumber <= 1}
                onClick={() => setPageNumber(pageNumber - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <p className="text-sm font-medium">
                Page {pageNumber} of {numPages}
              </p>
              <Button
                variant="outline"
                size="icon"
                disabled={pageNumber >= (numPages || 0)}
                onClick={() => setPageNumber(pageNumber + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
