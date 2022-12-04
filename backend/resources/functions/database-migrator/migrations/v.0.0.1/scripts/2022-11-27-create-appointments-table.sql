CREATE TABLE public.appointments (
	doctor_id int4 NOT NULL,
	patient_id int4 NOT NULL,
	recognization varchar(255) NOT NULL,
	start_date timestamptz NOT NULL DEFAULT now(),
	end_date timestamptz NOT NULL DEFAULT now(),
	complaints text NULL,
	id serial4 NOT NULL,
	CONSTRAINT appointments_pk PRIMARY KEY (id),
	CONSTRAINT appointments_un UNIQUE (doctor_id, patient_id, start_date, end_date),
	CONSTRAINT appointments_fk FOREIGN KEY (doctor_id) REFERENCES public.doctors(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT appointments_fk_1 FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE CASCADE ON UPDATE CASCADE
);