interface Genre {
  name: string;
}

interface ParentPlatform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

interface Publisher {
  name: string;
}

interface Rating {
  id: number;
  count: number;
  title: string;
}

interface Screenshot {
  image: string;
}

interface Trailer {
  data: {
    max: string;
  };
}

export interface Game {
  id: number;
  background_image: string;
  name: string;
  released: string;
  metacritic: number;
  metacritic_url: string;
  website: string;
  description: string;
  genres: Array<Genre>;
  parent_platforms: Array<ParentPlatform>;
  publishers: Array<Publisher>;
  ratings: Array<Rating>;
  screenshots: Array<Screenshot>;
  trailers: Array<Trailer>;
}

