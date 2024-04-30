/* eslint-disable max-len */
import {authenticateToken} from '../middlewares/authentication.mjs';
import {body, param, query} from 'express-validator';
import express from 'express';
import {
  onlyForPatientWhoCompletedSurvey,
  verifyRightToViewPatientsData,
  validationErrorHandler,
  onlyForDoctorHandler,
} from '../middlewares/error-handler.mjs';
import {
  getPatientMonth,
  getPatientDay,
  postEntry,
  getMonth,
  putEntry,
  getDay,
} from '../controllers/entry-controller.mjs';

const entryRouter = express.Router();

/**
 * @apiDefine InvalidEntrySyntax
 * @apiError InvalidEntrySyntax Invalid syntax for postEntry
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": {
 *         "message": "Invalid mood color",
 *         "status": 400
 *         "errors": [
 *             {
 *                "field":"entry_date",
 *                "message":"Date should be in yyyy-mm-dd format"
 *             }
 *         ]
 *       }
 *     }
 */
/**
 * @apiDefine YearNotInReachError
 * @apiError YearNotInReachError Request URL year is out of defined limits
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": {
 *         "message": "Bad Request",
 *         "status": 400
 *         "errors": [
 *             {
 *                "field":"year",
 *                "message":"Only the years between 2020 - 2030 are available"
 *             }
 *         ]
 *       }
 *     }
 */
/**
 * @apiDefine InvalidUrlParameterForEntriesError
 * @apiError InvalidUrlParameterForEntriesError Invalid URL parameter
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": {
 *         "message": "Bad Request",
 *         "status": 400
 *         "errors": [
 *             {
 *                "field":"month",
 *                "message":"Provide a month number"
 *             }
 *         ]
 *       }
 *     }
 */
/**
 * @apiDefine InvalidMoodColorError
 * @apiError InvalidMoodColorError Invalid HEX value in mood_color
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": {
 *         "message": "Invalid mood color",
 *         "status": 400
 *         "errors": "Available HEX values: 9BCF53,FFF67E,FF8585,D9D9D9"
 *            }
 *       }
 *     }
 */
/**
 * @apiDefine ExistingEntryError
 * @apiError ExistingEntryError There already exists entry for the selected date
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "error": {
 *         "message": "There is a existing entry for this date already",
 *         "status": 409
 *         "errors": "One entry per day"
 *            }
 *       }
 *     }
 */
/**
 * @apiDefine NoKubiosDataError
 * @apiError NoKubiosDataError Attempting to access postEntry for a date lacking HRV data.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": {
 *         "message": "No kubios data found",
 *         "status": 400
 *            }
 *       }
 *     }
 */
/**
 * @apiDefine NoEntryToModifyError
 * @apiError NoKubiosDataError Attempting to modify entry that doesnt exist
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": {
 *         "message":  "No entry found with entry_date=2024-01-01",
 *         "status": 404
 *            }
 *       }
 *     }
 */
/**
 * @api {post} api/entries New entry
 * @apiVersion 1.0.0
 * @apiName postEntry
 * @apiGroup Entries
 * @apiPermission onlyPatients
 *
 * @apiDescription Post a new diary entry for a day that contains HRV data
 *
 * @apiParam {Date} Entry_date Entry date in yyyy-mm-dd format
 * @apiParam {String} Mood_color HEX value for color to describe mood: green (9BCF53), yellow (FFF67E), red (FF8585) or gray (D9D9D9)
 * @apiParam {List} Activities List of activities performed that day
 * @apiParam {Text} Notes Brief optional description of the day
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "entry_date": "2024-01-01",
 *      "mood_color": ""
 *      "activities": ['Meditation', 'Listening to music']
 *      "notes": "Started a baking class today!"
 *    }
 *
 * @apiSuccess {String} message Message for successful operation
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *        {
 *           "message": "New entry_id=1"
 *        }
 *
 * @apiUse ExistingEntryError
 * @apiUse InvalidActivityError
 * @apiUse MissingActivitiesListError
 * @apiUse NoKubiosDataError
 * @apiUse InvalidEntrySyntax
 * @apiUse InvalidMoodColorError
 * @apiUse OnlyForPatientsError
 * @apiUse InvalidTokenError
 * @apiUse TokenMissingError
 */
entryRouter
  .route('/')
  .post(
    authenticateToken,
    onlyForPatientWhoCompletedSurvey,
    body('entry_date', 'Date should be in yyyy-mm-dd format').isDate(),
    body('mood_color').isString(),
    body('notes').isString(),
    validationErrorHandler,
    postEntry,
  )
