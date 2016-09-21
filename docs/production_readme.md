# Collectize

[Collectize][heroku]

Collectize is a web application that allows users to create and sort collections of items however they want. It runs on a Ruby on Rails back end with a PostgresSQL database, and a React front-end, following a Flux design pattern.

## Database Schema

The database schema makes user-defined sort and filter parameters possible. When the user creates a collection, they can give the collection any characteristics they want to be able to sort and filter items by. Characteristics can also be added or deleted later.
```
class Collection < ActiveRecord::Base
  validates :title, :user_id, presence: true
  belongs_to :user
  has_many :characteristics, dependent: :destroy
  has_many :items, dependent: :destroy
end
```
```
class Characteristic < ActiveRecord::Base
  validates :name, :collection_id, presence: true
  belongs_to :collection
  has_many :values, dependent: :destroy
end
```
![new collection screenshot](docs/new collection.png)

When the user creates or edits an item, they can assign values to that item for each characteristic in the collection the item belongs to. This acts just as if the user had been able to create a unique table for each of their collections.
```
class Item < ActiveRecord::Base
  validates :title, :image_url, :collection_id, presence: true
  belongs_to :collection
  has_many :values, dependent: :destroy
  has_many :characteristics, through: :values
end
```
```
class Value < ActiveRecord::Base
  validates :item_id, :characteristic_id, presence: true
  belongs_to :characteristic
  belongs_to :item
end
```
![new item screenshot](docs/new_item.png)



[heroku]: https://collectize.herokuapp.com/
