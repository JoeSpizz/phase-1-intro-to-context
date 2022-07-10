// Your code here
// takes an Array with name, title and pay and create an object with info
// plus clock in and out keys

function createEmployeeRecord(empArray){
let [firstName, familyName, title, payPerHour, timeInEvents, timeOutEvents]= empArray;
let empObj = {firstName, familyName, title, payPerHour, timeInEvents, timeOutEvents}
empObj.timeInEvents = []
empObj.timeOutEvents = []
return empObj
}
// turns an array of employee data into an array of employee Objects using
// 'createEmployeeRecord' function
 function createEmployeeRecords(employeesArray){
    return employeesArray.map((nestedempArray)=>createEmployeeRecord(nestedempArray));
         };

function createTimeInEvent(empObj, timeInStamp) {
    let punchEvent = {}
    punchEvent.type = "TimeIn"
    let [date, hour] = timeInStamp.split(" ")
    punchEvent.hour = parseInt(hour)
    punchEvent.date = date
    empObj.timeInEvents.push(punchEvent)
    return empObj
}

function createTimeOutEvent(empObj, timeOutStamp) {
    let punchEvent = {}
    punchEvent.type = "TimeOut"
    let [date, hour] = timeOutStamp.split(" ")
    punchEvent.hour = parseInt(hour)
    punchEvent.date = date
    empObj.timeOutEvents.push(punchEvent)
    return empObj
}

function hoursWorkedOnDate (empObj, givenDate) {
    let punchDateArray= empObj.timeInEvents;
    for (let i = 0; i <= punchDateArray.length; i++){
        if (empObj.timeOutEvents[i].date === givenDate){
            return (empObj.timeOutEvents[i].hour - empObj.timeInEvents[i].hour)/100
        }
    }; 
}
// when given a date, search through all elements of empObj.timeInEvents array
// for the key 'date' and compare it to parameter date. 
// If date exists, subtract time out from time in, divide by 100

function wagesEarnedOnDate (empObj, date){
 let hoursWorked = hoursWorkedOnDate(empObj, date)
 let empPay = hoursWorked * empObj.payPerHour
 return empPay 
}


function allWagesFor(obj) {
    let wages = obj.timeInEvents
      .map((element) => wagesEarnedOnDate(obj, element.date))
      .reduce((a, b) => a + b, 0);
      return wages
}

function calculatePayroll (arrayOfEmps){
let sumOfPay = arrayOfEmps.map(e=> allWagesFor(e)).reduce((a,b)=> a+b, 0)
    return sumOfPay
}
// Argument(s)
// Array of employee records
// Returns
// Sum of pay owed to all employees for all dates, as a number
// Behavior
// Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number