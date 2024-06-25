'use client'

import { useGSAP } from "@gsap/react"
import { useState } from "react"
import { routes } from "../../app/ui/routes"
import { NavElement } from "./NavElement/NavElement"
import styles from './Navigation.module.css'

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleNavClick = () => setIsOpen(prev => !prev)

    return (
        <>
        <div onClick={handleNavClick} className={styles.navBtn}>Navigation</div>
        {isOpen && <div className={styles.wrapper}>
            <nav onClick={() => setIsOpen(false)} style={{width: '100%'}}>
                <ul>
                    {routes.map(({route, name}) => <NavElement name={name} link={route} key={name} />)}
                </ul>
            </nav>
            <p className={styles.closeBtn} onClick={() => setIsOpen(false)}>Close</p>
        </div>}
        </>
    )
}