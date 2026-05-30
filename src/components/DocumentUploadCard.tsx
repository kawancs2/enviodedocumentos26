import { useCallback, useState, useRef } from "react";
import { Upload, CheckCircle2, X, FileImage } from "lucide-react";

interface DocumentUploadCardProps {
  label: string;
  description: string;
  onFileSelect: (file: File | null) => void;
}

const DocumentUploadCard = ({ label, description, onFileSelect }: DocumentUploadCardProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/") && file.type !== "application/pdf") return;
      setFileName(file.name);
      onFileSelect(file);
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleRemove = () => {
    setPreview(null);
    setFileName(null);
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !fileName && inputRef.current?.click()}
        className={`
          relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed 
          transition-all duration-200 cursor-pointer min-h-[200px]
          ${fileName
            ? "border-success bg-success/5"
            : isDragging
              ? "border-upload-zone bg-upload-zone/5 animate-pulse-border"
              : "border-border hover:border-upload-zone/50 hover:bg-muted/50"
          }
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        {fileName ? (
          <div className="flex flex-col items-center gap-3 p-4 w-full">
            {preview ? (
              <img
                src={preview}
                alt={label}
                className="max-h-32 rounded-md object-contain"
              />
            ) : (
              <FileImage className="h-12 w-12 text-success" />
            )}
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                {fileName}
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="flex items-center gap-1 text-xs text-destructive hover:underline"
            >
              <X className="h-3 w-3" /> Remover
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 p-6">
            <div className="rounded-full bg-primary/10 p-3">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Clique ou arraste o arquivo
              </p>
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUploadCard;
