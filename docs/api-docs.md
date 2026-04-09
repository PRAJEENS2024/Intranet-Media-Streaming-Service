# IMSS API Documentation

## Authentication Routes (\`/api/auth\`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | \`/register\` | Register a new user account | No |
| POST | \`/login\` | Login user and return JWT | No |
| GET | \`/me\` | Get current authenticated user details | Yes |

## Video Routes (\`/api/videos\`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | \`/browse\` | Get videos with optional \`?search=\` & \`?category_id=\` | No |
| GET | \`/info/:id\` | Get metadata for a specific video | No |
| GET | \`/stream/:id\` | Stream video content (supports HTTP Range) | No |
| POST | \`/upload\` | Upload a new video (\`multipart/form-data\`) | Yes (Admin) |
| GET | \`/my-videos\` | Get videos uploaded by current admin | Yes |
| POST | \`/:id/publish\` | Publish a video for public viewing | Yes (Admin) |
| DELETE| \`/:id\` | Delete a specific video | Yes (Admin) |

## Engagement Routes (\`/api/engagement\`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | \`/like\` | Like a video (\`{ videoId }\`) | Yes |
| POST | \`/unlike\` | Unlike a video (\`{ videoId }\`) | Yes |
| GET | \`/like-status/:videoId\` | Check if current user liked video | Yes |
| GET | \`/likes-count/:videoId\` | Get total like count for a video | Yes |
| GET | \`/liked-videos\` | Get videos liked by user | Yes |
| POST | \`/watch-record\`| Register a watch event (\`{ videoId }\`) | Yes |
| GET | \`/watch-history\`| Retrieve watch history | Yes |
| DELETE| \`/watch-history\`| Clear watch history | Yes |
| POST | \`/continue-position\` | Save playback position | Yes |
| GET | \`/continue-watching\` | Get list of partially watched videos | Yes |

## Categories Routes (\`/api/categories\`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | \`/\` | Get all available categories | No |
| POST | \`/\` | Create a new category (\`{ name, description }\`) | Yes (Admin) |
| PUT | \`/:id\` | Update an existing category | Yes (Admin) |
| DELETE| \`/:id\` | Delete a category | Yes (Admin) |
