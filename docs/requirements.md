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