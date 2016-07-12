## Component Hierarchy

**Bolded** components are associated with routes.

* **App**
  * Navbar
    * Search
  * **LoginForm**
  * **SignupForm**
  * **CollectionsIndex**
    * CollectionThumb
  * **Profile**
    * CollectionThumb
  * **CollectionForm**
  * **Collection**
      * ItemThumb
      * **Item Form**
      * **Item**
        * EditItemForm


## Routes

* **component:** `App` **path:** `/`
  * **component:** `CollectionsIndex` **Index**
  * **component** `LoginForm` **path:** `/login`
  * **component** `SignupForm` **path:** `/signup`
  * **component:** `Profile` **path:** `/:username`
  * **component:** `CollectionForm` **path:** `/newcollection`  
  * **component:** `Collection` **path:** `collections/:id`
  * **component:** `ItemForm` **path:** `/newcollections`
  * **component:** `Item` **path:** `items/:id`
