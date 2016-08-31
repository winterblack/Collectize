# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

You should be able to use this document trace an **action** starting
with where it was invoked, through the **API**/**store** involved, and
finally to the **components** that update as a result. This is important
because once you start implementing your flux loops, that's precisely
what you'll need to do.

## Auth Cycles

### Session API Request Actions

* `signUp`
  0. invoked from `SignupForm` `onSubmit`
  0. `POST /api/users` is called.
  0. `receiveCurrentUser` is set as the success callback.
* `logIn`
  0. invoked from `Navbar` `onSubmit`
  0. `POST /api/session` is called.
  0. `receiveCurrentUser` is set as the callback.
* `logOut`
  0. invoked from `Navbar` `onClick`
  0. `DELETE /api/session` is called.
  0. `removeCurrentUser` is set as the success callback.
* `fetchCurrentUser`
  0. invoked from `App` in `didMount`
  0. `GET /api/session` is called.
  0. `receiveCurrentUser` is set as the success callback.

### Session API Response Actions

* `receiveCurrentUser`
  0. invoked from an API callback
  0. stores in `_currentUser` in `CurrentUserStore`
* `removeCurrentUser`
  0. invoked from an API callback
  0. removes `_currentUser` in `CurrentUserStore`

## Error Cycles

### Error API Response Actions
* `setErrors`
  0. invoked from API callbacks on error for actions that generate POST requests
  0. sets `form` and `_errors` in the `ErrorStore`
* `removeErrors`
  0. invoked from API callbacks on success for actions that generate POST requests
  0. removes `_errors` for a given `form` in the `ErrorStore`

## Item Cycles

### Items API Request Actions

* `fetchAllItems`
  0. invoked from `ItemsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/items` is called.
  0. `receiveAllItems` is set as the success callback.

* `createItem`
  0. invoked from new note button `onClick`
  0. `POST /api/items` is called.
  0. `receiveSingleItem` is set as the success callback.

* `fetchSingleItem`
  0. invoked from `ItemDetail` `didMount`/`willReceiveProps`
  0. `GET /api/items/:id` is called.
  0. `receiveSingleItem` is set as the success callback.

* `updateItem`
  0. invoked from `ItemForm` `onSubmit`
  0. `POST /api/items` is called.
  0. `receiveSingleItem` is set as the success callback.

* `destroyItem`
  0. invoked from delete note button `onClick`
  0. `DELETE /api/items/:id` is called.
  0. `removeItem` is set as the success callback.

## Collection Cycles

### Collections API Request Actions

* `fetchCollections`
  0. invoked from `CollectionsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/collections` is called.
  0. `receiveAllCollections` is set as the success callback.

* `createCollection`
  0. invoked from new notebook button `onClick`
  0. `POST /api/collections` is called.
  0. `receiveSingleCollection` is set as the callback.

* `fetchSingleCollection`
  0. invoked from `CollectionDetail` `didMount`/`willReceiveProps`
  0. `GET /api/collections/:id` is called.
  0. `receiveSingleCollection` is set as the success callback.

* `updateCollection`
  0. invoked from `CollectionForm` `onSubmit`
  0. `POST /api/collections` is called.
  0. `receiveSingleCollection` is set as the success callback.

* `destroyCollection`
  0. invoked from delete notebook button `onClick`
  0. `DELETE /api/collections/:id` is called.
  0. `removeCollection` is set as the success callback.

### Collections API Response Actions

* `receiveAllCollections`
  0. invoked from an API callback.
  0. `Collection` store updates `_collections` and emits change.

* `receiveSingleCollection`
  0. invoked from an API callback.
  0. `Collection` store updates `_collections[id]` and emits change.

* `removeCollection`
  0. invoked from an API callback.
  0. `Collection` store removes `_collections[id]` and emits change.

### Store Listeners

* `CollectionsIndex` component listens to `Collection` store.

### Items API Response Actions

* `receiveAllItems`
  0. invoked from an API callback.
  0. `Item` store updates `_items` and emits change.

* `receiveSingleItem`
  0. invoked from an API callback.
  0. `Item` store updates `_items[id]` and emits change.

* `removeItem`
  0. invoked from an API callback.
  0. `Item` store removes `_items[id]` and emits change.

### Store Listeners

* `ItemsIndex` component listens to `Item` store.
* `ItemDetail` component listens to `Item` store.




## SearchSuggestion Cycles

* `fetchSearchSuggestions`
  0. invoked from `ItemSearchBar` `onChange` when there is text
  0. `GET /api/items` is called with `text` param.
  0. `receiveSearchSuggestions` is set as the success callback.

* `receiveSearchSuggestions`
  0. invoked from an API callback.
  0. `SearchSuggestion` store updates `_suggestions` and emits change.

* `removeSearchSuggestions`
  0. invoked from `ItemSearchBar` `onChange` when empty
  0. `SearchSuggestion` store resets `_suggestions` and emits change.

### Store Listeners

* `SearchBarSuggestions` component listens to `SearchSuggestion` store.
