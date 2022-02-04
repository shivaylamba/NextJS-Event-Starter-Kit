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
import { SearchBox } from 'react-instantsearch-dom';

import styles from './header.module.css';

type Props = {
  hero: React.ReactNode;
  description: React.ReactNode;
  isSearchable?: boolean;
};

export default function Header({ hero, description, isSearchable }: Props) {
  return (
    <>
      <div className={styles.headerWrapper}>
        <h1 className={styles.hero}>{hero}</h1>
        {isSearchable && (
          <div className={styles.form}>
            <div className={`${styles['form-row']} ${styles.relative}`}>
              <label htmlFor="email-input-field" className={styles['input-label']}>
                <SearchBox />
              </label>
            </div>
          </div>
        )}
      </div>
      <p className={styles.description}>{description}</p>
    </>
  );
}
