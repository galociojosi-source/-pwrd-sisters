# PWRD Sisters — Sistema de Gestão

Sistema completo de PDV, estoque, condicionais e pagamentos.

## 🚀 Deploy automático

Toda vez que um arquivo for enviado para a branch `main`, o sistema é publicado automaticamente em:

**https://pwrd-system.web.app**

## 📁 Estrutura

```
public/
  index.html      ← sistema principal (versão mais recente)
  manifest.json   ← configuração do app (PWA)
  sw.js           ← service worker (offline)
  icon-192.png    ← ícone do app
  icon-512.png    ← ícone do app (grande)
firebase.json     ← configuração do Firebase Hosting
```

## 🔄 Como atualizar o sistema

1. Baixe a nova versão gerada pelo Claude
2. Renomeie para `index.html`
3. Substitua o arquivo em `public/index.html`
4. Suba para o GitHub — o deploy acontece automaticamente em ~1 minuto

## 📱 Instalar no celular

**iPhone:** Safari → compartilhar ↑ → Adicionar à Tela de Início

**Android:** Chrome → menu ⋮ → Instalar app
