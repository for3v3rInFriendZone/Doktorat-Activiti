INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('nadRef', 2, 'Milos', 'Petrovic', 'nadRef@gmail.com', 'nadRef');
    
INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('doktorant1', 2, 'Doktor1', 'Doktoric1', 'doktor1@gmail.com', 'doktorant1');
    
INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('sefKatedre', 2, 'sefKatedre', 'sefKatedre', 'sefKat@gmail.com', 'sefKatedre');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('dekan', 2, 'Rade', 'Doroslovacki', 'radeDoros@gmail.com', 'dekan');
    
INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('mentor', 2, 'Moma', 'Mentor', 'moma@gmail.com', 'mentor');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('ftnProfesor1', 2, 'Djordje', 'Dragic', 'djole@gmail.com', 'ftnProfesor1');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('ftnProfesor2', 2, 'Petar', 'Misic', 'pera@gmail.com', 'ftnProfesor2');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('ftnProfesor3', 2, 'Ivan', 'Simic', 'ivan@gmail.com', 'ftnProfesor3');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('ftnProfesor4', 2, 'Nenad', 'Simovic', 'nenad@gmail.com', 'ftnProfesor4');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('ftnProfesor5', 2, 'Bosko', 'Dragic', 'bole@gmail.com', 'ftnProfesor5');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('ftnProfesor6', 2, 'Dragan', 'Petrovic', 'dragan@gmail.com', 'ftnProfesor6');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('pmfProfesor1', 2, 'Zivan', 'Simic', 'zika@gmail.com', 'pmfProfesor1');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('pmfProfesor2', 2, 'Stefan', 'Obradovic', 'stefan@gmail.com', 'pmfProfesor2');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('etfProfesor1', 2, 'Denes', 'Nadj', 'denesn@gmail.com', 'etfProfesor1');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('doktorant2', 2, 'Doktor2', 'Doktoric2', 'doktor2@gmail.com', 'doktorant2');

INSERT INTO act_id_user(
            id_, rev_, first_, last_, email_, pwd_)
    VALUES ('doktorant3', 2, 'Doktor3', 'Doktor3', 'doktor3@gmail.com', 'doktorant3');

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
    VALUES ('etf', 1, 'ETF');
INSERT INTO act_id_group(
            id_, rev_, name_)
    VALUES ('studenti_doktorskih_studija', 1, 'Studenti doktorskih studija');

INSERT INTO act_id_group(
            id_, rev_, name_)
    VALUES ('profesoriFtn', 1, 'FTN profesori');

------------------------------------------------------------------------------------------------------

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('dekan', 'ftn');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('dekan', 'univerzitet');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('dekan', 'nastNaucno');

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
    VALUES ('ftnProfesor1', 'univerzitet');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor1', 'nastNaucno');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor2', 'ftn');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor2', 'univerzitet');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor2', 'nastNaucno');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('mentor', 'univerzitet');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('mentor', 'ftn');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('pmfProfesor1', 'univerzitet');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('pmfProfesor1', 'pmf');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('pmfProfesor2', 'univerzitet');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('pmfProfesor2', 'pmf');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('etfProfesor1', 'etf');

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
    VALUES ('ftnProfesor1', 'profesoriFtn');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor2', 'profesoriFtn');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor3', 'profesoriFtn');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor4', 'profesoriFtn');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor5', 'profesoriFtn');

INSERT INTO public.act_id_membership(
            user_id_, group_id_)
    VALUES ('ftnProfesor6', 'profesoriFtn');













