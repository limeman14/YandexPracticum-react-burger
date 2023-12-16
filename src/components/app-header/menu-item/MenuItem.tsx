import styles from './MenuItem.module.css'
import { Link } from 'react-router-dom'
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";
import { ReactNode } from "react";

interface MenuItemProps {
  icon: ({ type }: TIconProps) => ReactNode
  text: string
  active: boolean
  path?: string
}

export function MenuItem({ icon, text, active, path = '/' }: MenuItemProps) {
  const textActive = active ? 'text_color_primary' : ''

  return (
    <Link to={path} className={`mt-4 mb-4 pl-5 pr-5 ${styles.menuItem}`}>
      <>
        {icon({ type: active ? 'primary' : 'secondary' })}
        <span className={`ml-2 ${textActive}`}>{text}</span>
      </>
    </Link>
  )
}