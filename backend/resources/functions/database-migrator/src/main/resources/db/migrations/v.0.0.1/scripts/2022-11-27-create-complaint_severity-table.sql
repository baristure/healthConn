CREATE TABLE public.complaint_severity (
	appointment_id int4 NOT NULL,
	part varchar(255) NOT NULL,
	severity int4 NOT NULL,
	"comment" text NULL,
	CONSTRAINT complaint_severity_un UNIQUE (appointment_id, part),
	CONSTRAINT complaint_severity_fk FOREIGN KEY (appointment_id) REFERENCES public.appointments(id) ON DELETE CASCADE ON UPDATE CASCADE
);
