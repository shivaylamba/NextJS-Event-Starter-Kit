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

import { InstantSearch, connectStateResults } from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

import { META_DESCRIPTION } from '@lib/constants';
import styles from '../components/conf-entry.module.css';
import Loader from '@components/loader/loader';

const searchClient = instantMeiliSearch(
  process.env.NEXT_PUBLIC_HOST_NAME || '',
  process.env.NEXT_PUBLIC_API_KEY
);

const Results = connectStateResults(({ searchResults, searching }: any) => {
  if (!searchResults && searching) {
    return <Loader />;
  }
  if (searchResults && searchResults.nbHits !== 0) {
    return <SpeakersGrid hits={searchResults.hits} />;
  }
  return <p className={styles.paragraph}>No results have been found</p>;
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
          <Results />
        </InstantSearch>
      </Layout>
    </Page>
  );
}
