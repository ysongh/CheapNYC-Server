# CheapNYC-Server

REST API that allow anyone to post or view item or product

## Item
Find all items posts
* Link - https://cnycserver.herokuapp.com/items
* Request - GET

Find all items posts by category
* Link - https://cnycserver.herokuapp.com/items?type=category&categoryName=food
* Request - GET

Create a item post
* Link - https://cnycserver.herokuapp.com/items
* Request - POST
* Body - name, price, location, description, company, author

Find an items by id
* Link - https://cnycserver.herokuapp.com/items/:itemId
* Request - GET