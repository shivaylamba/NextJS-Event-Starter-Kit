import IconConf from '@components/icons/icon-conf';
import IconSpeaker from '@components/icons/icon-speaker';
import IconJobs from '@components/icons/iconJobs';
import IconSponsor from '@components/icons/iconSponsor';
import Link from 'next/link';
import { connectStateResults, Highlight, Snippet } from 'react-instantsearch-dom';

const noSearchList = [
  {
    title: 'Keynote',
    speaker: [{ name: 'Christa Collyn', slug: 'christa' }],
    id: '1066881010',
    name: 'Stage C',
    key: 'stage'
  },
  {
    name: 'Christa Collyn',
    slug: 'christa',
    id: '10668807',
    key: 'speaker',
    bio:
      'They have over ten years of experience building blazing-fast web applications with Next.js and Vercel. Outside of work, they enjoy hiking, skiing, and surfing. Before becoming a developer, they worked in finance for a Fortune 500 company.',
    company: 'Company',
    talkTitle: 'Keynote',
    talkDescription:
      "In this talk, you'll learn how Next.js and Vercel help transform the workflow of front-end developers. Hear about the latest developments with Next.js 10 and deploy your application with one click to Vercel."
  },
  {
    title: 'Security Lead',
    id: '010669007',
    key: 'job',
    companyName: 'Vercel',
    description:
      'The Security Lead at Vercel will work closely with engineering and product teams to ensure that security is top-priority in all of our work. The role will also require designing and implementing technical controls to enforce strong security guarantees by default, as well as supporting audits for certification and compliance programs, such as SOC 2, GDPR, and ISO 27001.',
    link: 'https://vercel.com/careers'
  },
  {
    id: 'sponor-0',
    name: 'Vercel',
    slug: 'vercel',
    key: 'sponsor',
    description:
      'Vercel combines the best developer experience with an obsessive focus on end-user performance. Our platform enables frontend teams to do their best work.'
  }
];

const getResultIcon = (key: string) => {
  switch (key) {
    case 'speaker':
      return <IconSpeaker />;
    case 'stage':
      return <IconConf />;
    case 'job':
      return <IconJobs />;
    case 'sponsor':
      return <IconSponsor />;
    default:
      return <IconSpeaker />;
  }
};

const getContent = (hit: any, isNoResult: boolean) => {
  if (isNoResult) {
    return (
      <>
        <div>
          {hit.name} {hit.title} {hit.companyName}
        </div>
        {hit.talkDescription}
        {hit.description}
      </>
    );
  }
  return (
    <>
      <div>
        <Highlight attribute="name" hit={hit} /> <Snippet attribute="title" hit={hit} />{' '}
        {'companyName' in hit && (
          <>
            {' - '}
            <Snippet attribute="companyName" hit={hit} />
          </>
        )}
      </div>

      <Snippet
        attributesToSnippet={['talkDescription:50']}
        snippetEllipsisText={'...'}
        attribute="talkDescription"
        hit={hit}
      />
      <Snippet
        attributesToSnippet={['description:10']}
        snippetEllipsisText={'...'}
        attribute="description"
        hit={hit}
      />
    </>
  );
};

const getLink = (hit: any) => {
  if (hit.key === 'stage') {
    return `/speakers/${hit.speaker[0].slug}`;
  } else if (hit.key === 'speaker') {
    return `/speakers/${hit.slug}`;
  } else if (hit.key === 'sponsor') {
    return `/expo/${hit.slug}`;
  }
  return hit.link;
};

const SearchResult = ({ hit, isNoResult }: any) => {
  return (
    <Link href={getLink(hit)}>
      <a className="search-cmpt-result-box-link">
        <div className="search-cmpt-result-box-link-icon">{getResultIcon(hit.key as string)}</div>
        <div className="search-cmpt-result-box-link-title">{getContent(hit, isNoResult)}</div>
        <div className="search-cmpt-result-box-link-sub-title">{hit.key}</div>
      </a>
    </Link>
  );
};

const Results = connectStateResults(({ searchState, searchResults }: any) => {
  let list = [...noSearchList];
  let isNoResult = true;
  if (searchState.query && searchResults && searchResults.nbHits !== 0) {
    list = [...searchResults.hits];
    isNoResult = false;
  }

  return (
    <ul className="search-cmpt-result-box-list">
      {list.map((hit: any) => (
        <SearchResult key={hit.id} hit={hit} isNoResult={isNoResult} />
      ))}
    </ul>
  );
  // return (
  //   <>
  //     <p>
  //       No result found for "<u>{searchState.query}</u>"
  //     </p>
  //     <div>You can try for "Keynote", or "CEO"</div>
  //   </>
  // );
});

export default Results;
