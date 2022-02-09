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

import Link from 'next/link';
import cn from 'classnames';
import { InstantSearch } from 'react-instantsearch-dom';
import { useRouter } from 'next/router';
import { SkipNavContent } from '@reach/skip-nav';
import { NAVIGATION } from '@lib/constants';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import styles from './layout.module.css';
import Logo from './icons/icon-logo';
import MobileMenu from './mobile-menu';
import AllSearch from './searchComponent';
import Footer, { HostedByVercel } from './footer';
import ViewSource from '@components/view-source';

type Props = {
  children: React.ReactNode;
  className?: string;
  hideNav?: boolean;
  layoutStyles?: any;
};

export default function Layout({ children, className, hideNav, layoutStyles }: Props) {
  const router = useRouter();
  const activeRoute = router.asPath;

  const searchClient = instantMeiliSearch(
    'https://ms-283e6b2b3ca9-142.saas.meili.dev',
    '069e16039793773980e1af4edd42d89734aea5e8'
  );

  return (
    <>
      <ViewSource />
      <div className={styles.background}>
        {!hideNav && (
          <header className={cn(styles.header)}>
            <div className={styles['header-logos']}>
              <MobileMenu key={router.asPath} />
              <Link href="/">
                {/* eslint-disable-next-line */}
                <a className={styles.logo}>
                  <Logo />
                </a>
              </Link>
            </div>
            <div className={styles.tabs}>
              {NAVIGATION.map(({ name, route }) => (
                <Link key={name} href={route}>
                  <a
                    className={cn(styles.tab, {
                      [styles['tab-active']]: activeRoute.startsWith(route)
                    })}
                  >
                    {name}
                  </a>
                </Link>
              ))}
            </div>
            <InstantSearch indexName={'all'} searchClient={searchClient}>
              <AllSearch />
            </InstantSearch>

            <div className={cn(styles['header-right'])}>
              <HostedByVercel />
            </div>
          </header>
        )}
        <div className={styles.page}>
          <main className={styles.main} style={layoutStyles}>
            <SkipNavContent />
            <div className={cn(styles.full, className)}>{children}</div>
          </main>
          {!activeRoute.startsWith('/stage') && <Footer />}
        </div>
      </div>
    </>
  );
}
