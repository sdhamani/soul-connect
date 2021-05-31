import React from 'react'
import Nav from '../navbar/Navbar'
import SideBar from '../sidebar/SideBar'
import CreatePost from '../createpost/CreatePost'
import './homepage.css'

export default function HomePage() {
  return (
    <div className='homepage-div'>
      <Nav />
      <div className='homepage-content'>
        <SideBar />
        <div className='homepage-posts'>
          <CreatePost />
        </div>
        <div className='homepage-news'>
          <span className='news-heading'>Hack Ideas News</span>
          <ul className='homepage-news-list'>
            <li>
              CEO Mr x address the importance of innovation in latest meet with
              global leaders
            </li>
            <li>
              Deadline to submit projects for this month extended till 15th
              June.
            </li>
            <li>Damage assesment app wins the April Hackathon </li>

            <li>
              Project with changes in chat bot brings increased customer
              satisfaction
            </li>
            <li>
              Several ideas about healthcare system have been selected for the
              second stage.
            </li>
            <li>
              "Its great to see so many great ideas come up" - CTO of Scripbox
            </li>
            <li>
              April's Hackthon records the highest number of entries ever.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
