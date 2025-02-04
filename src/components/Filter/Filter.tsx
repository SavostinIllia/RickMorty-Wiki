'use client';

import { GENDER_FILTERS, SPECIES_FILTERS, STATUS_FILTERS } from '@/@types/Character';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback, startTransition } from 'react';
import styles from './styles.module.scss';
import { useThrottle } from '@/lib/hook/useThrottle';
import { createPortal } from 'react-dom';
import Portal from '../Portal/Portal';
import FilterGroup from './FilterGroup';
import Typography from '../Typography/Typography';

const statusFilter = STATUS_FILTERS;
const genderFilter = GENDER_FILTERS;
const speciesFilter = SPECIES_FILTERS;

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [queryFilters, setQueryFilters] = useState({
    name: searchParams.get('name') || '',
    status: searchParams.get('status') || '',
    gender: searchParams.get('gender') || '',
    species: searchParams.get('species') || '',
  });

  const throttledQuery = useThrottle(queryFilters, 1000);
  const [pendingFilter, setPendingFilter] = useState(false);

  const filtersHandler = useCallback((key: keyof typeof queryFilters, val: string) => {
    setQueryFilters((prev) => ({
      ...prev,
      [key]: prev[key] === val ? '' : val,
    }));
  }, []);

  useEffect(() => {
    setPendingFilter(true)
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(throttledQuery).forEach(([key, val]) => {
      if (val) {
        params.set(key, val);
      } else {
        params.delete(key);
      }
    });
    startTransition(() => {
      router.replace(`/character?${params.toString()}`, { scroll: false });
      setPendingFilter(false)
    });
  }, [throttledQuery]);

  return (
    <>
      <aside className={`${styles.filter} w-1/6 self-start sticky top-3`}>
        <div className='mb-8'>
          <Typography tag="h3" className="mortys-text text-2xl mb-3 first-letter:uppercase">
            Search by name
          </Typography>
          <input
            type="text"
            value={queryFilters.name}
            onChange={(e) => filtersHandler('name', e.target.value)}
            className={`w-full rounded-lg p-2 bg-primaryGrey ricks-text nh outline-none text-xl`}
            placeholder="Type Character name..."
          />
        </div>

        {/* Status */}
        <FilterGroup filterName={'status'} filterGroup={statusFilter} onClickHandler={filtersHandler} queryFilters={queryFilters}/>

        {/* Gender */}
        <FilterGroup filterName={'gender'} filterGroup={genderFilter} onClickHandler={filtersHandler} queryFilters={queryFilters}/>

        {/* Species */}
        <FilterGroup filterName={'species'} filterGroup={speciesFilter} onClickHandler={filtersHandler} queryFilters={queryFilters}/>

      </aside>

      {(pendingFilter && typeof window !== 'undefined') 
        && createPortal(
          <div className="portal-loader fixed w-full h-full flex justify-center items-center top-0 left-0 z-10">
            <Portal mode="big" />
          </div>,
          document.body
      )}
    </>
  );
}
