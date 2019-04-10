# CheapNYC-Server

REST API that allow anyone to post or view item or product

## Item
Find all items posts
* Link - https://cnycserver.herokuapp.com/items
* Request - GET

Find all items posts by category
* Link - https://cnycserver.herokuapp.com/items?type=category&categoryName=food
* Request - GET
* Params - Set type to category and put any category on categoryName

Find all items posts by city
* Link - https://cnycserver.herokuapp.com/items?type=city&cityName=queen
* Request - GET
* Params - Set type to city and put any city on cityName

Find all items posts by price range
* Link - https://cnycserver.herokuapp.com/items?type=price&price1=50&price2=100
* Request - GET
* Params - Set type to price, put low number on price1 and high number on price2

Create an item post
* Link - https://cnycserver.herokuapp.com/items
* Request - POST
* Required Fields - name(string), category(string), price(number), location(string), city(string), description(string), company(string)
* Optional Fields - image(file), author(string)

Find an item by id
* Link - https://cnycserver.herokuapp.com/items/:itemId
* Request - GET
* Params - Replace ':itemId' with an id of a item

Like an item by id
* Link - https://cnycserver.herokuapp.com/items/:itemId/like
* Request - PUT
* Params - Replace ':itemId' with an id of a item
* Login is required

Flag an item by id
* Link - https://cnycserver.herokuapp.com/items/:itemId/flag
* Request - PUT
* Params - Replace ':itemId' with an id of a item
* Login is required

## Review
Create a review
* Link - https://cnycserver.herokuapp.com/items/:itemId/reviews
* Request - POST
* Params - Replace ':itemId' with an id of a item
* Required Fields - name(string), rating(number), text(string)

## User
Create an user
* Link - https://cnycserver.herokuapp.com/users/signup
* Request - POST
* Required Fields - name(string), email(string), password(string), confirmPassword(string)
* Optional Fields - image(file)

Login
* Link - https://cnycserver.herokuapp.com/users/login
* Request - POST
* Required Fields - email(string), password(string)

Edit an user
* Link - https://cnycserver.herokuapp.com/users/:userId/edit
* Request - PUT
* Params - Replace ':userId' with an id of an user
* Required Fields - name(string)
* Login is required

Change the user image
* Link - https://cnycserver.herokuapp.com/users/:userId/edit-image
* Request - PUT
* Params - Replace ':userId' with an id of an user
* Required Fields - image(file)
* Login is required

## Report
Find all reports
* Link - https://cnycserver.herokuapp.com/items/report/allreport
* Request - GET

Report an item
* Link - https://cnycserver.herokuapp.com/items/:itemId/report
* Request - POST
* Params - Replace ':itemId' with an id of a item
* Required Fields - text(string)
* Login is required