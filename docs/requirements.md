# 📋 Requisitos do Sistema - Plataforma Salus

A aplicação **Salus** será uma API backend desenvolvida com **Node.js**, **NestJS**, **TypeScript**, **Sequelize** e **MySQL**, com o objetivo de permitir que **múltiplas empresas de saúde** (clínicas, laboratórios, consultórios) possam realizar **gestão de agendamentos**, profissionais e serviços.

---

## 1. Requisitos Gerais
- [ ] Cada empresa deve possuir uma conta de usuário com o papel de **administrador (ADMIN)**.
- [ ] O sistema deve verificar empresas e validar se são legitimas.

---

## 2. Gestão de Empresas e Usuários

- [ ] Cada empresa poderá, Administrador: - Gerenciar seus profissionais. - Cadastrar os serviços que oferece. - Definir horários de atendimento (agendas).
- [ ] O administrador da empresa pode criar e gerenciar usuários vinculados à empresa (PROFESSIONAL).
- [ ] Pacientes poderão se cadastrar e agendar consultas com profissionais disponíveis.

---

## 3. Gestão de Profissionais e Serviços

- [ ] O sistema deve permitir que cada profissional tenha um ou mais **serviços** associados (ex: Consulta Clínica, Exame de Sangue).
- [ ] Cada serviço deve conter: Nome Duração Preço Especialidade.
- [ ] Os profissionais devem ter **agendas com horários disponíveis**.
- [ ] Os horaios disponiveis devem ser agendados pelo paciente também para realização de consultas...

---

## 4. Agendamento

- [ ] O sistema deve permitir que pacientes:
  - Se cadastrem e autentiquem.
  - Visualizem empresas, serviços e profissionais.
  - Agendem um serviço com um profissional em um horário disponível.
- [ ] Após agendamento, o status padrão será `PENDING`.
- [ ] O sistema deve permitir a confirmação, cancelamento e histórico de agendamentos.

---

## 5. APIs Públicas e Privadas

- [ ] O sistema deve expor:
  - APIs **públicas** para listagem de empresas, serviços e horários disponíveis.
  - APIs **privadas** para operações autenticadas de gestão.
- [ ] Utilizar Swagger para documentação da API.

---

## 6. Requisitos Técnicos

- [ ] Utilizar NestJS com Sequelize (MySQL).
- [ ] Utilizar módulos desacoplados para `auth`, `users`, `companies`, `professionals`, `services`, `appointments`, `schedules`.
- [ ] Aplicar DTOs com validações.
- [ ] Usar Migrations e Seeds para base de dados inicial.
- [ ] Implementar Guards para controle de acesso por `Role`.

---

## 7. Futuras Expansões (Extras)

- [ ] Integração com envio de lembretes por e-mail ou WhatsApp.
- [ ] Painel administrativo web com dashboard por empresa.
- [ ] Suporte a avaliações de profissionais.
- [ ] Exportação de relatórios por período.

---

## 8 . Não Funcionais
- [ ] Entendimento completo da https://www.receitaws.com.br/#section-api

### Extras
- agora o foco é o banco, preciso que a empresa tenha atributos como imagens, para que a empresa seja validada e tenha acesso permitido somente quando validado os seus dados de endereço em conjunto com alguma api do google etc (API do Google Maps (Geocoding ou Places API)) 



## 2. 🏢 Gestão de Empresas

### ADMIN pode:
- Editar dados da empresa
- Fazer upload de documentos e imagens
- Solicitar verificação de endereço

### O sistema realiza:
- Consulta à **Google Maps API** (Geocoding ou Places)
- Verificação da existência e precisão do endereço
- Atualização do status da empresa (`VERIFIED`, `REJECTED`)
- Notificação ao administrador com o resultado

---

## 3. 👩‍⚕️ Serviços e Profissionais

- Profissionais podem ter múltiplas especialidades médicas.
- Cada serviço contém:
  - Nome
  - Descrição
  - Duração (minutos)
  - Preço
  - Especialidade
- Agendas personalizadas por profissional
- Suporte a bloqueios manuais (férias, folgas)

---

## 4. 📅 Agendamento

### Pacientes autenticados podem:
- Visualizar empresas validadas
- Buscar por especialidade, serviço ou localidade
- Agendar horários disponíveis

### Regras de negócio:
- Prevenção de conflitos de horários
- Cancelamento permitido até X horas antes
- Status do agendamento:
  - `PENDING`
  - `CONFIRMED`
  - `CANCELED`
  - `COMPLETED`

---

## 5. 🔐 APIs Públicas e Privadas

### Públicas:
- Listagem de empresas validadas
- Busca de serviços e horários disponíveis

### Privadas (JWT obrigatório):
- Cadastro e gerenciamento de empresas e usuários
- Agendamentos
- Upload de documentos e imagens
- Solicitação de verificação de endereço

> Todas as rotas devem estar documentadas com **Swagger (OpenAPI)**.

---

## 6. 🧱 Requisitos Técnicos

