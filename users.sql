INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('nadRef', 2, 'Milos', 'Petrovic', 'nadRef@gmail.com', 'test');
    
INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('doktorant1', 2, 'Doktor1', 'Doktoric1', 'strile93@hotmail.com', 'test');
    
INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('sefKatedre', 2, 'Dragan', 'Dobric', 'sefKat@gmail.com', 'test');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('dekanFTN', 2, 'Rade', 'Doroslovacki', 'radeDoros@gmail.com', 'test');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('dekanPMF', 2, 'Milica', 'Pavkov', 'milicaPavkov@gmail.com', 'test');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('dekanPravni', 2, 'Ljubomir', 'Stajic', 'ljubmirStajic@gmail.com', 'test');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('ftnProfesor1', 2, 'Djordje', 'Dragic', 'djole@gmail.com', 'test');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('ftnProfesor2', 2, 'Petar', 'Misic', 'pera@gmail.com', 'test');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('ftnProfesor3', 2, 'Ivan', 'Simic', 'ivan@gmail.com', 'test');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('ftnProfesor4', 2, 'Nenad', 'Simovic', 'nenad@gmail.com', 'test');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('ftnProfesor5', 2, 'Bosko', 'Dragic', 'bole@gmail.com', 'test');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('ftnProfesor6', 2, 'Dragan', 'Petrovic', 'dragan@gmail.com', 'test');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('pmfProfesor1', 2, 'Zivan', 'Simic', 'zika@gmail.com', 'test');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('pmfProfesor2', 2, 'Stefan', 'Obradovic', 'stefan@gmail.com', 'test');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('pmfProfesor3', 2, 'Denes', 'Nadj', 'denesn@gmail.com', 'test');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('doktorant2', 2, 'Doktor2', 'Doktoric2', 'strile93@hotmail.com', 'test');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('doktorant3', 2, 'Doktor3', 'Doktor3', 'strile93@hotmail.com', 'test');

----------------------------------------------------------------------------------------------------

﻿INSERT INTO act_id_group(
            id_, rev_, name_)
    VALUES ('komisija_ocena_odbrana', 1, 'Komisija za ocenu i odbranu');
    
INSERT INTO act_id_group(
            id_, rev_, name_)
    VALUES ('univerzitet', 1, 'Univerzitet');

INSERT INTO act_id_group(
            id_, rev_, name_)
    VALUES ('nastNaucno', 1, 'Nastavno-naucno vece');

INSERT INTO act_id_group(
            id_, rev_, name_)
    VALUES ('komisija_podobnost_teme', 1, 'Komisija za podobnost teme');

INSERT INTO act_id_group(
            id_, rev_, name_)
    VALUES ('ftn', 1, 'FTN');

INSERT INTO act_id_group(
            id_, rev_, name_)
    VALUES ('pmf', 1, 'PMF');

INSERT INTO act_id_group(
            id_, rev_, name_)
    VALUES ('studenti_doktorskih_studija', 1, 'Studenti doktorskih studija');

INSERT INTO act_id_group(
            id_, rev_, name_)
    VALUES ('vece_studijskog_programa', 1, 'Vece studijskog programa');

INSERT INTO act_id_group(
            id_, rev_, name_)
    VALUES ('profesoriFTN', 1, 'FTN profesori');

INSERT INTO act_id_group(
            id_, rev_, name_)
    VALUES ('profesoriPMF', 1, 'PMF profesori');    

------------------------------------------------------------------------------------------------------

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('dekanFTN', 'ftn');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('dekanFTN', 'univerzitet');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('dekanPMF', 'univerzitet');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('dekanPravni', 'univerzitet');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('doktorant1', 'ftn');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('doktorant2', 'ftn');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('doktorant3', 'ftn');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor1', 'ftn');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor1', 'nastNaucno');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor2', 'ftn');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor2', 'nastNaucno');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor4', 'nastNaucno');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('dekanPMF', 'pmf');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('pmfProfesor1', 'pmf');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('pmfProfesor2', 'pmf');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('pmfProfesor3', 'pmf');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('doktorant1', 'studenti_doktorskih_studija');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('doktorant2', 'studenti_doktorskih_studija');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('doktorant3', 'studenti_doktorskih_studija');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor1', 'profesoriFTN');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor2', 'profesoriFTN');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor3', 'profesoriFTN');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor4', 'profesoriFTN');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor5', 'profesoriFTN');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor6', 'profesoriFTN');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('pmfProfesor1', 'profesoriPMF');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('pmfProfesor2', 'profesoriPMF');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('pmfProfesor3', 'profesoriPMF');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor3', 'vece_studijskog_programa');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor5', 'vece_studijskog_programa');












