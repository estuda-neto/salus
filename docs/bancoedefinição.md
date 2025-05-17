# Tabelas e Atributos
🧑 users
Campo	Tipo	Descrição
id	UUID / BIGINT	Identificador do paciente
name	VARCHAR(100)	Nome completo
email	VARCHAR(100)	Email único
phone	VARCHAR(20)	Telefone
password_hash	TEXT	Senha (criptografada)
created_at	DATETIME	Registro criado

🏥 companies
Campo	Tipo	Descrição
id	UUID / BIGINT	Identificador da empresa
name	VARCHAR(100)	Nome da empresa
fantasy_name	VARCHAR(100)	Nome fantasia
cnpj	VARCHAR(20)	CNPJ único
email	VARCHAR(100)	Email administrativo
phone	VARCHAR(20)	Telefone
status	ENUM	PENDING, VALIDATED, REJECTED
validation_data	JSON	Dados retornados da ReceitaWS
created_at	DATETIME	Registro criado

🧭 company_addresses
Campo	Tipo	Descrição
id	UUID / BIGINT	ID único
company_id	FK (companies)	Referência à empresa
cep	VARCHAR(10)	Código postal
street	VARCHAR(100)	Rua
number	VARCHAR(20)	Número
complement	VARCHAR(100)	Complemento (opcional)
neighborhood	VARCHAR(100)	Bairro
city	VARCHAR(100)	Cidade
state	VARCHAR(2)	Estado (UF)
latitude	DOUBLE	Geolocalização (opcional)
longitude	DOUBLE	Geolocalização (opcional)

🖼️ company_images
Campo	Tipo	Descrição
id	UUID / BIGINT	ID da imagem
company_id	FK (companies)	Empresa
url	TEXT	URL da imagem (armazenada no S3, Firebase etc)
description	VARCHAR(100)	Descrição opcional

👨‍⚕️ professionals
Campo	Tipo	Descrição
id	UUID / BIGINT	ID do profissional
company_id	FK (companies)	Empresa que ele atende
name	VARCHAR(100)	Nome completo
specialty	VARCHAR(100)	Especialidade médica
registration	VARCHAR(50)	CRM/CRE/SP etc

🧰 services
Campo	Tipo	Descrição
id	UUID / BIGINT	ID do serviço
company_id	FK (companies)	Empresa que oferece
name	VARCHAR(100)	Nome do serviço (Ex: Consulta, Exame)
description	TEXT	Descrição
duration_min	INT	Duração estimada em minutos
price	DECIMAL(10,2)	Preço

📆 availabilities
Campo	Tipo	Descrição
id	UUID / BIGINT	ID da disponibilidade
professional_id	FK (professionals)	Profissional responsável
weekday	TINYINT	Dia da semana (0 = domingo)
start_time	TIME	Hora de início
end_time	TIME	Hora de término

📅 appointments
Campo	Tipo	Descrição
id	UUID / BIGINT	ID do agendamento
user_id	FK (users)	Paciente
company_id	FK (companies)	Empresa
professional_id	FK (professionals)	Profissional
service_id	FK (services)	Serviço selecionado
scheduled_at	DATETIME	Data e hora do agendamento
status	ENUM	PENDING, CONFIRMED, CANCELLED, DONE

🔐 Extras que podem ser úteis
📋 admin_users
Para administradores ou donos das empresas acessarem o sistema.

Campo	Tipo	Descrição
id	UUID / BIGINT	ID do admin
company_id	FK (companies)	Empresa administrada
name	VARCHAR(100)	Nome
email	VARCHAR(100)	Email de login
password_hash	TEXT	Senha criptografada


# Relacionamentos principais
👤 users (pacientes)
Não oferecem serviços.

Apenas agendam serviços com profissionais de empresas.

Relacionamento com appointments como cliente/paciente.

🏥 companies (clínicas, laboratórios)
São donas dos serviços e dos profissionais.

Têm muitos:

services (consultas, exames)

professionals (médicos, dentistas)

Controlam os horários de disponibilidade e regras.

👨‍⚕️ professionals
Pertencem a uma empresa (company_id).

Executam os services.

Podem ter várias disponibilidades (availabilities).

São selecionados na hora do agendamento.

🧰 services
São oferecidos pela empresa, e executados por profissionais.

Um serviço pode ser oferecido por vários profissionais (por exemplo: “Consulta Geral” com vários médicos).

Pode-se modelar isso como:

Serviço tem muitos profissionais (many-to-many), ou

Profissional tem muitos serviços (mais comum e simples se for sempre de dentro da mesma empresa).

📅 appointments
Representam o agendamento de um serviço por um paciente com um profissional em uma empresa, em um horário específico.

🔄 Diagrama Simplificado dos Relacionamentos
text
Copiar
Editar
[users] ---< [appointments] >--- [services]
                           \       /
                        [professionals]
                              |
                         [companies]
                              |
                        [services]
🧠 Quem oferece o serviço?
👉 É a empresa quem oferece o serviço, e o profissional executa.
Ou seja:

A empresa define que oferece "Consulta com Clínico Geral".

A empresa cadastra médicos (profissionais) que podem executar esse serviço.

O usuário escolhe uma data e um horário com esse profissional para esse serviço.

💡 Extra: Caso multi-clínica com profissionais independentes?
Se um mesmo profissional puder trabalhar em várias empresas, então:

Precisamos de uma tabela professional_services ou company_professionals para modelar esse vínculo.

Fica assim:

text
Copiar
Editar
companies ---< company_professionals >--- professionals
Se isso não ocorrer no seu sistema, podemos manter o modelo mais simples com o professional pertencendo diretamente a uma única company.

