import React from 'react';
import styles from './styles.module.scss'

interface SkeletonListProps {
    className?: string
    items?: number
}

function SkeletonList ({items} : SkeletonListProps) {
  return (
    <ul className='container-2xl mx-auto px-4 flex flex-wrap gap-5'>
      {[...Array(items)].map((_, index) => {
        return <li key={index} className={`flex-1 min-w-[25%] min-h-[220px] text-white  text-center rounded-lg overflow-hidden self-stretch ${styles.skeleton}`}>&nbsp;</li>;
      })}
    </ul>
  );
};

export default SkeletonList;
