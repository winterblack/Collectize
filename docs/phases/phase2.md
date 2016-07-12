# Phase 2: Flux Architecture and Collection CRUD (2 days, W1 F 6pm)

## Rails
### Models
* Collection

### Controllers
* Api::CollectionsController (create, destroy, index, show, update)

### Views
* notes/index.json.jbuilder
* notes/show.json.jbuilder

## Flux
### Views (React Components)
* CollectionsIndex
  - CollectionsIndexItem
* CollectionForm

### Stores
* Collection

### Actions
* `ApiActions.receiveAllCollections`
* `ApiActions.receiveSingleCollection`
* `ApiActions.deleteCollection`
* `CollectionActions.fetchAllCollections`
* `CollectionActions.fetchSingleCollection`
* `CollectionActions.createCollection`
* `CollectionActions.editCollection`
* `CollectionActions.destroyCollection`

### ApiUtil
* `ApiUtil.fetchAllCollections`
* `ApiUtil.fetchSingleCollection`
* `ApiUtil.createCollection`
* `ApiUtil.editCollection`
* `ApiUtil.destroyCollection`

## Gems/Libraries
