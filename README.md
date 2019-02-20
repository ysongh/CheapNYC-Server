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

Create a item post
* Link - https://cnycserver.herokuapp.com/items
* Request - POST
* Body - name, price, location, description, company, author

Find an items by id
* Link - https://cnycserver.herokuapp.com/items/:itemId
* Request - GET