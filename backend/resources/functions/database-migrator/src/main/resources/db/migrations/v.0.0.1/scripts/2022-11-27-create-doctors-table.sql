CREATE TABLE public.doctors (
	id serial4 NOT NULL,
	first_name varchar(255) NOT NULL,
	last_name varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	mobile_number varchar(255) NOT NULL,
	office_number varchar(255) NOT NULL,
	speciality varchar(255) NOT NULL,
	rating numeric(3, 1) NULL DEFAULT 0,
	title public."titles" NOT NULL,
	resume text NULL,
	image_url varchar(255) NULL,
	CONSTRAINT doctors_pk PRIMARY KEY (id),
	CONSTRAINT doctors_un UNIQUE (email),
	CONSTRAINT doctors_un_2 UNIQUE (mobile_number)
);