import styles from './styles.module.scss'
import classNames from 'classnames';

type Tag = 'h1' | 'h2' | 'h3' | 'span' | 'p' | 'div' | 'a'

interface TypographyProps {
    tag?: Tag,
    children: React.ReactNode,
    className?: string,
    startIcon?: boolean
}

function Typography ({tag = 'div', children, className} : TypographyProps) {
    
    const Component = tag
  
    return (
        <Component className={classNames(styles.typography, styles[`typography-${tag}`], className)}>{children}</Component>
  )
}

export default Typography