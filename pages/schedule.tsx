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
import Schedule from '@components/schedule';
import Layout from '@components/layout';
import Header from '@components/header';
import styles from '../components/header.module.css';

import { InstantSearch, Configure, connectStateResults } from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

import { META_DESCRIPTION } from '@lib/constants';

const Results = connectStateResults(({ searchState, searchResults }: any) => {
  const map = new Map();
  const hits = searchResults?.hits;

  if (hits && hits.length > 0) {
    hits.forEach((hit: any) => {
      const { title, start, end, speaker, id, name, slug, stream, discord } = hit;
      const schedule = {
        title,
        start,
        end,
        speaker
      };
      const obj = {
        id,
        name,
        slug,
        stream,
        discord,
        schedule: [schedule]
      };

      if (map.has(hit.name)) {
        const existingObj = { ...map.get(hit.name) };
        existingObj.schedule.push(schedule);
        map.set(hit.name, existingObj);
      } else {
        map.set(hit.name, obj);
      }
    });
  }

  const stages = Object.values(Object.fromEntries(map)).sort((a: any, b: any) => {
    const textA = a?.name.toUpperCase();
    const textB = b?.name.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });

  return searchResults && searchResults.nbHits !== 0 ? (
    <Schedule allStages={stages} />
  ) : (
    <p className={styles.paragraph}>No results have been found for {searchState.query}.</p>
  );
});

const searchClient = instantMeiliSearch(
  'https://ms-283e6b2b3ca9-142.saas.meili.dev',
  '069e16039793773980e1af4edd42d89734aea5e8'
);

export default function SchedulePage() {
  const meta = {
    title: 'Schedule - Virtual Event Starter Kit',
    description: META_DESCRIPTION
  };

  return (
    <Page meta={meta}>
      <Layout>
        <InstantSearch indexName="schedule" searchClient={searchClient}>
          <Header hero="Schedule" description={meta.description} isSearchable />
          <Configure
            hitsPerPage={30}
            attributesToSnippet={['bio:50']}
            snippetEllipsisText={'...'}
          />

          <div className="speakers-grid">
            <Results />
          </div>
        </InstantSearch>
      </Layout>
    </Page>
  );
}
