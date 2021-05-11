import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import styled from 'styled-components'
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Icon from "awesome-react-icons";

const Rm = styled.div`


`;
function myTest() {
  return (
    <> 
    <Rm>
      <Navigation
      // you can use your own router's api to get pathname
      
      onSelect={({itemId}) => {
        // maybe push to the route
      }}
      items={[
        {
          title: 'Dashboard',
          itemId: '/dashboard',
          // you can use your own custom Icon component as well
          // icon is optional
          elemBefore: () => <Icon name="inbox" />,
        },
        {
          title: '',
          itemId: '/management',
          elemBefore: () => <Icon name="edit-pencil-simple" />,
          subNav: [
            {
              title: 'Projects',
              itemId: '/management/projects',
            },
            {
              title: 'Members',
              itemId: '/management/members',
            },
          ],
        },
        {
          title: 'Another Item',
          itemId: '/another',
          subNav: [
            {
              title: 'Teams',
              itemId: '/management/teams',
            },
          ],
        },
      ]}
      />
    </Rm>
    </>
  )
  }

export default myTest