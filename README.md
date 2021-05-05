## Welcome to Bucket List 
the one place to compare NBA players and stats with ease and efficiency.

## Description 
The Bucket List app enables users to choose specific players and desired stats and compare them in one table, without the distraction of unnecessary information and the hassle of jumping from one tab to the other on your browser.
On Bucket List you can also save your tables to show your friends or come back to in the future, see other users tables, and comment on them.

## Setup 
- Clone this repository
- Run ```yarn install```
- ```createdb bucket-list_development```
- ```cd server```
- ```yarn run migrate:latest```
- ```yarn run db:seed```
- ```yarn run dev```
- navigate to ```localhost:3000``` in your web browser

## To Run Cypress Tests
- Run ```createdb bucket-list_e2e```
- ```cd server```
- ```yarn run db:e2e:migrate```
- ```yarn run db:e2e:seed```
- ```yarn run dev:e2e```
- Open a second terminal tab
- In the second terminal tab run ```yarn run e2e:open```

## Try It Out
https://bucket-list-stats.herokuapp.com/
