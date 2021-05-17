import * as AiIcons from 'react-icons/ai'
import * as  GrIcons  from "react-icons/gr";
import * as FcIcons from "react-icons/fc";


export const MenuItem_logo = [
    {
        title: 'Insert anything',
        icon:<FcIcons.FcWorkflow />,
        url: '/',
        cName: 'nav-link'
    }
]

export const MenuItem1 = [
    {
        title: 'Home',
        icon:<AiIcons.AiFillHome />,
        url: '/',
        cName: 'nav-links'
    }
]

export const MenuItem2 = [
    {
        title: 'Filter',
        icon:<AiIcons.AiFillFilter />,
        url: 'filter',
        cName: 'nav-links'
    }
    
]
export const MenuItem3 = [
    {
        title: 'Landscape',
        icon:<GrIcons.GrStackOverflow />,
        url: 'landscape',
        cName: 'nav-links'
    } 
]
export const MenuItem4 = [
    {
        title: 'Settings',
        icon:<AiIcons.AiFillSetting />,
        url: 'settings',
        cName: 'nav-links'
    }
    
]