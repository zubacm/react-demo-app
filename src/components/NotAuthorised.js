import React, {useEffect} from 'react'

export default function NotAuthorised({hideSidebar}) {
    useEffect(() => {
        hideSidebar(true)
    }, [])
    return (
        <div>
            You are not authorised to access this page!
        </div>
    )
}
