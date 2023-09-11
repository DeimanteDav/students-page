import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TeachersList from '../Teachers/TeachersList'
import StudentsList from '../Students/StudentsList'
import GroupsList from '../Groups/GroupsList'
import axios from 'axios'
import config from '../../config'
import { Link } from 'react-router-dom'
import useFetchData from '../../hooks/useFetchData'

const SchoolTabs = ({school}) => {
  const [panel, setPanel] = useState('1')

  let {data: students, error: studentsError} = useFetchData(`${config.API_URL}/schools/${school.id}/students`, {}, 'get', [school])

  let {data: groups, error: groupsError} = useFetchData(`${config.API_URL}/schools/${school.id}/groups`, {}, 'get', [school])


  const changePanel = (event, newValue) => {
    setPanel(newValue);
  }


  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={panel}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={changePanel} aria-label="lab API tabs example">
              <Tab label="Teachers" value="1" />
              <Tab label="Students" value="2" />
              <Tab label="Groups" value="3" />
            </TabList>
          </Box>

          <TabPanel value="1">
            {school.teachers && school.teachers.length > 0 && <Link to={`/schools/${school.id}/teachers`}>link to teachers</Link>}
              <TeachersList
                teachers={school.teachers}
                header={false}
              />
          </TabPanel>

          <TabPanel value="2">
            {students ? (
              <>
                {students.length > 0 && <Link to={`/schools/${school.id}/students`}>link to students</Link>}
                <StudentsList students={students} />
              </>

            ) : (
              <span>{studentsError}</span>
            )}
          </TabPanel>
          
          <TabPanel value="3">
            {groups ? (
              <>
                {groups.length > 0 && <Link to={`/schools/${school.id}/groups`}>link to groups</Link>}
                <GroupsList groups={groups} />
              </>
            ) : (
              <span>{groupsError}</span>
            )}
          </TabPanel>
        </TabContext>
      </Box>
  )
}

export default SchoolTabs