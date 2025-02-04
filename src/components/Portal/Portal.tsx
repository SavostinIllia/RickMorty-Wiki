import React from 'react'
import bigPortal from '@/static/portal.gif'
import smallPortal from '@/static/small-portal.gif'
import styles from './styles.module.scss'
import Image from 'next/image';

interface PortalProps {
    mode: 'big' | 'small';
    className?: string;
  }

  const portals = {
    big: bigPortal.src,
    small: smallPortal.src,
  };


function Portal({mode, className} : PortalProps)  {

  return (
    <Image className={`${styles[`portal-${mode}`]} ${className} mx-auto `} width={200} height={200} src={portals[mode]} alt="loading portal"  unoptimized={portals[mode] === 'big' || false}/>
  )
}

export default Portal