- **NestJS** com **Sequelize** e **MySQL**
- Arquitetura modular
- Uso de:
  - DTOs com validação
  - Pipes personalizados
  - Guards baseados em role
- **Migrations** e **Seeds**
- Integração com **Google Maps API**
- Armazenamento de imagens em:
  - Amazon S3, Firebase Storage, ou similar

---

# 🧭 Roadmap — Validação de Endereço

## 🎯 Objetivo
Permitir que empresas sejam **verificadas automaticamente** através da **Google Maps API**. Apenas empresas `VERIFIED` poderão operar no sistema.

---

## 🧩 Endpoints e Funcionalidades

### 📌 `POST /companies`
- Cria uma nova empresa (status inicial: `PENDING`)
- Valida CNPJ
- Salva dados básicos

### 📌 `PATCH /companies/:id/images`
- Upload de imagens da empresa (logo, fachada, etc.)
- Validação de tipo/limite
- Armazena arquivos em bucket (ex: S3)

### 📌 `POST /companies/:id/validate-address`
- Valida endereço via **Google Geocoding API**
- Fluxo:
  - Recebe endereço completo
  - Busca coordenadas e validade do local
  - (Opcional) Verifica se é local comercial via Places API
  - Atualiza status da empresa: `VERIFIED` ou `REJECTED`

### 📌 `GET /companies/verified`
- Retorna lista de empresas com status `VERIFIED`

### 📌 `GET /companies/:id/status`
- Retorna status atual da empresa (útil para frontend/admins)

---

## 🔧 Tarefas Técnicas

- [ ] Configurar chave da **Google Maps API**
- [ ] Criar serviço `AddressValidationService`
- [ ] Criar campo `status` na tabela `companies`
- [ ] Criar tabela opcional `company_documents`
- [ ] Implementar DTOs e Pipes com validações
- [ ] Criar guards que impedem empresas não verificadas de acessar funcionalidades
- [ ] Documentar as rotas no Swagger
- [ ] Criar testes unitários e e2e para cada fluxo

---
### FIM

# 🧭 Roadmap — Módulo de Agendamento

## 🎯 Objetivo

Permitir que **pacientes realizem agendamentos** com profissionais de saúde de forma **segura**, **eficiente** e com total rastreabilidade. O sistema deve garantir a disponibilidade dos horários, evitar conflitos e permitir o controle de status por todas as partes envolvidas.

---

## 🧩 Endpoints e Funcionalidades

### 📌 `POST /appointments`
**Cria um novo agendamento**

- **Papel**: `PATIENT`
- **Regras**:
  - Valida a disponibilidade do profissional
  - Impede conflitos de horário
  - Status inicial: `PENDING`

{
  "companyId": 1,
  "professionalId": 12,
  "serviceId": 5,
  "schedule": "2025-06-03T14:00:00Z"
}
📌 GET /appointments/my
Lista os agendamentos do paciente autenticado

Papel: PATIENT

Filtros:

Status (PENDING, CONFIRMED, COMPLETED, etc.)

Intervalo de datas

📌 PATCH /appointments/:id/cancel
Paciente cancela um agendamento

Papel: PATIENT

Regras:

Permitido apenas até X horas antes

Atualiza status para CANCELED

📌 PATCH /appointments/:id/confirm
Profissional confirma um agendamento

Papel: PROFESSIONAL

Atualiza status para CONFIRMED

📌 PATCH /appointments/:id/complete
Profissional encerra o atendimento

Papel: PROFESSIONAL

Atualiza status para COMPLETED

(Opcional) Pode adicionar observações ou notas clínicas

📌 GET /appointments/company/:id
Lista agendamentos da empresa

Papel: ADMIN

Filtros:

Profissional

Status

Período

📌 GET /appointments/professional/:id
Lista agendamentos de um profissional

Papel: PROFESSIONAL

Exibe:

Lista por dia/semana

Serviços, pacientes, status e horários

🔄 Ciclo de Vida do Agendamento
Status	Disparado por	Papel Responsável
PENDING	Criação	PATIENT
CONFIRMED	Confirmação manual	PROFESSIONAL / sistema
CANCELED	Cancelamento	PATIENT / ADMIN
COMPLETED	Finalização do serviço	PROFESSIONAL

🔒 Regras de Negócio
❌ Um paciente não pode ter dois agendamentos no mesmo horário.

❌ Um profissional não pode ter dois atendimentos simultâneos.

✅ Cancelamentos só são permitidos até X horas antes do horário marcado.

✅ Apenas empresas com status VERIFIED podem oferecer agendamentos.

🛠️ Tarefas Técnicas
 Criar tabela appointments

 Criar entidade Appointment com enum de status

 Criar AppointmentsService:

Lógica de conflito

Validação de horários

Atualização de status

 Criar DTOs:

Criação

Atualização de status

Listagem com filtros

 Criar Guards e Pipes

 Testes unitários e e2e

 Documentar todos os endpoints no Swagger

✅ Exemplo de Fluxo Completo
Paciente se autentica

