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
  * **NewCollectionForm**
  * **Collection**
      * ItemThumb
      * **NewItemForm**
      * **Item**
        * EditItemForm


## Routes

* **component:** `App` **path:** `/`
  * **component:** `CollectionsIndex` **Index**
  * **component** `LoginForm` **path:** `/login`
  * **component** `SignupForm` **path:** `/signup`
  * **component:** `Profile` **path:** `/:username`
  * **component:** `NewCollecionForm` **path:** `/newcollection`  
  * **component:** `Collection` **path:** `collections/:id`
  * **component:** `NewItemForm` **path:** `/newcollections`
  * **component:** `Item` **path:** `items/:id`
