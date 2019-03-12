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
* Required - name(string), category(string), price(number), location(string), city(string), description(string), company(string)
* Optional - image(file), author(string)

Find an item by id
* Link - https://cnycserver.herokuapp.com/items/:itemId
* Request - GET
* Params - Replace ':itemId' with an id of a item

Like an item by id
* Link - https://cnycserver.herokuapp.com/items/:itemId/like
* Request - PUT
* Params - Replace ':itemId' with an id of a item

Flag an item by id
* Link - https://cnycserver.herokuapp.com/items/:itemId/flag
* Request - PUT
* Params - Replace ':itemId' with an id of a item

## Review
Create a review
* Link - https://cnycserver.herokuapp.com/items/:itemId/reviews
* Request - POST
* Params - Replace ':itemId' with an id of a item
* Required - name(string), rating(number), text(string)

## User
Create an user
* Link - https://cnycserver.herokuapp.com/users/signup
* Request - POST
* Required - name(string), email(string), password(string), confirmPassword(string)

Login
* Link - https://cnycserver.herokuapp.com/users/login
* Request - POST
* Required - email(string), password(string)