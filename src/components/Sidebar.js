import React from 'react'

const Sidebar = () => {
   // let fullname = 'wuttiwong'

    const [fullname, setFullname] = React.useState('Wuttiwong')
    const [isShow, setIsShow] = React.useState(true)

    const changeName = () => {
        setFullname('XXXXXX')
        setIsShow(!isShow)
    }
    //ทำทุกครั้ง
    React.useEffect(() => {
        console.log('sidebar useEffect')
    })

    //ทำครั้งแรกครั้งเดียว
    React.useEffect(() => {
        console.log('sidebar useEffect one time only')
    },[])

     //ทำเฉพาะ fullname เปลี่ยน
     React.useEffect(() => {
        console.log('sidebar useEffect => ' + fullname)
    },[fullname])

    return (
        <div>
            <h1>Sidebar </h1>
            {
                setIsShow ? <p>Hello</p> : <p>world</p>
            }
            <p>
                สวัสดี {fullname}
                <button onClick={changeName}>Change</button>
            </p>
        </div>
    )
}

export default Sidebar
