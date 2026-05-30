# Portal de Envio de Documentos

Aplicação web para captura de documentos (frente e verso) de clientes/parceiros.
Construída com **React + Vite + TypeScript + Tailwind CSS + shadcn/ui**.

---

## 🚀 Como rodar localmente

Pré-requisitos: [Node.js](https://nodejs.org/) 18+ e npm.

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em modo desenvolvimento
npm run dev

# 3. Build de produção
npm run build
```

A aplicação ficará disponível em `http://localhost:8080`.

---

## 📦 Subir no GitHub

```bash
git init
git add .
git commit -m "primeiro commit"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
git push -u origin main
```

---

## ▲ Deploy na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Importe o repositório do GitHub
3. A Vercel detecta automaticamente o **Vite** (já configurado em `vercel.json`)
4. Clique em **Deploy** — pronto!

Configurações já prontas:
- Framework: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`
- SPA rewrites configurados (todas as rotas voltam para `index.html`)

---

## 📁 Estrutura

```
src/
├── components/
│   ├── DocumentUploadCard.tsx   # Card de upload com drag & drop
│   └── ui/                      # Componentes shadcn/ui
├── pages/
│   ├── Index.tsx                # Página principal
│   └── NotFound.tsx
├── index.css                    # Design system (tokens HSL)
└── main.tsx
```

---

## ✨ Funcionalidades

- Formulário com nome, e-mail e tipo de documento (RG, CNH, CPF, Outro)
- Upload de **frente e verso** com drag & drop
- Preview de imagem e suporte a PDF
- Validação e feedback visual de sucesso
- Design responsivo

---

## 🔧 Próximos passos sugeridos

- Conectar um backend (Lovable Cloud / Supabase) para armazenar os arquivos
- Adicionar limite de tamanho (10MB) e validações extras
- Envio de e-mail de confirmação
