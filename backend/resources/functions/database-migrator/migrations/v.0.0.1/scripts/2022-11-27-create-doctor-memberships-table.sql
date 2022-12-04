CREATE TABLE public.doctor_memberships (
	doctor_id int4 NOT NULL,
	"type" public.membership_type NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT doctor_memberships_pk PRIMARY KEY (doctor_id,"type","name"),
	CONSTRAINT doctor_memberships_fk FOREIGN KEY (doctor_id) REFERENCES public.doctors(id) ON DELETE CASCADE ON UPDATE CASCADE
);
