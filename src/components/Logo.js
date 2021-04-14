import React from 'react'
import {logo} from '../styles/Style'
import useHover from '../hooks/UseHover'

const Logo = () => {
    const [ hover, attrs] = useHover()

    const logoImage = {
        url: './logo192.png'
    }
    return (
        <div>
            {/* <img src="./logo192.png"  width="100" alt="logo"/>
            <img style={logo} src={logoImage.url}  width="100" alt="logo"/> */}
            {
                useHover ? <p>Hello logo</p> : null

            }
            <img {...attrs} style={logo} src={logoImage.url}  width="100" alt="logo"/>
        </div>
    )
}

export default Logo
