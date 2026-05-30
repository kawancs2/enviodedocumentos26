import { useState } from "react";
import { Shield, Send, CheckCircle2 } from "lucide-react";
import DocumentUploadCard from "@/components/DocumentUploadCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [docType, setDocType] = useState("rg");
  const [front, setFront] = useState<File | null>(null);
  const [back, setBack] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = name.trim() && email.trim() && front && back;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    // Here you'd send to your backend
    toast({
      title: "Documentos enviados!",
      description: "Seus documentos foram recebidos com sucesso.",
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Documentos Enviados!
          </h1>
          <p className="text-muted-foreground mb-6">
            Seus documentos foram recebidos com sucesso. Entraremos em contato em breve.
          </p>
          <Button
            onClick={() => {
              setSubmitted(false);
              setName("");
              setEmail("");
              setFront(null);
              setBack(null);
            }}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Enviar novos documentos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-2xl px-4 py-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground leading-tight">
              Envio de Documentos
            </h1>
            <p className="text-xs text-muted-foreground">
              Portal seguro de recebimento
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground mb-1">
              Dados e Documentos
            </h2>
            <p className="text-sm text-muted-foreground">
              Preencha seus dados e envie a frente e o verso do documento.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Personal info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  Nome completo
                </label>
                <Input
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={100}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-foreground">
                  E-mail
                </label>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={255}
                />
              </div>
            </div>

            {/* Doc type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foreground">
                Tipo de documento
              </label>
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: "rg", label: "RG" },
                  { value: "cnh", label: "CNH" },
                  { value: "cpf", label: "CPF" },
                  { value: "outro", label: "Outro" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setDocType(opt.value)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors ${
                      docType === opt.value
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary text-secondary-foreground border-border hover:border-primary/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <DocumentUploadCard
                label="Frente do Documento"
                description="JPG, PNG ou PDF — máx. 10MB"
                onFileSelect={setFront}
              />
              <DocumentUploadCard
                label="Verso do Documento"
                description="JPG, PNG ou PDF — máx. 10MB"
                onFileSelect={setBack}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={!canSubmit}
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
            >
              <Send className="h-4 w-4" />
              Enviar Documentos
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              🔒 Seus dados são tratados com total sigilo e segurança.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Index;
