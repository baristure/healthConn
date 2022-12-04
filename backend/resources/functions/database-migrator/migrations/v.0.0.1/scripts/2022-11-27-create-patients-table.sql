CREATE TABLE public.patients (
	id serial4 NOT NULL,
	first_name varchar(255) NOT NULL,
	last_name varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"gender" public."gender" NOT NULL,
	"blood_type" public."blood_type" NOT NULL,
	mobile_number varchar(255) NOT NULL,
	birth_date timestamptz NOT NULL,
	weight int4 NOT NULL,
	height int4 NOT NULL,
	story text NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NOT NULL DEFAULT now(),
	CONSTRAINT patients_pk PRIMARY KEY (id),
	CONSTRAINT patients_un UNIQUE (email),
	CONSTRAINT patients_un_2 UNIQUE (mobile_number)
);