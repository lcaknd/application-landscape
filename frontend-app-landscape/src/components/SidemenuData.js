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
        title: 'Rectangles',
        icon:<BiIcons.BiRectangle />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },
    {
        title: 'Square',
        icon:<BiIcons.BiSquareRounded />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
     },
     {
        title: 'Circle',
        icon:<BsIcons.BsCircle />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
     },
     {
        title: 'Arrows',
        icon:<AiIcons.AiOutlineArrowsAlt />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
        }
    

]