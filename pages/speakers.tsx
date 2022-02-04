/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Page from '@components/page';
import SpeakersGrid from '@components/speakers-grid';
import Layout from '@components/layout';
import Header from '@components/header';

import { InstantSearch, SearchBox, Hits, connectStateResults } from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

import { META_DESCRIPTION } from '@lib/constants';
import styles from '../components/conf-entry.module.css';

const searchClient = instantMeiliSearch(
  'https://ms-283e6b2b3ca9-142.saas.meili.dev',
  '069e16039793773980e1af4edd42d89734aea5e8'
);

const Results = connectStateResults(({ searchState, searchResults, children }: any) => {
  return searchResults && searchResults.nbHits !== 0 ? (
    children
  ) : (
    <p className={styles.paragraph}>No results have been found for {searchState.query}.</p>
  );
});

export default function Speakers() {
  const meta = {
    title: 'Speakers - Virtual Event Starter Kit',
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout>
        <InstantSearch indexName={'speaker'} searchClient={searchClient}>
          <Header hero="Speakers" description={meta.description} isSearchable />
          <div className="speakers-grid">
            <Results>
              <Hits hitComponent={SpeakersGrid} />
            </Results>
          </div>
        </InstantSearch>
      </Layout>
    </Page>
  );
}
