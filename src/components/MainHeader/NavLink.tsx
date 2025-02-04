'use client'

import React, { ReactNode } from 'react';
import { usePathname } from "next/navigation";
import Link from 'next/link';
import { normalizePath } from '@/lib/utils/normalizePath';


export default function NavLink({href, children}:{href: string, children: ReactNode}) {

    const path = usePathname();

    const normalizedCurrentPath = normalizePath(path)
    const normalizedHref = normalizePath(href)
  
    const isActive = normalizedCurrentPath === normalizedHref || 
                     normalizedCurrentPath.startsWith(normalizedHref + '/')
  

    return (
      <Link href={href} className={`mortys-text text-2xl
        ${isActive ? 'active' : ''}`}>
          {children}
      </Link>
  );
}
