# CheapNYC-Server

REST API that allow anyone to post or view item or product

## Deals Endpoint

### Find all items posts
GET https://cnycserver.herokuapp.com/items?page=1

#### Query String Parameters
Name | Data Type | Description
--- | --- | ---
page | int | (Optional) Each page shows 8 deals.

### Find all items posts by category
GET https://cnycserver.herokuapp.com/items?type=category&categoryName=Food

#### Query String Parameters
Name | Data Type | Description
--- | --- | ---
type | string | (Required) Set type equal to category.
categoryName | string | (Required) Put the name of the category like Food, Events, Classes, or Others.

### Find all items posts by city
GET https://cnycserver.herokuapp.com/items?type=city&cityName=queen

#### Query String Parameters
Name | Data Type | Description
--- | --- | ---
type | string | (Required) Set type equal to city.
cityName | string | (Required) Put the name of the city like Manhattan, Queens, Bronx, Brooklyn, or Staten Island.

### Find all items posts by price range
GET https://cnycserver.herokuapp.com/items?type=price&price1=50&price2=100

#### Query String Parameters
Name | Data Type | Description
--- | ---- | ---
type | string | (Required) Set type equal to price.
price1 | decimal | (Required) Price1 must be less than price2.
price2 | decimal | (Required) Price2 must be greater than price1.

### Find all items posts by name
GET https://cnycserver.herokuapp.com/items/searchItemByName?name=pizza&page=1

#### Query String Parameters
Name | Data Type | Description
--- | ---- | ---
name | string | (Optional) Enter the name of the deal
page | int | (Optional) Each page shows 8 deals.

### Create an item post (*Login Required*)
POST https://cnycserver.herokuapp.com/items

#### Request Body Parameters
Name | Data Type | Description
--- | ---- | ---
name | string | (Required) Name of the deal.
category | string | (Required) Category of the deal like Food, Events, Classes, or Others.
price | decimal | (Required) Price of the deal.
location | string | (Required) Location of where to get the deals
city | string | (Required)  Manhattan, Queens, Bronx, Brooklyn, or Staten Island.
description | string | (Required) Details of the deal.
company | string | (Required) Name of the company.
duration | int | (Required) How long will the deal last?
image | file | (Optional) Picture of the deal
website | string | (Optional) Link to the website
startDate | string | (Optional) When does the deal start?
endDate | string | (Optional) When does the deal end?

### Find an item by id
GET https://cnycserver.herokuapp.com/items/:itemId

#### Path Parameters
URL Parameter | Description
--- | ---
:itemId | ID of the deals

### Edit an item by id (*Login Required*)
PUT https://cnycserver.herokuapp.com/items/:itemId

#### Path Parameters
URL Parameter | Description
--- | ---
:itemId | ID of the deals

#### Request Body Parameters
Name | Data Type | Description
--- | ---- | ---
name | string | (Required) Name of the deal.
category | string | (Required) Category of the deal like Food, Events, Classes, or Others.
price | decimal | (Required) Price of the deal.
location | string | (Required) Location of where to get the deals
city | string | (Required)  Manhattan, Queens, Bronx, Brooklyn, or Staten Island.
description | string | (Required) Details of the deal.
company | string | (Required) Name of the company.
duration | int | (Required) How long will the deal last?
image | file | (Optional) Picture of the deal
website | string | (Optional) Link to the website
startDate | string | (Optional) When does the deal start?
endDate | string | (Optional) When does the deal end?

### Remove an item by id (*Login Required*)
DELETE https://cnycserver.herokuapp.com/items/:itemId

#### Path Parameters
URL Parameter | Description
--- | ---
:itemId | ID of the deals

### Like an item by id (*Login Required*)
PUT https://cnycserver.herokuapp.com/items/:itemId/like

#### Path Parameters
URL Parameter | Description
--- | ---
:itemId | ID of the deals

### Flag an item by id (*Login Required*)
PUT https://cnycserver.herokuapp.com/items/:itemId/flag

#### Path Parameters
URL Parameter | Description
--- | ---
:itemId | ID of the deals

## Review Endpoint

### Create a review (*Login Required*)
POST https://cnycserver.herokuapp.com/items/:itemId/reviews

#### Path Parameters
URL Parameter | Description
--- | ---
:itemId | ID of the deals

#### Request Body Parameters
Name | Data Type | Description
--- | ---- | ---
rating | int | (Required) Rating must be between 1 and 5.
text | string | (Required) Comments on the deal

## User Endpoint

### Create an user
POST https://cnycserver.herokuapp.com/users/signup

#### Request Body Parameters
Name | Data Type | Description
--- | ---- | ---
name | string | (Required) Name of the user.
email | string | (Required) Email of the user.
password | string | (Required) Password must be at least 6 characters.
confirmPassword | string | (Required) Passwords must match.
image | file | (Optional) Picture of the user.

### Login
POST https://cnycserver.herokuapp.com/users/login

#### Request Body Parameters
Name | Data Type | Description
--- | ---- | ---
email | string | (Required) Email of the user.
password | string | (Required) Password must be at least 6 characters.

### Edit an user information (*Login Required*)
PUT https://cnycserver.herokuapp.com/users/:userId/edit

#### Path Parameters
URL Parameter | Description
--- | ---
:userId | ID of the user

#### Request Body Parameters
Name | Data Type | Description
--- | ---- | ---
name | string | (Required) Name of the user.
title | string | (Optional) List of interest that the user likes.  Separate each interest by comma.

### Change the user image (*Login Required*)
PUT https://cnycserver.herokuapp.com/users/:userId/edit-image

#### Path Parameters
URL Parameter | Description
--- | ---
:userId | ID of the user

#### Request Body Parameters
Name | Data Type | Description
--- | ---- | ---
image | file | (Required) Picture of the user.

## Report Endpoint

### Find all reports
GET https://cnycserver.herokuapp.com/items/report/allreport

### Report a deal (*Login Required*)
POST https://cnycserver.herokuapp.com/items/:itemId/report

#### Path Parameters
URL Parameter | Description
--- | ---
:itemId | ID of the deal

#### Request Body Parameters
Name | Data Type | Description
--- | ---- | ---
text | string | (Required) Type of report.
comments | string | (Required) Comment on the report.