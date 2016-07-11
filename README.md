# Collectize

[Heroku link][heroku]

[heroku]: https://collectize.herokuapp.com/

## Minimum Viable Product

Collectize is a web application inspired by Pinterest that will be build using Ruby on Rails and React.js.  By the end of Week 9, this app will, at a minimum, satisfy the following criteria:

- [x] Hosting on Heroku
- [ ] New account creation, login, and guest/demo login
- [ ] A production README, replacing this README (**NB**: check out the [sample production README](docs/production_readme.md) -- you'll write this later)
- [ ] Feed & Profile
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
- [ ] Collections & Items
  - [ ] Smooth, bug-free navigation
  - [ ] Adequate seed data to demonstrate the site's features
  - [ ] Adequate CSS styling
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

### Phase 1: Backend setup and Front End User Authentication (2 days, W1 W 6pm)

**Objective:** Functioning rails project with front-end Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication backend setup
- [ ] create `StaticPages` controller and root view
- [ ] set up webpack & flux scaffold with skeleton files
- [ ] setup `APIUtil` to interact with the API
- [ ] set up flux cycle for frontend auth
- [ ] user signup/signin components
- [ ] blank landing component after signin
- [ ] style signin/signup components

### Phase 2: Items Model, API, and components (2 days, W1 F 6pm)

**Objective:** Items can be created, read, edited and destroyed through
the API.

- [ ] create `Item` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for items (`ItemsController`)
- [ ] jBuilder views for items
- [ ] test out API interaction in the console.
- implement each item component, building out the flux loop as needed.
  - [ ] `ItemsIndex`
  - [ ] `ItemIndexItem`
  - [ ] `ItemForm`
- [ ] save Items to the DB when the form loses focus or is left idle after editing.
- [ ] basic styling for existing components

### Phase 3: Collections (2 day, W2 Tu 6pm)

**Objective:** Items belong to Collections, and can be viewed by collection.

- [ ] create `Collection` model
- build out API, Flux loop, and components for:
  - [ ] Collection CRUD
  - [ ] adding items requires a collection
  - [ ] moving items to a different collection
  - [ ] viewing items by collection
- Use CSS to style new components

Phase 3 adds organization to the Items. Items belong to a Collection,
which has its own `Index` view.

### Phase 4: Tags (1 days, W2 W 6pm)

**Objective:** Items can be tagged with multiple tags, and tags are searchable.

- [ ] create `Tag` model and join table
- build out API, Flux loop, and components for:
  - [ ] fetching tags for collection
  - [ ] adding tags to collection
  - [ ] creating tags while adding to collections
  - [ ] searching collections by tag
- [ ] Style new elements

### Phase 5: Allow Complex Styling in Items (1 days, W2 Th 6pm)

**objective:** Enable complex styling of items.

- [ ] Integrate `react-quill` (based on Quill.js).
- [ ] Use Rails helpers to sanitize HTML before rendering.
- [ ] Style the new Quill elements.

### Phase 6: Styling Cleanup and Seeding (1 day, W2 F 6pm)

**objective:** Make the site feel more cohesive and awesome.

- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Search through items for blocks of text
- [ ] Pagination / infinite scroll for Items Index
- [ ] Set reminders on items
- [ ] Changelogs for Items
- [ ] Multiple sessions

[phase-one]: docs/phases/phase1.md
[phase-two]: docs/phases/phase2.md
[phase-three]: docs/phases/phase3.md
[phase-four]: docs/phases/phase4.md
[phase-five]: docs/phases/phase5.md