/**
 * @api {put} api/entries Update entry
 * @apiVersion 1.0.0
 * @apiName putEntry
 * @apiGroup Entries
 * @apiPermission onlyPatients
 *
 * @apiDescription Update existing entry for a specific date
 *
 * @apiParam {Date} Entry_date Entry date in yyyy-mm-dd format
 * @apiParam {String} Mood_color HEX value for color to describe mood: green (9BCF53), yellow (FFF67E), red (FF8585) or gray (D9D9D9)
 * @apiParam {List} Activities List of activities performed that day
 * @apiParam {Text} Notes Brief optional description of the day
 *
 * @apiParamExample {json} Request-Example:
 *    {
 *      "entry_date": "2024-01-01",
 *      "mood_color": ""
 *      "activities": ['Meditation', 'Listening to music']
 *      "notes": "Started a baking class today!"
 *    }
 *
 * @apiSuccess {String} message Message for successful operation
 *
 * @apiSuccessExample Success-Response:
 *    HTTP/1.1 200 OK
 *        {
 *           "message": "Entry updated"
 *        }
 *
 *
 * @apiUse NoEntryToModifyError
 * @apiUse InvalidActivityError
 * @apiUse MissingActivitiesListError
 * @apiUse NoKubiosDataError
 * @apiUse InvalidEntrySyntax
 * @apiUse InvalidMoodColorError
 * @apiUse OnlyForPatientsError
 * @apiUse SurveyNotCompletedError
 * @apiUse InvalidTokenError
 * @apiUse TokenMissingError
 */
  .put(
    authenticateToken,
    onlyForPatientWhoCompletedSurvey,
    body('entry_date', 'Date should be in yyyy-mm-dd format').isDate(),
    body('mood_color').isString(),
    body('notes').isString(),
    validationErrorHandler,
    putEntry,
  );
/**
 * @api {put} api/entries/monthly?month=__&year=__ Get month with entries
 * @apiVersion 1.0.0
 * @apiName getMonth
 * @apiGroup Entries
 * @apiPermission onlyPatients
 *
 * @apiDescription Retrieve and append entry data to dates in the chosen month if available
 *
 * @apiParam {Int} Month Month number with leading zero if needed.
 * @apiParam {Int} Year Year between 2020-2030
 *
 * @apiSuccess {Dictionary} Key-value pairs for each date in the selected month, with entry data if available
 *
 * @apiSuccessExample Success-Response containing entries:
 *    HTTP/1.1 200 OK
 *         {
 *             "2024-02-01": {},
 *             "2024-02-02": {},
 *             "2024-02-03": {},
 *              ...
 *             "2024-02-14": {
 *                   "user_id": 1,
 *                    "entry_id": 6,
 *                    "entry_date": "2024-02-14",
 *                    "mood_color": "FFF67E",
 *                    "notes": "Entry for week 7",
 *                    "measurement_id": 6,
 *                    "measurement_date": "2024-02-14",
 *                    "mean_hr_bpm": "71.09",
 *                    "sns_index": "0.62",
 *                    "pns_index": "-0.94",
 *                    "stress_index": "10.67",
 *                    "all_activities": [
 *                              "Hiking",
 *                               "Swimming",
 *                               "Meditation"
 *                     ]
 *              },
 *               ...
 *              "2024-02-29": {}
 *          }
 *
 * @apiSuccessExample Success-Response not containing entries:
 *    HTTP/1.1 200 OK
 *         {
 *             "2024-02-01": {},
 *             "2024-02-02": {},
 *             "2024-02-03": {},
 *               ...
 *              "2024-02-29": {}
 *          }
 *
 * @apiUse YearNotInReachError
 * @apiUse InvalidUrlParameterForEntriesError
 * @apiUse OnlyForPatientsError
 * @apiUse SurveyNotCompletedError
 * @apiUse InvalidTokenError
 * @apiUse TokenMissingError
 */
entryRouter
  .route('/monthly')
  .get(
    authenticateToken,
    onlyForPatientWhoCompletedSurvey,
    query('year', 'Only the years between 2020 - 2030 are available').isInt({
      min: 2020,
      max: 2030,
    }),
    query('month', 'Provide a month number').isInt({min: 1, max: 12}),
    validationErrorHandler,
    getMonth,
  );

entryRouter
  .route('/daily/:entry_date')
  .get(
    authenticateToken,
    onlyForPatientWhoCompletedSurvey,
    param('entry_date', 'Date should be in yyyy-mm-dd format').isDate(),
    validationErrorHandler,
    getDay,
  );
entryRouter
  .route('/doctor/daily/:entry_date/:patient_id')
  .get(
    authenticateToken,
    onlyForDoctorHandler,
    param('patient_id', 'Invalid patient ID').isInt(),
    param('entry_date', 'Entry date should be in yyyy-mm-dd format').isDate(),
    validationErrorHandler,
    verifyRightToViewPatientsData,
    getPatientDay,
  );

entryRouter.route('/doctor/monthly/:patient_id').get(
  authenticateToken,
  onlyForDoctorHandler,
  param('patient_id', 'Invalid patient ID').isInt(),
  query('year', 'Only the years between 2020 - 2030 are available').isInt({
    min: 2020,
    max: 2030,
  }),
  query('month', 'Provide a month number').isInt({min: 1, max: 12}),
  validationErrorHandler,
  verifyRightToViewPatientsData,
  getPatientMonth,
);

export default entryRouter;
