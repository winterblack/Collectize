# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `POST /api/users`

### Session

- `POST /api/session`
- `DELETE /api/session`

### Collections

- `GET /api/collections`
- `POST /api/collections`
- `GET /api/collections/:id`
- `PATCH /api/collections/:id`
- `DELETE /api/collections/:id`

### Items

- `GET /api/collections`
- `POST /api/collections`
- `GET /api/collections/:id`
- `PATCH /api/collections/:id`
- `DELETE /api/collections/:id`
- `GET /api/collections/:id/notes`
  - index of all notes for a notebook
  - accepts pagination params (if I get there)

### Tags

- A note's tags will be included in the note show template
- `GET /api/tags`
  - includes query param for typeahead suggestions
- `POST /api/notes/:note_id/tags`: add tag to note by name
  - if note doesn't already exist, it will be created
- `DELETE /api/notes/:note_id/tags/:tag_name`: remove tag from note by
  name
