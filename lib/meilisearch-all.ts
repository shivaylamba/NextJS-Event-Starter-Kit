import { MeiliSearch } from 'meilisearch';
import axios from 'axios';

const client = new MeiliSearch({
  host: 'https://ms-283e6b2b3ca9-142.saas.meili.dev',
  apiKey: '069e16039793773980e1af4edd42d89734aea5e8'
});

const index = client.index('all');

const sponsorsGraphQL = `
{
  allCompanies(first: 100, orderBy: tierRank_ASC) {
    name
    description
    slug
    website
    callToAction
    callToActionLink
    discord
    youtubeSlug
    tier
    links {
      url
      text
    }
    cardImage {
      url(imgixParams: {fm: jpg, fit: crop})
    }
    logo {
      url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100})
    }
  }
}`;

const jobsGraphQL = `{
  allJobs(first: 100, orderBy: rank_ASC) {
    id
    companyName
    title
    description
    discord
    link
    rank
  }
}`;

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
  await index.delete();

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

  const { data: dataSponsor } = await axios({
    url: 'https://graphql.datocms.com/',
    method: 'POST',
    headers: {
      Authorization: 'Bearer a45ce78f9b2053c229bbfe9e3fca7b'
    },
    data: {
      query: sponsorsGraphQL
    }
  });

  const { data: dataJobs } = await axios({
    url: 'https://graphql.datocms.com/',
    method: 'POST',
    headers: {
      Authorization: 'Bearer a45ce78f9b2053c229bbfe9e3fca7b'
    },
    data: {
      query: jobsGraphQL
    }
  });

  const jobList = dataJobs.data.allJobs.map((jobPost: any, i1: number) => ({
    ...jobPost,
    id: `${i1}${jobPost.id}`,
    key: 'job'
  }));

  const sponsorList = dataSponsor.data.allCompanies.map((sponsor: any, i1: number) => ({
    ...sponsor,
    id: `sponor-${i1}`,
    key: 'sponsor'
  }));

  const stageList: any[] = [];
  dataStages.data.allStages.forEach((schedule: any, i1: number) => {
    schedule.schedule.forEach((sch: any, i2: number) => {
      stageList.push({
        ...sch,
        ...schedule,
        key: 'stage',
        id: `${schedule.id}${i1}${i2}`,
        schedule: []
      });
    });
  });

  const speakerList = dataSpeaker.data.allSpeakers.map((speaker: any) => ({
    ...speaker,
    key: 'speaker',
    talkTitle: speaker.talk.title,
    talkDescription: speaker.talk.description
  }));

  await index.addDocuments(stageList);
  await index.addDocuments(speakerList);
  await index.addDocuments(jobList);
  await index.addDocuments(sponsorList);

  console.log('Document Added');
};

seed();
