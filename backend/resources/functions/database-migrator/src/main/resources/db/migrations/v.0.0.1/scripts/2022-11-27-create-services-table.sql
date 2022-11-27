CREATE TABLE public.services (
	id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT services_pk PRIMARY KEY (id),
	CONSTRAINT services_un UNIQUE ("name")
);
