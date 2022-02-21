import { MeiliSearch } from 'meilisearch';
import axios from 'axios';

const client = new MeiliSearch({
  host: '<HOST_NAME>',
  apiKey: '<API_KEY>'
});

const indexSchedule = client.index('schedule');
const indexSpeaker = client.index('speaker');

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
        talk {
          description
        }
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
  await indexSchedule.delete();
  await indexSpeaker.delete();

  const { data: dataStages } = await axios({
    url: 'https://graphql.datocms.com/',
    method: 'POST',
    headers: {
      Authorization: 'Bearer a45ce78f9b2053c229bbfe9e3fca7b'
    },
    data: {
      query: stagesGraphQL
    }
  });

  const { data: dataSpeaker } = await axios({
    url: 'https://graphql.datocms.com/',
    method: 'POST',
    headers: {
      Authorization: 'Bearer a45ce78f9b2053c229bbfe9e3fca7b'
    },
    data: {
      query: speakerGraphQL
    }
  });

  const newArray: any[] = [];
  dataStages.data.allStages.forEach((schedule: any, i1: number) => {
    schedule.schedule.forEach((sch: any, i2: number) => {
      newArray.push({
        ...sch,
        ...schedule,
        id: `${schedule.id}${i1}${i2}`,
        schedule: []
      });
    });
  });

  await indexSchedule.addDocuments(newArray);

  await indexSpeaker.addDocuments(
    dataSpeaker.data.allSpeakers.map((speaker: any) => ({
      ...speaker,
      talkTitle: speaker.talk.title,
      talkDescription: speaker.talk.description
    }))
  );

  console.log('Document Added');
};

seed();
