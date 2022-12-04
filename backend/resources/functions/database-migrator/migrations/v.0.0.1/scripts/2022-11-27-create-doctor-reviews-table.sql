CREATE TABLE public.doctor_reviews (
	doctor_id int4 NOT NULL,
	point int NOT NULL DEFAULT 0,
	"comment" text NULL,
	CONSTRAINT doctor_reviews_fk FOREIGN KEY (doctor_id) REFERENCES public.doctors(id) ON DELETE CASCADE ON UPDATE CASCADE
);
