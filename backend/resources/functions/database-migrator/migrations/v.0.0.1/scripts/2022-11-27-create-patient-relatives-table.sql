CREATE TABLE public.patient_relatives (
	patient_id int4 NOT NULL,
	first_name varchar(255) NOT NULL,
	last_name varchar(255) NOT NULL,
	phone_number varchar(255) NOT NULL,
	CONSTRAINT patient_relatives_un UNIQUE (patient_id,phone_number),
	CONSTRAINT patient_relatives_fk FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE CASCADE ON UPDATE CASCADE
);