Visualiza empresas validadas

Escolhe profissional, serviço e horário

Cria agendamento (PENDING)

(Opcional) Profissional confirma (CONFIRMED)

Atendimento realizado → status: COMPLETED

🏢 Fluxo de Criação e Validação de Empresa
🎯 Objetivo
Garantir que apenas empresas legítimas e verificadas tenham acesso à plataforma Salus.

📋 Passos do Fluxo
 ADMIN se cadastra e cria a empresa

 Backend chama a ReceitaWS para validar o CNPJ e preencher automaticamente os dados:

Criar serviço NestJS:

Recebe CNPJ

Consulta ReceitaWS

Retorna dados para auto-preenchimento/validação

 Validação básica do sócio responsável

 Validação do endereço com Google Maps API

Se válido: status VERIFIED

Se inválido: status REJECTED

 Enquanto o status for PENDING ou REJECTED, a empresa não tem acesso a funcionalidades da plataforma

javascript
Copiar
Editar

Se quiser, posso preparar esse conteúdo como um arquivo `.md` pronto para download ou ainda gerar um Swagger `YAML` com esses endpoints. Deseja isso também?






Você disse:
nao ficou todo texto em markdown,os endpoint nao estao no mark=down bixo, eu queria tudo


O ChatGPT disse:
Entendi! Você quer TODO o texto, incluindo as descrições e os endpoints, dentro do formato Markdown, com blocos de código e formatação adequada para ficar totalmente em Markdown elegante e legível.

Aqui está o texto completo, 100% em Markdown — endpoints formatados com blocos de código, tabelas, listas e tudo organizado para ficar bonito e fácil de ler:

markdown
Copiar
Editar
# 🧭 Roadmap — Módulo de Agendamento

## 🎯 Objetivo

Permitir que **pacientes realizem agendamentos** com profissionais de saúde de forma **segura**, **eficiente** e com controle de status. O sistema deve gerenciar horários disponíveis, evitar conflitos e garantir a rastreabilidade das ações.

---

## 🧩 Endpoints e Funcionalidades

### 📌 `POST /appointments`

**Cria um novo agendamento**

- **Papel:** `PATIENT`
- **Regras:**
  - Valida disponibilidade do profissional
  - Impede conflitos de horário
  - Status inicial: `PENDING`

**Payload de exemplo:**

{
  "companyId": 1,
  "professionalId": 12,
  "serviceId": 5,
  "schedule": "2025-06-03T14:00:00Z"
}
📌 GET /appointments/my
Lista agendamentos do paciente autenticado

Papel: PATIENT

Filtros:

Status (PENDING, CONFIRMED, COMPLETED, etc.)

Intervalo de datas

Exibe: serviço, profissional, status, data e hora

📌 PATCH /appointments/:id/cancel
Paciente cancela um agendamento

Papel: PATIENT

Regras:

Só é permitido até X horas antes do horário agendado

Atualiza status para CANCELED

📌 PATCH /appointments/:id/confirm
Profissional confirma um agendamento

Papel: PROFESSIONAL

Atualiza status para CONFIRMED

📌 PATCH /appointments/:id/complete
Profissional encerra o atendimento

Papel: PROFESSIONAL

Atualiza status para COMPLETED

(Opcional) Pode adicionar observações ou notas clínicas

📌 GET /appointments/company/:id
Lista todos os agendamentos de uma empresa

Papel: ADMIN

Filtros:

Profissional

Status

Data inicial/final

📌 GET /appointments/professional/:id
Lista agendamentos de um profissional específico

Papel: PROFESSIONAL

Exibe:

Lista por dia/semana

Serviços e pacientes

Horário e status

🔄 Ciclo de Vida do Agendamento
Status	Disparado por	Papel responsável
PENDING	Criação do agendamento	PATIENT
CONFIRMED	Confirmação manual	PROFESSIONAL / sistema
CANCELED	Cancelamento	PATIENT / ADMIN
COMPLETED	Finalização do atendimento	PROFESSIONAL

🔒 Regras de Negócio
❌ Um paciente não pode ter dois agendamentos no mesmo horário.

❌ Um profissional não pode ter dois atendimentos simultâneos.

✅ Cancelamentos só são permitidos até X horas antes do horário agendado.

✅ Apenas empresas com status VERIFIED podem oferecer agendamentos.

🔧 Tarefas Técnicas
 Criar tabela appointments

 Criar entidade Appointment com enum de status

 Criar AppointmentsService com:

Lógica de conflito

Validação de horários

Atualização de status

 Criar DTOs para:

Criação

Atualização de status

Listagem com filtros

 Criar Guards e Pipes para autorização e validação

 Implementar testes unitários e end-to-end

 Documentar todos os endpoints no Swagger

✅ Exemplo de Fluxo Completo
Paciente se autentica

Visualiza empresas validadas

Escolhe profissional, serviço e horário

Cria agendamento (PENDING)

(Opcional) Profissional confirma (CONFIRMED)

Atendimento realizado → status: COMPLETED