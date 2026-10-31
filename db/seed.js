import db from "#db/client";

import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 20; i++) {
    await createTrack("Track " + i, i * 50000);
  }

  const user1 = await createUser("brian", "password123");
  const user2 = await createUser("guest", "password123");

  const playlist1 = await createPlaylist("Brian's Mix", "lorem ipsum playlist description", user1.id);
  const playlist2 = await createPlaylist("Guest Mix", "lorem ipsum playlist description", user2.id);

  for (let i = 1; i <= 5; i++) {
    await createPlaylistTrack(playlist1.id, i);
    await createPlaylistTrack(playlist2.id, i + 5);
  }
}
