import Link from "next/link"
import styles from './NavElement.module.css'

import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import { useRef } from "react"

export const NavElement = ({ link, name }) => {

    const wrapper = useRef()
    const tl = useRef();

    useGSAP(() => {
        tl.current = gsap.timeline({ defaults: {
            ease: 'power4.inOut',
            duration: .6
        }})
            .to('[class*="primary"]', {
                yPercent: -100
            })
            .to('[class*="secondary"]', {
                yPercent: -100
            }, '<')
            .to('[class*="line"]', {
                scaleX: 1
            }, '<')

        tl.current.pause()
    }, {scope: wrapper})

    const onMouseOver = () => {  
        tl.current.play()
    }

    const onMouseLeave = () => {  
        tl.current.reverse()
    }

    return (
        <li onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} ref={wrapper} className={styles.linkWrapper}>
            <Link style={{width: '100%'}} href={link}>
                <div className={styles.headingContainer}>
                    <p className={styles.primary}>{name}</p>
                    <p className={styles.secondary}>{name}</p>
                    <div className={styles.line}></div>
                </div>
            </Link>
        </li>
    )
}