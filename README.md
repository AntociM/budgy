# Budgy

Budgy is an interactive front-end website for tracking users' financial data. By default, it loads some test data to demonstrate the website's capabilities. This website is intended to be connected to a database that stores multiple users' information.
![](assets/images/responsive.jpg)

# Table of content 
- [Design Decisions](#design-decisions)
    - [Wireframe](#wireframe)
    - [Design choices](#design-choices)
    - [Color palette](#color-palette)
- [User Experience](#user-experience)
    - [Features](#features)
- [Technologies used](#technologies-used)
- [Testing](#testing)
- [Deployment](#deployment)
    - [Project deployment](#project-deployment)
    - [To fork the repository on GitHub](#to-fork-the-repository-on-github)
    - [To create a local clone of this project](#to-create-a-local-clone-of-this-project)
- [Credits](#credits)
- [Acknowledgements](#acknowledgements)


# Design Decisions
## Wireframe
The Wireframe for Budgy was produced using WireFlow. The wireframe's display is for mobile devices, and the final design has some changes that occurred during the development process.

![](assets/images/wireframe.jpg)

The design is split into three significant parts.
* **dashboard** - this is where the user can see the current balance, monthly and weekly expenses, and set his spending limits on a weekly and monthly basis.
* **entry-form** - this is where the user registers the entries. 
* **entry-area** - this sections displays all the entries. 

## Design choices
Typography: The font chosen is Roboto, sans-serif.

## Color palette
The chosen color scheme is based on blue, green and lighter tones of beige and gray. This palette points the content out and creates a modern aspect for the website. Moreover, blue is traditionally associated with corporate uniformity and professionalism in the business industry.
![](assets/images/color-pallet.jpg)

# User Experience
## Features
Each section has different features designed to make the user experience more enjoyable. 

### Instruction button
When pressed, a modal window will pop up. The modal contains valuable information about the website's elements and expected interaction. 

![](assets/images/instruction-button.jpg)


![](assets/images/modal.jpg)

The modal can be closed using `x-button` or `close-button` from the window. Outside click will also close the information window.

### Dashboard
It is designed to prompt the user with information about balance, weekly and monthly expenses. **Balance** is defined as the sum of all incomes and sutraction of expensen. **Weekly balance** represents the expenses made in the current week, with Monday's first day of the week. **Monthly balance** represents the sum of all expenses in the current month. 
![](assets/images/dashboard-sample.jpg)

The user can set his spending limit on a weekly and monthly basis. When the limit is exceeded, the value associated with it will be displayed in red. Here is an example where the **monthly** limit was exceeded, and the same is true for **weekly** limit as well. 
![](assets/images/dashboard-sample-limit-exceeded.jpg)
The user is allowed to increase the limit. If it is increased above the reported expenses, the red style will dynamically disappear.

This element is designed to allow the user to register entries. It is composed of 5 elements:
* **description** - entry description. The user is expected to briefly describe the type of income or expense, transaction place, or other information. This entry field validates the user's input by ensuring that at least one alphanumeric character is inserted. In case of invalid input, an error message appears to notify the user about the expected input.
* **category** - user can choose from `income, groceries, restaurant, beauty, health, leisure, gifts, transport, hobbies, shopping, bills, loans, housing`. The user's first entry is valid when `Income` is selected. `Income` is defined as the money received, on a regular basis. All the other categories are expenses. To ensure a positive current balance, `Income` comes first. A category is needed for later entry filtering.
* **date** - the date when the entry was processed. Used for later filtering.
* **amount** - entry's amount.
* **button** - the submit button, marked with "+", triggers the form submission.
When the user press submit button, and the entry is processed, the form will be cleared to make room for a new request. 
![](assets/images/entry-form.jpg)

### Entry Area
This element displays all the entries submitted via the form. At this point, it is only for display. The intention is also to provide manipulation over the entries, like filtering capabilities, sorting. 

The entries from **income** category will always be displayed in green to make them more easily noticeable by the user. 
![](assets/images/entry-area.jpg)

### Reset
The website also has a reset button. When this button is pressed, it will clear the dashboard, entry area, and the forms.

![](assets/images/reset.jpg)

# Technologies used

- HTML5 - provides the core structure for the website.
- CSS - styling.
- Bootstrap.
- Luxor library
- JavaScript - used to program the behavior of web page.
- Gitpod - used to deploy the website.
- Github - used to host and edit the website.

# Testing

The HTML and CSS code were tested using [W3C HTML Validator](https://validator.w3.org/), respectively [W3C CSS Validator](https://jigsaw.w3.org/css-validator/). JavaScript code was tested using [JSHint](https://jshint.com/).
A few bugs have been found during the development process, which were corrected.

## HTML result
![](assets/images/html-verification.jpg)

## CSS result
![](assets/images/css-validation.jpg)


## JavaScript result
![](assets/images/js-verification.jpg)


## Responsiveness
The responsiveness was tested using three different tools:
- Chrome Developer Tools
- http://ami.responsivedesign.is/
- https://www.responsivedesignchecker.com/

## Compatibility
The website was tested on Chrome, Edge, Mozilla Firefox. The functionality and appearance remains unchanged between these three on any device size. 

## Lighthouse
This [tool](#https://developers.google.com/web/tools/lighthouse) was used to test the performance and accessibility. It provided useful information to improve accessibility and SEO during the creation process. Here are the final results:
![](assets/images/lighthouse.jpg)

## Fixed Bugs

During the development process, a series of errors pop up. 

The user's ability to add negative values in the Amount form field showed a defensive design. I solved this bug by using `min` and `oninput` attributes for `input`. 

Another error in the same form field was that the user could add only whole numbers. This was solved by setting the `step` input attribute's value to 0.01. Numeric values with two decimal places are allowed. 

The user was able to introduce empty input in `Description` form field. Problem fixed using Bootstrap validation classes `is-valid` and `is-invalid`. At least one alphanumeric character is requested. If not provided, an error message will appear. 

I used 'min' attribute to prevent negative values for `input type="number"` when setting the weekly and monthly limits. 

The current balance was displayed with multiple decimals. This was solved with JavaScript `toFixed()`.

During testing, a functional error emerged when calculating current week expenses. The week number of the year was inaccurate, and expenses were registered from Wednesday until next Tuesday. This bug was fixed in currentWeeklyBalance function by using `DataTime` data structure from Luxon library. Properties `weekNumber` and `weekYear` were used to ensure the correct validation of user input in the week of the corresponding year.






## Known issues
1. Description data input is validated and prompted as invalid while the user is typing, but data is not validated on the `submit` button. The user's input will be reported in the list.

# Deployment

## Project deployment
![](assets/images/deployment.jpg)  
The site was deployed to GitHub pages. The steps to deploy a site are:

1. In the GitHub repository, navigate to the Settings tab.
2. Once in Settings, navigate to the Pages tab on the left-hand side.
3. Under Source, select the branch to master/main, then click save.
4. The page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.
  
## To fork the repository on GitHub
![](assets/images/fork.jpg)  
  A copy of the GitHub Repository can be made by forking the GitHub account. This copy can be viewed, and changes can be made without affecting the original repository. Take the following steps to fork the repository:

  1. Log in to GitHub and locate the repository.
  2. Click on the "Fork" button, located on the right-hand site, to create a copy of the original repository in your GitHub account. 

## To create a local clone of this project
![](assets/images/clone.jpg)  

  Below are the detailed steps:

  1. Under the repository's name, click on the code tab.
  2. In the Clone with HTTPS section, click on the clipboard icon to copy the given URL.
   PRINT

   3. In your IDE of choice, open Git Bash.
   4. Change the current working directory to the location where you want the cloned directory to be made.
   5. Type git clone and paste the URL copied from GitHub.
   6. Press enter and the local clone will be created.

# Credits

- Google Fonts 
- W3 Schools
- [This solution](https://stackoverflow.com/questions/32777184/html-input-for-positive-whole-numbers-only-type-number/32784911?noredirect=1#comment61101594_32784911) was implemented to the Amount field to accept only positive, whole numbers values.
- CSS Tricks
- MDN WEB DOCS 
- coolors.co - used to create color pallet
- Wire Flow Wireframe Design - was used to create the wireframe
- DelftStack (https://www.delftstack.com/howto/javascript/javascript-get-week-number/) - this was used as inspiration to get the current week of the year.
# Acknowledgements
 The site was completed as a Portfolio 2 Project piece for the Full Stack Software Developer (e-Commerce) Diploma at the Code Institute.

The live link to the Github repository can be found here: https://antocim.github.io/budgy/.
