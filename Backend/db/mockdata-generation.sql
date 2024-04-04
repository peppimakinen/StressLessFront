-- Create two patients and two doctors
INSERT INTO Users (username, password, full_name, user_level)
VALUES ('patient1@example.com', 'password1', 'Patient One', 'patient');
INSERT INTO Users (username, password, full_name, user_level)
VALUES ('patient2@example.com', 'password2', 'Patient Two', 'patient');
INSERT INTO Users (username, password, full_name, user_level)
VALUES ('doctor1@example.com', 'password1', 'Doctor One', 'doctor');
INSERT INTO Users (username, password, full_name, user_level)
VALUES ('doctor2@example.com', 'password2', 'Doctor Two', 'doctor');

-- Create Both patients choose doctor2 as their doctor
INSERT INTO DoctorPatient (patient_id, doctor_id)
VALUES (1, 4);
INSERT INTO DoctorPatient (patient_id, doctor_id)
VALUES (2, 4);

-- Simulate 'alkukartoitus'
INSERT INTO Surveys (u_id) VALUES (1);
SET @survey_id_1 = LAST_INSERT_ID();
INSERT INTO Surveys (u_id) VALUES (2);
SET @survey_id_2 = LAST_INSERT_ID();

-- Question 1
INSERT INTO Questions (question, answer) VALUES ('How often do you exercise?', 'User 1: Daily');
SET @question_id = LAST_INSERT_ID();
INSERT INTO SQ (q_id, s_id) VALUES (@question_id, @survey_id_1);
INSERT INTO Questions (question, answer) VALUES ('How often do you exercise?', 'User 2: Weekly');
SET @question_id = LAST_INSERT_ID();
INSERT INTO SQ (q_id, s_id) VALUES (@question_id, @survey_id_2);

-- Question 2
INSERT INTO Questions (question, answer) VALUES ('How many hours do you sleep each night?', 'User 1: 8 hours');
SET @question_id = LAST_INSERT_ID();
INSERT INTO SQ (q_id, s_id) VALUES (@question_id, @survey_id_1);
INSERT INTO Questions (question, answer) VALUES ('How many hours do you sleep each night?', 'User 2: 6 hours');
SET @question_id = LAST_INSERT_ID();
INSERT INTO SQ (q_id, s_id) VALUES (@question_id, @survey_id_2);

-- Question 3
INSERT INTO Questions (question, answer) VALUES ('How many meals do you eat each day?', 'User 1: 3 meals');
SET @question_id = LAST_INSERT_ID();
INSERT INTO SQ (q_id, s_id) VALUES (@question_id, @survey_id_1);
INSERT INTO Questions (question, answer) VALUES ('How many meals do you eat each day?', 'User 2: 4 meals');
SET @question_id = LAST_INSERT_ID();
INSERT INTO SQ (q_id, s_id) VALUES (@question_id, @survey_id_2);

-- Question 4
INSERT INTO Questions (question, answer) VALUES ('Do you smoke?', 'User 1: No');
SET @question_id = LAST_INSERT_ID();
INSERT INTO SQ (q_id, s_id) VALUES (@question_id, @survey_id_1);
INSERT INTO Questions (question, answer) VALUES ('Do you smoke?', 'User 2: Yes');
SET @question_id = LAST_INSERT_ID();
INSERT INTO SQ (q_id, s_id) VALUES (@question_id, @survey_id_2);

-- Question 5
INSERT INTO Questions (question, answer) VALUES ('Do you have any chronic diseases?', 'User 1: No');
SET @question_id = LAST_INSERT_ID();
INSERT INTO SQ (q_id, s_id) VALUES (@question_id, @survey_id_1);
INSERT INTO Questions (question, answer) VALUES ('Do you have any chronic diseases?', 'User 2: Yes');
SET @question_id = LAST_INSERT_ID();
INSERT INTO SQ (q_id, s_id) VALUES (@question_id, @survey_id_2);


-- Diary entries for user_id = 1
INSERT INTO DiaryEntries (user_id, entry_date, mood_color, notes)
VALUES (1, '2024-04-01', 'Green', 'Feeling good today.');

INSERT INTO DiaryEntries (user_id, entry_date, mood_color, notes)
VALUES (1, '2024-04-02', 'Yellow', 'Feeling okay.');

