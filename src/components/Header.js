import React from 'react'
import Logo from './Logo'
import Title from '../styles/title/Title'
import { Button} from '../styles/button/Button'
import Sidebar from './Sidebar'

const Header = () => {
    let companyName = 'เทคนิคพังงา'
    const companyAddress = <p>Phangnga</p>
    let num = 10
    const showMessage = () => {
        return companyName + 'com'
    }
    const isLogin = false
    const showMe = () => {
        alert('Hello React')
    }
    const products = [
        {id: 1, name: "Coke"},
        {id: 2, name: "Pepsi"}
    ]


    return (
        <>
            <Title>IT</Title>
            <h1>วิทยาลัย {companyName}</h1>
            <hr></hr>
            {companyAddress}
            {num + 100}
            <hr/>
            {showMessage()}
            {isLogin && <p>ยินดีต้อนรับ</p>}
            {isLogin === true && <p>ยินดีต้อนรับ</p>}
            {isLogin === true && (
                <>
                    <p>ยินดีต้อนรับ</p>
                    <p>ยินดีต้อนรับ</p>
                </>

            )}
            {
                isLogin ? <Logo/> : <p>ไม่มีสิทธิ์ดู logo</p>
            }
            <hr/>
            <button onClick={showMe}>Click Me</button>
            <Button primary>Click me</Button>
            <Button >Click me</Button>
            <ul>
                {
                    products.map((products, index) => {
                        return (
                            <li key={products.id}> {products.name}</li>
                        )
                    })
                }
            </ul>
            <Sidebar/>
        </>
    )
}

export default Header
