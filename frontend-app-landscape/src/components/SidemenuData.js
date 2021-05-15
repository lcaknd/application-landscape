import React from 'react'
import * as BiIcons from 'react-icons/bi'
import * as AiIcons from 'react-icons/ai'
import * as FaIcons from 'react-icons/fa'
import * as RiIcons from 'react-icons/ri'
import * as BsIcons from 'react-icons/bs'



export const SidemenuData = [
    {
        title: 'All Shapes',
        icon:<FaIcons.FaBorderAll />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
     },
    {
        title: 'Quadrangle',
        icon:<BiIcons.BiRectangle />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },
     {
        title: 'Oval Shapes',
        icon:<BsIcons.BsCircle />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
     },
     {
        title: 'Groups',
        icon:<AiIcons.AiOutlineGroup/>,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
        }
    

]