INSERT INTO DiaryEntries (user_id, entry_date, mood_color, notes)
VALUES (1, '2024-04-03', 'Red', 'Not feeling well.');

-- Diary entries for user_id = 2
INSERT INTO DiaryEntries (user_id, entry_date, mood_color, notes)
VALUES (2, '2024-04-01', 'Green', 'Feeling great.');

INSERT INTO DiaryEntries (user_id, entry_date, mood_color, notes)
VALUES (2, '2024-04-02', 'Yellow', 'Feeling so-so.');

INSERT INTO DiaryEntries (user_id, entry_date, mood_color, notes)
VALUES (2, '2024-04-03', 'Red', 'Feeling bad.');

-- Measurements for user_id = 1
INSERT INTO Measurements (kubios_result_id, measurement_date, artefact_level, lf_power, lf_power_nu, hf_power, hf_power_nu, tot_power, mean_hr_bpm, mean_rr_ms, rmssd_ms, sd1_ms, sd2_ms, sdnn_ms, sns_index, pns_index, stress_index, respiratory_rate, user_readiness, user_recovery, user_happines, result_type)
VALUES ('result1-aaa', '2024-04-01', 'user1_GOOD', 111, 112, 113, 114, 115, 116, 117, 118, 119, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 'user-1 readiness_1');

INSERT INTO Measurements (kubios_result_id, measurement_date, artefact_level, lf_power, lf_power_nu, hf_power, hf_power_nu, tot_power, mean_hr_bpm, mean_rr_ms, rmssd_ms, sd1_ms, sd2_ms, sdnn_ms, sns_index, pns_index, stress_index, respiratory_rate, user_readiness, user_recovery, user_happines, result_type)
VALUES ('result2-bbb', '2024-04-02', 'user1_ok', 121, 122, 123, 124, 125, 126, 127, 128, 129, 1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029, 'user-1 readiness_2');

INSERT INTO Measurements (kubios_result_id, measurement_date, artefact_level, lf_power, lf_power_nu, hf_power, hf_power_nu, tot_power, mean_hr_bpm, mean_rr_ms, rmssd_ms, sd1_ms, sd2_ms, sdnn_ms, sns_index, pns_index, stress_index, respiratory_rate, user_readiness, user_recovery, user_happines, result_type)
VALUES ('result3-ccc', '2024-04-03', 'user1_bad', 131, 132, 133, 134, 135, 136, 137, 138, 139, 1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039, 'user-1 readiness_3');

-- Measurements for user_id = 2
INSERT INTO Measurements (kubios_result_id, measurement_date, artefact_level, lf_power, lf_power_nu, hf_power, hf_power_nu, tot_power, mean_hr_bpm, mean_rr_ms, rmssd_ms, sd1_ms, sd2_ms, sdnn_ms, sns_index, pns_index, stress_index, respiratory_rate, user_readiness, user_recovery, user_happines, result_type)
VALUES ('result4-ddd', '2024-04-01', 'user2_GOOD', 211, 212, 213, 214, 215, 216, 217, 218, 219, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 'user-2-readiness_1');

INSERT INTO Measurements (kubios_result_id, measurement_date, artefact_level, lf_power, lf_power_nu, hf_power, hf_power_nu, tot_power, mean_hr_bpm, mean_rr_ms, rmssd_ms, sd1_ms, sd2_ms, sdnn_ms, sns_index, pns_index, stress_index, respiratory_rate, user_readiness, user_recovery, user_happines, result_type)
VALUES ('result5-eee', '2024-04-02', 'user2_ok', 221, 222, 223, 224, 225, 226, 227, 228, 229, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 'user-2-readiness_2');

INSERT INTO Measurements (kubios_result_id, measurement_date, artefact_level, lf_power, lf_power_nu, hf_power, hf_power_nu, tot_power, mean_hr_bpm, mean_rr_ms, rmssd_ms, sd1_ms, sd2_ms, sdnn_ms, sns_index, pns_index, stress_index, respiratory_rate, user_readiness, user_recovery, user_happines, result_type)
VALUES ('result6-fff', '2024-04-03', 'user2_bad', 231, 232, 233, 234, 235, 236, 237, 238, 239, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 'user-2-readiness_3');
