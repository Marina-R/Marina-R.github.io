# Kiddie Journal

## Description

Life is amazing! Every day brings us new adventure, new memories and feelings. There is always something incredible about every moment. And sometimes we want this moment to stay with us through all our life. Even moments that don’t seem happy can be looked upon as something that you might miss someday. 

I am a mother and know how it is important to save those precious moments about a child in the memory. From helpless newborn to active toddler: it takes just 12 short months for your baby to undergo this incredible transformation. Babies grow and change at an astounding pace, and every month brings new and exciting developments. First smile, first teeth, first real food experience, first illness, first word... So many things you want to remember! 

Would not it be great to have a helper which could hold all the information about your baby growth, about your first experiences as a parent? I remember myself, taking notes about my baby somewhere on the pieces of paper, in notebooks and holding pictures on different devices... I really needed that type of app to organize all my toughts and memories in one place, but it was not yet created in Ukraine those days. 

Today I want to help other newly moms to save and store those memories. 

What I actually want to create is an app, where you could write a diary about your baby, store all the pictures and videos classified by date, put monthly notes about your baby's weight, height etc so you can later see the your child growth dynamic through the chart, make notes on your baby's illnesses and how you handled them, and some other features that might help newly parents to save memories about their little ones.  

## User Stories

https://trello.com/b/gcBOllH5/baby-moments-marina

## Wireframes

https://ameli.mybalsamiq.com/projects/marina-final/edit

## Models

* **User**
  - id 
  - name
  - email 
  - password

* **Child**
  - id
  - userId
  - name
  - gender
  - DOB / date
  - TimeOB / time
  - eye color
  - avatarUrl
  
* **Diary post**
  - id
  - userId
  - title
  - body

* **Photo**
  - id
  - userId
  - url
  - title
  - caption
  - createdAt /date

* **Video**
  - id
  - userId
  - url
  - title
  - caption
  - createdAt /date

* **Weight**
  - id
  - userId
  - weight /number
  - age /number

* **Height**
  - id
  - userId
  - height /number
  - age /number

* **HealthNote**
  - id
  - userId
  - title
  - category
  - body
  
## APIs, Plugins, Libraries and Frameworks

TinyMCE 

DateRangePicker

React-Modal

react-d3

moment



