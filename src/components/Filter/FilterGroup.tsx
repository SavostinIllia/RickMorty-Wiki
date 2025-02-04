import React from 'react'
import Typography from '../Typography/Typography'
import styles from './styles.module.scss';

type FilterKey = "status" | "gender" | "species" | "name";

interface FilterGroupProps {
  filterName: FilterKey;
  filterGroup: string[];
  queryFilters: Record<FilterKey, string>;
  onClickHandler: (key: FilterKey, val: string) => void;
}

export default function FilterGroup({filterName, filterGroup, onClickHandler, queryFilters} : FilterGroupProps) {
  return (
    <div className="mb-8">

    <Typography tag="h2" className="mortys-text text-2xl mb-3 first-letter:uppercase">
      {filterName} 
    </Typography>
    
    <div className="flex flex-wrap gap-3">
      {filterGroup.map((group) => (
        <button key={group} onClick={() => onClickHandler(filterName, group)}
         className={`${styles['filter-button']} ricks-text ${queryFilters[filterName] === group ? styles.active : ''}`}
        >
        {group}
        </button>

      ))}
    </div>

  </div>
  )
}
