O projeto Salus tem tudo para ser uma aplicação robusta e útil.
Vamos estruturar o backend com NestJS, TypeScript, Sequelize e MySQL, de forma que permita:

Cadastro de várias empresas (clínicas, laboratórios, etc.).

Cada empresa terá seus próprios profissionais, serviços/exames e agendamentos.

Uma API REST (ou GraphQL se quiser evoluir no futuro) que será consumida por um app Android.

🧠 Visão Geral da Arquitetura
Entidades principais:

Empresa (Company) : nome, cnpj, endereço, telefone,Imagens,status, flag

Usuário (User)

Pode ser: administrador da empresa, profissional de saúde ou paciente.
Roles: ADMIN, PROFESSIONAL, PATIENT.
Profissional (Professional)
Médico, dentista, psicólogo etc. Vinculado a uma empresa.


Serviço (Service) : Exames, consultas, terapias... Cada serviço tem valor, duração, descrição, etc.

Agenda (Schedule) : Horários disponíveis por profissional.

Agendamento (Appointment) : Agendamentos realizados por pacientes com profissionais.

🔧 Stack escolhida
NestJS: arquitetura modular, excelente para escalabilidade.
Sequelize: ORM para interagir com MySQL.
TypeScript: segurança e manutenção.

MySQL: banco relacional, ideal para esse tipo de aplicação.

📁 Estrutura inicial de pastas (sugestão NestJS Modular)
src/
│
├── auth/                 # autenticação e autorização
├── users/                # usuários e roles
├── companies/            # empresas
├── professionals/        # profissionais da saúde
├── services/             # serviços oferecidos
├── schedules/            # horários disponíveis
├── appointments/         # agendamentos
├── common/               # enums, decorators, interceptors
└── database/             # modelos e configuração sequelize

🔐 Autenticação e Autorização
JWT para autenticação.
Guards para proteger rotas (ex: somente ADMIN pode cadastrar profissionais).
Decorator @Roles() + RolesGuard.

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