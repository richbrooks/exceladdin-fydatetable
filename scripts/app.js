/* initialization
****************************************************************************************/

"use strict"; // ( http://msdn.microsoft.com/en-us/library/ie/br230269(v=vs.94).aspx )


/* Namespace management
****************************************************************************************/

window.StefanJohansson = window.StefanJohansson || {};
StefanJohansson.CTD = StefanJohansson.CTD || {};


StefanJohansson.CTD = function () {



    /* global variables: 
    ***************************************************************************************/

    //Default language (English)
    var locale = '1033';
    var separator = ',';
    var separatorIdentified = false;
    var weekStartsOn = 1;
    // var weekNumberType = 0;
    // var createHeaders = true;
    // var includeColumns = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];

    //available languages, numbering is Microsoft official (http://msdn.microsoft.com/en-us/goglobal/bb964664.aspx)

    var localeData = [
        { text: "English", value: "1033" },
        { text: "Czech - Čeština", value: "1029" },
        { text: "Dutch - Nederlands", value: "1043" },
        { text: "French - Français", value: "1036" },
        { text: "Swedish - Svenska", value: "1053" }
    ];

    var separatorData = [
        { text: " , Comma (US)", value: "," },
        { text: " ; Semicolon (Sweden)", value: ";" }
    ];


    //Weekdays in DropDown Week Starts on
    var weekStartsOnData = [
        { text: "Sunday", value: "0" },
        { text: "Monday", value: "1" },

    ];

    //Week number type in DropDown Week Starts on
    var weekNumberTypeData = [
        { text: "1 - Sunday", value: "1" },
        { text: "2 - Monday", value: "2" },
        { text: "11 - Monday", value: "11" },
        { text: "12 - Tuesday", value: "12" },
        { text: "13 - Wednesday", value: "13" },
        { text: "14 - Thursday", value: "14" },
        { text: "15 - Friday", value: "15" },
        { text: "16 - Saturday", value: "16" },
        { text: "17 - Sunday", value: "17" },
        { text: "21 - Monday (ISO 8601)", value: "21" },
    ];

    // Kendo Validator var
    var validator;


    /* language specific text strings to use
    ****************************************************************************************/
    //Language Specific Header strings

    //Czech, 1029:
    var cz_CZ_TableHeaders = [['ID', 'DatumID', 'Datum', 'Datum (textové)', 'Rok', 'Měsíc', 'Den', 'Měsíc (název)', 'Měsíc (krátký název)', 'Den (název)', 'Den (krátký název)', 'Den v týdnu', 'Kvartál', 'Kvartál (formátovaný)', 'Den v roce', 'Týden', 'Týden (formátovaný)']];
    // Dutch, 1043
    var du_NL_TableHeaders =  [['id', 'DatumId', 'Datum', 'Datum Als Tekst', 'Jaar', 'Maand', 'Dag', 'Maand Naam', 'Maand Naam (Kort)', 'Weekdag', 'Weekdag (Kort)', 'Dag van de Week', 'Kwartaal', 'Kwartaal Als Tekst', 'Dag van Jaar', 'Week Nummer', 'Week Nummer Als Tekst']];
    //English, 1033:
    var en_US_TableHeaders = [['id', 'DateId', 'Date', 'Local Date String', 'Year', 'Month', 'Day', 'Month Name', 'Month Name (Short)', 'Weekday', 'Weekday (Short)', 'Day of Week', 'Quarter', 'Quarter (format)', 'Day Of Year', 'Week Number', 'Week Number (Format)']];
    //French, 1036:
    var fr_FR_TableHeaders = [['id', 'DateId', 'Date', 'Local Date String', 'Année', 'Mois', 'Jour', 'Nom Mois', 'Nom Mois (abrégé)', 'Jour de la semaine', 'Jour de la semaine (abrégé)', 'Jour de la semaine (nombre)', 'Trimestre', 'Trimestre (format)', 'Jour dans l\'année', 'Numéro de semaine', 'Numéro de semaine (format)']];
    //Swedish, 1053:
    var sv_SE_TableHeaders = [['id', 'DatumId', 'Datum', 'Lokalt Datum (sträng)', 'År', 'Månad', 'Dag', 'Månadsnamn', 'Månadsnamn (Kort)', 'Veckodag', 'Veckodag (Kort)', 'Dag i vecka (nr)', 'Kvartal', 'Kvartal (formaterad)', 'Årsdag', 'Veckonummer', 'Veckonummer (format)']];

    //defaults and non language specifics
    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var abbrDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var abbrMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var quarter = ['1', '1', '1', '2', '2', '2', '3', '3', '3', '4', '4', '4'];

    // Czech, 1029
    var cz_CZ_dayNames = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];
    var cz_CZ_abbrDayNames = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'];
    var cz_CZ_monthNames = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
    var cz_CZ_abbrMonthNames = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];


    // Dutch - Netherlands, 1043 
    var du_NL_dayNames = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
    var du_NL_abbrDayNames = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
    var du_NL_monthNames = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
    var du_NL_abbrMonthNames = ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];

    // English (US), 1033
    var en_US_dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var en_US_abbrDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var en_US_monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var en_US_abbrMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // French, 1036
    var fr_FR_dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    var fr_FR_abbrDayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    var fr_FR_monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    var fr_FR_abbrMonthNames = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Jui', 'Aou', 'Sept', 'Oct', 'Nov', 'Dec'];

    // Swedish, 1053
    var sv_SE_dayNames = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
    var sv_SE_abbrDayNames = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'];
    var sv_SE_monthNames = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];
    var sv_SE_abbrMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];

    //Used by GA
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-33046231-4']);
    _gaq.push(['_trackPageview']);

    // This function is run when the app is ready to start interacting with the host application
    // It ensures the DOM is ready before adding click handlers to buttons
    Office.initialize = function (reason) {
        $(document).ready(function () {

            //Initialize
            initKendo();
            initGA();

            // If setSelectedDataAsync method is supported by the host application 
            // setDatabtn is hooked up to call the method else setDatabtn is removed
            if (Office.context.document.setSelectedDataAsync) {
                $('#setDataBtn').click(function () { setData(); });
            }
            else {
                // Display error message
                writeFeedback('An error occured connecting to Excel, app failure =( Please contact the author', 'failure');
                //remove button
                $('#setDataBtn').remove();
            }
        });
    };

    /* Events
    ***********************************************************************************************/

    //user has updated the locale choice, update var
    function onLocaleChange() {
        locale = document.getElementById('locale').value;
    }

    function onSeparatorChange() {
        separator = document.getElementById('argumentseparator').value;
    }

    //user has updated the week starts on choice, update var
    function onWeekStartChange() {
        weekStartsOn = document.getElementById('weekstartson').value;
    }

    //user has updated the week number type on choice, update var
    function onWeekNumberTypeChange() {
        weekNumberType = document.getElementById('weeknumbertype').value;
    }
    
    /* Helper Functions
    ***************************************************************************************************/

    //Initialize Google Analytics
    function initGA() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    }

    //Initialize Kendo components
    function initKendo() {

        // date pickers for start and end date
        $('#startDatePicker').kendoDatePicker({
            // set the start date to 1/1 2 years back
            value: '1/1/' + (new Date().getFullYear() - 2).toString()
        });

        $('#endDatePicker').kendoDatePicker({
            // set the start date to 12/31 next year
            value: '12/31/' + (new Date().getFullYear() + 1).toString()
        });


        // locale choice
        $("#locale").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: localeData,
            index: 1,
            change: onLocaleChange
        });
        /*
            // argument separator choice
            $("#argumentseparator").kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: separatorData,
                index: 0,
                change: onSeparatorChange
            });
            */

        /*
        //week numbering type
        $("#weeknumbertype").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: weekNumberTypeData,
            index: 0,
            change: onWeekNumberTypeChange
        });
        */

        //week number type, not used atm
        //$("#weeknumbertype").data('kendoDropDownList').value('21');

        //Week Starts on this day
        $("#weekstartson").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: weekStartsOnData,
            index: 0,
            change: onWeekStartChange
        });

        $("#idstartsfrom").kendoNumericTextBox({
            decimals: 0,
            format: '#',
            placeholder: "Enter A Value",
            spinners: false
        });


        /* Validators */
        validator = $("#main").kendoValidator().data("kendoValidator");

    }

    //Function returns day no of year from parameter date
    function getDayOfYear(date) {
        var tmpDate = new Date(date);
        var tmpStartDate = new Date("1/1/" + tmpDate.getFullYear());
        return Math.floor((tmpDate.getTime() - tmpStartDate.getTime()) / 86400000) + 1;
    };

    //Function returns short day name from parameter date
    function getAbbrDayName(date) {

        var weekday = new Date(date).getDay();

        switch (locale) {

            //Czech 
            case '1029':
                return cz_CZ_abbrDayNames[weekday];
                break;

            //Dutch 
            case '1043':
                return du_NL_abbrDayNames[weekday];
                break;

                //English
            case '1033':
                return en_US_abbrDayNames[weekday];
                break;

                //French
            case '1036':
                return fr_FR_abbrDayNames[weekday];
                break;

                //Swedish
            case '1053':
                return sv_SE_abbrDayNames[weekday];
                break;

            default:
                return en_US_abbrDayNames[weekday];
                break;
        }

    }

    //function returns long day name from parameter date
    function getDayName(date) {

        var weekdayNo = new Date(date).getDay();

        switch (locale) {

            //Czech
            case '1029':
                return cz_CZ_dayNames[weekdayNo];
                break;

            //Dutch
            case '1043':
                return du_NL_dayNames[weekdayNo];
                break;

                //English
            case '1033':
                return en_US_dayNames[weekdayNo];
                break;

                //French
            case '1036':
                return fr_FR_dayNames[weekdayNo];
                break;

                //Swedish
            case '1053':
                return sv_SE_dayNames[weekdayNo];
                break;

            default:
                return en_US_dayNames[weekdayNo];
                break;
        }

    }

    //Function returns short day name from parameter date
    function getAbbrMonthName(date) {

        var month = new Date(date).getMonth();

        switch (locale) {

            //Czech
            case '1029':
                return cz_CZ_abbrMonthNames[month];
                break;

            //Dutch
            case '1043':
                return du_NL_abbrMonthNames[month];
                break;

                //English
            case '1033':
                return en_US_abbrMonthNames[month];
                break;

                //French
            case '1036':
                return fr_FR_abbrMonthNames[month];
                break;

                //Swedish
            case '1053':
                return sv_SE_abbrMonthNames[month];
                break;

            default:
                return en_US_abbrMonthNames[month];
                break;
        }

    }

    //function returns long day name from parameter date
    function getMonthName(date) {

        var monthNo = new Date(date).getMonth();

        switch (locale) {

            //Czech
            case '1029':
                return cz_CZ_monthNames[monthNo];
                break;

            //Dutch
            case '1043':
                return du_NL_monthNames[monthNo];
                break;

                //English
            case '1033':
                return en_US_monthNames[monthNo];
                break;

                //French
            case '1036':
                return fr_FR_monthNames[monthNo];
                break;

                //Swedish
            case '1053':
                return sv_SE_monthNames[monthNo];
                break;

            default:
                return en_US_monthNames[monthNo];
                break;
        }

    }


    //function returns headers for table based on global var
    function getHeaders() {

        switch (locale) {

            //Dutch
            case '1029':
                return cz_CZ_TableHeaders;
                break;

            //Dutch
            case '1043':
                return du_NL_TableHeaders;
                break;

                //English
            case '1033':
                return en_US_TableHeaders;
                break;

                //French
            case '1036':
                return fr_FR_TableHeaders;
                break;

                //Swedish
            case '1053':
                return sv_SE_TableHeaders;
                break;

            default:
                return en_US_TableHeaders;
                break;
        }
    }

    // action button clicked to insert table data in Excel sheet
    function setData() {

        //track usage
        _gaq.push(['_trackEvent', 'TimeDimension v3', 'InsertStart'])

        if (!validator.validate()) {
            writeFeedback("Please check input values", 'failure');
        } else {
            /*
            //erase current cell
            Office.context.document.setSelectedDataAsync('', function (asyncResultEmpty) {
                if (asyncResultEmpty.status === "failed") {
                    writeFeedback('Error: ' + asyncResult.error.message, 'failure');
                }
            });
    
            // Elaborate test to test for list separator
            Office.context.document.setSelectedDataAsync('=Weeknum(\"2012-01-01\",1)', function (asyncResulttest1) {
                if (asyncResulttest1.status === "failed") {
                    //anv inte , som separerare, testa ;
                }
                else {
                    separator = ',';
                    separatorIdentified = true;
                }
            });
    
            //erase current cell
            Office.context.document.setSelectedDataAsync('', function (asyncResultEmpty) {
                if (asyncResultEmpty.status === "failed") {
                    writeFeedback('Error: ' + asyncResult.error.message, 'failure');
                }
            });
    
            Office.context.document.setSelectedDataAsync('=Weeknum(\"2012-01-01\";1)', function (asyncResulttest2) {
                if (asyncResulttest2.status === "failed") {
                    //separator = 'unknown';
                }
                else {
                    separator = ';';
                    separatorIdentified = true;
                }
            });
            */
            /*
            if (!separatorIdentified) {
                separator = 'unknown';
            }
            */

            //writeFeedback('separator: ' + separator, 'information');

            //test to read from cell
            /*     Office.context.document.getSelectedDataAsync("matrix", function (asyncResult) {
                     if (asyncResult.status === "failed") {
                         writeFeedback('Error: ' + asyncResult.error.message);
                     }
                     else {
                         writeFeedback('Selected data: ' + asyncResult.value);
                     }
                 });
                 */
            //display cell value 
            /*
            //erase current cell
            Office.context.document.setSelectedDataAsync('', function (asyncResultEmpty) {
                if (asyncResultEmpty.status === "failed") {
                    writeFeedback('Error: ' + asyncResult.error.message, 'failure');
                }
            });
    
            */

            //Write working message...
            writeFeedback('Working...', 'working');

            //Get date information from date pickers in task pane
            var startDate = new Date(document.getElementById('startDatePicker').value);
            var endDate = new Date(document.getElementById('endDatePicker').value);

            //try to parse int from id field.
            var idNo = parseInt(document.getElementById('idstartsfrom').value) || 1; // Startnumber for id column, if unable to convert to int, use 1 as value.


            //Stores the table data to be inserted into Excel
            var tableData = new Office.TableData();

            //Create Table Headers in local language
            tableData.headers = getHeaders();

            //initialize the rows object with correct number of columns/currect array length and remove the temporary row data...
            tableData.rows = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'];
            tableData.rows.pop();

            //if we have a date range to populate the table with
            if (startDate < endDate) {
                var currentDate = new Date(startDate); // iterate through the dates using this
                var dayOfMonth; // calculate the day number of the month
                var i = 0; // iterator

                //iterate through all dates and populate our table
                while (currentDate <= endDate) {
                    var iteratedDate = new Date(currentDate);

                    //create data tabe row
                    tableData.rows.push([
                        idNo,                                               // 1 - id (1..x)
                        getDateInt(currentDate),                            // 2 - date as int (20010131)
                        iteratedDate,                                       // 3 - date (2001-01-31)
                        currentDate.toLocaleDateString(),                   // 4 - local datestring
                        currentDate.getFullYear(),                          // 5 - Year (2012)
                        currentDate.getMonth() + 1,                         // 6 - Month number (1-12)
                        currentDate.getDate(),                              // 7 - day in month (1-31)
                        getMonthName(currentDate),                          // 8 - weekday name (Monday)
                        getAbbrMonthName(currentDate),                      // 9 - weekday name short (Mon)
                        getDayName(currentDate),                            // 10 - weekday name (Monday)
                        getAbbrDayName(currentDate),                        // 11 - weekday name short (Mon)
                        getDayNumberofWeek(currentDate),                    // 12 - Day in week as no (1-7)
                        quarter[currentDate.getMonth()],                    // 13 - Quarter (1-4)
                        'Q' + quarter[currentDate.getMonth()],              // 14 - Quarter formatted with initial Q
                        getDayOfYear(currentDate),                          // 15 - number of day in year (1-365)
                        $.datepicker.iso8601Week(currentDate),              // 16 - week number ISO8601 format
                        'W' + $.datepicker.iso8601Week(currentDate)         // 17 - week number ISO8601 format
                    ]);

                    //update counters
                    idNo++;
                    dayOfMonth = currentDate.getDate();
                    currentDate.setDate(dayOfMonth + 1);
                    i++;
                }
            }

            Office.context.document.setSelectedDataAsync(tableData,
                function (result) {
                    var error = result.error;
                    var status = result.status;
                    if (result.status === 'failed') {
                        writeFeedback(error.name + ": " + error.message, 'failure');
                    }
                    else {
                        writeFeedback(status, 'success');
                    }
                });
        }
    }

    function getDateInt(date) {
        var theDate = new Date(date);
        return theDate.getFullYear()
                 + ('0' + (theDate.getMonth() + 1)).slice(-2)
            + ('0' + theDate.getDate()).slice(-2)
    }

    // Function that writes to a div with id='message' on the page.
    function writeFeedback(message, icon) {
        // set background and icon based on icon param
        switch (icon) {
            case 'working':
                document.getElementById('feedbackdialog-icon').className = '';
                document.getElementById('feedbackdialog').className = 'feedback-dialog-working';
                break;

            case 'success':
                document.getElementById('feedbackdialog').className = 'feedback-dialog-success';
                document.getElementById('feedbackdialog-icon').className = 'ui-icon ui-icon-check';
                break;

            case 'information':
                document.getElementById('feedbackdialog').className = 'feedback-dialog-neutral';
                document.getElementById('feedbackdialog-icon').className = 'ui-icon ui-icon-info';
                break;

            case 'failure':
                document.getElementById('feedbackdialog').className = 'feedback-dialog-failure';
                document.getElementById('feedbackdialog-icon').className = 'ui-icon ui-icon-alert';
                break;

            default:
                //unknown thingie happened
                document.getElementById('feedbackdialog').className = 'feedback-dialog-neutral';
                document.getElementById('feedbackdialog-icon').className = 'ui-icon ui-icon-info';
                break;
        }
        //write message:
        document.getElementById('feedbackdialog-message').innerText = $.trim(message);

        //center and adjust position of feedback information
        $("#feedbackdialog-icon").position({
            my: "center center",
            at: "left+24 center",
            of: "#feedbackdialog"
        });

        $("#feedbackdialog-message").position({
            my: "left center",
            at: "left+60 center+8",
            of: "#feedbackdialog"
        });
        $("#feedbackdialog-message").width($("#feedbackdialog").width() - 62);

    }

    function getDayNumberofWeek(date) {
        var theDate = new Date(date);
        var returnValue;
        var WeekStartsOnNumber = document.getElementById('weekstartson').value;
        switch (WeekStartsOnNumber) {
            case '0': // Sunday
                returnValue = theDate.getDay() + 1;
                break;

            case '1': // Monday
                returnValue = theDate.getDay();
                if (returnValue == '0') {
                    returnValue = 7;
                }
                break;

        }
        return returnValue;
    }
}();
