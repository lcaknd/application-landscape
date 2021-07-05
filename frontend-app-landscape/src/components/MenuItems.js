import * as AiIcons from 'react-icons/ai'
import * as  GrIcons  from "react-icons/gr";
import * as  CgIcons  from "react-icons/cg";
import * as FcIcons from "react-icons/fc";
import * as FaIcons from "react-icons/fa";


export const MenuItem_logo = [
    {
        title: 'Application Landscape',
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
        title: 'Landscape',
        icon:<GrIcons.GrStackOverflow />,
        url: 'landscape',
        cName: 'nav-links'
    } 
]
export const MenuItem3 = [
    {
        title: 'Tutorials',
        icon:<FaIcons.FaChalkboardTeacher />,
        url: 'tutorial',
        cName: 'nav-links'
    }
    
]
export const MenuItem5 = [
    {
        title: 'DarkMode',
        icon:<CgIcons.CgDarkMode />,
        url: 'DarkMode',
        cName: 'nav-links'
    }]