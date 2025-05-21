O projeto Salus tem tudo para ser uma aplicação robusta e útil.
Vamos estruturar o backend com NestJS, TypeScript, Sequelize e MySQL, de forma que permita:

Cadastro de várias empresas (clínicas, laboratórios, etc.).

Cada empresa terá seus próprios profissionais, serviços/exames e agendamentos.

Uma API REST (ou GraphQL se quiser evoluir no futuro) que será consumida por um app Android.

🔄 Fluxos principais
1. Cadastro de empresa
Endpoint: POST /companies
Gera um ADMIN associado à empresa.

2. Login
Endpoint: POST /auth/login
Retorna JWT com role e companyId

3. Cadastro de profissional
Restrito a usuários ADMIN daquela empresa.
Endpoint: POST /professionals

4. Listagem de serviços e profissionais
Endpoint público para consulta: GET /companies/:id/services

5. Agendamento de exame/consulta
Usuário (paciente) seleciona:
empresa > profissional > serviço > data/hora
Endpoint: POST /appointments