CREATE TABLE public.doctors_services (
	doctor_id int4 NOT NULL,
	service_id int4 NOT NULL,
	CONSTRAINT doctors_services_un UNIQUE (doctor_id,service_id),
	CONSTRAINT doctors_services_fk FOREIGN KEY (doctor_id) REFERENCES public.doctors(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT doctors_services_fk_1 FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE CASCADE ON UPDATE CASCADE
);
