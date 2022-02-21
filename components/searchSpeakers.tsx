import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Configure,
  Snippet,
  connectStateResults
} from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

import styles from './conf-entry.module.css';
import Loader from './loader/loader';

const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_HOST_NAME || '',
  process.env.NEXT_PUBLIC_API_KEY
);

const SpeakerHit = ({ hit }: any) => (
  <a href={`/speakers/${hit.slug}`} key={hit.id}>
    <div className="name-attribute-hightlight">
      <Highlight attribute="name" hit={hit} />
    </div>
    <div>
      <Snippet
        attributesToSnippet={['bio:50']}
        snippetEllipsisText={'...'}
        attribute="bio"
        hit={hit}
      />
    </div>
  </a>
);

const ScheduleHit = ({ hit }: any) => (
  <a href={`/speakers/${hit.slug}`} key={hit.id}>
    <div className="name-attribute-hightlight">
      <Highlight attribute="talkTitle" hit={hit} />
    </div>
    <div className="speaker-detail-attribute">
      - <Snippet attribute="name" hit={hit} />
    </div>
    <div>
      <Snippet
        attributesToSnippet={['talkDescription:50']}
        snippetEllipsisText={'...'}
        attribute="talkDescription"
        hit={hit}
      />
    </div>
  </a>
);

const SearchSpeakers = ({ isSpeaker }: any) => {
  const Results = connectStateResults(
    ({ searchState, searchResults, children, searching }: any) => {
      if (!searchResults && searching) {
        return <Loader />;
      }
      if (!searchState.query) {
        return null;
      }

      return searchResults && searchResults.nbHits !== 0 ? (
        children
      ) : (
        <div className="ais-search-list-absolute">
          No results have been found for {searchState.query}.
        </div>
      );
    }
  );

  return (
    <div className={styles.form}>
      <div className={`${styles['form-row']} ${styles.relative}`}>
        <label htmlFor="email-input-field" className={styles['input-label']}>
          <InstantSearch indexName={'speaker'} searchClient={searchClient}>
            <Configure
              hitsPerPage={3}
              attributesToSnippet={['bio:50']}
              snippetEllipsisText={'...'}
            />
            <SearchBox showLoadingIndicator />
            <Results>
              <div className="ais-search-list-absolute">
                <Hits hitComponent={isSpeaker ? SpeakerHit : ScheduleHit} />
              </div>
            </Results>
          </InstantSearch>
        </label>
      </div>
    </div>
  );
};

export default SearchSpeakers;
