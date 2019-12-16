Hi!

Welcome to the ChanukahClassGift App.

This app was created to help class mothers organize a Chanukah gift for their children's teachers.

It's purpose is to keep track of who contributed and who didn't yet, and who was called or emailed, and who wasn't.
Below I will explain how the app works.

The main page has a table that displays the whole class list, with the parent and contact information.
The students are added to the table by clicking on the 'Add Student' button on the top of the page. That will bring you to a form to fill out about the student. The submit button will be disabled until the required information is filled out.

On the table, aside from displaying the basic information that you entered about each student, there are additional columns:

  -Contribution: displays the contribution amount that the student gave. If the student hasn't yet contributed, it displays a textbox and submit button to add their contribution when they give one. When the submit button is clicked, the table will update with the new information, and the total on top of the table will update as well.
  
 The next few columns are only available if the student has not yet contributed.
 
  -Send Automatic Email: send a scripted email asking the parent for a contribution.
    
  -Record Calls/Email: opens a form where you can log the calls/emails you've made for that specific student. You can enter notes as well - e.g. "left a message on their machine". When the call/email is saved to the database, it will save the current date as well. Here as well, the submit button will be disabled until the required information is filled out (which in this case is just the type - call or email. Notes aren't required).
    
  -View Calls/Emails: displays a table with all the calls and emails that you've made for that student. If there is none, it will show a message that there are none for that student.
    
  **Being that having an email address is optional (as it says on the add-student-form), the automatic email link will not show up if
  there is no email address for that student.
  
Above the table there is a display of the total money collected.

You can also set the view of the table to your preference, using the buttons: view all, view paid, and view unpaid. 

I hope you find everything clear and user-friendly!

https://github.com/ChayalaKaufman/ChanukahClassGift/tree/master/ClassGift.Data - brings you to the the database related code.

https://github.com/ChayalaKaufman/ChanukahClassGift/tree/master/ClassGift.Web/ClientApp/src - the react files

https://github.com/ChayalaKaufman/ChanukahClassGift/blob/master/ClassGift.Web/Controllers/StudentsController.cs - the Controller
