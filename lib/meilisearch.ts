import { MeiliSearch } from "meilisearch";
import axios from "axios";

const client = new MeiliSearch({
  host: "https://ms-283e6b2b3ca9-142.saas.meili.dev",
  apiKey: "069e16039793773980e1af4edd42d89734aea5e8",
});

const index = client.index("speaker");

interface SpeakerInfo {
  id: string;
  name: string;
  bio: string;
  title: string;
  slug: string;
  twitter: string;
  github: string;
  company: string;
  talk: {
    title: string;
    description: string;
  };
  image: {
    url: string;
    blurDataURL: string;
  };
  imagesquare: {
    url: string;
    blurDataURL: string;
  }
}


const stagesGraphQL = `
{
  allStages(first: 100, orderBy: order_ASC) {
    id
    name
    slug
    stream
    discord
    schedule {
      title
      start
      end
      speaker {
        name
        slug
        image {
          url(imgixParams: {fm: jpg, fit: crop, w: 120, h: 120})
          blurDataURL: blurUpThumb
        }
      }
    }
  }
}`;

const speakerGraphQL = `
{
  allSpeakers(first: 100) {
    id
    name
    bio
    title
    slug
    twitter
    github
    company
    talk {
      title
      description
    }
    image {
      url(imgixParams: {fm: jpg, fit: crop, w: 300, h: 400})
      blurDataURL: blurUpThumb
    }
    imageSquare: image {
      url(imgixParams: {fm: jpg, fit: crop, w: 192, h: 192})
      blurDataURL: blurUpThumb
    }
  }
}`;

const seed = async () => {
  await index.delete();

  const { data } = await axios({
    url: "https://graphql.datocms.com/",
    method: "POST",
    headers: {
      Authorization: "Bearer a45ce78f9b2053c229bbfe9e3fca7b",
    },
    data: {
      query: speakerGraphQL,
    },
  });

  await index.addDocuments(
    data.data.allSpeakers.map((speaker: SpeakerInfo) => ({
      ...speaker,
      talkTitle: speaker.talk.title,
      talkDescription: speaker.talk.description,
    }))
  );

  console.log("Document Added")
};

seed();