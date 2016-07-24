# Collectize

[Heroku link][heroku]

[heroku]: https://collectize.herokuapp.com/

## Minimum Viable Product

Collectize is a web application inspired by Pinterest that will use Ruby on Rails and React.js.  By the end of Week 2, this app will, at a minimum, satisfy the following criteria:

- [x] Hosting on Heroku
- [x] New account creation, login
- [ ] A production README, replacing this README (**NB**: check out the [sample production README](docs/production_readme.md) -- you'll write this later)
- [x] Homepage & Profile
  - [x] Smooth, bug-free navigation
  - [x] Adequate seed data to demonstrate the site's features
  - [x] Adequate CSS styling
- [x] Collections & Items
  - [x] Smooth, bug-free navigation
  - [x] Adequate seed data to demonstrate the site's features
  - [x] Adequate CSS styling
- [ ] Custom Properties
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Sort & Filter Collections
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: docs/views.md
[components]: docs/components.md
[flux-cycles]: docs/flux-cycles.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and Front End User Authentication (2 days, W1D2 6pm)

**Objective:** Functioning rails project with front-end Authentication

- [x] create new rails project
- [x] install gems
- [x] install node packages
- [x] front end skeleton
- [x] configure webpack
- [x] authentication back end (`User` model, `SessionController`, etc.)
- [x] front end authentication flux cycle
- [x] signup/login react components
- [x] signup/login styling

### Phase 2: Collections Model, API, and components (2 days, W1D4 6pm)

**Objective:** Collections can be created, read, edited and destroyed through the API.

- [x] create `Collection` model
- [x] seed database with test data
- [x] CRUD API for Collections (`CollectionsController`)
- [x] jBuilder views for Collections
- Collection react components
  - [x] `CollectionsIndex`
  - [x] `CollectionThumb`(dummy object)
  - [x] `CollectionForm`
- [ ] search Collections by name in navbar
- [x] basic styling

### Phase 3: Items (2 day, W2D2 6pm)

**Objective:** Items belong to Collections, and can be viewed by collection.

- [x] create `Characteristic` model
- [x] create `Item` model
- [x] Item CRUD
- [x] Item Form
- [x] Item seed data
- [ ] restyle `CollectionThumb`
- [x] style `ItemThumb`
- [x] style `Item`
- [x] style `Collection` & `CollectionForm`

Phase 3 adds organization to the Items. Items belong to a Collection,
which has its own `Index` view.

### Phase 4: Sort & Filter (1 days, W2D3 6pm)

**Objective:** Items can be tagged with multiple tags, and tags are searchable.

- [ ] create `Value` model with polymorphic relations to `Item` and `Collection`
- [ ] create sort & filter flux API
- [ ] create `Sort` and `Filter` form react components
- [ ] style `Collection` with sort and filter form

### Phase 5: Animate Collection (1 days, W2D4 6pm)

**objective:** Enable complex styling throughout.

- [ ] animate `Item` components when they're sorted & filtered

### Phase 6: Styling Cleanup and Seeding (1 day, W25 6pm)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes

### Bonus Features (TBD)
- [ ] collection description
- [ ] follow collections
- [ ] notifications when items are added to collections you follow
- [ ] Collections have tags; Profile has interests; Homepage displays collections by interest
- [ ] collaborative collections have more than one owner
- [ ] characteristic types: checkbox filters; links; textarea
- [ ] advanced sort options (e.g. "group by", "sort by then by")

[phase-one]: docs/phases/phase1.md
[phase-two]: docs/phases/phase2.md
[phase-three]: docs/phases/phase3.md
[phase-four]: docs/phases/phase4.md
[phase-five]: docs/phases/phase5.md
