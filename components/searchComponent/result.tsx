import IconConf from '@components/icons/icon-conf';
import IconSpeaker from '@components/icons/icon-speaker';
import IconJobs from '@components/icons/iconJobs';
import IconSponsor from '@components/icons/iconSponsor';
import Loader from '@components/loader/loader';
import Link from 'next/link';
import { connectStateResults, Highlight, Snippet } from 'react-instantsearch-dom';

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

const getContent = (hit: any) => {
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

const SearchResult = ({ hit }: any) => {
  return (
    <Link href={getLink(hit)}>
      <a className="search-cmpt-result-box-link">
        <div className="search-cmpt-result-box-link-icon">{getResultIcon(hit.key as string)}</div>
        <div className="search-cmpt-result-box-link-title">{getContent(hit)}</div>
        <div className="search-cmpt-result-box-link-sub-title">{hit.key}</div>
      </a>
    </Link>
  );
};

const Results = connectStateResults(({ searchState, searchResults, searching }: any) => {
  if (!searchResults && searching) {
    return <Loader />;
  }

  if (searchResults && searchResults.nbHits !== 0) {
    return (
      <ul className="search-cmpt-result-box-list">
        {searchResults.hits.map((hit: any) => (
          <SearchResult key={hit.id} hit={hit} />
        ))}
      </ul>
    );
  }
  return (
    <>
      <p>
        No result found for "<u>{searchState.query}</u>"
      </p>
      <div>You can try for "Keynote", or "CEO"</div>
    </>
  );
});

export default Results;
